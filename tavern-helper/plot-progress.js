// @name         [助手]斗罗大陆 I-IV · Soul Land 剧情推进 @2.6
// @module       tavern-helper/plot-progress
// @version      @2.6
// @source       tavern-helper-scripts/plot-progress/dist/latest.json
"use strict";

(function () {
  "use strict";

  const SCRIPT_NAME = "斗罗剧情推进挂载助手脚本";
  const VERSION = "2.6";
  const BUILD_ID = "plot-progress@2.6+966e4d2e846d";
  const API_NAME = "DouLuoPlotProgressHelper";
  const STYLE_ID = "douluo-plot-progress-helper-style";
  const STORAGE_KEY = "douluo:plot-progress:panel-state:v1";
  const CSS_TEXT = ".dlpp-root,\n.dlpp-root * {\n  box-sizing: border-box;\n}\n\n.dlpp-native-player {\n  display: block;\n  min-width: 0;\n}\n\n.dlpp-native-player.is-plain-text {\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n\n.dlpp-root {\n  --dlpp-cyan: #5ee7ff;\n  --dlpp-gold: #e8c36c;\n  --dlpp-text: #edf6ff;\n  --dlpp-muted: rgba(194, 210, 230, .74);\n  width: 100%;\n  min-width: 0;\n  margin-top: 12px;\n  overflow: hidden;\n  border: 1px solid rgba(94, 231, 255, .24);\n  border-radius: 10px;\n  background:\n    linear-gradient(135deg, rgba(94, 231, 255, .10), transparent 42%),\n    linear-gradient(180deg, rgba(232, 195, 108, .07), transparent 38%),\n    rgba(4, 12, 28, .88);\n  color: var(--dlpp-text);\n  box-shadow: 0 12px 32px rgba(0, 0, 0, .28), inset 0 1px 0 rgba(255, 255, 255, .06);\n  font: 14px/1.65 \"Microsoft YaHei\", \"Noto Sans SC\", system-ui, sans-serif;\n}\n\n.dlpp-header {\n  width: 100%;\n  min-height: 54px;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border: 0;\n  background: linear-gradient(90deg, rgba(94, 231, 255, .18), rgba(6, 21, 45, .38));\n  color: inherit;\n  text-align: left;\n  font: inherit;\n}\n\nbutton.dlpp-header {\n  cursor: pointer;\n}\n\nbutton.dlpp-header:hover,\n.dlpp-root.is-expanded .dlpp-header {\n  background: linear-gradient(90deg, rgba(94, 231, 255, .24), rgba(6, 21, 45, .48));\n}\n\n.dlpp-orbit {\n  width: 32px;\n  height: 32px;\n  display: grid;\n  place-items: center;\n  border: 1px solid rgba(232, 195, 108, .48);\n  border-radius: 50%;\n  color: var(--dlpp-cyan);\n  background: radial-gradient(circle, rgba(94, 231, 255, .22), transparent 68%);\n  box-shadow: 0 0 18px rgba(94, 231, 255, .18);\n}\n\n.dlpp-title {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 700;\n}\n\n.dlpp-count {\n  color: var(--dlpp-gold);\n  font-size: 12px;\n  font-weight: 800;\n}\n\n.dlpp-body {\n  padding: 12px;\n  border-top: 1px solid rgba(94, 231, 255, .16);\n}\n\n.dlpp-body[hidden],\n.dlpp-pane[hidden] {\n  display: none;\n}\n\n.dlpp-tabs {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 8px;\n  margin-bottom: 10px;\n}\n\n.dlpp-tab {\n  min-width: 0;\n  min-height: 42px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 8px 10px;\n  border: 1px solid rgba(94, 231, 255, .20);\n  border-radius: 8px;\n  background: rgba(7, 18, 40, .62);\n  color: var(--dlpp-text);\n  cursor: pointer;\n  font: inherit;\n}\n\n.dlpp-tab.is-active,\n.dlpp-tab:hover {\n  border-color: rgba(94, 231, 255, .42);\n  background: linear-gradient(135deg, rgba(94, 231, 255, .16), transparent 70%), rgba(8, 22, 48, .86);\n}\n\n.dlpp-tab span {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-weight: 700;\n}\n\n.dlpp-tab small {\n  color: var(--dlpp-gold);\n  font-weight: 700;\n}\n\n.dlpp-tab[data-task-state=\"waiting\"] small,\n.dlpp-tab[data-task-state=\"partial\"] small {\n  color: var(--dlpp-muted);\n}\n\n.dlpp-tab[data-task-state=\"invalid\"] {\n  border-color: rgba(255, 143, 143, .26);\n}\n\n.dlpp-panes,\n.dlpp-pane {\n  min-width: 0;\n}\n\n.dlpp-pane {\n  display: grid;\n  gap: 9px;\n}\n\n.dlpp-card {\n  min-width: 0;\n  padding: 10px 11px;\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, .035);\n}\n\n.dlpp-card-title {\n  margin-bottom: 5px;\n  color: var(--dlpp-cyan);\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.dlpp-card-body {\n  max-width: 100%;\n  margin: 0;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n  color: rgba(237, 246, 255, .94);\n  font: inherit;\n}\n\n.dlpp-card-body.is-empty {\n  color: var(--dlpp-muted);\n  font-style: italic;\n}\n\n.dlpp-task-notice {\n  padding: 9px 10px;\n  border: 1px dashed rgba(94, 231, 255, .22);\n  border-radius: 8px;\n  color: var(--dlpp-muted);\n  background: rgba(94, 231, 255, .035);\n  font-size: 12px;\n}\n\n.dlpp-task-notice.is-invalid {\n  border-color: rgba(255, 143, 143, .26);\n  color: #ffb8b8;\n}\n\n.dlpp-memory-section {\n  display: grid;\n  gap: 8px;\n  margin-top: 2px;\n}\n\n.dlpp-memory-heading {\n  color: var(--dlpp-gold);\n  font-size: 12px;\n  font-weight: 800;\n}\n\n.dlpp-memory-view {\n  display: grid;\n  gap: 7px;\n  padding: 10px;\n  border: 1px dashed rgba(94, 231, 255, .22);\n  border-radius: 8px;\n  color: var(--dlpp-muted);\n  background: rgba(255, 255, 255, .02);\n}\n\n.dlpp-memory-view.is-warning {\n  border-color: rgba(232, 195, 108, .30);\n  color: var(--dlpp-gold);\n}\n\n.dlpp-memory-title {\n  color: var(--dlpp-cyan);\n  font-weight: 700;\n}\n\n.dlpp-memory-field {\n  display: grid;\n  grid-template-columns: minmax(72px, auto) minmax(0, 1fr);\n  gap: 10px;\n}\n\n.dlpp-memory-field b {\n  color: rgba(237, 246, 255, .76);\n}\n\n.dlpp-memory-field span {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n  color: rgba(237, 246, 255, .94);\n}\n\n.dlpp-progression-layout,\n.dlpp-progression-fallback {\n  display: grid;\n  min-width: 0;\n  gap: 10px;\n}\n\n.dlpp-progression-badges {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n\n.dlpp-badge {\n  display: inline-flex;\n  align-items: center;\n  min-height: 28px;\n  padding: 4px 10px;\n  border: 1px solid rgba(94, 231, 255, .26);\n  border-radius: 999px;\n  background: rgba(94, 231, 255, .08);\n  color: var(--dlpp-cyan);\n  overflow-wrap: anywhere;\n  font-size: 12px;\n  font-weight: 800;\n}\n\n.dlpp-badge.is-status {\n  border-color: rgba(232, 195, 108, .32);\n  background: rgba(232, 195, 108, .09);\n  color: var(--dlpp-gold);\n}\n\n.dlpp-badge.is-mode {\n  border-color: rgba(163, 128, 255, .34);\n  background: rgba(130, 94, 225, .10);\n  color: #cdbbff;\n}\n\n.dlpp-anchor-track {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1.15fr) auto minmax(0, 1fr);\n  align-items: stretch;\n  gap: 7px;\n}\n\n.dlpp-anchor-node {\n  min-width: 0;\n  padding: 9px 10px;\n  border: 1px solid rgba(255, 255, 255, .08);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, .03);\n}\n\n.dlpp-anchor-node.is-current {\n  border-color: rgba(94, 231, 255, .36);\n  background: linear-gradient(135deg, rgba(94, 231, 255, .14), rgba(255, 255, 255, .025));\n  box-shadow: inset 0 0 0 1px rgba(94, 231, 255, .06);\n}\n\n.dlpp-anchor-label,\n.dlpp-target-label {\n  display: block;\n  margin-bottom: 3px;\n  color: var(--dlpp-muted);\n  font-size: 11px;\n  font-weight: 700;\n}\n\n.dlpp-anchor-value,\n.dlpp-progress-value,\n.dlpp-target-anchor {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  white-space: pre-wrap;\n}\n\n.dlpp-anchor-arrow {\n  align-self: center;\n  color: rgba(94, 231, 255, .62);\n  font-weight: 800;\n}\n\n.dlpp-target-card {\n  display: grid;\n  grid-template-columns: auto minmax(88px, auto) minmax(0, 1fr);\n  align-items: center;\n  gap: 9px;\n  padding: 10px 11px;\n  border: 1px solid rgba(232, 195, 108, .26);\n  border-radius: 8px;\n  background: linear-gradient(100deg, rgba(232, 195, 108, .10), rgba(255, 255, 255, .025));\n}\n\n.dlpp-target-card .dlpp-target-label {\n  margin: 0;\n}\n\n.dlpp-target-chapter {\n  color: var(--dlpp-gold);\n}\n\n.dlpp-progress-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 9px;\n}\n\n.dlpp-progress-card.is-objective,\n.dlpp-progress-card.is-continuity,\n.dlpp-progress-card.is-evidence,\n.dlpp-progress-card.is-spoiler {\n  border-color: rgba(94, 231, 255, .12);\n}\n\n.dlpp-progression-fallback::before {\n  content: \"推进结构暂不可解析，以下为原始安全视图\";\n  color: var(--dlpp-gold);\n  font-size: 12px;\n}\n\n.dlpp-root.is-pending {\n  opacity: .88;\n}\n\n.dlpp-root.is-pending .dlpp-orbit {\n  animation: dlppPulse 1.4s ease-in-out infinite;\n}\n\n.dlpp-root.dlpp-retry-ready {\n  display: grid;\n  gap: 5px;\n  padding: 11px 13px;\n  border-color: rgba(255, 190, 96, .3);\n  background: linear-gradient(145deg, rgba(255, 190, 96, .08), rgba(15, 20, 34, .92));\n}\n\n.dlpp-retry-title {\n  color: var(--dlpp-gold);\n  font-size: 13px;\n  font-weight: 800;\n}\n\n.dlpp-retry-body {\n  color: var(--dlpp-muted);\n  font-size: 12px;\n  line-height: 1.6;\n  overflow-wrap: anywhere;\n}\n\n@keyframes dlppPulse {\n  0%, 100% { opacity: .52; transform: scale(.92); }\n  50% { opacity: 1; transform: scale(1); }\n}\n\n@media (max-width: 560px) {\n  .dlpp-tabs {\n    grid-template-columns: 1fr;\n  }\n\n  .dlpp-anchor-track {\n    grid-template-columns: 1fr;\n  }\n\n  .dlpp-anchor-arrow {\n    justify-self: center;\n    transform: rotate(90deg);\n  }\n\n  .dlpp-target-card,\n  .dlpp-progress-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .dlpp-memory-field {\n    grid-template-columns: 1fr;\n    gap: 2px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dlpp-root.is-pending .dlpp-orbit {\n    animation: none;\n  }\n}\n";
  const PLOT_TASK_CONTRACT = {"version":"2.6","assemblyMode":"fixed_placeholders","generationMode":"single_native_task","inputField":"player_input","runtimeField":"runtime_state","assessmentState":{"fields":["input_mode","rp_detail","declared_action","fact_support","supporting_facts","established_constraints","knowledge_boundaries","power_position","power_evidence","tactical_factors","known_risks","unsupported_claims","missing_information"],"enums":{"input_mode":["player_rp","mixed","ai_advance","unknown"],"rp_detail":["low","medium","high","unknown"],"fact_support":["confirmed","partial","unknown","conflict"],"power_position":["unknown","favorable","even","disadvantaged","overwhelming"]}},"chapterBaseline":{"fields":["basis","route_source","era","current_chapter","previous_anchor","current_anchor","next_anchor","anchor_status","prior_evidence","uncertainties"],"enums":{"basis":["pre_turn"],"route_source":["pre_turn_explicit","player_profile","prior_valid_route","unknown"],"anchor_status":["pending","active","ready_to_advance","completed","unknown"]}},"progressionGuidance":{"fields":["progression_mode","target_chapter","target_anchor","narrative_objective","suggested_hook","continuity_constraints","transition_conditions","spoiler_boundary"],"enums":{"progression_mode":["initialization","continue_scene","advance_anchor","bridge_anchor","bridge_chapter","free_branch"]}},"runtimeState":{"fields":["readiness","body_reserve","soul_reserve","spirit_reserve","injuries","ongoing_statuses","confirmed_abilities","effective_limits","recovery_conditions"],"enums":{"readiness":["稳态","受限","危急","失能","unknown"],"body_reserve":["充裕","吃紧","透支","枯竭","unknown"],"soul_reserve":["充裕","吃紧","透支","枯竭","unknown"],"spirit_reserve":["充裕","吃紧","透支","枯竭","unknown"]}},"outputFields":["player_input","recall_detail","recall","time_state","scene_state","runtime_state","time_recall","situation_assessment","butterfly_delta","chapter_baseline","progression_guidance"],"tasks":[{"key":"P","id":"douluo_v2_unified_plot","order":0,"fields":["player_input","recall_detail","recall","time_state","scene_state","runtime_state","time_recall","situation_assessment","butterfly_delta","chapter_baseline","progression_guidance"]}],"repairGroups":[{"key":"A","maxTokens":800,"fields":["recall_detail","recall","time_recall"]},{"key":"B","maxTokens":900,"fields":["player_input","situation_assessment"]},{"key":"C","maxTokens":1400,"fields":["butterfly_delta","chapter_baseline","progression_guidance"]},{"key":"D","maxTokens":1100,"fields":["time_state","scene_state","runtime_state"]}]};
  const TASK_TITLES = { A: "事实与记忆", B: "局势评估", C: "章节推进", D: "当前状态", P: "统一剧情包" };
  const TASK_GROUP_KEYS = { A: "facts", B: "assessment", C: "progression", D: "runtime" };
  const CONTRACT_TASKS = normalizeTaskContract(PLOT_TASK_CONTRACT);
  const LEGACY_CONTRACT_TASKS = legacyTaskContract();
  const DISPLAY_GROUPS = normalizeRepairGroups(PLOT_TASK_CONTRACT);
  const INPUT_FIELD = String(PLOT_TASK_CONTRACT && PLOT_TASK_CONTRACT.inputField || "player_input");
  const INPUT_TAGS = [INPUT_FIELD, "input"];
  const AUDIT_FIELDS = DISPLAY_GROUPS.filter((group) => group.key !== "C")
    .flatMap((group) => group.fields).filter((field) => field !== INPUT_FIELD);
  const PROGRESSION_FIELDS = (DISPLAY_GROUPS.find((group) => group.key === "C") || {}).fields
    || ["butterfly_delta", "chapter_baseline", "progression_guidance"];
  const ALL_FIELDS = Array.from(new Set(PLOT_TASK_CONTRACT.outputFields || CONTRACT_TASKS.flatMap((task) => task.fields)));
  const TASK_GROUPS = DISPLAY_GROUPS.map((group) => ({
    key: TASK_GROUP_KEYS[group.key] || group.key.toLowerCase(),
    taskKey: group.key,
    title: TASK_TITLES[group.key] || group.key,
    fields: group.fields.filter((field) => field !== INPUT_FIELD),
  }));
  const LABELS = {
    recall_detail: "召回依据",
    recall: "召回引用",
    time_state: "时间事实",
    scene_state: "场景状态",
    runtime_state: "运行状态",
    time_recall: "时间召回",
    situation_assessment: "局势评估",
    butterfly_delta: "已确认变化",
    chapter_baseline: "章节与锚点基线",
    progression_guidance: "本轮推进建议",
  };
  const PROGRESSION_MODES = new Set([
    "initialization",
    "continue_scene",
    "advance_anchor",
    "bridge_anchor",
    "bridge_chapter",
    "free_branch",
  ]);
  const ROUTE_SOURCES = new Set(["pre_turn_explicit", "player_profile", "prior_valid_route", "unknown"]);
  const ANCHOR_STATUSES = new Set(["pending", "active", "ready_to_advance", "completed", "unknown"]);
  const BASELINE_KEYS = [
    "basis",
    "route_source",
    "era",
    "current_chapter",
    "previous_anchor",
    "current_anchor",
    "next_anchor",
    "anchor_status",
    "prior_evidence",
    "uncertainties",
  ];
  const GUIDANCE_KEYS = [
    "progression_mode",
    "target_chapter",
    "target_anchor",
    "narrative_objective",
    "suggested_hook",
    "continuity_constraints",
    "transition_conditions",
    "spoiler_boundary",
  ];
  const MODE_LABELS = {
    initialization: "初始化",
    continue_scene: "延续场景",
    advance_anchor: "推进锚点",
    bridge_anchor: "衔接锚点",
    bridge_chapter: "过渡章节",
    free_branch: "自由分支",
  };
  const STATUS_LABELS = {
    pending: "待推进",
    active: "进行中",
    ready_to_advance: "可推进",
    completed: "已完成",
    unknown: "待确认",
  };
  const MESSAGE_SELECTOR = ".mes, [data-message-id], [data-message-role]";
  const CONTENT_SELECTOR = ".mes_text, [data-message-content]";
  const EDIT_TEXTAREA_SELECTOR = ".edit_textarea, .reasoning_edit_textarea";
  const EXPLICIT_EDIT_SELECTOR = [
    "[contenteditable='true']",
    "[data-editing='true']",
    "[data-editing='1']",
    "[data-message-editing='true']",
    "[data-message-editing='1']",
    ".editing",
    ".mes_editing",
  ].join(", ");
  const MESSAGE_OWNER_ATTRIBUTE = "data-dlou-plot-progress-message";
  const MAIN_TEXT_ARTIFACT_SELECTOR = [
    '[data-dlou-main-dialogue-line="1"]',
    '[data-dlou-main-text-host="1"]',
    "[data-main-text-root]",
  ].join(", ");
  const SCAN_DELAYS = [0, 80, 240, 750, 1600];
  const FALLBACK_POLL_MS = 5000;
  const MEMORY_LONG_RETRY_MS = 15000;
  const COMPANION_LIFECYCLE_EVENT = "douluo-agent-recall:lifecycle";

  const state = {
    mounted: 0,
    pending: 0,
    updated: 0,
    scanRuns: 0,
    observerEntries: [],
    subscriptions: [],
    originals: new Map(),
    messageSnapshots: new Map(),
    tokens: new WeakMap(),
    dirtyRoots: new Set(),
    scanTimer: 0,
    pollTimer: 0,
    destroyed: false,
    lastError: "",
    lastRawPreview: "",
    lastMessageId: "",
    lastSource: "none",
    lastQrfPlotLength: 0,
    lastFieldCount: 0,
    lastSkipReason: "not-scanned",
    lastMountSource: "none",
    roleNormalizations: 0,
    clearedMainTextArtifacts: 0,
    lastContractVersion: "none",
    lastProgressionPresent: 0,
    lastProgressionComplete: false,
    lastRecoveryState: "not-observed",
    lastCompanionLifecycle: { phase: "idle", messageId: null, reasonCode: "", updatedAt: 0 },
    companionRetryFloors: new Map(),
    lastTaskStates: {},
    lastTaskSources: {},
    lastMemory: { references: 0, resolved: 0, missing: 0, reads: 0, status: "idle" },
    memoryCache: new Map(),
    memoryHydrations: new Map(),
  };

    function legacyTaskContract() {
    return [
      { key: "A", id: "douluo_v2_context_facts", order: 0, fields: ["recall_detail", "recall", "time_recall"] },
      { key: "B", id: "douluo_v2_situation_assessment", order: 1, fields: ["player_input", "situation_assessment"] },
      { key: "C", id: "douluo_v2_chapter_progression", order: 2, fields: ["butterfly_delta", "chapter_baseline", "progression_guidance"] },
      { key: "D", id: "douluo_v2_runtime_context", order: 3, fields: ["time_state", "scene_state", "runtime_state"] },
    ];
  }

  function normalizeTaskContract(contract) {
    const fallback = [{
      key: "P",
      id: "douluo_v2_unified_plot",
      order: 0,
      fields: ["player_input", "recall_detail", "recall", "time_state", "scene_state", "runtime_state", "time_recall", "situation_assessment", "butterfly_delta", "chapter_baseline", "progression_guidance"],
    }];
    const tasks = contract && Array.isArray(contract.tasks) ? contract.tasks : fallback;
    const normalized = tasks.map((task, index) => ({
      key: String(task && task.key || "").toUpperCase(),
      id: String(task && task.id || ""),
      order: Number.isFinite(Number(task && task.order)) ? Number(task.order) : index,
      fields: Array.from(new Set(Array.isArray(task && task.fields) ? task.fields.map(String).filter(Boolean) : [])),
    })).filter((task) => task.key && task.id && task.fields.length);
    return (normalized.length ? normalized : fallback).sort((left, right) => left.order - right.order);
  }

  function normalizeRepairGroups(contract) {
    const source = contract && Array.isArray(contract.repairGroups) && contract.repairGroups.length
      ? contract.repairGroups
      : legacyTaskContract();
    return source.map((group, index) => ({
      key: String(group && group.key || "").toUpperCase(),
      order: Number.isFinite(Number(group && group.order)) ? Number(group.order) : index,
      fields: Array.from(new Set(Array.isArray(group && group.fields) ? group.fields.map(String).filter(Boolean) : [])),
    })).filter((group) => group.key && group.fields.length).sort((left, right) => left.order - right.order);
  }

  function accessibleWindows() {
    const values = [window];
    try { if (window.parent && window.parent !== window) values.push(window.parent); } catch (_) {}
    try { if (window.top && !values.includes(window.top)) values.push(window.top); } catch (_) {}
    const seen = new Set();
    return values.filter((host) => {
      try {
        if (!host || !host.document || seen.has(host.document)) return false;
        seen.add(host.document);
        return true;
      } catch (_) {
        return false;
      }
    });
  }

  function rootWindow() {
    const values = accessibleWindows();
    return values.length ? values[values.length - 1] : window;
  }

  function getGlobal(name) {
    for (const host of accessibleWindows().slice().reverse()) {
      try { if (host && host[name]) return host[name]; } catch (_) {}
    }
    return null;
  }

  function contextFor(host) {
    try {
      return host && host.SillyTavern && typeof host.SillyTavern.getContext === "function"
        ? host.SillyTavern.getContext()
        : null;
    } catch (_) {
      return null;
    }
  }

  function currentContext() {
    for (const host of accessibleWindows().slice().reverse()) {
      const context = contextFor(host);
      if (context) return context;
    }
    return null;
  }

  function injectStyle(doc) {
    if (!doc || !doc.head || doc.getElementById(STYLE_ID)) return;
    const style = doc.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS_TEXT;
    doc.head.appendChild(style);
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function tagMatches(source, tagName) {
    const matches = [];
    const pattern = new RegExp("<\\s*" + escapeRegExp(tagName) + "\\b[^>]*>([\\s\\S]*?)<\\s*\\/\\s*" + escapeRegExp(tagName) + "\\s*>", "gi");
    let match;
    while ((match = pattern.exec(String(source || "")))) matches.push(match[1]);
    return matches;
  }

  function containsOpeningTag(source, tagName) {
    return new RegExp("<\\s*" + escapeRegExp(tagName) + "\\b", "i").test(String(source || ""));
  }

  function textFromMarkup(doc, value) {
    const template = doc.createElement("template");
    template.innerHTML = String(value == null ? "" : value)
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p\s*>\s*<p\b[^>]*>/gi, "\n");
    return String(template.content.textContent || "").replace(/\r\n/g, "\n").trim();
  }

  function parseTaskRaw(doc, task, source, sourceName, directTaskRaw) {
    const raw = String(source || "");
    const fields = {};
    const counts = {};
    task.fields.forEach((field) => {
      const matches = tagMatches(raw, field);
      counts[field] = matches.length;
      fields[field] = matches.length === 1 ? textFromMarkup(doc, matches[0]) : "";
    });
    const recognized = task.fields.filter((field) => counts[field] > 0).length;
    const present = task.fields.filter((field) => counts[field] === 1 && !!fields[field]).length;
    const duplicateFields = task.fields.filter((field) => counts[field] > 1);
    const missingFields = task.fields.filter((field) => counts[field] === 0 || !fields[field]);
    let status = "waiting";
    if (raw) {
      if (!recognized) status = directTaskRaw ? "invalid" : "waiting";
      else if (duplicateFields.length) status = "invalid";
      else if (!missingFields.length) status = "ready";
      else status = "partial";
    }
    return {
      key: task.key,
      id: task.id,
      raw,
      source: sourceName || "none",
      fields,
      counts,
      present,
      fieldsToDisplayPresent: task.fields.filter((field) => field !== INPUT_FIELD && counts[field] === 1 && !!fields[field]).length,
      fieldsToDisplayTotal: task.fields.filter((field) => field !== INPUT_FIELD).length,
      total: task.fields.length,
      status,
      duplicateFields,
      missingFields,
    };
  }

  function parseLegacyPlayerInput(doc, source) {
    for (const tagName of INPUT_TAGS) {
      const matches = tagMatches(source, tagName);
      if (matches.length === 1) return textFromMarkup(doc, matches[0]);
    }
    return "";
  }

  function supplementTaskRaw(task, primary, fallbacks) {
    let raw = String(primary || "");
    for (const field of task.fields) {
      if (tagMatches(raw, field).length) continue;
      for (const source of fallbacks || []) {
        const matches = tagMatches(source, field);
        if (matches.length !== 1 || !String(matches[0] || "").trim()) continue;
        raw += `${raw ? "\n" : ""}<${field}>${matches[0]}</${field}>`;
        break;
      }
    }
    return raw;
  }

  function buildViewModel(doc, resolved) {
    const fallbackRaw = String(resolved.fallbackRaw || "");
    const legacyContextRaw = taskText(resolved.record, "douluo_v2_context_facts");
    const hasCurrentTaskRaw = CONTRACT_TASKS.some((task) => !!taskText(resolved.record, task.id));
    const hasLegacyTaskRaw = LEGACY_CONTRACT_TASKS.some((task) => !!taskText(resolved.record, task.id));
    const activeTasks = hasCurrentTaskRaw
      ? CONTRACT_TASKS
      : hasLegacyTaskRaw ? LEGACY_CONTRACT_TASKS : CONTRACT_TASKS;
    const nativeTaskModels = activeTasks.map((task) => {
      const direct = taskText(resolved.record, task.id);
      const isLegacyTask = activeTasks === LEGACY_CONTRACT_TASKS;
      const supplemented = supplementTaskRaw(
        task,
        direct,
        [fallbackRaw, isLegacyTask && task.key !== "A" ? legacyContextRaw : ""],
      );
      return parseTaskRaw(
        doc,
        task,
        supplemented || fallbackRaw,
        direct
          ? `qrf_plot_tasks:${task.key}${supplemented !== direct ? "+legacy" : ""}`
          : supplemented ? "qrf_plot_tasks:A-legacy" : (fallbackRaw ? resolved.fallbackSource : "none"),
        !!direct,
      );
    });
    if (!nativeTaskModels.some((task) => task.status !== "waiting")) return null;
    const unifiedModel = activeTasks === CONTRACT_TASKS
      ? nativeTaskModels.find((task) => task.key === "P")
      : null;
    const taskModels = unifiedModel
      ? DISPLAY_GROUPS.map((group) => parseTaskRaw(
        doc,
        { key: group.key, id: unifiedModel.id, fields: group.fields },
        unifiedModel.raw,
        unifiedModel.source,
        unifiedModel.source.startsWith("qrf_plot_tasks:"),
      ))
      : nativeTaskModels;
    const fields = {};
    const counts = {};
    taskModels.forEach((task) => task.id && Object.keys(task.fields).forEach((field) => {
      fields[field] = task.fields[field];
      counts[field] = task.counts[field];
    }));
    const authoritativePlayer = playerTextFromRecord(resolved.record);
    const playerTask = taskModels.find((task) => Object.prototype.hasOwnProperty.call(task.fields, INPUT_FIELD));
    const legacyPlayer = parseLegacyPlayerInput(doc, fallbackRaw || (playerTask || {}).raw || "");
    // A native final injection deliberately overwrites `mes` with the packet. In
    // that case SillyTavern's formatted DOM contains all field bodies but no
    // literal opening tags. Never prefer that flattened DOM over the packet's
    // authoritative player_input: doing so feeds our own rendered panel back
    // into the next scan and grows the message on every MutationObserver turn.
    const playerInput = authoritativePlayer || legacyPlayer || resolved.domPlayerText;
    const totalPresent = taskModels.reduce((total, task) => total + task.fieldsToDisplayPresent, 0);
    const complete = nativeTaskModels.every((task) => task.status === "ready");
    const progressionPresent = PROGRESSION_FIELDS.filter((field) => counts[field] === 1 && !!fields[field]).length;
    const progressionDetected = PROGRESSION_FIELDS.some((field) => Number(counts[field] || 0) > 0);
    const progressionComplete = PROGRESSION_FIELDS.every((field) => counts[field] === 1 && !!fields[field]);
    return {
      playerInput,
      fields,
      counts,
      tasks: taskModels,
      taskStates: Object.fromEntries(taskModels.map((task) => [task.key, task.status])),
      taskSources: Object.fromEntries(taskModels.map((task) => [task.key, task.source])),
      totalPresent,
      totalFields: taskModels.reduce((total, task) => total + task.fieldsToDisplayTotal, 0),
      complete,
      progressionDetected,
      progressionPresent,
      progressionComplete,
      contractVersion: String(PLOT_TASK_CONTRACT && PLOT_TASK_CONTRACT.version || "unknown-contract"),
      hashSource: JSON.stringify(nativeTaskModels.map((task) => [task.key, task.raw, task.source])) + "\n" + playerInput,
    };
  }

  function hashText(value) {
    const text = String(value || "");
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0") + ":" + text.length;
  }

    function messageNodeFor(node) {
    if (!node || node.nodeType !== 1) return null;
    if (node.matches && node.matches(MESSAGE_SELECTOR)) return node;
    return node.closest ? node.closest(MESSAGE_SELECTOR) : null;
  }

  function contentNodeFor(node) {
    if (!node || node.nodeType !== 1) return null;
    if (node.matches && node.matches(CONTENT_SELECTOR)) return node;
    const message = messageNodeFor(node);
    return message && message.querySelector ? message.querySelector(CONTENT_SELECTOR) : null;
  }

  function isUserMessage(message) {
    if (!message || message.nodeType !== 1) return false;
    const role = String(message.getAttribute("data-message-role") || "").toLowerCase();
    const isUser = String(message.getAttribute("is_user") || "").toLowerCase();
    return role === "user" || isUser === "true" || message.classList.contains("user");
  }

  function snapshotAttribute(node, name) {
    return {
      present: !!(node && node.hasAttribute && node.hasAttribute(name)),
      value: node && node.getAttribute ? node.getAttribute(name) : null,
    };
  }

  function restoreAttribute(node, name, snapshot) {
    if (!node || !snapshot) return;
    if (snapshot.present) node.setAttribute(name, snapshot.value == null ? "" : snapshot.value);
    else node.removeAttribute(name);
  }

  function rememberContent(content, force) {
    if (!content || (!force && state.originals.has(content))) return;
    state.originals.set(content, {
      html: content.innerHTML,
      plotProgress: snapshotAttribute(content, "data-dlou-plot-progress"),
      plotHash: snapshotAttribute(content, "data-dlou-plot-hash"),
      plotState: snapshotAttribute(content, "data-dlou-plot-state"),
    });
  }

  function claimUserMessage(message) {
    if (!message) return false;
    if (!state.messageSnapshots.has(message)) {
      state.messageSnapshots.set(message, {
        role: snapshotAttribute(message, "data-message-role"),
        owner: snapshotAttribute(message, MESSAGE_OWNER_ATTRIBUTE),
      });
    }
    const changed = String(message.getAttribute("data-message-role") || "").toLowerCase() !== "user";
    if (changed) message.setAttribute("data-message-role", "user");
    if (message.getAttribute(MESSAGE_OWNER_ATTRIBUTE) !== "1") message.setAttribute(MESSAGE_OWNER_ATTRIBUTE, "1");
    if (changed) state.roleNormalizations += 1;
    return changed;
  }

  function mainTextArtifactCount(content) {
    if (!content || !content.querySelectorAll) return 0;
    return content.querySelectorAll(MAIN_TEXT_ARTIFACT_SELECTOR).length;
  }

  function isVisibleEditControl(node, boundary) {
    if (!node || node.hidden || String(node.getAttribute && node.getAttribute("aria-hidden") || "").toLowerCase() === "true") return false;
    let current = node;
    while (current && current !== boundary) {
      if (current.hidden) return false;
      const style = current.style;
      if (style && (style.display === "none" || style.visibility === "hidden" || style.visibility === "collapse")) return false;
      current = current.parentElement;
    }
    const view = node.ownerDocument && node.ownerDocument.defaultView;
    if (view && typeof view.getComputedStyle === "function") {
      const computed = view.getComputedStyle(node);
      if (computed.display === "none" || computed.visibility === "hidden" || computed.visibility === "collapse") return false;
    }
    return true;
  }

  function messageIsEditing(message) {
    if (!message || !message.querySelector) return false;
    if (message.matches && message.matches(EXPLICIT_EDIT_SELECTOR)) return true;
    if (Array.from(message.querySelectorAll(EDIT_TEXTAREA_SELECTOR)).some((node) => isVisibleEditControl(node, message))) return true;
    if (Array.from(message.querySelectorAll(EXPLICIT_EDIT_SELECTOR)).some((node) => isVisibleEditControl(node, message))) return true;
    return Array.from(message.querySelectorAll("textarea")).some((node) => isVisibleEditControl(node, message));
  }

  function restoreMainTextArtifacts(content) {
    if (!content || !content.querySelectorAll) return 0;
    let restored = 0;
    Array.from(content.querySelectorAll('[data-dlou-main-dialogue-line="1"]')).forEach((wrapper) => {
      const source = Array.from(wrapper.children || []).find((child) => child.getAttribute && child.getAttribute("data-dlou-main-dialogue-source") === "1")
        || wrapper.querySelector('[data-dlou-main-dialogue-source="1"]');
      const parent = wrapper.parentNode;
      if (!source || !parent) return;
      while (source.firstChild) parent.insertBefore(source.firstChild, wrapper);
      wrapper.remove();
      restored += 1;
    });
    Array.from(content.querySelectorAll('[data-dlou-main-text-host="1"], [data-main-text-root]')).forEach((host) => {
      const source = host.querySelector && host.querySelector('[data-dlui-native-source="main-text"], [data-dlou-main-dialogue-source="1"]');
      const parent = host.parentNode;
      if (!parent) return;
      if (source) {
        let moved = 0;
        while (source.firstChild) { parent.insertBefore(source.firstChild, host); moved += 1; }
        const raw = source.getAttribute && source.getAttribute("data-dlui-native-source-raw");
        if (!moved && raw) parent.insertBefore(content.ownerDocument.createTextNode(raw), host);
      }
      host.remove();
      restored += 1;
    });
    [
      "data-dlou-main-text-mode",
      "data-dlou-main-text-mounted",
      "data-dlou-main-text-content-hash",
      "data-dlou-main-text-render-hash",
      "data-dlou-main-text-dialogue-count",
      "data-dlui-native-content-suppressed",
    ].forEach((name) => content.removeAttribute(name));
    return restored;
  }

  function messageIdFor(message) {
    if (!message) return "";
    return String(
      message.getAttribute("mesid") ||
      message.getAttribute("data-message-id") ||
      message.dataset && (message.dataset.messageId || message.dataset.mesid) ||
      ""
    );
  }

  function rawLooksRelevant(value) {
    const text = String(value || "");
    return ALL_FIELDS.some((tag) => containsOpeningTag(text, tag));
  }

  function rawFromDomAttributes(message, content) {
    const candidates = [
      content && content.getAttribute("data-raw-message"),
      message && message.getAttribute("data-raw-message"),
      content && content.getAttribute("data-message"),
      message && message.getAttribute("data-message"),
    ];
    return candidates.find(rawLooksRelevant) || "";
  }

  function rawFromDomContent(content) {
    const candidates = [content && content.innerHTML, content && content.textContent];
    return candidates.find(rawLooksRelevant) || "";
  }

  function legacyPacketFromMessageRecord(record) {
    if (!record || typeof record !== "object") return "";
    const values = [record.mes, record.message, record.content, record.text];
    if (Array.isArray(record.swipes)) {
      const swipeIndex = Number(record.swipe_id == null ? record.swipeIndex : record.swipe_id);
      if (Number.isInteger(swipeIndex) && record.swipes[swipeIndex] != null) values.unshift(record.swipes[swipeIndex]);
    }
    return values.find(rawLooksRelevant) || "";
  }

  function playerTextFromRecord(record) {
    if (!record || typeof record !== "object") return "";
    const isLegacyPacket = (value) => rawLooksRelevant(value) && INPUT_TAGS.some((tag) => containsOpeningTag(value, tag));
    if (Array.isArray(record.swipes)) {
      const swipeIndex = Number(record.swipe_id == null ? record.swipeIndex : record.swipe_id);
      if (Number.isInteger(swipeIndex) && record.swipes[swipeIndex] != null) {
        const swipe = String(record.swipes[swipeIndex] || "").trim();
        if (swipe && !isLegacyPacket(swipe)) return swipe;
      }
    }
    for (const value of [record.mes, record.message, record.content, record.text]) {
      const text = typeof value === "string" ? value.trim() : "";
      if (text && !isLegacyPacket(text)) return text;
    }
    return "";
  }

  function exactMessageRecord(records, messageId, acceptSingleResult) {
    if (!Array.isArray(records) || messageId === "") return null;
    const numericId = Number(messageId);
    if (Number.isInteger(numericId) && numericId >= 0 && records[numericId]) return records[numericId];
    const match = records.find((record, index) => String(record && (record.message_id ?? record.id ?? index)) === String(messageId));
    if (match) return match;
    return acceptSingleResult && records.length === 1 ? records[0] : null;
  }

  function qrfPlotFromRecord(record) {
    return record && typeof record.qrf_plot === "string" ? record.qrf_plot.trim() : "";
  }

  function taskText(record, taskId) {
    const tasks = record && record.qrf_plot_tasks;
    if (!tasks || typeof tasks !== "object") return "";
    const value = tasks[taskId];
    if (typeof value === "string") return value.trim();
    if (value && typeof value === "object") {
      for (const key of ["output", "result", "content", "text", "raw"]) {
        if (typeof value[key] === "string" && value[key].trim()) return value[key].trim();
      }
    }
    return "";
  }

  function inferRecoveryState(record, parsed) {
    if (!parsed) return "not-observed";
    const states = parsed.taskStates || {};
    if (Object.values(states).every((value) => value === "ready")) return "tasks-complete";
    if (Object.values(states).some((value) => value === "invalid")) return "task-format-invalid";
    if (Object.values(states).some((value) => value === "partial")) return "tasks-partial";
    if (record && record.qrf_plot_tasks) return "waiting-for-tasks";
    return "legacy-partial";
  }

  function recordFromContext(messageId) {
    if (messageId === "") return null;
    for (const host of accessibleWindows().slice().reverse()) {
      const context = contextFor(host);
      if (!context || !Array.isArray(context.chat)) continue;
      const record = exactMessageRecord(context.chat, messageId, false);
      if (record) return record;
    }
    return null;
  }

  async function recordFromTavernHelper(messageId) {
    const helper = getGlobal("TavernHelper");
    if (!helper || typeof helper.getChatMessages !== "function" || messageId === "") {
      return null;
    }
    try {
      const range = /^\d+$/.test(String(messageId)) ? Number(messageId) : messageId;
      const result = await helper.getChatMessages(range, { include_swipes: true });
      const records = Array.isArray(result) ? result : (result && Array.isArray(result.messages) ? result.messages : []);
      const record = exactMessageRecord(records, messageId, true);
      if (record) return record;
    } catch (error) {
      state.lastError = error && error.message ? error.message : String(error);
    }
    return null;
  }

  async function resolveSources(message, content) {
    const messageId = messageIdFor(message);
    const contextRecord = recordFromContext(messageId);
    const helperRecord = contextRecord ? null : await recordFromTavernHelper(messageId);
    const record = contextRecord || helperRecord;
    const qrfPlot = qrfPlotFromRecord(record);
    const legacy = legacyPacketFromMessageRecord(record);
    const attributeRaw = rawFromDomAttributes(message, content);
    const visibleRaw = rawFromDomContent(content);
    const fallbackRaw = qrfPlot || legacy || attributeRaw || visibleRaw || "";
    const fallbackSource = qrfPlot
      ? (contextRecord ? "context:qrf_plot" : "tavern-helper:qrf_plot")
      : legacy
        ? "tavern-helper:legacy-message"
        : attributeRaw
          ? "dom:raw-attribute"
          : visibleRaw ? "dom:visible-content" : "none";
    const hasTaskRaw = [...CONTRACT_TASKS, ...LEGACY_CONTRACT_TASKS].some((task) => !!taskText(record, task.id));
    const ownedContent = !!(content && (
      content.getAttribute("data-dlou-plot-progress") === "1"
      || content.querySelector('[data-dlou-plot-progress-root="1"]')
    ));
    return {
      record,
      fallbackRaw,
      fallbackSource,
      source: hasTaskRaw ? "qrf_plot_tasks" : fallbackSource,
      qrfPlotLength: qrfPlot.length,
      // Once mounted, this node contains both the player display and the whole
      // progress panel. It is output, never a valid input source for a rescan.
      domPlayerText: content && !ownedContent && !rawLooksRelevant(content.textContent) ? String(content.textContent || "").trim() : "",
    };
  }

    function sanitizeFormattedHtml(doc, value) {
    const template = doc.createElement("template");
    template.innerHTML = String(value || "");
    template.content.querySelectorAll("script, iframe, object, embed, style, link, meta").forEach((node) => node.remove());
    template.content.querySelectorAll("*").forEach((node) => {
      Array.from(node.attributes || []).forEach((attribute) => {
        const name = String(attribute.name || "").toLowerCase();
        const attrValue = String(attribute.value || "").trim().toLowerCase();
        if (name.startsWith("on") || ((name === "href" || name === "src") && attrValue.startsWith("javascript:"))) {
          node.removeAttribute(attribute.name);
        }
      });
    });
    return template.content;
  }
  function nativePlayerContent(doc, message, text) {
    const player = doc.createElement("div");
    player.className = "dlpp-native-player";
    player.setAttribute("data-dlou-plot-player", "1");
    const context = currentContext();
    const formatter = context && context.messageFormatter;
    let formatted = "";
    if (typeof formatter === "function") {
      try {
        formatted = formatter(text, "", false, true, Number(messageIdFor(message)));
      } catch (_) {
        formatted = "";
      }
    }
    if (typeof formatted === "string" && formatted.trim()) {
      player.appendChild(sanitizeFormattedHtml(doc, formatted));
    } else {
      player.textContent = text;
      player.classList.add("is-plain-text");
    }
    return player;
  }

  function element(doc, tagName, className, text) {
    const node = doc.createElement(tagName);
    if (className) node.className = className;
    if (text != null) node.textContent = String(text);
    return node;
  }

  function parseStructuredField(value, keys, validators) {
    const parsed = {};
    let invalid = false;
    String(value || "").split(/\r?\n/).forEach((line) => {
      if (!line.trim()) return;
      const match = /^\s*([a-z_]+)\s*[:：]\s*(.*?)\s*$/.exec(line);
      if (!match || !keys.includes(match[1]) || Object.prototype.hasOwnProperty.call(parsed, match[1])) {
        invalid = true;
        return;
      }
      parsed[match[1]] = match[2];
    });
    if (invalid || keys.some((key) => !String(parsed[key] || "").trim())) return null;
    if (validators && Object.entries(validators).some(([key, validator]) => !validator(parsed[key]))) return null;
    return parsed;
  }

  function parseProgressionDetails(parsed) {
    const baseline = parseStructuredField(parsed.fields.chapter_baseline, BASELINE_KEYS, {
      basis: (value) => value === "pre_turn",
      route_source: (value) => ROUTE_SOURCES.has(value),
      anchor_status: (value) => ANCHOR_STATUSES.has(value),
    });
    const guidance = parseStructuredField(parsed.fields.progression_guidance, GUIDANCE_KEYS, {
      progression_mode: (value) => PROGRESSION_MODES.has(value),
    });
    return baseline && guidance ? { baseline, guidance } : null;
  }

  function detailCard(doc, title, value, className) {
    const card = element(doc, "section", "dlpp-card dlpp-progress-card" + (className ? " " + className : ""));
    card.appendChild(element(doc, "div", "dlpp-card-title", title));
    card.appendChild(element(doc, "div", "dlpp-progress-value", value || "none"));
    return card;
  }

  function progressionPaneContent(doc, parsed) {
    const fragment = doc.createDocumentFragment();
    const details = parseProgressionDetails(parsed);
    if (!details) {
      const fallback = element(doc, "div", "dlpp-progression-fallback");
      fallback.setAttribute("data-dlpp-progression-layout", "fallback");
      fallback.appendChild(cardForField(doc, "chapter_baseline", parsed.fields.chapter_baseline));
      fallback.appendChild(cardForField(doc, "progression_guidance", parsed.fields.progression_guidance));
      fragment.appendChild(fallback);
      return fragment;
    }

    const { baseline, guidance } = details;
    const layout = element(doc, "div", "dlpp-progression-layout");
    layout.setAttribute("data-dlpp-progression-layout", "structured");

    const badges = element(doc, "div", "dlpp-progression-badges");
    const chapterBadge = element(doc, "span", "dlpp-badge is-chapter", baseline.current_chapter);
    chapterBadge.setAttribute("data-dlpp-badge", "chapter");
    const statusBadge = element(doc, "span", "dlpp-badge is-status", STATUS_LABELS[baseline.anchor_status] || baseline.anchor_status);
    statusBadge.setAttribute("data-dlpp-badge", "status");
    const modeBadge = element(doc, "span", "dlpp-badge is-mode", MODE_LABELS[guidance.progression_mode] || guidance.progression_mode);
    modeBadge.setAttribute("data-dlpp-badge", "mode");
    badges.append(chapterBadge, statusBadge, modeBadge);
    layout.appendChild(badges);

    const track = element(doc, "div", "dlpp-anchor-track");
    [
      ["previous", "上一锚点", baseline.previous_anchor],
      ["current", "当前锚点", baseline.current_anchor],
      ["next", "下一锚点", baseline.next_anchor],
    ].forEach(([key, title, value], index) => {
      const anchor = element(doc, "section", "dlpp-anchor-node" + (key === "current" ? " is-current" : ""));
      anchor.setAttribute("data-dlpp-anchor", key);
      anchor.appendChild(element(doc, "small", "dlpp-anchor-label", title));
      anchor.appendChild(element(doc, "div", "dlpp-anchor-value", value));
      track.appendChild(anchor);
      if (index < 2) track.appendChild(element(doc, "span", "dlpp-anchor-arrow", "→"));
    });
    layout.appendChild(track);

    const target = element(doc, "section", "dlpp-target-card");
    target.setAttribute("data-dlpp-progress-target", "1");
    target.appendChild(element(doc, "small", "dlpp-target-label", "本轮目标"));
    target.appendChild(element(doc, "strong", "dlpp-target-chapter", guidance.target_chapter));
    target.appendChild(element(doc, "span", "dlpp-target-anchor", guidance.target_anchor));
    layout.appendChild(target);

    const cards = element(doc, "div", "dlpp-progress-grid");
    cards.appendChild(detailCard(doc, "叙事目标", guidance.narrative_objective, "is-objective"));
    cards.appendChild(detailCard(doc, "建议钩子", guidance.suggested_hook, "is-hook"));
    cards.appendChild(detailCard(doc, "连续性约束", guidance.continuity_constraints, "is-continuity"));
    cards.appendChild(detailCard(doc, "过渡条件", guidance.transition_conditions, "is-transition"));
    cards.appendChild(detailCard(doc, "前文证据", baseline.prior_evidence, "is-evidence"));
    cards.appendChild(detailCard(doc, "不确定项", baseline.uncertainties, "is-uncertainties"));
    cards.appendChild(detailCard(doc, "剧透边界", guidance.spoiler_boundary, "is-spoiler"));
    cards.appendChild(detailCard(doc, "路由来源", baseline.route_source + " · " + baseline.era, "is-route"));
    layout.appendChild(cards);
    fragment.appendChild(layout);
    return fragment;
  }

  function readPanelState(groups) {
    const defaultGroup = groups.some((group) => group.key === "facts") ? "facts" : (groups[0] && groups[0].key || "facts");
    const fallback = { expanded: false, activeGroup: defaultGroup };
    try {
      const raw = rootWindow().localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") return fallback;
      return {
        expanded: parsed.expanded === true,
        activeGroup: groups.some((group) => group.key === (parsed.activeGroup === "recall" ? "facts" : parsed.activeGroup))
          ? (parsed.activeGroup === "recall" ? "facts" : parsed.activeGroup)
          : defaultGroup,
      };
    } catch (_) {
      return fallback;
    }
  }

  function writePanelState(value) {
    try { rootWindow().localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); } catch (_) {}
  }

  function applyPanelState(root, value) {
    const available = Array.from(root.querySelectorAll("[data-dlpp-group]")).map((button) => button.getAttribute("data-dlpp-group"));
    const defaultGroup = available.includes("facts") ? "facts" : (available[0] || "facts");
    const activeGroup = available.includes(value.activeGroup) ? value.activeGroup : defaultGroup;
    const normalized = { expanded: value.expanded === true, activeGroup };
    const expanded = normalized.expanded;
    root.classList.toggle("is-expanded", expanded);
    const toggle = root.querySelector("[data-dlpp-toggle]");
    const body = root.querySelector("[data-dlpp-body]");
    if (toggle) toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (body) body.hidden = !expanded;
    root.querySelectorAll("[data-dlpp-group]").forEach((button) => {
      const active = button.getAttribute("data-dlpp-group") === normalized.activeGroup;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
    });
    root.querySelectorAll("[data-dlpp-pane]").forEach((pane) => {
      pane.hidden = pane.getAttribute("data-dlpp-pane") !== normalized.activeGroup;
    });
    return normalized;
  }

  function cardForField(doc, field, value) {
    const card = element(doc, "section", "dlpp-card");
    card.setAttribute("data-dlpp-field", field);
    card.appendChild(element(doc, "div", "dlpp-card-title", LABELS[field] || field));
    const body = element(doc, "pre", "dlpp-card-body", value || "none");
    if (!value) body.classList.add("is-empty");
    card.appendChild(body);
    return card;
  }

  function recallReferences(values) {
    const output = [];
    const seen = new Set();
    String(values || "").replace(/(小总结|大总结)\s*#\s*(\d+)/g, (matched, name, rowId) => {
      const reference = name + "#" + Number(rowId);
      if (!seen.has(reference)) {
        seen.add(reference);
        output.push(reference);
      }
      return matched;
    });
    return output;
  }

  function parseMaybeJson(value) {
    if (typeof value !== "string") return value;
    try { return JSON.parse(value); } catch (_) { return null; }
  }

  function sheetCandidates(database) {
    if (!database || typeof database !== "object") return [];
    if (Array.isArray(database)) return database.map((sheet, index) => [String(index), sheet]);
    const direct = Object.entries(database);
    for (const key of ["tables", "sheets", "data"]) {
      const nested = database[key];
      if (nested && typeof nested === "object") {
        const entries = Array.isArray(nested) ? nested.map((sheet, index) => [String(index), sheet]) : Object.entries(nested);
        direct.push(...entries);
      }
    }
    return direct;
  }

  function findSummarySheet(database, summaryName) {
    const aliases = summaryName === "小总结"
      ? new Set(["小总结", "short_summary", "shortSummary", "sheet_v2_shortSummary"])
      : new Set(["大总结", "long_summary", "longSummary", "sheet_v2_longSummary"]);
    for (const [key, sheet] of sheetCandidates(database)) {
      const names = [key, sheet && sheet.name, sheet && sheet.title, sheet && sheet.tableName, sheet && sheet.physicalName, sheet && sheet.uid, sheet && sheet.id]
        .map((value) => String(value || "").trim()).filter(Boolean);
      if (names.some((name) => aliases.has(name))) return sheet;
    }
    return null;
  }

  function summaryRows(sheet) {
    const source = Array.isArray(sheet) ? sheet : sheet && (sheet.content || sheet.rows || sheet.data || sheet.values);
    if (!Array.isArray(source) || !source.length) return [];
    if (!Array.isArray(source[0])) return source.filter((row) => row && typeof row === "object");
    const headers = source[0].map((value) => String(value == null ? "" : value).trim());
    return source.slice(1).map((row) => {
      const output = {};
      headers.forEach((header, index) => { if (header) output[header] = row[index]; });
      return output;
    });
  }

  function summaryRow(database, reference) {
    const match = /^(小总结|大总结)#(\d+)$/.exec(String(reference || ""));
    if (!match) return null;
    const rows = summaryRows(findSummarySheet(database, match[1]));
    return rows.find((row, index) => {
      const rowId = row && (row.row_id ?? row.行号 ?? row.id ?? row.ID ?? (index + 1));
      return Number(rowId) === Number(match[2]);
    }) || null;
  }

  function memoryChatKey() {
    const context = currentContext();
    return String(context && (context.chatId || context.chat_id) || "current-chat");
  }

  function databaseSnapshot(chatKey, force) {
    if (force) state.memoryCache.delete(chatKey);
    const cached = state.memoryCache.get(chatKey);
    if (cached && cached.value) return Promise.resolve(cached.value);
    if (cached && cached.promise) return cached.promise;
    const api = getGlobal("AutoCardUpdaterAPI");
    if (!api || typeof api.exportTableAsJson !== "function") return Promise.reject(new Error("等待 TavernDB 只读接口"));
    const entry = { value: null, promise: null };
    entry.promise = Promise.resolve().then(() => api.exportTableAsJson()).then((result) => {
      const database = parseMaybeJson(result);
      if (!database || typeof database !== "object") throw new Error("数据库快照不可读");
      entry.value = database;
      entry.promise = null;
      state.lastMemory.reads += 1;
      return database;
    }).catch((error) => {
      state.memoryCache.delete(chatKey);
      throw error;
    });
    state.memoryCache.set(chatKey, entry);
    return entry.promise;
  }

  function renderMemoryRow(view, reference, row) {
    view.replaceChildren();
    view.className = "dlpp-memory-view is-loaded";
    view.setAttribute("data-memory-state", "ready");
    view.appendChild(element(view.ownerDocument, "div", "dlpp-memory-title", reference));
    Object.entries(row).filter(([, value]) => value != null && String(value).trim()).slice(0, 12).forEach(([key, value]) => {
      const field = element(view.ownerDocument, "div", "dlpp-memory-field");
      field.appendChild(element(view.ownerDocument, "b", "", key));
      field.appendChild(element(view.ownerDocument, "span", "", value));
      view.appendChild(field);
    });
  }

  async function hydrateMemoryRoot(root, references, chatKey, force) {
    const hydration = state.memoryHydrations.get(chatKey);
    if (!root || !root.isConnected || !references.length) {
      if (hydration && root) hydration.roots.delete(root);
      return;
    }
    state.lastMemory = { ...state.lastMemory, references: references.length, status: "loading" };
    try {
      const database = await databaseSnapshot(chatKey, force);
      let resolved = 0;
      references.forEach((reference) => {
        const view = root.querySelector('[data-dlpp-memory-view="' + reference + '"]');
        if (!view) return;
        const row = summaryRow(database, reference);
        if (row) {
          resolved += 1;
          renderMemoryRow(view, reference, row);
        } else {
          view.className = "dlpp-memory-view is-warning";
          view.setAttribute("data-memory-state", "missing");
          view.textContent = reference + " 暂未写入数据库，将自动重试。";
        }
      });
      state.lastMemory = { ...state.lastMemory, resolved, missing: references.length - resolved, status: resolved === references.length ? "ready" : "partial" };
      if (resolved === references.length) {
        if (hydration) hydration.roots.delete(root);
      } else scheduleMemoryRetry(chatKey);
    } catch (error) {
      references.forEach((reference) => {
        const view = root.querySelector('[data-dlpp-memory-view="' + reference + '"]');
        if (!view) return;
        view.className = "dlpp-memory-view is-warning";
        view.setAttribute("data-memory-state", "waiting-api");
        view.textContent = reference + " · " + (error && error.message ? error.message : "读取失败") + "，将自动重试。";
      });
      state.lastMemory = { ...state.lastMemory, resolved: 0, missing: references.length, status: "waiting-api" };
      scheduleMemoryRetry(chatKey);
    }
  }

  function scheduleMemoryRetry(chatKey) {
    const entry = state.memoryHydrations.get(chatKey);
    if (!entry || entry.timer || state.destroyed) return;
    Array.from(entry.roots.keys()).forEach((root) => { if (!root || !root.isConnected) entry.roots.delete(root); });
    if (!entry.roots.size) {
      state.memoryHydrations.delete(chatKey);
      return;
    }
    const delays = [500, 900, 1600, 2600, 4200];
    entry.timer = window.setTimeout(() => {
      entry.timer = 0;
      entry.attempts += 1;
      state.memoryCache.delete(chatKey);
      Array.from(entry.roots.entries()).forEach(([root, references]) => {
        if (!root.isConnected) entry.roots.delete(root);
        else hydrateMemoryRoot(root, references, chatKey, true);
      });
      if (!entry.roots.size) state.memoryHydrations.delete(chatKey);
      else scheduleMemoryRetry(chatKey);
    }, delays[entry.attempts] || MEMORY_LONG_RETRY_MS);
  }

  function memorySection(doc, parsed, root) {
    const task = parsed.tasks.find((item) => item.key === "A");
    const references = recallReferences(task ? Object.values(task.fields).join("\n") : "");
    if (!references.length) return null;
    const section = element(doc, "section", "dlpp-memory-section");
    section.setAttribute("data-dlpp-memory-section", "1");
    section.appendChild(element(doc, "div", "dlpp-memory-heading", "自动展开的数据库记忆"));
    references.forEach((reference) => {
      const view = element(doc, "section", "dlpp-memory-view is-loading", "正在读取 " + reference + "…");
      view.setAttribute("data-dlpp-memory-view", reference);
      view.setAttribute("data-memory-state", "loading");
      section.appendChild(view);
    });
    const chatKey = memoryChatKey();
    let hydration = state.memoryHydrations.get(chatKey);
    if (!hydration) {
      hydration = { roots: new Map(), attempts: 0, timer: 0 };
      state.memoryHydrations.set(chatKey, hydration);
    }
    hydration.roots.set(root, references);
    window.setTimeout(() => hydrateMemoryRoot(root, references, chatKey, false), 0);
    return section;
  }

  function taskNotice(doc, task) {
    if (task.status === "ready") return null;
    const labels = {
      waiting: "该任务仍在等待结果，其他任务内容可正常查看。",
      partial: "该任务仅返回部分标签，已安全显示可验证字段。",
      invalid: "该任务标签重复或格式异常，未显示不可信内容。",
    };
    const notice = element(doc, "div", "dlpp-task-notice is-" + task.status, labels[task.status] || "任务状态未知");
    notice.setAttribute("data-dlpp-task-notice", task.status);
    return notice;
  }

  function taskPanel(doc, parsed) {
    const groups = TASK_GROUPS;
    const root = element(doc, "section", "dlpp-root" + (parsed.complete ? "" : " is-pending"));
    root.setAttribute("data-dlou-plot-progress-root", "1");
    root.setAttribute("data-state", parsed.complete ? "complete" : "partial");
    root.setAttribute("data-contract", parsed.contractVersion);
    root.setAttribute("data-progression-complete", parsed.progressionComplete ? "true" : "false");

    const header = element(doc, "button", "dlpp-header");
    header.type = "button";
    header.setAttribute("data-dlpp-toggle", "1");
    header.appendChild(element(doc, "span", "dlpp-orbit", "◉"));
    header.appendChild(element(doc, "span", "dlpp-title", "系统推进"));
    header.appendChild(element(doc, "span", "dlpp-count", parsed.totalPresent + "/" + parsed.totalFields));
    root.appendChild(header);

    const body = element(doc, "div", "dlpp-body");
    body.setAttribute("data-dlpp-body", "1");
    const tabs = element(doc, "div", "dlpp-tabs");
    tabs.setAttribute("role", "tablist");
    groups.forEach((group) => {
      const button = element(doc, "button", "dlpp-tab");
      button.type = "button";
      button.setAttribute("data-dlpp-group", group.key);
      button.setAttribute("role", "tab");
      button.appendChild(element(doc, "span", "", group.title));
      const task = parsed.tasks.find((item) => item.key === group.taskKey);
      button.setAttribute("data-task-state", task.status);
      button.appendChild(element(doc, "small", "", task.present + "/" + task.total));
      tabs.appendChild(button);
    });
    body.appendChild(tabs);

    const panes = element(doc, "div", "dlpp-panes");
    groups.forEach((group) => {
      const pane = element(doc, "section", "dlpp-pane");
      pane.setAttribute("data-dlpp-pane", group.key);
      const task = parsed.tasks.find((item) => item.key === group.taskKey);
      pane.setAttribute("data-task-state", task.status);
      const notice = taskNotice(doc, task);
      if (notice) pane.appendChild(notice);
      if (group.key === "progression") {
        if (task.present) pane.appendChild(progressionPaneContent(doc, parsed));
      } else if (task.status !== "invalid") {
        group.fields.filter((field) => task.counts[field] === 1).forEach((field) => pane.appendChild(cardForField(doc, field, task.fields[field])));
      }
      if (group.taskKey === "A") {
        const memory = memorySection(doc, parsed, root);
        if (memory) pane.appendChild(memory);
      }
      panes.appendChild(pane);
    });
    body.appendChild(panes);
    root.appendChild(body);

    let panelState = applyPanelState(root, readPanelState(groups));
    root.addEventListener("click", (event) => {
      const toggle = event.target && event.target.closest && event.target.closest("[data-dlpp-toggle]");
      if (toggle && root.contains(toggle)) {
        panelState = { ...panelState, expanded: !panelState.expanded };
        writePanelState(panelState);
        panelState = applyPanelState(root, panelState);
        return;
      }
      const group = event.target && event.target.closest && event.target.closest("[data-dlpp-group]");
      if (group && root.contains(group)) {
        panelState = { expanded: true, activeGroup: group.getAttribute("data-dlpp-group") };
        writePanelState(panelState);
        panelState = applyPanelState(root, panelState);
        return;
      }
    });
    return root;
  }

  function renderPacket(message, content, parsed) {
    const doc = content.ownerDocument;
    injectStyle(doc);
    const hash = hashText(parsed.hashSource);
    const mainTextArtifacts = mainTextArtifactCount(content);
    if (
      content.dataset.dlouPlotHash === hash &&
      content.querySelector("[data-dlou-plot-progress-root]") &&
      mainTextArtifacts === 0
    ) return false;
    const hadRoot = !!content.querySelector("[data-dlou-plot-progress-root]");
    const restoredMainTextArtifacts = restoreMainTextArtifacts(content);
    rememberContent(content, !hadRoot);
    if (mainTextArtifacts) state.clearedMainTextArtifacts += Math.max(mainTextArtifacts, restoredMainTextArtifacts);
    const player = nativePlayerContent(doc, message, parsed.playerInput);
    const panel = taskPanel(doc, parsed);
    content.replaceChildren(player, panel);
    content.dataset.dlouPlotProgress = "1";
    content.dataset.dlouPlotHash = hash;
    content.dataset.dlouPlotState = parsed.complete ? "complete" : "partial";
    if (hadRoot) state.updated += 1;
    else if (parsed.complete) state.mounted += 1;
    else state.pending += 1;
    return true;
  }

  function renderCompanionRetryState(message, detail) {
    const content = contentNodeFor(message);
    if (!message || !content) return false;
    const messageId = messageIdFor(message);
    if (String(messageId) !== String(detail && detail.messageId)) return false;
    const doc = content.ownerDocument;
    injectStyle(doc);
    rememberContent(content, false);
    claimUserMessage(message);
    const record = recordFromContext(messageId);
    const packet = qrfPlotFromRecord(record) || legacyPacketFromMessageRecord(record);
    const playerInput = parseLegacyPlayerInput(doc, packet) || playerTextFromRecord(record);
    const player = playerInput ? nativePlayerContent(doc, message, playerInput) : null;
    const notice = element(doc, "section", "dlpp-root dlpp-retry-ready");
    notice.setAttribute("data-dlou-plot-progress-root", "1");
    notice.setAttribute("data-state", "retry_ready");
    notice.setAttribute("data-contract", String(PLOT_TASK_CONTRACT && PLOT_TASK_CONTRACT.version || "unknown-contract"));
    const title = element(doc, "div", "dlpp-retry-title", "本轮整理未完成");
    const body = element(doc, "div", "dlpp-retry-body", "点击发送可在当前玩家楼层重新整理，不会新增一条玩家消息。");
    notice.append(title, body);
    if (player) content.replaceChildren(player, notice);
    else {
      const snapshot = state.originals.get(content);
      if (snapshot) content.innerHTML = snapshot.html;
      else content.replaceChildren();
      content.appendChild(notice);
    }
    content.dataset.dlouPlotProgress = "1";
    content.dataset.dlouPlotHash = `retry:${String(detail && detail.reasonCode || "failed")}`;
    content.dataset.dlouPlotState = "retry_ready";
    state.lastRecoveryState = "companion-retry-ready";
    state.lastMountSource = "companion-lifecycle";
    state.updated += 1;
    return true;
  }

    async function processCandidate(node) {
    const message = messageNodeFor(node);
    const content = contentNodeFor(node);
    const messageId = messageIdFor(message);
    if (state.destroyed) return { rendered: false, user: false, messageId, reason: "helper-destroyed" };
    if (!message || !content) return { rendered: false, user: false, messageId, reason: "missing-message-or-content" };
    if (!isUserMessage(message)) return { rendered: false, user: false, messageId, reason: "not-user-message" };
    if (messageIsEditing(message)) return { rendered: false, user: true, messageId, reason: "message-editing" };
    if (state.companionRetryFloors.has(String(messageId))) {
      return {
        rendered: false,
        user: true,
        messageId,
        source: "companion-lifecycle",
        qrfPlotLength: 0,
        fieldCount: 0,
        contractVersion: String(PLOT_TASK_CONTRACT && PLOT_TASK_CONTRACT.version || "unknown-contract"),
        progressionPresent: 0,
        progressionComplete: false,
        recoveryState: "companion-retry-ready",
        taskStates: {},
        taskSources: {},
        reason: "companion-retry-ready",
      };
    }
    const token = (state.tokens.get(content) || 0) + 1;
    state.tokens.set(content, token);
    const resolved = await resolveSources(message, content);
    if (state.destroyed) {
      return { rendered: false, user: true, messageId, source: resolved.source, qrfPlotLength: resolved.qrfPlotLength, reason: "helper-destroyed" };
    }
    if (state.tokens.get(content) !== token) {
      return { rendered: false, user: true, messageId, source: resolved.source, qrfPlotLength: resolved.qrfPlotLength, reason: "superseded-scan" };
    }
    const parsed = buildViewModel(content.ownerDocument, resolved);
    if (!parsed || state.tokens.get(content) !== token) {
      return { rendered: false, user: true, messageId, source: resolved.source, qrfPlotLength: resolved.qrfPlotLength, reason: "no-current-message-tasks" };
    }
    claimUserMessage(message);
    const rendered = renderPacket(message, content, parsed);
    if (rendered) state.lastMountSource = resolved.source || "none";
    return {
      rendered,
      user: true,
      messageId,
      source: resolved.source,
      qrfPlotLength: resolved.qrfPlotLength,
      fieldCount: parsed.totalPresent + 1,
      contractVersion: parsed.contractVersion,
      progressionPresent: parsed.progressionPresent,
      progressionComplete: parsed.progressionComplete,
      recoveryState: inferRecoveryState(resolved.record, parsed),
      taskStates: parsed.taskStates,
      taskSources: parsed.taskSources,
      rawPreview: parsed.hashSource.replace(/\s+/g, " ").slice(0, 180),
      reason: rendered ? "" : "already-mounted",
    };
  }

  function collectCandidates(root) {
    const output = new Set();
    const scopes = root ? [root] : accessibleWindows().map((host) => host.document);
    scopes.forEach((scope) => {
      if (!scope) return;
      if (scope.nodeType === 1 && scope.matches && scope.matches(MESSAGE_SELECTOR)) output.add(scope);
      if (scope.querySelectorAll) scope.querySelectorAll(MESSAGE_SELECTOR).forEach((node) => output.add(node));
    });
    return Array.from(output);
  }

  async function scanExisting(root) {
    if (state.destroyed) {
      return { scanned: 0, rendered: 0, mounted: state.mounted, pending: state.pending, updated: state.updated };
    }
    state.scanRuns += 1;
    const candidates = collectCandidates(root || null);
    const results = await Promise.all(candidates.map((node) => processCandidate(node).catch((error) => {
      state.lastError = error && error.message ? error.message : String(error);
      return { rendered: false, user: false, reason: "scan-error" };
    })));
    const diagnostic = results.slice().reverse().find((result) => result && result.user);
    if (diagnostic) {
      state.lastMessageId = diagnostic.messageId || "";
      state.lastSource = diagnostic.source || "none";
      state.lastQrfPlotLength = Number(diagnostic.qrfPlotLength || 0);
      state.lastFieldCount = Number(diagnostic.fieldCount || 0);
      state.lastSkipReason = diagnostic.reason || "";
      state.lastContractVersion = diagnostic.contractVersion || "none";
      state.lastProgressionPresent = Number(diagnostic.progressionPresent || 0);
      state.lastProgressionComplete = diagnostic.progressionComplete === true;
      state.lastRecoveryState = diagnostic.recoveryState || "not-observed";
      state.lastTaskStates = diagnostic.taskStates || {};
      state.lastTaskSources = diagnostic.taskSources || {};
      if (diagnostic.rawPreview) state.lastRawPreview = diagnostic.rawPreview;
    }
    return {
      scanned: candidates.length,
      rendered: results.filter((result) => result && result.rendered).length,
      mounted: state.mounted,
      pending: state.pending,
      updated: state.updated,
    };
  }

  function scheduleScan(root) {
    if (root) state.dirtyRoots.add(root);
    if (state.destroyed || state.scanTimer) return;
    state.scanTimer = window.setTimeout(() => {
      state.scanTimer = 0;
      const roots = Array.from(state.dirtyRoots);
      state.dirtyRoots.clear();
      if (!roots.length) scanExisting();
      else roots.forEach((dirtyRoot) => scanExisting(dirtyRoot));
    }, 30);
  }

  function currentUserMessageNodes() {
    const output = [];
    accessibleWindows().forEach((host) => {
      const doc = host && host.document;
      if (!doc || !doc.querySelectorAll) return;
      const messages = doc.querySelectorAll(MESSAGE_SELECTOR);
      for (let index = messages.length - 1; index >= 0; index -= 1) {
        if (!isUserMessage(messages[index])) continue;
        output.push(messages[index]);
        break;
      }
    });
    return output.filter((message, index, messages) => messages.indexOf(message) === index);
  }

  function scheduleCurrentFloorScan() {
    const messages = currentUserMessageNodes();
    messages.forEach((message) => scheduleScan(message));
    return messages.length;
  }

  function mutationInsideMountedPanel(mutation) {
    const rawTarget = mutation && mutation.target;
    const target = rawTarget && rawTarget.nodeType === 1 ? rawTarget : rawTarget && rawTarget.parentElement;
    return !!(target && target.closest && target.closest('[data-dlou-plot-progress-root="1"]'));
  }

  function startObservers() {
    accessibleWindows().forEach((host) => {
      const doc = host.document;
      injectStyle(doc);
      const target = doc.body || doc.documentElement;
      if (!target || state.observerEntries.some((entry) => entry.document === doc && entry.target === target)) return;
      const Observer = host.MutationObserver || window.MutationObserver;
      if (typeof Observer !== "function") return;
      const observer = new Observer((mutations) => {
        mutations.forEach((mutation) => {
          if (mutationInsideMountedPanel(mutation)) return;
          const target = mutation.target && mutation.target.nodeType === 3 ? mutation.target.parentElement : mutation.target;
          const targetMessage = messageNodeFor(target);
          if (targetMessage) {
            scheduleScan(targetMessage);
          }
          Array.from(mutation.addedNodes || []).forEach((node) => {
            if (!node || node.nodeType !== 1) return;
            const direct = messageNodeFor(node);
            if (direct) {
              scheduleScan(direct);
            }
            if (node.querySelectorAll) node.querySelectorAll(MESSAGE_SELECTOR).forEach((message) => {
              scheduleScan(message);
            });
          });
        });
      });
      observer.observe(target, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["data-raw-message", "data-message", "data-message-role", "is_user", "class", "contenteditable", "data-editing", "data-message-editing", "aria-hidden", "hidden", "style"],
      });
      state.observerEntries.push({ document: doc, target, observer });
      scheduleScan(doc);
    });
  }

  function onCompanionLifecycle(event) {
    const detail = event && event.detail && typeof event.detail === "object" ? event.detail : {};
    if (Number(detail.version) !== 1) return;
    const phase = String(detail.phase || "");
    state.lastCompanionLifecycle = {
      phase,
      messageId: Number.isInteger(detail.messageId) ? detail.messageId : null,
      reasonCode: String(detail.reasonCode || "").slice(0, 80),
      updatedAt: Date.now(),
    };
    if (["failed", "retry_ready"].includes(phase) && Number.isInteger(detail.messageId)) {
      state.companionRetryFloors.set(String(detail.messageId), { phase: "retry_ready", reasonCode: state.lastCompanionLifecycle.reasonCode });
      collectCandidates().filter(isUserMessage).forEach((message) => {
        if (String(messageIdFor(message)) === String(detail.messageId)) renderCompanionRetryState(message, detail);
      });
      return;
    }
    if (phase === "retry_started" && Number.isInteger(detail.messageId)) {
      state.companionRetryFloors.set(String(detail.messageId), { phase: "retry_started", reasonCode: state.lastCompanionLifecycle.reasonCode });
      collectCandidates().filter(isUserMessage).forEach((message) => {
        if (String(messageIdFor(message)) !== String(detail.messageId)) return;
        const root = message.querySelector('[data-dlou-plot-progress-root="1"][data-state="retry_ready"]');
        const body = root && root.querySelector(".dlpp-retry-body");
        if (root) root.setAttribute("data-state", "retry_started");
        if (body) body.textContent = "本轮已重新启动，正在等待新的剧情整理结果。";
      });
      return;
    }
    if (["body_ready", "finished"].includes(phase) && Number.isInteger(detail.messageId)) {
      state.companionRetryFloors.delete(String(detail.messageId));
      scheduleCurrentFloorScan();
    }
  }

  function subscribeLifecycle() {
    accessibleWindows().forEach((host) => {
      const doc = host && host.document;
      if (doc && !state.subscriptions.some((item) => item.target === doc && item.eventName === COMPANION_LIFECYCLE_EVENT)) {
        doc.addEventListener(COMPANION_LIFECYCLE_EVENT, onCompanionLifecycle);
        state.subscriptions.push({ target: doc, eventName: COMPANION_LIFECYCLE_EVENT, listener: onCompanionLifecycle, dom: true });
      }
      const context = contextFor(host);
      const source = context && context.eventSource || host.eventSource;
      const eventTypes = context && (context.event_types || context.eventTypes) || host.event_types || host.eventTypes || {};
      if (!source || typeof source.on !== "function") return;
      ["CHAT_CHANGED", "MESSAGE_UPDATED", "MESSAGE_RECEIVED", "MESSAGE_EDITED", "GENERATION_ENDED"].forEach((key) => {
        const eventName = eventTypes[key] || key;
        if (state.subscriptions.some((item) => item.source === source && item.eventName === eventName)) return;
        const listener = () => {
          if (key === "CHAT_CHANGED") clearMemoryState();
          SCAN_DELAYS.forEach((delay) => window.setTimeout(() => {
            startObservers();
            if (key === "CHAT_CHANGED" && delay === SCAN_DELAYS[0]) scanExisting();
            else scheduleCurrentFloorScan();
          }, delay));
        };
        try {
          source.on(eventName, listener);
          state.subscriptions.push({ source, eventName, listener });
        } catch (_) {}
      });
    });
  }

  function clearMemoryState() {
    state.companionRetryFloors.clear();
    state.memoryHydrations.forEach((entry) => { if (entry.timer) window.clearTimeout(entry.timer); });
    state.memoryHydrations.clear();
    state.memoryCache.clear();
    state.lastMemory = { references: 0, resolved: 0, missing: 0, reads: state.lastMemory.reads, status: "idle" };
  }

  function startPolling() {
    if (state.pollTimer || state.destroyed) return;
    const tick = () => {
      state.pollTimer = 0;
      if (state.destroyed) return;
      startObservers();
      subscribeLifecycle();
      const hostSubscriptions = state.subscriptions.filter((item) => !item.dom).length;
      if (!state.observerEntries.length && !hostSubscriptions) scanExisting();
      state.pollTimer = window.setTimeout(tick, hostSubscriptions ? FALLBACK_POLL_MS : 750);
    };
    const hostSubscriptions = state.subscriptions.filter((item) => !item.dom).length;
    state.pollTimer = window.setTimeout(tick, hostSubscriptions ? FALLBACK_POLL_MS : 750);
  }

  function currentFloorEvidence() {
    const candidates = collectCandidates();
    const userMessages = candidates.filter(isUserMessage);
    const message = userMessages.length ? userMessages[userMessages.length - 1] : null;
    const messageId = messageIdFor(message);
    const context = currentContext();
    const chat = context && Array.isArray(context.chat) ? context.chat : null;
    const record = chat && messageId !== "" ? exactMessageRecord(chat, messageId, false) : null;
    const qrfPlot = qrfPlotFromRecord(record);
    const currentTaskCount = CONTRACT_TASKS.filter((task) => !!taskText(record, task.id)).length;
    const legacyTaskCount = LEGACY_CONTRACT_TASKS.filter((task) => !!taskText(record, task.id)).length;
    const taskCount = currentTaskCount || legacyTaskCount;
    const mountedRootCount = accessibleWindows().reduce((total, host) => (
      total + host.document.querySelectorAll('[data-dlou-plot-progress-root="1"]').length
    ), 0);
    let verdict = "waiting-for-current-floor-qrf-plot";
    if (mountedRootCount > 0) verdict = "mounted-current-floor-packet";
    else if (!message) verdict = "no-user-message-dom";
    else if (messageId === "") verdict = "current-user-message-id-unavailable";
    else if (!context) verdict = "sillytavern-context-unavailable";
    else if (!chat) verdict = "current-chat-array-unavailable";
    else if (!record) verdict = "current-floor-record-unavailable";
    else if (taskCount > 0) verdict = "current-floor-tasks-ready";
    else if (!qrfPlot) verdict = "waiting-for-current-floor-plot-data";
    else if (!rawLooksRelevant(qrfPlot)) verdict = "current-floor-qrf-plot-tags-unrecognized";
    else verdict = "current-floor-qrf-plot-ready";
    return {
      verdict,
      userMessageDomCount: userMessages.length,
      currentMessageId: messageId,
      contextAvailable: !!context,
      chatIdAvailable: !!(context && String(context.chatId || "").trim()),
      chatLength: chat ? chat.length : 0,
      currentFloorRecordFound: !!record,
      currentFloorQrfPlotPresent: !!qrfPlot,
      currentFloorQrfPlotLength: qrfPlot.length,
      currentFloorTaskCount: taskCount,
      mountedRootCount,
    };
  }

  function status() {
    return {
      script: SCRIPT_NAME,
      version: VERSION,
      buildId: BUILD_ID,
      mounted: state.mounted,
      pending: state.pending,
      updated: state.updated,
      scanRuns: state.scanRuns,
      observerCount: state.observerEntries.length,
      lifecycleSubscriptionCount: state.subscriptions.length,
      lastError: state.lastError,
      lastRawPreview: state.lastRawPreview,
      lastMessageId: state.lastMessageId,
      lastSource: state.lastSource,
      lastQrfPlotLength: state.lastQrfPlotLength,
      lastFieldCount: state.lastFieldCount,
      lastSkipReason: state.lastSkipReason,
      lastMountSource: state.lastMountSource,
      roleNormalizations: state.roleNormalizations,
      clearedMainTextArtifacts: state.clearedMainTextArtifacts,
      contractVersion: state.lastContractVersion,
      progression: {
        detected: state.lastProgressionPresent > 0,
        present: state.lastProgressionPresent,
        total: PROGRESSION_FIELDS.length,
        complete: state.lastProgressionComplete,
      },
      lastRecoveryState: state.lastRecoveryState,
      companionLifecycle: { ...state.lastCompanionLifecycle },
      tasks: {
        states: { ...state.lastTaskStates },
        sources: { ...state.lastTaskSources },
      },
      memory: { ...state.lastMemory },
      storageKey: STORAGE_KEY,
      fields: ALL_FIELDS.slice(),
      runtimeEvidence: currentFloorEvidence(),
    };
  }

  function diagnose() {
    const snapshot = status();
    try { (rootWindow().console || console).info("[DouLuo Plot Progress] diagnostic", snapshot); } catch (_) {}
    return snapshot;
  }

  function destroy() {
    state.destroyed = true;
    if (state.scanTimer) window.clearTimeout(state.scanTimer);
    if (state.pollTimer) window.clearTimeout(state.pollTimer);
    state.dirtyRoots.clear();
    clearMemoryState();
    state.observerEntries.forEach((entry) => { try { entry.observer.disconnect(); } catch (_) {} });
    state.subscriptions.forEach((item) => {
      try {
        if (item.dom && item.target && typeof item.target.removeEventListener === "function") item.target.removeEventListener(item.eventName, item.listener);
        else if (item.source && typeof item.source.off === "function") item.source.off(item.eventName, item.listener);
        else if (item.source && typeof item.source.removeListener === "function") item.source.removeListener(item.eventName, item.listener);
      } catch (_) {}
    });
    let restored = 0;
    state.originals.forEach((snapshot, content) => {
      if (!content || !content.isConnected) return;
      content.innerHTML = snapshot.html;
      restoreAttribute(content, "data-dlou-plot-progress", snapshot.plotProgress);
      restoreAttribute(content, "data-dlou-plot-hash", snapshot.plotHash);
      restoreAttribute(content, "data-dlou-plot-state", snapshot.plotState);
      restored += 1;
    });
    let restoredMessages = 0;
    state.messageSnapshots.forEach((snapshot, message) => {
      if (!message) return;
      restoreAttribute(message, "data-message-role", snapshot.role);
      restoreAttribute(message, MESSAGE_OWNER_ATTRIBUTE, snapshot.owner);
      restoredMessages += 1;
    });
    accessibleWindows().forEach((host) => {
      const style = host.document.getElementById(STYLE_ID);
      if (style) style.remove();
    });
    return { restored, restoredMessages };
  }

  const api = { version: VERSION, buildId: BUILD_ID, scanExisting, status, diagnose, destroy };
  const host = rootWindow();
  try {
    const previous = host[API_NAME];
    if (previous && previous !== api && typeof previous.destroy === "function") previous.destroy();
    host[API_NAME] = api;
  } catch (_) {}
  try { window[API_NAME] = api; } catch (_) {}
  function bootstrap() {
    startObservers();
    subscribeLifecycle();
    try { (rootWindow().console || console).info("[DouLuo Plot Progress] loaded", status()); } catch (_) {}
    window.setTimeout(() => scanExisting(), SCAN_DELAYS[0] || 0);
    SCAN_DELAYS.slice(1).forEach((delay) => window.setTimeout(() => scheduleCurrentFloorScan(), delay));
    startPolling();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  else bootstrap();
})();
