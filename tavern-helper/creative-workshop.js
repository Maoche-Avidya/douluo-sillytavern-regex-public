// @name         [Helper] DouLuo Creative Workshop @0.6.6
// @module       tavern-helper/creative-workshop
// @version      @0.6.6
// @source       tavern-helper-scripts/creative-workshop/dist/latest.json
"use strict";

(function () {
  "use strict";

  const SCRIPT_NAME = "DouLuo Creative Workshop";
  const VERSION = "0.1.0";
  const PANEL_ID = "douluo-creative-workshop-panel";
  const STYLE_ID = "douluo-creative-workshop-style";
  const STORAGE_KEY = "douluo_creative_workshop_installs_v1";
  const URL_STORAGE_KEY = "douluo_creative_workshop_url";
  const MESSAGE_CHANNEL = "douluo-workshop";
  const DEFAULT_WORKSHOP_URL = "https://douluo-workshop.example.workers.dev/?embed=1";
  const ALLOWED_ORIGINS = ["https://douluo-workshop.example.workers.dev"];
  const CORE_SOURCE = "(function (globalFactory) {\n  if (typeof module === \"object\" && module.exports) {\n    module.exports = globalFactory();\n  } else {\n    const api = globalFactory();\n    try { window.DouLuoCreativeWorkshopCore = api; } catch (_) {}\n  }\n})(function () {\n  \"use strict\";\n\n  const SCHEMA = \"douluo_workshop_package_v1\";\n  const PACKAGE_TYPES = new Set([\n    \"worldbook_mod\",\n    \"trait_pack\",\n    \"item_pack\",\n    \"npc_pack\",\n    \"soul_skill_pack\",\n    \"plot_preset\",\n    \"template_patch\",\n    \"mixed_pack\",\n  ]);\n  const FORBIDDEN_TEXT_PATTERNS = [\n    /\u003cscript\\b/i,\n    /\\bon(?:click|error|load|mouseover|submit)\\s*=/i,\n    /\\bjavascript\\s*:/i,\n  ];\n  const FORBIDDEN_KEYS = new Set([\"script\", \"contentScript\", \"javascript\", \"eval\", \"functionBody\"]);\n\n  function isPlainObject(value) {\n    return !!value && typeof value === \"object\" && !Array.isArray(value);\n  }\n\n  function asArray(value) {\n    return Array.isArray(value) ? value : [];\n  }\n\n  function normalizeId(value) {\n    return String(value || \"\").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, \"-\").replace(/^-+|-+$/g, \"\");\n  }\n\n  function normalizeVersion(value) {\n    return String(value || \"\").trim() || \"0.1.0\";\n  }\n\n  function stringValue(value, fallback = \"\") {\n    return String(value == null ? fallback : value).trim();\n  }\n\n  function clone(value) {\n    return JSON.parse(JSON.stringify(value));\n  }\n\n  function walk(value, visitor, path = \"$\", seen = new Set()) {\n    if (!value || typeof value !== \"object\") {\n      visitor(value, path, \"\");\n      return;\n    }\n    if (seen.has(value)) return;\n    seen.add(value);\n    if (Array.isArray(value)) {\n      value.forEach((item, index) => walk(item, visitor, `${path}[${index}]`, seen));\n      return;\n    }\n    Object.entries(value).forEach(([key, item]) => {\n      visitor(item, `${path}.${key}`, key);\n      walk(item, visitor, `${path}.${key}`, seen);\n    });\n  }\n\n  function validateNoExecutableContent(pkg, errors) {\n    walk(pkg, (value, path, key) => {\n      if (FORBIDDEN_KEYS.has(String(key || \"\"))) {\n        errors.push(`${path}: forbidden executable field \"${key}\"`);\n      }\n      if (typeof value !== \"string\") return;\n      if (FORBIDDEN_TEXT_PATTERNS.some((pattern) => pattern.test(value))) {\n        errors.push(`${path}: executable HTML or javascript URL is not allowed`);\n      }\n    });\n  }\n\n  function normalizePackage(input) {\n    if (!isPlainObject(input)) {\n      return { ok: false, errors: [\"package must be an object\"], package: null };\n    }\n    const pkg = clone(input);\n    const errors = [];\n    pkg.schema = stringValue(pkg.schema);\n    if (pkg.schema !== SCHEMA) errors.push(`schema must be ${SCHEMA}`);\n    pkg.id = normalizeId(pkg.id);\n    if (!pkg.id) errors.push(\"id is required and must contain letters or numbers\");\n    pkg.version = normalizeVersion(pkg.version);\n    pkg.title = stringValue(pkg.title);\n    if (!pkg.title) errors.push(\"title is required\");\n    pkg.type = stringValue(pkg.type || \"mixed_pack\");\n    if (!PACKAGE_TYPES.has(pkg.type)) errors.push(`type is unsupported: ${pkg.type}`);\n    pkg.summary = stringValue(pkg.summary);\n    pkg.author = stringValue(pkg.author || \"unknown\");\n    pkg.tags = asArray(pkg.tags).map(stringValue).filter(Boolean).slice(0, 16);\n    pkg.payload = isPlainObject(pkg.payload) ? pkg.payload : {};\n    pkg.payload.worldbookEntries = asArray(pkg.payload.worldbookEntries);\n    pkg.payload.databaseRows = asArray(pkg.payload.databaseRows);\n    pkg.payload.plotPresets = asArray(pkg.payload.plotPresets);\n    pkg.payload.templatePatches = asArray(pkg.payload.templatePatches);\n    pkg.previewImages = asArray(pkg.previewImages).map(stringValue).filter(Boolean).slice(0, 8);\n\n    validateNoExecutableContent(pkg, errors);\n\n    pkg.payload.databaseRows.forEach((row, index) => {\n      if (!isPlainObject(row)) {\n        errors.push(`payload.databaseRows[${index}] must be an object`);\n        return;\n      }\n      if (!stringValue(row.tableName)) errors.push(`payload.databaseRows[${index}].tableName is required`);\n      if (!isPlainObject(row.data)) errors.push(`payload.databaseRows[${index}].data must be an object`);\n      const mode = stringValue(row.mode || (row.rowIndex ? \"update\" : \"insert\"));\n      if (![\"insert\", \"update\", \"upsert\"].includes(mode)) errors.push(`payload.databaseRows[${index}].mode is unsupported`);\n      row.mode = mode;\n    });\n\n    pkg.payload.worldbookEntries.forEach((entry, index) => {\n      if (!isPlainObject(entry)) {\n        errors.push(`payload.worldbookEntries[${index}] must be an object`);\n        return;\n      }\n      const body = isPlainObject(entry.entry) ? entry.entry : entry;\n      if (!stringValue(body.content) && !stringValue(entry.content)) {\n        errors.push(`payload.worldbookEntries[${index}] requires content`);\n      }\n    });\n\n    pkg.payload.plotPresets.forEach((preset, index) => {\n      if (!isPlainObject(preset) || !stringValue(preset.name)) {\n        errors.push(`payload.plotPresets[${index}] requires a name`);\n      }\n    });\n\n    pkg.payload.templatePatches.forEach((patch, index) => {\n      if (!isPlainObject(patch) || !isPlainObject(patch.templateData)) {\n        errors.push(`payload.templatePatches[${index}].templateData must be an object`);\n      }\n    });\n\n    return { ok: errors.length === 0, errors, package: pkg };\n  }\n\n  function sourceMeta(pkg) {\n    return {\n      packageId: pkg.id,\n      packageVersion: pkg.version,\n      packageTitle: pkg.title,\n      author: pkg.author,\n      installedAt: new Date().toISOString(),\n      schema: SCHEMA,\n    };\n  }\n\n  function addWorldbookSource(entry, pkg) {\n    const next = clone(entry);\n    next.extra = isPlainObject(next.extra) ? next.extra : {};\n    next.extra.douluoCreativeWorkshop = sourceMeta(pkg);\n    if (!next.name && next.comment) next.name = next.comment;\n    return next;\n  }\n\n  function normalizeWorldbookItem(item, pkg) {\n    const rawEntry = isPlainObject(item.entry) ? item.entry : item;\n    return {\n      worldbookName: stringValue(item.worldbookName || pkg.payload.worldbookName || pkg.defaultWorldbookName),\n      entry: addWorldbookSource(rawEntry, pkg),\n    };\n  }\n\n  function buildPreview(pkg) {\n    const normalized = normalizePackage(pkg);\n    if (!normalized.ok) return { ok: false, errors: normalized.errors };\n    const clean = normalized.package;\n    return {\n      ok: true,\n      packageId: clean.id,\n      version: clean.version,\n      title: clean.title,\n      type: clean.type,\n      summary: clean.summary,\n      counts: {\n        databaseRows: clean.payload.databaseRows.length,\n        worldbookEntries: clean.payload.worldbookEntries.length,\n        plotPresets: clean.payload.plotPresets.length,\n        templatePatches: clean.payload.templatePatches.length,\n      },\n      databaseRows: clean.payload.databaseRows.map((row) => ({\n        tableName: stringValue(row.tableName),\n        mode: row.mode,\n        rowIndex: row.rowIndex || null,\n        match: row.match || null,\n        fields: Object.keys(row.data || {}),\n      })),\n      worldbookEntries: clean.payload.worldbookEntries.map((item) => {\n        const normalizedItem = normalizeWorldbookItem(item, clean);\n        return {\n          worldbookName: normalizedItem.worldbookName,\n          name: stringValue(normalizedItem.entry.name || normalizedItem.entry.comment || normalizedItem.entry.title || \"未命名条目\"),\n        };\n      }),\n      plotPresets: clean.payload.plotPresets.map((preset) => stringValue(preset.name)),\n      templatePatches: clean.payload.templatePatches.map((patch) => stringValue(patch.presetName || patch.name || \"未命名模板\")),\n    };\n  }\n\n  function buildInstallPlan(pkg) {\n    const normalized = normalizePackage(pkg);\n    if (!normalized.ok) return { ok: false, errors: normalized.errors, package: null, operations: [] };\n    const clean = normalized.package;\n    const operations = [];\n    clean.payload.databaseRows.forEach((row) => {\n      operations.push({\n        kind: \"databaseRow\",\n        packageId: clean.id,\n        version: clean.version,\n        tableName: stringValue(row.tableName),\n        mode: row.mode,\n        rowIndex: row.rowIndex || null,\n        match: isPlainObject(row.match) ? row.match : null,\n        data: clone(row.data || {}),\n      });\n    });\n    clean.payload.worldbookEntries.forEach((entry) => {\n      operations.push({\n        kind: \"worldbookEntry\",\n        packageId: clean.id,\n        version: clean.version,\n        ...normalizeWorldbookItem(entry, clean),\n      });\n    });\n    clean.payload.plotPresets.forEach((preset) => {\n      operations.push({\n        kind: \"plotPreset\",\n        packageId: clean.id,\n        version: clean.version,\n        preset: clone(preset),\n      });\n    });\n    clean.payload.templatePatches.forEach((patch) => {\n      operations.push({\n        kind: \"templatePatch\",\n        packageId: clean.id,\n        version: clean.version,\n        presetName: stringValue(patch.presetName || patch.name || clean.title),\n        scope: stringValue(patch.scope || \"chat\"),\n        templateData: clone(patch.templateData),\n      });\n    });\n    return { ok: true, errors: [], package: clean, operations, preview: buildPreview(clean) };\n  }\n\n  function packageKey(pkg) {\n    return `${normalizeId(pkg && pkg.id)}@${normalizeVersion(pkg && pkg.version)}`;\n  }\n\n  return {\n    SCHEMA,\n    PACKAGE_TYPES: Array.from(PACKAGE_TYPES),\n    normalizePackage,\n    buildPreview,\n    buildInstallPlan,\n    packageKey,\n  };\n});\n";
  const PANEL_HTML = "\u003cdiv class=\"dlws-root\" data-dlws-app>\n  \u003cheader class=\"dlws-header\">\n    \u003cdiv>\n      \u003ch2>斗罗创意工坊\u003c/h2>\n      \u003cp>浏览、导入并安装结构化 DouLuo 内容包。\u003c/p>\n    \u003c/div>\n    \u003cdiv class=\"dlws-actions\">\n      \u003cbutton type=\"button\" data-dlws-action=\"refresh\">刷新\u003c/button>\n      \u003cbutton type=\"button\" data-dlws-action=\"close\">关闭\u003c/button>\n    \u003c/div>\n  \u003c/header>\n  \u003csection class=\"dlws-grid\">\n    \u003caside class=\"dlws-sidebar\">\n      \u003clabel class=\"dlws-field\">\n        \u003cspan>云端工坊 URL\u003c/span>\n        \u003cinput data-dlws-url type=\"url\" placeholder=\"https://your-name.workers.dev/?embed=1\" />\n      \u003c/label>\n      \u003cbutton type=\"button\" data-dlws-action=\"save-url\">保存 URL\u003c/button>\n      \u003clabel class=\"dlws-upload\">\n        \u003cspan>导入本地内容包 JSON\u003c/span>\n        \u003cinput data-dlws-file type=\"file\" accept=\"application/json,.json\" />\n      \u003c/label>\n      \u003cdiv class=\"dlws-status\" data-dlws-status>\u003c/div>\n      \u003csection class=\"dlws-preview\" data-dlws-preview hidden>\u003c/section>\n    \u003c/aside>\n    \u003cmain class=\"dlws-frame-wrap\">\n      \u003ciframe data-dlws-frame title=\"斗罗创意工坊\" loading=\"lazy\" referrerpolicy=\"strict-origin-when-cross-origin\" allow=\"clipboard-read; clipboard-write\">\u003c/iframe>\n    \u003c/main>\n  \u003c/section>\n\u003c/div>\n";
  const PANEL_CSS = ".dlws-panel {\n  position: fixed;\n  inset: 0;\n  z-index: 999998;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  background: rgba(10, 14, 22, 0.74);\n  color: #e7eef8;\n}\n\n.dlws-panel[data-open=\"true\"] {\n  display: flex;\n}\n\n.dlws-panel,\n.dlws-panel .dlws-root {\n  width: min(1380px, 96vw);\n  height: min(860px, 92vh);\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n  border: 1px solid rgba(177, 198, 223, 0.26);\n  border-radius: 8px;\n  background: #111827;\n  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);\n  font-family: \"Inter\", \"Noto Sans SC\", system-ui, sans-serif;\n}\n\n.dlws-header {\n  min-height: 68px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 18px;\n  padding: 14px 18px;\n  border-bottom: 1px solid rgba(177, 198, 223, 0.18);\n  background: #152033;\n}\n\n.dlws-header h2 {\n  margin: 0;\n  font-size: 18px;\n  line-height: 1.2;\n  letter-spacing: 0;\n}\n\n.dlws-header p {\n  margin: 5px 0 0;\n  color: #aebbd0;\n  font-size: 13px;\n}\n\n.dlws-actions,\n.dlws-sidebar {\n  display: flex;\n  gap: 10px;\n}\n\n.dlws-actions button,\n.dlws-sidebar button {\n  min-height: 34px;\n  border: 1px solid rgba(177, 198, 223, 0.22);\n  border-radius: 6px;\n  padding: 0 12px;\n  background: #24324a;\n  color: #f1f6fc;\n  cursor: pointer;\n}\n\n.dlws-actions button:hover,\n.dlws-sidebar button:hover {\n  background: #2e405d;\n}\n\n.dlws-grid {\n  flex: 1;\n  min-height: 0;\n  display: grid;\n  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);\n}\n\n.dlws-sidebar {\n  min-width: 0;\n  flex-direction: column;\n  padding: 16px;\n  border-right: 1px solid rgba(177, 198, 223, 0.18);\n  background: #0f1724;\n  overflow: auto;\n}\n\n.dlws-field,\n.dlws-upload {\n  display: grid;\n  gap: 7px;\n  color: #cbd7e7;\n  font-size: 13px;\n}\n\n.dlws-field input,\n.dlws-upload input {\n  width: 100%;\n  min-height: 36px;\n  border: 1px solid rgba(177, 198, 223, 0.26);\n  border-radius: 6px;\n  padding: 7px 10px;\n  background: #0b1220;\n  color: #f1f6fc;\n}\n\n.dlws-status {\n  min-height: 22px;\n  color: #aebbd0;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n.dlws-status[data-tone=\"ok\"] {\n  color: #82e6a6;\n}\n\n.dlws-status[data-tone=\"warn\"] {\n  color: #ffd98a;\n}\n\n.dlws-status[data-tone=\"error\"] {\n  color: #ff9a9a;\n}\n\n.dlws-preview {\n  display: grid;\n  gap: 10px;\n  border: 1px solid rgba(177, 198, 223, 0.22);\n  border-radius: 8px;\n  padding: 12px;\n  background: #121d2e;\n}\n\n.dlws-preview h3 {\n  margin: 0;\n  font-size: 15px;\n}\n\n.dlws-preview p,\n.dlws-preview ul {\n  margin: 0;\n  color: #cbd7e7;\n  font-size: 13px;\n  line-height: 1.55;\n}\n\n.dlws-preview ul {\n  padding-left: 18px;\n}\n\n.dlws-preview .dlws-confirm {\n  background: #2b6a4a;\n}\n\n.dlws-frame-wrap {\n  min-width: 0;\n  min-height: 0;\n  background: #f8fafc;\n}\n\n.dlws-frame-wrap iframe {\n  display: block;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: #f8fafc;\n}\n\n@media (max-width: 780px) {\n  .dlws-panel {\n    padding: 8px;\n  }\n\n  .dlws-root {\n    width: 100%;\n    height: 96vh;\n  }\n\n  .dlws-header {\n    align-items: flex-start;\n    flex-direction: column;\n  }\n\n  .dlws-grid {\n    grid-template-columns: 1fr;\n    grid-template-rows: auto minmax(0, 1fr);\n  }\n\n  .dlws-sidebar {\n    max-height: 42vh;\n    border-right: 0;\n    border-bottom: 1px solid rgba(177, 198, 223, 0.18);\n  }\n}\n";
  const APP_JS = "(function () {\n  \"use strict\";\n\n  const scriptEl = document.currentScript;\n  const root = scriptEl && scriptEl.previousElementSibling && scriptEl.previousElementSibling.matches(\"[data-dlws-app]\")\n    ? scriptEl.previousElementSibling\n    : Array.from(document.querySelectorAll(\"[data-dlws-app]\")).pop();\n  if (!root || !root.__dlwsContext) return;\n\n  const { core, api, getWorkshopUrl, setWorkshopUrl, notify } = root.__dlwsContext;\n  const state = { pendingPackage: null };\n  const $ = selector => root.querySelector(selector);\n\n  function escapeHtml(value) {\n    return String(value == null ? \"\" : value)\n      .replace(/&/g, \"&amp;\")\n      .replace(/\u003c/g, \"&lt;\")\n      .replace(/>/g, \"&gt;\")\n      .replace(/\"/g, \"&quot;\");\n  }\n\n  function setStatus(message, tone = \"\") {\n    const node = $(\"[data-dlws-status]\");\n    if (!node) return;\n    node.textContent = message;\n    if (tone) node.dataset.tone = tone;\n    else delete node.dataset.tone;\n  }\n\n  function renderPreview(pkg) {\n    const preview = core.buildPreview(pkg);\n    const node = $(\"[data-dlws-preview]\");\n    if (!node) return preview;\n    if (!preview.ok) {\n      node.hidden = false;\n      node.innerHTML = [\n        \"\u003ch3>内容包不可安装\u003c/h3>\",\n        \"\u003cul>\",\n        preview.errors.map(error => `\u003cli>${escapeHtml(error)}\u003c/li>`).join(\"\"),\n        \"\u003c/ul>\",\n      ].join(\"\");\n      return preview;\n    }\n    node.hidden = false;\n    node.innerHTML = [\n      `\u003ch3>${escapeHtml(preview.title)}\u003c/h3>`,\n      `\u003cp>${escapeHtml(preview.summary || \"暂无简介\")}\u003c/p>`,\n      \"\u003cul>\",\n      `\u003cli>数据库行：${preview.counts.databaseRows}\u003c/li>`,\n      `\u003cli>世界书条目：${preview.counts.worldbookEntries}\u003c/li>`,\n      `\u003cli>剧情预设：${preview.counts.plotPresets}\u003c/li>`,\n      `\u003cli>模板补丁：${preview.counts.templatePatches}\u003c/li>`,\n      \"\u003c/ul>\",\n      '\u003cbutton type=\"button\" class=\"dlws-confirm\" data-dlws-action=\"confirm-install\">确认安装\u003c/button>',\n    ].join(\"\");\n    return preview;\n  }\n\n  function showPendingInstall(pkg) {\n    state.pendingPackage = pkg;\n    const preview = renderPreview(pkg);\n    setStatus(preview.ok ? \"请确认安装内容包。\" : \"内容包校验失败。\", preview.ok ? \"warn\" : \"error\");\n  }\n\n  async function readLocalPackage(file) {\n    const text = await file.text();\n    return JSON.parse(text);\n  }\n\n  async function handleFile(file) {\n    if (!file) return;\n    try {\n      const pkg = await readLocalPackage(file);\n      state.pendingPackage = pkg;\n      const preview = renderPreview(pkg);\n      setStatus(preview.ok ? \"本地内容包已读取，等待确认安装。\" : \"本地内容包校验失败。\", preview.ok ? \"warn\" : \"error\");\n    } catch (error) {\n      setStatus(error && error.message ? error.message : String(error), \"error\");\n    }\n  }\n\n  async function confirmInstall() {\n    if (!state.pendingPackage) {\n      setStatus(\"没有待安装内容包。\", \"warn\");\n      return;\n    }\n    setStatus(\"正在安装内容包...\", \"warn\");\n    const result = await api.installPackage(state.pendingPackage, { confirm: false });\n    if (result && result.ok) {\n      state.pendingPackage = null;\n      const node = $(\"[data-dlws-preview]\");\n      if (node) node.hidden = true;\n      setStatus(\"内容包已安装。\", \"ok\");\n      notify(\"success\", \"内容包已安装。\");\n    } else {\n      setStatus((result && (result.error || (result.errors || []).join(\"; \"))) || \"安装失败。\", \"error\");\n    }\n  }\n\n  function bind() {\n    const urlInput = $(\"[data-dlws-url]\");\n    if (urlInput) urlInput.value = getWorkshopUrl();\n\n    root.addEventListener(\"click\", async (event) => {\n      const button = event.target && event.target.closest && event.target.closest(\"[data-dlws-action]\");\n      if (!button) return;\n      const action = button.getAttribute(\"data-dlws-action\");\n      if (action === \"close\") api.close();\n      if (action === \"refresh\") api.refresh();\n      if (action === \"save-url\") {\n        try {\n          const saved = setWorkshopUrl(urlInput && urlInput.value);\n          setStatus(`已保存：${saved}`, \"ok\");\n        } catch (error) {\n          setStatus(error && error.message ? error.message : String(error), \"error\");\n        }\n      }\n      if (action === \"confirm-install\") await confirmInstall();\n    });\n\n    const fileInput = $(\"[data-dlws-file]\");\n    if (fileInput) {\n      fileInput.addEventListener(\"change\", () => {\n        handleFile(fileInput.files && fileInput.files[0]);\n      });\n    }\n  }\n\n  root.__dlwsAppApi = { showPendingInstall };\n  bind();\n  setStatus(\"创意工坊面板已就绪。\", \"ok\");\n})();\n";

  const Core = (function loadCore() {
    const module = { exports: {} };
    const exports = module.exports;
    try {
      new Function("module", "exports", "window", CORE_SOURCE)(module, exports, window);
    } catch (error) {
      console.error(`[${SCRIPT_NAME}] core load failed`, error);
    }
    return module.exports || window.DouLuoCreativeWorkshopCore;
  })();

  let bridgeBound = false;

  function hostWindows() {
    const out = [window];
    try { if (window.parent && window.parent !== window) out.push(window.parent); } catch (_) {}
    try { if (window.top && !out.includes(window.top)) out.push(window.top); } catch (_) {}
    return out;
  }

  function getGlobal(name) {
    for (const host of hostWindows()) {
      try { if (host && host[name] != null) return host[name]; } catch (_) {}
    }
    return null;
  }

  function notify(type, message) {
    for (const host of hostWindows()) {
      try {
        const t = host.toastr;
        if (t && typeof t[type] === "function") {
          t[type](message, SCRIPT_NAME);
          return;
        }
      } catch (_) {}
    }
    console[type === "error" ? "error" : "log"](`[${SCRIPT_NAME}] ${message}`);
  }

  function readWorkshopUrl() {
    try {
      const stored = localStorage.getItem(URL_STORAGE_KEY);
      if (stored && /^https?:\/\//i.test(stored)) return stored;
    } catch (_) {}
    return DEFAULT_WORKSHOP_URL;
  }

  function workshopOrigin() {
    try { return new URL(readWorkshopUrl()).origin; } catch (_) { return ""; }
  }

  function allowedOrigins() {
    const set = new Set(Array.isArray(ALLOWED_ORIGINS) ? ALLOWED_ORIGINS : []);
    const origin = workshopOrigin();
    if (origin) set.add(origin);
    return Array.from(set).filter(Boolean);
  }

  function isAllowedOrigin(origin) {
    return allowedOrigins().includes(String(origin || ""));
  }

  function ensureStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = PANEL_CSS;
  }

  function panelElement() {
    return document.getElementById(PANEL_ID);
  }

  function appRoot() {
    const panel = panelElement();
    return panel && panel.querySelector("[data-dlws-app]");
  }

  function runApp(root) {
    if (!root || root.dataset.dlwsMounted === "1") return;
    root.__dlwsContext = {
      core: Core,
      api: publicApi,
      getWorkshopUrl: readWorkshopUrl,
      setWorkshopUrl,
      notify,
    };
    const script = document.createElement("script");
    script.textContent = APP_JS + "\n//# sourceURL=douluo-creative-workshop-app.js";
    root.after(script);
    script.remove();
    root.dataset.dlwsMounted = "1";
  }

  function mount() {
    ensureStyle();
    let panel = panelElement();
    if (!panel) {
      panel = document.createElement("section");
      panel.id = PANEL_ID;
      panel.className = "dlws-panel";
      panel.setAttribute("data-dlws-panel", "");
      panel.innerHTML = PANEL_HTML;
      (document.body || document.documentElement).appendChild(panel);
    }
    runApp(appRoot());
    bindBridge();
    return panel;
  }

  function open() {
    const panel = mount();
    panel.dataset.open = "true";
    const frame = panel.querySelector("[data-dlws-frame]");
    const url = readWorkshopUrl();
    if (frame && /^https?:\/\//i.test(url) && !frame.src) frame.src = url;
    return true;
  }

  function close() {
    const panel = panelElement();
    if (panel) panel.dataset.open = "false";
    return true;
  }

  function toggle() {
    const panel = mount();
    if (panel.dataset.open === "true") return close();
    return open();
  }

  function unmount() {
    const panel = panelElement();
    if (panel) panel.remove();
    return true;
  }

  function setWorkshopUrl(url) {
    const next = String(url || "").trim();
    if (!/^https?:\/\//i.test(next)) throw new Error("Workshop URL must start with http:// or https://");
    try { localStorage.setItem(URL_STORAGE_KEY, next); } catch (_) {}
    const frame = panelElement() && panelElement().querySelector("[data-dlws-frame]");
    if (frame) frame.src = next;
    return next;
  }

  function refresh() {
    const frame = panelElement() && panelElement().querySelector("[data-dlws-frame]");
    if (frame) {
      frame.src = readWorkshopUrl();
      return true;
    }
    return false;
  }

  function readInstalls() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function writeInstalls(value) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value || {})); } catch (_) {}
  }

  function apiWriteFailed(result) {
    return result === false || result == null || (typeof result === "object" && (result.ok === false || result.success === false));
  }

  function getDatabaseApi() {
    return getGlobal("AutoCardUpdaterAPI");
  }

  function getWorldbookApi() {
    const helper = getGlobal("TavernHelper");
    const out = {};
    const names = ["getWorldbook", "createWorldbookEntries", "updateWorldbookWith", "deleteWorldbookEntries"];
    names.forEach((name) => {
      if (helper && typeof helper[name] === "function") out[name] = (...args) => helper[name](...args);
      else {
        const fn = getGlobal(name);
        if (typeof fn === "function") out[name] = (...args) => fn(...args);
      }
    });
    return out;
  }

  function rowCollection(sheet) {
    if (!sheet) return [];
    if (Array.isArray(sheet.content)) {
      return sheet.content.slice(1).map((row, index) => ({ row, rowIndex: index + 1, headers: sheet.content[0] || [] }));
    }
    if (Array.isArray(sheet.rows)) return sheet.rows.map((row, index) => ({ row, rowIndex: index + 1 }));
    if (Array.isArray(sheet.data)) return sheet.data.map((row, index) => ({ row, rowIndex: index + 1 }));
    return [];
  }

  function sheetByName(db, tableName) {
    return Object.values(db || {}).find((sheet) => sheet && (
      sheet.name === tableName || sheet.displayName === tableName || sheet.uid === tableName
    ));
  }

  function rowField(rowInfo, field) {
    if (!rowInfo) return undefined;
    if (Array.isArray(rowInfo.row)) {
      const index = (rowInfo.headers || []).indexOf(field);
      return index >= 0 ? rowInfo.row[index] : undefined;
    }
    return rowInfo.row && rowInfo.row[field];
  }

  function findRowIndex(db, tableName, match) {
    if (!match || typeof match !== "object" || !match.field) return null;
    const sheet = sheetByName(db, tableName);
    const rows = rowCollection(sheet);
    const found = rows.find((row) => String(rowField(row, match.field)) === String(match.value));
    return found ? found.rowIndex : null;
  }

  async function installDatabaseRow(op, manifest) {
    const api = getDatabaseApi();
    if (!api || typeof api.insertRow !== "function" || typeof api.updateRow !== "function") {
      throw new Error("AutoCardUpdaterAPI insert/update is unavailable");
    }
    let mode = op.mode || "insert";
    let rowIndex = op.rowIndex || null;
    if (mode === "upsert" && !rowIndex && op.match && typeof api.exportTableAsJson === "function") {
      rowIndex = findRowIndex(api.exportTableAsJson() || {}, op.tableName, op.match);
      mode = rowIndex ? "update" : "insert";
    }
    if (mode === "update" && rowIndex) {
      const result = await api.updateRow(op.tableName, rowIndex, op.data);
      if (apiWriteFailed(result)) throw new Error(`database update failed: ${op.tableName}`);
      manifest.databaseRows.push({ tableName: op.tableName, rowIndex, mode: "update" });
      return { kind: "databaseRow", action: "update", tableName: op.tableName, rowIndex };
    }
    const result = await api.insertRow(op.tableName, op.data);
    if (apiWriteFailed(result)) throw new Error(`database insert failed: ${op.tableName}`);
    const insertedIndex = typeof result === "number" ? result : null;
    manifest.databaseRows.push({ tableName: op.tableName, rowIndex: insertedIndex, mode: "insert" });
    return { kind: "databaseRow", action: "insert", tableName: op.tableName, rowIndex: insertedIndex };
  }

  async function installWorldbookEntry(op, manifest) {
    const api = getWorldbookApi();
    if (!op.worldbookName) throw new Error("worldbookName is required for worldbook entries");
    if (typeof api.createWorldbookEntries === "function") {
      const result = await api.createWorldbookEntries(op.worldbookName, [op.entry], { render: "immediate" });
      if (apiWriteFailed(result)) throw new Error(`worldbook insert failed: ${op.worldbookName}`);
    } else if (typeof api.updateWorldbookWith === "function") {
      const result = await api.updateWorldbookWith(op.worldbookName, (entries) => (Array.isArray(entries) ? entries : []).concat([op.entry]), { render: "immediate" });
      if (apiWriteFailed(result)) throw new Error(`worldbook update failed: ${op.worldbookName}`);
    } else {
      throw new Error("Worldbook write API is unavailable");
    }
    manifest.worldbookEntries.push({ worldbookName: op.worldbookName });
    return { kind: "worldbookEntry", worldbookName: op.worldbookName };
  }

  async function installPlotPreset(op, manifest) {
    const api = getDatabaseApi();
    if (!api || typeof api.importPlotPresetFromData !== "function") {
      throw new Error("plot preset import API is unavailable");
    }
    const result = await api.importPlotPresetFromData(op.preset, { overwrite: false, switchTo: false });
    if (apiWriteFailed(result)) throw new Error(`plot preset import failed: ${op.preset.name || "unnamed"}`);
    manifest.plotPresets.push({ name: op.preset.name || "" });
    return { kind: "plotPreset", name: op.preset.name || "" };
  }

  async function installTemplatePatch(op, manifest) {
    const api = getDatabaseApi();
    if (!api || typeof api.importTemplateFromData !== "function") {
      throw new Error("template import API is unavailable");
    }
    const result = await api.importTemplateFromData(op.templateData, { scope: op.scope || "chat", presetName: op.presetName });
    if (apiWriteFailed(result)) throw new Error(`template import failed: ${op.presetName || "unnamed"}`);
    manifest.templatePatches.push({ presetName: op.presetName || "", scope: op.scope || "chat" });
    return { kind: "templatePatch", presetName: op.presetName || "" };
  }

  async function refreshAfterInstall() {
    const api = getDatabaseApi();
    if (api && typeof api.refreshDataAndWorldbook === "function") {
      try { await api.refreshDataAndWorldbook(); } catch (error) { console.warn(`[${SCRIPT_NAME}] refresh failed`, error); }
    }
    const calc = getGlobal("DouLuoAutoCalc");
    if (calc && typeof calc.recalculate === "function") {
      try { await calc.recalculate({ reason: "creative-workshop-install", quiet: true }); } catch (error) { console.warn(`[${SCRIPT_NAME}] recalculate failed`, error); }
    }
  }

  async function executeInstall(plan) {
    const manifest = { packageId: plan.package.id, version: plan.package.version, title: plan.package.title, installedAt: new Date().toISOString(), databaseRows: [], worldbookEntries: [], plotPresets: [], templatePatches: [] };
    const results = [];
    for (const op of plan.operations) {
      if (op.kind === "databaseRow") results.push(await installDatabaseRow(op, manifest));
      else if (op.kind === "worldbookEntry") results.push(await installWorldbookEntry(op, manifest));
      else if (op.kind === "plotPreset") results.push(await installPlotPreset(op, manifest));
      else if (op.kind === "templatePatch") results.push(await installTemplatePatch(op, manifest));
    }
    const installs = readInstalls();
    installs[Core.packageKey(plan.package)] = manifest;
    writeInstalls(installs);
    await refreshAfterInstall();
    return { ok: true, manifest, results };
  }

  function previewPackage(pkg) {
    return Core.buildPreview(pkg);
  }

  async function installPackage(pkg, options = {}) {
    const plan = Core.buildInstallPlan(pkg);
    if (!plan.ok) return { ok: false, errors: plan.errors };
    if (options.confirm !== false) {
      open();
      const root = appRoot();
      if (root && root.__dlwsAppApi && typeof root.__dlwsAppApi.showPendingInstall === "function") {
        root.__dlwsAppApi.showPendingInstall(plan.package);
      }
      return { ok: true, pending: true, preview: plan.preview };
    }
    try {
      const result = await executeInstall(plan);
      notify("success", `已安装：${plan.package.title}`);
      return result;
    } catch (error) {
      notify("error", error && error.message ? error.message : String(error));
      return { ok: false, error: error && error.message ? error.message : String(error) };
    }
  }

  async function uninstallPackage(packageId, version) {
    const installs = readInstalls();
    const key = `${String(packageId || "").trim().toLowerCase()}@${String(version || "").trim()}`;
    const manifest = installs[key];
    if (!manifest) return { ok: false, error: "installed package not found" };
    const api = getDatabaseApi();
    const wb = getWorldbookApi();
    const removed = [];
    if (api && typeof api.deleteRow === "function") {
      for (const row of manifest.databaseRows || []) {
        if (row.mode === "insert" && row.rowIndex) {
          const result = await api.deleteRow(row.tableName, row.rowIndex);
          if (!apiWriteFailed(result)) removed.push({ kind: "databaseRow", tableName: row.tableName, rowIndex: row.rowIndex });
        }
      }
    }
    const predicate = (entry) => {
      const meta = entry && entry.extra && entry.extra.douluoCreativeWorkshop;
      return meta && meta.packageId === manifest.packageId && meta.packageVersion === manifest.version;
    };
    const books = Array.from(new Set((manifest.worldbookEntries || []).map((item) => item.worldbookName).filter(Boolean)));
    for (const worldbookName of books) {
      if (typeof wb.deleteWorldbookEntries === "function") {
        const result = await wb.deleteWorldbookEntries(worldbookName, predicate, { render: "immediate" });
        if (!apiWriteFailed(result)) removed.push({ kind: "worldbookEntry", worldbookName });
      } else if (typeof wb.updateWorldbookWith === "function") {
        const result = await wb.updateWorldbookWith(worldbookName, (entries) => (Array.isArray(entries) ? entries : []).filter((entry) => !predicate(entry)), { render: "immediate" });
        if (!apiWriteFailed(result)) removed.push({ kind: "worldbookEntry", worldbookName });
      }
    }
    delete installs[key];
    writeInstalls(installs);
    await refreshAfterInstall();
    return { ok: true, removed };
  }

  function bindBridge() {
    if (bridgeBound) return;
    bridgeBound = true;
    window.addEventListener("message", async (event) => {
      const data = event.data || {};
      if (!data || data.channel !== MESSAGE_CHANNEL || data.kind !== "request") return;
      const response = { channel: MESSAGE_CHANNEL, kind: "response", id: data.id || "" };
      if (!isAllowedOrigin(event.origin)) {
        event.source && event.source.postMessage({ ...response, ok: false, error: "origin not allowed" }, event.origin || "*");
        return;
      }
      try {
        if (data.action === "install-package") {
          const result = await installPackage(data.packageData, { confirm: data.confirm !== false });
          event.source && event.source.postMessage({ ...response, ok: result.ok !== false, payload: result }, event.origin);
          return;
        }
        if (data.action === "status") {
          event.source && event.source.postMessage({ ...response, ok: true, payload: status() }, event.origin);
          return;
        }
        throw new Error(`unknown action: ${data.action}`);
      } catch (error) {
        event.source && event.source.postMessage({ ...response, ok: false, error: error && error.message ? error.message : String(error) }, event.origin);
      }
    });
  }

  function status() {
    return {
      version: VERSION,
      mounted: !!panelElement(),
      open: !!(panelElement() && panelElement().dataset.open === "true"),
      workshopUrl: readWorkshopUrl(),
      allowedOrigins: allowedOrigins(),
      installed: Object.keys(readInstalls()).length,
      hasDatabaseApi: !!getDatabaseApi(),
      hasWorldbookApi: Object.keys(getWorldbookApi()).length > 0,
    };
  }

  const publicApi = {
    version: VERSION,
    mount,
    unmount,
    open,
    close,
    toggle,
    refresh,
    status,
    previewPackage,
    installPackage,
    uninstallPackage,
    setWorkshopUrl,
  };

  for (const host of hostWindows()) {
    try { host.DouLuoCreativeWorkshop = publicApi; } catch (_) {}
  }

  function start() {
    try {
      mount();
      close();
    } catch (error) {
      console.error(`[${SCRIPT_NAME}]`, error);
      notify("error", `Creative workshop mount failed: ${error && error.message ? error.message : error}`);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
