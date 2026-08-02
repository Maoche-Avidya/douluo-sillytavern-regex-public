// @name         [助手]斗罗大陆 I-IV · Soul Land 辅助卡片 @2.6
// @module       tavern-helper/auxiliary-cards
// @version      @2.6
// @source       tavern-helper-scripts/auxiliary-cards/dist/latest.json
"use strict";

(function () {
  "use strict";

  const SCRIPT_NAME = "斗罗辅助卡片助手脚本";
  const VERSION = "2.6";
  const BUILD_ID = "auxiliary-cards@2.6+4735e0c75ce1";
  const API_NAME = "DouLuoAuxiliaryCardsHelper";
  const STYLE_ID = "douluo-auxiliary-cards-helper-style";
  const CSS_TEXT = "[data-dlou-auxiliary-card-root=\"1\"],\n[data-dlou-auxiliary-card-root=\"1\"] * {\n  box-sizing: border-box;\n}\n\n[data-dlou-auxiliary-card-source=\"1\"][hidden] {\n  display: none !important;\n}\n\n.dlac-root {\n  width: 100%;\n  min-width: 0;\n  margin: 16px 0 20px;\n}\n\n.dlac-card {\n  --dlac-accent: #5ee7ff;\n  --dlac-accent-2: #8bb8c7;\n  --dlac-text: #edf6ff;\n  --dlac-muted: rgba(194, 210, 230, .76);\n  position: relative;\n  width: min(100%, 720px);\n  min-width: 0;\n  margin: 0 auto;\n  padding: 14px;\n  overflow: hidden;\n  color: var(--dlac-text);\n  border: 1px solid color-mix(in srgb, var(--dlac-accent) 44%, rgba(139, 184, 199, .26));\n  border-radius: 8px;\n  background:\n    linear-gradient(var(--dlac-accent), var(--dlac-accent)) left top / 34px 1px no-repeat,\n    linear-gradient(var(--dlac-accent), var(--dlac-accent)) left top / 1px 34px no-repeat,\n    linear-gradient(var(--dlac-accent-2), var(--dlac-accent-2)) right top / 34px 1px no-repeat,\n    linear-gradient(var(--dlac-accent-2), var(--dlac-accent-2)) right top / 1px 34px no-repeat,\n    linear-gradient(var(--dlac-accent), var(--dlac-accent)) left bottom / 34px 1px no-repeat,\n    linear-gradient(var(--dlac-accent), var(--dlac-accent)) left bottom / 1px 34px no-repeat,\n    linear-gradient(var(--dlac-accent-2), var(--dlac-accent-2)) right bottom / 34px 1px no-repeat,\n    linear-gradient(var(--dlac-accent-2), var(--dlac-accent-2)) right bottom / 1px 34px no-repeat,\n    linear-gradient(90deg, rgba(94, 231, 255, .10), transparent 44%),\n    linear-gradient(180deg, rgba(255, 255, 255, .055), transparent 38%),\n    linear-gradient(145deg, rgba(8, 22, 48, .92), rgba(4, 12, 28, .94));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, .10),\n    inset 0 -1px 0 rgba(255, 255, 255, .04),\n    inset 0 0 24px rgba(94, 231, 255, .07),\n    0 0 22px rgba(94, 231, 255, .10),\n    0 14px 34px rgba(0, 0, 0, .30);\n  backdrop-filter: blur(16px) saturate(132%);\n  -webkit-backdrop-filter: blur(16px) saturate(132%);\n  font: 14px/1.55 \"Noto Sans SC\", \"Microsoft YaHei\", system-ui, sans-serif;\n}\n\n.dlac-card::before {\n  content: \"\";\n  position: absolute;\n  inset: 0 0 auto;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, var(--dlac-accent), var(--dlac-accent-2), transparent);\n  opacity: .86;\n  pointer-events: none;\n}\n\n.dlac-card::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(rgba(94, 231, 255, .13) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(139, 184, 199, .10) 1px, transparent 1px);\n  background-size: 30px 30px;\n  opacity: .16;\n  pointer-events: none;\n}\n\n.dlac-head,\n.dlac-fields {\n  position: relative;\n  z-index: 1;\n}\n\n.dlac-head {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 11px;\n  padding-bottom: 11px;\n  border-bottom: 1px solid rgba(94, 231, 255, .27);\n}\n\n.dlac-emblem {\n  width: 38px;\n  height: 38px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(94, 231, 255, .48);\n  border-radius: 50%;\n  color: var(--dlac-accent);\n  background:\n    radial-gradient(circle, rgba(94, 231, 255, .20), transparent 62%),\n    rgba(4, 16, 34, .64);\n  box-shadow: 0 0 18px rgba(94, 231, 255, .20), inset 0 0 10px rgba(94, 231, 255, .12);\n}\n\n.dlac-emblem-core {\n  font-size: 21px;\n  line-height: 1;\n  transform: rotate(45deg);\n}\n\n.dlac-title {\n  min-width: 0;\n  display: grid;\n  gap: 2px;\n  line-height: 1.25;\n}\n\n.dlac-kicker {\n  color: var(--dlac-muted);\n  font-size: 10px;\n  font-weight: 700;\n}\n\n.dlac-title strong {\n  color: var(--dlac-text);\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.dlac-tags {\n  min-width: 0;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 6px;\n}\n\n.dlac-tags span {\n  max-width: 160px;\n  min-height: 22px;\n  display: inline-flex;\n  align-items: center;\n  padding: 1px 8px;\n  overflow-wrap: anywhere;\n  color: rgba(158, 226, 239, .90);\n  border: 1px solid rgba(94, 231, 255, .24);\n  border-radius: 999px;\n  background: rgba(94, 231, 255, .06);\n  box-shadow: inset 0 0 10px rgba(94, 231, 255, .04);\n  font-size: 11px;\n  font-weight: 600;\n  line-height: 1.35;\n}\n\n.dlac-fields {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0 14px;\n  margin-top: 12px;\n}\n\n.dlac-field {\n  min-width: 0;\n  display: grid;\n  grid-template-columns: minmax(58px, .38fr) minmax(0, 1fr);\n  gap: 9px;\n  align-items: start;\n  padding: 8px 0;\n  border-top: 1px solid rgba(94, 231, 255, .15);\n  line-height: 1.55;\n}\n\n.dlac-field.is-free {\n  grid-column: 1 / -1;\n  grid-template-columns: 1fr;\n}\n\n.dlac-label {\n  color: rgba(133, 224, 241, .90);\n  font-size: 12px;\n  font-weight: 700;\n  line-height: 1.5;\n}\n\n.dlac-value,\n.dlac-free-value {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n  color: var(--dlac-text);\n  font-size: 14px;\n}\n\n.dlac-field.is-important .dlac-value {\n  color: #9eeeff;\n  font-weight: 800;\n  text-shadow: 0 0 12px rgba(94, 231, 255, .24);\n}\n\n.dlac-card[data-outcome=\"success\"] {\n  --dlac-accent-2: #6ee7b7;\n}\n\n.dlac-card[data-outcome=\"failure\"] {\n  --dlac-accent-2: #ff7c91;\n}\n\n@media (max-width: 620px) {\n  .dlac-card {\n    padding: 12px;\n  }\n\n  .dlac-head {\n    grid-template-columns: auto minmax(0, 1fr);\n  }\n\n  .dlac-tags {\n    grid-column: 1 / -1;\n    justify-content: flex-start;\n  }\n\n  .dlac-fields {\n    grid-template-columns: 1fr;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dlac-root *,\n  .dlac-root *::before,\n  .dlac-root *::after {\n    scroll-behavior: auto !important;\n    transition: none !important;\n    animation: none !important;\n  }\n}\n";
  const DAILY_CHECK_TAG = "斗罗日常检定";
  const ROOT_SELECTOR = '[data-dlou-auxiliary-card-root="1"]';
  const SOURCE_SELECTOR = '[data-dlou-auxiliary-card-source="1"]';
  const MESSAGE_SELECTOR = ".mes, [data-message-id], [data-message-role]";
  const CONTENT_SELECTOR = ".mes_text, [data-message-content]";
  const IMPORTANT_LABELS = new Set(["结果", "状态", "目标剩余", "计算", "骰运", "等级变化", "属性变化"]);
  const CHIP_LABELS = ["角色", "目标", "类型", "标签"];
  const SCAN_DELAYS = [0, 80, 240, 750, 1600];

  const state = {
    scanRuns: 0,
    mountedTotal: 0,
    updatedTotal: 0,
    observerEntries: [],
    subscriptions: [],
    scanTimer: 0,
    pollTimer: 0,
    destroyed: false,
    lastScanAt: "",
    lastError: "",
  };

  function accessibleWindows() {
    const output = [];
    [window, window.parent, window.top].forEach((host) => {
      try {
        if (host && host.document && !output.includes(host)) output.push(host);
      } catch (_) {}
    });
    return output;
  }

  function contextFor(host) {
    try {
      if (host && host.TavernHelper && typeof host.TavernHelper.getContext === "function") {
        return host.TavernHelper.getContext();
      }
      if (host && typeof host.getContext === "function") return host.getContext();
    } catch (_) {}
    return null;
  }

  function injectStyle(doc) {
    if (!doc || !doc.head || doc.getElementById(STYLE_ID)) return;
    const style = doc.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS_TEXT;
    doc.head.appendChild(style);
  }

  function messageNodeFor(node) {
    const element = node && node.nodeType === 1 ? node : node && node.parentElement;
    return element && element.closest ? element.closest(MESSAGE_SELECTOR) : null;
  }

  function isUserMessage(message) {
    if (!message) return false;
    const role = String(message.getAttribute("data-message-role") || "").toLowerCase();
    const rawFlag = String(message.getAttribute("is_user") || message.dataset && message.dataset.isUser || "").toLowerCase();
    return role === "user"
      || rawFlag === "true"
      || rawFlag === "1"
      || message.classList.contains("user_mes")
      || message.classList.contains("is-user");
  }

  function isEligibleTarget(node) {
    const element = node && node.nodeType === 1 ? node : node && node.parentElement;
    if (!element || !element.isConnected) return false;
    if (element.closest(ROOT_SELECTOR)) return false;
    if (element.closest("textarea, script, style, template, [contenteditable='true']")) return false;
    return !isUserMessage(messageNodeFor(element));
  }

  function normalizedText(value) {
    return String(value || "").replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trim();
  }

  function elementSourceText(element) {
    if (!element) return "";
    const clone = element.cloneNode(true);
    clone.querySelectorAll("br").forEach((node) => node.replaceWith("\n"));
    clone.querySelectorAll("p, div, li").forEach((node) => node.appendChild(clone.ownerDocument.createTextNode("\n")));
    return normalizedText(clone.textContent);
  }

  function dailyCheckBodyFromLiteral(value) {
    const match = String(value || "").match(/<斗罗日常检定(?:\s[^>]*)?>([\s\S]*?)<\/斗罗日常检定\s*>/i);
    return match ? normalizedText(match[1]) : "";
  }

  function parseFields(body) {
    return normalizedText(body)
      .replace(/<br\s*\/?>/gi, "\n")
      .split(/\n+/)
      .map((line) => normalizedText(line))
      .filter(Boolean)
      .filter((line) => !/^<\/?斗罗/.test(line))
      .map((line) => {
        const match = line.match(/^([^:：]{1,18})\s*[:：]\s*([\s\S]*)$/);
        if (!match) return { label: "", value: line, free: true };
        return { label: match[1].trim(), value: match[2].trim(), free: false };
      });
  }

  function fieldValue(fields, names) {
    const field = fields.find((item) => !item.free && names.includes(item.label));
    return field ? field.value : "";
  }

  function outcomeTone(fields) {
    const result = fieldValue(fields, ["结果", "状态"]);
    if (/大失败|失败|未通过|失手|失利/.test(result)) return "failure";
    if (/大成功|成功|通过|达成|胜利/.test(result)) return "success";
    return "neutral";
  }

  function uniqueChips(fields) {
    const seen = new Set();
    return CHIP_LABELS
      .map((label) => fieldValue(fields, [label]))
      .map((value) => normalizedText(value).replace(/\s+/g, " "))
      .filter((value) => {
        if (!value || seen.has(value)) return false;
        seen.add(value);
        return true;
      });
  }

  function createElement(doc, tagName, className, text) {
    const node = doc.createElement(tagName);
    if (className) node.className = className;
    if (text != null) node.textContent = String(text);
    return node;
  }

  function renderCard(root, fields) {
    const doc = root.ownerDocument;
    let rendered = root.querySelector('[data-dlou-auxiliary-card-view="1"]');
    if (!rendered) {
      rendered = createElement(doc, "section", "dlac-card");
      rendered.setAttribute("data-dlou-auxiliary-card-view", "1");
      rendered.setAttribute("aria-label", "日常检定");
      root.appendChild(rendered);
    }
    rendered.replaceChildren();
    rendered.dataset.outcome = outcomeTone(fields);

    const header = createElement(doc, "header", "dlac-head");
    const emblem = createElement(doc, "span", "dlac-emblem");
    emblem.setAttribute("aria-hidden", "true");
    emblem.appendChild(createElement(doc, "span", "dlac-emblem-core", "◇"));
    header.appendChild(emblem);

    const titles = createElement(doc, "div", "dlac-title");
    titles.appendChild(createElement(doc, "span", "dlac-kicker", "检定"));
    titles.appendChild(createElement(doc, "strong", "", "日常检定"));
    header.appendChild(titles);

    const chips = uniqueChips(fields);
    if (chips.length) {
      const chipList = createElement(doc, "div", "dlac-tags");
      chips.forEach((value) => chipList.appendChild(createElement(doc, "span", "", value)));
      header.appendChild(chipList);
    }
    rendered.appendChild(header);

    const grid = createElement(doc, "div", "dlac-fields");
    fields.forEach((field) => {
      const important = !field.free
        && (IMPORTANT_LABELS.has(field.label) || /结果|状态|剩余|变化|获得|成功|失败/.test(field.label));
      const row = createElement(
        doc,
        "div",
        `dlac-field${field.free ? " is-free" : ""}${important ? " is-important" : ""}`,
      );
      if (field.free) {
        row.appendChild(createElement(doc, "span", "dlac-free-value", field.value));
      } else {
        row.appendChild(createElement(doc, "span", "dlac-label", field.label));
        row.appendChild(createElement(doc, "span", "dlac-value", field.value));
      }
      grid.appendChild(row);
    });
    rendered.appendChild(grid);
  }

  function signatureFor(rawBody) {
    let hash = 2166136261;
    const value = normalizedText(rawBody);
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `${value.length}:${(hash >>> 0).toString(16)}`;
  }

  function bodyFromRoot(root) {
    const source = root.querySelector(SOURCE_SELECTOR);
    if (!source) return "";
    if (source.dataset.sourceKind === "literal") return dailyCheckBodyFromLiteral(source.textContent);
    const tag = Array.from(source.children).find((node) => String(node.tagName || "").toLowerCase() === DAILY_CHECK_TAG);
    return elementSourceText(tag);
  }

  function updateRoot(root) {
    const body = bodyFromRoot(root);
    const fields = parseFields(body);
    if (!fields.length) return false;
    const signature = signatureFor(body);
    if (root.dataset.sourceSignature === signature && root.querySelector('[data-dlou-auxiliary-card-view="1"]')) return false;
    root.dataset.sourceSignature = signature;
    renderCard(root, fields);
    state.updatedTotal += 1;
    return true;
  }

  function createRoot(doc, sourceKind) {
    const root = createElement(doc, "div", "dlac-root");
    root.setAttribute("data-dlou-auxiliary-card-root", "1");
    root.setAttribute("data-dlou-auxiliary-card-type", "daily-check");
    root.setAttribute("data-dlou-auxiliary-card-version", VERSION);
    const source = createElement(doc, "div", "dlac-source");
    source.setAttribute("data-dlou-auxiliary-card-source", "1");
    source.dataset.sourceKind = sourceKind;
    source.hidden = true;
    root.appendChild(source);
    return { root, source };
  }

  function mountElementTag(tag) {
    if (!isEligibleTarget(tag)) return false;
    const body = elementSourceText(tag);
    const fields = parseFields(body);
    if (!fields.length || !tag.parentNode) return false;
    const nodes = createRoot(tag.ownerDocument, "element");
    tag.parentNode.insertBefore(nodes.root, tag);
    nodes.source.appendChild(tag);
    renderCard(nodes.root, fields);
    nodes.root.dataset.sourceSignature = signatureFor(body);
    state.mountedTotal += 1;
    return true;
  }

  function mountLiteralMatch(textNode, start, end, body) {
    if (!textNode || !textNode.parentNode || !isEligibleTarget(textNode)) return false;
    const fields = parseFields(body);
    if (!fields.length) return false;
    const tail = textNode.splitText(end);
    const literal = textNode.splitText(start);
    const nodes = createRoot(textNode.ownerDocument, "literal");
    literal.parentNode.insertBefore(nodes.root, literal);
    nodes.source.appendChild(literal);
    renderCard(nodes.root, fields);
    nodes.root.dataset.sourceSignature = signatureFor(body);
    state.mountedTotal += 1;
    void tail;
    return true;
  }

  function collectLiteralMatches(scope) {
    const doc = scope.nodeType === 9 ? scope : scope.ownerDocument;
    if (!doc || typeof doc.createTreeWalker !== "function") return [];
    const NodeFilterRef = doc.defaultView && doc.defaultView.NodeFilter || window.NodeFilter;
    const walker = doc.createTreeWalker(scope, NodeFilterRef.SHOW_TEXT);
    const matches = [];
    const pattern = /<斗罗日常检定(?:\s[^>]*)?>([\s\S]*?)<\/斗罗日常检定\s*>/gi;
    let node;
    while ((node = walker.nextNode())) {
      if (!isEligibleTarget(node)) continue;
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(node.nodeValue || ""))) {
        matches.push({ node, start: match.index, end: pattern.lastIndex, body: match[1] });
      }
    }
    return matches;
  }

  function scanScope(scope) {
    const doc = scope.nodeType === 9 ? scope : scope.ownerDocument;
    if (!doc) return { mounted: 0, updated: 0 };
    injectStyle(doc);
    let mounted = 0;
    let updated = 0;
    const searchRoot = scope.querySelectorAll ? scope : doc;

    if (searchRoot.matches && searchRoot.matches(ROOT_SELECTOR) && updateRoot(searchRoot)) updated += 1;
    searchRoot.querySelectorAll(ROOT_SELECTOR).forEach((root) => {
      if (updateRoot(root)) updated += 1;
    });

    const elementTags = [];
    if (searchRoot.nodeType === 1 && String(searchRoot.tagName || "").toLowerCase() === DAILY_CHECK_TAG) {
      elementTags.push(searchRoot);
    }
    if (typeof searchRoot.getElementsByTagName === "function") {
      elementTags.push(...Array.from(searchRoot.getElementsByTagName(DAILY_CHECK_TAG)));
    }
    Array.from(new Set(elementTags)).forEach((tag) => {
      if (mountElementTag(tag)) mounted += 1;
    });

    collectLiteralMatches(searchRoot).reverse().forEach((match) => {
      if (mountLiteralMatch(match.node, match.start, match.end, match.body)) mounted += 1;
    });
    return { mounted, updated };
  }

  function scanExisting(root) {
    if (state.destroyed) return { scanned: 0, mounted: 0, updated: 0, active: activeCount() };
    state.scanRuns += 1;
    let mounted = 0;
    let updated = 0;
    const scopes = root ? [root] : accessibleWindows().map((host) => host.document);
    Array.from(new Set(scopes)).forEach((scope) => {
      try {
        const result = scanScope(scope);
        mounted += result.mounted;
        updated += result.updated;
      } catch (error) {
        state.lastError = error && error.message ? error.message : String(error);
      }
    });
    state.lastScanAt = new Date().toISOString();
    return { scanned: scopes.length, mounted, updated, active: activeCount() };
  }

  function activeCount() {
    return accessibleWindows().reduce((total, host) => {
      try {
        return total + host.document.querySelectorAll(ROOT_SELECTOR).length;
      } catch (_) {
        return total;
      }
    }, 0);
  }

  function scheduleScan(root) {
    if (state.destroyed || state.scanTimer) return;
    state.scanTimer = window.setTimeout(() => {
      state.scanTimer = 0;
      scanExisting(root && root.isConnected ? root : null);
    }, 35);
  }

  function mutationScope(mutation) {
    const target = mutation && mutation.target;
    const element = target && target.nodeType === 1 ? target : target && target.parentElement;
    return messageNodeFor(element) || element && element.closest && element.closest(CONTENT_SELECTOR) || null;
  }

  function startObservers() {
    accessibleWindows().forEach((host) => {
      const doc = host.document;
      injectStyle(doc);
      const target = doc.querySelector("#chat") || doc.body || doc.documentElement;
      if (!target || state.observerEntries.some((entry) => entry.document === doc && entry.target === target)) return;
      const Observer = host.MutationObserver || window.MutationObserver;
      if (typeof Observer !== "function") return;
      const observer = new Observer((mutations) => {
        const mutation = mutations.find((item) => mutationScope(item));
        scheduleScan(mutation ? mutationScope(mutation) : null);
      });
      observer.observe(target, { childList: true, subtree: true, characterData: true });
      state.observerEntries.push({ document: doc, target, observer });
    });
  }

  function subscribeLifecycle() {
    accessibleWindows().forEach((host) => {
      const context = contextFor(host);
      const source = context && context.eventSource || host.eventSource;
      const eventTypes = context && (context.event_types || context.eventTypes) || host.event_types || host.eventTypes || {};
      if (!source || typeof source.on !== "function") return;
      ["CHAT_CHANGED", "MESSAGE_UPDATED", "MESSAGE_RECEIVED", "MESSAGE_EDITED", "GENERATION_ENDED"].forEach((key) => {
        const eventName = eventTypes[key] || key;
        if (state.subscriptions.some((item) => item.source === source && item.eventName === eventName)) return;
        const listener = () => SCAN_DELAYS.forEach((delay) => window.setTimeout(() => {
          startObservers();
          scanExisting();
        }, delay));
        try {
          source.on(eventName, listener);
          state.subscriptions.push({ source, eventName, listener });
        } catch (_) {}
      });
    });
  }

  function startPolling() {
    if (state.pollTimer || state.destroyed) return;
    const tick = () => {
      state.pollTimer = 0;
      if (state.destroyed) return;
      startObservers();
      subscribeLifecycle();
      if (!state.observerEntries.length && !state.subscriptions.length) scanExisting();
      state.pollTimer = window.setTimeout(tick, state.subscriptions.length ? 5000 : 900);
    };
    state.pollTimer = window.setTimeout(tick, 900);
  }

  function restoreRoot(root) {
    if (!root || !root.parentNode) return false;
    const source = root.querySelector(SOURCE_SELECTOR);
    if (source) {
      while (source.firstChild) root.parentNode.insertBefore(source.firstChild, root);
    }
    root.remove();
    return true;
  }

  function restoreAll() {
    let restored = 0;
    accessibleWindows().forEach((host) => {
      try {
        Array.from(host.document.querySelectorAll(ROOT_SELECTOR)).forEach((root) => {
          if (restoreRoot(root)) restored += 1;
        });
      } catch (_) {}
    });
    return { restored, active: activeCount() };
  }

  function status() {
    return {
      scriptName: SCRIPT_NAME,
      version: VERSION,
      buildId: BUILD_ID,
      tag: DAILY_CHECK_TAG,
      renderMode: "standalone-auxiliary-card",
      active: activeCount(),
      scanRuns: state.scanRuns,
      mountedTotal: state.mountedTotal,
      updatedTotal: state.updatedTotal,
      observerCount: state.observerEntries.length,
      subscriptionCount: state.subscriptions.length,
      lastScanAt: state.lastScanAt,
      lastError: state.lastError,
      destroyed: state.destroyed,
    };
  }

  function destroy() {
    if (state.destroyed) return status();
    state.destroyed = true;
    if (state.scanTimer) window.clearTimeout(state.scanTimer);
    if (state.pollTimer) window.clearTimeout(state.pollTimer);
    state.scanTimer = 0;
    state.pollTimer = 0;
    state.observerEntries.forEach((entry) => entry.observer.disconnect());
    state.observerEntries.length = 0;
    state.subscriptions.forEach((item) => {
      try {
        if (typeof item.source.off === "function") item.source.off(item.eventName, item.listener);
        else if (typeof item.source.removeListener === "function") item.source.removeListener(item.eventName, item.listener);
      } catch (_) {}
    });
    state.subscriptions.length = 0;
    restoreAll();
    return status();
  }

  const previousApis = [];
  accessibleWindows().forEach((host) => {
    try {
      const previous = host[API_NAME];
      if (previous && !previousApis.includes(previous)) previousApis.push(previous);
    } catch (_) {}
  });
  previousApis.forEach((previous) => {
    try {
      if (typeof previous.destroy === "function") previous.destroy();
    } catch (_) {}
  });

  const api = Object.freeze({ version: VERSION, buildId: BUILD_ID, scanExisting, restoreAll, status, destroy });
  accessibleWindows().forEach((host) => {
    try { host[API_NAME] = api; } catch (_) {}
  });

  function bootstrap() {
    startObservers();
    subscribeLifecycle();
    SCAN_DELAYS.forEach((delay) => window.setTimeout(() => scanExisting(), delay));
    startPolling();
    try { (window.console || console).info("[DouLuo Auxiliary Cards] loaded", status()); } catch (_) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  else bootstrap();
})();
