// @name         [助手]斗罗大陆 I-IV · Soul Land 角色创建 @3.0
// @module       tavern-helper/character-create
// @version      @3.0
// @source       tavern-helper-scripts/character-create/dist/latest.json
"use strict";

(function () {
  "use strict";

  const SCRIPT_NAME = "斗罗角色创建助手脚本";
  const VERSION = "3.0";
  const MODULE_KIND = "character-create";
  const API_NAME = "DouLuoCharacterCreateHelper";
  const PAGE_INDEX = 1;
  const BUILD_ID = "character-create@3.0+2a25135b75e7";
  const STYLE_ID = "douluo-character-create-helper-style";
  const ROOT_SELECTOR = "[data-root]";
  const HTML = "\u003c!DOCTYPE html>\n\u003chtml lang=\"zh-CN\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\" />\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n\u003c!-- BUILD:CSS -->\n\u003c/head>\n\u003cbody>\n\u003cdiv class=\"ds8\" data-root>\n  \u003cdiv class=\"ds8-inner\">\n    \u003cheader class=\"ds8-head\">\n      \u003cdiv class=\"brand\">\u003cspan class=\"brand-sigil\">\u003c/span>\u003cdiv class=\"brand-main\">\u003ch1>\u003cspan>斗罗魂师档案\u003c/span>\u003cspan class=\"brand-sep\">·\u003c/span>\u003cspan>星海叙事终端 v2\u003c/span>\u003c/h1>\u003cp>SOUL MASTER ARCHIVE / STARSEA NARRATIVE CONSOLE\u003c/p>\u003c/div>\u003c/div>\n      \u003cdiv class=\"point-core\">\n        \u003cdiv class=\"point-orb\">\u003cspan>剩余魂点 SP\u003c/span>\u003cb data-points=\"spRemain\">200\u003c/b>\u003csmall data-points-meta=\"sp\">已用 0 / 200\u003c/small>\u003c/div>\n        \u003cdiv class=\"point-orb\">\u003cspan>剩余专长 AP\u003c/span>\u003cb data-points=\"apRemain\">15\u003c/b>\u003csmall data-points-meta=\"ap\">已用 0 / 15\u003c/small>\u003c/div>\n        \u003cdiv class=\"point-orb\">\u003cspan>剩余日常 DP\u003c/span>\u003cb data-points=\"dpRemain\">32\u003c/b>\u003csmall data-points-meta=\"dp\">已用 0 / 32\u003c/small>\u003c/div>\n      \u003c/div>\n    \u003c/header>\n\n    \u003cnav class=\"stagebar\" data-stagebar>\u003c/nav>\n\n    \u003cmain class=\"shell\">\n      \u003csection class=\"page active\" data-page=\"0\">\n        \u003ch2 class=\"page-title\">世界线 / 开局位置\u003c/h2>\n        \u003cp class=\"page-note\">选择时代、地点和章节。世界书范围、Skill 与接管状态由数据库 Agent 统一管理。\u003c/p>\n        \u003cdiv class=\"holo-panel panel-pad stack\">\n          \u003cdiv class=\"timeline\">\u003cdiv class=\"timeline-line\">\u003c/div>\u003cdiv class=\"nodes\" data-era-list>\u003c/div>\u003c/div>\n          \u003cdiv class=\"era-detail\">\n            \u003cdiv class=\"holo-panel panel-pad\">\u003cdiv class=\"section-head\">\u003ch3 data-era-title>时代\u003c/h3>\u003cspan class=\"cost\" data-era-time>\u003c/span>\u003c/div>\u003cp class=\"mini\">时代选择只写入角色档案，不直接修改世界书。\u003c/p>\u003c/div>\n            \u003cdiv class=\"holo-panel panel-pad stack\">\u003cdiv class=\"section-head\">\u003ch3>开局地点\u003c/h3>\u003cspan class=\"cost\">LOCATION\u003c/span>\u003c/div>\u003cdiv class=\"pick-grid\" data-location-list>\u003c/div>\u003cdiv class=\"field\">\u003clabel>自定义地点\u003c/label>\u003cinput data-bind=\"world.customLocation\" placeholder=\"仅在选择自定义地点时填写\" />\u003c/div>\u003c/div>\n          \u003c/div>\n          \u003cdiv class=\"chapter-row\">\n            \u003cdiv class=\"field\">\u003clabel>章节位置\u003c/label>\u003cselect data-bind=\"world.chapter\" data-chapter-select>\u003c/select>\u003c/div>\n            \u003cdiv class=\"field\">\u003clabel>自定义章节\u003c/label>\u003cinput data-bind=\"world.customChapter\" placeholder=\"仅在选择自定义章节时填写\" />\u003c/div>\n          \u003c/div>\n          \u003cdiv class=\"quality-note chapter-agent-note\" data-chapter-meta>\u003c/div>\n          \u003cdiv class=\"species-band\">\n            \u003cdiv>\u003ch3>开局身份\u003c/h3>\u003cp>身份是叙事事实，不触发隐藏数值计算。\u003c/p>\u003c/div>\n            \u003cdiv class=\"species-picks\">\u003cbutton class=\"species-card\" data-action=\"species\" data-value=\"human\">\u003cb>人类\u003c/b>\u003cspan>魂师 / 魂导师 / 自定义身份\u003c/span>\u003c/button>\u003cbutton class=\"species-card\" data-action=\"species\" data-value=\"beast\">\u003cb>魂兽\u003c/b>\u003cspan>本体 / 化形 / 契约存在\u003c/span>\u003c/button>\u003c/div>\n          \u003c/div>\n          \u003cdiv class=\"beast-panel\" data-beast-fields>\n            \u003cdiv class=\"row\">\u003cdiv class=\"field\">\u003clabel>魂兽种属\u003c/label>\u003cinput data-bind=\"world.beastType\" />\u003c/div>\u003cdiv class=\"field\">\u003clabel>修为阶段\u003c/label>\u003cinput data-bind=\"world.beastYears\" />\u003c/div>\u003c/div>\n            \u003cdiv class=\"field\">\u003clabel>形态与残留特征\u003c/label>\u003ctextarea data-bind=\"world.beastTraits\">\u003c/textarea>\u003c/div>\n          \u003c/div>\n        \u003c/div>\n      \u003c/section>\n\n      \u003csection class=\"page\" data-page=\"1\">\n        \u003ch2 class=\"page-title\">角色档案 / 日常六维 / 战斗专长\u003c/h2>\n        \u003cp class=\"page-note\">战斗不再使用肉体、攻击、防御等精确面板。AP只用于叙事战斗专长。\u003c/p>\n        \u003cdiv class=\"archive\">\n          \u003caside class=\"holo-panel radarBox\">\n            \u003cbutton class=\"id-frame\" type=\"button\" data-action=\"choose-avatar\">\u003cdiv class=\"id-frame-head\">\u003cdiv class=\"id-meta\">\u003cb data-profile-name>未命名魂师\u003c/b>\u003cspan data-profile-subtitle>等待录入\u003c/span>\u003c/div>\u003cspan class=\"id-tag\">PROFILE IMAGE\u003c/span>\u003c/div>\u003cdiv class=\"avatar-preview\" data-avatar-preview>\u003cimg data-avatar-img alt=\"角色头像\" />\u003cdiv class=\"avatar-placeholder\" data-avatar-placeholder>\u003cspan class=\"avatar-plus\">＋\u003c/span>\u003cb>选择头像\u003c/b>\u003csmall>PNG / JPG / WEBP，最大5MB\u003c/small>\u003c/div>\u003c/div>\u003c/button>\n            \u003cinput class=\"avatar-input\" type=\"file\" accept=\"image/*\" data-avatar-input />\n            \u003cdiv class=\"profile-line build-brief\">\u003cdiv class=\"build-brief-title\">\u003cb>当前构筑\u003c/b>\u003cspan>BUILD BRIEF\u003c/span>\u003c/div>\u003cdiv class=\"build-brief-row\">\u003cspan class=\"build-brief-label\">身份\u003c/span>\u003cspan class=\"build-brief-value\" data-brief=\"identity\">人类\u003c/span>\u003c/div>\u003cdiv class=\"build-brief-row\">\u003cspan class=\"build-brief-label\">专长\u003c/span>\u003cspan class=\"build-brief-value\" data-brief=\"specialties\">尚未选择\u003c/span>\u003c/div>\u003cdiv class=\"build-brief-tags\">\u003cspan class=\"build-brief-tag\" data-brief=\"ap\">AP 0 / 15\u003c/span>\u003cspan class=\"build-brief-tag\" data-brief=\"dp\">DP 0 / 32\u003c/span>\u003cspan class=\"build-brief-tag\" data-brief=\"sp\">SP 0 / 200\u003c/span>\u003c/div>\u003c/div>\n          \u003c/aside>\n          \u003cdiv class=\"holo-panel panel-pad stack\">\n            \u003cdiv class=\"row\">\u003cdiv class=\"field\">\u003clabel>角色姓名\u003c/label>\u003cinput data-bind=\"profile.name\" />\u003c/div>\u003cdiv class=\"field\">\u003clabel>性别 / 称谓\u003c/label>\u003cinput data-bind=\"profile.gender\" />\u003c/div>\u003c/div>\n            \u003cdiv class=\"row\">\u003cdiv class=\"field\">\u003clabel>年龄 / 阶段\u003c/label>\u003cinput data-bind=\"profile.age\" />\u003c/div>\u003cdiv class=\"field\">\u003clabel>身份 / 定位\u003c/label>\u003cinput data-bind=\"profile.role\" />\u003c/div>\u003c/div>\n            \u003cdiv class=\"field\">\u003clabel>外貌特征\u003c/label>\u003ctextarea data-bind=\"profile.appearance\">\u003c/textarea>\u003c/div>\n            \u003cdiv class=\"field\">\u003clabel>性格特点\u003c/label>\u003ctextarea data-bind=\"profile.personality\">\u003c/textarea>\u003c/div>\n            \u003cdiv class=\"field\">\u003clabel>服装与视觉风格\u003c/label>\u003ctextarea data-bind=\"profile.outfit\">\u003c/textarea>\u003c/div>\n            \u003cdiv class=\"field\">\u003clabel>一句话角色概念\u003c/label>\u003ctextarea data-bind=\"profile.concept\">\u003c/textarea>\u003c/div>\n            \u003cdiv class=\"row\">\u003cdiv class=\"field\">\u003clabel>开局目标\u003c/label>\u003ctextarea data-bind=\"profile.goal\">\u003c/textarea>\u003c/div>\u003cdiv class=\"field\">\u003clabel>与原著主线关系\u003c/label>\u003ctextarea data-bind=\"profile.canonRelation\">\u003c/textarea>\u003c/div>\u003c/div>\n            \u003cdiv class=\"ai-fill-panel\">\u003cdiv class=\"section-head\">\u003ch3>AI 扩写档案\u003c/h3>\u003cspan class=\"cost\">TAVERNDB AI\u003c/span>\u003c/div>\u003cdiv class=\"field\">\u003clabel>追加要求\u003c/label>\u003ctextarea data-ai-prompt=\"profile\">保留玩家已经确定的核心设定，只补足空白档案字段，输出JSON。\u003c/textarea>\u003c/div>\u003cdiv class=\"action-bar\">\u003cbutton class=\"btn\" data-action=\"ai-profile\">AI扩写\u003c/button>\u003cspan class=\"start-status\" data-ai-status=\"profile\">等待调用\u003c/span>\u003c/div>\u003c/div>\n            \u003cdiv class=\"attr-system\">\u003cdiv class=\"section-head\">\u003ch3>日常六维\u003c/h3>\u003cspan class=\"cost\" data-point-summary=\"dp\">已用 0 · 剩余 32\u003c/span>\u003c/div>\u003cdiv class=\"attr-grid daily-attr-grid\" data-daily-grid>\u003c/div>\u003c/div>\n            \u003cdiv class=\"specialty-system\">\u003cdiv class=\"section-head\">\u003ch3>战斗专长\u003c/h3>\u003cspan class=\"cost\" data-point-summary=\"ap\">已用 0 · 剩余 15\u003c/span>\u003c/div>\u003cp class=\"mini\">擅长消耗3AP，专精累计消耗6AP。战斗由事实裁定，不掷战斗骰。\u003c/p>\u003cdiv class=\"specialty-grid\" data-specialty-grid>\u003c/div>\u003cdiv class=\"holo-panel panel-pad stack\">\u003cdiv class=\"section-head\">\u003ch3>自定义专长\u003c/h3>\u003cspan class=\"cost\">CUSTOM\u003c/span>\u003c/div>\u003cdiv class=\"row\">\u003cdiv class=\"field\">\u003clabel>名称\u003c/label>\u003cinput data-bind=\"customSpecialty.name\" />\u003c/div>\u003cdiv class=\"field\">\u003clabel>掌握层级\u003c/label>\u003cselect data-bind=\"customSpecialty.rank\">\u003coption value=\"none\">未选择\u003c/option>\u003coption value=\"proficient\">擅长 · 3AP\u003c/option>\u003coption value=\"expert\">专精 · 6AP\u003c/option>\u003c/select>\u003c/div>\u003c/div>\u003cdiv class=\"field\">\u003clabel>适用范围\u003c/label>\u003ctextarea data-bind=\"customSpecialty.scope\">\u003c/textarea>\u003c/div>\u003cdiv class=\"field\">\u003clabel>能力边界\u003c/label>\u003ctextarea data-bind=\"customSpecialty.boundary\">\u003c/textarea>\u003c/div>\u003c/div>\u003c/div>\n          \u003c/div>\n        \u003c/div>\n      \u003c/section>\n\n      \u003csection class=\"page\" data-page=\"2\">\n        \u003ch2 class=\"page-title\">武魂觉醒\u003c/h2>\u003cp class=\"page-note\">只记录武魂事实、能力表现和限制，不计算最终攻击或倍率。\u003c/p>\n        \u003cdiv class=\"soul-awakening-console\">\u003cdiv data-soul-overview>\u003c/div>\u003cdiv class=\"soul-switch\" data-soul-tabs>\u003c/div>\u003cdiv class=\"soul-list\" data-soul-editor>\u003c/div>\u003c/div>\n      \u003c/section>\n\n      \u003csection class=\"page\" data-page=\"3\">\n        \u003ch2 class=\"page-title\">背景与天赋模板\u003c/h2>\u003cp class=\"page-note\">天赋模板以叙事能力、边界、代价和恢复条件进入新版档案；剧情获得的身份与权限归入称号库。\u003c/p>\n        \u003cdiv class=\"resource-page\">\u003cdiv class=\"resource-layout\">\u003cdiv class=\"vertical-menu\" data-background-list>\u003c/div>\u003cdiv class=\"holo-panel panel-pad stack\">\u003cdiv class=\"section-head\">\u003ch3 data-background-title>开局背景\u003c/h3>\u003cspan class=\"cost\" data-background-cost>0SP\u003c/span>\u003c/div>\u003cp class=\"page-note\" data-background-desc>\u003c/p>\u003cdiv class=\"field\">\u003clabel>背景名称\u003c/label>\u003cinput data-bind=\"background.name\" />\u003c/div>\u003cdiv class=\"field\">\u003clabel>背景事实、资源与限制\u003c/label>\u003ctextarea data-bind=\"background.description\">\u003c/textarea>\u003c/div>\u003c/div>\u003c/div>\u003cdiv class=\"section-head\">\u003ch3>正式天赋目录\u003c/h3>\u003cspan class=\"cost\">TALENTS\u003c/span>\u003c/div>\u003cdiv class=\"resource-filter-row\" data-trait-filters>\u003c/div>\u003cdiv class=\"trait-card-grid\" data-trait-grid>\u003c/div>\u003c/div>\n      \u003c/section>\n\n      \u003csection class=\"page\" data-page=\"4\">\n        \u003ch2 class=\"page-title\">角色羁绊 / 条目控制\u003c/h2>\u003cp class=\"page-note\">按当前时代显示可用角色性别与具体版本；选择结果只写入档案，供 Agent 控制对应世界书条目，前端不直接修改世界书。\u003c/p>\n        \u003cdiv class=\"bond-layout\">\n          \u003cdiv class=\"vertical-menu\">\u003cbutton class=\"vitem active\" type=\"button\">\u003cb>角色性别控制\u003c/b>\u003cspan>时代 / 版本 / 世界书\u003c/span>\u003c/button>\u003cbutton class=\"vitem\" type=\"button\">\u003cb>自定义 NPC\u003c/b>\u003cspan>结构化羁绊预留\u003c/span>\u003c/button>\u003c/div>\n          \u003cdiv class=\"stack\">\n            \u003cdiv class=\"holo-panel panel-pad stack\" data-bond-controls>\u003c/div>\n            \u003cdiv data-bond-profiles>\u003c/div>\n            \u003cdiv class=\"holo-panel panel-pad stack\">\u003cdiv class=\"field\">\u003clabel>角色控制备注\u003c/label>\u003ctextarea data-bind=\"bonds.notes\" placeholder=\"记录角色版本、羁绊关系、好感方向或 Agent 需要注意的替换规则。\">\u003c/textarea>\u003c/div>\u003cdiv class=\"field\">\u003clabel>自定义 NPC / 补充接口\u003c/label>\u003ctextarea data-bind=\"bonds.customCharacters\" placeholder=\"保留玩家自定义 NPC、头像、标签、羁绊等级与事件触发说明。\">\u003c/textarea>\u003c/div>\u003c/div>\n          \u003c/div>\n        \u003c/div>\n      \u003c/section>\n\n      \u003csection class=\"page\" data-page=\"5\">\n        \u003ch2 class=\"page-title\">档案确认 / 导出中心\u003c/h2>\n        \u003cdiv class=\"final-archive-grid\">\u003csection class=\"holo-panel panel-pad final-visual-panel\">\u003cdiv class=\"section-head\">\u003ch3>校验结果\u003c/h3>\u003cspan class=\"cost\">V2\u003c/span>\u003c/div>\u003cdiv class=\"final-validation\" data-validation>\u003c/div>\u003cdiv class=\"final-preview\" data-preview>\u003c/div>\u003cdiv class=\"summary-list\" data-cost-summary>\u003c/div>\u003c/section>\u003csection class=\"holo-panel panel-pad archive-output-panel export-center\">\u003cdiv class=\"section-head\">\u003ch3>角色档案 v2\u003c/h3>\u003cspan class=\"cost\">ARCHIVE\u003c/span>\u003c/div>\u003ctextarea class=\"output text-output\" data-output readonly>\u003c/textarea>\u003cdiv class=\"action-bar\">\u003cbutton class=\"btn ghost\" data-action=\"copy-export\">复制档案\u003c/button>\u003cbutton class=\"btn\" data-action=\"send-start\">开始游戏\u003c/button>\u003cspan class=\"start-status\" data-send-status>等待发送\u003c/span>\u003c/div>\u003cdiv class=\"draft-manager\" data-draft-manager>\u003c/div>\u003c/section>\u003c/div>\n      \u003c/section>\n    \u003c/main>\n\n    \u003cdiv class=\"trait-detail-overlay\" data-trait-detail-overlay hidden aria-hidden=\"true\">\n      \u003cbutton class=\"trait-detail-backdrop\" type=\"button\" data-action=\"trait-detail-close\" aria-label=\"关闭特性详情\">\u003c/button>\n      \u003csection class=\"holo-panel panel-pad stack trait-detail-dialog\" data-custom-trait-panel role=\"dialog\" aria-modal=\"true\" aria-label=\"特性详情\">\u003c/section>\n    \u003c/div>\n\n    \u003cfooter class=\"footer\">\u003cbutton class=\"btn ghost\" data-action=\"prev\">← 上一步\u003c/button>\u003cbutton class=\"btn\" data-action=\"next\">下一步 →\u003c/button>\u003c/footer>\n  \u003c/div>\n\u003c/div>\n\u003c!-- BUILD:JS -->\n\u003c/body>\n\u003c/html>\n";
  const CSS = ".ds8, .ds8 * {\n  box-sizing: border-box;\n}\n\n/*\n * Character Create V2 — Starsea terminal theme\n *\n * Layer order:\n *   1. theme and host isolation\n *   2. shell and header\n *   3. soul-ring navigation\n *   4. shared controls and panels\n *   5. page layouts\n *   6. container-responsive layout\n *   7. motion preferences\n */\n\n/* 1. Theme and host isolation */\n.ds8 {\n  --cc-bg-deep: #020611;\n  --cc-bg: #050d1d;\n  --cc-bg-soft: #09172f;\n  --cc-panel: rgba(4, 14, 34, .82);\n  --cc-panel-strong: rgba(5, 18, 42, .94);\n  --cc-text: #edf6ff;\n  --cc-muted: #9cadc6;\n  --cc-dim: #66758f;\n  --cc-gold: #e8c36c;\n  --cc-cyan: #5ee7ff;\n  --cc-green: #7ee2c7;\n  --cc-red: #ff5d77;\n  --cc-line: rgba(94, 231, 255, .18);\n  --cc-line-strong: rgba(94, 231, 255, .28);\n  --cc-line-gold: rgba(232, 195, 108, .38);\n  --cc-radius-shell: 28px;\n  --cc-radius-panel: 22px;\n  --cc-radius-control: 15px;\n  --cc-shadow: 0 24px 80px rgba(0, 0, 0, .5);\n  --cc-motion-slow: 34s;\n  --cc-motion-ring: 18s;\n  container: dl-character-create / inline-size;\n  position: relative;\n  width: min(100%, 1760px);\n  max-width: 100%;\n  margin: 18px auto;\n  overflow: hidden;\n  color: var(--cc-text);\n  color-scheme: dark;\n  font-family: \"FangSong\", \"STFangsong\", \"Noto Serif SC\", \"Source Han Serif SC\", \"Microsoft YaHei\", serif;\n  letter-spacing: .02em;\n  border: 1px solid rgba(232, 195, 108, .22);\n  border-radius: var(--cc-radius-shell);\n  background:\n    radial-gradient(circle at 16% 6%, rgba(94, 231, 255, .14), transparent 30%),\n    radial-gradient(circle at 87% 14%, rgba(232, 195, 108, .11), transparent 28%),\n    linear-gradient(145deg, rgba(3, 8, 20, .98), rgba(7, 17, 33, .98) 48%, rgba(3, 8, 19, .99));\n  box-shadow: var(--cc-shadow);\n}\n\n.ds8 * {\n  min-width: 0;\n}\n\n.ds8::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  opacity: .3;\n  background-image:\n    radial-gradient(circle, rgba(255, 255, 255, .32) 0 1px, transparent 1.5px),\n    linear-gradient(110deg, transparent 0 9%, rgba(94, 231, 255, .07) 13%, transparent 19% 100%);\n  background-size: 82px 82px, 420px 100%;\n  animation: dlcc-star-drift var(--cc-motion-slow) linear infinite;\n}\n\n.ds8::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  border-radius: inherit;\n  box-shadow:\n    inset 0 0 58px rgba(94, 231, 255, .055),\n    inset 0 -2px 0 rgba(232, 195, 108, .26);\n}\n\n.ds8 button,\n.ds8 input,\n.ds8 select,\n.ds8 textarea {\n  font: inherit;\n}\n\n/* 2. Shell and header */\n.ds8-inner {\n  position: relative;\n  z-index: 1;\n  padding: clamp(18px, 2.6vw, 42px);\n}\n\n.ds8-head {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto;\n  gap: 28px;\n  align-items: center;\n  margin-bottom: 26px;\n  padding: 24px clamp(20px, 3vw, 38px);\n  border: 1px solid var(--cc-line);\n  border-bottom-color: var(--cc-line-gold);\n  border-radius: var(--cc-radius-panel);\n  background: linear-gradient(135deg, rgba(5, 20, 45, .88), rgba(3, 10, 25, .82));\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .15), 0 18px 42px rgba(0, 0, 0, .18);\n}\n\n.brand {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.brand-sigil {\n  position: relative;\n  flex: 0 0 46px;\n  width: 46px;\n  height: 46px;\n  border: 1px solid rgba(232, 195, 108, .55);\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(232, 195, 108, .24), transparent 58%);\n  box-shadow: 0 0 24px rgba(232, 195, 108, .18), inset 0 0 18px rgba(94, 231, 255, .1);\n}\n\n.brand-sigil::before,\n.brand-sigil::after {\n  content: \"\";\n  position: absolute;\n  border-radius: 50%;\n}\n\n.brand-sigil::before {\n  inset: 7px;\n  border: 1px solid rgba(232, 195, 108, .72);\n}\n\n.brand-sigil::after {\n  inset: 15px;\n  border: 1px solid rgba(94, 231, 255, .62);\n  box-shadow: 0 0 12px rgba(94, 231, 255, .28);\n  animation: dlcc-sigil-pulse 3.8s ease-in-out infinite;\n}\n\n.brand-main {\n  min-width: 0;\n}\n\n.brand h1 {\n  margin: 0;\n  font-size: clamp(25px, 2.3vw, 36px);\n  font-weight: 500;\n  line-height: 1.22;\n  letter-spacing: .14em;\n  text-shadow: 0 0 20px rgba(94, 231, 255, .12);\n}\n\n.brand-sep {\n  color: var(--cc-gold);\n}\n\n.brand p {\n  margin: 8px 0 0;\n  color: var(--cc-muted);\n  font: 12px/1.5 \"Segoe UI\", sans-serif;\n  letter-spacing: .17em;\n}\n\n.point-core {\n  display: flex;\n  justify-content: flex-end;\n  gap: 14px;\n}\n\n.point-orb {\n  width: 112px;\n  min-height: 112px;\n  padding: 16px 10px;\n  display: grid;\n  place-content: center;\n  gap: 4px;\n  text-align: center;\n  border: 1px solid var(--cc-line-gold);\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at 50% 36%, rgba(94, 231, 255, .12), transparent 42%),\n    linear-gradient(180deg, rgba(7, 21, 45, .92), rgba(2, 8, 20, .96));\n  box-shadow:\n    inset 0 -4px 0 rgba(232, 195, 108, .28),\n    inset 0 0 22px rgba(94, 231, 255, .08),\n    0 0 24px rgba(232, 195, 108, .09);\n}\n\n.point-orb span {\n  color: #d2e4f8;\n  font: 11px/1.35 \"Segoe UI\", sans-serif;\n  letter-spacing: .07em;\n}\n\n.point-orb b {\n  color: var(--cc-gold);\n  font: 700 30px/1.05 \"Segoe UI\", sans-serif;\n}\n\n.point-orb small {\n  color: var(--cc-dim);\n  font: 10px/1.3 \"Segoe UI\", sans-serif;\n  letter-spacing: .04em;\n}\n\n/* 3. Soul-ring navigation */\n.stagebar {\n  position: relative;\n  isolation: isolate;\n  display: grid;\n  grid-template-columns: repeat(6, minmax(0, 1fr));\n  align-items: center;\n  gap: clamp(10px, 1.6vw, 22px);\n  min-height: 148px;\n  margin: 0 0 22px;\n  padding: 12px clamp(12px, 2.4vw, 36px);\n  overflow-x: auto;\n  overflow-y: hidden;\n  scrollbar-width: thin;\n  border-block: 1px solid rgba(232, 195, 108, .2);\n  background:\n    radial-gradient(circle at 8% 50%, rgba(225, 239, 255, .13), transparent 17%),\n    radial-gradient(circle at 27% 50%, rgba(255, 216, 79, .11), transparent 17%),\n    radial-gradient(circle at 47% 50%, rgba(149, 94, 255, .12), transparent 17%),\n    radial-gradient(circle at 66% 50%, rgba(0, 0, 0, .52), transparent 18%),\n    radial-gradient(circle at 84% 50%, rgba(255, 55, 80, .1), transparent 17%),\n    radial-gradient(circle at 96% 50%, rgba(255, 228, 118, .1), transparent 17%),\n    linear-gradient(90deg, rgba(2, 6, 15, .94), rgba(5, 15, 33, .72) 30%, rgba(4, 9, 23, .82) 68%, rgba(2, 6, 15, .94));\n  box-shadow: inset 0 0 36px rgba(94, 231, 255, .035), inset 0 -1px 0 rgba(232, 195, 108, .14);\n}\n\n.stagebar::before {\n  content: \"\";\n  position: absolute;\n  z-index: -1;\n  left: 4%;\n  right: 4%;\n  top: 73px;\n  height: 1px;\n  background: linear-gradient(90deg, transparent, rgba(232, 195, 108, .42), rgba(94, 231, 255, .3), rgba(232, 195, 108, .42), transparent);\n  box-shadow: 0 0 10px rgba(232, 195, 108, .16);\n}\n\n.stagebar::after {\n  content: \"\";\n  position: absolute;\n  z-index: -1;\n  inset: 0;\n  pointer-events: none;\n  opacity: .18;\n  background: linear-gradient(110deg, transparent 0 42%, rgba(255, 255, 255, .13) 48%, transparent 54% 100%);\n  background-size: 300% 100%;\n  animation: dlcc-nav-sweep 12s ease-in-out infinite;\n}\n\n.stage {\n  --ring-mark: #edf6ff;\n  --ring-edge: #edf6ff;\n  --ring-aura: rgba(218, 236, 255, .2);\n  --ring-glow: rgba(218, 236, 255, .58);\n  --ring-size: clamp(86px, 8vw, 112px);\n  position: relative;\n  height: 128px;\n  padding: 0;\n  display: grid;\n  place-items: center;\n  cursor: pointer;\n  isolation: isolate;\n  color: rgba(239, 247, 255, .86);\n  border: 0;\n  outline: 0;\n  background: transparent;\n  letter-spacing: .12em;\n}\n\n.stage:nth-child(2) {\n  --ring-mark: #ffd94f;\n  --ring-edge: #ffd94f;\n  --ring-aura: rgba(255, 216, 91, .21);\n  --ring-glow: rgba(255, 217, 91, .6);\n}\n\n.stage:nth-child(3) {\n  --ring-mark: #9b62ff;\n  --ring-edge: #9b62ff;\n  --ring-aura: rgba(142, 100, 255, .22);\n  --ring-glow: rgba(142, 100, 255, .64);\n}\n\n.stage:nth-child(4) {\n  --ring-mark: #000;\n  --ring-edge: #b8c1ce;\n  --ring-aura: rgba(0, 0, 0, .72);\n  --ring-glow: rgba(184, 193, 206, .28);\n}\n\n.stage:nth-child(5) {\n  --ring-mark: #ff3d57;\n  --ring-edge: #ff3d57;\n  --ring-aura: rgba(255, 68, 95, .22);\n  --ring-glow: rgba(255, 68, 95, .65);\n}\n\n.stage:nth-child(6) {\n  --ring-mark: #ffe676;\n  --ring-edge: #ffe676;\n  --ring-aura: rgba(255, 228, 122, .24);\n  --ring-glow: rgba(255, 228, 122, .72);\n}\n\n.stage::before,\n.stage::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  translate: -50% -50%;\n  pointer-events: none;\n  border-radius: 50%;\n  transition: opacity .22s ease, scale .22s ease, filter .22s ease;\n}\n\n.stage::before {\n  z-index: 1;\n  width: calc(var(--ring-size) * .65);\n  height: calc(var(--ring-size) * .65);\n  border: 1px solid color-mix(in srgb, var(--ring-edge) 42%, transparent);\n  background:\n    repeating-conic-gradient(from 10deg, transparent 0 15deg, color-mix(in srgb, var(--ring-edge) 38%, transparent) 16deg 18deg, transparent 19deg 31deg),\n    radial-gradient(circle, rgba(0, 0, 0, .99) 0 48%, color-mix(in srgb, var(--ring-mark) 72%, #02040a) 49% 62%, transparent 70%);\n  box-shadow:\n    inset 0 0 26px rgba(0, 0, 0, .86),\n    0 0 20px rgba(0, 0, 0, .6),\n    0 0 20px color-mix(in srgb, var(--ring-edge) 18%, transparent);\n  animation: dlcc-ring-reverse calc(var(--cc-motion-ring) * 1.35) linear infinite;\n}\n\n.stage::after {\n  z-index: 2;\n  width: var(--ring-size);\n  height: var(--ring-size);\n  opacity: .76;\n  background:\n    radial-gradient(circle, transparent 0 37%, color-mix(in srgb, var(--ring-edge) 30%, transparent) 38% 40%, transparent 41% 48%, var(--ring-mark) 49% 55%, transparent 56% 61%, color-mix(in srgb, var(--ring-edge) 62%, transparent) 62% 65%, transparent 66%),\n    repeating-conic-gradient(from -3deg, transparent 0 8deg, color-mix(in srgb, var(--ring-edge) 68%, transparent) 9deg 11deg, transparent 12deg 18deg),\n    radial-gradient(circle, var(--ring-aura) 0 58%, transparent 73%);\n  box-shadow: 0 0 24px color-mix(in srgb, var(--ring-edge) 34%, transparent), 0 0 68px var(--ring-glow);\n  -webkit-mask: radial-gradient(circle, transparent 0 37%, #000 39% 69%, transparent 72%);\n  mask: radial-gradient(circle, transparent 0 37%, #000 39% 69%, transparent 72%);\n  animation: dlcc-ring-turn var(--cc-motion-ring) linear infinite;\n}\n\n.stage .txt {\n  position: relative;\n  z-index: 3;\n  max-width: 7em;\n  padding: 4px 7px;\n  color: inherit;\n  font-size: 15px;\n  line-height: 1.35;\n  text-align: center;\n  text-shadow: 0 2px 12px rgba(0, 0, 0, .98), 0 0 12px color-mix(in srgb, var(--ring-edge) 34%, transparent);\n  transition: color .2s ease, transform .2s ease;\n}\n\n.stage:hover,\n.stage.active {\n  color: #fff;\n}\n\n.stage:hover::before,\n.stage.active::before {\n  scale: 1.05;\n  filter: brightness(1.18);\n}\n\n.stage:hover::after,\n.stage.active::after {\n  scale: 1.07;\n  opacity: 1;\n  filter: brightness(1.2) saturate(1.12);\n}\n\n.stage:hover .txt,\n.stage.active .txt {\n  transform: translateY(-2px);\n}\n\n.stage.done::after {\n  opacity: .92;\n}\n\n.stage:focus-visible {\n  border-radius: 18px;\n  box-shadow: 0 0 0 2px var(--ring-edge);\n}\n\n/* 4. Shared controls and panels */\n.shell {\n  position: relative;\n  min-height: 680px;\n  overflow: hidden;\n  border: 1px solid var(--cc-line);\n  border-bottom-color: var(--cc-line-gold);\n  border-radius: var(--cc-radius-shell);\n  background: linear-gradient(180deg, rgba(4, 13, 31, .8), rgba(2, 8, 20, .9));\n  box-shadow: inset 0 -3px 0 rgba(232, 195, 108, .17), inset 0 0 38px rgba(94, 231, 255, .035);\n}\n\n.shell::after {\n  content: \"\";\n  position: absolute;\n  left: 4%;\n  right: 4%;\n  bottom: 0;\n  height: 1px;\n  pointer-events: none;\n  background: linear-gradient(90deg, transparent, var(--cc-cyan), var(--cc-gold), transparent);\n  opacity: .68;\n}\n\n.page {\n  display: none;\n  min-width: 0;\n  padding: clamp(22px, 3vw, 42px);\n}\n\n.page.active {\n  display: block;\n  animation: dlcc-page-in .24s ease-out;\n}\n\n.page-title {\n  margin: 0 0 10px;\n  font-size: clamp(26px, 2.7vw, 38px);\n  font-weight: 500;\n  line-height: 1.3;\n  letter-spacing: .13em;\n}\n\n.page-note,\n.mini {\n  margin: 0 0 24px;\n  color: var(--cc-muted);\n  line-height: 1.85;\n}\n\n.mini {\n  font-size: 13px;\n}\n\n.holo-panel {\n  position: relative;\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid var(--cc-line);\n  border-bottom-color: var(--cc-line-gold);\n  border-radius: var(--cc-radius-panel);\n  background: linear-gradient(180deg, rgba(8, 23, 52, .74), rgba(3, 11, 28, .82));\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .15), 0 18px 44px rgba(0, 0, 0, .17);\n}\n\n.holo-panel::after {\n  content: \"\";\n  position: absolute;\n  left: 18px;\n  right: 18px;\n  bottom: 0;\n  height: 1px;\n  pointer-events: none;\n  opacity: .52;\n  background: linear-gradient(90deg, transparent, rgba(94, 231, 255, .8), rgba(232, 195, 108, .82), transparent);\n}\n\n.panel-pad {\n  padding: clamp(17px, 2vw, 26px);\n}\n\n.stack {\n  display: grid;\n  gap: 18px;\n}\n\n.section-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 14px;\n}\n\n.section-head h3 {\n  margin: 0;\n  font-size: 19px;\n  font-weight: 500;\n  line-height: 1.4;\n  letter-spacing: .1em;\n}\n\n.cost {\n  color: var(--cc-gold);\n  font: 12px/1.4 \"Segoe UI\", sans-serif;\n  letter-spacing: .08em;\n}\n\n.row,\n.chapter-row {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}\n\n.field {\n  display: grid;\n  gap: 8px;\n}\n\n.field label {\n  color: #d6e5f7;\n  font-size: 13px;\n  letter-spacing: .06em;\n}\n\n.field input,\n.field select,\n.field textarea,\n.output {\n  width: 100%;\n  min-height: 50px;\n  padding: 13px 15px;\n  color: var(--cc-text);\n  outline: 0;\n  border: 1px solid rgba(94, 231, 255, .18);\n  border-bottom-color: rgba(232, 195, 108, .34);\n  border-radius: var(--cc-radius-control);\n  background:\n    radial-gradient(circle at 12% 0, rgba(94, 231, 255, .08), transparent 42%),\n    linear-gradient(180deg, rgba(8, 22, 47, .84), rgba(2, 9, 22, .9));\n  box-shadow: inset 0 -1px 0 rgba(232, 195, 108, .12), 0 8px 20px rgba(0, 0, 0, .12);\n  transition: border-color .18s ease, box-shadow .18s ease;\n}\n\n.field textarea {\n  min-height: 104px;\n  resize: vertical;\n  line-height: 1.7;\n}\n\n.field input:focus,\n.field select:focus,\n.field textarea:focus,\n.output:focus {\n  border-color: rgba(232, 195, 108, .62);\n  box-shadow: 0 0 0 3px rgba(232, 195, 108, .075), inset 0 -1px 0 rgba(232, 195, 108, .35);\n}\n\n.field input::placeholder,\n.field textarea::placeholder {\n  color: var(--cc-dim);\n}\n\n.btn {\n  min-height: 44px;\n  padding: 10px 18px;\n  cursor: pointer;\n  color: #fff;\n  letter-spacing: .08em;\n  border: 1px solid var(--cc-line-gold);\n  border-radius: var(--cc-radius-control);\n  background: linear-gradient(180deg, rgba(10, 28, 60, .84), rgba(3, 10, 25, .9));\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .22), 0 10px 24px rgba(0, 0, 0, .15);\n  transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease, opacity .18s ease;\n}\n\n.btn:hover:not(:disabled) {\n  transform: translateY(-2px);\n  border-color: rgba(232, 195, 108, .72);\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .42), 0 0 24px rgba(232, 195, 108, .1);\n}\n\n.btn.ghost {\n  color: #dceaff;\n  border-color: var(--cc-line);\n  background: rgba(4, 14, 34, .58);\n  box-shadow: none;\n}\n\n.btn:disabled,\n.specialty-ranks button:disabled {\n  cursor: not-allowed;\n  opacity: .42;\n}\n\n.action-bar,\n.footer {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.footer {\n  justify-content: space-between;\n  margin-top: 24px;\n}\n\n.start-status {\n  color: var(--cc-muted);\n  font-size: 12px;\n}\n\n.build-brief-tags,\n.chip-grid,\n.resource-filter-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.build-brief-tag,\n.chip {\n  padding: 6px 10px;\n  color: var(--cc-gold);\n  font-size: 12px;\n  border: 1px solid rgba(232, 195, 108, .24);\n  border-radius: 999px;\n  background: rgba(232, 195, 108, .065);\n}\n\n/* 5. Page layouts */\n.timeline {\n  position: relative;\n  padding: 28px 10px 12px;\n}\n\n.timeline-line {\n  position: absolute;\n  left: 8%;\n  right: 8%;\n  top: 60px;\n  height: 2px;\n  opacity: .65;\n  background: linear-gradient(90deg, rgba(232, 195, 108, .15), rgba(232, 195, 108, .78), rgba(94, 231, 255, .48), rgba(232, 195, 108, .15));\n  box-shadow: 0 0 18px rgba(232, 195, 108, .13);\n}\n\n.nodes {\n  position: relative;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 18px;\n}\n\n.era-node,\n.pick-card,\n.species-card,\n.vitem,\n.resource-filter,\n.soul-switch button {\n  cursor: pointer;\n  color: var(--cc-muted);\n  border: 1px solid var(--cc-line);\n  border-bottom-color: rgba(232, 195, 108, .26);\n  background: rgba(4, 14, 34, .6);\n  transition: color .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;\n}\n\n.era-node {\n  min-height: 112px;\n  padding: 10px;\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 9px;\n  text-align: center;\n  border-color: transparent;\n  border-radius: 18px;\n  background: transparent;\n}\n\n.era-dot {\n  position: relative;\n  width: 54px;\n  height: 54px;\n  border: 1px solid rgba(232, 195, 108, .5);\n  border-radius: 50%;\n  background: radial-gradient(circle, rgba(232, 195, 108, .26), rgba(3, 9, 20, .92) 58%);\n  box-shadow: 0 0 22px rgba(232, 195, 108, .13);\n}\n\n.era-dot::after {\n  content: \"\";\n  position: absolute;\n  inset: 8px;\n  border: 1px solid rgba(94, 231, 255, .3);\n  border-radius: 50%;\n}\n\n.era-node b {\n  color: #dce9f8;\n  font-size: 17px;\n  font-weight: 500;\n}\n\n.era-node span {\n  font-size: 11px;\n  line-height: 1.45;\n}\n\n.era-node:hover,\n.era-node.active,\n.pick-card:hover,\n.pick-card.active,\n.species-card:hover,\n.species-card.active,\n.vitem:hover,\n.vitem.active,\n.resource-filter:hover,\n.resource-filter.active,\n.soul-switch button:hover,\n.soul-switch button.is-active {\n  color: #fff;\n  border-color: rgba(232, 195, 108, .58);\n  box-shadow: inset 0 -1px 0 rgba(232, 195, 108, .34), 0 10px 24px rgba(232, 195, 108, .07);\n  transform: translateY(-2px);\n}\n\n.era-node:hover .era-dot,\n.era-node.active .era-dot {\n  box-shadow: 0 0 34px rgba(232, 195, 108, .32);\n  transform: translateY(-3px) scale(1.05);\n}\n\n.era-detail {\n  display: grid;\n  grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);\n  gap: 20px;\n  margin-top: 22px;\n}\n\n.pick-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.pick-card {\n  min-height: 72px;\n  padding: 12px 14px;\n  display: grid;\n  gap: 5px;\n  text-align: left;\n  border-radius: var(--cc-radius-control);\n}\n\n.pick-card b {\n  color: #e7f2ff;\n  font-weight: 500;\n}\n\n.pick-card small {\n  color: var(--cc-dim);\n}\n\n.chapter-row {\n  margin-top: 2px;\n}\n\n.species-band {\n  display: grid;\n  grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);\n  gap: 22px;\n  align-items: center;\n  padding: 20px;\n  border: 1px solid var(--cc-line);\n  border-bottom-color: var(--cc-line-gold);\n  border-radius: var(--cc-radius-panel);\n  background: rgba(2, 9, 24, .48);\n}\n\n.species-band h3,\n.species-band p {\n  margin: 0;\n}\n\n.species-band p {\n  margin-top: 7px;\n  color: var(--cc-muted);\n  line-height: 1.7;\n}\n\n.species-picks {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.species-card {\n  min-height: 76px;\n  padding: 13px 15px;\n  display: grid;\n  gap: 6px;\n  text-align: left;\n  border-radius: var(--cc-radius-control);\n}\n\n.species-card b {\n  color: #fff;\n}\n\n.species-card span {\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.beast-panel {\n  display: none;\n  gap: 16px;\n  padding: 20px;\n  border-left: 2px solid var(--cc-gold);\n  border-radius: 0 var(--cc-radius-control) var(--cc-radius-control) 0;\n  background: rgba(232, 195, 108, .05);\n}\n\n.beast-panel.show {\n  display: grid;\n}\n\n.archive {\n  display: grid;\n  grid-template-columns: minmax(280px, .72fr) minmax(0, 1.48fr);\n  gap: 24px;\n  align-items: start;\n}\n\n.radarBox {\n  padding: 22px;\n  display: grid;\n  gap: 18px;\n}\n\n.id-frame {\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n  cursor: pointer;\n  color: inherit;\n  text-align: left;\n  border: 1px solid var(--cc-line-gold);\n  border-radius: 18px;\n  background: rgba(2, 9, 24, .62);\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .16);\n}\n\n.id-frame-head {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  padding: 14px;\n}\n\n.id-meta {\n  display: grid;\n  gap: 3px;\n}\n\n.id-meta b {\n  font-weight: 500;\n}\n\n.id-meta span,\n.id-tag {\n  color: var(--cc-muted);\n  font-size: 11px;\n}\n\n.avatar-preview {\n  position: relative;\n  aspect-ratio: 4 / 5;\n  overflow: hidden;\n  background: linear-gradient(180deg, rgba(94, 231, 255, .09), rgba(2, 8, 20, .9));\n}\n\n.avatar-preview img {\n  display: none;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.avatar-placeholder {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 8px;\n  color: #dbe8f8;\n  text-align: center;\n}\n\n.avatar-placeholder small {\n  color: var(--cc-muted);\n}\n\n.avatar-plus {\n  width: 54px;\n  height: 54px;\n  display: grid;\n  place-items: center;\n  color: var(--cc-gold);\n  border: 1px solid var(--cc-line-gold);\n  border-radius: 50%;\n  font-size: 28px;\n  box-shadow: 0 0 20px rgba(232, 195, 108, .12);\n}\n\n.avatar-input {\n  display: none;\n}\n\n.build-brief {\n  padding: 16px;\n  border: 1px solid rgba(94, 231, 255, .09);\n  border-radius: var(--cc-radius-control);\n  background: rgba(2, 9, 24, .38);\n}\n\n.build-brief-title,\n.build-brief-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.build-brief-title {\n  margin-bottom: 8px;\n}\n\n.build-brief-title span,\n.build-brief-label {\n  color: var(--cc-muted);\n  font-size: 12px;\n}\n\n.build-brief-row {\n  padding: 8px 0;\n  border-bottom: 1px solid rgba(94, 231, 255, .08);\n}\n\n.build-brief-value {\n  color: #e4efff;\n  font-size: 13px;\n  text-align: right;\n}\n\n.ai-fill-panel {\n  padding: 17px;\n  display: grid;\n  gap: 14px;\n  border: 1px solid rgba(157, 123, 255, .28);\n  border-bottom-color: rgba(232, 195, 108, .25);\n  border-radius: 18px;\n  background: linear-gradient(180deg, rgba(55, 38, 94, .14), rgba(3, 10, 25, .36));\n}\n\n.attr-system,\n.specialty-system,\n.resource-page,\n.soul-list,\n.bond-layout {\n  display: grid;\n  gap: 18px;\n}\n\n.bond-layout {\n  grid-template-columns: 280px minmax(0, 1fr);\n  gap: 20px;\n}\n\n.bond-layout > .stack {\n  min-width: 0;\n}\n\n.bond-layout .vitem {\n  width: 100%;\n  box-sizing: border-box;\n}\n\n.bond-active-strip,\n.button-group {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n\n.bond-active-strip {\n  margin: -4px 0 2px;\n  color: var(--cc-muted);\n}\n\n.bond-active-strip span {\n  padding: 6px 10px;\n  color: var(--cc-gold);\n  font-size: 12px;\n  line-height: 1.4;\n  border: 1px solid rgba(232, 195, 108, .24);\n  border-radius: 999px;\n  background: rgba(232, 195, 108, .07);\n}\n\n.bond-control-list {\n  display: grid;\n  gap: 16px;\n}\n\n.bond-control-group {\n  padding: 16px;\n  display: grid;\n  gap: 12px;\n  border: 1px solid rgba(94, 231, 255, .13);\n  border-bottom-color: rgba(232, 195, 108, .25);\n  border-radius: 20px;\n  background: rgba(2, 8, 20, .34);\n}\n\n.bond-group-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n}\n\n.bond-group-head b {\n  display: block;\n  margin-bottom: 6px;\n  color: #fff;\n  font-weight: 500;\n  letter-spacing: .1em;\n}\n\n.bond-group-head small {\n  display: block;\n  color: var(--cc-muted);\n  font-size: 12px;\n  line-height: 1.7;\n}\n\n.bond-group-head span {\n  flex: none;\n  padding: 5px 9px;\n  color: var(--cc-gold);\n  font: 12px/1.4 \"Segoe UI\", sans-serif;\n  border: 1px solid rgba(232, 195, 108, .22);\n  border-radius: 999px;\n  background: rgba(232, 195, 108, .06);\n}\n\n.bond-option-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.bond-option {\n  position: relative;\n  min-width: 0;\n  padding: 14px 14px 14px 44px;\n  display: grid;\n  gap: 6px;\n  cursor: pointer;\n  color: var(--cc-text);\n  text-align: left;\n  border: 1px solid rgba(94, 231, 255, .15);\n  border-bottom-color: rgba(232, 195, 108, .25);\n  border-radius: 18px;\n  background: rgba(4, 14, 34, .58);\n  transition: .18s;\n}\n\n.bond-option:hover,\n.bond-option.active {\n  transform: translateY(-2px);\n  border-color: rgba(232, 195, 108, .56);\n  box-shadow: 0 0 22px rgba(232, 195, 108, .1), inset 0 -1px 0 rgba(232, 195, 108, .42);\n}\n\n.bond-option.active {\n  background: linear-gradient(180deg, rgba(232, 195, 108, .14), rgba(4, 14, 34, .72));\n}\n\n.bond-option-mark {\n  position: absolute;\n  top: 14px;\n  left: 14px;\n  width: 20px;\n  height: 20px;\n  display: grid;\n  place-items: center;\n  color: var(--cc-gold);\n  font-family: \"Segoe UI\", sans-serif;\n  font-size: 12px;\n  border: 1px solid rgba(232, 195, 108, .34);\n  border-radius: 50%;\n}\n\n.bond-option b {\n  color: #fff;\n  font-weight: 500;\n  letter-spacing: .1em;\n}\n\n.bond-option strong {\n  width: max-content;\n  padding: 3px 8px;\n  color: #d8e4f7;\n  font: 12px/1.4 \"Segoe UI\", sans-serif;\n  border: 1px solid rgba(94, 231, 255, .16);\n  border-radius: 999px;\n  background: rgba(94, 231, 255, .07);\n}\n\n.bond-option small {\n  color: var(--cc-muted);\n  font-size: 12px;\n  line-height: 1.5;\n}\n\n.bond-option em {\n  color: var(--cc-dim);\n  font-size: 11px;\n  font-style: normal;\n  line-height: 1.55;\n  overflow-wrap: anywhere;\n}\n\n.bond-option.active em {\n  color: #aab8cf;\n}\n\n.bond-relation-row {\n  padding-top: 12px;\n  display: grid;\n  gap: 10px;\n  border-top: 1px solid rgba(94, 231, 255, .1);\n}\n\n.bond-relation-row > b {\n  color: #fff;\n  font-size: 13px;\n  font-weight: 500;\n  letter-spacing: .08em;\n}\n\n.bond-profile-panel {\n  display: grid;\n  gap: 16px;\n}\n\n.bond-profile-section {\n  padding: 14px;\n  display: grid;\n  gap: 12px;\n  border: 1px solid rgba(94, 231, 255, .12);\n  border-bottom-color: rgba(232, 195, 108, .24);\n  border-radius: 18px;\n  background: rgba(2, 8, 20, .34);\n}\n\n.bond-profile-head {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n\n.bond-profile-head b {\n  color: #fff;\n  font-weight: 500;\n  letter-spacing: .08em;\n}\n\n.bond-profile-row {\n  position: relative;\n  padding: 14px;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n  border: 1px solid rgba(94, 231, 255, .12);\n  border-radius: 16px;\n  background: rgba(4, 14, 34, .42);\n}\n\n.bond-profile-remove {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  padding: 5px 9px;\n  cursor: pointer;\n  color: #ffd7de;\n  font-size: 12px;\n  border: 1px solid rgba(255, 93, 119, .28);\n  border-radius: 999px;\n  background: rgba(255, 93, 119, .08);\n}\n\n.bond-profile-row .field:first-of-type {\n  padding-right: 64px;\n}\n\n.chapter-agent-note {\n  margin-top: 12px;\n}\n\n.attr-grid,\n.specialty-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.attr-card,\n.specialty-card,\n.v2-trait-card,\n.draft-slot {\n  min-width: 0;\n  padding: 16px;\n  border: 1px solid var(--cc-line);\n  border-bottom-color: rgba(232, 195, 108, .26);\n  border-radius: 17px;\n  background: rgba(2, 9, 24, .55);\n  box-shadow: inset 0 -1px 0 rgba(232, 195, 108, .08);\n}\n\n.attr-card header {\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.attr-card header b {\n  color: var(--cc-gold);\n  font: 700 24px/1 \"Segoe UI\", sans-serif;\n}\n\n.specialty-card h4,\n.v2-trait-card h4 {\n  margin: 0 0 8px;\n  font-weight: 500;\n}\n\n.specialty-card p,\n.v2-trait-card p {\n  margin: 0 0 13px;\n  color: var(--cc-muted);\n  font-size: 13px;\n  line-height: 1.65;\n}\n\n.specialty-ranks {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n\n.specialty-ranks button {\n  flex: 1;\n  min-height: 36px;\n  padding: 6px 8px;\n  cursor: pointer;\n  color: var(--cc-muted);\n  border: 1px solid var(--cc-line);\n  border-radius: 10px;\n  background: rgba(8, 23, 49, .84);\n}\n\n.soul-awakening-console,\n.soul-active-panel,\n.soul-create-layout {\n  display: grid;\n  gap: 18px;\n}\n\n.soul-switch {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.soul-switch-tab {\n  min-width: 0;\n  min-height: 88px;\n  padding: 15px 17px;\n  display: grid;\n  align-content: center;\n  gap: 5px;\n  text-align: left;\n  border-radius: 18px;\n}\n\n.soul-switch-tab span,\n.soul-switch-tab small {\n  color: var(--cc-dim);\n  font: 11px/1.4 \"Segoe UI\", sans-serif;\n  letter-spacing: .06em;\n}\n\n.soul-switch-tab strong {\n  overflow: hidden;\n  color: #dce9f8;\n  font-size: 16px;\n  font-weight: 500;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.soul-switch-tab.is-active {\n  background: linear-gradient(180deg, rgba(232, 195, 108, .15), rgba(4, 14, 34, .76));\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .48), 0 12px 28px rgba(0, 0, 0, .15);\n}\n\n.soul-switch-tab.is-active strong,\n.soul-switch-tab.is-active small {\n  color: #fff;\n}\n\n.soul-switch-tab.is-locked {\n  opacity: .68;\n}\n\n.soul-overview-panel,\n.soul-card {\n  padding: 22px;\n}\n\n.soul-overview-panel .section-head h3 {\n  margin: 7px 0 0;\n  color: #fff;\n  font-size: 22px;\n  font-weight: 500;\n  letter-spacing: .1em;\n}\n\n.soul-page-head {\n  align-items: flex-start;\n}\n\n.soul-page-head h3,\n.soul-lock-panel h3 {\n  margin: 7px 0 0;\n  color: #fff;\n  font-size: 22px;\n  font-weight: 500;\n  letter-spacing: .1em;\n}\n\n.tag {\n  color: var(--cc-gold);\n  font: 11px/1.4 \"Segoe UI\", sans-serif;\n  letter-spacing: .13em;\n}\n\n.soul-head-actions {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n\n.soul-narrative-readout {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 12px;\n  margin-top: 18px;\n}\n\n.soul-narrative-readout div {\n  min-width: 0;\n  padding: 13px;\n  display: grid;\n  gap: 6px;\n  border: 1px solid rgba(94, 231, 255, .12);\n  border-bottom-color: rgba(232, 195, 108, .28);\n  border-radius: 15px;\n  background: rgba(2, 8, 20, .42);\n}\n\n.soul-narrative-readout span {\n  color: var(--cc-muted);\n  font: 11px/1.4 \"Segoe UI\", sans-serif;\n  letter-spacing: .07em;\n}\n\n.soul-narrative-readout b {\n  overflow-wrap: anywhere;\n  color: var(--cc-gold);\n  font-size: 18px;\n  font-weight: 500;\n}\n\n.soul-section {\n  padding: 18px;\n  display: grid;\n  gap: 14px;\n  border: 1px solid rgba(94, 231, 255, .12);\n  border-bottom-color: rgba(232, 195, 108, .24);\n  border-radius: 20px;\n  background: rgba(2, 8, 20, .34);\n}\n\n.soul-pill-group {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 9px;\n}\n\n.select-btn {\n  min-width: 0;\n  min-height: 48px;\n  padding: 9px 11px;\n  display: grid;\n  place-content: center;\n  gap: 3px;\n  cursor: pointer;\n  color: var(--cc-muted);\n  text-align: center;\n  border: 1px solid var(--cc-line);\n  border-bottom-color: rgba(232, 195, 108, .25);\n  border-radius: 14px;\n  background: rgba(5, 17, 39, .72);\n  transition: color .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;\n}\n\n.select-btn b {\n  overflow-wrap: anywhere;\n  color: #dce8f7;\n  font-weight: 500;\n}\n\n.select-btn small {\n  color: var(--cc-dim);\n  font: 10px/1.3 \"Segoe UI\", sans-serif;\n}\n\n.select-btn:hover,\n.select-btn.active {\n  color: #fff;\n  border-color: rgba(232, 195, 108, .6);\n  background: linear-gradient(180deg, rgba(232, 195, 108, .13), rgba(4, 14, 34, .78));\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .34), 0 0 20px rgba(232, 195, 108, .08);\n  transform: translateY(-1px);\n}\n\n.select-btn.active b,\n.select-btn.active small {\n  color: #fff;\n}\n\n.soul-card .soul-pill {\n  min-height: 38px;\n  padding: 8px 14px;\n  display: inline-grid;\n  grid-auto-flow: column;\n  place-content: center;\n  gap: 6px;\n  border-radius: 999px;\n}\n\n.soul-card .soul-pill small {\n  align-self: center;\n}\n\n.soul-card .soul-pill:disabled {\n  cursor: not-allowed;\n  opacity: .45;\n  transform: none;\n  box-shadow: none;\n}\n\n.soul-attribute-grid {\n  padding: 4px 0;\n}\n\n.soul-description-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px;\n}\n\n.soul-description-grid textarea {\n  min-height: 126px;\n}\n\n.soul-ai-panel {\n  padding: 18px;\n}\n\n.body-soul-panel {\n  border-color: rgba(232, 195, 108, .24);\n}\n\n.body-soul-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 14px;\n}\n\n.extreme-toggle {\n  width: max-content;\n  max-width: 100%;\n}\n\n.soul-cost-breakdown {\n  padding: 18px;\n  display: grid;\n  gap: 0;\n  border: 1px solid rgba(94, 231, 255, .12);\n  border-bottom-color: rgba(232, 195, 108, .32);\n  border-radius: 20px;\n  background: rgba(2, 8, 20, .46);\n}\n\n.soul-cost-breakdown .section-head {\n  margin-bottom: 8px;\n}\n\n.soul-cost-breakdown .sum-row:last-child {\n  border-bottom: 0;\n}\n\n.soul-cost-breakdown strong {\n  color: var(--cc-gold);\n}\n\n.soul-lock-panel {\n  min-height: 250px;\n  padding: 30px;\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 24px;\n}\n\n.soul-lock-panel p {\n  margin: 9px 0 0;\n  color: var(--cc-muted);\n  line-height: 1.7;\n}\n\n.soul-lock-mark {\n  width: 96px;\n  height: 96px;\n  border: 1px solid rgba(232, 195, 108, .45);\n  border-radius: 50%;\n  background:\n    repeating-conic-gradient(transparent 0 14deg, rgba(232, 195, 108, .42) 15deg 17deg, transparent 18deg 30deg),\n    radial-gradient(circle, rgba(94, 231, 255, .14), rgba(2, 8, 20, .96) 58%);\n  box-shadow: inset 0 0 22px rgba(94, 231, 255, .08), 0 0 30px rgba(232, 195, 108, .12);\n}\n\n.resource-filter {\n  padding: 9px 14px;\n  border-radius: 999px;\n}\n\n.chip.attrchip {\n  --soul-attribute-color: var(--cc-gold);\n  display: inline-flex;\n  align-items: center;\n  cursor: pointer;\n  color: color-mix(in srgb, var(--soul-attribute-color) 82%, #fff);\n  border-color: color-mix(in srgb, var(--soul-attribute-color) 42%, transparent);\n  background: linear-gradient(180deg, color-mix(in srgb, var(--soul-attribute-color) 10%, transparent), rgba(2, 8, 20, .5));\n  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--soul-attribute-color) 6%, transparent);\n  transition: color .18s ease, border-color .18s ease, background .18s ease, box-shadow .18s ease, transform .18s ease;\n}\n\n.chip.attrchip:hover,\n.chip.attrchip:focus-visible,\n.chip.attrchip.active {\n  color: #fff;\n  border-color: color-mix(in srgb, var(--soul-attribute-color) 82%, #fff 8%);\n  background: linear-gradient(180deg, color-mix(in srgb, var(--soul-attribute-color) 24%, transparent), rgba(3, 10, 25, .74));\n  box-shadow: 0 0 18px color-mix(in srgb, var(--soul-attribute-color) 24%, transparent), inset 0 -1px 0 var(--soul-attribute-color);\n  transform: translateY(-1px);\n}\n\n.extreme-choice-grid .soul-pill {\n  --soul-attribute-color: var(--cc-gold);\n  color: color-mix(in srgb, var(--soul-attribute-color) 82%, #fff);\n  border-color: color-mix(in srgb, var(--soul-attribute-color) 42%, transparent);\n}\n\n.extreme-choice-grid .soul-pill.active {\n  color: #fff;\n  border-color: var(--soul-attribute-color);\n  background: linear-gradient(180deg, color-mix(in srgb, var(--soul-attribute-color) 24%, transparent), rgba(3, 10, 25, .74));\n  box-shadow: 0 0 18px color-mix(in srgb, var(--soul-attribute-color) 28%, transparent), inset 0 -1px 0 var(--soul-attribute-color);\n}\n\n.soul-card [data-value=\"金\"] { --soul-attribute-color: #d7b457; }\n.soul-card [data-value=\"木\"] { --soul-attribute-color: #4fbf73; }\n.soul-card [data-value=\"水\"] { --soul-attribute-color: #4aa3ff; }\n.soul-card [data-value=\"火\"] { --soul-attribute-color: #ff6655; }\n.soul-card [data-value=\"土\"] { --soul-attribute-color: #b58b55; }\n.soul-card [data-value=\"风\"] { --soul-attribute-color: #7ee2c7; }\n.soul-card [data-value=\"雷\"] { --soul-attribute-color: #b68cff; }\n.soul-card [data-value=\"光\"] { --soul-attribute-color: #f0e6a8; }\n.soul-card [data-value=\"暗\"] { --soul-attribute-color: #6f5a99; }\n.soul-card [data-value=\"冰\"] { --soul-attribute-color: #8ee8ff; }\n.soul-card [data-value=\"毒\"] { --soul-attribute-color: #8bd14f; }\n.soul-card [data-value=\"精神\"] { --soul-attribute-color: #d59cff; }\n.soul-card [data-value=\"生命\"] { --soul-attribute-color: #50d68a; }\n.soul-card [data-value=\"空间\"] { --soul-attribute-color: #78a8ff; }\n.soul-card [data-value=\"时间\"] { --soul-attribute-color: #e0c26e; }\n.soul-card [data-value=\"毁灭\"] { --soul-attribute-color: #d25757; }\n.soul-card [data-value=\"创造\"] { --soul-attribute-color: #73e0c4; }\n.soul-card [data-value=\"神圣\"] { --soul-attribute-color: #f6e7a7; }\n.soul-card [data-value=\"邪恶\"] { --soul-attribute-color: #b061d1; }\n\n.resource-layout {\n  display: grid;\n  grid-template-columns: minmax(210px, .5fr) minmax(0, 1.5fr);\n  gap: 18px;\n}\n\n.vertical-menu {\n  display: grid;\n  align-content: start;\n  gap: 9px;\n}\n\n.vitem {\n  min-height: 54px;\n  padding: 12px 14px;\n  display: flex;\n  justify-content: space-between;\n  gap: 10px;\n  text-align: left;\n  border-radius: var(--cc-radius-control);\n}\n\n.vitem:hover,\n.vitem.active {\n  transform: translateX(4px);\n}\n\n.bond-layout .vitem:hover,\n.bond-layout .vitem.active {\n  transform: none;\n}\n\n.trait-card-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  gap: 12px;\n}\n\n.trait-group-tabs,\n.trait-facet-tabs {\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 7px;\n}\n\n.trait-group-tabs {\n  width: 100%;\n  padding-bottom: 10px;\n  border-bottom: 1px solid var(--cc-line);\n}\n\n.trait-group-tabs .resource-filter {\n  min-height: 38px;\n  padding: 7px 13px;\n}\n\n.trait-group-tabs .resource-filter span {\n  min-width: 20px;\n  margin-left: 6px;\n  padding: 2px 6px;\n  display: inline-grid;\n  place-items: center;\n  color: var(--cc-cyan);\n  border: 1px solid rgba(94, 231, 255, .2);\n  border-radius: 999px;\n  background: rgba(94, 231, 255, .07);\n  font: 700 10px/1.2 \"Segoe UI\", sans-serif;\n}\n\n.trait-filter-tools {\n  width: 100%;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(170px, .32fr) minmax(116px, .2fr);\n  align-items: end;\n  gap: 9px;\n}\n\n.trait-facet-tabs {\n  align-self: center;\n}\n\n.trait-facet-tabs .resource-filter {\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 11px;\n}\n\n.trait-search-field,\n.trait-cost-field {\n  min-width: 0;\n  display: grid;\n  gap: 5px;\n}\n\n.trait-search-field span,\n.trait-cost-field span {\n  color: var(--cc-muted);\n  font: 10px/1.3 \"Segoe UI\", sans-serif;\n  letter-spacing: .08em;\n}\n\n.trait-search-field input,\n.trait-cost-field select {\n  width: 100%;\n  min-height: 36px;\n  padding: 7px 9px;\n  color: var(--cc-text);\n  border: 1px solid var(--cc-line);\n  border-radius: var(--cc-radius-control);\n  outline: 0;\n  background: rgba(2, 9, 24, .78);\n  font: inherit;\n}\n\n.trait-search-field input:focus,\n.trait-cost-field select:focus {\n  border-color: rgba(232, 195, 108, .58);\n  box-shadow: 0 0 0 3px rgba(232, 195, 108, .07);\n}\n\n.trait-browser-summary {\n  min-width: 0;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  color: var(--cc-muted);\n}\n\n.trait-browser-summary span,\n.trait-browser-summary small {\n  font-size: 11px;\n}\n\n.trait-browser-summary strong {\n  color: var(--cc-gold);\n  font: 700 19px/1 \"Segoe UI\", sans-serif;\n}\n\n.trait-browser-summary small {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.trait-index-grid {\n  min-width: 0;\n  padding: 2px 1px 8px;\n  display: grid;\n  grid-template-rows: repeat(2, auto);\n  grid-auto-flow: column;\n  grid-auto-columns: minmax(142px, 1fr);\n  gap: 8px;\n  overflow-x: auto;\n  overscroll-behavior-x: contain;\n  scrollbar-width: thin;\n  scroll-snap-type: x proximity;\n}\n\n.trait-index-button {\n  min-width: 0;\n  min-height: 49px;\n  padding: 8px 10px;\n  display: grid;\n  align-content: center;\n  gap: 3px;\n  cursor: pointer;\n  text-align: left;\n  color: var(--cc-muted);\n  border: 1px solid var(--cc-line);\n  border-radius: 10px;\n  background: rgba(3, 12, 29, .7);\n  scroll-snap-align: start;\n  transition: color .16s ease, border-color .16s ease, background .16s ease, transform .16s ease;\n}\n\n.trait-index-button b,\n.trait-index-button span {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.trait-index-button b {\n  color: #dceaff;\n  font-size: 13px;\n  font-weight: 600;\n}\n\n.trait-index-button span {\n  font: 10px/1.3 \"Segoe UI\", sans-serif;\n}\n\n.trait-index-button:hover,\n.trait-index-button:focus-visible,\n.trait-index-button.active {\n  color: #fff;\n  border-color: rgba(232, 195, 108, .58);\n  background: linear-gradient(180deg, rgba(232, 195, 108, .11), rgba(4, 14, 34, .76));\n  outline: 0;\n  transform: translateY(-1px);\n}\n\n.trait-index-button.active {\n  box-shadow: inset 0 -2px 0 rgba(232, 195, 108, .58), 0 8px 22px rgba(0, 0, 0, .18);\n}\n\n.trait-index-button.is-selected {\n  border-color: rgba(94, 231, 255, .48);\n}\n\n.trait-index-button.is-selected span {\n  color: var(--cc-cyan);\n}\n\n.trait-index-button.is-disabled {\n  opacity: .52;\n}\n\n.trait-browser-detail {\n  min-width: 0;\n  padding: 16px;\n  border: 1px solid var(--cc-line-strong);\n  border-bottom-color: var(--cc-line-gold);\n  border-radius: 14px;\n  background: linear-gradient(145deg, rgba(6, 19, 43, .9), rgba(2, 8, 20, .72));\n}\n\n.trait-browser-detail-head {\n  min-width: 0;\n  display: flex;\n  align-items: start;\n  justify-content: space-between;\n  gap: 14px;\n}\n\n.trait-browser-detail-head > div {\n  min-width: 0;\n}\n\n.trait-browser-detail-head h4 {\n  margin: 4px 0 0;\n  overflow-wrap: anywhere;\n  color: #fff;\n  font-size: 20px;\n  font-weight: 550;\n}\n\n.trait-browser-detail-head .cost {\n  flex: 0 0 auto;\n}\n\n.trait-browser-detail > p {\n  margin: 0;\n  color: var(--cc-muted);\n  line-height: 1.65;\n}\n\n.trait-browser-rule-preview {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 9px;\n}\n\n.trait-browser-rule-preview > div {\n  min-width: 0;\n  padding: 10px 11px;\n  border: 1px solid rgba(94, 231, 255, .1);\n  border-radius: 10px;\n  background: rgba(2, 9, 24, .48);\n}\n\n.trait-browser-rule-preview b {\n  color: var(--cc-gold);\n  font-size: 11px;\n}\n\n.trait-browser-rule-preview p {\n  margin: 5px 0 0;\n  color: var(--cc-muted);\n  font-size: 12px;\n  line-height: 1.55;\n}\n\n.trait-browser-empty {\n  min-height: 136px;\n  padding: 22px;\n  display: grid;\n  place-content: center;\n  gap: 6px;\n  text-align: center;\n  color: var(--cc-muted);\n  border: 1px dashed var(--cc-line);\n  border-radius: 14px;\n  background: rgba(2, 9, 24, .4);\n}\n\n.trait-browser-empty b {\n  color: #dceaff;\n}\n\n.v2-trait-card {\n  display: grid;\n  align-content: start;\n  gap: 10px;\n}\n\n.v2-trait-card.is-disabled {\n  opacity: .58;\n  border-color: rgba(255, 150, 130, .32);\n}\n\n.trait-card-actions {\n  display: flex;\n  gap: 8px;\n  margin-top: auto;\n}\n\n.trait-card-actions .btn {\n  flex: 1;\n}\n\n.trait-conflict-note {\n  color: #ffad9e;\n  line-height: 1.55;\n}\n\n.trait-detail-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 10000;\n  display: grid;\n  place-items: center;\n  padding: 18px;\n}\n\n.trait-detail-overlay[hidden] {\n  display: none;\n}\n\n.trait-detail-backdrop {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: rgba(0, 3, 12, .78);\n  backdrop-filter: blur(7px);\n  cursor: default;\n}\n\n.trait-detail-dialog {\n  position: relative;\n  z-index: 1;\n  width: min(920px, calc(100vw - 36px));\n  max-height: min(860px, calc(100vh - 36px));\n  overflow: auto;\n  overscroll-behavior: contain;\n  border-color: var(--cc-line-gold);\n  background: var(--cc-panel-strong);\n  box-shadow: 0 30px 100px rgba(0, 0, 0, .72), 0 0 50px rgba(94, 231, 255, .08);\n}\n\n.trait-detail-head {\n  position: sticky;\n  top: -16px;\n  z-index: 2;\n  margin: -16px -16px 0;\n  padding: 16px;\n  border-bottom: 1px solid var(--cc-line);\n  background: rgba(5, 18, 42, .98);\n  backdrop-filter: blur(12px);\n}\n\n.trait-detail-head-actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.trait-detail-close {\n  display: grid;\n  place-items: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  color: var(--cc-text);\n  font-size: 24px;\n  line-height: 1;\n  border: 1px solid var(--cc-line-strong);\n  border-radius: 50%;\n  background: rgba(94, 231, 255, .08);\n}\n\n.trait-detail-close:hover {\n  color: #fff;\n  border-color: var(--cc-line-gold);\n  background: rgba(232, 195, 108, .14);\n}\n\n.trait-rule-list {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.trait-rule-row {\n  padding: 12px;\n  border: 1px solid var(--cc-line);\n  border-radius: 12px;\n  background: rgba(2, 9, 24, .48);\n}\n\n.trait-rule-row b {\n  color: var(--cc-gold);\n  font-size: 12px;\n}\n\n.trait-rule-row p {\n  margin: 6px 0 0;\n  color: var(--cc-muted);\n  font-size: 13px;\n  line-height: 1.65;\n}\n\n.trait-config-section {\n  display: grid;\n  gap: 12px;\n  margin-top: 14px;\n  padding-top: 14px;\n  border-top: 1px solid var(--cc-line);\n}\n\n.trait-config-grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 12px;\n}\n\n.final-archive-grid {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);\n  gap: 20px;\n  align-items: start;\n}\n\n.final-validation,\n.final-preview,\n.summary-list,\n.draft-manager {\n  display: grid;\n  gap: 10px;\n}\n\n.output {\n  min-height: 400px;\n  resize: vertical;\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  font: 12px/1.58 ui-monospace, \"Cascadia Mono\", monospace;\n}\n\n.sum-row {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 11px 13px;\n  border: 1px solid var(--cc-line);\n  border-radius: 11px;\n  background: rgba(2, 9, 24, .48);\n}\n\n.draft-slot-grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.draft-slot {\n  display: grid;\n  gap: 7px;\n}\n\n.draft-slot span,\n.draft-slot small {\n  overflow-wrap: anywhere;\n  color: var(--cc-muted);\n}\n\n/* 6. Container-responsive layout */\n@container dl-character-create (max-width: 1100px) {\n  .ds8-head,\n  .archive,\n  .era-detail,\n  .species-band,\n  .resource-layout,\n  .final-archive-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .point-core {\n    justify-content: flex-start;\n  }\n\n  .stagebar {\n    grid-template-columns: repeat(6, minmax(82px, 1fr));\n    gap: 8px;\n    min-height: auto;\n    padding-inline: 8px;\n  }\n\n  .stagebar::before {\n    display: none;\n  }\n\n  .soul-switch {\n    grid-template-columns: 1fr;\n  }\n\n  .soul-narrative-readout {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .body-soul-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .attr-grid,\n  .specialty-grid {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .trait-filter-tools {\n    grid-template-columns: minmax(0, 1fr) minmax(150px, .38fr);\n  }\n\n  .trait-cost-field {\n    grid-column: 2;\n  }\n\n  .trait-facet-tabs {\n    grid-row: span 2;\n  }\n}\n\n@container dl-character-create (max-width: 980px) {\n  .bond-layout,\n  .bond-profile-row {\n    grid-template-columns: 1fr;\n  }\n\n  .bond-option-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .bond-group-head {\n    display: grid;\n  }\n\n  .bond-group-head span {\n    width: max-content;\n  }\n\n  .bond-layout .vitem:hover,\n  .bond-layout .vitem.active {\n    transform: none;\n  }\n}\n\n@media (max-width: 980px) {\n  .bond-layout,\n  .bond-profile-row,\n  .bond-option-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .bond-layout .vitem:hover,\n  .bond-layout .vitem.active {\n    transform: none;\n  }\n}\n\n@container dl-character-create (max-width: 760px) {\n  .trait-rule-list,\n  .trait-config-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .trait-detail-overlay {\n    padding: 8px;\n  }\n\n  .trait-detail-dialog {\n    width: calc(100vw - 16px);\n    max-height: calc(100vh - 16px);\n  }\n\n  .ds8-inner {\n    padding: 10px 8px 18px;\n  }\n\n  .ds8-head {\n    gap: 14px;\n    margin-bottom: 16px;\n    padding: 15px 12px;\n    text-align: center;\n  }\n\n  .brand {\n    justify-content: center;\n    gap: 10px;\n  }\n\n  .brand-sigil {\n    flex-basis: 34px;\n    width: 34px;\n    height: 34px;\n  }\n\n  .brand-sigil::after {\n    inset: 11px;\n  }\n\n  .brand h1 {\n    font-size: 23px;\n    letter-spacing: .03em;\n    overflow-wrap: anywhere;\n  }\n\n  .brand h1 span:not(.brand-sep) {\n    display: block;\n  }\n\n  .brand-sep {\n    display: none;\n  }\n\n  .brand p {\n    font-size: 10px;\n    letter-spacing: .06em;\n    overflow-wrap: anywhere;\n  }\n\n  .point-core {\n    width: 100%;\n    display: grid;\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n    gap: 8px;\n  }\n\n  .point-orb {\n    width: 100%;\n    min-height: 82px;\n    padding: 10px 5px;\n    border-radius: 28px;\n  }\n\n  .point-orb span {\n    font-size: 10px;\n  }\n\n  .point-orb b {\n    font-size: 25px;\n  }\n\n  .point-orb small {\n    font-size: 9px;\n  }\n\n  .stagebar {\n    grid-template-columns: repeat(6, minmax(78px, 1fr));\n    gap: 6px;\n    margin-bottom: 18px;\n    padding: 8px 4px;\n  }\n\n  .stage {\n    --ring-size: 72px;\n    height: 98px;\n    letter-spacing: 0;\n  }\n\n  .stage .txt {\n    max-width: 6em;\n    padding-inline: 3px;\n    font-size: 12px;\n    line-height: 1.3;\n  }\n\n  .shell {\n    min-height: 0;\n    border-radius: 18px;\n  }\n\n  .page {\n    padding: 19px 12px;\n  }\n\n  .page-title {\n    font-size: 23px;\n    letter-spacing: .05em;\n  }\n\n  .page-note {\n    margin-bottom: 18px;\n    font-size: 13px;\n    line-height: 1.75;\n  }\n\n  .holo-panel {\n    border-radius: 18px;\n  }\n\n  .panel-pad,\n  .radarBox {\n    padding: 16px;\n  }\n\n  .section-head {\n    align-items: flex-start;\n  }\n\n  .row,\n  .chapter-row,\n  .nodes,\n  .species-picks,\n  .attr-grid,\n  .specialty-grid,\n  .draft-slot-grid,\n  .pick-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .trait-filter-tools {\n    grid-template-columns: minmax(0, 1fr);\n  }\n\n  .trait-facet-tabs,\n  .trait-cost-field {\n    grid-column: auto;\n    grid-row: auto;\n  }\n\n  .trait-index-grid {\n    grid-auto-columns: minmax(122px, 42vw);\n  }\n\n  .trait-browser-rule-preview {\n    grid-template-columns: 1fr;\n  }\n\n  .nodes {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 10px;\n  }\n\n  .timeline {\n    padding: 6px 0;\n  }\n\n  .timeline-line {\n    display: none;\n  }\n\n  .era-node {\n    min-height: 102px;\n  }\n\n  .era-dot {\n    width: 46px;\n    height: 46px;\n  }\n\n  .action-bar .btn {\n    flex: 1 1 135px;\n  }\n\n  .soul-description-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .soul-lock-panel {\n    grid-template-columns: 1fr;\n    justify-items: start;\n  }\n\n  .soul-lock-panel .btn {\n    width: 100%;\n  }\n\n  .soul-head-actions {\n    justify-content: flex-start;\n  }\n}\n\n@container dl-character-create (max-width: 430px) {\n  .ds8 {\n    margin: 4px auto;\n    border-radius: 18px;\n  }\n\n  .ds8-inner {\n    padding: 8px 6px 16px;\n  }\n\n  .ds8-head {\n    padding: 13px 9px;\n  }\n\n  .brand h1 {\n    font-size: 21px;\n  }\n\n  .point-core {\n    gap: 6px;\n  }\n\n  .point-orb {\n    min-height: 76px;\n    padding-inline: 3px;\n    border-radius: 24px;\n  }\n\n  .point-orb span {\n    font-size: 9px;\n    letter-spacing: 0;\n  }\n\n  .point-orb b {\n    font-size: 22px;\n  }\n\n  .point-orb small {\n    font-size: 8px;\n    letter-spacing: 0;\n  }\n\n  .stage {\n    --ring-size: 64px;\n    height: 88px;\n  }\n\n  .stage .txt {\n    font-size: 11px;\n  }\n\n  .stagebar {\n    grid-template-columns: repeat(6, minmax(72px, 1fr));\n  }\n\n  .trait-group-tabs,\n  .trait-facet-tabs {\n    flex-wrap: nowrap;\n    padding-bottom: 5px;\n    overflow-x: auto;\n    scrollbar-width: thin;\n  }\n\n  .trait-group-tabs .resource-filter,\n  .trait-facet-tabs .resource-filter {\n    flex: 0 0 auto;\n  }\n\n  .trait-browser-detail-head h4 {\n    font-size: 17px;\n  }\n\n  .soul-overview-panel,\n  .soul-card,\n  .soul-section,\n  .soul-lock-panel {\n    padding: 14px;\n  }\n\n  .soul-narrative-readout {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .soul-card .soul-pill {\n    flex: 1 1 calc(50% - 5px);\n  }\n\n  .page {\n    padding: 16px 10px;\n  }\n\n  .panel-pad,\n  .radarBox {\n    padding: 14px;\n  }\n\n  .section-head {\n    display: grid;\n    gap: 5px;\n  }\n\n  .footer .btn {\n    flex: 1 1 120px;\n  }\n}\n\n/* 7. Motion preferences */\n@keyframes dlcc-star-drift {\n  from { background-position: 0 0, 0 0; }\n  to { background-position: 160px 80px, 840px 0; }\n}\n\n@keyframes dlcc-sigil-pulse {\n  50% { transform: scale(1.12); opacity: .65; }\n}\n\n@keyframes dlcc-nav-sweep {\n  0%, 18% { background-position: 110% 0; }\n  72%, 100% { background-position: -40% 0; }\n}\n\n@keyframes dlcc-ring-turn {\n  to { transform: rotate(360deg); }\n}\n\n@keyframes dlcc-ring-reverse {\n  to { transform: rotate(-360deg); }\n}\n\n@keyframes dlcc-page-in {\n  from { opacity: 0; transform: translateY(7px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .ds8::before,\n  .brand-sigil::after,\n  .stagebar::after,\n  .stage::before,\n  .stage::after,\n  .page.active {\n    animation: none;\n  }\n\n  .stage,\n  .stage::before,\n  .stage::after,\n  .stage .txt,\n  .era-node,\n  .era-dot,\n  .pick-card,\n  .species-card,\n  .vitem,\n  .resource-filter,\n  .soul-switch button,\n  .btn {\n    transition-duration: .01ms;\n  }\n}\n\n\n.specialty-card.is-selected {\n  border-color: rgba(94, 231, 255, .42);\n  box-shadow: inset 3px 0 0 rgba(94, 231, 255, .52);\n}\n\n.specialty-ranks button.is-active {\n  color: #fff;\n  border-color: rgba(232, 195, 108, .62);\n  background: rgba(232, 195, 108, .13);\n}\n\n.v2-trait-card.is-selected {\n  border-color: rgba(126, 226, 199, .48);\n  background: rgba(126, 226, 199, .07);\n}\n\n.v2-notice {\n  padding: 10px 12px;\n  color: #ffe9b1;\n  line-height: 1.6;\n  border: 1px solid rgba(232, 195, 108, .32);\n  border-radius: 10px;\n  background: rgba(232, 195, 108, .07);\n}\n\n.v2-notice.is-ok {\n  color: #dffcf3;\n  border-color: rgba(126, 226, 199, .38);\n  background: rgba(126, 226, 199, .07);\n}\n\n.v2-notice.is-error,\n.point-orb.warn {\n  color: #ffdbe1;\n  border-color: rgba(255, 93, 119, .44);\n  background: rgba(255, 93, 119, .08);\n}\n\n.cost.warn {\n  color: #ff8ca0;\n}\n\n.trait-check-tag {\n  color: #dffcf3;\n  border-color: rgba(126, 226, 199, .38);\n}\n\n.trait-check-section {\n  margin-top: 18px;\n  padding: 16px;\n  border: 1px solid rgba(94, 231, 255, .24);\n  border-radius: 12px;\n  background: rgba(94, 231, 255, .045);\n}\n\n.trait-check-rule p {\n  white-space: normal;\n}\n";
  const APP_JS = "(function () {\n  \"use strict\";\n\nconst DLCC_RULES = {\"schemaVersion\":2,\"schemaDetailVersion\":\"3.0\",\"systemName\":\"斗罗 Reborn 叙事规则 v3.0\",\"shujukuCompatibility\":{\"repository\":\"AlbusKen/shujuku\",\"recommendedVersion\":\"spv8.8.2\",\"commit\":\"81baa4541b2832d538047557ada1dca6363919b6\",\"publicApiContract\":\"1.7\"},\"runtimeRequirements\":{\"agentWorldbook\":{\"required\":true,\"requiredForPlot\":true,\"executionMode\":\"concurrent\",\"requiredChannels\":[\"finalGeneration\"],\"skillify\":true,\"overwriteManual\":false,\"runTakeover\":true}},\"databaseFillBatches\":[{\"id\":\"persistent\",\"name\":\"长期档案与总结填写\",\"groupId\":40,\"tableIds\":[\"player\",\"souls\",\"abilities\",\"titleLibrary\",\"equippedTitles\",\"soulBones\",\"soulSpirits\",\"battleArmor\",\"mecha\",\"soulDevices\",\"backpack\",\"characters\",\"locations\",\"shortSummary\",\"longSummary\"]}],\"points\":{\"sp\":200,\"ap\":15,\"dp\":32,\"specialtyCosts\":{\"none\":0,\"proficient\":3,\"expert\":6},\"dailyBase\":8,\"dailyCosts\":{\"8\":0,\"9\":1,\"10\":2,\"11\":3,\"12\":4,\"13\":5,\"14\":7,\"15\":9}},\"titleSystem\":{\"slots\":[\"称号1\",\"称号2\",\"称号3\"],\"kinds\":[\"称号\",\"成就\"],\"statuses\":[\"有效\",\"失效\",\"已撤销\"],\"activeStatus\":\"有效\",\"equippableValue\":\"是\",\"attributeHardLimit\":10,\"compositeThreshold\":0.75,\"dicePattern\":\"^[+-][1-9]\\\\d*d(?:[2-9]|[1-9]\\\\d+)$\",\"ranks\":[{\"id\":\"white\",\"name\":\"白\",\"budget\":1,\"attributeRecommendation\":1,\"advantageRecommendation\":0,\"narrativePosition\":\"象征性身份\"},{\"id\":\"yellow\",\"name\":\"黄\",\"budget\":2,\"attributeRecommendation\":2,\"advantageRecommendation\":0,\"narrativePosition\":\"狭窄场景便利\"},{\"id\":\"purple\",\"name\":\"紫\",\"budget\":4,\"attributeRecommendation\":4,\"advantageRecommendation\":1,\"narrativePosition\":\"地方性声望或权限\"},{\"id\":\"black\",\"name\":\"黑\",\"budget\":6,\"attributeRecommendation\":6,\"advantageRecommendation\":1,\"narrativePosition\":\"势力级认可或稀有权限\"},{\"id\":\"red\",\"name\":\"红\",\"budget\":8,\"attributeRecommendation\":8,\"advantageRecommendation\":2,\"narrativePosition\":\"跨势力重大特权\"},{\"id\":\"orange\",\"name\":\"橙\",\"budget\":9,\"attributeRecommendation\":9,\"advantageRecommendation\":2,\"narrativePosition\":\"大陆或时代级特殊地位\"},{\"id\":\"gold\",\"name\":\"金\",\"budget\":10,\"attributeRecommendation\":10,\"advantageRecommendation\":2,\"narrativePosition\":\"唯一性与传说级身份\"}]},\"relationshipLabels\":[\"仇恨\",\"敌视\",\"戒备\",\"陌生\",\"认识\",\"熟悉\",\"友善\",\"信赖\",\"亲朋\",\"挚爱\",\"家人\"],\"readiness\":[\"稳态\",\"受限\",\"危急\",\"失能\"],\"reserveLevels\":[\"充裕\",\"吃紧\",\"透支\",\"枯竭\"],\"injurySeverities\":[\"轻伤\",\"重伤\",\"致命伤\"],\"semanticTones\":{\"readiness\":{\"稳态\":\"good\",\"受限\":\"warning\",\"危急\":\"danger\",\"失能\":\"danger\"},\"reserve\":{\"充裕\":\"good\",\"吃紧\":\"warning\",\"透支\":\"danger\",\"枯竭\":\"danger\"},\"injury\":{\"轻伤\":\"warning\",\"重伤\":\"danger\",\"致命伤\":\"danger\"},\"condition\":{\"稳定\":\"good\",\"恢复中\":\"good\",\"生效中\":\"warning\",\"维持中\":\"warning\",\"恶化\":\"danger\",\"失控\":\"danger\",\"已结束\":\"good\",\"已恢复\":\"good\"}},\"dailyAttributes\":[{\"id\":\"comprehension\",\"name\":\"悟性\"},{\"id\":\"presence\",\"name\":\"气场\"},{\"id\":\"craft\",\"name\":\"百工\"},{\"id\":\"luck\",\"name\":\"气运\"},{\"id\":\"knowledge\",\"name\":\"学识\"},{\"id\":\"experience\",\"name\":\"阅历\"}],\"specialties\":[{\"id\":\"assault\",\"name\":\"强攻破阵\",\"scope\":\"正面突破、防线撕裂、压制坚固目标\"},{\"id\":\"close_combat\",\"name\":\"近身技艺\",\"scope\":\"贴身攻防、擒拿、短距离武器与身体控制\"},{\"id\":\"mobility\",\"name\":\"机动追逃\",\"scope\":\"位移、追击、脱离、复杂地形移动\"},{\"id\":\"guard\",\"name\":\"防御护持\",\"scope\":\"格挡、掩护、承压、保护指定目标\"},{\"id\":\"soul_burst\",\"name\":\"魂技爆发\",\"scope\":\"短时间集中释放魂技威力或强行打开局面\"},{\"id\":\"precision\",\"name\":\"精细操控\",\"scope\":\"微操魂力、精确命中、复杂能力控制\"},{\"id\":\"control\",\"name\":\"控场干涉\",\"scope\":\"限制行动、改变站位、制造战场障碍\"},{\"id\":\"endurance\",\"name\":\"持久运转\",\"scope\":\"维持能力、承受消耗、延长高压行动\"},{\"id\":\"perception\",\"name\":\"感知预判\",\"scope\":\"察觉威胁、读取征兆、预判行动趋势\"},{\"id\":\"will\",\"name\":\"心神对抗\",\"scope\":\"抵御恐惧、幻觉、精神干涉和意志压迫\"},{\"id\":\"multitask\",\"name\":\"多线专注\",\"scope\":\"同时维持多个能力、目标或信息通道\"},{\"id\":\"tactics\",\"name\":\"战术判断\",\"scope\":\"理解战局、分配资源、识别可利用的事实\"}],\"eras\":[{\"id\":\"dou1\",\"name\":\"斗一 / 斗罗大陆\",\"time\":\"传统魂师纪元\",\"locations\":[\"诺丁城\",\"史莱克学院\",\"星斗大森林外围\",\"天斗城\",\"武魂城\",\"自定义地点\"]},{\"id\":\"dou2\",\"name\":\"斗二 / 绝世唐门\",\"time\":\"魂导器崛起\",\"locations\":[\"史莱克学院\",\"日月皇家魂导师学院\",\"极北之地\",\"明都\",\"星斗大森林核心区\",\"自定义地点\"]},{\"id\":\"dou3\",\"name\":\"斗三 / 龙王传说\",\"time\":\"斗铠与机甲纪元\",\"locations\":[\"东海城\",\"史莱克城\",\"传灵塔分部\",\"血神军团\",\"联邦军港\",\"自定义地点\"]},{\"id\":\"dou4\",\"name\":\"斗四 / 终极斗罗\",\"time\":\"星海征途\",\"locations\":[\"史莱克星际城\",\"联邦舰队学院\",\"龙马前线\",\"天堂星黑市\",\"森罗星\",\"自定义地点\"]}],\"soulQualities\":[{\"id\":\"waste\",\"name\":\"废武魂\",\"spCost\":0,\"innate\":\"先天一级\"},{\"id\":\"low\",\"name\":\"低级\",\"spCost\":5,\"innate\":\"先天三级\"},{\"id\":\"mid\",\"name\":\"中级\",\"spCost\":10,\"innate\":\"先天五级\"},{\"id\":\"high\",\"name\":\"高级\",\"spCost\":15,\"innate\":\"先天七级\"},{\"id\":\"top\",\"name\":\"顶级\",\"spCost\":25,\"innate\":\"先天满魂力\"},{\"id\":\"god\",\"name\":\"神级\",\"spCost\":50,\"innate\":\"神赐先天\"},{\"id\":\"overgod\",\"name\":\"超神级\",\"spCost\":100,\"innate\":\"超出常规觉醒体系\"}],\"soulSlotCosts\":[0,10,25],\"soulExtremeCost\":25,\"soulCategories\":[\"兽武魂\",\"器武魂\",\"本体武魂\",\"植物武魂\",\"元素武魂\",\"食物武魂\",\"神赐武魂\",\"自定义\"],\"soulNormalAttributes\":[\"金\",\"木\",\"水\",\"火\",\"土\",\"风\",\"雷\",\"光\",\"暗\",\"冰\",\"毒\",\"精神\"],\"soulSpecialAttributes\":[\"生命\",\"空间\",\"时间\",\"毁灭\",\"创造\",\"神圣\",\"邪恶\"],\"bodySoulParts\":[\"躯干\",\"四肢\",\"眼睛\",\"大脑\",\"经脉\",\"心脏\",\"骨骼\",\"血脉\",\"自定义\"],\"backgroundPresets\":[{\"id\":\"none\",\"name\":\"无特殊资源\",\"cost\":0,\"description\":\"从普通处境开始，没有额外势力或资源倾斜。\"},{\"id\":\"basic\",\"name\":\"基础开局\",\"cost\":5,\"description\":\"拥有少量修炼资源、基础物资或普通导师。\"},{\"id\":\"school\",\"name\":\"学院支持\",\"cost\":10,\"description\":\"拥有学院身份、训练渠道或初期任务入口。\"},{\"id\":\"clan\",\"name\":\"宗门 / 家族支持\",\"cost\":25,\"description\":\"背后有稳定组织，但同时承担组织关系与义务。\"},{\"id\":\"top\",\"name\":\"顶级势力开局\",\"cost\":60,\"description\":\"与顶级势力存在强关联，也更容易卷入高层事件。\"},{\"id\":\"custom\",\"name\":\"自定义\",\"cost\":0,\"description\":\"自行描述出身、资源、关系与相应边界。\"}],\"traitBudget\":{\"negativeRefundCap\":50},\"traitCheckSystem\":{\"baseDie\":\"1D20\",\"attributeModifierFormula\":\"floor((属性值-10)/2)\",\"resolutionFormula\":\"选中的D20＋DP属性调整值＋固定修正＋额外骰子，对抗基础DC＋DC修正\",\"advantageStacking\":\"所有适用来源逐层相加并抵消；总层数S>0时掷1+S个D20取高，S\\u003c0时掷1+|S|个D20取低，S=0时掷1个D20\",\"naturalRollPolicy\":\"自然1和自然20都不自动决定成败，仍按最终结果与有效DC比较\",\"singleTraitApplication\":\"同一特性在同一次检定中最多生效一次，不同特性与称号可以叠加\",\"preparationPolicy\":\"准备检定必须发生在此前的调查或准备场景；同一事实不能连续重投，相同准备效果不重复叠加\",\"failureAgencyBoundary\":\"检定失败不能替玩家决定具体行动，只能让玩家在停止行动、顺从冲动或承担已明确后果之间选择\",\"attributeRoles\":{\"presence\":\"气场负责压制异质意志、抵抗夺舍、坚持自我身份并维持身体和武魂主导权\",\"comprehension\":\"悟性负责察觉异质念头、识破精神幻象与理解异常结构\",\"knowledge\":\"学识负责判断来源、性质、规则与封印方法\",\"experience\":\"阅历负责利用重要经历、关系与过去选择建立自我锚点\",\"craft\":\"百工负责制作封印器具、稳定装置和落实已掌握工艺\",\"luck\":\"气运只处理偶然出现的外部转机，不直接抵抗侵蚀\"}},\"traits\":[{\"id\":\"custom_specialty\",\"name\":\"自定义特长\",\"cost\":50,\"tag\":\"自定义\",\"description\":\"由玩家定义一项具有事实、边界、代价与成长路径的叙事能力。\",\"narrative\":{\"scope\":\"以玩家填写的适用范围为准。\",\"effectFact\":\"只建立玩家明确填写的能力事实。\",\"boundary\":\"不得超出玩家填写的能力边界。\",\"usageCondition\":\"按玩家填写的触发或使用条件生效。\",\"maintenanceCondition\":\"持续效果必须满足玩家填写的维持条件。\",\"costConsequence\":\"必须兑现玩家填写的代价与后果。\",\"recoveryCondition\":\"按玩家填写的恢复条件解除限制。\",\"growthCondition\":\"只在玩家填写的成长节点后扩展。\",\"worldLimitedUses\":\"以玩家填写的世界观次数限制为准。\"},\"configSchema\":{\"title\":\"自定义特性规则\",\"fields\":[{\"key\":\"name\",\"label\":\"名称\",\"required\":true},{\"key\":\"scope\",\"label\":\"适用范围\",\"type\":\"textarea\",\"required\":true},{\"key\":\"effectFact\",\"label\":\"效果事实\",\"type\":\"textarea\",\"required\":true},{\"key\":\"boundary\",\"label\":\"能力边界\",\"type\":\"textarea\",\"required\":true},{\"key\":\"usageCondition\",\"label\":\"触发或使用条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"maintenanceCondition\",\"label\":\"维持条件\",\"type\":\"textarea\"},{\"key\":\"costConsequence\",\"label\":\"代价与后果\",\"type\":\"textarea\",\"required\":true},{\"key\":\"recoveryCondition\",\"label\":\"恢复条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"growthCondition\",\"label\":\"成长条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"worldLimitedUses\",\"label\":\"有限次数\",\"default\":\"无固定次数限制\"}]}},{\"id\":\"body_force\",\"name\":\"力道式微 / 劲儿大 / 一力破万法 / 拳碎虚空\",\"cost\":35,\"tag\":\"强攻\",\"description\":\"以纯粹力量正面破局，越高层的表现越依赖身体承载与真实发力条件。\",\"narrative\":{\"scope\":\"举托、冲撞、破障、近身压制与以力卸力。\",\"effectFact\":\"角色的纯粹力量远超同阶段常态，能对可受力目标形成显著压迫。\",\"boundary\":\"不能凭力量触及无实体目标，也不能忽略材质、体型差距和规则性防护。\",\"usageCondition\":\"必须拥有稳定支点、发力空间或能够接触目标。\",\"maintenanceCondition\":\"连续强攻需要身体结构和呼吸节奏保持稳定。\",\"costConsequence\":\"过度发力会造成肌骨、关节或经脉负担。\",\"recoveryCondition\":\"通过休息、治疗与针对性体修恢复。\",\"growthCondition\":\"在身体境界、发力技艺和承载结构提升后解锁更高表现。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"soul_bound_body\",\"name\":\"天与魂缚\",\"cost\":35,\"tag\":\"路线限制\",\"description\":\"关闭常规魂力外放之路，把修炼成果束缚进身体与本能。\",\"narrative\":{\"scope\":\"身体强化、近身行动、体内循环与本能抗性。\",\"effectFact\":\"魂力会优先沉入身体，使肉身成为主要能力载体。\",\"boundary\":\"不能正常走远程外放、常规魂技投射与精细离体操控路线。\",\"usageCondition\":\"能力依靠身体接触、动作或体内循环实现。\",\"maintenanceCondition\":\"必须持续进行与身体相匹配的训练和调养。\",\"costConsequence\":\"路线断绝会限制装备、魂环和师承选择，强行外放会反噬经脉。\",\"recoveryCondition\":\"身体负担只能通过治疗、休养和重建循环缓解。\",\"growthCondition\":\"通过体魄境界、身体觉醒和独有技艺成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"ignite_starsea\",\"name\":\"点燃星海\",\"cost\":35,\"tag\":\"燃烧路线\",\"description\":\"燃烧生命状态推动武魂与装备超限运转，衰竭会成为持续剧情事实。\",\"narrative\":{\"scope\":\"紧急驱动武魂、斗铠、机甲或魂导装置。\",\"effectFact\":\"角色可将生命活性转化为短时驱动力，使原本停滞的系统继续运转。\",\"boundary\":\"不能制造不存在的能源、权限或装备功能，也不能抹去既有损伤。\",\"usageCondition\":\"必须主动点燃生命状态并存在可被推动的武魂或装备。\",\"maintenanceCondition\":\"维持期间持续消耗身体稳定性。\",\"costConsequence\":\"留下衰弱、灼损、寿元风险或器官负担，并可能继续恶化。\",\"recoveryCondition\":\"需要停止燃烧、接受治疗并补足生命性资源。\",\"growthCondition\":\"对生命循环与装备核心理解加深后，才能改善控制而非免除代价。\",\"worldLimitedUses\":\"受当前生命状态限制。\"}},{\"id\":\"body_grandmaster\",\"name\":\"力道 / 体修无上大宗师\",\"cost\":35,\"tag\":\"体修\",\"description\":\"以身体作为唯一核心路线，拥有宗师级体术直觉，同时永久放弃若干常规手段。\",\"narrative\":{\"scope\":\"体术、步法、劲力、身体感知与近身技艺。\",\"effectFact\":\"角色能迅速理解身体技艺并以肉身重现复杂发力。\",\"boundary\":\"精神秘法、远程魂力塑形与依赖精细外放的路线始终受限。\",\"usageCondition\":\"需要身体能够完成对应动作且已观察或实践相关原理。\",\"maintenanceCondition\":\"必须保持高强度训练和身体完整性。\",\"costConsequence\":\"身体伤势会直接削弱主要能力，路线偏科也会暴露战术空缺。\",\"recoveryCondition\":\"依靠治疗、营养和循序复健恢复。\",\"growthCondition\":\"通过实战、见识更高体术与突破身体境界成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"fire_steel\",\"name\":\"火与钢 / 狂战士体质\",\"cost\":35,\"tag\":\"危急爆发\",\"description\":\"伤势与危局会唤醒更强战斗本能，但治疗排斥与战后崩溃同样真实。\",\"narrative\":{\"scope\":\"负伤后的坚持、近战压迫、痛觉转化与危局反击。\",\"effectFact\":\"角色在危急状态下仍能保持攻击性和行动意志。\",\"boundary\":\"不代表伤势消失，也不能继续使用已经失去功能的身体部位。\",\"usageCondition\":\"必须处于真实受伤、被压迫或濒临失败的局面。\",\"maintenanceCondition\":\"依赖意志维持，局势缓和后积累的负担会显现。\",\"costConsequence\":\"常规治疗容易产生排斥，战后可能陷入虚弱、失控或旧伤恶化。\",\"recoveryCondition\":\"需要停止战斗、接受适配治疗并完成充分休养。\",\"growthCondition\":\"通过学习控制狂战状态与建立专属疗法成长。\",\"worldLimitedUses\":\"受身体可承受伤势限制。\"}},{\"id\":\"uncrowned_king\",\"name\":\"无冕之王 / 一刀修罗\",\"cost\":35,\"tag\":\"极限爆发\",\"description\":\"舍弃常态魂力发展，换取一次需要准备且会彻底透支的极限出手。\",\"narrative\":{\"scope\":\"决定性近战出手、短暂突破与孤注一掷。\",\"effectFact\":\"在完成准备后，角色可把积蓄集中为一次远超常态的短暂爆发。\",\"boundary\":\"不能连续发动，也不能保证命中、破防或战胜更高层存在。\",\"usageCondition\":\"必须提前积蓄、明确目标并拥有完整出手机会。\",\"maintenanceCondition\":\"爆发只维持完成该次决定性行动所需的短暂阶段。\",\"costConsequence\":\"魂力枯竭、身体失能或意识动摇会在行动后兑现。\",\"recoveryCondition\":\"需要完整休息、调息和恢复资源后重新积蓄。\",\"growthCondition\":\"通过境界提升与磨炼唯一招式改善可控性和表现。\",\"worldLimitedUses\":\"每次恢复周期只能完成一次完整爆发。\"}},{\"id\":\"ultimate_chant\",\"name\":\"超绝吟唱 / 终极吟唱\",\"cost\":35,\"tag\":\"魂技聚焦\",\"description\":\"后续魂环围绕第一魂技扩展，使同一核心能力不断获得新形态。\",\"narrative\":{\"scope\":\"第一魂技及其由后续魂环建立的派生表现。\",\"effectFact\":\"每次获得关键魂环时，可令第一魂技吸收新的能力主题或施展方式。\",\"boundary\":\"后续魂环不凭空提供彼此独立的主动魂技，扩展必须与第一魂技核心相容。\",\"usageCondition\":\"需要已获得相应魂环并完成对新能力主题的整合。\",\"maintenanceCondition\":\"复杂形态需要专注、魂力循环与对应魂环稳定。\",\"costConsequence\":\"能力集中会造成手段单一，核心被封锁时整条路线受限。\",\"recoveryCondition\":\"解除封锁并恢复魂环与魂力循环后恢复。\",\"growthCondition\":\"随魂环序号、理解与关键境界逐步扩展。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"imagine_breaker\",\"name\":\"幻想杀手 / 万法不侵\",\"cost\":35,\"tag\":\"免疫\",\"description\":\"以自身能力体系为代价排斥外来魂力干涉，形成鲜明的反能力路线。\",\"narrative\":{\"scope\":\"接触范围内对魂力造物、附着、控制与异常干涉的排斥。\",\"effectFact\":\"角色可使同阶段且能够接触的外来魂力效果失去稳定。\",\"boundary\":\"不能消除纯物理后果、既成伤势、高位规则或超过承载层级的力量。\",\"usageCondition\":\"必须以特定身体部位直接接触效果或其稳定核心。\",\"maintenanceCondition\":\"持续排斥需要保持接触与意识清醒。\",\"costConsequence\":\"自身难以接受增益、治疗和需要魂力维持的主动能力。\",\"recoveryCondition\":\"脱离干涉后自然恢复；既成伤势仍需正常治疗。\",\"growthCondition\":\"随身体承载和对异常结构的理解扩展可排斥范围。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"true_ancestor\",\"name\":\"真祖\",\"cost\":35,\"tag\":\"昼夜\",\"description\":\"拥有夜行异质生命的恢复与支配倾向，同时承担日照和血源相关弱点。\",\"narrative\":{\"scope\":\"夜间行动、血液感知、异质恢复与眷属气息。\",\"effectFact\":\"夜间与阴影环境会强化生命活性，并允许从适配血源中补充状态。\",\"boundary\":\"不能无中生有恢复，也不能免疫神圣、日照、净化或针对魂体的克制。\",\"usageCondition\":\"需要夜色、遮蔽环境或可用且合适的血源。\",\"maintenanceCondition\":\"长期状态需要维持血源与自我意志。\",\"costConsequence\":\"强日照、饥渴与异质冲动会削弱角色并制造社会风险。\",\"recoveryCondition\":\"在安全阴影中休养并取得合适补给。\",\"growthCondition\":\"通过血脉觉醒、夜间修炼和克服本能成长。\",\"worldLimitedUses\":\"受血源与环境限制。\"}},{\"id\":\"sun_child\",\"name\":\"太阳之子\",\"cost\":35,\"tag\":\"昼夜\",\"description\":\"借太阳与炽光维持旺盛状态，在封闭、黑暗和长期无光环境中显著受限。\",\"narrative\":{\"scope\":\"日照下的恢复、火光操控、意志振奋与正面作战。\",\"effectFact\":\"强日照能令角色迅速进入最适合行动的状态。\",\"boundary\":\"不能把普通光源等同于太阳，也不能忽略遮蔽、极夜或封印环境。\",\"usageCondition\":\"需要真实日照或已建立的太阳性力量来源。\",\"maintenanceCondition\":\"持续表现依赖稳定照射与自身承载。\",\"costConsequence\":\"离开光源后会逐渐疲弱，强行维持会透支身体。\",\"recoveryCondition\":\"重新接受日照并完成休息。\",\"growthCondition\":\"通过吸收太阳性传承与适应不同光照环境成长。\",\"worldLimitedUses\":\"受日照条件限制。\"}},{\"id\":\"soul_body\",\"name\":\"魂魄之躯\",\"cost\":35,\"tag\":\"异质形态\",\"description\":\"以魂体稳定代替普通肉身，使常规创伤方式改变，也暴露灵魂层面的致命弱点。\",\"narrative\":{\"scope\":\"魂体显化、穿越狭窄阻碍、精神感知与非肉身生存。\",\"effectFact\":\"角色的存在核心位于魂魄，普通肉身需求和部分物理限制发生改变。\",\"boundary\":\"不能无视具有魂力、规则或灵魂针对性的实体与封锁。\",\"usageCondition\":\"魂体核心必须稳定且未被封印。\",\"maintenanceCondition\":\"需要精神锚点、容器或稳定环境维持存在。\",\"costConsequence\":\"灵魂伤害、驱散与封印会直接威胁存在本身。\",\"recoveryCondition\":\"依靠魂力滋养、精神休眠与修复锚点恢复。\",\"growthCondition\":\"通过增强魂体核心、建立容器和理解灵魂规则成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"absolute_guard\",\"name\":\"绝对守卫\",\"cost\":35,\"tag\":\"守护\",\"description\":\"与指定伙伴建立守护关系，能介入危险并承担后果，但不能取消已经发生的代价。\",\"narrative\":{\"scope\":\"保护已建立羁绊的伙伴、挡击、分担伤势与稳定心神。\",\"effectFact\":\"角色能感知守护对象的重大危险，并在有行动路径时优先介入。\",\"boundary\":\"不能跨越不可达距离、时间断层或既定封锁，也不能让双方都免于后果。\",\"usageCondition\":\"必须先建立真实守护关系，并具备介入方式。\",\"maintenanceCondition\":\"关系、距离和意识联系需要保持。\",\"costConsequence\":\"分担的伤势、精神冲击与敌意会真实转移或共同承担。\",\"recoveryCondition\":\"按实际承受后果接受治疗与休养。\",\"growthCondition\":\"随羁绊深化、守护技艺和空间感知成长。\",\"worldLimitedUses\":\"受可承受后果和介入机会限制。\"}},{\"id\":\"soul_link\",\"name\":\"武魂串联\",\"cost\":50,\"tag\":\"多武魂\",\"description\":\"让两个已觉醒武魂在同一行动中形成协同，而非简单叠加各自全部能力。\",\"narrative\":{\"scope\":\"双武魂切换、联动施展、属性传递与协同魂技。\",\"effectFact\":\"两个兼容武魂可共同参与一次行动，产生符合双方核心主题的联合表现。\",\"boundary\":\"不能绕过武魂槽、魂环归属、冲突属性和操控能力限制。\",\"usageCondition\":\"必须已觉醒两个武魂并完成兼容训练。\",\"maintenanceCondition\":\"需要持续分配专注和魂力循环。\",\"costConsequence\":\"冲突会导致反噬、失控或其中一个武魂暂时沉寂。\",\"recoveryCondition\":\"停止串联、稳定各自核心并修复冲突后恢复。\",\"growthCondition\":\"通过双线修炼、共同魂技和关键境界建立更深协同。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"dual_armor\",\"name\":\"双甲流\",\"cost\":50,\"tag\":\"装备\",\"description\":\"获得驾驭额外斗铠或机甲组件的适配路线，实际装备仍需剧情取得。\",\"narrative\":{\"scope\":\"双套斗铠、机甲组件、额外挂载与装备切换。\",\"effectFact\":\"角色的身体和操控习惯能适配一个有明确来源的额外装备槽位。\",\"boundary\":\"不赠送装备，不取消型号、能源、权限、体型与材料冲突。\",\"usageCondition\":\"必须实际拥有适配装备并完成调试。\",\"maintenanceCondition\":\"需要同时维持能源、神经负荷和组件同步。\",\"costConsequence\":\"过载会造成装备故障、身体反噬和维护压力。\",\"recoveryCondition\":\"卸载冲突组件、维修并休息后恢复。\",\"growthCondition\":\"随制造水平、身体适配与控制能力扩展组合。\",\"worldLimitedUses\":\"受现有装备和能源限制。\"}},{\"id\":\"arsenal_body\",\"name\":\"人形军火库\",\"cost\":50,\"tag\":\"装备\",\"description\":\"擅长携行和快速调度大量已拥有装备，补给、维护与暴露风险构成长线代价。\",\"narrative\":{\"scope\":\"装备收纳、战场调度、快速换装与多用途准备。\",\"effectFact\":\"角色可建立个人军械体系，并快速取用已记录且可携带的装备。\",\"boundary\":\"不能取出未获得物品，也不能忽略体积、权限、弹药与保养要求。\",\"usageCondition\":\"装备必须已入库、状态可用且调度路径未被封锁。\",\"maintenanceCondition\":\"需要持续整理、补给和维护军械。\",\"costConsequence\":\"军械损耗、后勤负担与身份暴露会成为长期问题。\",\"recoveryCondition\":\"通过补给、维修和重新整理恢复完整调度能力。\",\"growthCondition\":\"随空间装备、制造技术和后勤网络成长。\",\"worldLimitedUses\":\"受库存与补给限制。\"}},{\"id\":\"nine_ring_body\",\"name\":\"九戒体质\",\"cost\":60,\"tag\":\"魂神共鸣\",\"description\":\"让魂力与精神互为支点，使一侧受压时仍能保住行动核心。\",\"narrative\":{\"scope\":\"魂力循环、精神稳定、心神魂技与危局支撑。\",\"effectFact\":\"魂力与精神可相互补位，避免单侧动摇立即令全部能力崩溃。\",\"boundary\":\"不能消除总量不足、双侧同时受创或针对核心联系的封锁。\",\"usageCondition\":\"两侧至少一方仍保持稳定且联系未断。\",\"maintenanceCondition\":\"需要维持内在循环与专注。\",\"costConsequence\":\"长期代偿会把一侧创伤传递到另一侧。\",\"recoveryCondition\":\"分别修复魂力循环和精神状态后解除代偿。\",\"growthCondition\":\"随魂环、精神境界与内在协调成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"demon_body\",\"name\":\"魔人之躯\",\"cost\":60,\"tag\":\"体魂共鸣\",\"description\":\"肉身与魂力相互供养，也会让两类创伤沿共鸣通道彼此牵连。\",\"narrative\":{\"scope\":\"身体强化、魂力补位、伤势压制与近战持续。\",\"effectFact\":\"肉身活性与魂力循环可相互支撑，延缓单侧崩溃。\",\"boundary\":\"不能消除伤势或魂力枯竭，只能改变崩溃过程。\",\"usageCondition\":\"共鸣通道完整且至少一侧仍有余力。\",\"maintenanceCondition\":\"需要保持身体与魂力节奏一致。\",\"costConsequence\":\"毒素、伤势或封印可能沿通道扩散到另一侧。\",\"recoveryCondition\":\"必须同时处理身体伤害与魂力紊乱。\",\"growthCondition\":\"通过血脉、体修和魂力循环共同成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"ancient_saint_body\",\"name\":\"荒古圣体 / 战斗民族之躯\",\"cost\":60,\"tag\":\"复合体质\",\"description\":\"拥有越战越能显露潜力的高位体质，同时面对巨量资源需求和专门压制。\",\"narrative\":{\"scope\":\"体魄成长、血脉觉醒、重压适应与正面作战。\",\"effectFact\":\"高压战斗和艰苦修炼能唤醒体质潜能，并形成可持续成长。\",\"boundary\":\"不能跳过资源、境界、伤势和血脉觉醒节点。\",\"usageCondition\":\"必须经受真实训练或威胁并存活吸收经验。\",\"maintenanceCondition\":\"需要长期高质量资源和持续锤炼。\",\"costConsequence\":\"修炼需求巨大，也容易引来觊觎、研究或针对性敌意。\",\"recoveryCondition\":\"依靠充足资源、治疗与稳定修炼恢复。\",\"growthCondition\":\"在关键境界、血脉觉醒和重大生死战后成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"spirit_soul_unity\",\"name\":\"神气合一\",\"cost\":60,\"tag\":\"魂神合一\",\"description\":\"魂力与精神高度统一，复杂操控更自然，但核心一旦崩溃会牵动整体。\",\"narrative\":{\"scope\":\"复杂魂技、精神对抗、魂力微操与多线专注。\",\"effectFact\":\"思维与魂力响应紧密，能把意图迅速转化为精细操控。\",\"boundary\":\"不能超出已理解能力，也不能在意识中断时继续精细运转。\",\"usageCondition\":\"需要意识清晰且魂力循环稳定。\",\"maintenanceCondition\":\"复杂运转需要持续专注。\",\"costConsequence\":\"精神冲击会扰乱魂力，魂力反噬也会伤及心神。\",\"recoveryCondition\":\"同时平复精神与魂力循环。\",\"growthCondition\":\"随精神境界、魂力控制与复杂魂技训练成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"eight_gates\",\"name\":\"八门遁甲\",\"cost\":60,\"tag\":\"禁术\",\"description\":\"逐层解除身体限制，每开一门都必须留下明确负担、恶化路径与战后伤势。\",\"narrative\":{\"scope\":\"身体爆发、速度、力量、反应与禁术体术。\",\"effectFact\":\"角色能按八门顺序逐层释放身体被保护机制压制的潜能。\",\"boundary\":\"不能越过尚未掌握的门，也不能抹去器官、经脉和生命风险。\",\"usageCondition\":\"必须掌握对应门并主动承担该层后果。\",\"maintenanceCondition\":\"每一门只在身体尚能承载且意志维持时持续。\",\"costConsequence\":\"门数越深，肌骨撕裂、器官受损、经脉崩坏和死亡风险越高。\",\"recoveryCondition\":\"关闭禁术后进行长期治疗、复健与修炼。\",\"growthCondition\":\"按八门顺序训练，并在身体境界允许时逐门掌握。\",\"worldLimitedUses\":\"受已掌握门数和当下身体状态限制。\"}},{\"id\":\"valkyrie\",\"name\":\"战场女武神\",\"cost\":60,\"tag\":\"机动\",\"description\":\"在斗铠或机甲支持下形成高机动火控协同，离开装备后只保留训练经验。\",\"narrative\":{\"scope\":\"装备机动、空战、火控协同与战场姿态切换。\",\"effectFact\":\"角色能把斗铠或机甲的移动与武器系统整合成连贯战术。\",\"boundary\":\"不赠送装备，也不能在能源、权限或组件损坏时继续调用对应功能。\",\"usageCondition\":\"必须装备已适配且可工作的斗铠或机甲。\",\"maintenanceCondition\":\"需要能源、火控信息和身体同步。\",\"costConsequence\":\"高机动会放大神经负担、装备磨损与失速风险。\",\"recoveryCondition\":\"着陆、维修、补能并缓解身体负荷。\",\"growthCondition\":\"通过更高代装备、驾驶训练和真实战场经验成长。\",\"worldLimitedUses\":\"受装备和能源限制。\"}},{\"id\":\"dragon_heart\",\"name\":\"龙心\",\"cost\":60,\"tag\":\"龙类共鸣\",\"description\":\"与龙类血脉、素材和传承高度共鸣，也更容易被龙威、龙魂与天敌锁定。\",\"narrative\":{\"scope\":\"龙类素材适配、血脉感知、龙威承载与传承理解。\",\"effectFact\":\"角色能更自然地接纳并理解已获得的龙类力量。\",\"boundary\":\"不能凭共鸣占有未获得传承，也不能压倒血脉和境界远高于自己的龙种。\",\"usageCondition\":\"需要接触真实龙类力量或已融合的龙类素材。\",\"maintenanceCondition\":\"必须维持自身意志与血脉平衡。\",\"costConsequence\":\"龙类意志、血脉冲突和猎龙者会更容易注意到角色。\",\"recoveryCondition\":\"隔离冲突来源、稳定血脉并处理精神烙印。\",\"growthCondition\":\"通过取得龙类传承、完成融合与守住自我成长。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"nascent_soul\",\"name\":\"元婴\",\"cost\":60,\"tag\":\"分身\",\"description\":\"形成近似本我的魂体分身，可分担认知与行动，却与本体共享深层风险。\",\"narrative\":{\"scope\":\"侦察、修炼辅助、精神交流与有限独立行动。\",\"effectFact\":\"元婴可离体显化并保有角色的部分知识、意志和能力主题。\",\"boundary\":\"不能成为无代价的第二角色，也不能复制全部装备、资源和独立成长成果。\",\"usageCondition\":\"本体意识稳定且存在安全的魂体分离路径。\",\"maintenanceCondition\":\"离体期间需要魂力联系或稳定锚点。\",\"costConsequence\":\"元婴受创会反馈本体，距离和分心也会降低双方判断。\",\"recoveryCondition\":\"召回元婴并通过静修修复魂体。\",\"growthCondition\":\"随精神境界、魂体稳定和自我认知成长。\",\"worldLimitedUses\":\"同一时间只能维持一个主要元婴显化。\"}},{\"id\":\"soul_heart\",\"name\":\"魂力心脏 / 柱间细胞\",\"cost\":60,\"tag\":\"魂力核心\",\"description\":\"拥有强韧的第二魂力循环与生命性核心，过度抽空会转化为严重反噬。\",\"narrative\":{\"scope\":\"魂力循环、生命恢复、持续施展与核心供能。\",\"effectFact\":\"额外核心能在主循环动摇时维持生命与魂力运转。\",\"boundary\":\"不能提供无限魂力，也不能在核心损伤、封印或资源枯竭时继续供能。\",\"usageCondition\":\"核心完整且生命状态允许调动。\",\"maintenanceCondition\":\"长期运转需要营养、休息和稳定魂力环境。\",\"costConsequence\":\"抽空核心会造成器官衰竭、生命流失或不可忽视的虚弱。\",\"recoveryCondition\":\"停止调用并通过治疗、休养和生命性资源补充。\",\"growthCondition\":\"随生命境界、核心成熟和循环控制成长。\",\"worldLimitedUses\":\"受核心当前储备限制。\"}},{\"id\":\"twelve_trials\",\"name\":\"十二试炼\",\"cost\":60,\"tag\":\"有限命数\",\"description\":\"拥有十二次替代致命劫数的命数，每次消耗都不可自行补回并留下变化。\",\"narrative\":{\"scope\":\"本应导致角色死亡或存在彻底终结的致命劫数。\",\"effectFact\":\"当一次真实致命结局成立时，可消耗一试炼使命数让角色以符合场景的方式存续。\",\"boundary\":\"不能让事件从未发生，不能保护他人，也不能免除伤势、失去资源或剧情后果。\",\"usageCondition\":\"必须已经确认致命结局，且仍有未消耗的试炼命数。\",\"maintenanceCondition\":\"剩余命数作为长期事实记录。\",\"costConsequence\":\"每次消耗永久减少一试炼，并留下伤痕、变化、债务或新的威胁。\",\"recoveryCondition\":\"身体与心神按实际后果恢复；已消耗试炼不自行补回。\",\"growthCondition\":\"只有明确世界级剧情或设定许可才可能改变总命数。\",\"worldLimitedUses\":\"总计十二次，逐次永久消耗。\"}},{\"id\":\"dragon_slayer\",\"name\":\"屠龙者\",\"cost\":60,\"tag\":\"种族克制\",\"description\":\"掌握针对龙类生理、习性与威压的系统经验，但不形成无条件胜负裁定。\",\"narrative\":{\"scope\":\"识别龙类弱点、抵抗龙威、准备猎龙工具与制定战术。\",\"effectFact\":\"面对已理解的龙类目标时，角色更容易发现可利用的结构和行为征兆。\",\"boundary\":\"不能凭称号跨越境界、未知血脉、数量和环境差距。\",\"usageCondition\":\"需要获得目标情报、观察事实或相关猎龙经验。\",\"maintenanceCondition\":\"战术效果依赖持续观察和准备。\",\"costConsequence\":\"错误判断会激怒龙类并暴露自身，屠龙身份也会招致敌意。\",\"recoveryCondition\":\"脱离战斗、更新情报并补充专用资源。\",\"growthCondition\":\"通过研究不同龙种和真实交战积累新对策。\",\"worldLimitedUses\":\"无固定次数限制。\"}},{\"id\":\"six_eyes\",\"name\":\"苍蓝之眸 / 六眼\",\"cost\":60,\"tag\":\"洞察\",\"description\":\"精密读取魂力结构并进行细致操控，信息过载与专注中断是核心弱点。\",\"narrative\":{\"scope\":\"魂力观察、结构解析、精细操控和行动预判。\",\"effectFact\":\"角色能看见常人难以区分的魂力细节，并据此提高操控精度。\",\"boundary\":\"观察不等于理解，不能看穿被更高规则隐藏的信息或尚无征兆的未来。\",\"usageCondition\":\"需要视线、感知通道和足够分析时间。\",\"maintenanceCondition\":\"持续使用需要高度专注并控制输入量。\",\"costConsequence\":\"复杂场景会造成头痛、感官过载、判断迟滞或暂时失明。\",\"recoveryCondition\":\"关闭感知、远离刺激并休息恢复。\",\"growthCondition\":\"通过接触更多结构、训练筛选信息和提升精神境界成长。\",\"worldLimitedUses\":\"受精神承载和信息环境限制。\"},\"checkRules\":[{\"id\":\"six-eyes-perception\",\"name\":\"六眼精密观察\",\"type\":\"passive\",\"applicableAttributes\":[\"comprehension\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":1,\"trigger\":\"通过有效感知通道观察、追踪魂力细节或识破已有征兆的幻象时\",\"scope\":\"相关悟性检定\",\"successOutcome\":\"按最终检定结果取得结构和异常线索\",\"failureOutcome\":\"无法筛出有效信息，并可能承受叙事中已建立的信息过载\",\"boundary\":\"观察不等于理解，也不能发现没有任何征兆或被更高规则完全隔绝的信息\"}]},{\"id\":\"king_treasure\",\"name\":\"王之宝库\",\"cost\":60,\"tag\":\"剧情权限\",\"description\":\"拥有广阔收藏空间与调取权限，但只能调用已建立来源、仍在库中且适合当前问题的奇物。\",\"narrative\":{\"scope\":\"收藏、储存、检索与投放已获得的器物。\",\"effectFact\":\"角色可从宝库中迅速找到与当前需求相关的已登记藏品。\",\"boundary\":\"不能临时创造未获得物品，唯一物品取出后也不能同时存在多份。\",\"usageCondition\":\"宝库通道可用、物品已入库且角色拥有调取权限。\",\"maintenanceCondition\":\"需要持续整理目录并保护空间锚点。\",\"costConsequence\":\"强行开启可能暴露宝库坐标，珍贵藏品也会引来觊觎。\",\"recoveryCondition\":\"关闭通道、修复锚点并重新整理库存。\",\"growthCondition\":\"随真实收藏、空间理解和权限提升成长。\",\"worldLimitedUses\":\"受实际库存限制。\"}},{\"id\":\"projection\",\"name\":\"投影\",\"cost\":60,\"tag\":\"临时复制\",\"description\":\"临时再现见过且理解的武魂、武器或魂导结构，稳定性取决于知识和维持条件。\",\"narrative\":{\"scope\":\"已观察结构的临时复现、解析与短时使用。\",\"effectFact\":\"角色能以魂力构造对已理解对象的叙事性投影。\",\"boundary\":\"不能复制未知内部、唯一权柄、真实生命、独立意志或未理解的高位规则。\",\"usageCondition\":\"必须有清晰观察、结构知识和足够魂力。\",\"maintenanceCondition\":\"投影需要持续专注与魂力供应。\",\"costConsequence\":\"复杂投影会造成精神负荷，结构错误可能崩解或反噬。\",\"recoveryCondition\":\"解除投影并通过休息恢复专注与魂力。\",\"growthCondition\":\"通过研究、拆解和实践提高可复现结构的复杂度。\",\"worldLimitedUses\":\"同一时间的稳定投影数量受专注限制。\"},\"checkRules\":[{\"id\":\"projection-analysis\",\"name\":\"复杂结构解析\",\"type\":\"dc\",\"primaryAttribute\":\"comprehension\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"尝试解析可观察但结构复杂的投影目标时\",\"scope\":\"确认结构能否被可靠理解和临时复现\",\"successOutcome\":\"建立可供后续投影使用的结构理解\",\"failureOutcome\":\"本次观察不足，必须取得新信息或经过新的研究场景后再尝试\",\"boundary\":\"不能解析未知内部、唯一权柄、真实生命或完全没有观察依据的目标\",\"preparations\":[{\"id\":\"projection-research\",\"attributes\":[\"knowledge\"],\"baseDc\":12,\"advantageSteps\":1,\"dcModifier\":0,\"successOutcome\":\"此前研究相关原理成功，使最终悟性检定获得优势1级\"}]}]},{\"id\":\"supreme_bone\",\"name\":\"至尊骨 / 至尊魂骨\",\"cost\":60,\"tag\":\"魂骨\",\"description\":\"开局拥有可供魂骨表初始化的高位外附魂骨，其能力会成长，也会引来觊觎。\",\"narrative\":{\"scope\":\"外附魂骨显化、核心能力、身体融合与后续进化。\",\"effectFact\":\"角色已融合一块与自身根基相连的至尊魂骨，并拥有尚待成长的专属能力主题。\",\"boundary\":\"不能在开局直接拥有全部高位表现，也不能忽略融合排斥和剥离风险。\",\"usageCondition\":\"魂骨状态稳定且相应身体部位可用。\",\"maintenanceCondition\":\"需要与身体、武魂和魂力循环持续磨合。\",\"costConsequence\":\"会引来夺骨、研究和追踪，强行剥离可能伤及根基。\",\"recoveryCondition\":\"通过融合调养、魂骨修复与身体治疗恢复。\",\"growthCondition\":\"随关键境界、融合深化和专属剧情逐步觉醒。\",\"worldLimitedUses\":\"无固定次数限制。\"},\"assetTemplates\":[{\"id\":\"supreme-soul-bone\",\"assetType\":\"soulBone\",\"name\":\"至尊魂骨\",\"kind\":\"高位外附魂骨\",\"bodySlot\":\"由角色设定与正文确定\",\"sourceFact\":\"开局特性「至尊骨 / 至尊魂骨」附带并已与角色根基建立融合。\",\"fusionFact\":\"建立为已融合但尚未完全觉醒的魂骨资源。\",\"effectFact\":\"核心能力主题应结合玩家武魂与角色概念生成，不预支未来阶段表现。\",\"restrictionConflict\":\"存在融合负担、夺骨威胁与剥离后果。\",\"growthCondition\":\"随关键境界、融合深化和专属剧情解锁。\"}]},{\"id\":\"umbrask\",\"name\":\"安布拉斯克\",\"cost\":60,\"tag\":\"因果魔剑\",\"description\":\"将玩家第一武魂融合为神级因果魔剑「安布拉斯克」，以三角时钟统合魂环三色模式，并在武魂真身中解锁啖因果。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"玩家第一武魂的魔剑化、火暗精神与高位属性、魂环三色复合、武魂真身以及短时间内的时空间和因果干涉。\",\"effectFact\":\"第一武魂以玩家原稿为基础融合重构为神级器武魂「安布拉斯克」。每枚实际取得的魂环都形成攻击（红色）、防御（黄色）、回复（绿色）三种复合魂技表现；常态下所有魂环共享一个当前颜色。\",\"boundary\":\"常态同一时刻只能启用一种颜色，切换会替换原模式而不能叠加。啖因果只允许尝试原本受短时因果与时空间条件阻断的行动，不自动保证成功、击败目标或赢得整场战斗；每天一次保护只处理已经成立的致命伤，不解除封印、放逐、控制、捕获、能力损失或其他非伤害终结。\",\"usageCondition\":\"三角时钟在安布拉斯克及对应魂环可用时生效。角色实际解锁并使用武魂真身后，才能进入啖因果状态并调用三色齐开、短时因果与时空间操控。\",\"maintenanceCondition\":\"常态必须持续记录全局当前颜色；啖因果需要维持武魂真身。进入啖因果前的单色状态须保留，退出后恢复该颜色。\",\"costConsequence\":\"颜色切换会结束上一模式；因果干涉不能制造无来源的资源或抹去已经发生的代价。每日免死触发后记为今日已用，致命伤带来的伤势、资源损失、失败处境与剧情后果仍然保留。\",\"recoveryCondition\":\"退出啖因果后恢复进入前的单色模式；伤势、魂力与精神负担按实际后果恢复。每日免死次数在世界内日期跨入下一个自然日时重置。\",\"growthCondition\":\"每次实际取得新魂环时，为该魂环建立红、黄、绿三种复合表现；以角色实际取得武魂真身为节点解锁啖因果，此后因果操控范围随境界、理解与真实使用经验成长。\",\"worldLimitedUses\":\"三角时钟切换与啖因果本身无固定次数；仅在啖因果状态内，每个世界内自然日可令一次已经成立的致命伤确定不导致角色死亡。\"},\"soulTemplates\":[{\"id\":\"umbrask-first-soul\",\"mode\":\"merge-first\",\"slot\":1,\"name\":\"安布拉斯克\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"60SP特性「安布拉斯克」与玩家第一武魂融合\",\"category\":\"器武魂\",\"attributes\":\"火、暗、精神、邪恶、毁灭、时间、空间与因果\",\"ringPattern\":{\"name\":\"三角时钟\",\"colors\":[{\"id\":\"red\",\"name\":\"攻击（红色）\",\"effectRole\":\"攻击\"},{\"id\":\"yellow\",\"name\":\"防御（黄色）\",\"effectRole\":\"防御\"},{\"id\":\"green\",\"name\":\"回复（绿色）\",\"effectRole\":\"回复\"}],\"normalModePolicy\":\"每枚实际取得的魂环均包含红、黄、绿三种复合魂技表现；常态下所有魂环共享一个全局颜色，同一时刻只能启用一种，切换时替换原模式。\",\"ringRecordPolicy\":\"每枚实际取得的魂环只建立一条复合能力记录，在同一记录内分别写明红、黄、绿三种子效果，不得为三色重复占用同一魂环序号。\"},\"trueBody\":{\"name\":\"啖因果\",\"unlockCondition\":\"角色实际解锁并使用安布拉斯克的武魂真身后生效，不在开局预赠武魂真身。\",\"clockOverride\":\"啖因果期间临时同时启用攻击、防御、回复三类效果；退出后恢复进入前的全局单色。\",\"causalAuthority\":\"可操控短时间内的因果与时空间并吞噬对自身不利的因果；越接近生命垂危，叙事影响越强。\",\"actionPermission\":\"速度与力量获得高位强化，并可尝试原本因短时因果条件而不可能执行的动作，但结果仍由场景事实裁定。\",\"reversalBoundary\":\"可把通向死亡或重伤的负面因果转化为逆转机会，不直接宣告击败目标或整场胜利。\",\"dailySurvival\":{\"usesPerWorldDay\":1,\"trigger\":\"啖因果状态内，一次已经成立且将导致角色死亡的致命伤。\",\"effect\":\"无论致命伤来源为何，本次伤害确定不导致角色死亡。\",\"reset\":\"跨入下一个世界内自然日时恢复为今日可用。\",\"retainedConsequences\":\"伤势、资源损失、失败处境与剧情后果继续保留。\",\"exclusions\":\"不自动解除封印、放逐、控制、捕获、能力损失或其他非伤害终结。\"}},\"coreAbility\":\"三角时钟令每枚魂环形成攻击、防御、回复三种复合魂技表现，常态全局单色；武魂真身解锁啖因果后临时三色齐开，并获得短时间因果与时空间操控、危局强化和每日一次致命伤不致死。\",\"boundary\":\"固定核心名称保留为安布拉斯克，玩家第一武魂名称转为旧名、变体名或形态名。未来魂环和武魂真身必须实际取得；因果行动的结果仍由场景事实裁定，每日免死不抹去伤势与其他后果。\"}]},{\"id\":\"reincarnation_again\",\"name\":\"再次踏上轮回\",\"cost\":100,\"tag\":\"极端模板\",\"description\":\"将玩家第一武魂融合为火种神赐路线，并沿十二火种与永劫燔世逐步成长。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"玩家第一武魂的火种化、神赐成长、魂环扩展与永劫领域。\",\"effectFact\":\"第一武魂保留玩家核心设定并获得火种神赐来源，可沿十二火种路线成长。\",\"boundary\":\"不直接改写为完成态，不跳过魂环、火种收集、境界和领域代价。\",\"usageCondition\":\"以重构后的第一武魂为载体，并完成当前阶段所需火种与觉醒。\",\"maintenanceCondition\":\"需要维持火种稳定并防止不同火焰互相吞噬。\",\"costConsequence\":\"火种冲突、焚身风险与永劫领域的因果负担会持续存在。\",\"recoveryCondition\":\"通过封存失控火种、调息和适配火焰资源恢复。\",\"growthCondition\":\"按十二火种、魂环序号、关键境界与永劫燔世领域逐步解锁。\",\"worldLimitedUses\":\"火种总路线以十二种核心火种为上限。\"},\"soulTemplates\":[{\"id\":\"reincarnation-first-soul\",\"mode\":\"merge-first\",\"slot\":1,\"name\":\"沿用玩家第一武魂名称\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"火种神赐与再次轮回\",\"category\":\"以玩家第一武魂为基础的神赐变异\",\"coreAbility\":\"融合玩家外观、战斗主题与限制，并建立容纳十二火种的成长结构。\",\"boundary\":\"当前只获得起始火种表现，未来火种、魂环与领域必须经剧情取得。\"}],\"longTermLine\":{\"type\":\"growth\",\"name\":\"十二火种与永劫燔世成长线\",\"objective\":\"寻找、理解并稳定十二种核心火种，使第一武魂逐步完成火种神赐路线。\",\"stages\":[\"建立第一枚本命火种\",\"以魂环序号承载不同火种主题\",\"解决火种冲突与焚身风险\",\"在关键境界形成永劫燔世领域\"],\"boundary\":\"每阶段都需正文确认资源、试炼与代价，不能预写完成。\"}},{\"id\":\"ring_elder\",\"name\":\"戒指里的老爷爷 / 萧火火\",\"cost\":100,\"tag\":\"主角模板\",\"description\":\"附带天火玄躯、帝火、炎帝神识三套武魂模板及帝火收集与炎帝复苏任务线。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"三武魂重构、异火收集、炼体炼药与炎帝神识传承。\",\"effectFact\":\"角色获得三套固定核心武魂模板，并与沉睡的炎帝神识建立长期联系。\",\"boundary\":\"三武魂不得超出武魂总边界，炎帝不能无条件代打，帝火也不能直接拥有全部火焰。\",\"usageCondition\":\"对应武魂完成重构并满足材料、火种、炼体或神识苏醒条件。\",\"maintenanceCondition\":\"需要维护三武魂平衡、神识稳定和帝火容器。\",\"costConsequence\":\"吞噬失败、身体焚损、神识冲突与炎帝旧敌会形成真实威胁。\",\"recoveryCondition\":\"通过炼体、丹药、温养神识与封存失控火焰恢复。\",\"growthCondition\":\"收集帝火、修复炎帝神识、提升炼药炼体并推进三武魂协同。\",\"worldLimitedUses\":\"炎帝危机介入受神识状态和剧情条件限制。\"},\"soulTemplates\":[{\"id\":\"heavenly-fire-body\",\"mode\":\"fixed\",\"slot\":1,\"name\":\"天火玄躯\",\"quality\":\"waste\",\"qualityName\":\"废武魂\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"炎帝传承的本体武魂\",\"category\":\"本体武魂\",\"coreAbility\":\"以全身为武魂，承载火焰、生命与炼体路线，适合吸收帝火而不被轻易焚毁。\",\"boundary\":\"强火仍会伤身，承载必须随体魄和炼体进度成长。\"},{\"id\":\"emperor-flame\",\"mode\":\"fixed\",\"slot\":2,\"name\":\"帝火\",\"quality\":\"waste\",\"qualityName\":\"废武魂\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"处于幼生状态的帝火本源\",\"category\":\"元素武魂\",\"coreAbility\":\"以极致火焰为核心，通过收集、理解与融合不同帝火获得新形态。\",\"boundary\":\"开局只是火种，未收集的火焰不能提前调用。\"},{\"id\":\"yan-emperor-consciousness\",\"mode\":\"fixed\",\"slot\":3,\"name\":\"炎帝神识\",\"quality\":\"waste\",\"qualityName\":\"废武魂\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"寄宿于戒指与角色精神中的残存神识\",\"category\":\"精神武魂\",\"coreAbility\":\"提供炼药、炼体、火焰知识与阶段性指引，可在极端危机中尝试有限介入。\",\"boundary\":\"炎帝神识不按普通魂环路线成长，苏醒程度、记忆缺失和介入代价必须记录。\"}],\"longTermLine\":{\"type\":\"mission\",\"name\":\"帝火收集与炎帝复苏任务线\",\"objective\":\"寻找散落帝火与修复神识的材料，在保持自我意志的前提下复苏炎帝。\",\"stages\":[\"稳定天火玄躯与初生帝火\",\"取得第一种外部帝火并完成安全融合\",\"寻找炎帝记忆与神识修复材料\",\"解决炎帝旧敌与传承债务\",\"决定炎帝复苏后的关系与去向\"],\"boundary\":\"任务奖励只在对应事件完成后成为事实，炎帝不能替代玩家完成主线。\"},\"checkRules\":[{\"id\":\"yan-emperor-guidance\",\"name\":\"炎帝知识指导\",\"type\":\"passive\",\"applicableAttributes\":[\"knowledge\",\"craft\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":1,\"trigger\":\"炎帝神识清醒、愿意指导，且检定属于正文已建立的炼药或炼体知识范围时\",\"scope\":\"相关学识或百工检定\",\"successOutcome\":\"玩家在指导下自行完成判断或操作\",\"failureOutcome\":\"指导不足以解决当前问题，需补充材料、知识或实践\",\"boundary\":\"炎帝不能代替玩家行动，也不能对未恢复的记忆与未知工艺提供答案\"}]},{\"id\":\"thousand_forged_blade\",\"name\":\"千冶成刃\",\"cost\":100,\"tag\":\"极端模板\",\"description\":\"附带植物生命与极致之木、火焰血炉两套可配置武魂模板，以及锻造协同成长线。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"双武魂、生命锻造、血炉火焰、兵刃制造与协同战斗。\",\"effectFact\":\"角色获得一套植物生命武魂与一套火焰血炉武魂，两者可共同参与锻造和战斗。\",\"boundary\":\"不能无材料造物，不能把百工知识等同于现成工艺，也不能忽略血炉的生命代价。\",\"usageCondition\":\"必须具备可用材料、火源、工具与对应武魂状态。\",\"maintenanceCondition\":\"需要维持木火平衡、锻造节奏和双武魂兼容。\",\"costConsequence\":\"血炉可能灼伤生命，过度锻造会损耗武魂根基并引来兵刃因果。\",\"recoveryCondition\":\"停止血炉、以生命武魂调养并补足材料与体力。\",\"growthCondition\":\"通过学习百工、锻造代表作、深化血炉并建立双武魂领域成长。\",\"worldLimitedUses\":\"受材料、火源和生命承载限制。\"},\"configSchema\":{\"title\":\"千冶成刃模板配置\",\"fields\":[{\"key\":\"plantSoulName\",\"label\":\"植物武魂名称\",\"default\":\"千冶生刃藤\",\"required\":true},{\"key\":\"fireSoulName\",\"label\":\"火焰武魂名称\",\"default\":\"血炉煞火\",\"required\":true},{\"key\":\"plantTheme\",\"label\":\"植物/生命能力主题\",\"type\":\"textarea\",\"default\":\"极致之木、生命修复、缠绕控制与锻造协助\",\"required\":true},{\"key\":\"fireTheme\",\"label\":\"火焰/血炉能力主题\",\"type\":\"textarea\",\"default\":\"血炉锻火、兵刃显化与高风险爆发\",\"required\":true},{\"key\":\"craftBoundary\",\"label\":\"百工与锻造边界\",\"type\":\"textarea\",\"default\":\"必须有材料、工具、时间和已经掌握的工艺；未知造物需先研究。\",\"required\":true}]},\"soulTemplates\":[{\"id\":\"thousand-forged-plant\",\"mode\":\"configurable\",\"slot\":1,\"name\":\"{{plantSoulName}}\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"千冶成刃的植物生命根基\",\"category\":\"植物武魂\",\"attributes\":\"木、生命，可朝极致之木成长\",\"coreAbility\":\"{{plantTheme}}\",\"boundary\":\"不得取代真实材料和治疗过程。\"},{\"id\":\"thousand-forged-fire\",\"mode\":\"configurable\",\"slot\":2,\"name\":\"{{fireSoulName}}\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"千冶成刃的血炉锻火根基\",\"category\":\"元素武魂\",\"attributes\":\"火焰与血炉\",\"coreAbility\":\"{{fireTheme}}\",\"boundary\":\"{{craftBoundary}}\"}],\"longTermLine\":{\"type\":\"growth\",\"name\":\"千冶锻造、血炉与双武魂协同线\",\"objective\":\"以代表性造物推进百工理解，并令植物生命与血炉火焰形成稳定协同。\",\"stages\":[\"建立双武魂兼容与基础锻炉\",\"完成第一件承载双方主题的代表作\",\"处理血炉反噬并建立生命回补\",\"形成双武魂协同锻造与战斗领域\"],\"boundary\":\"每件高阶造物均需材料、工艺、时间与失败风险。\"},\"checkRules\":[{\"id\":\"thousand-forged-mastered-craft\",\"name\":\"已掌握工艺\",\"type\":\"passive\",\"applicableAttributes\":[\"craft\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":1,\"trigger\":\"使用已有材料、工具和时间执行已经掌握的工艺时\",\"scope\":\"相关百工检定\",\"successOutcome\":\"按最终检定结果完成造物或推进工序\",\"failureOutcome\":\"产生符合工艺过程的材料、时间或成品后果\",\"boundary\":\"不适用于未知工艺，也不取消材料、工具、时间和失败风险\"},{\"id\":\"thousand-forged-research\",\"name\":\"未知工艺研究\",\"type\":\"dc\",\"primaryAttribute\":\"knowledge\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"准备制作尚未掌握原理或流程的造物时\",\"scope\":\"建立该工艺的知识基础\",\"successOutcome\":\"取得可用于后续百工实践的研究结论\",\"failureOutcome\":\"需要新资料、样品、导师或研究场景后再尝试\",\"boundary\":\"研究成功不等于成品已经制造完成\"}]},{\"id\":\"traveler\",\"name\":\"穿越者\",\"cost\":100,\"tag\":\"剧情特权\",\"description\":\"建立来自异世界的知识、记忆和携带内容权限；这是常驻剧情事实，不伪造正式任务。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"前世记忆、异界知识、文化比较与有限携带内容。\",\"effectFact\":\"角色确认来自另一世界，并保有配置范围内的知识和记忆。\",\"boundary\":\"知识不等于实践能力，不能凭记忆制造缺少材料、工具、能源或验证的成果。\",\"usageCondition\":\"遇到与记忆范围相关的事实并有时间回忆、验证。\",\"maintenanceCondition\":\"记忆会受当前身体、精神状态和世界差异影响。\",\"costConsequence\":\"认知错位、身份暴露、错误类比和禁忌触发会形成剧情后果。\",\"recoveryCondition\":\"通过休息、记录、验证与适应当前世界恢复清晰度。\",\"growthCondition\":\"在实际接触和验证后，把异界知识转化为本世界可用经验。\",\"worldLimitedUses\":\"无固定次数限制。\"},\"configSchema\":{\"title\":\"穿越者来源配置\",\"fields\":[{\"key\":\"originWorld\",\"label\":\"来源世界\",\"required\":true},{\"key\":\"knowledgeScope\",\"label\":\"知识范围\",\"type\":\"textarea\",\"required\":true},{\"key\":\"memoryBoundary\",\"label\":\"记忆边界\",\"type\":\"textarea\",\"required\":true},{\"key\":\"carriedContent\",\"label\":\"携带内容\",\"type\":\"textarea\",\"default\":\"无实体携带物\"},{\"key\":\"taboo\",\"label\":\"禁忌与风险\",\"type\":\"textarea\",\"required\":true}]},\"longTermLine\":{\"type\":\"privilege\",\"name\":\"异界来客常驻剧情权限\",\"objective\":\"允许正文在相关场景调用已配置的异界记忆、知识和文化视角。\",\"stages\":[\"只在知识范围内提供线索\",\"通过本世界事实验证后形成可用方法\",\"身份暴露与禁忌必须产生相应关系变化\"],\"boundary\":\"这不是正式任务，不生成固定奖励或强制完成节点。\"},\"checkRules\":[{\"id\":\"traveler-knowledge\",\"name\":\"异界知识回忆\",\"type\":\"passive\",\"applicableAttributes\":[\"knowledge\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":1,\"trigger\":\"检定内容明确位于{{knowledgeScope}}之内，且角色有时间回忆和验证时\",\"scope\":\"相关学识检定\",\"successOutcome\":\"按最终检定结果取得异界知识线索，并结合本世界事实验证\",\"failureOutcome\":\"因世界差异、记忆边界或信息不足无法可靠应用\",\"boundary\":\"知识不等于实践能力；{{memoryBoundary}}\"}]},{\"id\":\"god_trial\",\"name\":\"神考\",\"cost\":100,\"tag\":\"神选\",\"description\":\"融合强化玩家第一武魂，并建立可配置神明、神系与阶段神考任务线。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"玩家第一武魂的神系表现、阶段神考、护道与奖励方向。\",\"effectFact\":\"角色被配置神明或神系选中，第一武魂成为神考力量的主要承载者。\",\"boundary\":\"开局不拥有未来奖励、神位或全部权限，神明也不能替代角色完成试炼。\",\"usageCondition\":\"按神谕触发具体阶段，并在正文中建立可验证目标。\",\"maintenanceCondition\":\"需要维持与神系的联系并遵守配置边界。\",\"costConsequence\":\"失败会产生配置中的后果，神系义务与敌对关系也会持续。\",\"recoveryCondition\":\"按试炼规则完成补救、忏悔、重试或等待下一阶段。\",\"growthCondition\":\"完成阶段神考、跨越关键境界并兑现对应奖励方向后成长。\",\"worldLimitedUses\":\"神考阶段与重试机会由具体神系规则决定。\"},\"configSchema\":{\"title\":\"神考与神系配置\",\"fields\":[{\"key\":\"godName\",\"label\":\"神明名称\",\"required\":true},{\"key\":\"godDomain\",\"label\":\"神系与权柄\",\"type\":\"textarea\",\"required\":true},{\"key\":\"soulManifestation\",\"label\":\"第一武魂神系表现\",\"type\":\"textarea\",\"required\":true},{\"key\":\"rewardDirection\",\"label\":\"奖励方向\",\"type\":\"textarea\",\"required\":true},{\"key\":\"failureBoundary\",\"label\":\"失败与重试边界\",\"type\":\"textarea\",\"required\":true},{\"key\":\"growthBoundary\",\"label\":\"成长边界\",\"type\":\"textarea\",\"default\":\"奖励只在对应阶段完成后兑现，不预支神位与未来能力。\",\"required\":true}]},\"soulTemplates\":[{\"id\":\"god-trial-first-soul\",\"mode\":\"merge-first\",\"slot\":1,\"name\":\"沿用玩家第一武魂名称\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"{{godName}}所属{{godDomain}}的神考印记\",\"category\":\"以玩家第一武魂为基础的神系强化\",\"coreAbility\":\"{{soulManifestation}}\",\"boundary\":\"{{growthBoundary}}\"}],\"longTermLine\":{\"type\":\"mission\",\"name\":\"{{godName}}阶段神考任务线\",\"objective\":\"围绕{{godDomain}}建立由低到高的阶段试炼，并使第一武魂逐步承载神系表现。\",\"stages\":[\"确认神谕、权柄与第一阶段目标\",\"在关键境界接受新的阶段试炼\",\"只在完成试炼后兑现{{rewardDirection}}\",\"失败按{{failureBoundary}}处理并保留长期后果\"],\"boundary\":\"{{growthBoundary}}\"}},{\"id\":\"system\",\"name\":\"系统\",\"cost\":100,\"tag\":\"剧情特权\",\"description\":\"建立可配置的系统界面、任务方向和奖励边界；只有触发与领取后的内容才成为事实。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"系统提示、任务发布、进度记录、资源称谓与受限奖励。\",\"effectFact\":\"角色拥有一个按配置方向运作的常驻系统接口。\",\"boundary\":\"系统不能伪造已完成事件，不能发放越过奖励边界的内容，也不能替角色行动。\",\"usageCondition\":\"满足任务触发事实或主动查看系统界面。\",\"maintenanceCondition\":\"任务状态必须与正文和数据库事实一致。\",\"costConsequence\":\"失败、拒绝、逾期或违规会按任务边界产生后果。\",\"recoveryCondition\":\"按系统规则完成补救、等待刷新或解除惩罚条件。\",\"growthCondition\":\"通过真实完成任务、解锁系统模块和建立新权限成长。\",\"worldLimitedUses\":\"由具体任务、资源与奖励库存限制。\"},\"configSchema\":{\"title\":\"系统规则配置\",\"fields\":[{\"key\":\"systemName\",\"label\":\"系统名称\",\"default\":\"成长辅助系统\",\"required\":true},{\"key\":\"systemDirection\",\"label\":\"系统方向\",\"type\":\"textarea\",\"required\":true},{\"key\":\"resourceName\",\"label\":\"资源称谓\",\"default\":\"系统点数\",\"required\":true},{\"key\":\"taskBoundary\",\"label\":\"任务边界\",\"type\":\"textarea\",\"required\":true},{\"key\":\"rewardBoundary\",\"label\":\"奖励边界\",\"type\":\"textarea\",\"required\":true}]},\"longTermLine\":{\"type\":\"mission\",\"name\":\"{{systemName}}任务线\",\"objective\":\"围绕{{systemDirection}}发布与正文事实一致的阶段任务，并记录{{resourceName}}的真实取得与使用。\",\"stages\":[\"根据开局事实生成首个可执行任务\",\"只在完成条件被正文确认后结算\",\"奖励必须满足{{rewardBoundary}}\",\"任务失败或拒绝按{{taskBoundary}}处理\"],\"boundary\":\"不得把系统提示当作已经发生的事实，也不得生成超出配置边界的奖励。\"}},{\"id\":\"phoenix_god\",\"name\":\"凤天传承\",\"cost\":150,\"tag\":\"双神传承\",\"description\":\"融合强化玩家第一武魂为超神级「十二翼凤天使」；40级四翼开局，可自凝最多十二枚魂环，并沿80级八翼、100级自动成神、120级十二翼继续无瓶颈成长。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"玩家第一武魂的凤凰神与天使神双重传承、四翼至十二翼形态、自凝魂环、真凰宝术、圣剑圣凯、自动成神与无限战斗复起。\",\"effectFact\":\"第一武魂融合重构为超神级「十二翼凤天使」，开局魂力等级固定为40级并处于四翼形态；第一武魂以模板为核心重构，玩家第二武魂原稿保持独立。\",\"boundary\":\"开局不预建魂环；自凝魂环只免去猎杀魂兽的过程，仍须在实际达到对应成长节点后逐枚凝聚，最多十二枚。阶段能力不能自动决定战斗胜负；封印、放逐、拘束或失去行动权不属于死亡，不能用战斗复起自动解除。\",\"usageCondition\":\"双神传承与第一武魂完成融合后常驻生效；形态、圣剑、圣凯、真凰宝术和完全武魂真身按等级节点自动解锁。\",\"maintenanceCondition\":\"传承不要求神考、神位继承或额外突破仪式；只要角色继续正常修炼，便可越过100级并沿凤天路线持续成长。\",\"costConsequence\":\"自凝魂环仍需要完成对应等级成长；未死亡的封印、控制、放逐和拘束后果继续存在。十二翼前的战斗复起不会附带十二翼阶段的复起强化。\",\"recoveryCondition\":\"毒、诅咒与疾病被传承被动排除；战斗死亡触发无次数上限的复起，其他魂力、精神、伤势与非死亡状态按已经建立的恢复条件处理。\",\"growthCondition\":\"40级四翼并提前使用武魂真身；80级八翼并解锁融于体内的圣凯；100级自动成神且无突破瓶颈；120级十二翼并完成完全武魂真身，此后仍允许继续升级。\",\"worldLimitedUses\":\"最多承载十二枚魂环且开局为零环；自凝魂环逐枚获得。战斗复起不设次数上限，十二翼阶段每次有效复起都会在当前战斗中建立进一步强化事实。\"},\"soulTemplates\":[{\"id\":\"phoenix-first-soul\",\"mode\":\"merge-first\",\"slot\":1,\"name\":\"十二翼凤天使\",\"quality\":\"overgod\",\"qualityName\":\"超神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"凤凰神与天使神双重传承同玩家第一武魂融合\",\"category\":\"兽武魂、元素武魂、本体武魂与器武魂的复合武魂\",\"categories\":[\"兽武魂\",\"元素武魂\",\"本体武魂\",\"器武魂\"],\"attributes\":\"极致之火、极致之光、极致生命与神圣\",\"extremeAttributes\":[\"火\",\"光\",\"生命\"],\"specialAttributes\":[\"神圣\"],\"startingSoulPowerLevel\":40,\"startingForm\":\"四翼凤天使\",\"startingRingCount\":0,\"ringCapacity\":12,\"ringMethod\":\"可自行凝聚魂环，无需猎杀魂兽；开局不自带魂环，后续随实际等级节点逐枚凝聚。\",\"growthBeyondLevelCap\":true,\"automaticGodhoodLevel\":100,\"combatPositionFact\":\"40级起即可使用武魂真身，叙事战力约对标常规70级魂师，但不自动保证战斗胜利。\",\"forms\":[{\"level\":40,\"name\":\"四翼凤天使\",\"grade\":\"超神级武魂初始形态\",\"unlocks\":\"提前使用武魂真身；解锁天使圣剑；获得无限战斗复起；被动无视毒、诅咒与疾病。\"},{\"level\":80,\"name\":\"八翼凤天使\",\"grade\":\"神器阶段\",\"unlocks\":\"解锁融于体内的圣凯；免疫控制并获得霸体表现；圣剑、圣凯与武魂整体进入神器定位。\"},{\"level\":100,\"name\":\"凤天神位\",\"grade\":\"自动成神\",\"unlocks\":\"无需神考、神位继承或额外突破条件自动成神；继续修炼不受百级瓶颈限制。\"},{\"level\":120,\"name\":\"十二翼凤天使\",\"grade\":\"超神器阶段\",\"unlocks\":\"强化圣剑与圣凯；解锁完全武魂真身；每次有效战斗复起都会在当前战斗中进一步强化。\"}],\"coreAbility\":\"天使圣剑在善良与邪恶目标上都能形成额外重击，对神与龙类具有专门克制，并可释放光炮；圣凯虽名为铠甲但融于体内，提供控制免疫与霸体。传承具备无次数上限的战斗复起，并被动无视毒、诅咒与疾病。\",\"boundary\":\"四翼、八翼、自动成神与十二翼能力分别在40、80、100与120级生效；未到节点不得预支后续形态。开局零环，自凝只替代猎魂过程。战斗复起不能解除未造成死亡的封印、控制、放逐或拘束，也不能替玩家决定战斗结果。\"}],\"assetTemplates\":[{\"id\":\"phoenix-supreme-spine-bone\",\"assetType\":\"soulBone\",\"name\":\"至尊骨\",\"kind\":\"随凤天传承成长的特殊脊椎骨\",\"bodySlot\":\"脊椎\",\"sourceFact\":\"150SP特性「凤天传承」自带，并在开局与角色脊椎和第一武魂完成融合。\",\"fusionFact\":\"建立为已融合、不可按普通外置魂骨处理的内生至尊骨资源。\",\"effectFact\":\"承载《完美世界》体系的真凰宝术，并随角色等级与四翼、八翼、十二翼阶段逐步解锁相应表现。\",\"restrictionConflict\":\"开局不能预支全部真凰宝术；只记录当前等级已经解锁的表现，未来能力必须随等级更新。\",\"growthCondition\":\"40级建立真凰宝术基础；80级随神器阶段深化；100级伴随自动成神完成神级适配；120级随完全武魂真身进入完整高阶形态，此后仍可继续成长。\"}],\"longTermLine\":{\"type\":\"growth\",\"name\":\"凤天四翼至十二翼无瓶颈成长线\",\"objective\":\"记录十二翼凤天使、至尊骨与真凰宝术随等级自动成长的阶段事实，不额外制造神考、神位争夺或突破瓶颈。\",\"stages\":[\"40级四翼开局与零环自凝权限\",\"80级八翼神器形态与圣凯\",\"100级无瓶颈自动成神\",\"120级十二翼超神器形态与完全武魂真身\",\"120级以上继续成长\"],\"boundary\":\"成长节点随等级自动成立；不能把已达到等级的形态扣留为额外任务，也不能提前建立尚未达到等级的魂环、真凰宝术或后续形态。\"}},{\"id\":\"chixiao_inheritance\",\"name\":\"赤霄传承\",\"cost\":60,\"tag\":\"剑血传承\",\"description\":\"将玩家第一武魂融合为神级复合武魂「赤霄」，兼具斩龙剑与真龙血统，并以剑意共鸣协同队友。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"玩家第一武魂的赤霄剑重构、真龙血统、剑意共鸣、龙威抵抗与对龙作战。\",\"effectFact\":\"第一武魂融合为神级「赤霄」，初始获得斩龙剑、真龙血统、龙威抵抗、基础龙类结构感知与剑意共鸣；这些是特性固有能力，不占用魂环能力。\",\"boundary\":\"对龙特攻不能无视修为、防御、血脉和境界差距；剑意共鸣只强化队友自有武器的协同表现，不复制赤霄武魂、真龙血统或魂技。玩家明确指定的魂环能力必须保留核心用途，不得被默认参考替换。\",\"usageCondition\":\"赤霄与玩家第一武魂完成融合后常驻生效；具体破龙效果仍需接触、观察或取得目标结构证据。\",\"maintenanceCondition\":\"需要维持剑意、肉身与真龙血统的协调，并以当前修为承载赤霄真身。\",\"costConsequence\":\"错误判断龙类结构或强行切入远高于自身的龙力循环时，既有攻击可能失效并暴露自身；特性不会替角色承担战斗后果。\",\"recoveryCondition\":\"脱离高压交锋、稳定血统与剑意，并根据已经取得的目标情报修正对策。\",\"growthCondition\":\"随等级强化龙鳞、龙力循环和龙族肉身弱点的识别与干涉，70级自动解锁赤霄真身；等级固有能力均不占用魂环。魂环能力由玩家决定，未指定时才按剑术、真龙血统、破甲、猎龙和团队协同方向生成。\",\"worldLimitedUses\":\"九个外部魂环位；剑意共鸣和已经解锁的固有能力无固定次数限制，但实际效果受当前修为、距离、目标与场景事实约束。\"},\"soulTemplates\":[{\"id\":\"chixiao-first-soul\",\"mode\":\"merge-first\",\"slot\":1,\"name\":\"赤霄\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"斩龙剑赤霄与真龙血统同玩家第一武魂融合\",\"category\":\"器武魂与兽武魂性质兼具的真龙血统复合武魂\",\"categories\":[\"器武魂\",\"兽武魂\"],\"attributes\":\"剑、龙与真龙血统\",\"startingRingCount\":0,\"ringCapacity\":9,\"ringMethod\":\"九枚魂环均须通过猎魂或其他合法外部来源实际取得。每枚魂环的具体能力由玩家决定；玩家未指定时，才参考剑术、真龙血统、破甲、猎龙、剑意共鸣与团队协同生成。玩家指定的控制、位移、防御或其他能力应保留核心用途，再融合为赤霄剑式或真龙血统表现。\",\"forms\":[{\"level\":70,\"name\":\"赤霄真身\",\"grade\":\"神级完整真身\",\"unlocks\":\"剑身、真龙血统与使用者完成一体化；这是70级自动解锁的特性固有能力，不占用也不替代第七魂环能力。\"}],\"coreAbility\":\"初始解锁赤霄剑、真龙血统、龙威抵抗和基础龙类结构感知。剑意共鸣可令队友自有武器共享协同、破势与追击节奏；面对龙类时额外共享部分龙威抗性和切入龙鳞、龙力结构的能力。\",\"boundary\":\"保留玩家原有魂力等级。固有能力与魂环能力分别记录；魂环没有预设技能，玩家指定优先，未指定才采用方向参考。对龙优势不构成必杀或越级胜利。\"}]},{\"id\":\"thunder_tribulation_spirit\",\"name\":\"雷劫真灵\",\"cost\":150,\"tag\":\"劫雷道体\",\"description\":\"第一武魂融合为由雷劫孕育灵智的「雷劫真灵」；10级起步，以外部九环与等级固有能力成长至雷劫道体。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"玩家第一武魂的雷劫生命化、雷池淬炼、雷霆兵器、劫雷武装、自由魂技与百级以上成长。\",\"effectFact\":\"第一武魂融合为同时具有元素、本体与兽武魂性质的顶级「雷劫真灵」，开局魂力等级为10级且零魂环；第二、第三武魂原稿保持独立。\",\"boundary\":\"10、40、70与100级的固有能力按等级自动解锁且不占用任何魂环。九个魂环不预设固定魂技，玩家明确指定的能力必须保留核心效果与用途，再完成雷道化；不得擅自替换成默认参考。不得固定追加空间斩、瞬移、瞳术、分身、巨型法相或须佐式能力。\",\"usageCondition\":\"雷劫真灵完成融合后常驻生效；魂环必须从外部实际取得，阶段能力必须达到对应等级。\",\"maintenanceCondition\":\"需要以当前肉身、魂力和精神承载劫雷、雷池、雷兵与贴身武装的同步运转。\",\"costConsequence\":\"越过当前等级强行调用未解锁形态，或让外部魂环力量超过承载能力时，会造成已经符合场景事实的失控、反噬或行动中断。\",\"recoveryCondition\":\"停止超负荷运转，以雷池重新梳理肉身、精神与外部魂环留下的力量结构。\",\"growthCondition\":\"10级建立雷劫真灵，40级雷池初成并解锁天雷凝兵，70级解锁劫雷真身与劫雷武装，100级形成雷劫道体并继续成长。魂环能力由玩家决定，未指定时才按雷池、淬体、极速、近战雷兵、雷霆控制与劫雷武装方向生成。\",\"worldLimitedUses\":\"九个外部魂环位；不建立多种源雷或雷种收集体系，所有能力统一由雷劫本源重构。\"},\"configSchema\":{\"title\":\"雷劫真灵外观配置\",\"fields\":[{\"key\":\"initialAppearance\",\"label\":\"初始显化外观\",\"type\":\"textarea\",\"default\":\"以紫色劫雷凝成龙形轮廓，龙只是雷劫真灵在斗罗世界中的默认表现，并非固定种族。\",\"required\":true},{\"key\":\"trueBodyAppearance\",\"label\":\"70级劫雷真身与武装外观\",\"type\":\"textarea\",\"default\":\"高密度、紧凑的类人战斗形态，劫雷武装贴合身体，可保留龙角、鳞纹等轮廓但不形成巨型法相。\",\"required\":true},{\"key\":\"daoBodyAppearance\",\"label\":\"100级雷劫道体外观\",\"type\":\"textarea\",\"default\":\"雷光内敛于身体与小型贴身魂力甲，外观近似收束后的真魔人式战斗体，不固定为龙或魔族。\",\"required\":true}]},\"soulTemplates\":[{\"id\":\"thunder-tribulation-first-soul\",\"mode\":\"merge-first\",\"slot\":1,\"name\":\"雷劫真灵\",\"quality\":\"top\",\"qualityName\":\"顶级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"雷劫孕育的灵智与玩家第一武魂融合\",\"category\":\"元素武魂、本体武魂与兽武魂的复合武魂\",\"categories\":[\"元素武魂\",\"本体武魂\",\"兽武魂\"],\"attributes\":\"雷与劫雷\",\"startingSoulPowerLevel\":10,\"startingForm\":\"雷劫真灵\",\"startingRingCount\":0,\"ringCapacity\":9,\"ringMethod\":\"九枚魂环均须从外部实际取得。外部魂环提供成长素材、属性基础与魂环记录，但不预设最终魂技。具体能力由玩家决定并保留核心用途，再由雷劫真灵重构为兼容的雷道表现；玩家未指定时才按路线参考生成。\",\"growthBeyondLevelCap\":true,\"forms\":[{\"level\":10,\"name\":\"雷劫真灵\",\"grade\":\"顶级初生形态\",\"unlocks\":\"解锁基础劫雷操纵、雷霆淬体、魂力与精神淬炼，以及自由凝聚近战雷霆兵器；外观为{{initialAppearance}}。\"},{\"level\":40,\"name\":\"雷池初成\",\"grade\":\"神级\",\"unlocks\":\"体内雷池成形并解锁完整天雷凝兵；属于等级固有能力，不占用第四魂环或其他魂环能力。\"},{\"level\":70,\"name\":\"劫雷真身\",\"grade\":\"超神级\",\"unlocks\":\"解锁高密度战斗真身与贴身魂力战甲「劫雷武装」；外观为{{trueBodyAppearance}}。二者均不占用第七魂环能力。\"},{\"level\":100,\"name\":\"雷劫道体\",\"grade\":\"超越外部神位继承的道体\",\"unlocks\":\"雷池、肉身、精神、雷霆兵器与劫雷武装完全归一；外观为{{daoBodyAppearance}}，此后仍可继续成长。\"}],\"coreAbility\":\"肉身类魂技可融合为雷劫淬体或雷霆近战，武器类可融合为雷兵、雷刃或武器切换，精神类可融合为雷意、雷鸣感知或精神震荡；控制、防御、速度及其他玩家指定能力均保留原本用途后完成雷道化。\",\"boundary\":\"四个等级阶段全部是特性固有能力，不占用魂环。九个魂环没有固定第四、第七或其他关键魂技；玩家指定优先，未指定才使用能力方向参考。外观配置不改变能力规则。\"}],\"longTermLine\":{\"type\":\"growth\",\"name\":\"雷劫真灵至雷劫道体成长线\",\"objective\":\"分别记录等级固有能力与玩家自定魂技，使雷劫真灵在不依赖外部神位的前提下完成雷池、真身、武装与道体成长。\",\"stages\":[\"10级雷劫真灵与零环开局\",\"40级雷池初成与天雷凝兵\",\"70级劫雷真身与劫雷武装\",\"100级雷劫道体\",\"100级以上继续成长\"],\"boundary\":\"等级固有能力不得占用魂环记录；魂环能力以玩家明确指定为准，只有未指定时才使用路线参考。\"}},{\"id\":\"dragon_god\",\"name\":\"龙神\",\"cost\":150,\"tag\":\"双王归一\",\"description\":\"20级同时觉醒神级金龙王与银龙王双武魂，以十八枚自凝自由魂环成长，并在百级永久归一为龙神。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"金龙王与银龙王双武魂、十八环自由魂技、70级临时龙神融合、100级永久归一与神王位格。\",\"effectFact\":\"角色开局魂力等级为20级，同时获得神级金龙王与银龙王双武魂，各自零环并拥有九个自凝魂环位；第三武魂原稿保持独立。\",\"boundary\":\"武魂真身、临时龙神融合与永久归一是等级固有能力，不占用第七或其他魂环。十八个魂环不预设固定技能；玩家指定能力必须保留核心用途，推荐方向只在未指定时使用。临时融合与神王位格不能自动决定战斗胜负。\",\"usageCondition\":\"双武魂完成觉醒后常驻生效；70级可发动临时龙神融合，100级发生永久归一。\",\"maintenanceCondition\":\"70级临时融合需要同时维持金龙王与银龙王两极，持续程度受当前魂力和承载状态影响。\",\"costConsequence\":\"临时融合消耗当前可用魂力，结束后保留已经成立的消耗与伤势；100级永久归一后不能再把龙神拆回两个独立武魂。\",\"recoveryCondition\":\"临时融合结束后通过正常调息恢复两极平衡；永久归一属于稳定成长结果，不作为需要解除的异常状态。\",\"growthCondition\":\"金龙王沿肉身、力量与毁灭成长，银龙王沿元素、精神、空间、生命与创造成长；70级自动解锁双真身和临时融合，100级永久形成龙神神王位格并继续成长。\",\"worldLimitedUses\":\"金龙王与银龙王各九个自凝魂环位，共十八个自由魂技；100级归一后完整保留。\"},\"soulTemplates\":[{\"id\":\"dragon-god-golden-dragon-king\",\"mode\":\"fixed\",\"slot\":1,\"name\":\"金龙王\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"龙神的金之毁灭极\",\"category\":\"兽武魂\",\"attributes\":\"肉身、力量与毁灭\",\"startingSoulPowerLevel\":20,\"startingForm\":\"金龙王\",\"startingRingCount\":0,\"ringCapacity\":9,\"ringMethod\":\"可自行凝聚九枚魂环。具体魂技由玩家决定；玩家未指定时，才参考肉身、力量、防御、毁灭与近战压制生成。跨方向能力应保留核心用途，例如控制能力可融合为力量镇压表现。\",\"growthBeyondLevelCap\":true,\"forms\":[{\"level\":70,\"name\":\"金龙王真身\",\"grade\":\"神级完整真身\",\"unlocks\":\"与银龙王真身共同建立临时龙神融合权限；真身与融合均为等级固有能力，不占用第七魂环。\"},{\"level\":100,\"name\":\"龙神·金之毁灭极\",\"grade\":\"龙神神王位格\",\"unlocks\":\"永久归入龙神并保留九枚魂环及玩家指定能力，可单独调用金之毁灭极。\"}],\"coreAbility\":\"以肉身、力量和毁灭为天然路线，但不限制玩家为九枚魂环设计控制、防御、机动或其他合理能力。\",\"boundary\":\"推荐方向不是固定技能表。玩家指定优先，未指定才生成参考能力；70级真身和100级归一不占用魂环。\"},{\"id\":\"dragon-god-silver-dragon-king\",\"mode\":\"fixed\",\"slot\":2,\"name\":\"银龙王\",\"quality\":\"god\",\"qualityName\":\"神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"龙神的银之创造极\",\"category\":\"兽武魂\",\"attributes\":\"元素、精神、空间、生命与创造\",\"startingSoulPowerLevel\":20,\"startingForm\":\"银龙王\",\"startingRingCount\":0,\"ringCapacity\":9,\"ringMethod\":\"可自行凝聚九枚魂环。具体魂技由玩家决定；玩家未指定时，才参考元素、精神、空间、生命、创造与规则运用生成。跨方向能力应保留核心用途，例如攻击能力可融合为元素造化表现。\",\"growthBeyondLevelCap\":true,\"forms\":[{\"level\":70,\"name\":\"银龙王真身\",\"grade\":\"神级完整真身\",\"unlocks\":\"与金龙王真身共同建立临时龙神融合权限；真身与融合均为等级固有能力，不占用第七魂环。\"},{\"level\":100,\"name\":\"龙神·银之创造极\",\"grade\":\"龙神神王位格\",\"unlocks\":\"永久归入龙神并保留九枚魂环及玩家指定能力，可单独调用银之创造极。\"}],\"coreAbility\":\"以元素、精神、空间、生命和创造为天然路线，但不限制玩家为九枚魂环设计攻击、防御、辅助或其他合理能力。\",\"boundary\":\"推荐方向不是固定技能表。玩家指定优先，未指定才生成参考能力；70级真身和100级归一不占用魂环。\"}],\"longTermLine\":{\"type\":\"growth\",\"name\":\"金银双王至龙神归一成长线\",\"objective\":\"保留金龙王与银龙王十八枚自由魂环的独立记录，并在等级节点完成临时融合与永久归一。\",\"stages\":[\"20级金龙王与银龙王零环开局\",\"分别凝聚由玩家决定能力的十八枚魂环\",\"70级双真身与临时龙神融合\",\"100级永久归一并自行形成龙神神王位格\",\"100级以上继续成长\"],\"boundary\":\"70级与100级能力不占用魂环；永久归一保留十八枚魂环及能力，但不能再拆分为两个独立武魂。\"}},{\"id\":\"chaos_green_lotus\",\"name\":\"混沌青莲\",\"cost\":150,\"tag\":\"混沌道果\",\"description\":\"36级同时觉醒超神级混沌青莲、青萍剑与混沌莲台，以五十四枚自凝自由魂环成长至大罗、混元与青莲道主。\",\"exclusiveGroup\":\"high-tier-character-template\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"混沌青莲三十六环、青萍剑九环、混沌莲台九环、自由魂技、莲界成长与洪荒式道果。\",\"effectFact\":\"角色开局魂力等级为36级，同时获得超神级混沌青莲、青萍剑与混沌莲台三个固定武魂，全部为零环；当前等级已经开放的凝环资格仍须在正文中依次使用。\",\"boundary\":\"五十四个魂环不预设固定技能。玩家明确指定的能力必须保留核心用途并指定主要承载魂环，可跨武魂融合但不得把同一魂环重复登记到多个武魂；推荐方向只在未指定时使用。真身、剑道、莲界与道果是等级固有能力，不占用魂环。\",\"usageCondition\":\"三个武魂完成觉醒后常驻生效；魂环须在等级开放相应资格后实际凝聚，固有阶段按等级自动成立。\",\"maintenanceCondition\":\"需要保持青莲创造、青萍剑道与莲台护道三条路线的记录清晰，并以当前境界承载莲界。\",\"costConsequence\":\"未开放资格的魂环不能提前凝聚；缺少明确主要承载者的跨武魂能力不能重复建立多条魂环记录。\",\"recoveryCondition\":\"通过停止越阶凝环、重新确认主要承载武魂，并以混沌青莲稳定三武魂与莲界结构。\",\"growthCondition\":\"混沌青莲每十级开放三个魂环位，青萍剑与混沌莲台每十级各开放一个；70级解锁双真身，90级解锁青莲剑道与护道莲界，120级证得大罗道果，200级证得混元道果并成为青莲道主。\",\"worldLimitedUses\":\"共五十四个自凝魂环位；不额外赠送固定魂骨或独立资产，采用洪荒式道果而非外部神位继承。\"},\"soulTemplates\":[{\"id\":\"chaos-green-lotus-primary\",\"mode\":\"fixed\",\"slot\":1,\"name\":\"混沌青莲\",\"quality\":\"overgod\",\"qualityName\":\"超神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"混沌青莲本源\",\"category\":\"植物武魂\",\"attributes\":\"生命、元素、创造、空间、时间与混沌\",\"startingSoulPowerLevel\":36,\"startingForm\":\"混沌莲胎\",\"startingRingCount\":0,\"ringCapacity\":36,\"ringMethod\":\"可自行凝聚三十六枚魂环；每十级开放三个新的凝环资格，36级开局已经开放前三个等级节点的资格，但仍须从零开始依次凝聚。具体魂技由玩家决定；未指定时才参考生命孕育、万物生长、元素演化、创造重构、时空孕育与混沌开界生成。\",\"growthBeyondLevelCap\":true,\"forms\":[{\"level\":36,\"name\":\"混沌莲胎\",\"grade\":\"超神级初始形态\",\"unlocks\":\"保持零魂环开局，可在正文中依次使用当前等级已经开放的凝环资格。\"},{\"level\":120,\"name\":\"三十六品混沌青莲\",\"grade\":\"大罗道果\",\"unlocks\":\"三十六个魂环位全部开放，莲界成长为稳定完整世界；大罗道果不占用第三十六魂环能力。\"},{\"level\":200,\"name\":\"青莲道主\",\"grade\":\"混元道果\",\"unlocks\":\"内世界进入能够自行演化的完整世界体系，并在混元道果上继续成长。\"}],\"coreAbility\":\"承担生命孕育、万物生长、元素演化、创造重构、时空孕育和混沌开界的主要路线；这些是未指定魂技时的生成参考，不构成固定顺序或技能表。\",\"boundary\":\"三十六个魂技由玩家决定。120级大罗与200级混元属于固有阶段，不占用魂环；未开放的凝环资格不得预支。\"},{\"id\":\"chaos-green-lotus-qingping-sword\",\"mode\":\"fixed\",\"slot\":2,\"name\":\"青萍剑\",\"quality\":\"overgod\",\"qualityName\":\"超神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"混沌青莲所化的剑道之器\",\"category\":\"器武魂\",\"attributes\":\"剑与青莲剑道\",\"startingSoulPowerLevel\":36,\"startingForm\":\"青萍剑\",\"startingRingCount\":0,\"ringCapacity\":9,\"ringMethod\":\"可自行凝聚九枚魂环，每十级开放一个新的凝环资格。具体魂技由玩家决定；未指定时才参考锋锐、极速、守御、变化、剑阵、斩魂、规则与开界剑道生成。\",\"growthBeyondLevelCap\":true,\"forms\":[{\"level\":70,\"name\":\"青萍真身\",\"grade\":\"超神级剑道真身\",\"unlocks\":\"自动解锁青萍真身，不占用也不替代第七魂环能力。\"},{\"level\":90,\"name\":\"青莲剑道\",\"grade\":\"九环路线圆满阶段\",\"unlocks\":\"九个魂环位全部开放并形成青莲剑道统合权限，不占用第九魂环能力。\"}],\"coreAbility\":\"承担青莲体系的主要攻击与剑道路线；参考方向不限制玩家为魂环指定防御、控制、辅助或其他合理能力。\",\"boundary\":\"九个魂技由玩家决定。青萍真身与青莲剑道是等级固有能力，不占用魂环。\"},{\"id\":\"chaos-green-lotus-platform\",\"mode\":\"fixed\",\"slot\":3,\"name\":\"混沌莲台\",\"quality\":\"overgod\",\"qualityName\":\"超神级\",\"qualityPolicy\":\"higher-wins\",\"fixedSource\":\"混沌青莲所化的护道莲台\",\"category\":\"器武魂\",\"attributes\":\"守护、净化与莲界\",\"startingSoulPowerLevel\":36,\"startingForm\":\"混沌莲台\",\"startingRingCount\":0,\"ringCapacity\":9,\"ringMethod\":\"可自行凝聚九枚魂环，每十级开放一个新的凝环资格。具体魂技由玩家决定；未指定时才参考防御、净化、伤势承载、治疗、团队庇护、封禁与隔绝生成。\",\"growthBeyondLevelCap\":true,\"forms\":[{\"level\":70,\"name\":\"莲台真身\",\"grade\":\"超神级护道真身\",\"unlocks\":\"自动解锁莲台真身，不占用也不替代第七魂环能力。\"},{\"level\":90,\"name\":\"护道莲界\",\"grade\":\"九环路线圆满阶段\",\"unlocks\":\"九个魂环位全部开放并形成护道莲界，不占用第九魂环能力。\"}],\"coreAbility\":\"承担青莲体系的护道、净化与团队庇护路线，避免默认生成时重复混沌青莲的创造定位或青萍剑的主要攻击定位。\",\"boundary\":\"九个魂技由玩家决定。莲台真身与护道莲界是等级固有能力，不占用魂环；玩家指定的跨方向能力仍须保留核心用途。\"}],\"longTermLine\":{\"type\":\"growth\",\"name\":\"混沌青莲至青莲道主成长线\",\"objective\":\"分别记录五十四枚玩家自定魂技与不占魂环的等级固有阶段，使三武魂沿莲界、大罗与混元路线持续成长。\",\"stages\":[\"36级三武魂零环开局并依次使用已开放资格\",\"70级青萍真身与莲台真身\",\"90级青莲剑道与护道莲界\",\"120级三十六环资格圆满并证大罗道果\",\"200级证混元道果并成为青莲道主\",\"200级以上继续成长\"],\"boundary\":\"五十四枚魂环不得被固有能力预占。玩家指定能力优先；跨武魂融合必须指定一枚主要承载魂环，不能重复登记。\"}},{\"id\":\"godking_shadow\",\"name\":\"神王之嗣的阴影\",\"cost\":-25,\"tag\":\"负面背景\",\"description\":\"与高位灵魂阴影纠缠，分裂、侵蚀与夺舍风险会沿长期威胁线推进。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"梦境、灵魂裂隙、情绪侵蚀、身份混淆与夺舍威胁。\",\"effectFact\":\"角色灵魂中存在与神王之嗣相关的高位阴影，并会在合适情境留下征兆。\",\"boundary\":\"阴影不能随意接管剧情，也不能无征兆抹去角色意志；威胁必须循序建立。\",\"usageCondition\":\"在精神虚弱、相关遗迹、神力刺激或重大情绪裂缝中触发。\",\"maintenanceCondition\":\"阴影会依靠未处理的裂隙、隐瞒和高位力量维持。\",\"costConsequence\":\"可能造成记忆缺口、关系破坏、能力污染、追踪或夺舍危机。\",\"recoveryCondition\":\"通过精神治疗、建立自我锚点、封印或直面阴影缓解。\",\"growthCondition\":\"威胁随关键接触与选择升级，也可通过长期对抗转化或解决。\",\"worldLimitedUses\":\"无固定次数限制。\"},\"checkRules\":[{\"id\":\"godking-shadow-resistance\",\"name\":\"高位阴影意志对抗\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"阴影尝试侵蚀人格、争夺身体或发动夺舍时\",\"scope\":\"保持人格完整与身体主导权\",\"successOutcome\":\"压制本次侵蚀，但不能消除阴影本身\",\"failureOutcome\":\"玩家在停止当前行动、接受已建立的侵蚀后果或承担升级代价之间选择\",\"boundary\":\"失败不得直接宣布夺舍完成，也不得替玩家决定行动\",\"preparations\":[{\"id\":\"shadow-recognition\",\"attributes\":[\"comprehension\",\"experience\"],\"baseDc\":12,\"advantageSteps\":1,\"dcModifier\":0,\"successOutcome\":\"通过识别异质念头或建立自我锚点，使最终气场检定获得优势1级\"}]}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"神王之嗣阴影威胁线\",\"objective\":\"追踪阴影来源、侵蚀阶段和夺舍企图，并让玩家有机会识别、抵抗或转化它。\",\"stages\":[\"出现可辨认但不确定的征兆\",\"建立记忆、梦境或能力污染证据\",\"阴影尝试争夺一次关键选择或身体控制\",\"通过封印、分离、共存或击败作出长期结论\"],\"boundary\":\"每次升级必须有正文证据与反抗窗口，不得直接宣布玩家失败。\"}},{\"id\":\"romance_brain\",\"name\":\"恋爱脑\",\"cost\":-10,\"tag\":\"情感缺陷\",\"description\":\"在明确爱慕关系中容易把情感置于判断与自我边界之前。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"对明确爱慕对象的判断、拒绝、付出与关系边界。\",\"effectFact\":\"爱慕对象参与事件时，角色更容易忽略风险、替对方解释或过度承担。\",\"boundary\":\"只能基于已经建立的感情事实触发，不得凭空制造恋爱、情敌、背叛或NTR情节。\",\"usageCondition\":\"需要爱慕对象直接参与选择、请求、欺骗或重大风险。\",\"maintenanceCondition\":\"未被正视的依赖、幻想和单方面承诺会维持该倾向。\",\"costConsequence\":\"可能失去判断机会、让渡边界、消耗资源或伤害其他关系。\",\"recoveryCondition\":\"通过可靠证据、关系沟通、自我边界和可信伙伴提醒缓解。\",\"growthCondition\":\"在真实关系事件中学会区分爱、责任、依赖与自我牺牲。\",\"worldLimitedUses\":\"无固定次数限制，但每次触发必须有明确关系事实。\"},\"checkRules\":[{\"id\":\"romance-judgment\",\"name\":\"感情判断偏移\",\"type\":\"passive\",\"applicableAttributes\":[\"comprehension\",\"experience\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":-1,\"trigger\":\"对明确爱慕对象辨谎、拒绝不合理请求或划定关系边界时\",\"scope\":\"感情相关的悟性或阅历检定\",\"successOutcome\":\"按检定结果正常判断\",\"failureOutcome\":\"玩家选择顺从情感冲动或承担关系、机会与资源代价后坚持原决定\",\"boundary\":\"不适用于尚未建立的关系，也不替玩家决定爱谁\"},{\"id\":\"romance-restraint\",\"name\":\"克制重大感情冲动\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"角色准备为爱慕对象作出明显越界或高风险牺牲时\",\"scope\":\"维持自我意志与人格边界\",\"successOutcome\":\"角色能够停下来重新选择\",\"failureOutcome\":\"玩家在停止行动、顺从冲动或承担额外关系代价之间选择\",\"boundary\":\"失败不能强制角色执行具体行为\"}]},{\"id\":\"boiling_sheep_constitution\",\"name\":\"沸羊羊体质\",\"cost\":-10,\"tag\":\"单恋困境\",\"description\":\"在单方面付出与竞争性关系中难以及时识别利用并止损。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"单恋、讨好、情敌刺激、过度付出与关系止损。\",\"effectFact\":\"角色面对爱慕对象时倾向继续投入时间、资源和解释空间。\",\"boundary\":\"不能凭空制造情敌、背叛或恶意利用，必须有已建立的行为证据。\",\"usageCondition\":\"爱慕对象提出付出要求，或关系事实显示长期不对等时。\",\"maintenanceCondition\":\"模糊承诺、自我说服和竞争心理会维持该倾向。\",\"costConsequence\":\"可能造成资源流失、尊严受损、错失其他关系或被卷入冲突。\",\"recoveryCondition\":\"通过明确回应、第三方证据、停止投入和建立互惠标准缓解。\",\"growthCondition\":\"经历关系确认、拒绝或止损后建立稳定的互惠边界。\",\"worldLimitedUses\":\"无固定次数限制，但只在明确感情关系中生效。\"},\"checkRules\":[{\"id\":\"boiling-sheep-loss-cutting\",\"name\":\"识别利用与停止付出\",\"type\":\"passive\",\"applicableAttributes\":[\"experience\"],\"baseDc\":0,\"fixedModifier\":-2,\"advantageSteps\":0,\"trigger\":\"识别爱慕对象的利用或决定停止单方面付出时\",\"scope\":\"关系止损相关的阅历检定\",\"successOutcome\":\"按最终检定结果判断关系事实\",\"failureOutcome\":\"玩家选择继续付出或承担关系破裂、名誉与机会代价后退出\",\"boundary\":\"已确认的互惠关系和普通帮助不受影响\"}]},{\"id\":\"poor_finances\",\"name\":\"财运不济\",\"cost\":-5,\"tag\":\"财运缺陷\",\"description\":\"寻找收入、谈取报酬和把能力变现时总比旁人多一道现实阻碍。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"求职、谈报酬、物品变现、寻找赚钱机会与偶然财运。\",\"effectFact\":\"角色直接获取钱财时更容易遇到竞争、低估、手续、时机或市场问题。\",\"boundary\":\"不能扣除已有资产，不能取消固定工资、已经确认的任务报酬和既得奖励。\",\"usageCondition\":\"检定的直接目的必须是获得货币或把物品、劳动转化为货币。\",\"maintenanceCondition\":\"缺少稳定收入渠道、信誉和可重复生计时该困境持续。\",\"costConsequence\":\"可能得到更低报价、错过机会、延迟到账或承担额外手续。\",\"recoveryCondition\":\"通过稳定雇主、长期合同、可信商路与财务准备缓解。\",\"growthCondition\":\"建立可靠收入来源和市场信誉后逐步减少偶然阻碍。\",\"worldLimitedUses\":\"只影响需要检定的赚钱过程。\"},\"checkRules\":[{\"id\":\"poor-finances-income\",\"name\":\"直接获取钱财\",\"type\":\"passive\",\"applicableAttributes\":[\"luck\",\"presence\",\"craft\"],\"baseDc\":0,\"fixedModifier\":-2,\"advantageSteps\":0,\"trigger\":\"气运、气场或百工检定的直接目标是获得钱财时\",\"scope\":\"赚钱机会、报酬谈判和物品变现\",\"successOutcome\":\"按最终检定结果取得合理收益\",\"failureOutcome\":\"出现低价、延迟、手续或机会流失等已说明后果\",\"boundary\":\"固定报酬、已有资产和已确认奖励不受影响\"}]},{\"id\":\"courting_death\",\"name\":\"你已有取死之道\",\"cost\":-10,\"tag\":\"颜面冲突\",\"description\":\"公开受辱或权威受挑战时，很难以不升级矛盾的方式离开。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"公开羞辱、颜面冲突、威胁回应与战略退让。\",\"effectFact\":\"角色在众目睽睽下更容易把冒犯视为必须回应的挑战。\",\"boundary\":\"不得把普通分歧自动解释为生死仇恨，也不能强制进入战斗。\",\"usageCondition\":\"角色遭受明确公开侮辱、威胁或地位挑战时。\",\"maintenanceCondition\":\"旁观者压力、旧怨和未处理的颜面损失会维持冲突。\",\"costConsequence\":\"可能树敌、暴露实力、失去谈判空间或承担撤退代价。\",\"recoveryCondition\":\"通过私下解决、可信调停、补偿或重新定义胜负缓解。\",\"growthCondition\":\"学会区分尊严、自尊与战略选择后改善应对。\",\"worldLimitedUses\":\"每次触发必须存在明确冒犯事实。\"},\"checkRules\":[{\"id\":\"courting-death-restraint\",\"name\":\"克制冲突升级\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"公开受辱后准备退让、和解或克制狠话时\",\"scope\":\"维持自我主导并作出战略选择\",\"successOutcome\":\"角色可按自己的判断回应或离开\",\"failureOutcome\":\"玩家选择升级回应，或通过让步、名誉损失与关系代价换取脱身\",\"boundary\":\"失败不能自动开始战斗\"}]},{\"id\":\"blind_to_titled_douluo\",\"name\":\"有眼不识封号斗罗\",\"cost\":-10,\"tag\":\"判断偏差\",\"description\":\"面对刻意收敛气息的强者和隐藏身份者时容易作出错误定位。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"隐藏强者、伪装身份、真实地位与背景判断。\",\"effectFact\":\"角色倾向按表面身份和当前表现低估没有显露证据的高位人物。\",\"boundary\":\"不能忽略可靠证据、公开魂环、正式身份文件或已经确认的情报。\",\"usageCondition\":\"目标主动隐藏实力或身份，且现场缺少直接证据。\",\"maintenanceCondition\":\"依赖外表、传闻和先入为主会维持误判。\",\"costConsequence\":\"可能失礼、错误站队、泄露态度或低估风险。\",\"recoveryCondition\":\"取得可靠证据、亲历实力表现或接受可信提醒后解除。\",\"growthCondition\":\"通过重大误判和系统性调查建立更谨慎的识人方式。\",\"worldLimitedUses\":\"只在目标确实隐藏且证据不足时生效。\"},\"checkRules\":[{\"id\":\"blind-titled-assessment\",\"name\":\"隐藏强者判断\",\"type\":\"passive\",\"applicableAttributes\":[\"experience\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":-1,\"trigger\":\"判断隐藏强者、伪装身份或真实地位时\",\"scope\":\"相关阅历检定\",\"successOutcome\":\"按最终检定结果取得有限判断\",\"failureOutcome\":\"产生可被后续证据纠正的错误定位\",\"boundary\":\"可靠证据存在时本规则不生效\"}]},{\"id\":\"hundred_thousand_ring_fixation\",\"name\":\"十万年魂环焦虑\",\"cost\":-10,\"tag\":\"成长执念\",\"description\":\"面对稀有魂环与高年限机缘时难以接受安全但普通的成长方案。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"魂环选择、稀有机缘、风险评估与成长路线取舍。\",\"effectFact\":\"角色遇到高年限或稀有魂环线索时容易放大收益并忽视承载条件。\",\"boundary\":\"不能凭空生成稀有魂环，也不能把尚未获得的线索写成资源。\",\"usageCondition\":\"存在真实但高风险的稀有魂环机会，或需要主动接受普通方案时。\",\"maintenanceCondition\":\"比较心理、天才包袱和一次成型幻想会维持焦虑。\",\"costConsequence\":\"可能延误成长、承担搜寻成本、暴露行踪或冒险越级。\",\"recoveryCondition\":\"通过可靠风险评估、替代路线和可验证承载条件缓解。\",\"growthCondition\":\"亲历风险或完成稳健成长后建立长期魂环规划。\",\"worldLimitedUses\":\"只在真实魂环选择节点触发。\"},\"checkRules\":[{\"id\":\"ring-fixation-retreat\",\"name\":\"放弃高风险魂环\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"放弃真实的高风险稀有魂环机会或接受安全方案时\",\"scope\":\"保持成长路线主导权\",\"successOutcome\":\"角色可自由选择安全方案或继续准备\",\"failureOutcome\":\"玩家选择继续追逐，或承担时间、机会与声誉代价后退出\",\"boundary\":\"失败不能生成魂环或强制猎杀\",\"preparations\":[{\"id\":\"ring-risk-research\",\"attributes\":[\"knowledge\"],\"baseDc\":10,\"advantageSteps\":0,\"dcModifier\":-2,\"successOutcome\":\"完成可靠风险调查后使最终气场检定DC降低2\"}]}]},{\"id\":\"technique_announcer\",\"name\":\"报菜名大师\",\"cost\":-5,\"tag\":\"情报暴露\",\"description\":\"使用标志性能力时习惯说出名称、来历或大致作用，容易泄露情报。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"标志性魂技、能力、装备与公开施展时的情报控制。\",\"effectFact\":\"角色在受到关注时倾向用宣言确认自己的招式和身份。\",\"boundary\":\"只造成叙事情报暴露，不计算额外回合、伤害或强制动作。\",\"usageCondition\":\"在有旁观者或敌对观察者时使用具有辨识度的能力。\",\"maintenanceCondition\":\"成名欲、仪式习惯和能力自我认同会维持该倾向。\",\"costConsequence\":\"对手或旁观者可能记住名称、来源、线索和大致边界。\",\"recoveryCondition\":\"通过暗号、无声施展训练和明确情报纪律缓解。\",\"growthCondition\":\"经历情报被利用的后果后学会控制公开程度。\",\"worldLimitedUses\":\"每次标志性能力公开使用时至多触发一次。\"},\"checkRules\":[{\"id\":\"technique-announcer-silence\",\"name\":\"隐藏能力情报\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":10,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"在旁观者面前隐藏标志性能力名称、来源或效果时\",\"scope\":\"保持表达与身份主导权\",\"successOutcome\":\"角色可以无声或模糊地完成能力表现\",\"failureOutcome\":\"只泄露已使用能力的可观察情报\",\"boundary\":\"失败不增加战斗回合，也不改变能力效果\"}]},{\"id\":\"showoff_compulsion\",\"name\":\"人前显圣依赖症\",\"cost\":-10,\"tag\":\"炫耀倾向\",\"description\":\"面对能够展示实力、知识或身份的机会时难以保持低调。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"公开展示、身份隐藏、底牌控制与他人关注。\",\"effectFact\":\"角色察觉到显圣机会时容易主动展示超出当前需要的能力或知识。\",\"boundary\":\"不得强制使用尚未获得的能力，也不能把展示自动判定为成功。\",\"usageCondition\":\"现场存在观众、比较对象或能够显著抬高声望的机会。\",\"maintenanceCondition\":\"认可需求、竞争心理和过往赞誉会维持倾向。\",\"costConsequence\":\"可能暴露底牌、身份、资源和真实目标，并引来追随或敌意。\",\"recoveryCondition\":\"通过明确保密目标、同伴提醒和承担暴露后果缓解。\",\"growthCondition\":\"学会区分必要展示与无意义炫耀后获得控制。\",\"worldLimitedUses\":\"每个独立展示机会至多触发一次。\"},\"checkRules\":[{\"id\":\"showoff-restraint\",\"name\":\"克制公开显圣\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"面对能够公开展示实力、知识或身份的机会时\",\"scope\":\"保持低调与底牌控制\",\"successOutcome\":\"角色可按计划保持低调\",\"failureOutcome\":\"玩家选择展示，或通过失去声望机会、关系期待与情绪稳定等代价保持沉默\",\"boundary\":\"失败不能强制展示特定能力\"}]},{\"id\":\"genius_burden\",\"name\":\"天才包袱\",\"cost\":-10,\"tag\":\"身份压力\",\"description\":\"公开失败后很难承认不懂、寻求指导或接受看似普通的方案。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"公开失败、求助、承认知识边界与接受普通方案。\",\"effectFact\":\"角色会把失败和求助视为对天才身份的威胁。\",\"boundary\":\"不能把角色写成无条件傲慢，也不能否定已经建立的信任关系。\",\"usageCondition\":\"角色在旁观者面前失败、被纠正或需要承认不懂时。\",\"maintenanceCondition\":\"赞誉、比较和对失去期待的恐惧会维持包袱。\",\"costConsequence\":\"可能掩饰错误、错失指导、逞强或让关系承担压力。\",\"recoveryCondition\":\"通过安全的失败经验、可信导师和公开承认边界缓解。\",\"growthCondition\":\"把成长与身份分离后逐渐学会正常求助。\",\"worldLimitedUses\":\"只在身份期待确实参与事件时生效。\"},\"checkRules\":[{\"id\":\"genius-burden-admission\",\"name\":\"承认不足与寻求帮助\",\"type\":\"passive\",\"applicableAttributes\":[\"presence\",\"experience\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":-1,\"trigger\":\"公开失败后承认不懂、请求指导或接受普通方案时\",\"scope\":\"相关气场或阅历检定\",\"successOutcome\":\"按最终检定结果表达真实边界\",\"failureOutcome\":\"玩家选择掩饰或逞强，或承担声誉和关系代价后求助\",\"boundary\":\"私下向高度信任者求助时可不触发\"}]},{\"id\":\"sharp_tongue\",\"name\":\"祖传嘴欠\",\"cost\":-5,\"tag\":\"言语缺陷\",\"description\":\"紧张交涉中总想补上一句嘲讽、纠正或不合时宜的实话。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"紧张交涉、冲突降温、权威对话与关系修复。\",\"effectFact\":\"角色在气氛紧张时容易用尖锐表达重新点燃矛盾。\",\"boundary\":\"不能凭一句话自动引发战斗，NPC反应必须符合关系与事实。\",\"usageCondition\":\"角色正准备克制明显会刺激对方的发言时。\",\"maintenanceCondition\":\"紧张、优越感和用讽刺保护自己的习惯会维持倾向。\",\"costConsequence\":\"可能失去谈判空间、伤害关系、暴露态度或引来报复。\",\"recoveryCondition\":\"通过道歉、解释、同伴提醒和新的表达习惯缓解。\",\"growthCondition\":\"承担言语后果并完成关键修复后提高克制能力。\",\"worldLimitedUses\":\"每段独立交涉至多触发一次关键检定。\"},\"checkRules\":[{\"id\":\"sharp-tongue-restraint\",\"name\":\"克制嘴欠\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":10,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"紧张交涉中准备忍住嘲讽、纠正或补刀时\",\"scope\":\"维持表达主导权\",\"successOutcome\":\"角色能够选择更合适的表达\",\"failureOutcome\":\"玩家选择说出口，或承担尴尬、误解与关系代价后保持沉默\",\"boundary\":\"失败不能自动引发战斗或固定NPC反应\"}]},{\"id\":\"social_anxiety\",\"name\":\"社交恐惧症\",\"cost\":-5,\"tag\":\"社交障碍\",\"description\":\"陌生群体、第一次接触和公开发言会显著干扰表达与临场反应。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"陌生群体、初次接触、公开发言和被集体注视的场景。\",\"effectFact\":\"角色在陌生社交压力下会出现迟疑、表达困难或回避倾向。\",\"boundary\":\"熟悉小圈子、可信同伴和已建立安全关系中不生效。\",\"usageCondition\":\"需要面对陌生人群、公开表达或第一次重要接触。\",\"maintenanceCondition\":\"缺少安全感、准备和稳定陪同时该状态持续。\",\"costConsequence\":\"可能表达不完整、错失发言时机、回避关系或被误解。\",\"recoveryCondition\":\"通过提前准备、可信同伴、小规模接触和安全退出路径缓解。\",\"growthCondition\":\"在可控社交经验中逐步扩大能够稳定表达的范围。\",\"worldLimitedUses\":\"只在明确的陌生社交压力下生效。\"},\"checkRules\":[{\"id\":\"social-anxiety-pressure\",\"name\":\"陌生社交压力\",\"type\":\"passive\",\"applicableAttributes\":[\"presence\"],\"baseDc\":0,\"fixedModifier\":-2,\"advantageSteps\":0,\"trigger\":\"面对陌生群体、第一次接触或公开发言时\",\"scope\":\"相关气场检定\",\"successOutcome\":\"按最终检定结果完成表达\",\"failureOutcome\":\"出现迟疑、表达缺漏、回避或误解等场景后果\",\"boundary\":\"熟悉小圈子和可信同伴场景不生效\"}]},{\"id\":\"unlucky\",\"name\":\"非酋附体\",\"cost\":-15,\"tag\":\"气运缺陷\",\"description\":\"纯随机机缘、抽签和偶然收获很少站在角色这一边。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"抽签、纯随机机缘、偶然收获与没有人为控制的运气事件。\",\"effectFact\":\"角色在完全依赖偶然性的机会中更容易得到不理想结果。\",\"boundary\":\"不能推翻已确认奖励、必然成果和通过能力完成的事件，也不能制造无关灾难。\",\"usageCondition\":\"结果主要由偶然而非知识、努力、关系或既定承诺决定。\",\"maintenanceCondition\":\"无固定维持条件。\",\"costConsequence\":\"可能错过随机收益、抽到不利顺序或需要更多现实准备。\",\"recoveryCondition\":\"通过减少随机依赖、建立保底方案和取得确定性承诺规避。\",\"growthCondition\":\"不会自然消失，但角色可建立越来越可靠的非随机路径。\",\"worldLimitedUses\":\"只影响需要气运检定的纯随机事件。\"},\"checkRules\":[{\"id\":\"unlucky-random-opportunity\",\"name\":\"纯随机机缘\",\"type\":\"passive\",\"applicableAttributes\":[\"luck\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":-1,\"trigger\":\"抽签、纯随机机缘或意外收获需要气运检定时\",\"scope\":\"没有人为控制的偶然事件\",\"successOutcome\":\"按最终检定结果处理机缘\",\"failureOutcome\":\"得到不利顺序、错失随机收益或触发现实可解释的普通阻碍\",\"boundary\":\"不得取消固定奖励或制造无关灾难\"}]},{\"id\":\"authority_deference\",\"name\":\"大师说得都对\",\"cost\":-5,\"tag\":\"权威依赖\",\"description\":\"面对著名大师与公认理论时容易把声望误当成证据。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"权威理论、著名大师、学术共识与独立质疑。\",\"effectFact\":\"缺少直接反证时，角色倾向优先接受权威结论。\",\"boundary\":\"明确反证、亲历事实和已经确认的错误不会被忽略。\",\"usageCondition\":\"需要独立质疑具有显著声望的权威或公认理论。\",\"maintenanceCondition\":\"信息不对称、身份崇拜和害怕犯错会维持依赖。\",\"costConsequence\":\"可能沿用错误方法、忽略少数意见或延误验证。\",\"recoveryCondition\":\"通过交叉验证、重复实验和亲历权威失误缓解。\",\"growthCondition\":\"建立证据优先的判断习惯后提高独立思考能力。\",\"worldLimitedUses\":\"只在权威声望确实影响判断时生效。\"},\"checkRules\":[{\"id\":\"authority-independent-question\",\"name\":\"独立质疑权威\",\"type\":\"passive\",\"applicableAttributes\":[\"comprehension\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":-1,\"trigger\":\"没有直接反证却需要质疑著名权威或公认理论时\",\"scope\":\"相关悟性检定\",\"successOutcome\":\"按最终检定结果形成独立判断\",\"failureOutcome\":\"暂时接受权威结论，直到获得新证据或承担验证成本\",\"boundary\":\"明确反证存在时不生效\"}]},{\"id\":\"martial_soul_devours_master\",\"name\":\"武魂噬主\",\"cost\":-20,\"tag\":\"武魂威胁\",\"description\":\"武魂中的异质意志会在特定条件下侵蚀身体、记忆与人格主导权。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{affectedSoul}}的异质意志、精神世界、身体主导与人格边界。\",\"effectFact\":\"{{alienWillName}}会以{{intrusionManifestation}}表现，并尝试影响角色的力量使用与选择。\",\"boundary\":\"异质意志不能毫无征兆地夺取身体，不能替玩家决定行动；{{recoveryBoundary}}\",\"usageCondition\":\"在{{intrusionTrigger}}时可能触发侵蚀。\",\"maintenanceCondition\":\"未处理的武魂裂隙、持续透支和自我锚点动摇会维持侵蚀。\",\"costConsequence\":\"可能造成身体异化、记忆混淆、能力污染、关系受损或身份暴露。\",\"recoveryCondition\":\"通过{{identityAnchor}}、停止透支、精神治疗、封印或对话缓解。\",\"growthCondition\":\"调查来源后，可沿压制、契约、共生、净化或分离路线推进。\",\"worldLimitedUses\":\"无固定次数限制，但严重侵蚀必须建立在前期征兆与累积事实之上。\"},\"configSchema\":{\"title\":\"武魂噬主配置\",\"fields\":[{\"key\":\"affectedSoul\",\"label\":\"受影响武魂\",\"required\":true},{\"key\":\"alienWillName\",\"label\":\"异质意志名称\",\"required\":true},{\"key\":\"intrusionManifestation\",\"label\":\"侵蚀表现\",\"type\":\"textarea\",\"required\":true},{\"key\":\"intrusionTrigger\",\"label\":\"触发条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"identityAnchor\",\"label\":\"自我锚点\",\"type\":\"textarea\",\"required\":true},{\"key\":\"recoveryBoundary\",\"label\":\"恢复与控制边界\",\"type\":\"textarea\",\"default\":\"每次升级都必须有征兆和反抗窗口；恢复只能缓解当前侵蚀，不能自动消除异质意志。\",\"required\":true}]},\"checkRules\":[{\"id\":\"soul-devour-final\",\"name\":\"武魂噬主意志检定\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"{{alienWillName}}尝试侵蚀人格、争夺身体或夺取{{affectedSoul}}主导权时\",\"scope\":\"坚持自我身份与身体、武魂主导权\",\"successOutcome\":\"压制本次侵蚀，但异质意志和既有后果继续存在\",\"failureOutcome\":\"玩家在停止当前行动、接受已建立的侵蚀后果或承担升级代价之间选择\",\"boundary\":\"失败不能直接宣布人格被抹除或夺舍完成\",\"preparations\":[{\"id\":\"soul-devour-recognition\",\"attributes\":[\"comprehension\",\"experience\"],\"baseDc\":12,\"advantageSteps\":1,\"dcModifier\":0,\"successOutcome\":\"提前识别异质念头或以{{identityAnchor}}建立自我锚点，使最终检定获得优势1级\"},{\"id\":\"soul-devour-seal\",\"attributes\":[\"knowledge\",\"craft\"],\"baseDc\":15,\"advantageSteps\":0,\"dcModifier\":-2,\"successOutcome\":\"判断来源或建立稳定器具，使最终检定DC降低2\"}]}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"{{alienWillName}}噬主威胁线\",\"objective\":\"调查{{affectedSoul}}中异质意志的来源，在保持自我的前提下决定压制、契约、共生、净化或分离。\",\"stages\":[\"确认第一次可辨认征兆\",\"建立侵蚀来源与触发证据\",\"承担一次现实后果并形成稳定对抗手段\",\"作出压制、契约、共生、净化或分离的长期结论\"],\"boundary\":\"{{recoveryBoundary}}\"}},{\"id\":\"soul_fracture\",\"name\":\"魂魄裂痕\",\"cost\":-15,\"tag\":\"精神旧伤\",\"description\":\"灵魂曾遭重创，精神冲击、幻境和高位魂力会令旧伤复发。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"精神冲击、幻境、灵魂接触与{{recurrenceSigns}}。\",\"effectFact\":\"源于{{injuryOrigin}}的魂魄裂痕仍然存在，会在{{recurrenceTrigger}}时复发。\",\"boundary\":\"复发必须有触发事实，不能把普通情绪自动写成灵魂崩溃；{{recoveryBoundary}}\",\"usageCondition\":\"遭遇{{recurrenceTrigger}}时进入复发检定。\",\"maintenanceCondition\":\"持续精神压力、缺少休息和未处理的灵魂创伤会维持裂痕。\",\"costConsequence\":\"可能出现感知错乱、记忆断片、精神失衡或短期能力不稳。\",\"recoveryCondition\":\"通过{{stabilizationMethod}}、休息、精神治疗和远离刺激稳定。\",\"growthCondition\":\"识别触发规律并完成针对性修复后提高稳定程度。\",\"worldLimitedUses\":\"无固定次数限制，但同一刺激不能连续重复制造复发。\"},\"configSchema\":{\"title\":\"魂魄裂痕配置\",\"fields\":[{\"key\":\"injuryOrigin\",\"label\":\"受伤来源\",\"type\":\"textarea\",\"required\":true},{\"key\":\"recurrenceSigns\",\"label\":\"复发征兆\",\"type\":\"textarea\",\"required\":true},{\"key\":\"recurrenceTrigger\",\"label\":\"复发条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"stabilizationMethod\",\"label\":\"稳定手段\",\"type\":\"textarea\",\"required\":true},{\"key\":\"recoveryBoundary\",\"label\":\"恢复边界\",\"type\":\"textarea\",\"default\":\"一次治疗只能处理当前复发；永久修复必须经过明确资源、疗程和剧情节点。\",\"required\":true}]},\"checkRules\":[{\"id\":\"soul-fracture-flare\",\"name\":\"魂魄裂痕复发检定\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"遭遇{{recurrenceTrigger}}并出现{{recurrenceSigns}}时\",\"scope\":\"保持精神完整和行动主导\",\"successOutcome\":\"压住本次复发，仍需处理已经形成的精神负担\",\"failureOutcome\":\"玩家在停止刺激来源、接受短期持续状态或承担更重精神后果之间选择\",\"boundary\":\"失败不等于永久失去意识\",\"preparations\":[{\"id\":\"soul-fracture-anchor\",\"attributes\":[\"comprehension\",\"experience\"],\"baseDc\":12,\"advantageSteps\":1,\"dcModifier\":0,\"successOutcome\":\"提前识别征兆或使用{{stabilizationMethod}}，使最终检定获得优势1级\"}]}]},{\"id\":\"nemesis_mark\",\"name\":\"宿敌烙印\",\"cost\":-15,\"tag\":\"追踪威胁\",\"description\":\"身上存在能被特定宿敌或势力识别、追踪和利用的烙印。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{enemyFaction}}的追踪、身份隐藏、烙印侵入与势力冲突。\",\"effectFact\":\"源于{{markOrigin}}的烙印会以{{trackingMethod}}为{{enemyFaction}}提供追踪或识别线索。\",\"boundary\":\"追踪必须符合{{trackingMethod}}和世界事实，不能无视距离、屏蔽与反追踪；{{escapeBoundary}}\",\"usageCondition\":\"烙印进入{{currentThreat}}所描述的有效条件时。\",\"maintenanceCondition\":\"未解除的烙印、同源力量和宿敌势力活动会维持威胁。\",\"costConsequence\":\"可能暴露位置、身份、关系网络或引来针对性追捕。\",\"recoveryCondition\":\"通过屏蔽、误导、切断同源联系或寻找解除方法缓解。\",\"growthCondition\":\"可沿隐藏、反追踪、直面宿敌、解除或转化烙印推进。\",\"worldLimitedUses\":\"追踪频率受烙印条件和宿敌实际行动能力限制。\"},\"configSchema\":{\"title\":\"宿敌烙印配置\",\"fields\":[{\"key\":\"enemyFaction\",\"label\":\"宿敌或势力\",\"required\":true},{\"key\":\"markOrigin\",\"label\":\"烙印来源\",\"type\":\"textarea\",\"required\":true},{\"key\":\"trackingMethod\",\"label\":\"追踪方式\",\"type\":\"textarea\",\"required\":true},{\"key\":\"currentThreat\",\"label\":\"当前威胁\",\"type\":\"textarea\",\"required\":true},{\"key\":\"escapeBoundary\",\"label\":\"脱离边界\",\"type\":\"textarea\",\"default\":\"宿敌必须通过实际线索和行动追踪；烙印不能提供全知视角或无条件跨越封锁。\",\"required\":true}]},\"checkRules\":[{\"id\":\"nemesis-mark-hide\",\"name\":\"隐藏烙印身份\",\"type\":\"passive\",\"applicableAttributes\":[\"presence\",\"experience\"],\"baseDc\":0,\"fixedModifier\":-2,\"advantageSteps\":0,\"trigger\":\"对{{enemyFaction}}隐藏身份或摆脱{{trackingMethod}}时\",\"scope\":\"相关气场或阅历检定\",\"successOutcome\":\"按最终检定结果隐藏或误导追踪\",\"failureOutcome\":\"留下可被追踪的线索或必须承担额外逃脱代价\",\"boundary\":\"宿敌没有实际追踪条件时不生效\"},{\"id\":\"nemesis-mark-intrusion\",\"name\":\"抵抗烙印侵入\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"烙印主动侵入精神、身体或武魂时\",\"scope\":\"维持身体和人格主导权\",\"successOutcome\":\"压制本次侵入\",\"failureOutcome\":\"玩家在中断当前行动、接受烙印持续状态或承担暴露后果之间选择\",\"boundary\":\"失败不能直接完成控制或追踪\"}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"{{enemyFaction}}烙印追踪威胁线\",\"objective\":\"查清{{markOrigin}}与{{trackingMethod}}，摆脱追踪并决定解除、反制或转化烙印。\",\"stages\":[\"确认烙印和第一次追踪证据\",\"建立宿敌势力与追踪边界\",\"取得屏蔽、反制或解除条件\",\"解决烙印与{{enemyFaction}}的长期关系\"],\"boundary\":\"{{escapeBoundary}}\"}},{\"id\":\"oath_shackles\",\"name\":\"誓约枷锁\",\"cost\":-10,\"tag\":\"长期义务\",\"description\":\"角色受一项具有真实约束力的誓约束缚，违背时必须承担后果。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{oathText}}涉及的行为、义务、禁止事项与违约后果。\",\"effectFact\":\"誓约真实存在，并禁止或约束{{prohibitedAction}}。\",\"boundary\":\"誓约不能替玩家行动；成功抵抗也不能抹去普通违约代价。\",\"usageCondition\":\"角色准备实施{{prohibitedAction}}或明确拒绝誓约义务时。\",\"maintenanceCondition\":\"誓约在满足{{releaseCondition}}前持续有效。\",\"costConsequence\":\"违约会导致{{breachConsequence}}，失败检定还可能使后果升级。\",\"recoveryCondition\":\"通过履行、补偿、改写或达成{{releaseCondition}}处理。\",\"growthCondition\":\"在誓约冲突中决定履行、重议、违背或解除。\",\"worldLimitedUses\":\"每次明确违约选择至多进行一次核心检定。\"},\"configSchema\":{\"title\":\"誓约枷锁配置\",\"fields\":[{\"key\":\"oathText\",\"label\":\"誓约正文\",\"type\":\"textarea\",\"required\":true},{\"key\":\"prohibitedAction\",\"label\":\"禁止或约束行为\",\"type\":\"textarea\",\"required\":true},{\"key\":\"breachConsequence\",\"label\":\"违约后果\",\"type\":\"textarea\",\"required\":true},{\"key\":\"releaseCondition\",\"label\":\"解除条件\",\"type\":\"textarea\",\"required\":true}]},\"checkRules\":[{\"id\":\"oath-shackles-choice\",\"name\":\"誓约冲突意志检定\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"面对{{prohibitedAction}}并决定违背誓约时\",\"scope\":\"保持选择能力并承受誓约压力\",\"successOutcome\":\"角色保留行动选择，但仍承担{{breachConsequence}}中的普通违约代价\",\"failureOutcome\":\"玩家选择停止违约行动，或行动并接受升级后的{{breachConsequence}}\",\"boundary\":\"检定不能免除誓约本身，也不能强制角色服从\"}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"誓约枷锁长期义务线\",\"objective\":\"围绕{{oathText}}决定履行、补偿、改写、违背或达成解除条件。\",\"stages\":[\"确认誓约正文与约束范围\",\"经历一次真实的义务冲突\",\"承担履行或违约的现实后果\",\"完成、改写、违背或解除誓约\"],\"boundary\":\"誓约不能替玩家行动，任何解除都必须满足{{releaseCondition}}。\"}},{\"id\":\"lingering_injury\",\"name\":\"旧伤难愈\",\"cost\":-10,\"tag\":\"身体旧伤\",\"description\":\"身体存在不能靠普通休息完全治愈的旧伤，在高负荷下会复发。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{injuredPart}}、长途行动、训练、高负荷工作与旧伤复发。\",\"effectFact\":\"源于{{injuryOrigin}}的旧伤仍限制{{currentLimit}}。\",\"boundary\":\"旧伤不能在无触发条件时任意发作；{{treatmentBoundary}}\",\"usageCondition\":\"遭遇{{recurrenceTrigger}}并决定继续高负荷行动时。\",\"maintenanceCondition\":\"缺少治疗、重复透支和不适配动作会维持旧伤。\",\"costConsequence\":\"可能产生疼痛、动作受限、伤势恶化或后续持续状态。\",\"recoveryCondition\":\"停止负荷、接受适配治疗并完成循序复健。\",\"growthCondition\":\"取得针对性治疗、改变动作方式或完成修复节点后改善。\",\"worldLimitedUses\":\"每次独立复发事件只进行一次核心检定。\"},\"configSchema\":{\"title\":\"旧伤难愈配置\",\"fields\":[{\"key\":\"injuredPart\",\"label\":\"受伤部位\",\"required\":true},{\"key\":\"injuryOrigin\",\"label\":\"旧伤来源\",\"type\":\"textarea\",\"required\":true},{\"key\":\"recurrenceTrigger\",\"label\":\"复发条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"currentLimit\",\"label\":\"当前限制\",\"type\":\"textarea\",\"required\":true},{\"key\":\"treatmentBoundary\",\"label\":\"治疗边界\",\"type\":\"textarea\",\"default\":\"普通休息只能缓解当前不适；永久修复需要明确疗程、资源和恢复时间。\",\"required\":true}]},\"checkRules\":[{\"id\":\"lingering-injury-push\",\"name\":\"旧伤复发坚持检定\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"{{recurrenceTrigger}}引发旧伤后仍要继续长途行动、训练或高负荷工作时\",\"scope\":\"保持行动主导并判断是否继续\",\"successOutcome\":\"可完成当前阶段行动，但旧伤和实际消耗继续存在\",\"failureOutcome\":\"玩家选择停止行动，或继续并把{{currentLimit}}升级为具体伤势或持续状态\",\"boundary\":\"成功不能治愈旧伤，也不能取消身体极限\"}]},{\"id\":\"memory_gap\",\"name\":\"记忆断层\",\"cost\":-10,\"tag\":\"失落经历\",\"description\":\"一段重要经历缺失，但相关人物、承诺和现实后果仍然存在。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{missingPeriod}}、相关人物、旧承诺、记忆碎片与身份调查。\",\"effectFact\":\"角色缺失{{missingPeriod}}的可靠记忆，但{{knownAftereffects}}仍是现实后果。\",\"boundary\":\"AI不能利用记忆空白任意改写玩家设定；{{unreliableMemoryBoundary}}\",\"usageCondition\":\"调查缺失时期、辨认真伪记忆或遇到相关人物与地点时。\",\"maintenanceCondition\":\"缺少可靠证据、封印和主动回避会维持断层。\",\"costConsequence\":\"可能误认人物、遗漏承诺、受到操纵或承担旧事后果。\",\"recoveryCondition\":\"通过{{recoveryClues}}、多源证据、可信见证和安全回忆逐步恢复。\",\"growthCondition\":\"按证据恢复、接受永久空白或重新定义与过去的关系。\",\"worldLimitedUses\":\"每条记忆事实都必须由独立证据建立。\"},\"configSchema\":{\"title\":\"记忆断层配置\",\"fields\":[{\"key\":\"missingPeriod\",\"label\":\"缺失时期\",\"type\":\"textarea\",\"required\":true},{\"key\":\"knownAftereffects\",\"label\":\"已知现实后果\",\"type\":\"textarea\",\"required\":true},{\"key\":\"unreliableMemoryBoundary\",\"label\":\"不可靠记忆边界\",\"type\":\"textarea\",\"default\":\"记忆碎片只能作为线索，未经多源证据确认不得覆盖玩家已经填写的事实。\",\"required\":true},{\"key\":\"recoveryClues\",\"label\":\"可用恢复线索\",\"type\":\"textarea\",\"required\":true}]},\"checkRules\":[{\"id\":\"memory-gap-context\",\"name\":\"缺失时期知识断层\",\"type\":\"passive\",\"applicableAttributes\":[\"knowledge\",\"experience\"],\"baseDc\":0,\"fixedModifier\":0,\"advantageSteps\":-1,\"trigger\":\"检定直接涉及{{missingPeriod}}的人物、知识或经历时\",\"scope\":\"相关学识或阅历检定\",\"successOutcome\":\"按最终检定结果取得有限线索\",\"failureOutcome\":\"无法确认、产生错误联想或需要额外证据\",\"boundary\":\"当前时期的普通知识不受影响\"},{\"id\":\"memory-gap-authenticity\",\"name\":\"分辨记忆碎片真伪\",\"type\":\"dc\",\"primaryAttribute\":\"comprehension\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"出现可能属于{{missingPeriod}}的记忆碎片或精神诱导时\",\"scope\":\"识别异质、伪造与真实记忆线索\",\"successOutcome\":\"判断其可靠程度，但不自动恢复完整记忆\",\"failureOutcome\":\"把碎片保留为不可靠线索，直到取得{{recoveryClues}}中的证据\",\"boundary\":\"失败不能直接把伪造内容写成确定事实\"}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"{{missingPeriod}}记忆真相威胁线\",\"objective\":\"围绕{{knownAftereffects}}调查缺失经历，并决定恢复、封存或接受空白。\",\"stages\":[\"确认断层范围与已知后果\",\"取得第一条可交叉验证的线索\",\"面对相关人物或旧承诺的现实影响\",\"恢复、封存或接受缺失经历\"],\"boundary\":\"{{unreliableMemoryBoundary}}\"}},{\"id\":\"bad_reputation\",\"name\":\"声名狼藉\",\"cost\":-5,\"tag\":\"社会污名\",\"description\":\"在恶名确实传播且身份被认出时，相关地区的人会带着成见与角色交涉。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{affectedRegion}}中的身份识别、信任、合作与名誉修复。\",\"effectFact\":\"源于{{reputationCause}}的传闻“{{publicRumor}}”已经传播。\",\"boundary\":\"只有身份被识别且恶名确实传播时才生效；{{repairBoundary}}\",\"usageCondition\":\"在{{affectedRegion}}或知晓传闻的人群中，以真实身份进行相关交涉时。\",\"maintenanceCondition\":\"传闻缺少反证、被利益方重复传播或角色继续符合刻板印象时维持。\",\"costConsequence\":\"可能遭遇不信任、提高担保要求、合作受阻或关系起点恶化。\",\"recoveryCondition\":\"通过{{knownCounterevidence}}、长期行为、公开澄清与可信见证逐步修复。\",\"growthCondition\":\"在具体地区和人物中积累反证，使名誉变化成为可追踪事实。\",\"worldLimitedUses\":\"只影响与该恶名直接相关且知情的交涉。\"},\"configSchema\":{\"title\":\"声名狼藉配置\",\"fields\":[{\"key\":\"affectedRegion\",\"label\":\"影响地区\",\"required\":true},{\"key\":\"reputationCause\",\"label\":\"恶名来源\",\"type\":\"textarea\",\"required\":true},{\"key\":\"publicRumor\",\"label\":\"公开传闻\",\"type\":\"textarea\",\"required\":true},{\"key\":\"knownCounterevidence\",\"label\":\"已有或可能取得的反证\",\"type\":\"textarea\",\"required\":true},{\"key\":\"repairBoundary\",\"label\":\"修复边界\",\"type\":\"textarea\",\"default\":\"名誉必须按地区和人物分别建立、传播与修复，不能让全世界无条件知晓，也不能用一次行为洗清全部恶名。\",\"required\":true}]},\"checkRules\":[{\"id\":\"bad-reputation-contact\",\"name\":\"恶名交涉\",\"type\":\"passive\",\"applicableAttributes\":[\"presence\"],\"baseDc\":0,\"fixedModifier\":-2,\"advantageSteps\":0,\"trigger\":\"身份已被识别、{{publicRumor}}确实传播且当前交涉与恶名相关时\",\"scope\":\"相关气场检定\",\"successOutcome\":\"按最终检定结果争取信任或合作\",\"failureOutcome\":\"遭遇不信任、额外担保、拒绝或关系代价\",\"boundary\":\"未知情者、匿名行动和无关交涉不受影响\"}]},{\"id\":\"creditor_at_door\",\"name\":\"债主临门\",\"cost\":-5,\"tag\":\"债务追索\",\"description\":\"一笔真实债务已经进入追索阶段，需要偿还、重议或承担对抗后果。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{creditor}}、{{debtContent}}、期限、追索与重议。\",\"effectFact\":\"角色对{{creditor}}负有{{debtContent}}，当前期限为{{deadline}}。\",\"boundary\":\"债主只能按{{collectionMethod}}和世界事实追索；{{repaymentBoundary}}\",\"usageCondition\":\"债务到期、债主提出追索，或角色主动申请延期和重议时。\",\"maintenanceCondition\":\"在债务未偿还、未重议或未依法失效前持续存在。\",\"costConsequence\":\"可能失去资源、信誉、关系、抵押物或招致合理范围内的追索。\",\"recoveryCondition\":\"通过偿还、分期、交换义务、合法重议或解决债权争议处理。\",\"growthCondition\":\"逐步查清债务来源、债权边界并完成偿还、重议或对抗。\",\"worldLimitedUses\":\"追索频率受债主实际能力、距离和已建立行动限制。\"},\"configSchema\":{\"title\":\"债主临门配置\",\"fields\":[{\"key\":\"creditor\",\"label\":\"债主\",\"required\":true},{\"key\":\"debtContent\",\"label\":\"债务内容\",\"type\":\"textarea\",\"required\":true},{\"key\":\"deadline\",\"label\":\"期限\",\"required\":true},{\"key\":\"collectionMethod\",\"label\":\"追索方式\",\"type\":\"textarea\",\"required\":true},{\"key\":\"repaymentBoundary\",\"label\":\"偿还与追索边界\",\"type\":\"textarea\",\"default\":\"债务只能按已建立内容追索，不得凭空追加无限利息、全知定位或与债务无关的强制义务。\",\"required\":true}]},\"checkRules\":[{\"id\":\"creditor-renegotiation\",\"name\":\"债务重议\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"向{{creditor}}争取延期、分期、重新议价或宽限时\",\"scope\":\"债务条件交涉\",\"successOutcome\":\"取得符合事实与双方能力的新条件\",\"failureOutcome\":\"玩家选择接受原期限、提供额外担保或承担明确的追索后果\",\"boundary\":\"成功不能无代价免除{{debtContent}}\"}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"{{creditor}}债务追索线\",\"objective\":\"围绕{{debtContent}}完成偿还、重议、合法抗辩或承担对抗结果。\",\"stages\":[\"确认债权、期限与追索边界\",\"面对一次实际催收或重议机会\",\"取得偿还资源、替代条件或抗辩证据\",\"完成偿还、重议或解决债权冲突\"],\"boundary\":\"{{repaymentBoundary}}\"}},{\"id\":\"martial_soul_rejection\",\"name\":\"武魂排斥\",\"cost\":-15,\"tag\":\"力量冲突\",\"description\":\"多武魂或外来力量之间存在排斥，失衡时会争夺身体和魂力主导。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{affectedSouls}}之间的魂力流转、身体承载与主导权。\",\"effectFact\":\"相关力量会以{{rejectionManifestation}}表现排斥。\",\"boundary\":\"排斥必须由{{rejectionTrigger}}触发；{{failureBoundary}}\",\"usageCondition\":\"同时调用冲突力量、强行融合或遭遇{{rejectionTrigger}}时。\",\"maintenanceCondition\":\"未经适配的力量结构、持续透支和失衡修炼会维持排斥。\",\"costConsequence\":\"可能中断能力、造成魂力紊乱、身体负担或短期持续状态。\",\"recoveryCondition\":\"通过{{stabilizationMethod}}、停止并用、适配训练或治疗稳定。\",\"growthCondition\":\"查清冲突源并建立轮换、隔离、协调或安全融合方法。\",\"worldLimitedUses\":\"每次独立冲突事件只进行一次核心主导检定。\"},\"configSchema\":{\"title\":\"武魂排斥配置\",\"fields\":[{\"key\":\"affectedSouls\",\"label\":\"冲突武魂或力量\",\"type\":\"textarea\",\"required\":true},{\"key\":\"rejectionManifestation\",\"label\":\"排斥表现\",\"type\":\"textarea\",\"required\":true},{\"key\":\"rejectionTrigger\",\"label\":\"触发条件\",\"type\":\"textarea\",\"required\":true},{\"key\":\"stabilizationMethod\",\"label\":\"稳定方式\",\"type\":\"textarea\",\"required\":true},{\"key\":\"failureBoundary\",\"label\":\"失败边界\",\"type\":\"textarea\",\"default\":\"失败只能形成已经说明的力量中断、身体负担或持续状态，不能直接摧毁武魂、抹去人格或替玩家决定行动。\",\"required\":true}]},\"checkRules\":[{\"id\":\"soul-rejection-control\",\"name\":\"武魂排斥主导检定\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"{{rejectionTrigger}}导致{{affectedSouls}}争夺主导时\",\"scope\":\"维持身体、人格与武魂主导权\",\"successOutcome\":\"稳定本次冲突，但仍需遵守当前限制\",\"failureOutcome\":\"玩家选择停止冲突力量、接受短期持续状态或承担已明确的身体后果\",\"boundary\":\"{{failureBoundary}}\",\"preparations\":[{\"id\":\"soul-rejection-stabilize\",\"attributes\":[\"knowledge\",\"craft\"],\"baseDc\":12,\"advantageSteps\":1,\"dcModifier\":0,\"successOutcome\":\"提前理解结构或布置{{stabilizationMethod}}，使最终气场检定获得优势1级\"}]}]},{\"id\":\"fate_running_out\",\"name\":\"命数将尽\",\"cost\":-25,\"tag\":\"终局危机\",\"description\":\"角色的生命或存在正被一项明确命数威胁持续侵蚀，成功检定只能争取时间。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{threatSource}}引发的衰败、清醒维持、延缓手段与最终解决。\",\"effectFact\":\"角色会出现{{declineSigns}}，并沿{{escalationNodes}}逐步升级。\",\"boundary\":\"成功检定不能消除命数威胁；{{hardBoundary}}\",\"usageCondition\":\"调查或制作解决手段，或危机升级时维持清醒。\",\"maintenanceCondition\":\"只要{{threatSource}}未解决且升级条件继续成立，威胁就会推进。\",\"costConsequence\":\"可能失去时间、行动能力、关系机会、重要资源或承受更明显衰败。\",\"recoveryCondition\":\"通过休养和延缓手段处理当前危机，最终只能按{{possibleSolution}}寻找解决。\",\"growthCondition\":\"查清来源、验证解法、取得关键条件并面对最终解决节点。\",\"worldLimitedUses\":\"每个升级节点只触发一次核心危机检定，不能靠重复投骰消除威胁。\"},\"configSchema\":{\"title\":\"命数将尽配置\",\"fields\":[{\"key\":\"threatSource\",\"label\":\"威胁来源\",\"type\":\"textarea\",\"required\":true},{\"key\":\"declineSigns\",\"label\":\"衰败征兆\",\"type\":\"textarea\",\"required\":true},{\"key\":\"escalationNodes\",\"label\":\"升级节点\",\"type\":\"textarea\",\"required\":true},{\"key\":\"possibleSolution\",\"label\":\"可能解法\",\"type\":\"textarea\",\"required\":true},{\"key\":\"hardBoundary\",\"label\":\"硬性边界\",\"type\":\"textarea\",\"default\":\"命数威胁必须按已建立节点推进并留下应对窗口；任何单次检定成功都只能处理当前危机，不能直接治愈或取消威胁。\",\"required\":true}]},\"checkRules\":[{\"id\":\"fate-investigation\",\"name\":\"调查命数解法\",\"type\":\"dc\",\"primaryAttribute\":\"knowledge\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"调查{{threatSource}}、{{declineSigns}}或验证{{possibleSolution}}时\",\"scope\":\"取得可验证的解决线索\",\"successOutcome\":\"建立一条可靠线索或排除错误方向\",\"failureOutcome\":\"消耗调查机会、资源或时间，但不伪造错误事实\",\"boundary\":\"成功不能直接消除威胁\"},{\"id\":\"fate-crafting\",\"name\":\"制作延缓或解决手段\",\"type\":\"dc\",\"primaryAttribute\":\"craft\",\"baseDc\":15,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"依据可靠知识制作延缓、诊断或解决工具时\",\"scope\":\"把{{possibleSolution}}转化为可用手段\",\"successOutcome\":\"完成符合材料、工艺和知识边界的手段\",\"failureOutcome\":\"材料、时间或机会受损，需要取得新条件后再尝试\",\"boundary\":\"未知原理不能只靠百工跳过调查\"},{\"id\":\"fate-crisis\",\"name\":\"命数危机清醒检定\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":18,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"{{escalationNodes}}中的危机发生并威胁意识与人格主导时\",\"scope\":\"维持清醒并选择如何应对当前危机\",\"successOutcome\":\"维持本次清醒并争取应对时间，但威胁继续存在\",\"failureOutcome\":\"玩家在停止当前行动、接受已说明的衰败状态或消耗关键延缓资源之间选择\",\"boundary\":\"失败不能替玩家决定遗言、关系或最终选择\"}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"命数衰败与最终解决线\",\"objective\":\"查清{{threatSource}}，延缓{{declineSigns}}并验证{{possibleSolution}}，最终面对解决节点。\",\"stages\":[\"确认威胁来源与首批衰败征兆\",\"验证升级节点和至少一条延缓手段\",\"取得可能解法所需的关键条件\",\"完成最终解决、转化或承担终局后果\"],\"boundary\":\"{{hardBoundary}}\"}},{\"id\":\"broken_engagement\",\"name\":\"退婚流体质\",\"cost\":-15,\"tag\":\"家族冲突\",\"description\":\"一段婚约及其公开冲突会持续牵动家族关系、名誉与角色立场。\",\"availability\":\"character-create-only\",\"narrative\":{\"scope\":\"{{betrothedParty}}、{{relatedFamilies}}、婚约、公开交涉与家族关系。\",\"effectFact\":\"婚约冲突源于{{conflictOrigin}}，玩家当前立场为{{playerPosition}}。\",\"boundary\":\"婚约不能自动制造爱情、背叛或情敌；{{routeBoundary}}\",\"usageCondition\":\"相关家族公开交涉，或角色遭受与婚约直接相关的公开羞辱时。\",\"maintenanceCondition\":\"婚约、家族利益、未解决名誉冲突和公开承诺会维持路线。\",\"costConsequence\":\"可能造成关系破裂、家族施压、名誉损失、资源冲突或公开对立。\",\"recoveryCondition\":\"通过澄清立场、谈判、解除婚约、改变家族关系或承担公开结果处理。\",\"growthCondition\":\"沿保留、重议、解除或反抗路线明确双方与家族关系。\",\"worldLimitedUses\":\"每次独立公开冲突分别结算，不能反复利用同一羞辱触发。\"},\"configSchema\":{\"title\":\"退婚流体质配置\",\"fields\":[{\"key\":\"betrothedParty\",\"label\":\"婚约对象\",\"required\":true},{\"key\":\"relatedFamilies\",\"label\":\"相关家族\",\"type\":\"textarea\",\"required\":true},{\"key\":\"conflictOrigin\",\"label\":\"冲突起点\",\"type\":\"textarea\",\"required\":true},{\"key\":\"playerPosition\",\"label\":\"玩家立场\",\"type\":\"textarea\",\"required\":true},{\"key\":\"routeBoundary\",\"label\":\"路线边界\",\"type\":\"textarea\",\"default\":\"只使用玩家已配置的婚约与家族事实，不自动制造恋爱、情敌、背叛或NTR；任何关系变化都必须由正文事件建立。\",\"required\":true}]},\"checkRules\":[{\"id\":\"broken-engagement-negotiation\",\"name\":\"婚约家族交涉\",\"type\":\"passive\",\"applicableAttributes\":[\"presence\"],\"baseDc\":0,\"fixedModifier\":-2,\"advantageSteps\":0,\"trigger\":\"与{{relatedFamilies}}围绕婚约进行公开交涉时\",\"scope\":\"相关气场检定\",\"successOutcome\":\"按最终检定结果表达{{playerPosition}}并争取条件\",\"failureOutcome\":\"遭遇名誉、关系、资源或谈判条件上的明确代价\",\"boundary\":\"私下无关交涉和不知情人物不受影响\"},{\"id\":\"broken-engagement-restraint\",\"name\":\"退婚羞辱克制\",\"type\":\"dc\",\"primaryAttribute\":\"presence\",\"baseDc\":12,\"fixedModifier\":0,\"advantageSteps\":0,\"trigger\":\"因婚约遭受公开羞辱后准备避免升级冲突时\",\"scope\":\"保持人格主导并选择回应方式\",\"successOutcome\":\"角色可自行决定回应、谈判或离开\",\"failureOutcome\":\"玩家选择升级回应，或承担公开让步、名誉与关系代价后脱身\",\"boundary\":\"失败不能自动开始战斗或决定感情态度\"}],\"longTermLine\":{\"type\":\"threat\",\"name\":\"婚约与家族公开冲突线\",\"objective\":\"围绕{{betrothedParty}}、{{relatedFamilies}}和{{playerPosition}}解决婚约、名誉与家族关系。\",\"stages\":[\"确认婚约事实、双方立场和冲突起点\",\"经历一次有反应窗口的公开交涉\",\"承担或修复家族与名誉后果\",\"完成保留、重议、解除或反抗路线\"],\"boundary\":\"{{routeBoundary}}\"}}],\"tables\":[{\"id\":\"player\",\"displayName\":\"玩家档案\",\"physicalName\":\"player_profile\"},{\"id\":\"souls\",\"displayName\":\"武魂\",\"physicalName\":\"martial_souls\"},{\"id\":\"abilities\",\"displayName\":\"能力与天赋\",\"physicalName\":\"abilities_traits\"},{\"id\":\"titleLibrary\",\"displayName\":\"称号库\",\"physicalName\":\"title_library\"},{\"id\":\"equippedTitles\",\"displayName\":\"已装备称号\",\"physicalName\":\"equipped_titles\"},{\"id\":\"soulBones\",\"displayName\":\"魂骨\",\"physicalName\":\"soul_bones\"},{\"id\":\"soulSpirits\",\"displayName\":\"魂灵契约\",\"physicalName\":\"soul_spirit_contracts\"},{\"id\":\"battleArmor\",\"displayName\":\"斗铠\",\"physicalName\":\"battle_armor\"},{\"id\":\"mecha\",\"displayName\":\"机甲\",\"physicalName\":\"mecha\"},{\"id\":\"soulDevices\",\"displayName\":\"魂导器\",\"physicalName\":\"soul_devices\"},{\"id\":\"backpack\",\"displayName\":\"背包物品\",\"physicalName\":\"backpack_items\"},{\"id\":\"characters\",\"displayName\":\"重要人物档案\",\"physicalName\":\"important_characters\"},{\"id\":\"locations\",\"displayName\":\"地点与势力\",\"physicalName\":\"locations_factions\"},{\"id\":\"shortSummary\",\"displayName\":\"小总结\",\"physicalName\":\"short_summary\"},{\"id\":\"longSummary\",\"displayName\":\"大总结\",\"physicalName\":\"long_summary\"}]};\nconst DLCC_CATALOG = {\"chapterSeries\":{\"dou1\":{\"eraEntry\":\"🗺️斗一：世界格局\",\"rangeEntry\":\"📖斗一：章节区间表\",\"entryPrefix\":\"📖斗一：\",\"chapters\":[[\"序章\",\"\\u003c 斗罗历1637年1月1日\"],[\"第一章\",\"斗罗历1637年1月1日\"],[\"第二章\",\"斗罗历1637年3月1日\"],[\"第三章\",\"斗罗历1637年3月15日\"],[\"第四章\",\"斗罗历1643年8月1日\"],[\"第五章\",\"斗罗历1643年8月10日\"],[\"第六章\",\"斗罗历1643年8月25日\"],[\"第七章\",\"斗罗历1643年9月1日\"],[\"第八章\",\"斗罗历1643年9月15日\"],[\"第九章\",\"斗罗历1643年10月1日\"],[\"第十章\",\"斗罗历1643年11月1日\"],[\"第十一章\",\"斗罗历1643年11月15日\"],[\"第十二章\",\"斗罗历1644年2月1日\"],[\"第十三章\",\"斗罗历1644年4月1日\"],[\"第十四章\",\"斗罗历1644年6月1日\"],[\"第十五章\",\"斗罗历1645年4月1日\"],[\"第十六章\",\"斗罗历1645年7月1日\"],[\"第十七章\",\"斗罗历1645年9月1日\"],[\"第十八章\",\"斗罗历1645年10月1日\"],[\"第十九章\",\"斗罗历1645年11月1日\"],[\"第二十章\",\"斗罗历1647年6月1日\"],[\"第二十一章\",\"斗罗历1647年7月1日\"],[\"第二十二章\",\"斗罗历1649年8月1日\"],[\"第二十三章\",\"斗罗历1651年6月1日\"],[\"第二十四章\",\"斗罗历1651年7月1日\"],[\"第二十五章\",\"斗罗历1652年1月1日\"],[\"第二十六章\",\"斗罗历1652年4月1日\"],[\"第二十七章\",\"斗罗历1652年6月1日\"],[\"第二十八章\",\"斗罗历1652年7月1日\"],[\"第二十九章\",\"斗罗历1655年8月1日\"],[\"第三十章\",\"斗罗历1655年10月1日\"],[\"第三十一章\",\"斗罗历1656年1月1日\"],[\"第三十二章\",\"斗罗历1656年4月1日\"]]},\"dou2\":{\"eraEntry\":\"🗺️斗二：世界格局\",\"rangeEntry\":\"📖斗二：章节区间表\",\"entryPrefix\":\"📖斗二：\",\"chapters\":[[\"序章\",\"\\u003c 斗罗历1956年3月17日\",\"命运伏笔\"],[\"第一章\",\"斗罗历1956年3月23日\",\"星斗奇缘\"],[\"第二章\",\"斗罗历1956年4月1日\",\"学院初日\"],[\"第三章\",\"斗罗历1956年4月2日\",\"暗流初涌\"],[\"第四章\",\"斗罗历1956年7月2日\",\"武魂共鸣\"],[\"第五章\",\"斗罗历1956年7月6日\",\"淘汰风暴\"],[\"第六章\",\"斗罗历1956年7月8日\",\"冠军之路\"],[\"第七章\",\"斗罗历1957年3月11日\",\"极北造化\"],[\"第八章\",\"斗罗历1957年4月9日\",\"锋芒毕露\"],[\"第九章\",\"斗罗历1957年5月1日\",\"赛场争锋\"],[\"第十章\",\"斗罗历1957年5月19日\",\"荣耀加冕\"],[\"第十一章\",\"斗罗历1957年8月5日\",\"风云暗涌\"],[\"第十二章\",\"斗罗历1957年8月21日\",\"薪火传承\"],[\"第十三章\",\"斗罗历1959年6月4日\",\"明都初探\"],[\"第十四章\",\"斗罗历1959年6月23日\",\"暗夜危局\"],[\"第十五章\",\"斗罗历1959年12月24日\",\"剑意冥思\"],[\"第十六章\",\"斗罗历1961年3月10日\",\"昊天惊变\"],[\"第十七章\",\"斗罗历1962年1月30日\",\"踏上归程\"],[\"第十八章\",\"斗罗历1962年2月2日\",\"缘定三生\"],[\"第十九章\",\"斗罗历1962年2月4日\",\"七怪归位\"],[\"第二十章\",\"斗罗历1962年2月10日\",\"厉兵秣马\"],[\"第二十一章\",\"斗罗历1962年2月24日\",\"剑指明都\"],[\"第二十二章\",\"斗罗历1962年5月19日\",\"决战前夜\"],[\"第二十三章\",\"斗罗历1962年5月25日\",\"明都浩劫\"],[\"第二十四章\",\"斗罗历1962年6月1日\",\"浩冬三绝\"],[\"第二十五章\",\"斗罗历1962年8月22日\",\"千里营救\"],[\"第二十六章\",\"斗罗历1962年8月29日\",\"命运献祭\"],[\"第二十七章\",\"斗罗历1962年9月7日\",\"兽潮之战\"],[\"第二十八章\",\"斗罗历1962年9月12日\",\"传灵新纪\"],[\"第二十九章\",\"斗罗历1962年12月17日\",\"西疆烽火\"],[\"第三十章\",\"斗罗历1963年1月27日\",\"舞桐初现\"],[\"第三十一章\",\"斗罗历1963年2月5日\",\"精神魂核\"],[\"第三十二章\",\"斗罗历1963年3月14日\",\"极北秘境\"],[\"第三十三章\",\"斗罗历1963年4月26日\",\"缘定今生\"],[\"第三十四章\",\"斗罗历1965年3月27日\",\"烽火连天\"],[\"第三十五章\",\"斗罗历1965年4月28日\",\"一人定鼎\"]]},\"dou3\":{\"eraEntry\":\"🗺️斗三：世界格局\",\"rangeEntry\":\"📖斗三：章节区间表\",\"entryPrefix\":\"📖斗三：\",\"chapters\":[[\"序章\",\"\\u003c 月氏纪1年1月1日\"],[\"第一章\",\"月氏纪1年1月1日\"],[\"第二章\",\"月氏纪9年9月1日\"],[\"第三章\",\"月氏纪10年9月1日\"],[\"第四章\",\"月氏纪11年1月1日\"],[\"第五章\",\"月氏纪11年3月1日\"],[\"第六章\",\"月氏纪11年6月1日\"],[\"第七章\",\"月氏纪14年3月1日\"],[\"第八章\",\"月氏纪14年6月1日\"],[\"第九章\",\"月氏纪14年9月1日\"],[\"第十章\",\"月氏纪14年11月1日\"],[\"第十一章\",\"月氏纪15年1月1日\"],[\"第十二章\",\"月氏纪15年3月1日\"],[\"第十三章\",\"月氏纪15年4月1日\"],[\"第十四章\",\"月氏纪15年9月1日\"],[\"第十五章\",\"月氏纪15年11月1日\"],[\"第十六章\",\"月氏纪16年3月1日\"],[\"第十七章\",\"月氏纪16年5月1日\"],[\"第十八章\",\"月氏纪18年9月1日\"],[\"第十九章\",\"月氏纪18年12月1日\"],[\"第二十章\",\"月氏纪19年2月1日\"],[\"第二十一章\",\"月氏纪19年4月1日\"],[\"第二十二章\",\"月氏纪19年6月1日\"],[\"第二十三章\",\"月氏纪19年8月1日\"],[\"第二十四章\",\"月氏纪20年2月1日\"],[\"第二十五章\",\"月氏纪20年7月1日\"],[\"第二十六章\",\"月氏纪20年10月1日\"],[\"第二十七章\",\"月氏纪20年12月1日\"],[\"第二十八章\",\"月氏纪21年3月1日\"],[\"第二十九章\",\"月氏纪21年9月1日\"],[\"第三十章\",\"月氏纪21年12月1日\"],[\"第三十一章\",\"月氏纪22年3月1日\"],[\"第三十二章\",\"月氏纪23年2月1日\"],[\"第三十三章\",\"月氏纪23年6月1日\"],[\"第三十四章\",\"月氏纪24年1月1日\"],[\"第三十五章\",\"月氏纪24年4月1日\"],[\"第三十六章\",\"月氏纪24年5月1日\"]]}},\"chapterPhases\":{\"dou4\":{\"eraEntry\":\"👤斗四：世界总纲\",\"rangeEntry\":\"👤斗四：世界总纲\",\"period\":\"第四纪元·星海征途\",\"chapters\":[[\"第一学部\",\"🧬斗四：第一学部\"],[\"第二学部\",\"🧬斗四：第二学部\"],[\"第三学部\",\"🧬斗四：第三学部\"],[\"第四学部\",\"🧬斗四：第四学部\"],[\"第五学部\",\"🧬斗四：第五学部\"],[\"第六学部\",\"🧬斗四：第六学部\"],[\"百万构造体协作验证\",\"🧬斗四：百万构造体协作验证\"],[\"森罗条约\",\"🧬斗四：森罗条约\"],[\"森罗万灵祭\",\"🧬斗四：森罗万灵祭\"],[\"龙马\",\"🏛️斗四：龙马\"]]}},\"relationshipTendencies\":[\"陌生\",\"同学\",\"竞争者\",\"队友\",\"救命恩人\",\"导师线\",\"自定义\"],\"profileTypes\":[{\"id\":\"companions\",\"title\":\"同伴\",\"empty\":\"尚未预留同伴。\"},{\"id\":\"rivals\",\"title\":\"宿敌\",\"empty\":\"尚未预留宿敌。\"},{\"id\":\"customNpcs\",\"title\":\"自定义 NPC\",\"empty\":\"尚未预留自定义 NPC。\"}],\"bondGroupsByEra\":{\"dou1\":[{\"id\":\"dou1_protagonist\",\"name\":\"主角版本\",\"note\":\"斗一时代核心角色条目控制。\",\"options\":[{\"id\":\"tangsan\",\"name\":\"唐三\",\"gender\":\"男性\",\"version\":\"原著主线\",\"entries\":[\"👤斗一：唐三Q\"],\"keys\":[\"唐三\",\"小三\",\"三哥\",\"千手修罗\"]},{\"id\":\"xiaowu\",\"name\":\"小舞\",\"gender\":\"女性\",\"version\":\"原著主线\",\"entries\":[\"👤斗一：小舞Q\"],\"keys\":[\"小舞\"]}]}],\"dou2\":[{\"id\":\"dou2_protagonist\",\"name\":\"主角版本\",\"note\":\"霍雨浩 / 霍雨儿为互斥角色版本。\",\"options\":[{\"id\":\"huoyuhao\",\"name\":\"霍雨浩\",\"gender\":\"男性\",\"version\":\"灵眸男主\",\"entries\":[\"🧩绝世唐门男主：霍雨浩（男）（三选一）Q\"],\"keys\":[\"霍雨浩\",\"雨浩\",\"小霍\",\"灵冰\"]},{\"id\":\"huoyuer\",\"name\":\"霍雨儿\",\"gender\":\"女性\",\"version\":\"女主版本\",\"entries\":[\"🧩绝世唐门女主：霍雨儿（女）（三选一）Q\"],\"keys\":[\"霍雨儿\",\"雨儿\",\"霍雨浩\",\"雨浩\"]},{\"id\":\"huoyuer_beast\",\"name\":\"霍雨儿\",\"gender\":\"女性\",\"version\":\"兽武魂天胡开局\",\"entries\":[\"🧩绝世唐门女主：霍雨儿（女（兽武魂天胡开局版本））（三选一）Q\"],\"keys\":[\"霍雨儿\",\"雨儿\",\"灵冰\",\"灵眸\"]}]},{\"id\":\"dou2_wangdong\",\"name\":\"王冬 / 舞桐\",\"note\":\"二代主线重要角色版本。\",\"options\":[{\"id\":\"wangdong\",\"name\":\"王冬\",\"gender\":\"女性伪装\",\"version\":\"学院期\",\"entries\":[\"👤斗二：王冬Q\"],\"keys\":[\"王冬\",\"王冬儿\",\"冬儿\"]},{\"id\":\"tangwutong\",\"name\":\"唐舞桐\",\"gender\":\"女性\",\"version\":\"神界公主\",\"entries\":[\"👤斗二：唐舞桐Q\"],\"keys\":[\"唐舞桐\",\"舞桐\",\"小七\"]}]}],\"dou3\":[{\"id\":\"dou3_protagonist\",\"name\":\"唐舞麟 / 舞琳版本\",\"note\":\"与世界书三选一条目对齐。\",\"options\":[{\"id\":\"tangwulin\",\"name\":\"唐舞麟\",\"gender\":\"男性\",\"version\":\"金龙王男主\",\"entries\":[\"🧩龙王传说男主：唐舞麟Q\"],\"keys\":[\"唐舞麟\",\"舞麟\",\"金龙\",\"龙王\"]},{\"id\":\"tangwulin_female\",\"name\":\"唐舞琳\",\"gender\":\"女性\",\"version\":\"金龙王女主\",\"entries\":[\"🧩龙王传说女主： 唐舞琳（金龙王版本）已完成\"],\"keys\":[\"唐舞麟\",\"舞麟\",\"舞琳\",\"唐舞琳\",\"金龙\"]},{\"id\":\"tangwulin_female_beast\",\"name\":\"唐舞琳\",\"gender\":\"女性\",\"version\":\"兽武魂金龙王\",\"entries\":[\"🧩兽武魂金龙王： 唐舞琳（金龙王版本，使用兽武魂而非蓝银草）已完成\"],\"keys\":[\"唐舞麟\",\"舞麟\",\"舞琳\",\"唐舞琳\",\"金龙\"]},{\"id\":\"tangwuling\",\"name\":\"唐舞灵\",\"gender\":\"女性\",\"version\":\"非金龙王\",\"entries\":[\"🧩非金龙王：  唐舞灵（非金龙，与舞麟，舞琳三选一开）需要更改\"],\"keys\":[\"唐舞麟\",\"舞麟\",\"舞琳\",\"唐舞灵\"]}]},{\"id\":\"dou3_wuchangkong\",\"name\":\"舞长空版本\",\"note\":\"导师性别版本互斥。\",\"options\":[{\"id\":\"wuchangkong_male\",\"name\":\"舞长空\",\"gender\":\"男性\",\"version\":\"原版导师\",\"entries\":[\"👤斗三：舞长空Q\"],\"keys\":[\"舞长空\",\"舞老师\",\"天霜\"]},{\"id\":\"wuchangkong_female\",\"name\":\"舞长空\",\"gender\":\"女性\",\"version\":\"女版导师\",\"entries\":[\"👤斗三：舞长空（女）\"],\"keys\":[\"舞长空\",\"舞老师\",\"天霜\"]}]},{\"id\":\"dou3_shrek_partner\",\"name\":\"史莱克同伴\",\"note\":\"按需选择一项作为重点羁绊。\",\"options\":[{\"id\":\"guyue\",\"name\":\"古月\",\"gender\":\"女性\",\"version\":\"银龙线前期\",\"entries\":[\"👤斗三：古月（已完成）\"],\"keys\":[\"古月\"]},{\"id\":\"xiexie\",\"name\":\"谢邂\",\"gender\":\"男性\",\"version\":\"史莱克七怪\",\"entries\":[\"👤斗三：谢邂Q\"],\"keys\":[\"谢邂\",\"史莱克七怪\"]},{\"id\":\"xuxiaoyan\",\"name\":\"许小言\",\"gender\":\"女性\",\"version\":\"史莱克七怪\",\"entries\":[\"👤斗三：许小言（已完成）\"],\"keys\":[\"许小言\",\"小言\",\"史莱克七怪\"]}]}],\"dou4\":[{\"id\":\"dou4_protagonist\",\"name\":\"星海主角版本\",\"note\":\"斗四时代角色版本控制。\",\"options\":[{\"id\":\"lanxuanyu_female\",\"name\":\"蓝萱羽\",\"gender\":\"女性\",\"version\":\"龙神线\",\"entries\":[\"👤斗四：蓝萱羽\"],\"keys\":[\"龙\",\"星辉\",\"龙王\",\"龙神\",\"萱羽\"]},{\"id\":\"tangwulin_dou4\",\"name\":\"唐舞琳\",\"gender\":\"女性\",\"version\":\"乐辉星 / 歌姬\",\"entries\":[\"🧩斗四：唐舞琳\"],\"keys\":[\"金龙\",\"舞琳\",\"乐辉星\",\"歌姬\"]}]},{\"id\":\"dou4_silver_dragon\",\"name\":\"银龙版本\",\"note\":\"古月娜 / 古月璃二选一。\",\"options\":[{\"id\":\"guyuena\",\"name\":\"古月娜\",\"gender\":\"女性\",\"version\":\"银龙王\",\"entries\":[\"🧬斗四：古月娜\"],\"keys\":[\"银龙\",\"古月娜\",\"古月\"]},{\"id\":\"guyueli\",\"name\":\"古月璃\",\"gender\":\"女性\",\"version\":\"变体版本\",\"entries\":[\"🧬斗四：古月璃\"],\"keys\":[\"银龙\",\"古月璃\",\"古月\"]}]}]}};\nconst DLCC_SCHEMA_VERSION = 2;\nconst DLCC_STAGES = [\"世界线\", \"角色档案\", \"武魂觉醒\", \"背景天赋\", \"羁绊\", \"档案确认\"];\nconst DLCC_ROOT = (() => {\n  const script = document.currentScript;\n  if (script && script.previousElementSibling && script.previousElementSibling.matches(\".ds8[data-root]\")) return script.previousElementSibling;\n  return Array.from(document.querySelectorAll(\".ds8[data-root]\")).pop() || null;\n})();\n\nif (!DLCC_ROOT || DLCC_ROOT.dataset.dlccV2Mounted === \"1\") return;\nDLCC_ROOT.dataset.dlccV2Mounted = \"1\";\n\nconst dlcc$ = (selector, base = DLCC_ROOT) => base && base.querySelector(selector);\nconst dlcc$$ = (selector, base = DLCC_ROOT) => base ? Array.from(base.querySelectorAll(selector)) : [];\nconst dlccClone = value => JSON.parse(JSON.stringify(value));\nconst dlccText = value => String(value == null ? \"\" : value);\nconst dlccTrim = value => dlccText(value).trim();\nconst dlccEsc = value => dlccText(value).replace(/[&\u003c>\"']/g, char => ({ \"&\": \"&amp;\", \"\u003c\": \"&lt;\", \">\": \"&gt;\", '\"': \"&quot;\", \"'\": \"&#39;\" }[char]));\nconst dlccId = prefix => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;\n\nfunction dlccPathGet(object, path) {\n  return dlccText(path).split(\".\").filter(Boolean).reduce((value, key) => value == null ? undefined : value[key], object);\n}\n\nfunction dlccPathSet(object, path, value) {\n  const keys = dlccText(path).split(\".\").filter(Boolean);\n  if (!keys.length) return object;\n  let cursor = object;\n  keys.slice(0, -1).forEach(key => {\n    if (!cursor[key] || typeof cursor[key] !== \"object\") cursor[key] = {};\n    cursor = cursor[key];\n  });\n  cursor[keys[keys.length - 1]] = value;\n  return object;\n}\n\nfunction dlccHostWindows() {\n  const list = [window];\n  try { if (window.parent && window.parent !== window) list.push(window.parent); } catch (_) {}\n  try { if (window.top && !list.includes(window.top)) list.push(window.top); } catch (_) {}\n  return list;\n}\n\nconst DLCC_HOSTS = dlccHostWindows();\n\nfunction dlccHostGlobal(name) {\n  for (const host of DLCC_HOSTS) {\n    try { if (host && host[name] != null) return host[name]; } catch (_) {}\n  }\n  return null;\n}\n\nfunction dlccContext() {\n  for (const host of DLCC_HOSTS) {\n    try {\n      if (host.SillyTavern && typeof host.SillyTavern.getContext === \"function\") return host.SillyTavern.getContext();\n    } catch (_) {}\n  }\n  return null;\n}\n\nfunction dlccStorage() {\n  for (const host of DLCC_HOSTS) {\n    try { if (host.localStorage) return host.localStorage; } catch (_) {}\n  }\n  try { return localStorage; } catch (_) { return null; }\n}\n\nfunction dlccResult(ok, code, message, data = null) {\n  return { ok: !!ok, code: code || (ok ? \"ok\" : \"error\"), message: message || \"\", data };\n}\n\nfunction dlccNewSoul(index) {\n  return {\n    id: `soul-${index + 1}`,\n    unlocked: index === 0,\n    name: \"\",\n    quality: index === 0 ? \"top\" : \"mid\",\n    category: \"兽武魂\",\n    normalAttributes: [],\n    specialAttributes: [],\n    customAttribute: \"\",\n    extreme: { enabled: false, attribute: \"\" },\n    dominance: \"均衡型\",\n    bodySoul: {\n      part: \"躯干\",\n      description: \"\",\n      resonanceDirection: \"\",\n      secondAwakeningGoal: \"\",\n      trainingMethod: \"\",\n      mutationRisk: \"\",\n      mutationNote: \"\",\n    },\n    appearance: \"\",\n    combatStyle: \"\",\n    limits: \"\",\n    notes: \"\",\n  };\n}\n\nfunction dlccChapterOptions(eraId) {\n  const series = DLCC_CATALOG.chapterSeries[eraId];\n  if (series) {\n    const fixed = series.chapters.map((chapter, index) => {\n      const [id, start, title = \"\"] = chapter;\n      const next = series.chapters[index + 1];\n      const timeRange = start.startsWith(\"\u003c \")\n        ? `早于${start.slice(2)}`\n        : next\n          ? `${start} 至 ${next[1].replace(/^\u003c\\s*/, \"\")}之前`\n          : `${start}起`;\n      return {\n        id,\n        label: title ? `${id}：${title}` : id,\n        entry: `${series.entryPrefix}${id}`,\n        eraEntry: series.eraEntry,\n        rangeEntry: series.rangeEntry,\n        timeRange,\n      };\n    });\n    return fixed.concat({ id: \"自定义章节\", label: \"自定义章节\", entry: \"\", eraEntry: series.eraEntry, rangeEntry: series.rangeEntry, timeRange: \"由 Agent 根据玩家文本与世界书判断\" });\n  }\n  const phase = DLCC_CATALOG.chapterPhases[eraId];\n  if (phase) {\n    return phase.chapters.map(([id, entry]) => ({\n      id,\n      label: id,\n      entry,\n      eraEntry: phase.eraEntry,\n      rangeEntry: phase.rangeEntry,\n      timeRange: `${phase.period} / ${id}资料阶段（世界书未提供固定日期）`,\n    })).concat({ id: \"自定义章节\", label: \"自定义章节\", entry: \"\", eraEntry: phase.eraEntry, rangeEntry: phase.rangeEntry, timeRange: \"由 Agent 根据玩家文本与世界书判断\" });\n  }\n  return [{ id: \"自定义章节\", label: \"自定义章节\", entry: \"\", eraEntry: \"\", rangeEntry: \"\", timeRange: \"由 Agent 根据玩家文本与世界书判断\" }];\n}\n\nfunction dlccChapterOption(eraId, value) {\n  const text = dlccTrim(value);\n  return dlccChapterOptions(eraId).find(item => item.id === text || item.label === text) || null;\n}\n\nfunction dlccNormalizeWorldDraft(input) {\n  const era = DLCC_RULES.eras.find(item => item.id === input.eraId) || DLCC_RULES.eras[0];\n  const world = { ...input, eraId: era.id };\n  const selected = dlccChapterOption(era.id, world.chapter);\n  if (selected) world.chapter = selected.id;\n  else if (dlccTrim(world.chapter)) {\n    if (!dlccTrim(world.customChapter)) world.customChapter = dlccTrim(world.chapter);\n    world.chapter = \"自定义章节\";\n  } else world.chapter = dlccChapterOptions(era.id)[0].id;\n  if (!era.locations.includes(world.location)) world.location = era.locations[0];\n  return world;\n}\n\nfunction dlccBondGroups(eraId) {\n  return DLCC_CATALOG.bondGroupsByEra[eraId] || [];\n}\n\nfunction dlccAllBondGroups() {\n  return Object.values(DLCC_CATALOG.bondGroupsByEra).flat();\n}\n\nfunction dlccEmptyBondProfiles() {\n  return Object.fromEntries(DLCC_CATALOG.profileTypes.map(type => [type.id, []]));\n}\n\nfunction dlccNormalizeBonds(input) {\n  const source = input && typeof input === \"object\" && !Array.isArray(input) ? input : {};\n  const selections = source.selections && typeof source.selections === \"object\" && !Array.isArray(source.selections) ? { ...source.selections } : {};\n  const relations = source.relations && typeof source.relations === \"object\" && !Array.isArray(source.relations) ? { ...source.relations } : {};\n  const profiles = dlccEmptyBondProfiles();\n  const sourceProfiles = source.profiles && typeof source.profiles === \"object\" && !Array.isArray(source.profiles) ? source.profiles : {};\n  DLCC_CATALOG.profileTypes.forEach(type => {\n    if (!Array.isArray(sourceProfiles[type.id])) return;\n    profiles[type.id] = sourceProfiles[type.id].map(item => ({\n      name: dlccText(item && item.name),\n      identity: dlccText(item && item.identity),\n      relationship: dlccText(item && item.relationship),\n      favorTrend: dlccText(item && item.favorTrend),\n      plotPurpose: dlccText(item && item.plotPurpose),\n      notes: dlccText(item && item.notes),\n    }));\n  });\n  const groups = dlccAllBondGroups();\n  Object.keys(selections).forEach(groupId => {\n    const group = groups.find(item => item.id === groupId);\n    if (!group || !group.options.some(option => option.id === selections[groupId])) {\n      delete selections[groupId];\n      delete relations[groupId];\n    }\n  });\n  Object.keys(relations).forEach(groupId => {\n    if (!selections[groupId]) delete relations[groupId];\n    else if (!DLCC_CATALOG.relationshipTendencies.includes(relations[groupId])) relations[groupId] = \"陌生\";\n  });\n  return {\n    notes: dlccText(source.notes),\n    customCharacters: dlccText(source.customCharacters),\n    selections,\n    relations,\n    profiles,\n  };\n}\n\nfunction dlccSelectedBondCharacters(draft) {\n  const bonds = draft.bonds || dlccNormalizeBonds(null);\n  return dlccBondGroups(draft.world.eraId).map(group => {\n    const option = group.options.find(item => item.id === bonds.selections[group.id]);\n    if (!option) return null;\n    return {\n      groupId: group.id,\n      groupName: group.name,\n      id: option.id,\n      name: option.name,\n      gender: option.gender,\n      version: option.version,\n      relationshipTendency: bonds.relations[group.id] || \"陌生\",\n      worldbookEntries: dlccClone(option.entries || []),\n      worldbookKeys: dlccClone(option.keys || []),\n    };\n  }).filter(Boolean);\n}\n\nfunction dlccChapterArchiveData(draft) {\n  const eraId = draft.world.eraId;\n  const selected = dlccChapterOption(eraId, draft.world.chapter) || dlccChapterOptions(eraId)[0];\n  const custom = selected.id === \"自定义章节\";\n  const label = custom ? (dlccTrim(draft.world.customChapter) || \"自定义章节\") : selected.label;\n  const instruction = custom\n    ? `自定义章节「${label}」没有固定世界书条目；请由 Agent 根据玩家文本、时代与世界书判断应启用的章节和时间段，角色前端不直接写入世界书。`\n    : `由 Agent 控制世界书章节「${selected.entry}」，时间段为「${selected.timeRange}」；角色前端不直接写入世界书。`;\n  return {\n    chapter: label,\n    chapterId: selected.id,\n    chapterLabel: label,\n    chapterEntry: custom ? \"\" : selected.entry,\n    chapterRangeEntry: selected.rangeEntry,\n    chapterTimeRange: selected.timeRange,\n    agentChapterReminder: {\n      mode: \"reminder-only\",\n      frontendWritesWorldbook: false,\n      eraEntry: selected.eraEntry,\n      chapterEntry: custom ? \"\" : selected.entry,\n      rangeEntry: selected.rangeEntry,\n      timeRange: selected.timeRange,\n      instruction,\n    },\n  };\n}\n\nfunction dlccCreateDraft() {\n  const daily = Object.fromEntries(DLCC_RULES.dailyAttributes.map(item => [item.id, DLCC_RULES.points.dailyBase]));\n  const specialties = Object.fromEntries(DLCC_RULES.specialties.map(item => [item.id, \"none\"]));\n  return {\n    schemaVersion: DLCC_SCHEMA_VERSION,\n    world: {\n      eraId: DLCC_RULES.eras[0].id,\n      location: DLCC_RULES.eras[0].locations[0],\n      customLocation: \"\",\n      chapter: dlccChapterOptions(DLCC_RULES.eras[0].id)[0].id,\n      customChapter: \"\",\n      species: \"human\",\n      beastType: \"\",\n      beastYears: \"\",\n      beastTraits: \"\",\n    },\n    profile: { name: \"\", gender: \"\", age: \"\", role: \"\", appearance: \"\", personality: \"\", outfit: \"\", concept: \"\", goal: \"\", canonRelation: \"\" },\n    daily,\n    specialties,\n    customSpecialty: { name: \"\", rank: \"none\", scope: \"\", boundary: \"\" },\n    souls: [dlccNewSoul(0), dlccNewSoul(1), dlccNewSoul(2)],\n    traits: [],\n    traitConfigs: {},\n    customTrait: { name: \"\", scope: \"\", boundary: \"\", description: \"\", recoveryCondition: \"\" },\n    background: { presetId: \"none\", name: \"\", description: \"\" },\n    bonds: { notes: \"\", customCharacters: \"\", selections: {}, relations: {}, profiles: dlccEmptyBondProfiles() },\n  };\n}\n\nfunction dlccNormalizeDraft(input) {\n  if (!input || input.schemaVersion !== DLCC_SCHEMA_VERSION) throw new Error(\"只接受 schemaVersion=2 的角色草稿\");\n  const soulQualities = DLCC_RULES.soulQualities.map(item => item.id);\n  const soulDominance = [\"强攻\", \"控制\", \"辅助\", \"防御\", \"机动\", \"精神\", \"均衡型\"];\n  (Array.isArray(input.souls) ? input.souls : []).forEach((soul, index) => {\n    if (!soul || typeof soul !== \"object\") return;\n    if (dlccTrim(soul.quality) && !soulQualities.includes(soul.quality)) throw new Error(`souls[${index}].quality 未知品质：${soul.quality}`);\n    if (dlccTrim(soul.category) && !DLCC_RULES.soulCategories.includes(soul.category)) throw new Error(`souls[${index}].category 未知类别：${soul.category}`);\n    if (dlccTrim(soul.dominance) && !soulDominance.includes(soul.dominance)) throw new Error(`souls[${index}].dominance 未知倾向：${soul.dominance}`);\n    const bodyPart = soul.bodySoul && soul.bodySoul.part;\n    if (dlccTrim(bodyPart) && !DLCC_RULES.bodySoulParts.includes(bodyPart)) throw new Error(`souls[${index}].bodySoul.part 未知本体部位：${bodyPart}`);\n  });\n  const relations = input.bonds && input.bonds.relations;\n  if (relations && typeof relations === \"object\") Object.entries(relations).forEach(([groupId, relation]) => {\n    if (dlccTrim(relation) && !DLCC_CATALOG.relationshipTendencies.includes(relation)) throw new Error(`bonds.relations.${groupId} 未知关系倾向：${relation}`);\n  });\n  const base = dlccCreateDraft();\n  const source = dlccClone(input);\n  for (const key of [\"profile\", \"daily\", \"specialties\", \"customSpecialty\", \"customTrait\", \"background\"]) {\n    if (source[key] && typeof source[key] === \"object\") base[key] = { ...base[key], ...source[key] };\n  }\n  if (source.world && typeof source.world === \"object\") base.world = dlccNormalizeWorldDraft({ ...base.world, ...source.world });\n  else base.world = dlccNormalizeWorldDraft(base.world);\n  base.bonds = dlccNormalizeBonds(source.bonds);\n  if (Array.isArray(source.souls)) base.souls = [0, 1, 2].map(index => dlccNormalizeSoul(source.souls[index], index));\n  if (Array.isArray(source.traits)) base.traits = Array.from(new Set(source.traits.filter(id => DLCC_RULES.traits.some(item => item.id === id))));\n  base.traitConfigs = dlccNormalizeTraitConfigs(source.traitConfigs, source.customTrait);\n  base.schemaVersion = DLCC_SCHEMA_VERSION;\n  return base;\n}\n\nfunction dlccUniqueAllowed(values, allowed) {\n  return Array.from(new Set((Array.isArray(values) ? values : []).filter(value => allowed.includes(value))));\n}\n\nfunction dlccExtremeOptions(soul) {\n  return Array.from(new Set([...(soul.normalAttributes || []), dlccTrim(soul.customAttribute)].filter(Boolean)));\n}\n\nfunction dlccNormalizeSoul(input, index) {\n  const defaults = dlccNewSoul(index);\n  const source = input && typeof input === \"object\" && !Array.isArray(input) ? input : {};\n  const legacyAttributes = Array.isArray(source.attributes) ? source.attributes : [];\n  const normalSource = Array.isArray(source.normalAttributes) ? source.normalAttributes : legacyAttributes;\n  const specialSource = Array.isArray(source.specialAttributes) ? source.specialAttributes : legacyAttributes;\n  const extremeSource = source.extreme && typeof source.extreme === \"object\" && !Array.isArray(source.extreme)\n    ? source.extreme\n    : { enabled: !!source.isExtreme, attribute: source.extremeAttribute || \"\" };\n  const bodySource = source.bodySoul && typeof source.bodySoul === \"object\" && !Array.isArray(source.bodySoul)\n    ? source.bodySoul\n    : {};\n  const soul = {\n    ...defaults,\n    ...source,\n    id: `soul-${index + 1}`,\n    unlocked: index === 0 ? true : !!source.unlocked,\n    normalAttributes: dlccUniqueAllowed(normalSource, DLCC_RULES.soulNormalAttributes),\n    specialAttributes: dlccUniqueAllowed(specialSource, DLCC_RULES.soulSpecialAttributes),\n    customAttribute: dlccTrim(source.customAttribute),\n    bodySoul: { ...defaults.bodySoul, ...bodySource },\n  };\n  delete soul.attributes;\n  delete soul.isExtreme;\n  delete soul.extremeAttribute;\n  const options = dlccExtremeOptions(soul);\n  const attribute = dlccTrim(extremeSource.attribute);\n  soul.extreme = { enabled: !!extremeSource.enabled && options.includes(attribute), attribute: options.includes(attribute) ? attribute : \"\" };\n  return soul;\n}\n\nfunction dlccRankCost(rank) {\n  return Number(DLCC_RULES.points.specialtyCosts[rank] || 0);\n}\n\nfunction dlccDailyCost(value) {\n  return Number(DLCC_RULES.points.dailyCosts[String(value)] ?? 999);\n}\n\nfunction dlccQuality(id) {\n  return DLCC_RULES.soulQualities.find(item => item.id === id) || DLCC_RULES.soulQualities[0];\n}\n\nfunction dlccBackground(id) {\n  return DLCC_RULES.backgroundPresets.find(item => item.id === id) || DLCC_RULES.backgroundPresets[0];\n}\n\nfunction dlccTrait(id) {\n  return DLCC_RULES.traits.find(item => item.id === id) || null;\n}\n\nfunction dlccTraitConfigDefaults(trait) {\n  const fields = trait && trait.configSchema && Array.isArray(trait.configSchema.fields) ? trait.configSchema.fields : [];\n  return Object.fromEntries(fields.map(field => [field.key, dlccText(field.default)]));\n}\n\nfunction dlccNormalizeTraitConfigs(input, legacyCustomTrait) {\n  const source = input && typeof input === \"object\" && !Array.isArray(input) ? input : {};\n  const incomingCustom = source.custom_specialty && typeof source.custom_specialty === \"object\" && !Array.isArray(source.custom_specialty) ? source.custom_specialty : null;\n  const result = {};\n  DLCC_RULES.traits.forEach(trait => {\n    if (!trait.configSchema) return;\n    const values = source[trait.id] && typeof source[trait.id] === \"object\" && !Array.isArray(source[trait.id]) ? source[trait.id] : {};\n    result[trait.id] = { ...dlccTraitConfigDefaults(trait) };\n    trait.configSchema.fields.forEach(field => { if (Object.prototype.hasOwnProperty.call(values, field.key)) result[trait.id][field.key] = dlccText(values[field.key]); });\n  });\n  if (legacyCustomTrait && result.custom_specialty && (!incomingCustom || !Object.values(incomingCustom).some(dlccTrim))) {\n    result.custom_specialty = {\n      ...result.custom_specialty,\n      name: dlccText(legacyCustomTrait.name),\n      scope: dlccText(legacyCustomTrait.scope),\n      effectFact: dlccText(legacyCustomTrait.description),\n      boundary: dlccText(legacyCustomTrait.boundary),\n      recoveryCondition: dlccText(legacyCustomTrait.recoveryCondition),\n    };\n  }\n  return result;\n}\n\nfunction dlccResolveTemplate(value, config) {\n  if (Array.isArray(value)) return value.map(item => dlccResolveTemplate(item, config));\n  if (value && typeof value === \"object\") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, dlccResolveTemplate(item, config)]));\n  if (typeof value !== \"string\") return value;\n  return value.replace(/\\{\\{([^}]+)\\}\\}/g, (_, key) => dlccTrim(config[key]) || `未填写${key}`);\n}\n\nfunction dlccResolvedNarrative(trait, config) {\n  const narrative = dlccResolveTemplate(dlccClone(trait.narrative || {}), config || {});\n  if (trait.id !== \"custom_specialty\") return narrative;\n  return {\n    scope: dlccTrim(config.scope) || narrative.scope,\n    effectFact: dlccTrim(config.effectFact) || narrative.effectFact,\n    boundary: dlccTrim(config.boundary) || narrative.boundary,\n    usageCondition: dlccTrim(config.usageCondition) || narrative.usageCondition,\n    maintenanceCondition: dlccTrim(config.maintenanceCondition) || narrative.maintenanceCondition,\n    costConsequence: dlccTrim(config.costConsequence) || narrative.costConsequence,\n    recoveryCondition: dlccTrim(config.recoveryCondition) || narrative.recoveryCondition,\n    growthCondition: dlccTrim(config.growthCondition) || narrative.growthCondition,\n    worldLimitedUses: dlccTrim(config.worldLimitedUses) || narrative.worldLimitedUses,\n  };\n}\n\nfunction dlccAttributeName(id) {\n  const attribute = DLCC_RULES.dailyAttributes.find(item => item.id === id);\n  return attribute ? attribute.name : dlccText(id || \"未指定属性\");\n}\n\nfunction dlccResolvedCheckRules(trait, config) {\n  return dlccResolveTemplate(dlccClone(Array.isArray(trait && trait.checkRules) ? trait.checkRules : []), config || {});\n}\n\nfunction dlccSignedNumber(value) {\n  const number = Number(value || 0);\n  return number > 0 ? `＋${number}` : number \u003c 0 ? `−${Math.abs(number)}` : \"0\";\n}\n\nfunction dlccCheckRuleSummary(rule) {\n  const attributes = rule.primaryAttribute ? [rule.primaryAttribute] : (rule.applicableAttributes || []);\n  const names = attributes.map(dlccAttributeName).join(\"/\") || \"指定属性\";\n  if (rule.type === \"dc\") return `${names}DC${Number(rule.baseDc)}`;\n  if (Number(rule.advantageSteps || 0)) return `${names}${Number(rule.advantageSteps) > 0 ? \"优势\" : \"劣势\"}${Math.abs(Number(rule.advantageSteps))}级`;\n  return `${names}${dlccSignedNumber(rule.fixedModifier)}`;\n}\n\nfunction dlccCheckRuleText(rule) {\n  const attributes = rule.primaryAttribute ? [rule.primaryAttribute] : (rule.applicableAttributes || []);\n  const names = attributes.map(dlccAttributeName).join(\"/ \") || \"指定属性\";\n  const modifiers = [];\n  if (rule.type === \"dc\") modifiers.push(`基础DC${Number(rule.baseDc)}`);\n  if (Number(rule.fixedModifier || 0)) modifiers.push(`固定修正${dlccSignedNumber(rule.fixedModifier)}`);\n  if (Number(rule.advantageSteps || 0)) modifiers.push(`${Number(rule.advantageSteps) > 0 ? \"优势\" : \"劣势\"}${Math.abs(Number(rule.advantageSteps))}级`);\n  const preparations = (rule.preparations || []).map(item => {\n    const preparationAttributes = (item.attributes || []).map(dlccAttributeName).join(\"/\") || \"指定属性\";\n    const benefits = [];\n    if (Number(item.advantageSteps || 0)) benefits.push(`最终检定${Number(item.advantageSteps) > 0 ? \"优势\" : \"劣势\"}${Math.abs(Number(item.advantageSteps))}级`);\n    if (Number(item.dcModifier || 0)) benefits.push(`最终DC${dlccSignedNumber(item.dcModifier)}`);\n    return `${preparationAttributes}DC${Number(item.baseDc)}：${item.successOutcome || benefits.join(\"、\") || \"建立准备效果\"}${benefits.length && !benefits.every(text => dlccText(item.successOutcome).includes(text)) ? `（${benefits.join(\"、\")}）` : \"\"}`;\n  });\n  return [\n    `${rule.name}｜${names}${modifiers.length ? `；${modifiers.join(\"；\")}` : \"\"}`,\n    `触发：${rule.trigger}`,\n    `范围：${rule.scope}`,\n    `成功：${rule.successOutcome}`,\n    `失败：${rule.failureOutcome}`,\n    `边界：${rule.boundary}`,\n    preparations.length ? `此前准备：${preparations.join(\"；\")}` : \"\",\n  ].filter(Boolean).join(\"\\n\");\n}\n\nfunction dlccDerived(draft) {\n  const apParts = [];\n  DLCC_RULES.specialties.forEach(item => {\n    const rank = draft.specialties[item.id] || \"none\";\n    const cost = dlccRankCost(rank);\n    if (cost) apParts.push({ id: item.id, name: item.name, rank, cost, scope: item.scope });\n  });\n  const customAp = dlccRankCost(draft.customSpecialty.rank);\n  if (customAp) apParts.push({ id: \"custom\", name: draft.customSpecialty.name || \"未命名自定义专长\", rank: draft.customSpecialty.rank, cost: customAp, scope: draft.customSpecialty.scope });\n  const apSpent = apParts.reduce((sum, item) => sum + item.cost, 0);\n\n  const dpParts = DLCC_RULES.dailyAttributes.map(item => ({ ...item, value: Number(draft.daily[item.id] || 8), cost: dlccDailyCost(draft.daily[item.id]) }));\n  const dpSpent = dpParts.reduce((sum, item) => sum + item.cost, 0);\n\n  const spParts = [];\n  draft.souls.forEach((soul, index) => {\n    if (!soul.unlocked) return;\n    const slotCost = Number(DLCC_RULES.soulSlotCosts[index] || 0);\n    const qualityCost = Number(dlccQuality(soul.quality).spCost || 0);\n    if (slotCost) spParts.push({ name: `第${index + 1}武魂槽`, cost: slotCost });\n    spParts.push({ name: `${soul.name || `第${index + 1}武魂`}品质`, cost: qualityCost });\n    if (soul.extreme && soul.extreme.enabled) spParts.push({ name: `第${index + 1}武魂极致属性（${soul.extreme.attribute}）`, cost: Number(DLCC_RULES.soulExtremeCost || 0) });\n  });\n  const background = dlccBackground(draft.background.presetId);\n  if (background.cost) spParts.push({ name: background.name, cost: background.cost });\n  draft.traits.forEach(id => {\n    const trait = dlccTrait(id);\n    if (trait) spParts.push({ name: trait.name, cost: Number(trait.cost || 0) });\n  });\n  const positiveSpSpent = spParts.reduce((sum, item) => sum + Math.max(0, Number(item.cost || 0)), 0);\n  const negativeRefundRaw = spParts.reduce((sum, item) => sum + Math.max(0, -Number(item.cost || 0)), 0);\n  const negativeRefundCap = Number(DLCC_RULES.traitBudget && DLCC_RULES.traitBudget.negativeRefundCap || 0);\n  const negativeRefundApplied = Math.min(negativeRefundRaw, negativeRefundCap);\n  const spSpent = positiveSpSpent - negativeRefundApplied;\n\n  const errors = [];\n  const warnings = [];\n  if (!dlccTrim(draft.profile.name)) errors.push(\"需要填写角色姓名\");\n  if (!dlccTrim(draft.souls[0].name)) errors.push(\"需要填写第一武魂名称\");\n  if (apSpent > DLCC_RULES.points.ap) errors.push(`AP超支：${apSpent}/${DLCC_RULES.points.ap}`);\n  if (dpSpent > DLCC_RULES.points.dp) errors.push(`DP超支：${dpSpent}/${DLCC_RULES.points.dp}`);\n  if (spSpent > DLCC_RULES.points.sp) errors.push(`SP超支：${spSpent}/${DLCC_RULES.points.sp}`);\n  draft.souls.forEach((soul, index) => {\n    if (soul.unlocked && soul.extreme && soul.extreme.enabled && !dlccExtremeOptions(soul).includes(soul.extreme.attribute)) errors.push(`第${index + 1}武魂的极致属性必须来自普通或自定义属性`);\n  });\n  if (customAp && (!dlccTrim(draft.customSpecialty.name) || !dlccTrim(draft.customSpecialty.scope) || !dlccTrim(draft.customSpecialty.boundary))) errors.push(\"自定义专长必须填写名称、适用范围和能力边界\");\n  const selectedGroups = new Map();\n  draft.traits.forEach(id => {\n    const trait = dlccTrait(id);\n    if (!trait) return;\n    if (trait.exclusiveGroup) {\n      const grouped = selectedGroups.get(trait.exclusiveGroup) || [];\n      grouped.push(trait.name);\n      selectedGroups.set(trait.exclusiveGroup, grouped);\n    }\n    const config = draft.traitConfigs[id] || {};\n    const required = trait.configSchema && trait.configSchema.fields.filter(field => field.required && !dlccTrim(config[field.key])).map(field => field.label);\n    if (required && required.length) errors.push(`${trait.name}必须填写：${required.join(\"、\")}`);\n  });\n  selectedGroups.forEach(names => { if (names.length > 1) errors.push(`高阶模板互斥：请只保留一项（${names.join(\"、\")}）`); });\n  if (!apParts.length) warnings.push(\"尚未选择战斗专长\");\n  if (negativeRefundRaw > negativeRefundApplied) warnings.push(`负面特性理论返还${negativeRefundRaw}SP，实际返还${negativeRefundApplied}SP；角色创建返还上限为${negativeRefundCap}SP，所有已选负面效果仍完整保留。`);\n\n  return {\n    ap: { spent: apSpent, remain: DLCC_RULES.points.ap - apSpent, parts: apParts },\n    dp: { spent: dpSpent, remain: DLCC_RULES.points.dp - dpSpent, parts: dpParts },\n    sp: { spent: spSpent, remain: DLCC_RULES.points.sp - spSpent, parts: spParts, positiveSpent: positiveSpSpent, negativeRefundRaw, negativeRefundApplied, negativeRefundCap },\n    errors,\n    warnings,\n    valid: errors.length === 0,\n  };\n}\n\nfunction dlccArchive(draft) {\n  const derived = dlccDerived(draft);\n  const era = DLCC_RULES.eras.find(item => item.id === draft.world.eraId) || DLCC_RULES.eras[0];\n  const location = draft.world.location === \"自定义地点\" ? draft.world.customLocation : draft.world.location;\n  const chapterData = dlccChapterArchiveData(draft);\n  const specialties = derived.ap.parts.map(item => ({ id: item.id, name: item.name, rank: item.rank === \"expert\" ? \"专精\" : \"擅长\", scope: item.scope, boundary: item.id === \"custom\" ? draft.customSpecialty.boundary : \"以专长描述和已建立事实为边界\" }));\n  const traits = draft.traits.map(id => {\n    const trait = dlccTrait(id);\n    if (!trait) return null;\n    const config = dlccClone(draft.traitConfigs[id] || dlccTraitConfigDefaults(trait));\n    return {\n      id,\n      name: id === \"custom_specialty\" ? (dlccTrim(config.name) || trait.name) : trait.name,\n      kind: \"天赋模板\",\n      cost: trait.cost,\n      tag: trait.tag,\n      description: trait.description,\n      exclusiveGroup: trait.exclusiveGroup || \"\",\n      availability: trait.availability || \"always\",\n      narrative: dlccResolvedNarrative(trait, config),\n      checkRules: dlccResolvedCheckRules(trait, config),\n      config,\n      configDetails: trait.configSchema ? trait.configSchema.fields.map(field => ({ key: field.key, label: field.label, value: dlccText(config[field.key]) })) : [],\n    };\n  }).filter(Boolean);\n  const traitSoulTemplates = draft.traits.flatMap(id => {\n    const trait = dlccTrait(id);\n    const config = draft.traitConfigs[id] || {};\n    return trait && Array.isArray(trait.soulTemplates)\n      ? dlccResolveTemplate(trait.soulTemplates, config).map(template => ({ traitId: trait.id, traitName: trait.name, ...template }))\n      : [];\n  });\n  const traitAssetTemplates = draft.traits.flatMap(id => {\n    const trait = dlccTrait(id);\n    const config = draft.traitConfigs[id] || {};\n    return trait && Array.isArray(trait.assetTemplates)\n      ? dlccResolveTemplate(trait.assetTemplates, config).map(template => ({ traitId: trait.id, traitName: trait.name, ...template }))\n      : [];\n  });\n  const traitLongTermLines = draft.traits.map(id => {\n    const trait = dlccTrait(id);\n    return trait && trait.longTermLine ? { traitId: trait.id, traitName: trait.name, ...dlccResolveTemplate(trait.longTermLine, draft.traitConfigs[id] || {}) } : null;\n  }).filter(Boolean);\n  return {\n    schemaVersion: DLCC_SCHEMA_VERSION,\n    system: DLCC_RULES.systemName,\n    createdAt: new Date().toISOString(),\n    world: { eraId: era.id, era: era.name, location: location || \"未指定\", ...chapterData, species: draft.world.species, beast: draft.world.species === \"beast\" ? { type: draft.world.beastType, stage: draft.world.beastYears, traits: draft.world.beastTraits } : null },\n    profile: dlccClone(draft.profile),\n    points: { spSpent: derived.sp.spent, spRemaining: derived.sp.remain, negativeRefundRaw: derived.sp.negativeRefundRaw, negativeRefundApplied: derived.sp.negativeRefundApplied, negativeRefundCap: derived.sp.negativeRefundCap, apSpent: derived.ap.spent, dpSpent: derived.dp.spent },\n    traitCheckSystem: dlccClone(DLCC_RULES.traitCheckSystem || {}),\n    dailyAttributes: Object.fromEntries(derived.dp.parts.map(item => [item.name, item.value])),\n    specialties,\n    martialSouls: draft.souls.map((soul, index) => ({ soul, index })).filter(item => item.soul.unlocked).map(({ soul, index }) => {\n      const copy = dlccClone(soul);\n      return {\n        ...copy,\n        slot: index + 1,\n        role: [\"主武魂\", \"副武魂\", \"额外武魂\"][index],\n        qualityName: dlccQuality(soul.quality).name,\n        innate: dlccQuality(soul.quality).innate,\n        attributes: [...copy.normalAttributes, ...copy.specialAttributes],\n        bodySoul: soul.category === \"本体武魂\" ? copy.bodySoul : null,\n      };\n    }),\n    traits,\n    traitSoulTemplates,\n    traitAssetTemplates,\n    traitLongTermLines,\n    background: { ...dlccClone(draft.background), presetName: dlccBackground(draft.background.presetId).name },\n    bonds: {\n      notes: draft.bonds.notes,\n      customCharacters: draft.bonds.customCharacters,\n      selectedCharacters: dlccSelectedBondCharacters(draft),\n      profiles: dlccClone(draft.bonds.profiles),\n    },\n  };\n}\n\nfunction dlccArchiveText(archive) {\n  const specialtyText = archive.specialties.map(item => `${item.name}（${item.rank}）：${item.scope}`).join(\"；\") || \"无\";\n  const soulText = archive.martialSouls.map(item => [\n    `${item.role}「${item.name || \"未命名\"}」`,\n    `品质与先天：${item.qualityName}；${item.innate}`,\n    `类别与定位：${item.category}；${item.dominance || \"未填写\"}`,\n    `属性原稿：${[...(item.normalAttributes || []), ...(item.specialAttributes || []), item.customAttribute].filter(Boolean).join(\"、\") || \"未填写\"}${item.extreme && item.extreme.enabled ? `；极致${item.extreme.attribute}` : \"\"}`,\n    `外观原稿：${item.appearance || \"未填写\"}`,\n    `战斗主题原稿：${item.combatStyle || \"未填写\"}`,\n    `限制原稿：${item.limits || \"未填写\"}`,\n    `补充原稿：${item.notes || \"无\"}`,\n    item.bodySoul ? `本体武魂原稿：部位=${item.bodySoul.part}；说明=${item.bodySoul.description || \"未填写\"}；共鸣=${item.bodySoul.resonanceDirection || \"未填写\"}；二次觉醒=${item.bodySoul.secondAwakeningGoal || \"未填写\"}；修炼=${item.bodySoul.trainingMethod || \"未填写\"}；风险=${item.bodySoul.mutationRisk || \"未填写\"}` : \"\",\n  ].filter(Boolean).join(\"\\n\")).join(\"\\n\\n\") || \"未填写\";\n  const narrativeLabels = {\n    scope: \"适用范围\", effectFact: \"效果事实\", boundary: \"能力边界\", usageCondition: \"触发或使用条件\",\n    maintenanceCondition: \"维持条件\", costConsequence: \"代价与后果\", recoveryCondition: \"恢复条件\",\n    growthCondition: \"成长条件\", worldLimitedUses: \"世界观有限次数\",\n  };\n  const traitText = archive.traits.map((item, index) => {\n    const config = (item.configDetails || []).filter(entry => dlccTrim(entry.value)).map(entry => `${entry.label}=${entry.value}`).join(\"；\");\n    const checks = (item.checkRules || []).map((rule, ruleIndex) => `D20检定${ruleIndex + 1}：\\n${dlccCheckRuleText(rule)}`).join(\"\\n\");\n    return [`${index + 1}. ${item.name}（${item.cost}SP / ${item.tag}）`, `摘要：${item.description}`, ...Object.entries(narrativeLabels).map(([key, label]) => `${label}：${item.narrative[key] || \"未填写\"}`), checks, config ? `玩家配置：${config}` : \"\"].filter(Boolean).join(\"\\n\");\n  }).join(\"\\n\\n\") || \"无\";\n  const soulTemplateText = archive.traitSoulTemplates.map((item, index) => {\n    const forms = Array.isArray(item.forms) ? item.forms.map(form => `${form.level}级「${form.name}」${form.grade ? `（${form.grade}）` : \"\"}：${form.unlocks || \"按该阶段规则成长\"}`).join(\"\\n\") : \"\";\n    const ringPattern = item.ringPattern && typeof item.ringPattern === \"object\" ? [\n      `${item.ringPattern.name || \"魂环复合规则\"}：${(item.ringPattern.colors || []).map(color => color.name || color.effectRole).filter(Boolean).join(\" / \")}`,\n      item.ringPattern.normalModePolicy || \"\",\n      item.ringPattern.ringRecordPolicy || \"\",\n    ].filter(Boolean).join(\"；\") : \"\";\n    const trueBody = item.trueBody && typeof item.trueBody === \"object\" ? [\n      `${item.trueBody.name || \"武魂真身状态\"}：${item.trueBody.unlockCondition || \"按武魂真身规则解锁\"}`,\n      item.trueBody.clockOverride || \"\",\n      item.trueBody.causalAuthority || \"\",\n      item.trueBody.actionPermission || \"\",\n      item.trueBody.reversalBoundary || \"\",\n    ].filter(Boolean).join(\"；\") : \"\";\n    const dailySurvival = item.trueBody && item.trueBody.dailySurvival && typeof item.trueBody.dailySurvival === \"object\" ? [\n      `每个世界内自然日${item.trueBody.dailySurvival.usesPerWorldDay || 1}次`,\n      item.trueBody.dailySurvival.trigger || \"\",\n      item.trueBody.dailySurvival.effect || \"\",\n      item.trueBody.dailySurvival.reset || \"\",\n      item.trueBody.dailySurvival.retainedConsequences || \"\",\n      item.trueBody.dailySurvival.exclusions || \"\",\n    ].filter(Boolean).join(\"；\") : \"\";\n    const opening = [\n      Number.isFinite(item.startingSoulPowerLevel) ? `开局魂力等级=${item.startingSoulPowerLevel}级` : \"\",\n      item.startingForm ? `开局形态=${item.startingForm}` : \"\",\n    ].filter(Boolean).join(\"；\");\n    const rings = [\n      Number.isFinite(item.startingRingCount) ? `开局魂环=${item.startingRingCount}枚` : \"\",\n      Number.isFinite(item.ringCapacity) ? `魂环上限=${item.ringCapacity}枚` : \"\",\n      item.ringMethod || \"\",\n    ].filter(Boolean).join(\"；\");\n    const levelRules = [\n      item.growthBeyondLevelCap ? \"允许突破100级并继续成长\" : \"\",\n      Number.isFinite(item.automaticGodhoodLevel) ? `${item.automaticGodhoodLevel}级自动成神且无额外突破瓶颈` : \"\",\n      item.combatPositionFact || \"\",\n    ].filter(Boolean).join(\"；\");\n    return [\n      `${index + 1}. ${item.name}（来源特性：${item.traitName}）`,\n      `重构方式：${item.mode === \"merge-first\" ? \"融合强化玩家第一武魂\" : item.mode === \"fixed\" ? `固定核心模板，目标槽位${item.slot}` : `按玩家配置建立模板，目标槽位${item.slot}`}`,\n      `模板品质下限：${item.qualityName || \"未声明，沿用玩家原稿品质\"}${item.qualityPolicy === \"higher-wins\" ? \"；与玩家原稿冲突时取较高品质\" : \"\"}`,\n      `固定来源：${item.fixedSource || \"未填写\"}`,\n      `类型与属性：${[item.category, item.attributes].filter(Boolean).join(\"；\") || \"未填写\"}`,\n      opening ? `开局状态：${opening}` : \"\",\n      rings ? `魂环规则：${rings}` : \"\",\n      ringPattern ? `复合魂环：${ringPattern}` : \"\",\n      levelRules ? `等级与战力规则：${levelRules}` : \"\",\n      forms ? `形态与解锁：\\n${forms}` : \"\",\n      trueBody ? `武魂真身：${trueBody}` : \"\",\n      dailySurvival ? `有限因果保护：${dailySurvival}` : \"\",\n      `核心能力：${item.coreAbility || \"未填写\"}`,\n      `模板边界：${item.boundary || \"未填写\"}`,\n    ].filter(Boolean).join(\"\\n\");\n  }).join(\"\\n\\n\") || \"无\";\n  const assetText = archive.traitAssetTemplates.map((item, index) => [\n    `${index + 1}. ${item.name}（${item.assetType || \"附带资源\"}；来源特性：${item.traitName}）`,\n    ...Object.entries(item).filter(([key, value]) => ![\"traitId\", \"traitName\", \"id\", \"name\", \"assetType\"].includes(key) && dlccTrim(value)).map(([key, value]) => `${key}：${value}`),\n  ].join(\"\\n\")).join(\"\\n\\n\") || \"无\";\n  const lineType = { mission: \"任务线\", growth: \"成长线\", privilege: \"常驻剧情权限\", threat: \"负面威胁线\" };\n  const longTermText = archive.traitLongTermLines.map((item, index) => [\n    `${index + 1}. ${item.name}（${lineType[item.type] || item.type}；来源特性：${item.traitName}）`,\n    `目标：${item.objective}`,\n    `阶段：${(item.stages || []).join(\" → \") || \"按正文推进\"}`,\n    `边界：${item.boundary}`,\n  ].join(\"\\n\")).join(\"\\n\\n\") || \"无\";\n  const bondText = archive.bonds.selectedCharacters.map(item => `${item.groupName}：${item.name} / ${item.gender} / ${item.version}；关系倾向=${item.relationshipTendency}；世界书=${item.worldbookEntries.join(\"、\")}`).join(\"\\n\") || \"未选择预设角色版本\";\n  const bondProfiles = DLCC_CATALOG.profileTypes.flatMap(type => (archive.bonds.profiles[type.id] || []).filter(item => Object.values(item).some(value => dlccTrim(value))).map(item => `${type.title}：${item.name || \"未命名\"}；身份=${item.identity || \"未填写\"}；关系=${item.relationship || \"未填写\"}；好感=${item.favorTrend || \"未填写\"}；用途=${item.plotPurpose || \"未填写\"}；备注=${item.notes || \"无\"}`)).join(\"\\n\") || \"无\";\n  const umbraskDatabaseText = archive.traits.some(item => item.id === \"umbrask\")\n    ? \"安布拉斯克建档补充：武魂表只建立融合后的第一武魂行并关联 trait:umbrask。每枚实际取得的魂环在能力与天赋表只建立一条复合能力记录，将攻击（红）、防御（黄）、回复（绿）三种子效果写在同一行并共享一个魂环序号。当前正在启用的颜色与啖因果只由剧情包和总结追踪；默认颜色、跨轮长期有效的模式变化，以及每日免死的今日可用或今日已用状态与记录日期写入安布拉斯克天赋当前状态或备注，并在跨入下一个世界内自然日时重置。\"\n    : \"\";\n  return [\n    \"【斗罗角色档案 v2】\",\n    `姓名：${archive.profile.name}`,\n    `身份：${archive.profile.gender || \"未填写\"} / ${archive.profile.age || \"未填写\"} / ${archive.profile.role || \"未填写\"}`,\n    `世界线：${archive.world.era} / ${archive.world.location} / ${archive.world.chapter}`,\n    `章节时间段：${archive.world.chapterTimeRange}`,\n    `Agent章节控制提醒：${archive.world.agentChapterReminder.instruction}`,\n    `角色概念：${archive.profile.concept || \"未填写\"}`,\n    `开局目标：${archive.profile.goal || \"未填写\"}`,\n    `日常六维：${Object.entries(archive.dailyAttributes).map(([key, value]) => `${key}${value}`).join(\"、\")}`,\n    `战斗专长：${specialtyText}`,\n    \"【一、玩家原始武魂】\",\n    \"以下内容是玩家原稿，必须完整保留；它不是前端判定的最终武魂。\",\n    soulText,\n    \"【二、详细特性档案】\",\n    `D20总则：${archive.traitCheckSystem.resolutionFormula || \"选中的D20＋DP属性调整值＋固定修正＋额外骰子，对抗有效DC\"}。属性调整值＝${archive.traitCheckSystem.attributeModifierFormula || \"floor((属性值-10)/2)\"}。${archive.traitCheckSystem.advantageStacking || \"优劣势逐层相加并抵消\"}。${archive.traitCheckSystem.naturalRollPolicy || \"自然1和自然20不自动成败\"}。${archive.traitCheckSystem.singleTraitApplication || \"同一特性在一次检定中最多生效一次\"}。${archive.traitCheckSystem.preparationPolicy || \"准备检定必须发生在此前场景\"}。${archive.traitCheckSystem.failureAgencyBoundary || \"失败不得替玩家决定具体行动\"}。`,\n    traitText,\n    \"【三、特性武魂模板】\",\n    soulTemplateText,\n    \"【四、附带资源】\",\n    assetText,\n    \"【五、长期路线】\",\n    longTermText,\n    \"【六、武魂重构指令】\",\n    \"由正文AI与表格AI依据“玩家原始武魂＋特性武魂模板”共同重构最终武魂。品质采用取高规则：模板声明品质时将其作为最低品质，与对应槽位的玩家原稿品质比较后取较高者；模板未声明品质时完全沿用玩家品质。模板附带的品质、武魂槽与附带资源已包含在对应高阶特性费用中，不另收费。模板的强制类型、固定来源、核心能力与强制属性优先；玩家填写的名称、外观、战斗主题、限制、补充设定及兼容属性应尽量融合。冲突内容不得静默丢弃，应转化为旧形态、来源事实、变异起点或未来进化方向。固定名称模板保留核心名称，玩家名称可作为变体名或形态名；可配置模板以玩家配置为准。最终最多建立三条武魂记录；模板明确声明不占槽的关联机制不计入武魂槽。表格只建立重构后的最终武魂行，每行只写一个比较后的最终品质，不得重复建立“玩家原稿行”和“模板行”。\",\n    \"【七、首轮初始化与建档要求】\",\n    `背景：${archive.background.presetName}；${archive.background.description || \"无补充\"}`,\n    `预设角色羁绊：\\n${bondText}`,\n    `结构化羁绊：\\n${bondProfiles}`,\n    `羁绊备注：${archive.bonds.notes || \"无\"}`,\n    `自定义人物补充：${archive.bonds.customCharacters || \"无\"}`,\n    \"本轮是首轮初始化回合。正文AI只确认已收到玩家设定，不推进时间、场景、对话、行动或结果，不引入新的剧情事实，也不输出表格、JSON或数据库操作过程。局势基线任务与章节推进C同样只将本轮视为初始化输入，不建立时间推进、事件结果或已发生剧情；章节推进模式固定为initialization。TavernDB仍须依据本档案正常完成当前15表、282列的完整建档，不得创建已移除的玩家行动状态、具体伤势或持续状态表。当前行动能力、临时伤势、控制、增益、减益、资源紧张和即时风险只由剧情包与小总结/大总结承接；只有跨轮长期成立的永久事实才写入稳定所属表：玩家长期身体或修炼变化写玩家档案，能力固有代价与长期可用状态写能力与天赋，装备损伤写对应资源表，人物或地点的持久变化写各自档案。重要人物档案必须使用当前关系称谓，并把关系变化依据写入关系证据与变化；关系称谓不是数值好感度。武魂表只写重构后的最终武魂并在关联编码中写入对应特性编码。若武魂模板声明开局魂力等级、开局形态、魂环上限或百级以上成长规则，须分别写入玩家档案与武魂行；等级可以超过100级。模板声明开局零魂环时，不得预建任何未来魂环行；自凝魂环只是免去猎杀魂兽的获取权限，必须在实际达到成长节点并完成凝聚后，才向能力与天赋表新增对应魂环或魂技。能力与天赋表为每项所选特性建立一条“天赋模板”，完整映射适用范围、效果事实、能力边界、触发或使用条件、维持条件、代价与后果、恢复条件、成长条件和世界观有限次数。D20检定触发并入使用条件，失败后果并入代价与后果，完整公式、优劣势、固定修正和此前准备规则写入备注。\",\n    umbraskDatabaseText,\n    \"长期路线分流：只有本档案明确列入【五、长期路线】的独立任务、成长、权限或威胁才进入长期义务，不能因为特性为负面就自动新增长期线。任务线写入对应能力的成长条件，并并入玩家当前目标或长期义务；成长线写入成长条件与长期义务；常驻剧情权限只写入能力事实；负面威胁线写入长期义务与能力边界。魂魄裂痕、旧伤难愈或武魂排斥的当轮发作只写剧情包与总结；只有其形成稳定、跨轮长期成立的永久变化时，才按所属对象更新玩家档案或能力与天赋。声名狼藉形成具体地区或人物事实后再更新地点势力或人物档案。玩家已有开局目标时不得覆盖，模板路线必须作为并行长期义务合并，不得重复建立“特性行＋同内容长期义务”。附带资源按模板初始化到对应资源表；未满足获得条件的未来资源不得预建。\",\n    \"先尊重所有原稿和模板边界并完成本轮初始化；本轮结束后等待玩家的下一条消息，只有下一条玩家消息才从开局地点与角色当前目标开始可继续游玩的中文叙事。\",\n  ].join(\"\\n\");\n}\n\nfunction dlccCreateStore(initialDraft) {\n  let state = {\n    session: {\n      page: 0,\n      activeSoul: 0,\n      traitFilter: \"all\",\n      traitGroup: \"regular\",\n      traitFacet: \"all\",\n      traitCost: \"all\",\n      traitSearch: \"\",\n      activeTraitId: \"\",\n      activeTraitDetail: \"\",\n      busy: {},\n      notices: {},\n      avatar: \"\",\n      aiAvailable: false,\n    },\n    draft: dlccNormalizeDraft(initialDraft || dlccCreateDraft()),\n  };\n  const listeners = new Set();\n\n  function emit(dirty = [\"all\"], meta = {}) {\n    const snapshot = getState();\n    listeners.forEach(listener => listener(snapshot, new Set(dirty), meta));\n  }\n\n  function getState() {\n    const draft = state.draft;\n    return { session: state.session, draft, derived: dlccDerived(draft) };\n  }\n\n  function dispatch(command) {\n    if (!command || !command.type) return getState();\n    let dirty = command.dirty || [\"derived\", \"preview\"];\n    let draftChanged = false;\n    if (command.type === \"set-draft\") {\n      dlccPathSet(state.draft, command.path, command.value);\n      draftChanged = true;\n    } else if (command.type === \"set-session\") {\n      dlccPathSet(state.session, command.path, command.value);\n    } else if (command.type === \"replace-draft\") {\n      state.draft = dlccNormalizeDraft(command.draft);\n      draftChanged = true;\n      dirty = [\"all\"];\n    } else if (command.type === \"mutate-draft\" && typeof command.mutate === \"function\") {\n      command.mutate(state.draft);\n      draftChanged = true;\n    } else if (command.type === \"notice\") {\n      state.session.notices[command.key] = { text: command.text || \"\", mode: command.mode || \"\" };\n    } else if (command.type === \"busy\") {\n      state.session.busy[command.key] = !!command.value;\n    }\n    emit(dirty, { draftChanged, command });\n    return getState();\n  }\n\n  return {\n    getState,\n    dispatch,\n    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },\n  };\n}\n\nconst DLCC_KEYS = {\n  playerName: \"dl-main-text-player-name\",\n  playerAvatar: \"dl-main-text-user-avatar\",\n  playerAvatarOverride: \"dl-main-text-user-avatar-override\",\n};\nconst DLCC_EVENTS = {\n  identity: \"douluo-player-identity:update\",\n  avatar: \"douluo-player-avatar:update\",\n};\n\nfunction dlccCreateRuntimePort() {\n  return {\n    hosts: DLCC_HOSTS.slice(),\n    storage: dlccStorage(),\n    context: dlccContext(),\n    databaseApi: () => dlccHostGlobal(\"AutoCardUpdaterAPI\"),\n    findHostElement(selectors) {\n      for (const host of DLCC_HOSTS) {\n        let doc = null;\n        try { doc = host.document; } catch (_) {}\n        if (!doc) continue;\n        for (const selector of selectors) {\n          const node = Array.from(doc.querySelectorAll(selector)).find(candidate => !DLCC_ROOT.contains(candidate));\n          if (node) return node;\n        }\n      }\n      return null;\n    },\n    emit(name, detail) {\n      DLCC_HOSTS.forEach(host => {\n        try { host.dispatchEvent(new (host.CustomEvent || CustomEvent)(name, { detail })); } catch (_) {}\n      });\n    },\n  };\n}\n\nfunction dlccCreatePublicApiFacade(runtime) {\n  const exposed = [];\n  return {\n    expose(name, api) {\n      runtime.hosts.forEach(host => {\n        try { host[name] = api; exposed.push({ host, name, api }); } catch (_) {}\n      });\n      return api;\n    },\n    dispose() {\n      exposed.splice(0).forEach(item => {\n        try { if (item.host[item.name] === item.api) delete item.host[item.name]; } catch (_) {}\n      });\n    },\n  };\n}\n\nfunction dlccCreateIdentityPort(runtime) {\n  let lastName = null;\n  return {\n    readName() {\n      try { return dlccTrim(runtime.storage && runtime.storage.getItem(DLCC_KEYS.playerName)); } catch (_) { return \"\"; }\n    },\n    writeName(name) {\n      const value = dlccTrim(name);\n      try {\n        if (runtime.storage) value ? runtime.storage.setItem(DLCC_KEYS.playerName, value) : runtime.storage.removeItem(DLCC_KEYS.playerName);\n      } catch (_) {}\n      if (lastName !== value) {\n        lastName = value;\n        runtime.emit(DLCC_EVENTS.identity, { name: value, storageKey: DLCC_KEYS.playerName, source: \"character-create-v2\" });\n      }\n      return value;\n    },\n  };\n}\n\nfunction dlccCreateAvatarRepository(runtime) {\n  const DB_NAME = \"douluo-main-text-assets\";\n  const STORE = \"avatars\";\n  const KEY = \"user/character-create\";\n  const PREFIX = \"dmt-avatar://\";\n  const MAX_BYTES = 5 * 1024 * 1024;\n  let dbPromise = null;\n  let objectUrl = \"\";\n\n  function openDb() {\n    if (dbPromise) return dbPromise;\n    dbPromise = new Promise((resolve, reject) => {\n      if (!window.indexedDB) return reject(new Error(\"IndexedDB不可用\"));\n      const request = window.indexedDB.open(DB_NAME, 1);\n      request.onupgradeneeded = () => {\n        if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE, { keyPath: \"key\" });\n      };\n      request.onsuccess = () => resolve(request.result);\n      request.onerror = () => reject(request.error || new Error(\"头像数据库打开失败\"));\n    }).catch(error => { dbPromise = null; throw error; });\n    return dbPromise;\n  }\n\n  async function put(blob) {\n    const db = await openDb();\n    await new Promise((resolve, reject) => {\n      const tx = db.transaction(STORE, \"readwrite\");\n      tx.objectStore(STORE).put({ key: KEY, blob, mimeType: blob.type || \"image/png\", updatedAt: Date.now() });\n      tx.oncomplete = resolve;\n      tx.onerror = () => reject(tx.error || new Error(\"头像写入失败\"));\n    });\n  }\n\n  async function get(key) {\n    const db = await openDb();\n    return new Promise((resolve, reject) => {\n      const request = db.transaction(STORE, \"readonly\").objectStore(STORE).get(key);\n      request.onsuccess = () => resolve(request.result || null);\n      request.onerror = () => reject(request.error || new Error(\"头像读取失败\"));\n    });\n  }\n\n  async function remove(key) {\n    const db = await openDb();\n    await new Promise((resolve, reject) => {\n      const tx = db.transaction(STORE, \"readwrite\");\n      tx.objectStore(STORE).delete(key);\n      tx.oncomplete = resolve;\n      tx.onerror = () => reject(tx.error || new Error(\"头像清除失败\"));\n    });\n  }\n\n  function readStored() {\n    try {\n      if (!runtime.storage) return \"\";\n      return dlccText(runtime.storage.getItem(DLCC_KEYS.playerAvatarOverride))\n        || dlccText(runtime.storage.getItem(DLCC_KEYS.playerAvatar));\n    } catch (_) { return \"\"; }\n  }\n\n  function writeStored(value) {\n    if (!runtime.storage) throw new Error(\"localStorage不可用\");\n    value ? runtime.storage.setItem(DLCC_KEYS.playerAvatar, value) : runtime.storage.removeItem(DLCC_KEYS.playerAvatar);\n    runtime.storage.removeItem(DLCC_KEYS.playerAvatarOverride);\n    runtime.emit(DLCC_EVENTS.avatar, { avatar: value, storageKey: DLCC_KEYS.playerAvatar, source: \"character-create-v2\" });\n  }\n\n  async function dataUrl(file) {\n    return new Promise((resolve, reject) => {\n      const reader = new FileReader();\n      reader.onload = () => resolve(dlccText(reader.result));\n      reader.onerror = () => reject(reader.error || new Error(\"头像读取失败\"));\n      reader.readAsDataURL(file);\n    });\n  }\n\n  return {\n    storageKey: DLCC_KEYS.playerAvatar,\n    eventName: DLCC_EVENTS.avatar,\n    getAvatar: readStored,\n    setAvatar(value) {\n      try { writeStored(dlccText(value)); return dlccResult(true, \"saved\", \"头像引用已更新\", dlccText(value)); }\n      catch (error) { return dlccResult(false, \"storage-failed\", error.message); }\n    },\n    async resolve(value = readStored()) {\n      const source = dlccText(value);\n      if (!source.startsWith(PREFIX)) return source;\n      try {\n        const record = await get(source.slice(PREFIX.length));\n        if (!record || !record.blob) return \"\";\n        if (objectUrl) URL.revokeObjectURL(objectUrl);\n        objectUrl = URL.createObjectURL(record.blob);\n        return objectUrl;\n      } catch (_) { return \"\"; }\n    },\n    async saveFile(file) {\n      if (!file || !dlccText(file.type).startsWith(\"image/\")) return dlccResult(false, \"bad-type\", \"只接受图片文件\");\n      if (file.size > MAX_BYTES) return dlccResult(false, \"too-large\", \"头像不能超过5MB\");\n      try {\n        await put(file);\n        const ref = `${PREFIX}${KEY}`;\n        writeStored(ref);\n        return dlccResult(true, \"indexeddb\", \"头像已保存\", ref);\n      } catch (dbError) {\n        try {\n          const value = await dataUrl(file);\n          writeStored(value);\n          return dlccResult(true, \"local-storage\", \"IndexedDB不可用，头像已保存到本地存储\", value);\n        } catch (storageError) {\n          return dlccResult(false, \"storage-failed\", `头像保存失败：${storageError.message || dbError.message}`);\n        }\n      }\n    },\n    clear() {\n      try {\n        writeStored(\"\");\n        remove(KEY).catch(() => {});\n        return dlccResult(true, \"cleared\", \"头像已清除\");\n      }\n      catch (error) { return dlccResult(false, \"storage-failed\", error.message); }\n    },\n    dispose() { if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = \"\"; },\n  };\n}\n\nfunction dlccCreateAiPort(runtime) {\n  function isPlainObject(value) {\n    return !!value && typeof value === \"object\" && !Array.isArray(value);\n  }\n\n  return {\n    available() { const api = runtime.databaseApi(); return !!(api && typeof api.callAI === \"function\"); },\n    async generateJson(system, payload, maxTokens = 1800) {\n      if (!this.available()) return dlccResult(false, \"missing-api\", \"TavernDB AI接口尚未就绪\");\n      try {\n        const text = await runtime.databaseApi().callAI([\n          { role: \"system\", content: system },\n          { role: \"user\", content: JSON.stringify(payload) },\n        ], { maxTokens });\n        if (!text) return dlccResult(false, \"empty\", \"AI未返回内容\");\n        const raw = dlccText(text).trim();\n        if (/\u003ccontent>|\u003ctableEdit>|\u003cthought>/i.test(raw)) return dlccResult(false, \"wrong-output\", \"AI返回了正文或填表内容，已阻止写入\");\n        const fenced = raw.match(/```(?:json)?\\s*([\\s\\S]*?)```/i);\n        const body = fenced ? fenced[1] : raw;\n        const start = body.indexOf(\"{\");\n        const end = body.lastIndexOf(\"}\");\n        const value = JSON.parse(start >= 0 && end > start ? body.slice(start, end + 1) : body);\n        if (!value || typeof value !== \"object\" || Array.isArray(value)) throw new Error(\"返回值不是JSON对象\");\n        return dlccResult(true, \"ok\", \"AI扩写完成\", value);\n      } catch (error) {\n        return dlccResult(false, \"ai-failed\", `AI调用失败：${error.message || error}`);\n      }\n    },\n    selectFields(value, wrapperKey, allowedFields) {\n      if (!isPlainObject(value)) return dlccResult(false, \"invalid-object\", \"AI返回值不是可写入的JSON对象\");\n      const sources = [value];\n      if (isPlainObject(value[wrapperKey])) sources.push(value[wrapperKey]);\n      const patch = {};\n      sources.forEach(source => {\n        allowedFields.forEach(key => {\n          if (typeof source[key] !== \"string\") return;\n          const text = source[key].trim();\n          if (text) patch[key] = text;\n        });\n      });\n      const keys = Object.keys(patch);\n      if (!keys.length) return dlccResult(false, \"no-writable-fields\", `AI返回JSON中没有可写入的${wrapperKey}字段`);\n      return dlccResult(true, \"fields-ready\", `已识别${keys.length}个可写入字段`, { patch, keys });\n    },\n  };\n}\n\nfunction dlccFingerprint(value) {\n  let hash = 2166136261;\n  const text = dlccText(value);\n  for (let index = 0; index \u003c text.length; index += 1) { hash ^= text.charCodeAt(index); hash = Math.imul(hash, 16777619); }\n  return String(hash >>> 0);\n}\n\nfunction dlccCreateChatPort(runtime) {\n  let lastFingerprint = \"\";\n  let lastSentAt = 0;\n  return {\n    async send(text, options = {}) {\n      const value = dlccText(text);\n      const fingerprint = dlccFingerprint(options.fingerprint || value);\n      if (fingerprint === lastFingerprint && Date.now() - lastSentAt \u003c 5000) return dlccResult(false, \"duplicate\", \"刚刚已经发送同一份档案\");\n      const context = dlccContext();\n      if (context && typeof context.sendMessage === \"function\") {\n        try {\n          await context.sendMessage(value);\n          lastFingerprint = fingerprint; lastSentAt = Date.now();\n          return dlccResult(true, \"context\", \"档案已发送\");\n        } catch (error) { return dlccResult(false, \"send-failed\", `发送失败：${error.message || error}`); }\n      }\n      const input = runtime.findHostElement([\"#send_textarea\", \"textarea[name='send_textarea']\", \"[contenteditable='true'][role='textbox']\"]);\n      const button = runtime.findHostElement([\"#send_but\", \"[data-testid='send-button']\", \"button[aria-label='发送']\", \"button[aria-label='Send']\"]);\n      if (!input || !button) return dlccResult(false, \"missing-dom\", \"未找到可用的聊天输入框和发送按钮\");\n      if (button.disabled || button.getAttribute(\"aria-disabled\") === \"true\") return dlccResult(false, \"disabled\", \"发送按钮当前不可用\");\n      try {\n        if (input.matches(\"[contenteditable='true']\")) input.textContent = value;\n        else input.value = value;\n        input.dispatchEvent(new Event(\"input\", { bubbles: true }));\n        input.dispatchEvent(new Event(\"change\", { bubbles: true }));\n        button.click();\n        lastFingerprint = fingerprint; lastSentAt = Date.now();\n        return dlccResult(true, \"dom\", \"档案已发送\");\n      } catch (error) { return dlccResult(false, \"send-failed\", `发送失败：${error.message || error}`); }\n    },\n  };\n}\n\nfunction dlccCreateDraftRepository(runtime) {\n  const SLOT_PREFIX = \"dl-character-create:v2:slot:\";\n  const slots = [\"slot-1\", \"slot-2\", \"slot-3\"];\n\n  function envelope(draft) {\n    return {\n      schemaVersion: DLCC_SCHEMA_VERSION,\n      savedAt: new Date().toISOString(),\n      previewName: dlccTrim(draft.profile.name) || dlccTrim(draft.profile.concept) || \"未命名角色\",\n      draft: dlccNormalizeDraft(draft),\n    };\n  }\n\n  function parse(raw) {\n    if (!raw) return null;\n    const value = typeof raw === \"string\" ? JSON.parse(raw) : raw;\n    if (!value || value.schemaVersion !== DLCC_SCHEMA_VERSION || !value.draft) throw new Error(\"只接受v2草稿\");\n    return { ...value, draft: dlccNormalizeDraft(value.draft) };\n  }\n\n  function write(key, draft) {\n    if (!runtime.storage) return dlccResult(false, \"missing-storage\", \"浏览器本地存储不可用\");\n    try {\n      const value = envelope(draft);\n      runtime.storage.setItem(key, JSON.stringify(value));\n      return dlccResult(true, \"saved\", \"草稿已保存\", value);\n    } catch (error) { return dlccResult(false, \"storage-failed\", `草稿保存失败：${error.message || error}`); }\n  }\n\n  function read(key) {\n    if (!runtime.storage) return dlccResult(false, \"missing-storage\", \"浏览器本地存储不可用\");\n    try {\n      const raw = runtime.storage.getItem(key);\n      if (!raw) return dlccResult(false, \"missing\", \"没有可读取的草稿\");\n      return dlccResult(true, \"loaded\", \"草稿已读取\", parse(raw));\n    } catch (error) { return dlccResult(false, \"invalid\", `草稿损坏或版本不符：${error.message || error}`); }\n  }\n\n  function remove(key) {\n    if (!runtime.storage) return dlccResult(false, \"missing-storage\", \"浏览器本地存储不可用\");\n    try { runtime.storage.removeItem(key); return dlccResult(true, \"deleted\", \"草稿已删除\"); }\n    catch (error) { return dlccResult(false, \"storage-failed\", `草稿删除失败：${error.message || error}`); }\n  }\n\n  return {\n    slots: slots.slice(),\n    saveSlot(slot, draft) { return slots.includes(slot) ? write(SLOT_PREFIX + slot, draft) : dlccResult(false, \"bad-slot\", \"未知草稿槽位\"); },\n    loadSlot(slot) { return slots.includes(slot) ? read(SLOT_PREFIX + slot) : dlccResult(false, \"bad-slot\", \"未知草稿槽位\"); },\n    deleteSlot(slot) { return slots.includes(slot) ? remove(SLOT_PREFIX + slot) : dlccResult(false, \"bad-slot\", \"未知草稿槽位\"); },\n    list() {\n      return slots.map(slot => {\n        const result = read(SLOT_PREFIX + slot);\n        return result.ok ? { slotId: slot, savedAt: result.data.savedAt, previewName: result.data.previewName } : { slotId: slot, savedAt: \"\", previewName: \"\" };\n      });\n    },\n    exportDraft(draft) { return JSON.stringify(envelope(draft), null, 2); },\n    importDraft(text) {\n      try { return dlccResult(true, \"imported\", \"v2草稿已导入\", parse(text)); }\n      catch (error) { return dlccResult(false, \"invalid\", `导入失败：${error.message || error}`); }\n    },\n  };\n}\n\nfunction dlccCreateViews(store, avatarRepository) {\n  let pendingDirty = new Set();\n  let scheduled = false;\n  const traitFacetIds = {\n    combat: new Set([\n      \"body_force\", \"soul_bound_body\", \"ignite_starsea\", \"body_grandmaster\", \"fire_steel\", \"uncrowned_king\", \"ultimate_chant\", \"imagine_breaker\", \"absolute_guard\", \"soul_link\", \"nine_ring_body\", \"demon_body\", \"ancient_saint_body\", \"spirit_soul_unity\", \"eight_gates\", \"valkyrie\", \"dragon_heart\", \"soul_heart\", \"dragon_slayer\", \"projection\", \"umbrask\", \"reincarnation_again\", \"ring_elder\", \"thousand_forged_blade\", \"phoenix_god\", \"courting_death\", \"hundred_thousand_ring_fixation\", \"showoff_compulsion\", \"lingering_injury\", \"martial_soul_rejection\",\n    ]),\n    soul: new Set([\n      \"soul_bound_body\", \"ignite_starsea\", \"ultimate_chant\", \"imagine_breaker\", \"true_ancestor\", \"sun_child\", \"soul_body\", \"soul_link\", \"nine_ring_body\", \"demon_body\", \"ancient_saint_body\", \"spirit_soul_unity\", \"eight_gates\", \"dragon_heart\", \"nascent_soul\", \"soul_heart\", \"twelve_trials\", \"six_eyes\", \"projection\", \"supreme_bone\", \"umbrask\", \"reincarnation_again\", \"ring_elder\", \"thousand_forged_blade\", \"god_trial\", \"phoenix_god\", \"martial_soul_devours_master\", \"soul_fracture\", \"martial_soul_rejection\",\n    ]),\n    survival: new Set([\n      \"ignite_starsea\", \"fire_steel\", \"imagine_breaker\", \"true_ancestor\", \"sun_child\", \"soul_body\", \"absolute_guard\", \"nine_ring_body\", \"demon_body\", \"ancient_saint_body\", \"spirit_soul_unity\", \"eight_gates\", \"dragon_heart\", \"nascent_soul\", \"soul_heart\", \"twelve_trials\", \"supreme_bone\", \"umbrask\", \"phoenix_god\", \"godking_shadow\", \"martial_soul_devours_master\", \"soul_fracture\", \"nemesis_mark\", \"lingering_injury\", \"martial_soul_rejection\", \"fate_running_out\",\n    ]),\n    resource: new Set([\n      \"dual_armor\", \"arsenal_body\", \"valkyrie\", \"king_treasure\", \"projection\", \"supreme_bone\", \"ring_elder\", \"thousand_forged_blade\", \"traveler\", \"system\", \"poor_finances\", \"hundred_thousand_ring_fixation\", \"creditor_at_door\",\n    ]),\n    story: new Set([\n      \"custom_specialty\", \"true_ancestor\", \"sun_child\", \"soul_body\", \"absolute_guard\", \"twelve_trials\", \"dragon_slayer\", \"six_eyes\", \"king_treasure\", \"umbrask\", \"reincarnation_again\", \"ring_elder\", \"thousand_forged_blade\", \"traveler\", \"god_trial\", \"system\", \"phoenix_god\", \"godking_shadow\", \"romance_brain\", \"boiling_sheep_constitution\", \"poor_finances\", \"courting_death\", \"blind_to_titled_douluo\", \"hundred_thousand_ring_fixation\", \"technique_announcer\", \"showoff_compulsion\", \"genius_burden\", \"sharp_tongue\", \"social_anxiety\", \"unlucky\", \"authority_deference\", \"martial_soul_devours_master\", \"nemesis_mark\", \"oath_shackles\", \"memory_gap\", \"bad_reputation\", \"creditor_at_door\", \"fate_running_out\", \"broken_engagement\",\n    ]),\n    relation: new Set([\n      \"absolute_guard\", \"godking_shadow\", \"romance_brain\", \"boiling_sheep_constitution\", \"courting_death\", \"blind_to_titled_douluo\", \"technique_announcer\", \"showoff_compulsion\", \"genius_burden\", \"sharp_tongue\", \"social_anxiety\", \"authority_deference\", \"nemesis_mark\", \"oath_shackles\", \"memory_gap\", \"bad_reputation\", \"creditor_at_door\", \"broken_engagement\",\n    ]),\n  };\n\n  function rankLabel(rank) { return rank === \"expert\" ? \"专精\" : rank === \"proficient\" ? \"擅长\" : \"未选择\"; }\n  function eraOf(state) { return DLCC_RULES.eras.find(item => item.id === state.draft.world.eraId) || DLCC_RULES.eras[0]; }\n\n  function renderStages(state) {\n    const box = dlcc$(\"[data-stagebar]\");\n    if (!box) return;\n    box.innerHTML = DLCC_STAGES.map((name, index) => `\u003cbutton class=\"stage ${index === state.session.page ? \"active\" : \"\"} ${index \u003c state.session.page ? \"done\" : \"\"}\" data-action=\"goto\" data-value=\"${index}\">\u003cspan class=\"txt\">${dlccEsc(name)}\u003c/span>\u003c/button>`).join(\"\");\n    dlcc$$(\"[data-page]\").forEach(page => page.classList.toggle(\"active\", Number(page.dataset.page) === state.session.page));\n    const next = dlcc$(\"[data-action='next']\");\n    if (next) next.textContent = state.session.page === DLCC_STAGES.length - 1 ? \"开始游戏 →\" : \"下一步 →\";\n  }\n\n  function renderWorld(state) {\n    const era = eraOf(state);\n    const eraList = dlcc$(\"[data-era-list]\");\n    if (eraList) eraList.innerHTML = DLCC_RULES.eras.map(item => `\u003cbutton class=\"era-node ${item.id === era.id ? \"active\" : \"\"}\" data-action=\"era\" data-value=\"${dlccEsc(item.id)}\">\u003cspan class=\"era-dot\">\u003c/span>\u003cb>${dlccEsc(item.name.split(\" / \")[0])}\u003c/b>\u003cspan>${dlccEsc(item.time)}\u003c/span>\u003c/button>`).join(\"\");\n    const title = dlcc$(\"[data-era-title]\"); if (title) title.textContent = era.name;\n    const time = dlcc$(\"[data-era-time]\"); if (time) time.textContent = era.time;\n    const locations = dlcc$(\"[data-location-list]\");\n    if (locations) locations.innerHTML = era.locations.map(location => `\u003cbutton class=\"pick-card ${location === state.draft.world.location ? \"active\" : \"\"}\" data-action=\"location\" data-value=\"${dlccEsc(location)}\">\u003cb>${dlccEsc(location)}\u003c/b>\u003csmall>选择为开局地点\u003c/small>\u003c/button>`).join(\"\");\n    const chapter = dlcc$(\"[data-chapter-select]\");\n    if (chapter) {\n      chapter.innerHTML = dlccChapterOptions(era.id).map(item => `\u003coption value=\"${dlccEsc(item.id)}\">${dlccEsc(item.label)}\u003c/option>`).join(\"\");\n      chapter.value = state.draft.world.chapter;\n    }\n    const chapterOption = dlccChapterOption(era.id, state.draft.world.chapter) || dlccChapterOptions(era.id)[0];\n    const chapterMeta = dlcc$(\"[data-chapter-meta]\");\n    if (chapterMeta) chapterMeta.textContent = chapterOption.id === \"自定义章节\"\n      ? \"自定义章节不会伪造世界书条目；最终档案会提醒 Agent 根据文本判断章节与时间段。\"\n      : `档案映射：${chapterOption.entry} · ${chapterOption.timeRange}。仅输出提醒，不直接修改世界书。`;\n    dlcc$$(\"[data-action='species']\").forEach(button => button.classList.toggle(\"active\", button.dataset.value === state.draft.world.species));\n    const beast = dlcc$(\"[data-beast-fields]\"); if (beast) beast.classList.toggle(\"show\", state.draft.world.species === \"beast\");\n  }\n\n  function renderDaily(state) {\n    const box = dlcc$(\"[data-daily-grid]\");\n    if (!box) return;\n    box.innerHTML = DLCC_RULES.dailyAttributes.map(item => {\n      const value = Number(state.draft.daily[item.id] || 8);\n      const cost = dlccDailyCost(value);\n      return `\u003carticle class=\"attr-card\">\u003cheader>\u003cspan>${dlccEsc(item.name)}\u003c/span>\u003cb>${value}\u003c/b>\u003c/header>\u003cdiv class=\"specialty-ranks\">\u003cbutton data-action=\"daily-step\" data-id=\"${item.id}\" data-delta=\"-1\" ${value \u003c= 8 ? \"disabled\" : \"\"}>−\u003c/button>\u003cspan class=\"v2-notice\">${cost}DP\u003c/span>\u003cbutton data-action=\"daily-step\" data-id=\"${item.id}\" data-delta=\"1\" ${value >= 15 ? \"disabled\" : \"\"}>＋\u003c/button>\u003c/div>\u003c/article>`;\n    }).join(\"\");\n  }\n\n  function renderSpecialties(state) {\n    const box = dlcc$(\"[data-specialty-grid]\");\n    if (!box) return;\n    box.innerHTML = DLCC_RULES.specialties.map(item => {\n      const rank = state.draft.specialties[item.id] || \"none\";\n      return `\u003carticle class=\"specialty-card ${rank !== \"none\" ? \"is-selected\" : \"\"}\">\u003ch4>${dlccEsc(item.name)}\u003c/h4>\u003cp>${dlccEsc(item.scope)}\u003c/p>\u003cdiv class=\"specialty-ranks\">${[\"none\", \"proficient\", \"expert\"].map(value => `\u003cbutton class=\"${rank === value ? \"is-active\" : \"\"}\" data-action=\"specialty-rank\" data-id=\"${item.id}\" data-value=\"${value}\">${rankLabel(value)}${value === \"none\" ? \"\" : ` · ${dlccRankCost(value)}AP`}\u003c/button>`).join(\"\")}\u003c/div>\u003c/article>`;\n    }).join(\"\");\n  }\n\n  function renderProfileSummary(state) {\n    const name = dlcc$(\"[data-profile-name]\"); if (name) name.textContent = dlccTrim(state.draft.profile.name) || \"未命名魂师\";\n    const subtitle = dlcc$(\"[data-profile-subtitle]\"); if (subtitle) subtitle.textContent = state.draft.profile.role || eraOf(state).name;\n    const identity = dlcc$(\"[data-brief='identity']\"); if (identity) identity.textContent = state.draft.world.species === \"beast\" ? \"魂兽\" : \"人类\";\n    const specialty = dlcc$(\"[data-brief='specialties']\"); if (specialty) specialty.textContent = state.derived.ap.parts.map(item => item.name).join(\" / \") || \"尚未选择\";\n    const ap = dlcc$(\"[data-brief='ap']\"); if (ap) ap.textContent = `AP ${state.derived.ap.spent} / ${DLCC_RULES.points.ap}`;\n    const dp = dlcc$(\"[data-brief='dp']\"); if (dp) dp.textContent = `DP ${state.derived.dp.spent} / ${DLCC_RULES.points.dp}`;\n    const sp = dlcc$(\"[data-brief='sp']\"); if (sp) sp.textContent = `SP净支出 ${state.derived.sp.spent} / ${DLCC_RULES.points.sp}`;\n  }\n\n  function renderPoints(state) {\n    const points = {\n      sp: { total: DLCC_RULES.points.sp, ...state.derived.sp },\n      ap: { total: DLCC_RULES.points.ap, ...state.derived.ap },\n      dp: { total: DLCC_RULES.points.dp, ...state.derived.dp },\n    };\n    const values = { spRemain: points.sp.remain, apRemain: points.ap.remain, dpRemain: points.dp.remain };\n    Object.entries(values).forEach(([key, value]) => {\n      const node = dlcc$(`[data-points='${key}']`);\n      if (node) { node.textContent = value; node.closest(\".point-orb\")?.classList.toggle(\"warn\", value \u003c 0); }\n    });\n    Object.entries(points).forEach(([key, value]) => {\n      const meta = dlcc$(`[data-points-meta='${key}']`);\n      if (meta) meta.textContent = `已用 ${value.spent} / ${value.total}`;\n      const summary = dlcc$(`[data-point-summary='${key}']`);\n      if (summary) {\n        summary.textContent = key === \"sp\"\n          ? `正向支出 ${value.positiveSpent} · 负面返还 ${value.negativeRefundApplied}/${value.negativeRefundRaw}（上限${value.negativeRefundCap}）· 剩余 ${value.remain}`\n          : `已用 ${value.spent} · 剩余 ${value.remain}`;\n        summary.classList.toggle(\"warn\", value.remain \u003c 0);\n      }\n    });\n  }\n\n  function soulExtremeMarkup(soul) {\n    const options = dlccExtremeOptions(soul);\n    const buttons = options.map(value => `\u003cbutton type=\"button\" class=\"select-btn soul-pill ${soul.extreme.enabled && soul.extreme.attribute === value ? \"active\" : \"\"}\" data-action=\"soul-extreme-attribute\" data-value=\"${dlccEsc(value)}\" ${soul.extreme.enabled ? \"\" : \"disabled\"}>${dlccEsc(value)}\u003c/button>`).join(\"\");\n    return `\u003cdiv class=\"section-head\">\u003ch3>极致属性\u003c/h3>\u003cspan class=\"cost\">${soul.extreme.enabled ? `${DLCC_RULES.soulExtremeCost}SP` : `可选 ${DLCC_RULES.soulExtremeCost}SP`}\u003c/span>\u003c/div>\u003cbutton class=\"btn ghost extreme-toggle\" type=\"button\" data-action=\"soul-extreme-toggle\" ${options.length ? \"\" : \"disabled\"}>${soul.extreme.enabled ? `取消极致化 · 返还${DLCC_RULES.soulExtremeCost}SP` : `开启极致化 · ${DLCC_RULES.soulExtremeCost}SP`}\u003c/button>${options.length ? `\u003cdiv class=\"soul-pill-group extreme-choice-grid\">${buttons}\u003c/div>` : \"\"}\u003cp class=\"mini\">${options.length ? `只能从普通属性或自定义属性中指定一项。${soul.extreme.enabled ? `当前：极致${dlccEsc(soul.extreme.attribute)}` : \"\"}` : \"先选择普通属性或填写自定义属性后，才能开启极致化。\"}\u003c/p>`;\n  }\n\n  function renderSoulExtreme(state) {\n    const panel = dlcc$(\"[data-soul-extreme]\");\n    const soul = state.draft.souls[state.session.activeSoul];\n    if (panel && soul && soul.unlocked) panel.innerHTML = soulExtremeMarkup(soul);\n  }\n\n  function renderSouls(state) {\n    const roles = [\"主武魂\", \"副武魂\", \"额外武魂\"];\n    const codes = [\"PRIMARY\", \"SECONDARY\", \"TERTIARY\"];\n    const index = state.session.activeSoul;\n    const soul = state.draft.souls[index];\n    if (!soul) return;\n    const quality = dlccQuality(soul.quality);\n    const slotCost = Number(DLCC_RULES.soulSlotCosts[index] || 0);\n    const qualityCost = Number(quality.spCost || 0);\n    const extremeCost = soul.extreme.enabled ? Number(DLCC_RULES.soulExtremeCost || 0) : 0;\n    const soulCost = soul.unlocked ? slotCost + qualityCost + extremeCost : 0;\n    const awakenedCount = state.draft.souls.filter(item => item.unlocked).length;\n    const overview = dlcc$(\"[data-soul-overview]\");\n    if (overview) overview.innerHTML = `\u003csection class=\"holo-panel panel-pad soul-overview-panel\">\n      \u003cdiv class=\"section-head\">\u003cdiv>\u003cspan class=\"tag\">AWAKENING PROFILE\u003c/span>\u003ch3>觉醒概况\u003c/h3>\u003c/div>\u003cspan class=\"cost\">${awakenedCount} / 3 AWAKENED\u003c/span>\u003c/div>\n      \u003cdiv class=\"soul-narrative-readout\">\n        \u003cdiv>\u003cspan>当前品质\u003c/span>\u003cb>${dlccEsc(quality.name)}\u003c/b>\u003c/div>\n        \u003cdiv>\u003cspan>先天定位\u003c/span>\u003cb>${dlccEsc(quality.innate)}\u003c/b>\u003c/div>\n        \u003cdiv>\u003cspan>已觉醒武魂\u003c/span>\u003cb>${awakenedCount} / 3\u003c/b>\u003c/div>\n        \u003cdiv>\u003cspan>当前武魂消费\u003c/span>\u003cb>${soulCost}SP\u003c/b>\u003c/div>\n      \u003c/div>\n    \u003c/section>`;\n    const tabs = dlcc$(\"[data-soul-tabs]\");\n    if (tabs) tabs.innerHTML = state.draft.souls.map((item, itemIndex) => {\n      const itemSlotCost = Number(DLCC_RULES.soulSlotCosts[itemIndex] || 0);\n      const itemQuality = dlccQuality(item.quality);\n      const active = itemIndex === state.session.activeSoul;\n      return `\u003cbutton type=\"button\" role=\"tab\" class=\"soul-switch-tab ${active ? \"is-active\" : \"\"} ${item.unlocked ? \"is-unlocked\" : \"is-locked\"}\" data-action=\"soul-tab\" data-value=\"${itemIndex}\" aria-selected=\"${active ? \"true\" : \"false\"}\">\n        \u003cspan>第${itemIndex + 1}武魂 · ${roles[itemIndex]}\u003c/span>\n        \u003cstrong>${dlccEsc(item.name || (item.unlocked ? \"未命名武魂\" : \"尚未觉醒\"))}\u003c/strong>\n        \u003csmall>${item.unlocked ? `${dlccEsc(itemQuality.name)} · 已觉醒` : `槽位 ${itemSlotCost}SP · 未觉醒`}\u003c/small>\n      \u003c/button>`;\n    }).join(\"\");\n    if (tabs) { tabs.setAttribute(\"role\", \"tablist\"); tabs.setAttribute(\"aria-label\", \"武魂切换\"); }\n    const box = dlcc$(\"[data-soul-editor]\");\n    if (!box || !soul) return;\n    if (!soul.unlocked) {\n      box.innerHTML = `\u003csection class=\"holo-panel soul-lock-panel\">\n        \u003cspan class=\"soul-lock-mark\" aria-hidden=\"true\">\u003c/span>\n        \u003cdiv>\u003cspan class=\"tag\">${codes[index]} / LOCKED\u003c/span>\u003ch3>${roles[index]}尚未觉醒\u003c/h3>\u003cp>${index === 1 ? \"解锁后可建立副武魂档案。\" : \"额外武魂极其稀有，解锁后将作为独立武魂记录。\"}\u003c/p>\u003c/div>\n        \u003cbutton class=\"btn\" type=\"button\" data-action=\"unlock-soul\" data-value=\"${index}\">消耗 ${slotCost}SP 解锁\u003c/button>\n      \u003c/section>`;\n      return;\n    }\n    const normalButtons = DLCC_RULES.soulNormalAttributes.map(value => `\u003cbutton class=\"chip attrchip ${soul.normalAttributes.includes(value) ? \"active\" : \"\"}\" data-action=\"soul-normal-attribute\" data-value=\"${dlccEsc(value)}\">${dlccEsc(value)}\u003c/button>`).join(\"\");\n    const specialButtons = DLCC_RULES.soulSpecialAttributes.map(value => `\u003cbutton class=\"chip attrchip ${soul.specialAttributes.includes(value) ? \"active\" : \"\"}\" data-action=\"soul-special-attribute\" data-value=\"${dlccEsc(value)}\">${dlccEsc(value)}\u003c/button>`).join(\"\");\n    const choice = (field, value, current, label, detail = \"\") => `\u003cbutton type=\"button\" class=\"select-btn soul-pill ${value === current ? \"active\" : \"\"}\" data-action=\"soul-choice\" data-field=\"${field}\" data-value=\"${dlccEsc(value)}\" aria-pressed=\"${value === current ? \"true\" : \"false\"}\">\u003cb>${dlccEsc(label)}\u003c/b>${detail ? `\u003csmall>${dlccEsc(detail)}\u003c/small>` : \"\"}\u003c/button>`;\n    const qualities = DLCC_RULES.soulQualities.map(item => choice(\"quality\", item.id, soul.quality, item.name, `${item.spCost}SP`)).join(\"\");\n    const categories = DLCC_RULES.soulCategories.map(item => choice(\"category\", item, soul.category, item)).join(\"\");\n    const dominance = [\"强攻\", \"控制\", \"辅助\", \"防御\", \"机动\", \"精神\", \"均衡型\"].map(item => choice(\"dominance\", item, soul.dominance, item)).join(\"\");\n    const bodyPartButtons = DLCC_RULES.bodySoulParts.map(value => `\u003cbutton type=\"button\" class=\"select-btn soul-pill ${soul.bodySoul.part === value ? \"active\" : \"\"}\" data-action=\"soul-body-part\" data-value=\"${dlccEsc(value)}\">${dlccEsc(value)}\u003c/button>`).join(\"\");\n    const bodyPanel = soul.category === \"本体武魂\" ? `\u003csection class=\"soul-section body-soul-panel\">\n      \u003cdiv class=\"section-head\">\u003ch3>本体武魂档案\u003c/h3>\u003cspan class=\"cost\">BODY SOUL\u003c/span>\u003c/div>\n      \u003cdiv class=\"soul-pill-group\">${bodyPartButtons}\u003c/div>\n      \u003cdiv class=\"field\">\u003clabel>本体武魂说明\u003c/label>\u003ctextarea data-soul-body-field=\"description\" placeholder=\"记录身体部位如何作为武魂显化及其可观察事实\">${dlccEsc(soul.bodySoul.description)}\u003c/textarea>\u003c/div>\n      \u003cdiv class=\"body-soul-grid\">\n        \u003cdiv class=\"field\">\u003clabel>共鸣方向\u003c/label>\u003cinput data-soul-body-field=\"resonanceDirection\" value=\"${dlccEsc(soul.bodySoul.resonanceDirection)}\" placeholder=\"例如：精神感知 / 骨骼强攻\" />\u003c/div>\n        \u003cdiv class=\"field\">\u003clabel>二次觉醒目标\u003c/label>\u003cinput data-soul-body-field=\"secondAwakeningGoal\" value=\"${dlccEsc(soul.bodySoul.secondAwakeningGoal)}\" placeholder=\"记录世界内成长目标\" />\u003c/div>\n        \u003cdiv class=\"field\">\u003clabel>修炼方法\u003c/label>\u003cinput data-soul-body-field=\"trainingMethod\" value=\"${dlccEsc(soul.bodySoul.trainingMethod)}\" placeholder=\"记录训练与培养方式\" />\u003c/div>\n        \u003cdiv class=\"field\">\u003clabel>变异风险\u003c/label>\u003cinput data-soul-body-field=\"mutationRisk\" value=\"${dlccEsc(soul.bodySoul.mutationRisk)}\" placeholder=\"记录失控、负荷或排异风险\" />\u003c/div>\n      \u003c/div>\n      \u003cdiv class=\"field\">\u003clabel>突变备注\u003c/label>\u003ctextarea data-soul-body-field=\"mutationNote\" placeholder=\"记录血脉、神考、魂兽或外部因素造成的变化\">${dlccEsc(soul.bodySoul.mutationNote)}\u003c/textarea>\u003c/div>\n    \u003c/section>` : \"\";\n    box.innerHTML = `\u003cdiv class=\"soul-active-panel\">\n      \u003csection class=\"holo-panel panel-pad soul-card\">\n        \u003cdiv class=\"section-head soul-page-head\">\u003cdiv>\u003cspan class=\"tag\">${codes[index]} / UNLOCKED\u003c/span>\u003ch3>第${index + 1}武魂 · ${roles[index]}\u003c/h3>\u003c/div>\u003cdiv class=\"soul-head-actions\">\u003cspan class=\"cost\">当前消耗 ${soulCost}SP\u003c/span>${index > 0 ? `\u003cbutton class=\"btn ghost\" type=\"button\" data-action=\"lock-soul\" data-value=\"${index}\">关闭该武魂\u003c/button>` : \"\"}\u003c/div>\u003c/div>\n        \u003cdiv class=\"soul-create-layout\">\n          \u003csection class=\"soul-section soul-identification\">\u003cdiv class=\"section-head\">\u003ch3>武魂识别\u003c/h3>\u003cspan class=\"cost\">RAW FACTS\u003c/span>\u003c/div>\u003cdiv class=\"field\">\u003clabel>武魂名称\u003c/label>\u003cinput data-soul-field=\"name\" value=\"${dlccEsc(soul.name)}\" placeholder=\"输入武魂名称\" />\u003c/div>\u003c/section>\n          \u003csection class=\"soul-section\">\u003cdiv class=\"section-head\">\u003ch3>武魂品质\u003c/h3>\u003cspan class=\"cost\">${qualityCost}SP · ${dlccEsc(quality.innate)}\u003c/span>\u003c/div>\u003cdiv class=\"soul-pill-group quality-choice-grid\">${qualities}\u003c/div>\u003cp class=\"mini\">品质决定创建阶段SP消费与世界内先天定位，不生成攻击、防御或倍率。\u003c/p>\u003c/section>\n          \u003csection class=\"soul-section\">\u003cdiv class=\"section-head\">\u003ch3>武魂分类\u003c/h3>\u003cspan class=\"cost\">叙事标签\u003c/span>\u003c/div>\u003cdiv class=\"soul-pill-group category-choice-grid\">${categories}\u003c/div>\u003c/section>\n          \u003csection class=\"soul-section\">\u003cdiv class=\"section-head\">\u003ch3>普通属性\u003c/h3>\u003cspan class=\"cost\">0SP · 可多选\u003c/span>\u003c/div>\u003cdiv class=\"chip-grid soul-attribute-grid\">${normalButtons}\u003c/div>\u003cdiv class=\"field\">\u003clabel>自定义属性\u003c/label>\u003cinput data-soul-field=\"customAttribute\" value=\"${dlccEsc(soul.customAttribute)}\" placeholder=\"例如：星辰 / 血月 / 影 / 梦 / 龙血\" />\u003c/div>\u003c/section>\n          \u003csection class=\"soul-section\">\u003cdiv class=\"section-head\">\u003ch3>特殊性质\u003c/h3>\u003cspan class=\"cost\">0SP · 可多选\u003c/span>\u003c/div>\u003cdiv class=\"chip-grid soul-attribute-grid\">${specialButtons}\u003c/div>\u003cp class=\"mini\">记录已经确立的特殊性质，不设置品质数量上限，也不自动推导战斗数值。\u003c/p>\u003c/section>\n          \u003csection class=\"soul-section extreme-soul-panel\" data-soul-extreme>${soulExtremeMarkup(soul)}\u003c/section>\n          \u003csection class=\"soul-section\">\u003cdiv class=\"section-head\">\u003ch3>武魂主导倾向\u003c/h3>\u003cspan class=\"cost\">行动定位\u003c/span>\u003c/div>\u003cdiv class=\"soul-pill-group dominance-choice-grid\">${dominance}\u003c/div>\u003c/section>\n          ${bodyPanel}\n          \u003csection class=\"soul-section soul-description-section\">\u003cdiv class=\"section-head\">\u003ch3>武魂描述\u003c/h3>\u003cspan class=\"cost\">文本采集\u003c/span>\u003c/div>\u003cdiv class=\"soul-description-grid\">\u003cdiv class=\"field\">\u003clabel>外观与显化\u003c/label>\u003ctextarea data-soul-field=\"appearance\" placeholder=\"记录武魂外观、显化形态与可观察特征\">${dlccEsc(soul.appearance)}\u003c/textarea>\u003c/div>\u003cdiv class=\"field\">\u003clabel>典型战斗方式\u003c/label>\u003ctextarea data-soul-field=\"combatStyle\" placeholder=\"记录常用行动方式与适合制造的局面\">${dlccEsc(soul.combatStyle)}\u003c/textarea>\u003c/div>\u003cdiv class=\"field\">\u003clabel>限制与代价\u003c/label>\u003ctextarea data-soul-field=\"limits\" placeholder=\"记录不能绕过的限制、代价与失败风险\">${dlccEsc(soul.limits)}\u003c/textarea>\u003c/div>\u003cdiv class=\"field\">\u003clabel>能力备注\u003c/label>\u003ctextarea data-soul-field=\"notes\" placeholder=\"记录其他需要长期保留的叙事事实\">${dlccEsc(soul.notes)}\u003c/textarea>\u003c/div>\u003c/div>\u003c/section>\n          \u003csection class=\"ai-fill-panel soul-ai-panel\">\u003cdiv class=\"section-head\">\u003ch3>AI 武魂扩写\u003c/h3>\u003cspan class=\"cost\">SOUL EXPAND\u003c/span>\u003c/div>\u003cdiv class=\"field\">\u003clabel>扩写要求\u003c/label>\u003ctextarea data-ai-prompt=\"soul\">保留名称、品质和分类，只补充外观、战斗方式、限制与能力备注，输出JSON。\u003c/textarea>\u003c/div>\u003cdiv class=\"action-bar\">\u003cbutton class=\"btn\" type=\"button\" data-action=\"ai-soul\">AI扩写当前武魂\u003c/button>\u003cspan class=\"start-status\" data-ai-status=\"soul\">等待调用\u003c/span>\u003c/div>\u003c/section>\n          \u003csection class=\"soul-cost-breakdown\">\u003cdiv class=\"section-head\">\u003ch3>当前武魂消耗：${soulCost}SP\u003c/h3>\u003cspan class=\"cost\">COST LEDGER\u003c/span>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>品质消耗\u003c/span>\u003cstrong>${qualityCost}SP\u003c/strong>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>槽位消耗\u003c/span>\u003cstrong>${slotCost}SP\u003c/strong>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>极致属性消耗\u003c/span>\u003cstrong>${extremeCost}SP\u003c/strong>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>当前武魂合计\u003c/span>\u003cstrong>${soulCost}SP\u003c/strong>\u003c/div>\u003c/section>\n        \u003c/div>\n      \u003c/section>\n    \u003c/div>`;\n  }\n\n  function renderBackground(state) {\n    const list = dlcc$(\"[data-background-list]\");\n    if (list) list.innerHTML = DLCC_RULES.backgroundPresets.map(item => `\u003cbutton class=\"vitem ${item.id === state.draft.background.presetId ? \"active\" : \"\"}\" data-action=\"background\" data-value=\"${item.id}\">\u003cb>${dlccEsc(item.name)}\u003c/b>\u003cspan>${item.cost}SP\u003c/span>\u003c/button>`).join(\"\");\n    const preset = dlccBackground(state.draft.background.presetId);\n    const title = dlcc$(\"[data-background-title]\"); if (title) title.textContent = preset.name;\n    const cost = dlcc$(\"[data-background-cost]\"); if (cost) cost.textContent = `${preset.cost}SP`;\n    const desc = dlcc$(\"[data-background-desc]\"); if (desc) desc.textContent = preset.description;\n  }\n\n  function traitUiGroup(trait) {\n    if (Number(trait.cost || 0) \u003c 0) return \"negative\";\n    return trait.availability === \"character-create-only\" ? \"template\" : \"regular\";\n  }\n\n  function traitUiFacets(trait) {\n    return Object.entries(traitFacetIds).filter(([, ids]) => ids.has(trait.id)).map(([id]) => id);\n  }\n\n  function traitShortName(trait) {\n    return dlccTrim(String(trait.name || \"\").split(/\\s*\\/\\s*/u)[0]) || trait.name || \"未命名特性\";\n  }\n\n  function renderTraits(state) {\n    const groupOptions = [[\"regular\", \"常规特性\"], [\"template\", \"传承模板\"], [\"negative\", \"负面特性\"], [\"selected\", \"已选择\"]];\n    const facetOptions = [[\"all\", \"全部用途\"], [\"combat\", \"战斗体魄\"], [\"soul\", \"武魂修炼\"], [\"survival\", \"生存防护\"], [\"resource\", \"资源装备\"], [\"story\", \"剧情身份\"], [\"relation\", \"社交关系\"]];\n    const costOptions = [[\"all\", \"全部SP\"], [\"35\", \"35SP\"], [\"50\", \"50SP\"], [\"60\", \"60SP\"], [\"100\", \"100SP\"], [\"150\", \"150SP\"], [\"negative\", \"负面返还\"]];\n    const group = groupOptions.some(([id]) => id === state.session.traitGroup) ? state.session.traitGroup : \"regular\";\n    const facet = facetOptions.some(([id]) => id === state.session.traitFacet) ? state.session.traitFacet : \"all\";\n    const cost = costOptions.some(([id]) => id === state.session.traitCost) ? state.session.traitCost : \"all\";\n    const query = dlccTrim(state.session.traitSearch).toLocaleLowerCase(\"zh-CN\");\n    const filterBox = dlcc$(\"[data-trait-filters]\");\n    const searchWasFocused = !!(filterBox && document.activeElement && document.activeElement.matches(\"[data-trait-search]\"));\n    const searchSelection = searchWasFocused ? [document.activeElement.selectionStart, document.activeElement.selectionEnd] : null;\n    const selectedIds = new Set(state.draft.traits);\n    const counts = Object.fromEntries(groupOptions.map(([id]) => [id, id === \"selected\"\n      ? state.draft.traits.length\n      : DLCC_RULES.traits.filter(trait => traitUiGroup(trait) === id).length]));\n    if (filterBox) {\n      filterBox.innerHTML = `\u003cdiv class=\"trait-group-tabs\">${groupOptions.map(([id, label]) => `\u003cbutton class=\"resource-filter ${group === id ? \"active\" : \"\"}\" type=\"button\" data-action=\"trait-group\" data-value=\"${id}\" aria-pressed=\"${group === id ? \"true\" : \"false\"}\">${label}\u003cspan>${counts[id]}\u003c/span>\u003c/button>`).join(\"\")}\u003c/div>\n        \u003cdiv class=\"trait-filter-tools\">\u003cdiv class=\"trait-facet-tabs\">${facetOptions.map(([id, label]) => `\u003cbutton class=\"resource-filter ${facet === id ? \"active\" : \"\"}\" type=\"button\" data-action=\"trait-facet\" data-value=\"${id}\" aria-pressed=\"${facet === id ? \"true\" : \"false\"}\">${label}\u003c/button>`).join(\"\")}\u003c/div>\u003clabel class=\"trait-search-field\">\u003cspan>搜索特性\u003c/span>\u003cinput type=\"search\" data-trait-search value=\"${dlccEsc(state.session.traitSearch)}\" placeholder=\"名称、标签或说明\" />\u003c/label>\u003clabel class=\"trait-cost-field\">\u003cspan>SP筛选\u003c/span>\u003cselect data-trait-cost-filter>${costOptions.map(([id, label]) => `\u003coption value=\"${id}\" ${cost === id ? \"selected\" : \"\"}>${label}\u003c/option>`).join(\"\")}\u003c/select>\u003c/label>\u003c/div>`;\n      if (searchWasFocused) {\n        const input = dlcc$(\"[data-trait-search]\", filterBox);\n        if (input) {\n          input.focus();\n          try { input.setSelectionRange(searchSelection[0], searchSelection[1]); } catch (_) {}\n        }\n      }\n    }\n    const visible = DLCC_RULES.traits.filter(trait => {\n      if (group === \"selected\" ? !selectedIds.has(trait.id) : traitUiGroup(trait) !== group) return false;\n      if (facet !== \"all\" && !traitUiFacets(trait).includes(facet)) return false;\n      if (cost === \"negative\" ? Number(trait.cost || 0) >= 0 : cost !== \"all\" && String(trait.cost) !== cost) return false;\n      if (!query) return true;\n      return [trait.name, trait.tag, trait.description].map(value => dlccTrim(value).toLocaleLowerCase(\"zh-CN\")).some(value => value.includes(query));\n    });\n    const focusedTrait = visible.find(trait => trait.id === state.session.activeTraitId) || visible[0] || null;\n    const box = dlcc$(\"[data-trait-grid]\");\n    if (box) {\n      const indexMarkup = visible.map(trait => {\n        const selected = selectedIds.has(trait.id);\n        const conflict = !selected && trait.exclusiveGroup ? state.draft.traits.map(dlccTrait).find(item => item && item.exclusiveGroup === trait.exclusiveGroup) : null;\n        const active = focusedTrait && focusedTrait.id === trait.id;\n        const price = Number(trait.cost || 0) \u003c 0 ? `返还${Math.abs(Number(trait.cost))}SP` : `${trait.cost}SP`;\n        return `\u003cbutton class=\"trait-index-button ${active ? \"active\" : \"\"} ${selected ? \"is-selected\" : \"\"} ${conflict ? \"is-disabled\" : \"\"}\" type=\"button\" data-action=\"trait-focus\" data-value=\"${trait.id}\" aria-pressed=\"${active ? \"true\" : \"false\"}\" ${conflict ? `aria-label=\"${dlccEsc(trait.name)}，与已选模板冲突\"` : `aria-label=\"${dlccEsc(trait.name)}，${price}\"`}>\u003cb>${dlccEsc(traitShortName(trait))}\u003c/b>\u003cspan>${price}${selected ? \" · 已选\" : \"\"}\u003c/span>\u003c/button>`;\n      }).join(\"\");\n      let detailMarkup = `\u003cdiv class=\"trait-browser-empty\">\u003cb>没有符合条件的特性\u003c/b>\u003cspan>调整规则分类、用途、SP或搜索关键词。\u003c/span>\u003c/div>`;\n      if (focusedTrait) {\n        const selected = selectedIds.has(focusedTrait.id);\n        const conflict = !selected && focusedTrait.exclusiveGroup ? state.draft.traits.map(dlccTrait).find(item => item && item.exclusiveGroup === focusedTrait.exclusiveGroup) : null;\n        const config = state.draft.traitConfigs[focusedTrait.id] || {};\n        const narrative = dlccResolvedNarrative(focusedTrait, config);\n        const facetLabels = traitUiFacets(focusedTrait).map(id => facetOptions.find(([value]) => value === id)).filter(Boolean).map(([, label]) => label);\n        const checkTags = (focusedTrait.checkRules || []).slice(0, 2).map(rule => `\u003cspan class=\"build-brief-tag trait-check-tag\">${dlccEsc(dlccCheckRuleSummary(rule))}\u003c/span>`).join(\"\");\n        detailMarkup = `\u003carticle class=\"v2-trait-card trait-browser-detail ${selected ? \"is-selected\" : \"\"} ${conflict ? \"is-disabled\" : \"\"}\">\u003cdiv class=\"trait-browser-detail-head\">\u003cdiv>\u003cspan class=\"tag\">CURRENT TRAIT\u003c/span>\u003ch4>${dlccEsc(focusedTrait.name)}\u003c/h4>\u003c/div>\u003cspan class=\"cost\">${focusedTrait.cost}SP\u003c/span>\u003c/div>\u003cdiv class=\"build-brief-tags\">\u003cspan class=\"build-brief-tag\">${dlccEsc(focusedTrait.tag)}\u003c/span>${facetLabels.map(label => `\u003cspan class=\"build-brief-tag\">${dlccEsc(label)}\u003c/span>`).join(\"\")}${focusedTrait.availability === \"character-create-only\" ? `\u003cspan class=\"build-brief-tag\">仅角色创建\u003c/span>` : \"\"}${checkTags}\u003c/div>\u003cp>${dlccEsc(focusedTrait.description)}\u003c/p>\u003cdiv class=\"trait-browser-rule-preview\">\u003cdiv>\u003cb>适用范围\u003c/b>\u003cp>${dlccEsc(narrative.scope)}\u003c/p>\u003c/div>\u003cdiv>\u003cb>能力边界\u003c/b>\u003cp>${dlccEsc(narrative.boundary)}\u003c/p>\u003c/div>\u003c/div>${conflict ? `\u003csmall class=\"trait-conflict-note\">已选择「${dlccEsc(conflict.name)}」，请先取消该高阶模板。\u003c/small>` : \"\"}\u003cdiv class=\"trait-card-actions\">\u003cbutton class=\"btn ghost\" type=\"button\" data-action=\"trait-detail\" data-value=\"${focusedTrait.id}\">查看完整规则\u003c/button>\u003cbutton class=\"btn ${selected ? \"ghost\" : \"\"}\" type=\"button\" data-action=\"trait-toggle\" data-value=\"${focusedTrait.id}\" ${conflict ? \"disabled\" : \"\"}>${selected ? \"取消选择\" : \"选择该特性\"}\u003c/button>\u003c/div>\u003c/article>`;\n      }\n      box.innerHTML = `\u003cdiv class=\"trait-browser-summary\">\u003cspan>当前结果\u003c/span>\u003cstrong>${visible.length}\u003c/strong>\u003csmall>${groupOptions.find(([id]) => id === group)[1]} · ${facetOptions.find(([id]) => id === facet)[1]}\u003c/small>\u003c/div>${indexMarkup ? `\u003cdiv class=\"trait-index-grid\">${indexMarkup}\u003c/div>` : \"\"}${detailMarkup}`;\n    }\n    const custom = dlcc$(\"[data-custom-trait-panel]\");\n    const overlay = dlcc$(\"[data-trait-detail-overlay]\");\n    const detailTrait = dlccTrait(state.session.activeTraitDetail) || null;\n    if (overlay) {\n      overlay.hidden = !detailTrait;\n      overlay.setAttribute(\"aria-hidden\", detailTrait ? \"false\" : \"true\");\n    }\n    if (custom) {\n      if (!detailTrait) custom.innerHTML = \"\";\n      else {\n        const config = state.draft.traitConfigs[detailTrait.id] || {};\n        const resolvedNarrative = dlccResolvedNarrative(detailTrait, config);\n        const resolvedChecks = dlccResolvedCheckRules(detailTrait, config);\n        const narrativeLabels = [[\"scope\", \"适用范围\"], [\"effectFact\", \"效果事实\"], [\"boundary\", \"能力边界\"], [\"usageCondition\", \"触发或使用条件\"], [\"maintenanceCondition\", \"维持条件\"], [\"costConsequence\", \"代价与后果\"], [\"recoveryCondition\", \"恢复条件\"], [\"growthCondition\", \"成长条件\"], [\"worldLimitedUses\", \"世界观有限次数\"]];\n        const ruleRows = narrativeLabels.map(([key, label]) => `\u003cdiv class=\"trait-rule-row\">\u003cb>${label}\u003c/b>\u003cp>${dlccEsc(resolvedNarrative[key])}\u003c/p>\u003c/div>`).join(\"\");\n        const checkRows = resolvedChecks.length ? `\u003csection class=\"trait-check-section\">\u003cdiv class=\"section-head\">\u003ch3>D20检定\u003c/h3>\u003cspan class=\"cost\">${dlccEsc(DLCC_RULES.traitCheckSystem.attributeModifierFormula)}\u003c/span>\u003c/div>\u003cp class=\"mini\">${dlccEsc(DLCC_RULES.traitCheckSystem.resolutionFormula)}。${dlccEsc(DLCC_RULES.traitCheckSystem.advantageStacking)}。\u003c/p>\u003cdiv class=\"trait-rule-list\">${resolvedChecks.map(rule => `\u003cdiv class=\"trait-rule-row trait-check-rule\">\u003cb>${dlccEsc(dlccCheckRuleSummary(rule))} · ${dlccEsc(rule.name)}\u003c/b>\u003cp>${dlccEsc(dlccCheckRuleText(rule)).replace(/\\n/g, \"\u003cbr>\")}\u003c/p>\u003c/div>`).join(\"\")}\u003c/div>\u003cp class=\"mini\">${dlccEsc(DLCC_RULES.traitCheckSystem.preparationPolicy)}；${dlccEsc(DLCC_RULES.traitCheckSystem.failureAgencyBoundary)}。\u003c/p>\u003c/section>` : \"\";\n        const configFields = detailTrait.configSchema ? `\u003csection class=\"trait-config-section\">\u003cdiv class=\"section-head\">\u003ch3>${dlccEsc(detailTrait.configSchema.title || \"模板配置\")}\u003c/h3>\u003cspan class=\"cost\">${state.draft.traits.includes(detailTrait.id) ? \"已选择\" : \"可预先填写\"}\u003c/span>\u003c/div>\u003cdiv class=\"trait-config-grid\">${detailTrait.configSchema.fields.map(field => `\u003cdiv class=\"field\">\u003clabel>${dlccEsc(field.label)}${field.required ? \" *\" : \"\"}\u003c/label>${field.type === \"textarea\" ? `\u003ctextarea data-bind=\"traitConfigs.${dlccEsc(detailTrait.id)}.${dlccEsc(field.key)}\" placeholder=\"${dlccEsc(field.placeholder || \"\")}\">${dlccEsc(config[field.key] || \"\")}\u003c/textarea>` : `\u003cinput data-bind=\"traitConfigs.${dlccEsc(detailTrait.id)}.${dlccEsc(field.key)}\" value=\"${dlccEsc(config[field.key] || \"\")}\" placeholder=\"${dlccEsc(field.placeholder || \"\")}\" />`}\u003c/div>`).join(\"\")}\u003c/div>\u003cp class=\"mini\">取消选择不会清空这里已经填写的内容。\u003c/p>\u003c/section>` : \"\";\n        const resolvedSoulTemplates = Array.isArray(detailTrait.soulTemplates) ? dlccResolveTemplate(detailTrait.soulTemplates, config) : [];\n        const soulTemplateDetails = resolvedSoulTemplates.length ? `\u003csection class=\"trait-template-section\">\u003cdiv class=\"section-head\">\u003ch3>武魂模板详情\u003c/h3>\u003cspan class=\"cost\">AI REBUILD INPUT\u003c/span>\u003c/div>\u003cdiv class=\"trait-rule-list\">${resolvedSoulTemplates.map(item => {\n          const ringPattern = item.ringPattern && typeof item.ringPattern === \"object\" ? [\n            `${item.ringPattern.name || \"复合魂环\"}：${(item.ringPattern.colors || []).map(color => color.name || color.effectRole).filter(Boolean).join(\" / \")}`,\n            item.ringPattern.normalModePolicy,\n            item.ringPattern.ringRecordPolicy,\n          ].filter(Boolean).join(\"；\") : \"\";\n          const trueBody = item.trueBody && typeof item.trueBody === \"object\" ? [\n            `${item.trueBody.name || \"武魂真身\"}：${item.trueBody.unlockCondition || \"按武魂真身规则解锁\"}`,\n            item.trueBody.clockOverride,\n            item.trueBody.causalAuthority,\n            item.trueBody.actionPermission,\n            item.trueBody.reversalBoundary,\n          ].filter(Boolean).join(\"；\") : \"\";\n          const daily = item.trueBody && item.trueBody.dailySurvival ? [\n            `每个世界内自然日${item.trueBody.dailySurvival.usesPerWorldDay || 1}次`,\n            item.trueBody.dailySurvival.trigger,\n            item.trueBody.dailySurvival.effect,\n            item.trueBody.dailySurvival.reset,\n            item.trueBody.dailySurvival.retainedConsequences,\n            item.trueBody.dailySurvival.exclusions,\n          ].filter(Boolean).join(\"；\") : \"\";\n          const lines = [\n            `重构方式：${item.mode === \"merge-first\" ? \"融合强化玩家第一武魂\" : item.mode === \"fixed\" ? `固定核心模板，目标槽位${item.slot}` : `按玩家配置建立模板，目标槽位${item.slot}`}`,\n            `品质：${item.qualityName || \"未声明，沿用玩家原稿品质\"}${item.qualityPolicy === \"higher-wins\" ? \"，与玩家原稿取较高品质\" : \"\"}`,\n            `来源：${item.fixedSource || \"未填写\"}`,\n            `类型与属性：${[item.category, item.attributes].filter(Boolean).join(\"；\") || \"未填写\"}`,\n            ringPattern ? `魂环规则：${ringPattern}` : \"\",\n            trueBody ? `武魂真身：${trueBody}` : \"\",\n            daily ? `有限次数：${daily}` : \"\",\n            `核心能力：${item.coreAbility || \"未填写\"}`,\n            `边界：${item.boundary || \"未填写\"}`,\n          ].filter(Boolean);\n          return `\u003cdiv class=\"trait-rule-row\">\u003cb>${dlccEsc(item.name || \"未命名武魂模板\")}\u003c/b>\u003cp>${lines.map(dlccEsc).join(\"\u003cbr>\")}\u003c/p>\u003c/div>`;\n        }).join(\"\")}\u003c/div>\u003c/section>` : \"\";\n        const attachments = [\n          ...(detailTrait.soulTemplates || []).map(item => `武魂模板：${item.name}`),\n          ...(detailTrait.assetTemplates || []).map(item => `附带资源：${item.name}`),\n          ...(detailTrait.longTermLine ? [`长期路线：${detailTrait.longTermLine.name}`] : []),\n        ];\n        custom.innerHTML = `\u003cdiv class=\"section-head trait-detail-head\">\u003cdiv>\u003cspan class=\"tag\">FULL NARRATIVE RULE\u003c/span>\u003ch3>${dlccEsc(detailTrait.name)}\u003c/h3>\u003c/div>\u003cdiv class=\"trait-detail-head-actions\">\u003cspan class=\"cost\">${detailTrait.cost}SP\u003c/span>\u003cbutton class=\"trait-detail-close\" type=\"button\" data-action=\"trait-detail-close\" aria-label=\"关闭特性详情\">×\u003c/button>\u003c/div>\u003c/div>\u003cp class=\"page-note\">${dlccEsc(detailTrait.description)}\u003c/p>\u003cdiv class=\"trait-rule-list\">${ruleRows}\u003c/div>${checkRows}${soulTemplateDetails}${attachments.length ? `\u003cdiv class=\"build-brief-tags\">${attachments.map(text => `\u003cspan class=\"build-brief-tag\">${dlccEsc(text)}\u003c/span>`).join(\"\")}\u003c/div>` : \"\"}${configFields}`;\n      }\n    }\n    syncBoundInputs(state, custom || DLCC_ROOT);\n  }\n\n  function renderBonds(state) {\n    const controls = dlcc$(\"[data-bond-controls]\");\n    const profiles = dlcc$(\"[data-bond-profiles]\");\n    if (!controls || !profiles) return;\n    const era = eraOf(state);\n    const groups = dlccBondGroups(era.id);\n    const selected = dlccSelectedBondCharacters(state.draft);\n    if (!groups.length) {\n      controls.innerHTML = `\u003cdiv class=\"section-head\">\u003ch3>角色性别控制\u003c/h3>\u003cspan class=\"cost\">${dlccEsc(era.name)}\u003c/span>\u003c/div>\u003cp class=\"page-note\">当前时代暂无预设角色控制项。\u003c/p>`;\n    } else {\n      const strip = selected.length\n        ? selected.map(item => `\u003cspan>${dlccEsc(item.groupName)}：${dlccEsc(item.name)} / ${dlccEsc(item.version)} / ${dlccEsc(item.relationshipTendency)}\u003c/span>`).join(\"\")\n        : \"尚未选择角色版本\";\n      controls.innerHTML = `\u003cdiv class=\"section-head\">\u003ch3>角色性别控制\u003c/h3>\u003cspan class=\"cost\">${dlccEsc(era.name)}\u003c/span>\u003c/div>\u003cdiv class=\"bond-active-strip\">${strip}\u003c/div>\u003cdiv class=\"bond-control-list\">${groups.map(group => {\n        const selectedId = state.draft.bonds.selections[group.id];\n        const relation = state.draft.bonds.relations[group.id] || \"陌生\";\n        return `\u003csection class=\"bond-control-group\">\u003cdiv class=\"bond-group-head\">\u003cdiv>\u003cb>${dlccEsc(group.name)}\u003c/b>\u003csmall>${dlccEsc(group.note || \"\")}\u003c/small>\u003c/div>\u003cspan>${selectedId ? \"已选择\" : \"可选一项\"}\u003c/span>\u003c/div>\u003cdiv class=\"bond-option-grid\">${group.options.map(option => {\n          const active = selectedId === option.id;\n          return `\u003cbutton class=\"bond-option ${active ? \"active\" : \"\"}\" type=\"button\" data-action=\"bond-option\" data-group=\"${dlccEsc(group.id)}\" data-value=\"${dlccEsc(option.id)}\" aria-pressed=\"${active ? \"true\" : \"false\"}\">\u003cspan class=\"bond-option-mark\">${active ? \"✓\" : \"○\"}\u003c/span>\u003cb>${dlccEsc(option.name)}\u003c/b>\u003cstrong>${dlccEsc(option.gender)}\u003c/strong>\u003csmall>${dlccEsc(option.version)}\u003c/small>\u003cem>${dlccEsc((option.entries || []).join(\" / \"))}\u003c/em>\u003c/button>`;\n        }).join(\"\")}\u003c/div>${selectedId ? `\u003cdiv class=\"bond-relation-row\">\u003cb>与玩家关系倾向\u003c/b>\u003cdiv class=\"button-group\">${DLCC_CATALOG.relationshipTendencies.map(option => `\u003cbutton class=\"select-btn ${relation === option ? \"active\" : \"\"}\" type=\"button\" data-action=\"bond-relation\" data-group=\"${dlccEsc(group.id)}\" data-value=\"${dlccEsc(option)}\">${dlccEsc(option)}\u003c/button>`).join(\"\")}\u003c/div>\u003c/div>` : \"\"}\u003c/section>`;\n      }).join(\"\")}\u003c/div>\u003cp class=\"quality-note\">同一角色组内只会激活一个性别/版本；关系倾向和精确世界书条目会随档案导出给 Agent。\u003c/p>`;\n    }\n\n    const fields = [[\"name\", \"姓名\"], [\"identity\", \"身份\"], [\"relationship\", \"关系\"], [\"favorTrend\", \"好感倾向\"], [\"plotPurpose\", \"剧情用途\"], [\"notes\", \"备注\"]];\n    profiles.innerHTML = `\u003cdiv class=\"holo-panel panel-pad stack bond-profile-panel\">\u003cdiv class=\"section-head\">\u003ch3>结构化羁绊预留\u003c/h3>\u003cspan class=\"cost\">NPC LINKS\u003c/span>\u003c/div>${DLCC_CATALOG.profileTypes.map(type => {\n      const items = state.draft.bonds.profiles[type.id] || [];\n      return `\u003csection class=\"bond-profile-section\">\u003cdiv class=\"bond-profile-head\">\u003cb>${dlccEsc(type.title)}\u003c/b>\u003cbutton class=\"btn ghost\" type=\"button\" data-action=\"bond-profile-add\" data-value=\"${dlccEsc(type.id)}\">新增${dlccEsc(type.title)}\u003c/button>\u003c/div>${items.length ? items.map((item, index) => `\u003carticle class=\"bond-profile-row\" data-bond-profile-row=\"${dlccEsc(type.id)}-${index}\">\u003cbutton class=\"bond-profile-remove\" type=\"button\" data-action=\"bond-profile-remove\" data-value=\"${dlccEsc(type.id)}\" data-index=\"${index}\">删除\u003c/button>${fields.map(([key, label]) => `\u003cdiv class=\"field\">\u003clabel>${label}\u003c/label>\u003cinput data-bind=\"bonds.profiles.${dlccEsc(type.id)}.${index}.${key}\" placeholder=\"${label}\" />\u003c/div>`).join(\"\")}\u003c/article>`).join(\"\") : `\u003cp class=\"mini\">${dlccEsc(type.empty)}\u003c/p>`}\u003c/section>`;\n    }).join(\"\")}\u003c/div>`;\n    syncBoundInputs(state, profiles, true);\n  }\n\n  function renderValidation(state) {\n    const box = dlcc$(\"[data-validation]\");\n    if (box) {\n      const messages = state.derived.errors.map(text => `\u003cdiv class=\"v2-notice is-error\">${dlccEsc(text)}\u003c/div>`).concat(state.derived.warnings.map(text => `\u003cdiv class=\"v2-notice\">${dlccEsc(text)}\u003c/div>`));\n      box.innerHTML = messages.length ? messages.join(\"\") : `\u003cdiv class=\"v2-notice is-ok\">档案结构有效，可以发送。\u003c/div>`;\n    }\n    const summary = dlcc$(\"[data-cost-summary]\");\n    if (summary) summary.innerHTML = `\u003cdiv class=\"sum-row\">\u003cspan>SP净支出\u003c/span>\u003cstrong>${state.derived.sp.spent} / ${DLCC_RULES.points.sp}\u003c/strong>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>负面特性返还\u003c/span>\u003cstrong>${state.derived.sp.negativeRefundApplied} / ${state.derived.sp.negativeRefundRaw}（上限${state.derived.sp.negativeRefundCap}）\u003c/strong>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>AP\u003c/span>\u003cstrong>${state.derived.ap.spent} / ${DLCC_RULES.points.ap}\u003c/strong>\u003c/div>\u003cdiv class=\"sum-row\">\u003cspan>DP\u003c/span>\u003cstrong>${state.derived.dp.spent} / ${DLCC_RULES.points.dp}\u003c/strong>\u003c/div>`;\n  }\n\n  function renderPreview(state) {\n    const archive = dlccArchive(state.draft);\n    const box = dlcc$(\"[data-preview]\");\n    if (box) box.innerHTML = `\u003cdiv class=\"holo-panel panel-pad stack\">\u003ch3>${dlccEsc(archive.profile.name || \"未命名角色\")}\u003c/h3>\u003cp>${dlccEsc([archive.world.era, archive.world.location, archive.profile.role].filter(Boolean).join(\" · \"))}\u003c/p>\u003cdiv class=\"build-brief-tags\">${archive.specialties.map(item => `\u003cspan class=\"build-brief-tag\">${dlccEsc(item.name)}·${dlccEsc(item.rank)}\u003c/span>`).join(\"\")}\u003c/div>\u003cp>${dlccEsc(archive.profile.concept || \"尚未填写角色概念\")}\u003c/p>\u003c/div>`;\n    const output = dlcc$(\"[data-output]\");\n    if (output) { output.value = dlccArchiveText(archive); output.dataset.payload = JSON.stringify(archive); }\n  }\n\n  function renderNotices(state) {\n    [[\"profile\", \"[data-action='ai-profile']\"], [\"soul\", \"[data-action='ai-soul']\"]].forEach(([key, selector]) => {\n      const button = dlcc$(selector);\n      if (button) button.disabled = !state.session.aiAvailable || !!state.session.busy[key];\n    });\n    [[\"profile\", \"[data-ai-status='profile']\"], [\"soul\", \"[data-ai-status='soul']\"], [\"send\", \"[data-send-status]\"]].forEach(([key, selector]) => {\n      const node = dlcc$(selector);\n      const notice = state.session.notices[key] || {};\n      if (node && notice.text) { node.textContent = notice.text; node.dataset.status = notice.mode || \"\"; }\n    });\n  }\n\n  function renderDraftManager(state, repository) {\n    const box = dlcc$(\"[data-draft-manager]\");\n    if (!box) return;\n    const slots = repository.list();\n    const notice = state.session.notices.draft || {};\n    box.innerHTML = `\u003cdiv class=\"section-head\">\u003ch3>v2本地草稿\u003c/h3>\u003cspan class=\"cost\">3 SLOTS\u003c/span>\u003c/div>${notice.text ? `\u003cdiv class=\"v2-notice ${notice.mode === \"error\" ? \"is-error\" : notice.mode === \"ok\" ? \"is-ok\" : \"\"}\">${dlccEsc(notice.text)}\u003c/div>` : \"\"}\u003cdiv class=\"draft-slot-grid\">${slots.map(slot => `\u003csection class=\"draft-slot\">\u003cb>${slot.slotId}\u003c/b>\u003cspan>${dlccEsc(slot.previewName || \"空槽位\")}\u003c/span>\u003csmall>${dlccEsc(slot.savedAt || \"\")}\u003c/small>\u003cdiv class=\"action-bar\">\u003cbutton class=\"btn ghost\" data-action=\"draft-save\" data-value=\"${slot.slotId}\">保存\u003c/button>\u003cbutton class=\"btn ghost\" data-action=\"draft-load\" data-value=\"${slot.slotId}\" ${slot.previewName ? \"\" : \"disabled\"}>读取\u003c/button>\u003cbutton class=\"btn ghost\" data-action=\"draft-delete\" data-value=\"${slot.slotId}\" ${slot.previewName ? \"\" : \"disabled\"}>删除\u003c/button>\u003c/div>\u003c/section>`).join(\"\")}\u003c/div>\u003cdiv class=\"field\">\u003clabel>导入/导出v2草稿JSON\u003c/label>\u003ctextarea data-draft-transfer>\u003c/textarea>\u003c/div>\u003cdiv class=\"action-bar\">\u003cbutton class=\"btn ghost\" data-action=\"draft-export\">导出当前草稿\u003c/button>\u003cbutton class=\"btn\" data-action=\"draft-import\">导入v2草稿\u003c/button>\u003c/div>`;\n  }\n\n  function syncBoundInputs(state, base = DLCC_ROOT, force = false) {\n    dlcc$$(\"[data-bind]\", base).forEach(node => {\n      const value = dlccPathGet(state.draft, node.dataset.bind);\n      if (node.type === \"checkbox\") node.checked = !!value;\n      else if (force || document.activeElement !== node) node.value = value == null ? \"\" : value;\n    });\n  }\n\n  async function renderAvatar(state) {\n    const source = await avatarRepository.resolve(state.session.avatar || avatarRepository.getAvatar());\n    const img = dlcc$(\"[data-avatar-img]\");\n    const placeholder = dlcc$(\"[data-avatar-placeholder]\");\n    if (!img || !placeholder) return;\n    if (source) { img.src = source; img.style.display = \"block\"; placeholder.style.display = \"none\"; }\n    else { img.removeAttribute(\"src\"); img.style.display = \"none\"; placeholder.style.display = \"grid\"; }\n  }\n\n  function renderNow(state, dirty, repository) {\n    const all = dirty.has(\"all\");\n    const pointDirty = all || [\"derived\", \"daily\", \"specialties\", \"souls\", \"background\", \"traits\"].some(key => dirty.has(key));\n    if (all || dirty.has(\"page\")) renderStages(state);\n    if (all || dirty.has(\"world\")) renderWorld(state);\n    if (all || dirty.has(\"daily\")) renderDaily(state);\n    if (all || dirty.has(\"specialties\")) renderSpecialties(state);\n    if (all || dirty.has(\"profile\") || dirty.has(\"derived\")) renderProfileSummary(state);\n    if (pointDirty) renderPoints(state);\n    if (all || dirty.has(\"souls\")) renderSouls(state);\n    if (!all && dirty.has(\"soul-extreme\")) renderSoulExtreme(state);\n    if (all || dirty.has(\"background\")) renderBackground(state);\n    if (all || dirty.has(\"traits\")) renderTraits(state);\n    if (all || dirty.has(\"bonds\")) renderBonds(state);\n    if (all || dirty.has(\"preview\") || dirty.has(\"derived\")) { renderValidation(state); renderPreview(state); }\n    if (all || dirty.has(\"notices\")) renderNotices(state);\n    if (all || dirty.has(\"drafts\")) renderDraftManager(state, repository);\n    if (all) { syncBoundInputs(state, DLCC_ROOT, true); renderAvatar(state); }\n  }\n\n  return {\n    schedule(state, dirty, repository) {\n      dirty.forEach(item => pendingDirty.add(item));\n      if (scheduled) return;\n      scheduled = true;\n      queueMicrotask(() => {\n        scheduled = false;\n        const next = new Set(pendingDirty); pendingDirty.clear();\n        renderNow(store.getState(), next, repository);\n      });\n    },\n    renderAll(repository) { renderNow(store.getState(), new Set([\"all\"]), repository); },\n    syncInputs() { syncBoundInputs(store.getState(), DLCC_ROOT, true); },\n    renderAvatar: () => renderAvatar(store.getState()),\n  };\n}\n\nfunction dlccCreateController(deps) {\n  const { store, views, drafts, runtime, identity, avatar, ai, chat } = deps;\n  const abort = new AbortController();\n  let aiAvailabilityTimer = 0;\n  let removalObserver = null;\n  let disposed = false;\n  let sendPromise = null;\n  const avatarEventHosts = [];\n\n  function notice(key, text, mode = \"\", dirty = [\"notices\"]) {\n    store.dispatch({ type: \"notice\", key, text, mode, dirty });\n  }\n\n  function refreshAiAvailability(announce = false) {\n    const available = ai.available();\n    const previous = !!store.getState().session.aiAvailable;\n    if (available !== previous) store.dispatch({ type: \"set-session\", path: \"aiAvailable\", value: available, dirty: [\"notices\"] });\n    if (available && !previous && announce) {\n      notice(\"profile\", \"TavernDB AI接口已就绪\", \"ok\");\n      notice(\"soul\", \"TavernDB AI接口已就绪\", \"ok\");\n    }\n    return available;\n  }\n\n  function stopAiAvailabilityWatch() {\n    if (aiAvailabilityTimer) window.clearInterval(aiAvailabilityTimer);\n    aiAvailabilityTimer = 0;\n  }\n\n  function startAiAvailabilityWatch() {\n    if (refreshAiAvailability(false)) { stopAiAvailabilityWatch(); return; }\n    if (aiAvailabilityTimer) return;\n    aiAvailabilityTimer = window.setInterval(() => {\n      if (refreshAiAvailability(true)) stopAiAvailabilityWatch();\n    }, 750);\n  }\n\n  function requireAi(key) {\n    if (refreshAiAvailability(false)) return true;\n    startAiAvailabilityWatch();\n    notice(key, \"TavernDB AI接口尚未就绪\", \"error\");\n    return false;\n  }\n\n  function draftDirty(path) {\n    const head = dlccText(path).split(\".\")[0];\n    if (head === \"world\") return [\"world\", \"derived\", \"preview\", \"profile\"];\n    if (head === \"daily\") return [\"daily\", \"derived\", \"preview\", \"profile\"];\n    if (head === \"specialties\" || head === \"customSpecialty\") return [\"specialties\", \"derived\", \"preview\", \"profile\"];\n    if (head === \"souls\") return [\"souls\", \"derived\", \"preview\"];\n    if (head === \"traits\" || head === \"traitConfigs\" || head === \"customTrait\") return [\"traits\", \"derived\", \"preview\"];\n    if (head === \"background\") return [\"background\", \"derived\", \"preview\"];\n    if (head === \"bonds\") return [\"preview\"];\n    return [\"profile\", \"derived\", \"preview\"];\n  }\n\n  function setDraft(path, value, dirty = draftDirty(path)) {\n    store.dispatch({ type: \"set-draft\", path, value, dirty });\n    if (path === \"profile.name\") identity.writeName(value);\n  }\n\n  function setPage(value) {\n    const page = Math.max(0, Math.min(DLCC_STAGES.length - 1, Number(value) || 0));\n    if (page !== 3 && store.getState().session.activeTraitDetail) {\n      store.dispatch({ type: \"set-session\", path: \"activeTraitDetail\", value: \"\", dirty: [\"traits\"] });\n    }\n    store.dispatch({ type: \"set-session\", path: \"page\", value: page, dirty: [\"page\", page === 5 ? \"preview\" : \"\"] });\n  }\n\n  function selectEra(eraId) {\n    const era = DLCC_RULES.eras.find(item => item.id === eraId);\n    if (!era) return;\n    store.dispatch({ type: \"mutate-draft\", dirty: [\"world\", \"bonds\", \"derived\", \"preview\", \"profile\"], mutate(draft) {\n      draft.world.eraId = era.id;\n      draft.world.location = era.locations[0];\n      draft.world.chapter = dlccChapterOptions(era.id)[0].id;\n      draft.world.customChapter = \"\";\n    } });\n  }\n\n  function stepDaily(id, delta) {\n    const item = DLCC_RULES.dailyAttributes.find(entry => entry.id === id);\n    if (!item) return;\n    const current = Number(store.getState().draft.daily[id] || 8);\n    setDraft(`daily.${id}`, Math.max(8, Math.min(15, current + Number(delta || 0))), [\"daily\", \"derived\", \"preview\", \"profile\"]);\n  }\n\n  function setSpecialty(id, rank) {\n    if (!DLCC_RULES.specialties.some(item => item.id === id) || ![\"none\", \"proficient\", \"expert\"].includes(rank)) return;\n    setDraft(`specialties.${id}`, rank, [\"specialties\", \"derived\", \"preview\", \"profile\"]);\n  }\n\n  function toggleTrait(id) {\n    const trait = dlccTrait(id);\n    if (!trait) return;\n    const state = store.getState();\n    if (!state.draft.traits.includes(id) && trait.exclusiveGroup) {\n      const conflict = state.draft.traits.map(dlccTrait).find(item => item && item.id !== id && item.exclusiveGroup === trait.exclusiveGroup);\n      if (conflict) {\n        store.dispatch({ type: \"set-session\", path: \"activeTraitDetail\", value: id, dirty: [\"traits\"] });\n        return;\n      }\n    }\n    store.dispatch({ type: \"mutate-draft\", dirty: [\"traits\", \"derived\", \"preview\"], mutate(draft) { draft.traits = draft.traits.includes(id) ? draft.traits.filter(value => value !== id) : draft.traits.concat(id); } });\n  }\n\n  function toggleBondOption(groupId, optionId) {\n    const group = dlccBondGroups(store.getState().draft.world.eraId).find(item => item.id === groupId);\n    if (!group || !group.options.some(item => item.id === optionId)) return;\n    store.dispatch({ type: \"mutate-draft\", dirty: [\"bonds\", \"preview\"], mutate(draft) {\n      if (draft.bonds.selections[groupId] === optionId) {\n        delete draft.bonds.selections[groupId];\n        delete draft.bonds.relations[groupId];\n      } else {\n        draft.bonds.selections[groupId] = optionId;\n        if (!draft.bonds.relations[groupId]) draft.bonds.relations[groupId] = \"陌生\";\n      }\n    } });\n  }\n\n  function setBondRelation(groupId, relation) {\n    if (!store.getState().draft.bonds.selections[groupId] || !DLCC_CATALOG.relationshipTendencies.includes(relation)) return;\n    setDraft(`bonds.relations.${groupId}`, relation, [\"bonds\", \"preview\"]);\n  }\n\n  function addBondProfile(type) {\n    if (!DLCC_CATALOG.profileTypes.some(item => item.id === type)) return;\n    store.dispatch({ type: \"mutate-draft\", dirty: [\"bonds\", \"preview\"], mutate(draft) {\n      draft.bonds.profiles[type].push({ name: \"\", identity: \"\", relationship: \"\", favorTrend: \"\", plotPurpose: \"\", notes: \"\" });\n    } });\n  }\n\n  function removeBondProfile(type, index) {\n    if (!DLCC_CATALOG.profileTypes.some(item => item.id === type) || !Number.isInteger(index)) return;\n    store.dispatch({ type: \"mutate-draft\", dirty: [\"bonds\", \"preview\"], mutate(draft) {\n      if (draft.bonds.profiles[type] && draft.bonds.profiles[type][index]) draft.bonds.profiles[type].splice(index, 1);\n    } });\n  }\n\n  function mutateSoul(index, mutate, dirty = [\"souls\", \"derived\", \"preview\"]) {\n    store.dispatch({ type: \"mutate-draft\", dirty, mutate(draft) { const soul = draft.souls[index]; if (soul) mutate(soul, draft); } });\n  }\n\n  function normalizeSoulExtreme(soul) {\n    const options = dlccExtremeOptions(soul);\n    if (!soul.extreme || typeof soul.extreme !== \"object\") soul.extreme = { enabled: false, attribute: \"\" };\n    if (!options.includes(soul.extreme.attribute)) {\n      soul.extreme.enabled = false;\n      soul.extreme.attribute = \"\";\n    }\n  }\n\n  function toggleSoulAttribute(kind, value) {\n    const allowed = kind === \"special\" ? DLCC_RULES.soulSpecialAttributes : DLCC_RULES.soulNormalAttributes;\n    const field = kind === \"special\" ? \"specialAttributes\" : \"normalAttributes\";\n    if (!allowed.includes(value)) return;\n    mutateSoul(store.getState().session.activeSoul, soul => {\n      soul[field] = soul[field].includes(value) ? soul[field].filter(item => item !== value) : soul[field].concat(value);\n      normalizeSoulExtreme(soul);\n    });\n  }\n\n  async function aiProfile() {\n    if (store.getState().session.busy.profile) return;\n    if (!requireAi(\"profile\")) return;\n    store.dispatch({ type: \"busy\", key: \"profile\", value: true, dirty: [\"notices\"] });\n    notice(\"profile\", \"AI正在扩写...\", \"pending\");\n    try {\n      const prompt = dlcc$(\"[data-ai-prompt='profile']\")?.value || \"\";\n      const snapshot = store.getState().draft;\n      const allowed = [\"name\", \"gender\", \"age\", \"role\", \"appearance\", \"personality\", \"outfit\", \"concept\", \"goal\", \"canonRelation\"];\n      const result = await ai.generateJson(\"根据角色创建草稿扩写profile字段。只返回一个顶层JSON对象，不要使用profile外层包装；键只允许name,gender,age,role,appearance,personality,outfit,concept,goal,canonRelation，值必须是非空字符串。例如：{\\\"appearance\\\":\\\"...\\\",\\\"personality\\\":\\\"...\\\"}。不得改动世界线、点数、武魂和天赋模板。\" + prompt, { world: snapshot.world, profile: snapshot.profile });\n      if (!result.ok) { notice(\"profile\", result.message, \"error\"); return; }\n      const selected = ai.selectFields(result.data, \"profile\", allowed);\n      if (!selected.ok) { notice(\"profile\", selected.message, \"error\"); return; }\n      const applied = [];\n      store.dispatch({ type: \"mutate-draft\", dirty: [\"all\"], mutate(draft) {\n        allowed.forEach(key => {\n          if (Object.prototype.hasOwnProperty.call(selected.data.patch, key) && !dlccTrim(draft.profile[key])) {\n            draft.profile[key] = selected.data.patch[key];\n            applied.push(key);\n          }\n        });\n      } });\n      views.syncInputs();\n      const visibleWriteFailures = applied.filter(key => {\n        const node = dlcc$(`[data-bind='profile.${key}']`);\n        return !node || dlccText(node.value) !== dlccText(selected.data.patch[key]);\n      });\n      if (!DLCC_ROOT.isConnected || visibleWriteFailures.length) {\n        notice(\"profile\", `AI已更新草稿，但页面字段同步失败：${visibleWriteFailures.join(\"、\") || \"页面已刷新\"}，请重试`, \"error\");\n        return;\n      }\n      identity.writeName(store.getState().draft.profile.name);\n      notice(\"profile\", applied.length ? `AI扩写完成，已写入${applied.length}个字段（仅填空）` : \"AI扩写完成；现有输入均已保留\", \"ok\");\n    } catch (error) {\n      notice(\"profile\", `AI写入失败：${error.message || error}`, \"error\");\n    } finally {\n      store.dispatch({ type: \"busy\", key: \"profile\", value: false, dirty: [\"notices\"] });\n    }\n  }\n\n  async function aiSoul() {\n    if (store.getState().session.busy.soul) return;\n    if (!requireAi(\"soul\")) return;\n    const index = store.getState().session.activeSoul;\n    const soul = store.getState().draft.souls[index];\n    if (!soul || !soul.unlocked) return;\n    store.dispatch({ type: \"busy\", key: \"soul\", value: true, dirty: [\"notices\"] });\n    notice(\"soul\", \"AI正在扩写...\", \"pending\");\n    try {\n      const prompt = dlcc$(\"[data-ai-prompt='soul']\")?.value || \"\";\n      const allowed = [\"appearance\", \"combatStyle\", \"limits\", \"notes\"];\n      const result = await ai.generateJson(\"扩写武魂叙事事实。只返回一个顶层JSON对象，不要使用soul外层包装；键只允许appearance,combatStyle,limits,notes，值必须是非空字符串。例如：{\\\"appearance\\\":\\\"...\\\",\\\"combatStyle\\\":\\\"...\\\"}。禁止生成伤害、攻击、防御、暴击、倍率、HP或自动冷却。\" + prompt, { profile: store.getState().draft.profile, soul });\n      if (!result.ok) { notice(\"soul\", result.message, \"error\"); return; }\n      const selected = ai.selectFields(result.data, \"soul\", allowed);\n      if (!selected.ok) { notice(\"soul\", selected.message, \"error\"); return; }\n      const applied = [];\n      mutateSoul(index, target => allowed.forEach(key => {\n        if (Object.prototype.hasOwnProperty.call(selected.data.patch, key) && !dlccTrim(target[key])) {\n          target[key] = selected.data.patch[key];\n          applied.push(key);\n        }\n      }), [\"souls\", \"preview\"]);\n      notice(\"soul\", applied.length ? `AI扩写完成，已写入${applied.length}个字段（仅填空）` : \"AI扩写完成；现有输入均已保留\", \"ok\");\n    } catch (error) {\n      notice(\"soul\", `AI写入失败：${error.message || error}`, \"error\");\n    } finally {\n      store.dispatch({ type: \"busy\", key: \"soul\", value: false, dirty: [\"notices\"] });\n    }\n  }\n\n  async function chooseAvatar() {\n    const input = dlcc$(\"[data-avatar-input]\");\n    if (input) input.click();\n  }\n\n  async function saveAvatar(file) {\n    const result = await avatar.saveFile(file);\n    notice(\"profile\", result.message, result.ok ? \"ok\" : \"error\");\n    if (result.ok) {\n      store.dispatch({ type: \"set-session\", path: \"avatar\", value: result.data, dirty: [] });\n      views.renderAvatar();\n    }\n  }\n\n  function loadDraftResult(result) {\n    if (!result.ok) { notice(\"draft\", result.message, \"error\", [\"drafts\"]); return result; }\n    store.dispatch({ type: \"replace-draft\", draft: result.data.draft });\n    identity.writeName(store.getState().draft.profile.name);\n    notice(\"draft\", result.message, \"ok\", [\"drafts\"]);\n    return result;\n  }\n\n  async function copyExport() {\n    const text = dlcc$(\"[data-output]\")?.value || \"\";\n    try { await navigator.clipboard.writeText(text); notice(\"send\", \"档案已复制\", \"ok\"); }\n    catch (_) {\n      const output = dlcc$(\"[data-output]\"); if (output) { output.focus(); output.select(); }\n      notice(\"send\", \"档案已选中，请手动复制\", \"warn\");\n    }\n  }\n\n  function setSendLocked(locked) {\n    dlcc$$('[data-action=\"send-start\"], [data-action=\"next\"]').forEach(button => { button.disabled = !!locked; });\n  }\n\n  function sendStart() {\n    if (sendPromise) return sendPromise;\n    const state = store.getState();\n    if (!state.derived.valid) { setPage(5); notice(\"send\", \"请先修正档案校验问题\", \"error\"); return Promise.resolve(dlccResult(false, \"invalid\", \"档案校验失败\")); }\n    setSendLocked(true);\n    sendPromise = Promise.resolve(chat.send(dlccArchiveText(dlccArchive(state.draft)), { fingerprint: JSON.stringify(state.draft) }))\n      .then(result => {\n        notice(\"send\", result.message, result.ok ? \"ok\" : \"error\");\n        return result;\n      })\n      .finally(() => {\n        sendPromise = null;\n        setSendLocked(false);\n      });\n    return sendPromise;\n  }\n\n  const clickCommands = {\n    goto: ({ value }) => setPage(value),\n    prev: () => setPage(store.getState().session.page - 1),\n    next: () => store.getState().session.page === 5 ? sendStart() : setPage(store.getState().session.page + 1),\n    era: ({ value }) => selectEra(value),\n    location: ({ value }) => setDraft(\"world.location\", value, [\"world\", \"derived\", \"preview\"]),\n    species: ({ value }) => setDraft(\"world.species\", value, [\"world\", \"profile\", \"derived\", \"preview\"]),\n    \"daily-step\": ({ button }) => stepDaily(button.dataset.id, button.dataset.delta),\n    \"specialty-rank\": ({ button, value }) => setSpecialty(button.dataset.id, value),\n    \"soul-tab\": ({ value }) => store.dispatch({ type: \"set-session\", path: \"activeSoul\", value: Number(value), dirty: [\"souls\"] }),\n    \"soul-choice\": ({ button, value }) => {\n      const field = button.dataset.field;\n      if (![\"quality\", \"category\", \"dominance\"].includes(field)) return;\n      mutateSoul(store.getState().session.activeSoul, soul => { soul[field] = value; });\n    },\n    \"unlock-soul\": ({ value }) => mutateSoul(Number(value), soul => { soul.unlocked = true; }),\n    \"lock-soul\": ({ value }) => mutateSoul(Number(value), soul => { soul.unlocked = false; }),\n    \"soul-normal-attribute\": ({ value }) => toggleSoulAttribute(\"normal\", value),\n    \"soul-special-attribute\": ({ value }) => toggleSoulAttribute(\"special\", value),\n    \"soul-extreme-toggle\": () => mutateSoul(store.getState().session.activeSoul, soul => {\n      const options = dlccExtremeOptions(soul);\n      if (!options.length) return;\n      soul.extreme.enabled = !soul.extreme.enabled;\n      soul.extreme.attribute = soul.extreme.enabled ? (options.includes(soul.extreme.attribute) ? soul.extreme.attribute : options[0]) : \"\";\n    }),\n    \"soul-extreme-attribute\": ({ value }) => mutateSoul(store.getState().session.activeSoul, soul => {\n      if (!dlccExtremeOptions(soul).includes(value)) return;\n      soul.extreme = { enabled: true, attribute: value };\n    }),\n    \"soul-body-part\": ({ value }) => mutateSoul(store.getState().session.activeSoul, soul => {\n      if (DLCC_RULES.bodySoulParts.includes(value)) soul.bodySoul.part = value;\n    }),\n    background: ({ value }) => setDraft(\"background.presetId\", value, [\"background\", \"derived\", \"preview\"]),\n    \"trait-filter\": ({ value }) => store.dispatch({ type: \"set-session\", path: \"traitFilter\", value, dirty: [\"traits\"] }),\n    \"trait-group\": ({ value }) => {\n      if ([\"regular\", \"template\", \"negative\", \"selected\"].includes(value)) store.dispatch({ type: \"set-session\", path: \"traitGroup\", value, dirty: [\"traits\"] });\n    },\n    \"trait-facet\": ({ value }) => {\n      if ([\"all\", \"combat\", \"soul\", \"survival\", \"resource\", \"story\", \"relation\"].includes(value)) store.dispatch({ type: \"set-session\", path: \"traitFacet\", value, dirty: [\"traits\"] });\n    },\n    \"trait-focus\": ({ value }) => {\n      if (dlccTrait(value)) store.dispatch({ type: \"set-session\", path: \"activeTraitId\", value, dirty: [\"traits\"] });\n    },\n    \"trait-detail\": ({ value }) => store.dispatch({ type: \"set-session\", path: \"activeTraitDetail\", value: store.getState().session.activeTraitDetail === value ? \"\" : value, dirty: [\"traits\"] }),\n    \"trait-detail-close\": () => store.dispatch({ type: \"set-session\", path: \"activeTraitDetail\", value: \"\", dirty: [\"traits\"] }),\n    \"trait-toggle\": ({ value }) => toggleTrait(value),\n    \"bond-option\": ({ button, value }) => toggleBondOption(button.dataset.group, value),\n    \"bond-relation\": ({ button, value }) => setBondRelation(button.dataset.group, value),\n    \"bond-profile-add\": ({ value }) => addBondProfile(value),\n    \"bond-profile-remove\": ({ button, value }) => removeBondProfile(value, Number(button.dataset.index)),\n    \"choose-avatar\": () => chooseAvatar(),\n    \"ai-profile\": () => aiProfile(),\n    \"ai-soul\": () => aiSoul(),\n    \"copy-export\": () => copyExport(),\n    \"send-start\": () => sendStart(),\n    \"draft-save\": ({ value }) => {\n      const result = drafts.saveSlot(value, store.getState().draft);\n      notice(\"draft\", result.message, result.ok ? \"ok\" : \"error\", [\"drafts\"]);\n      return result;\n    },\n    \"draft-load\": ({ value }) => loadDraftResult(drafts.loadSlot(value)),\n    \"draft-delete\": ({ value }) => {\n      const result = drafts.deleteSlot(value);\n      notice(\"draft\", result.message, result.ok ? \"ok\" : \"error\", [\"drafts\"]);\n      return result;\n    },\n    \"draft-export\": () => {\n      const area = dlcc$(\"[data-draft-transfer]\");\n      if (area) area.value = drafts.exportDraft(store.getState().draft);\n      notice(\"draft\", \"当前v2草稿已写入文本框\", \"ok\", [\"drafts\"]);\n    },\n    \"draft-import\": () => {\n      const area = dlcc$(\"[data-draft-transfer]\");\n      return loadDraftResult(drafts.importDraft(area ? area.value : \"\"));\n    },\n  };\n\n  function handleClick(event) {\n    const button = event.target && event.target.closest && event.target.closest(\"[data-action]\");\n    if (!button || !DLCC_ROOT.contains(button)) return;\n    const command = clickCommands[button.dataset.action];\n    if (command) return command({ button, value: button.dataset.value, event });\n  }\n\n  function handleInput(event) {\n    const node = event.target;\n    if (!node || !DLCC_ROOT.contains(node)) return;\n    if (node.matches(\"[data-bind]\")) {\n      const path = node.dataset.bind;\n      const dirty = path.startsWith(\"traitConfigs.\") ? [\"derived\", \"preview\"] : undefined;\n      setDraft(path, node.type === \"number\" ? Number(node.value) : node.value, dirty);\n    }\n    if (node.matches(\"[data-trait-search]\")) store.dispatch({ type: \"set-session\", path: \"traitSearch\", value: node.value, dirty: [\"traits\"] });\n    if (node.matches(\"[data-soul-field]\")) mutateSoul(store.getState().session.activeSoul, soul => {\n      soul[node.dataset.soulField] = node.value;\n      if (node.dataset.soulField === \"customAttribute\") normalizeSoulExtreme(soul);\n    }, node.dataset.soulField === \"customAttribute\" ? [\"derived\", \"preview\", \"soul-extreme\"] : [\"derived\", \"preview\"]);\n    if (node.matches(\"[data-soul-body-field]\")) mutateSoul(store.getState().session.activeSoul, soul => { soul.bodySoul[node.dataset.soulBodyField] = node.value; }, [\"preview\"]);\n  }\n\n  function handleChange(event) {\n    const node = event.target;\n    const input = node && node.closest && node.closest(\"[data-avatar-input]\");\n    if (input && input.files && input.files[0]) { saveAvatar(input.files[0]); input.value = \"\"; return; }\n    if (node && node.matches(\"[data-trait-cost-filter]\") && [\"all\", \"35\", \"50\", \"60\", \"100\", \"150\", \"negative\"].includes(node.value)) {\n      store.dispatch({ type: \"set-session\", path: \"traitCost\", value: node.value, dirty: [\"traits\"] });\n    }\n  }\n\n  function handleKeydown(event) {\n    if (event.key !== \"Escape\" || !store.getState().session.activeTraitDetail) return;\n    event.preventDefault();\n    store.dispatch({ type: \"set-session\", path: \"activeTraitDetail\", value: \"\", dirty: [\"traits\"] });\n  }\n\n  const unsubscribe = store.subscribe((state, dirty, meta) => {\n    views.schedule(state, dirty, drafts);\n  });\n\n  function handleSharedAvatar(event) {\n    if (event && event.detail && event.detail.source === \"character-create-v2\") return;\n    store.dispatch({ type: \"set-session\", path: \"avatar\", value: avatar.getAvatar(), dirty: [] });\n    views.renderAvatar();\n  }\n\n  DLCC_ROOT.addEventListener(\"click\", handleClick, { signal: abort.signal });\n  DLCC_ROOT.addEventListener(\"input\", handleInput, { signal: abort.signal });\n  DLCC_ROOT.addEventListener(\"change\", handleChange, { signal: abort.signal });\n  document.addEventListener(\"keydown\", handleKeydown, { signal: abort.signal });\n  runtime.hosts.forEach(host => {\n    try {\n      host.addEventListener(avatar.eventName, handleSharedAvatar);\n      avatarEventHosts.push(host);\n    } catch (_) {}\n  });\n  startAiAvailabilityWatch();\n  if (typeof MutationObserver === \"function\") {\n    removalObserver = new MutationObserver(() => { if (!DLCC_ROOT.isConnected) dispose(); });\n    removalObserver.observe(document.documentElement || document.body, { childList: true, subtree: true });\n  }\n\n  function dispose() {\n    if (disposed) return;\n    disposed = true;\n    stopAiAvailabilityWatch();\n    abort.abort();\n    unsubscribe();\n    avatarEventHosts.splice(0).forEach(host => {\n      try { host.removeEventListener(avatar.eventName, handleSharedAvatar); } catch (_) {}\n    });\n    if (removalObserver) removalObserver.disconnect();\n    avatar.dispose();\n    if (deps.onDispose) deps.onDispose();\n  }\n\n  return { dispose, sendStart, loadDraftResult, notice };\n}\n\nconst dlccRuntime = dlccCreateRuntimePort();\nconst dlccIdentity = dlccCreateIdentityPort(dlccRuntime);\nconst dlccAvatar = dlccCreateAvatarRepository(dlccRuntime);\nconst dlccAi = dlccCreateAiPort(dlccRuntime);\nconst dlccChat = dlccCreateChatPort(dlccRuntime);\nconst dlccDrafts = dlccCreateDraftRepository(dlccRuntime);\nconst dlccStore = dlccCreateStore(dlccCreateDraft());\ndlccStore.dispatch({ type: \"set-session\", path: \"avatar\", value: dlccAvatar.getAvatar(), dirty: [] });\ndlccStore.dispatch({ type: \"set-session\", path: \"aiAvailable\", value: dlccAi.available(), dirty: [] });\nconst dlccFacade = dlccCreatePublicApiFacade(dlccRuntime);\nconst dlccViews = dlccCreateViews(dlccStore, dlccAvatar);\nlet dlccController = null;\n\nfunction dlccArtifacts() {\n  const payload = dlccArchive(dlccStore.getState().draft);\n  return { payload, text: dlccArchiveText(payload) };\n}\n\nconst dlccCharacterApi = {\n  schemaVersion: DLCC_SCHEMA_VERSION,\n  getPayload: () => dlccArchive(dlccStore.getState().draft),\n  getExportArtifacts: dlccArtifacts,\n  refreshOutput: () => { dlccViews.schedule(dlccStore.getState(), new Set([\"preview\"]), dlccDrafts); return dlccArtifacts().text; },\n  saveDraft: slot => dlccDrafts.saveSlot(slot || \"slot-1\", dlccStore.getState().draft),\n  loadDraft: slot => dlccController.loadDraftResult(dlccDrafts.loadSlot(slot || \"slot-1\")),\n  listDrafts: () => dlccDrafts.list().filter(item => item.previewName),\n  deleteDraft: slot => dlccDrafts.deleteSlot(slot || \"slot-1\"),\n  exportDraft: () => dlccDrafts.exportDraft(dlccStore.getState().draft),\n  importDraft: text => dlccController.loadDraftResult(dlccDrafts.importDraft(text)),\n  getPlayerName: () => dlccTrim(dlccStore.getState().draft.profile.name) || dlccIdentity.readName(),\n  getPlayerIdentity: () => ({ name: dlccTrim(dlccStore.getState().draft.profile.name) || dlccIdentity.readName(), storageKey: DLCC_KEYS.playerName, eventName: DLCC_EVENTS.identity }),\n  getState: () => dlccClone(dlccStore.getState()),\n  destroy: () => dlccController && dlccController.dispose(),\n};\n\nconst dlccAvatarApi = {\n  source: \"character-create-v2\",\n  storageKey: DLCC_KEYS.playerAvatar,\n  eventName: DLCC_EVENTS.avatar,\n  getAvatar: () => dlccAvatar.getAvatar(),\n  get: () => dlccAvatar.getAvatar(),\n  setAvatar: value => {\n    const result = dlccAvatar.setAvatar(value);\n    if (result.ok) dlccStore.dispatch({ type: \"set-session\", path: \"avatar\", value: result.data, dirty: [] });\n    dlccViews.renderAvatar();\n    return result;\n  },\n  set: value => dlccAvatarApi.setAvatar(value),\n  setFile: async file => {\n    const result = await dlccAvatar.saveFile(file);\n    if (result.ok) {\n      dlccStore.dispatch({ type: \"set-session\", path: \"avatar\", value: result.data, dirty: [] });\n      dlccViews.renderAvatar();\n    }\n    return result;\n  },\n  clearAvatar: () => {\n    const result = dlccAvatar.clear();\n    if (result.ok) dlccStore.dispatch({ type: \"set-session\", path: \"avatar\", value: \"\", dirty: [] });\n    dlccViews.renderAvatar();\n    return result;\n  },\n  clear: () => dlccAvatarApi.clearAvatar(),\n};\n\ndlccFacade.expose(\"DouluoCharacterCreate\", dlccCharacterApi);\ndlccFacade.expose(\"DouluoPlayerAvatar\", dlccAvatarApi);\ndlccController = dlccCreateController({\n  store: dlccStore,\n  views: dlccViews,\n  drafts: dlccDrafts,\n  runtime: dlccRuntime,\n  identity: dlccIdentity,\n  avatar: dlccAvatar,\n  ai: dlccAi,\n  chat: dlccChat,\n  onDispose: () => dlccFacade.dispose(),\n});\ndlccViews.renderAll(dlccDrafts);\nif (!dlccAi.available()) dlccController.notice(\"profile\", \"TavernDB AI接口未就绪，AI按钮暂不可用\", \"warn\");\n})();";
  const COVER_DATABASE_TEMPLATE = null;
  const COVER_PLOT_PRESET = null;
  const MOUNT_STATUS_MOUNTED = "mounted";
  const MOUNT_STATUS_SKIPPED = "skipped";
  const MOUNT_STATUS_FAILED = "failed";

  const MESSAGE_SELECTOR = [
    ".mes",
    ".message",
    ".chat-message",
    "[mesid]",
    "[data-message-id]",
    "[data-mes-id]",
    "[data-dlou-message]",
  ].join(",");
  const CONTENT_SELECTOR = [
    ".mes_text",
    ".message-content",
    ".markdown-body",
    "[data-message-content]",
    "[data-mes-text]",
    "[data-dlou-message-content]",
  ].join(",");
  const CONTEXT_HOST_ATTR = "data-dlou-context-host";
  const CONTEXT_HOST_SELECTOR = `[${CONTEXT_HOST_ATTR}]`;
  const ROOT_SELECTOR_ALL = [
    CONTEXT_HOST_SELECTOR,
    "[data-cover-root]",
    "[data-main-text-root]",
    "[data-dlou-helper-root]",
    "[data-dls-root]",
    ".ds8[data-root]",
    ".dls-status-helper-host",
    ".dls-status-helper-panel",
    ".dls-root",
    ".dmt-root",
  ].join(",");
  const UI_HELPER_ROOT_SELECTOR = [
    "[data-cover-root]",
    "[data-main-text-root]",
    "[data-dlou-helper-root]",
    ".ds8[data-root]",
    ".dmt-root",
  ].join(",");
  const IGNORED_TEXT_SELECTOR = [
    ROOT_SELECTOR_ALL,
    "[data-douluo-status-helper]",
    "button",
    "input",
    "select",
    "textarea",
    "option",
    "script",
    "style",
    "template",
    "svg",
    "canvas",
    "[hidden]",
    "[aria-hidden='true']",
  ].join(",");
  const RAW_ATTRS = [
    "data-raw-message",
    "data-message-raw",
    "data-mes-raw",
    "data-source-message",
    "data-dlou-raw",
  ];
  const RAW_NODE_SELECTOR = [
    "script[type='application/json'][data-raw-message]",
    "template[data-raw-message]",
    "[data-raw-message-text]",
  ].join(",");
  const EDITABLE_SOURCE_SELECTOR = [
    "textarea",
    "input[type='text']",
    "input:not([type])",
    "[contenteditable='true']",
  ].join(",");
  const USER_MESSAGE_SELECTOR = [
    "[is_user='true']",
    "[data-is-user='true']",
    "[data-user='true']",
    "[data-message-role='user']",
    "[data-role='user']",
    ".is_user",
    ".is-user",
    ".mes_user",
    ".mes-user",
    ".message-user",
    ".user-message",
  ].join(",");
  const EDITING_MESSAGE_SELECTOR = [
    ".mes_editing",
    ".mes-editing",
    ".is-editing",
    "[data-editing='true']",
    "[data-message-editing='true']",
  ].join(",");
  const MAIN_TEXT_RE = /^(?![\s\S]*<[a-z][\w:-]*(?:\s+[^<>]*)?\s+data-dl(?:s|github)-root\b)[\s\S]*?((?:<content\b[^>]*>[\s\S]*?<\/content>\s*)+)[\s\S]*$/;
  const MAIN_TEXT_EXISTING_UI_RE = /<[a-z][\w:-]*(?:\s+[^<>]*)?\s+data-dl(?:s|github)-root\b/i;
  const MAIN_TEXT_PLOT_PROGRESS_INPUT_RE = /<\s*(player_input|input)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/i;
  const MAIN_TEXT_PLOT_PROGRESS_AUDIT_RE = /<\s*(?:chapter_state|anchor_update|recall_detail|recall|time_state|scene_state|runtime_state|time_recall|situation_assessment|rationality_verdict|butterfly_delta|writing_directive|format_directive|db_delta)\b[^>]*>/i;
  const MAIN_TEXT_PLOT_PROGRESS_HANDOFF_RE = /(?:\[OUTPUT HARD BOUNDARY\]|\u7528\u6237\u672c\u8f6e\u8f93\u5165\u662f|\u8bf7\u53ea\u5438\u6536\u5267\u60c5\u63a8\u8fdb\u8f93\u51fa)/i;
  const MAIN_TEXT_BRACED_STRUCTURE_RE = /^\s*\{(?:content|now_plot|gametext|time)\}\s*([\s\S]*?)\s*$/i;
  const MAIN_TEXT_BARE_STRUCTURE_RE = /^\s*(?:content|now_plot|gametext|time)(?![\w.-])(?=\s*[\u3400-\u9fff「『“‘"{])\s*([\s\S]*?)\s*$/i;
  const MAIN_TEXT_STREAM_UPDATE_DEBOUNCE_MS = 160;
  const MAIN_TEXT_STREAM_CLEAR_GRACE_MS = 1800;
  const MAIN_TEXT_STREAM_MARKER_GRACE_MS = 8000;
  const MAIN_TEXT_STREAM_PRESERVE_RAW = "__douluo_main_text_stream_preserve__";
  const CHAT_LIFECYCLE_EVENT_KEYS = [
    "CHAT_CHANGED",
    "CHARACTER_FIRST_MESSAGE_SELECTED",
    "USER_MESSAGE_RENDERED",
    "CHARACTER_MESSAGE_RENDERED",
    "MESSAGE_UPDATED",
    "MESSAGE_SWIPED",
  ];
  const CHAT_LIFECYCLE_EVENT_NAMES = [
    "chat_id_changed",
    "character_first_message_selected",
    "user_message_rendered",
    "character_message_rendered",
    "message_updated",
    "message_swiped",
  ];
  const CHAT_LIFECYCLE_SCAN_DELAYS = [0, 80, 240, 750, 1600];
  const CHAT_SIGNATURE_POLL_MS = 1000;
  const loadedAt = new Date().toISOString();
  const FIXED_UI_MESSAGE_ID = 0;
  const FIXED_UI_MIN_PAGE_COUNT = 2;

  const state = {
    mounted: 0,
    observed: false,
    pending: new Set(),
    flushTimer: 0,
    lastError: "",
    lastScanAt: 0,
    candidateCount: 0,
    lastRawPreview: "",
    lastSkipReason: "",
    lastMatched: "",
    lastErrorStack: "",
    candidateSamples: [],
    mountAttempts: 0,
    scanRuns: 0,
    reportedNoMatch: false,
    observers: [],
    scannedDocuments: [],
    observedDocuments: [],
    accessibleHostDocumentCount: 0,
    hostDomAccessError: "",
    contextProbe: null,
    lastRawSource: "",
    lastRawStrong: false,
    lastRawMessageId: -1,
    lastRawSwipeIndex: -1,
    lastRawPageCount: 0,
    lastMainTextStreamReason: "",
    lastMainTextStreamAt: 0,
    mainTextStreamPreserveCount: 0,
    lifecycleSubscriptions: [],
    lifecycleEventCount: 0,
    lastLifecycleEvent: "",
    lastLifecycleAt: 0,
    lastLifecycleScanReason: "",
    lastChatSignature: "",
    chatSignaturePollTimer: 0,
    chatSignatureChangeCount: 0,
    observerRetargetCount: 0,
    contextHostMountCount: 0,
    contextHostCleanupCount: 0,
    lastContextHostMessageId: "",
    lastContextHostSignature: "",
    lastContextHostRawHash: "",
    scheduledTimers: new Set(),
    disposed: false,
  };

  const doneAttr = `dlou${toDatasetToken(MODULE_KIND)}Mounted`;
  const hashAttr = `dlou${toDatasetToken(MODULE_KIND)}Hash`;
  const originalStateKey = `__douluoUiHelperOriginal${toDatasetToken(MODULE_KIND)}`;
  const mainTextStreamStates = new WeakMap();
  const mainTextElementCache = new WeakMap();
  const mainTextOriginalRawCache = new WeakMap();
  const mainTextMessageCache = new Map();

  function toDatasetToken(value) {
    return String(value || "")
      .replace(/(^|[-_])([a-z])/g, (_, __, char) => char.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "");
  }

  function notify(message, type = "info") {
    try {
      const detail = { module: MODULE_KIND, script: SCRIPT_NAME, buildId: BUILD_ID, message, type };
      document.dispatchEvent(new CustomEvent("douluo:ui-helper-status", { detail }));
    } catch (_) {
      // SillyTavern may run helpers in constrained iframes; status is optional.
    }
    const method = type === "error" ? "warn" : "log";
    try {
      console[method](`[Douluo UI Helper][${MODULE_KIND}][${BUILD_ID}] ${message}`);
    } catch (_) {}
  }

  const existingHelperApi = (() => {
    try { return window[API_NAME] || null; } catch (_) { return null; }
  })();

  function reuseExistingHelperApi() {
    try {
      const existing = existingHelperApi;
      if (!existing || existing.buildId !== BUILD_ID || typeof existing.scanExisting !== "function") return false;
      window.setTimeout(() => {
        try { existing.scanExisting(); } catch (_) {}
      }, 0);
      console.log(`[Douluo UI Helper][${MODULE_KIND}][${BUILD_ID}] reused`);
      return true;
    } catch (_) {
      return false;
    }
  }

  if (reuseExistingHelperApi()) return;
  if (existingHelperApi && existingHelperApi.buildId !== BUILD_ID) {
    if (typeof existingHelperApi.destroy === "function") {
      try { existingHelperApi.destroy({ reason: "build-replaced" }); } catch (_) {}
    } else {
      try {
        existingHelperApi.upgradePendingBuildId = BUILD_ID;
        existingHelperApi.upgradeRequiresReload = true;
      } catch (_) {}
      try {
        console.warn(`[Douluo UI Helper][${MODULE_KIND}][${BUILD_ID}] legacy build remains active until the replaced script is reloaded`);
      } catch (_) {}
      return;
    }
  }

  function scheduleTracked(callback, delay) {
    let timer = 0;
    timer = window.setTimeout(() => {
      state.scheduledTimers.delete(timer);
      if (!state.disposed) callback();
    }, delay);
    state.scheduledTimers.add(timer);
    return timer;
  }

  function clearTracked(timer) {
    if (!timer) return;
    window.clearTimeout(timer);
    state.scheduledTimers.delete(timer);
  }

  function clearAllTrackedTimers() {
    state.scheduledTimers.forEach((timer) => window.clearTimeout(timer));
    state.scheduledTimers.clear();
  }

  function rememberError(error, label) {
    const text = error && error.message ? error.message : String(error || "Unknown error");
    state.lastError = `${label}: ${text}`;
    state.lastErrorStack = error && error.stack ? String(error.stack) : state.lastError;
    notify(state.lastError, "error");
  }

  function stableHash(input) {
    const text = String(input || "");
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return String(hash >>> 0);
  }

  function ownerDocumentOf(node) {
    return (node && node.ownerDocument) || document;
  }

  function ownerWindowOf(nodeOrDocument) {
    const doc = nodeOrDocument && nodeOrDocument.nodeType === 9
      ? nodeOrDocument
      : ownerDocumentOf(nodeOrDocument);
    return (doc && doc.defaultView) || window;
  }

  function ensureStyle(targetDocument = document) {
    const doc = targetDocument || document;
    if (!CSS || doc.getElementById(STYLE_ID)) return;
    const style = doc.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    (doc.head || doc.documentElement).appendChild(style);
  }

  function runInlineApp(root, code, label) {
    const doc = ownerDocumentOf(root);
    const script = doc.createElement("script");
    script.type = "text/javascript";
    script.textContent = code;
    root.appendChild(script);
    script.remove();
    notify(`${label} rendered`);
  }

  function nodesFromHtml(html, targetDocument = document) {
    const doc = targetDocument || document;
    const template = doc.createElement("template");
    template.innerHTML = String(html || "").trim();
    return Array.from(template.content.childNodes);
  }

  function firstRootFromHtml(html, selector, targetDocument = document) {
    const doc = targetDocument || document;
    const nodes = nodesFromHtml(html, doc);
    const wrapper = doc.createElement("div");
    nodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "SCRIPT") return;
      wrapper.appendChild(node);
    });
    return wrapper.matches && wrapper.matches(selector)
      ? wrapper
      : wrapper.querySelector(selector);
  }

  function clearElement(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
  }

  function isContextHostNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    try {
      if (node.matches && node.matches(CONTEXT_HOST_SELECTOR)) return true;
      return !!(node.closest && node.closest(CONTEXT_HOST_SELECTOR));
    } catch (_) {
      return false;
    }
  }

  function clearMountState(target) {
    if (!target || !target.dataset) return;
    [
      "dlouCoverMounted",
      "dlouCoverHash",
      "dlouCharacterCreateMounted",
      "dlouCharacterCreateHash",
      "dlouMainTextMounted",
      "dlouMainTextHash",
      "dlouHelperModule",
    ].forEach((key) => {
      try {
        delete target.dataset[key];
      } catch (_) {}
    });
  }

  function mainTextCaptureFromRaw(raw) {
    const text = String(raw || "");
    if (
      !text.trim() ||
      MAIN_TEXT_EXISTING_UI_RE.test(text) ||
      rawLooksLikeMainTextHelperUiText(text) ||
      rawLooksLikePlotProgressAudit(text) ||
      rawLooksLikeFixedPageControlMarker(text)
    ) return "";
    const explicit = text.match(MAIN_TEXT_RE);
    if (explicit) return explicit[1] || "";
    const braced = text.match(MAIN_TEXT_BRACED_STRUCTURE_RE);
    const bare = braced ? null : text.match(MAIN_TEXT_BARE_STRUCTURE_RE);
    const body = braced ? braced[1] : bare && bare[1];
    const clean = String(body || "").trim();
    return clean ? "<content>\n" + clean + "\n</content>" : "";
  }

  function rawLooksLikeMainTextHelperUiText(raw) {
    const text = String(raw || "");
    if (!/(?:正文主题|正文字体|正文字号|对白字号|玩家头像|自定义角色|保存角色)/.test(text)) return false;
    return /(?:Soul Land Chronicle|斗罗纪行|正文与对白|上传玩家头像|使用角色创建头像)/.test(text);
  }

  function rawLooksLikePlotProgressAudit(raw) {
    const text = String(raw || "");
    if (!MAIN_TEXT_PLOT_PROGRESS_AUDIT_RE.test(text)) return false;
    return MAIN_TEXT_PLOT_PROGRESS_INPUT_RE.test(text) || MAIN_TEXT_PLOT_PROGRESS_HANDOFF_RE.test(text);
  }

  function mainTextRawLooksStreaming(raw) {
    const text = String(raw || "").trim();
    if (!text) return true;
    if (rawLooksLikePlotProgressAudit(text)) return false;
    if (/<\s*\/?\s*(content|now_plot|gametext|time)\b/i.test(text)) return true;
    if (/^\s*\{?\s*(content|now_plot|gametext|time)\b/i.test(text)) return true;
    return /^<\s*\/?\s*(c|co|con|cont|conte|conten|content|n|no|now|now_|now_p|now_pl|now_plo|now_plot|g|ga|gam|game|gamet|gamete|gametex|gametext|t|ti|tim|time)?$/i.test(text);
  }

  function streamStateFor(target) {
    let info = mainTextStreamStates.get(target);
    if (!info) {
      info = { rawHash: "", rawSince: 0, timer: 0, readyHash: "" };
      mainTextStreamStates.set(target, info);
    }
    return info;
  }

  function resetMainTextStreamState(target) {
    const info = mainTextStreamStates.get(target);
    if (info && info.timer) {
      clearTracked(info.timer);
      info.timer = 0;
    }
    mainTextStreamStates.delete(target);
  }

  function rememberMainTextOriginalRaw(target, raw) {
    if (MODULE_KIND !== "main-text" || !target || target.nodeType !== Node.ELEMENT_NODE) return;
    const text = String(raw || "");
    if (!text) return;
    mainTextOriginalRawCache.set(target, text);
    try {
      target.__DLOU_MAIN_TEXT_ORIGINAL_RAW = text;
      target.dataset.dlouMainTextOriginalRawHash = stableHash(text);
    } catch (_) {}
  }

  function mainTextRawFromMountedRoot(root) {
    if (!root || !root.querySelector) return "";
    const rawNode = root.querySelector("[data-raw-content]");
    return rawNode ? String(rawNode.innerHTML || rawNode.textContent || "") : "";
  }

  function mainTextRawForEdit(messageNode, target, mountedRoot) {
    if (MODULE_KIND !== "main-text") return "";
    const candidates = [
      target && target.__DLOU_MAIN_TEXT_ORIGINAL_RAW,
      target && mainTextOriginalRawCache.get(target),
      rawAttrsFrom(target),
      rawAttrsFrom(messageNode),
      rawNodeTextFrom(target),
      rawNodeTextFrom(messageNode),
      mainTextRawFromMountedRoot(mountedRoot),
    ];
    try {
      const contextInfo = readRawFromContextInfo(messageNode || target, { allowGlobalFallback: isContextHostNode(messageNode || target) });
      if (contextInfo && contextInfo.raw) candidates.push(contextInfo.raw);
    } catch (_) {}
    return candidates.map((item) => String(item || "")).find((item) => item.trim()) || "";
  }

  function restoreMainTextEditSurface(messageNode, target, mountedRoot) {
    if (MODULE_KIND !== "main-text" || !target || target.nodeType !== Node.ELEMENT_NODE) return false;
    const raw = mainTextRawForEdit(messageNode, target, mountedRoot);
    const controls = [];
    editableControlsOutsideHelper(messageNode).forEach((control) => controls.push(control));
    editableControlsOutsideHelper(target).forEach((control) => {
      if (!controls.includes(control)) controls.push(control);
    });
    if (mountedRoot && mountedRoot.parentNode) mountedRoot.remove();
    resetMainTextStreamState(target);
    clearMountState(target);
    if (target.dataset) target.dataset.dlouMainTextWasEdited = "1";

    if (controls.length) {
      controls.forEach((control) => {
        if (!raw) return;
        const current = control.matches && control.matches("[contenteditable='true']")
          ? control.textContent
          : control.value;
        if (String(current || "").trim() && !rawLooksLikeMainTextHelperUiText(current)) return;
        if (control.matches && control.matches("[contenteditable='true']")) {
          control.textContent = raw;
        } else {
          control.value = raw;
        }
      });
      return true;
    }

    clearElement(target);
    if (raw) target.textContent = raw;
    return true;
  }

  function scheduleMainTextProcess(target, delay, readyHash = "") {
    const info = streamStateFor(target);
    if (info.timer) clearTracked(info.timer);
    if (readyHash) info.readyHash = readyHash;
    info.timer = scheduleTracked(() => {
      info.timer = 0;
      processCandidate(target);
    }, delay);
  }

  function mainTextTargetCacheMatches(messageNode, target, rawInfo = null) {
    if (MODULE_KIND !== "main-text") return true;
    const key = mainTextMessageCacheKey(messageNode, rawInfo);
    if (!key) return true;
    try {
      const direct = target && mainTextElementCache.get(target);
      if (!direct || !direct.cacheKey) return true;
      return direct.cacheKey === key;
    } catch (_) {
      return true;
    }
  }

  function shouldPreserveMountedMainTextMiss(messageNode, target, rawInfo, raw) {
    if (MODULE_KIND !== "main-text" || !target || !target.dataset || target.dataset[doneAttr] !== "1") return false;
    if (!rawInfo || !rawInfo.strong) return false;
    if (rawLooksLikePlotProgressAudit(raw)) return false;
    if (!mainTextTargetCacheMatches(messageNode, target, rawInfo)) return false;
    const info = streamStateFor(target);
    const rawHash = stableHash(String(raw || ""));
    const now = Date.now();
    if (info.rawHash !== rawHash) {
      info.rawHash = rawHash;
      info.rawSince = now;
    }
    const streamingLike = mainTextRawLooksStreaming(raw);
    if (!streamingLike && target.dataset.dlouMainTextWasEdited === "1") return false;
    const limit = streamingLike ? MAIN_TEXT_STREAM_MARKER_GRACE_MS : MAIN_TEXT_STREAM_CLEAR_GRACE_MS;
    if (now - info.rawSince > limit) return false;
    state.lastMainTextStreamReason = streamingLike
      ? "mounted-streaming-incomplete-preserved"
      : "mounted-streaming-grace-preserved";
    state.lastMainTextStreamAt = now;
    state.mainTextStreamPreserveCount += 1;
    const nextDelay = Math.min(400, Math.max(80, limit - (now - info.rawSince) + 20));
    scheduleMainTextProcess(target, nextDelay);
    return true;
  }

  function shouldDebounceMountedMainTextUpdate(target, rawInfo, raw, mountedModule) {
    if (MODULE_KIND !== "main-text" || mountedModule !== MODULE_KIND || !rawInfo || !rawInfo.strong) return false;
    if (!target || !target.dataset) return false;
    const nextHash = mountHashFromRaw(raw);
    if (!nextHash || target.dataset[hashAttr] === nextHash) return false;
    const info = streamStateFor(target);
    if (info.readyHash === nextHash) {
      info.readyHash = "";
      return false;
    }
    state.lastMainTextStreamReason = "mounted-streaming-update-debounced";
    state.lastMainTextStreamAt = Date.now();
    scheduleMainTextProcess(target, MAIN_TEXT_STREAM_UPDATE_DEBOUNCE_MS, nextHash);
    return true;
  }

  function contextSwipeIndexForNode(node) {
    const index = messageIndexFromNode(node);
    if (index < 0) return -1;
    const records = getContextRecordsForMessageId(index);
    for (const record of records) {
      const swipe = routeSwipeIndexForRecord(record, swipePageCount(record.message));
      if (swipe >= 0) return swipe;
    }
    return -1;
  }

  function contextPageCountForNode(node) {
    const index = messageIndexFromNode(node);
    if (index < 0) return 0;
    const records = getContextRecordsForMessageId(index);
    for (const record of records) {
      const count = swipePageCount(record.message);
      if (count > 0) return count;
    }
    return 0;
  }

  function mainTextMessageCacheKey(messageNode, rawInfo = null) {
    const index = messageIndexFromNode(messageNode);
    if (index < 0) return "";
    const swipeIndex = rawInfo && Number.isFinite(Number(rawInfo.swipeIndex))
      ? Number(rawInfo.swipeIndex)
      : contextSwipeIndexForNode(messageNode);
    return swipeIndex >= 0 ? `message:${index}:swipe:${swipeIndex}` : `message:${index}`;
  }

  function rememberMainTextRender(messageNode, target, raw, rawInfo = null) {
    if (MODULE_KIND !== "main-text") return;
    const capture = mainTextCaptureFromRaw(raw);
    if (!capture) return;
    const cacheKey = mainTextMessageCacheKey(messageNode, rawInfo);
    const value = { capture, rawPreview: preview(raw), at: Date.now(), cacheKey };
    try {
      if (target) mainTextElementCache.set(target, value);
    } catch (_) {}
    if (cacheKey) mainTextMessageCache.set(cacheKey, value);
  }

  function cachedMainTextRender(messageNode, target, rawInfo = null) {
    if (MODULE_KIND !== "main-text") return null;
    const key = mainTextMessageCacheKey(messageNode, rawInfo);
    try {
      const direct = target && mainTextElementCache.get(target);
      if (direct && direct.capture && (!key || !direct.cacheKey || direct.cacheKey === key)) return direct;
    } catch (_) {}
    return key ? mainTextMessageCache.get(key) || null : null;
  }

  function restoreMainTextFromCache(messageNode, target, rawInfo, raw) {
    if (MODULE_KIND !== "main-text" || !rawInfo || !rawInfo.strong || !mainTextRawLooksStreaming(raw)) return false;
    const cached = cachedMainTextRender(messageNode, target, rawInfo);
    if (!cached || !cached.capture) return false;
    state.lastMainTextStreamReason = "mounted-streaming-cache-restored";
    state.lastMainTextStreamAt = Date.now();
    const mountStatus = mountMainTextWithCapture(target, MAIN_TEXT_STREAM_PRESERVE_RAW, cached.capture);
    if (mountStatus === MOUNT_STATUS_MOUNTED) {
      state.mainTextStreamPreserveCount += 1;
      scheduleMainTextProcess(target, MAIN_TEXT_STREAM_UPDATE_DEBOUNCE_MS);
      return true;
    }
    return false;
  }

  function mountHash(raw, capture = "") {
    return stableHash(`${MODULE_KIND}\n${PAGE_INDEX == null ? "" : PAGE_INDEX}\n${capture || ""}\n${raw || ""}`);
  }

  function mountHashFromRaw(raw) {
    let capture = "";
    if (MODULE_KIND === "main-text") {
      capture = mainTextCaptureFromRaw(raw);
    }
    return mountHash(raw, capture);
  }

  function prepareMountHost(target, raw, capture) {
    const hash = mountHash(raw, capture);
    if (target.dataset[doneAttr] === "1" && target.dataset[hashAttr] === hash) {
      const mountedRoot = findMountedUiRoot(target);
      const mountedModule = mountedRoot && (mountedRoot.getAttribute("data-dlou-helper-root") || inferMountedModule(mountedRoot));
      if (mountedModule === MODULE_KIND) return { status: MOUNT_STATUS_SKIPPED, hash };
      clearMountState(target);
    }
    if (!target[originalStateKey]) {
      target[originalStateKey] = {
        html: target.innerHTML,
        raw: String(raw || ""),
      };
    }
    rememberMainTextOriginalRaw(target, raw);
    clearElement(target);
    clearMountState(target);
    target.dataset[doneAttr] = "1";
    target.dataset[hashAttr] = hash;
    target.dataset.dlouHelperModule = MODULE_KIND;
    if (MODULE_KIND === "main-text") {
      try { delete target.dataset.dlouMainTextWasEdited; } catch (_) {}
    }
    return { status: MOUNT_STATUS_MOUNTED, hash };
  }

  function mountCover(target, raw) {
    const doc = ownerDocumentOf(target);
    const host = ownerWindowOf(doc);
    ensureStyle(doc);
    host.__DLOU_COVER_DATABASE_TEMPLATE = COVER_DATABASE_TEMPLATE || "";
    host.__DLOU_COVER_PLOT_PRESET = COVER_PLOT_PRESET || "";
    const root = firstRootFromHtml(HTML, ROOT_SELECTOR, doc);
    if (!root) throw new Error("Cover root not found");
    const prepared = prepareMountHost(target, raw, "");
    if (prepared.status !== MOUNT_STATUS_MOUNTED) return prepared.status;
    root.dataset.dlouHelperRoot = MODULE_KIND;
    annotateMountedRoot(root, target);
    target.appendChild(root);
    runInlineApp(
      root,
      `(function(){\nconst SL_COVER_DATABASE_TEMPLATE = window.__DLOU_COVER_DATABASE_TEMPLATE || "";\nconst SL_COVER_PLOT_PRESET = window.__DLOU_COVER_PLOT_PRESET || "";\n${APP_JS}\n})();`,
      "Cover"
    );
    return MOUNT_STATUS_MOUNTED;
  }

  function mountCharacterCreate(target, raw) {
    const doc = ownerDocumentOf(target);
    ensureStyle(doc);
    const root = firstRootFromHtml(HTML, ROOT_SELECTOR, doc);
    if (!root) throw new Error("Character create root not found");
    const prepared = prepareMountHost(target, raw, "");
    if (prepared.status !== MOUNT_STATUS_MOUNTED) return prepared.status;
    root.dataset.dlouHelperRoot = MODULE_KIND;
    annotateMountedRoot(root, target);
    target.appendChild(root);
    runInlineApp(root, APP_JS, "Character create");
    return MOUNT_STATUS_MOUNTED;
  }

  function cssAttrValue(value) {
    return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function ensureHeadLinks(linksHtml, targetDocument = document) {
    const doc = targetDocument || document;
    const tmp = doc.createElement("template");
    tmp.innerHTML = linksHtml;
    tmp.content.querySelectorAll("link").forEach((link) => {
      const href = link.getAttribute("href");
      const rel = link.getAttribute("rel") || "";
      if (!href) return;
      const selector = `link[href="${cssAttrValue(href)}"][rel="${cssAttrValue(rel)}"]`;
      const head = doc.head || doc.documentElement;
      if (head.querySelector && head.querySelector(selector)) return;
      head.appendChild(link.cloneNode(true));
    });
  }

  function installMainTextBootstrap(targetDocument = document) {
    const doc = targetDocument || document;
    const host = ownerWindowOf(doc);
    if (host.__DLOU_MAIN_TEXT_HELPER_BOOTSTRAPPED) return;
    host.__DLOU_MAIN_TEXT_HELPER_BOOTSTRAPPED = true;
    const themeScript = doc.createElement("script");
    themeScript.textContent =
      "(function(){try{var b=document.body;if(!b)return;var set=function(){b.dataset.douluoTheme=b.dataset.douluoTheme||'dark';};set();new MutationObserver(set).observe(b,{attributes:true,attributeFilter:['class','data-theme']});}catch(_){}})();";
    (doc.head || doc.documentElement).appendChild(themeScript);
    themeScript.remove();
  }

  function splitMainTextHtml(html) {
    const headMatch = String(html || "").match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const bodyMatch = String(html || "").match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const head = headMatch ? headMatch[1] : "";
    const body = bodyMatch ? bodyMatch[1] : html;
    return { head, body };
  }

  function mountMainTextWithCapture(target, raw, capture) {
    if (!capture) return false;
    const doc = ownerDocumentOf(target);
    ensureStyle(doc);
    installMainTextBootstrap(doc);
    const parts = splitMainTextHtml(HTML);
    ensureHeadLinks(parts.head, doc);
    const root = firstRootFromHtml(parts.body, ROOT_SELECTOR, doc);
    if (!root) throw new Error("Main text root not found");
    const prepared = prepareMountHost(target, raw, capture);
    if (prepared.status !== MOUNT_STATUS_MOUNTED) return prepared.status;
    root.dataset.dlouHelperRoot = MODULE_KIND;
    annotateMountedRoot(root, target);
    const rawNode = root.querySelector("[data-raw-content]");
    if (rawNode) rawNode.innerHTML = capture;
    if (!root.dataset.instanceId) {
      root.dataset.instanceId = `helper-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
    }
    target.appendChild(root);
    runInlineApp(root, APP_JS, "Main text");
    return MOUNT_STATUS_MOUNTED;
  }

  function mountMainText(target, raw) {
    return mountMainTextWithCapture(target, raw, mainTextCaptureFromRaw(raw));
  }

  function isFixedPageModule() {
    return MODULE_KIND === "cover" || MODULE_KIND === "character-create";
  }

  function hasFixedPageRoute() {
    return isFixedPageModule() && Number.isFinite(Number(PAGE_INDEX));
  }

  function fixedPageIndex() {
    return hasFixedPageRoute() ? Number(PAGE_INDEX) : -1;
  }

  function fixedPageMarkerText() {
    if (MODULE_KIND === "cover") return "fixed cover page";
    if (MODULE_KIND === "character-create") return "fixed character create page";
    return "";
  }

  function fixedPageMarkerMatches(raw) {
    const marker = fixedPageMarkerText();
    return Boolean(marker && String(raw || "").trim().toLowerCase().includes(marker));
  }

  function rawLooksLikeFixedPageControlMarker(raw) {
    const text = String(raw || "").trim().toLowerCase();
    return text === "fixed cover page" || text === "fixed character create page";
  }

  function fixedPageMarkerSwipeIndex(message) {
    if (!message || typeof message !== "object" || !Array.isArray(message.swipes)) return -1;
    for (let index = 0; index < message.swipes.length; index += 1) {
      if (fixedPageMarkerMatches(activeSwipeTextFromMessage(message, index))) return index;
    }
    return -1;
  }

  function fixedPageRouteMatches(info) {
    if (!hasFixedPageRoute() || !info) return false;
    if (info.explicitMarker) return true;
    const messageId = normalizeMessageId(info.messageId);
    const pageIndex = fixedPageIndex();
    const pageCount = Number(info.pageCount || 0);
    const swipeIndex = normalizeSwipeIndex(info.swipeIndex, pageCount);
    return messageId === FIXED_UI_MESSAGE_ID &&
      pageCount >= FIXED_UI_MIN_PAGE_COUNT &&
      pageCount > pageIndex &&
      swipeIndex === pageIndex;
  }

  function detect(raw, rawInfo = null) {
    const text = String(raw || "");
    if (MODULE_KIND === "main-text") return Boolean(mainTextCaptureFromRaw(text));
    return fixedPageRouteMatches(rawInfo);
  }

  function shouldPreserveMountedFixedPageMiss(rawInfo) {
    if (!isFixedPageModule() || !rawInfo) return false;
    return Number(rawInfo.pageCount || 0) < FIXED_UI_MIN_PAGE_COUNT;
  }

  function rawInfoSourceLooksContext(rawInfo) {
    return /(?:context|TavernHelper|SillyTavern)/i.test((rawInfo && rawInfo.source) || "");
  }

  function shouldPreserveMountedMainTextContextMiss(rawInfo, raw) {
    if (MODULE_KIND !== "main-text" || !rawInfoSourceLooksContext(rawInfo)) return false;
    if (rawLooksLikePlotProgressAudit(raw)) return false;
    return !mainTextCaptureFromRaw(raw);
  }

  function routeMissReason(rawInfo, raw) {
    if (MODULE_KIND === "main-text") {
      if (raw && rawLooksLikePlotProgressAudit(raw)) return "main-text-plot-progress-audit";
      return raw ? "main-text-missing-content" : "empty-raw";
    }
    if (!hasFixedPageRoute()) return "route-disabled";
    if (!rawInfo) return "route-info-missing";
    const messageId = normalizeMessageId(rawInfo.messageId);
    const pageIndex = fixedPageIndex();
    const pageCount = Number(rawInfo.pageCount || 0);
    const swipeIndex = normalizeSwipeIndex(rawInfo.swipeIndex, pageCount);
    if (messageId !== FIXED_UI_MESSAGE_ID) return "fixed-page-message-mismatch";
    if (pageCount < FIXED_UI_MIN_PAGE_COUNT || pageCount <= pageIndex) return "fixed-page-missing";
    if (swipeIndex !== pageIndex) return "fixed-page-inactive";
    return raw ? "route-mismatch" : "empty-raw";
  }

  function annotateMountedRoot(root, target) {
    if (!root || !root.dataset) return;
    if (hasFixedPageRoute()) root.dataset.dlouPageIndex = String(PAGE_INDEX);
    const messageNode = findMessageNode(target) || target;
    const messageId = messageIndexFromNode(messageNode);
    if (messageId >= 0) root.dataset.dlouMessageId = String(messageId);
  }

  function mountInternal(target, raw) {
    try {
      if (MODULE_KIND === "cover") return mountCover(target, raw);
      if (MODULE_KIND === "character-create") return mountCharacterCreate(target, raw);
      if (MODULE_KIND === "main-text") return mountMainText(target, raw);
      return MOUNT_STATUS_FAILED;
    } catch (error) {
      rememberError(error, "Render failed");
      return MOUNT_STATUS_FAILED;
    }
  }

  function mountStatusSucceeded(status) {
    return status === MOUNT_STATUS_MOUNTED || status === MOUNT_STATUS_SKIPPED;
  }

  function mount(target, raw) {
    if (state.disposed) return false;
    return mountStatusSucceeded(mountInternal(target, raw));
  }

  function findMessageNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return null;
    if (node.matches && node.matches(MESSAGE_SELECTOR)) return node;
    return node.closest ? node.closest(MESSAGE_SELECTOR) : null;
  }

  function attrLooksTruthy(node, name) {
    const value = node && node.getAttribute && node.getAttribute(name);
    return /^(?:1|true|yes|user)$/i.test(String(value || "").trim());
  }

  function messageNodeLooksUserAuthored(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return false;
    try {
      if (node.matches && node.matches(USER_MESSAGE_SELECTOR)) return true;
    } catch (_) {}
    return [
      "is_user",
      "data-is-user",
      "data-user",
      "data-message-role",
      "data-role",
    ].some((attr) => attrLooksTruthy(node, attr));
  }

  function recordMessageLooksUserAuthored(message) {
    if (!message || typeof message !== "object") return false;
    if (message.is_user === true || message.isUser === true || message.user === true) return true;
    if (message.is_user === 1 || message.isUser === 1 || message.user === 1) return true;
    const roleValues = [
      message.role,
      message.type,
      message.sender,
      message.source,
      message.authorRole,
      message.author_role,
      message.extra && message.extra.role,
      message.extra && message.extra.type,
    ];
    return roleValues.some((value) => /^(?:user|human|persona|player)$/i.test(String(value || "").trim()));
  }

  function contextRecordLooksUserAuthored(record) {
    return !!(record && recordMessageLooksUserAuthored(record.message));
  }

  function messageContextLooksUserAuthored(messageNode) {
    const id = messageIndexFromNode(messageNode);
    if (id < 0) return false;
    return getContextRecordsForMessageId(id).some(contextRecordLooksUserAuthored);
  }

  function messageLooksUserAuthored(messageNode) {
    if (MODULE_KIND !== "main-text") return false;
    return messageNodeLooksUserAuthored(messageNode) || messageContextLooksUserAuthored(messageNode);
  }

  function editableControlsOutsideHelper(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE || !node.querySelectorAll) return [];
    try {
      const controls = [];
      if (node.matches && node.matches(EDITABLE_SOURCE_SELECTOR)) controls.push(node);
      node.querySelectorAll(EDITABLE_SOURCE_SELECTOR).forEach((control) => controls.push(control));
      return controls.filter((control) => !(control.closest && control.closest(ROOT_SELECTOR_ALL)));
    } catch (_) {
      return [];
    }
  }

  function hasEditableOutsideHelper(node) {
    return editableControlsOutsideHelper(node).length > 0;
  }

  function messageIsBeingEdited(messageNode, target, mountedRoot = null) {
    if (MODULE_KIND !== "main-text") return false;
    try {
      if (messageNode && messageNode.matches && messageNode.matches(EDITING_MESSAGE_SELECTOR)) return true;
    } catch (_) {}
    try {
      if (target && target.matches && target.matches(EDITING_MESSAGE_SELECTOR)) return true;
    } catch (_) {}
    const hasEditable = hasEditableOutsideHelper(target) || hasEditableOutsideHelper(messageNode);
    if (!hasEditable) return false;
    if (mountedRoot && inferMountedModule(mountedRoot) === MODULE_KIND) return true;
    return false;
  }

  function findContentContainer(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return null;
    if (node.matches && node.matches(CONTENT_SELECTOR)) return node;
    if (!node.querySelector) return null;
    return Array.from(node.querySelectorAll(CONTENT_SELECTOR))[0] || null;
  }

  function isIgnoredTextElement(node) {
    return !!(
      node &&
      node.nodeType === Node.ELEMENT_NODE &&
      node.matches &&
      node.matches(IGNORED_TEXT_SELECTOR)
    );
  }

  function contentText(node) {
    if (!node) return "";
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue || "";
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    if (isIgnoredTextElement(node)) return "";
    if (node.tagName === "BR") return "\n";
    let out = "";
    node.childNodes.forEach((child) => {
      out += contentText(child);
    });
    return out;
  }

  function cleanedInnerHtml(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return "";
    const clone = node.cloneNode(true);
    if (clone.matches && clone.matches(IGNORED_TEXT_SELECTOR)) return "";
    clone.querySelectorAll(IGNORED_TEXT_SELECTOR).forEach((child) => child.remove());
    return clone.innerHTML || "";
  }

  function rawAttrsFrom(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return "";
    for (const attr of RAW_ATTRS) {
      const value = node.getAttribute && node.getAttribute(attr);
      if (value) return value;
    }
    return "";
  }

  function rawNodeTextFrom(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE || !node.querySelector) return "";
    const rawNode = Array.from(node.querySelectorAll(RAW_NODE_SELECTOR))[0];
    if (!rawNode) return "";
    if (rawNode.tagName === "SCRIPT" || rawNode.tagName === "TEMPLATE") {
      return rawNode.textContent || "";
    }
    const value = rawNode.getAttribute("data-raw-message-text");
    if (value) return value;
    return rawNode.textContent || "";
  }

  function editableSourceTextFrom(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return "";
    const controls = [];
    if (node.matches && node.matches(EDITABLE_SOURCE_SELECTOR)) controls.push(node);
    if (node.querySelectorAll) {
      node.querySelectorAll(EDITABLE_SOURCE_SELECTOR).forEach((control) => controls.push(control));
    }
    for (const control of controls) {
      if (control.closest && control.closest(ROOT_SELECTOR_ALL)) continue;
      const value = control.matches && control.matches("[contenteditable='true']")
        ? control.textContent
        : control.value;
      const preferred = preferRawText(value, value);
      if (MODULE_KIND === "main-text" && detect(preferred)) return preferred;
      if (isFixedPageModule() && fixedPageMarkerMatches(preferred)) return preferred;
    }
    return "";
  }

  function preferRawText(text, html) {
    const plain = String(text || "");
    const markup = String(html || "");
    if (MODULE_KIND === "main-text") {
      if (mainTextCaptureFromRaw(plain)) return plain;
      if (mainTextCaptureFromRaw(markup)) return markup;
      return plain || markup;
    }
    return plain || markup;
  }

  function messageIndexFromNode(node) {
    const attrs = ["mesid", "data-message-id", "data-mes-id", "data-index"];
    for (const attr of attrs) {
      const value = node.getAttribute && node.getAttribute(attr);
      if (value != null && value !== "") {
        const num = Number(value);
        if (Number.isFinite(num)) return num;
      }
    }
    return -1;
  }

  function readRawFromDom(node, fallbackNode) {
    const content = findContentContainer(node) || findContentContainer(fallbackNode);
    for (const source of [content, node, fallbackNode]) {
      const attrRaw = rawAttrsFrom(source);
      if (attrRaw) return attrRaw;
    }
    for (const source of [content, node, fallbackNode]) {
      const rawNodeText = rawNodeTextFrom(source);
      if (rawNodeText) return rawNodeText;
    }
    for (const source of [content, node, fallbackNode]) {
      const editableText = editableSourceTextFrom(source);
      if (editableText) return editableText;
    }
    if (content) {
      return preferRawText(contentText(content), cleanedInnerHtml(content));
    }
    if (node && node.nodeType === Node.ELEMENT_NODE && !isIgnoredTextElement(node)) {
      return preferRawText(contentText(node), cleanedInnerHtml(node));
    }
    return "";
  }

  function hostWindowEntries() {
    const out = [];
    const seen = [];
    function add(label, getHost) {
      try {
        const host = getHost();
        if (!host || seen.includes(host)) return;
        seen.push(host);
        out.push({ label, host });
      } catch (_) {}
    }
    add("self", () => window);
    add("parent", () => (window.parent && window.parent !== window ? window.parent : null));
    add("top", () => (window.top && window.top !== window ? window.top : null));
    return out;
  }

  function hostWindows() {
    return hostWindowEntries().map((entry) => entry.host);
  }

  function documentLocation(targetDocument) {
    try {
      const location = targetDocument && targetDocument.defaultView && targetDocument.defaultView.location;
      return location && location.href ? String(location.href) : "";
    } catch (_) {
      return "";
    }
  }

  function hostDocuments() {
    const out = [];
    const seen = [];
    const errors = [];
    hostWindowEntries().forEach((entry) => {
      try {
        const doc = entry.host.document;
        if (!doc || !doc.documentElement || !doc.querySelectorAll) {
          errors.push(`${entry.label}: unavailable`);
          return;
        }
        if (seen.includes(doc)) return;
        seen.push(doc);
        out.push({
          label: entry.label,
          document: doc,
          window: entry.host,
          location: documentLocation(doc),
        });
      } catch (error) {
        const text = error && error.message ? error.message : String(error || "unknown");
        errors.push(`${entry.label}: ${text}`);
      }
    });
    state.accessibleHostDocumentCount = out.length;
    state.scannedDocuments = out.map((entry) => entry.label);
    state.hostDomAccessError = errors.join("; ");
    return out;
  }

  function normalizeMessageId(value) {
    if (!Number.isFinite(Number(value))) return -1;
    const id = Math.trunc(Number(value));
    return id >= 0 ? id : -1;
  }

  function messageIdFromMessage(message, fallback = -1) {
    if (message && typeof message === "object") {
      const keys = ["message_id", "messageId", "mesid", "id", "index"];
      for (const key of keys) {
        const id = normalizeMessageId(message[key]);
        if (id >= 0) return id;
      }
    }
    return normalizeMessageId(fallback);
  }

  function pushMessage(out, message, source, messageId = -1) {
    if (!message) return;
    out.push({
      message,
      source,
      messageId: messageIdFromMessage(message, messageId),
    });
  }

  function pushMessageList(out, messages, source, messageId = -1) {
    if (!messages) return;
    if (!Array.isArray(messages)) {
      pushMessage(out, messages, source, messageId);
      return;
    }
    messages.forEach((message, index) => {
      const fallback = messages.length === 1 ? messageId : index;
      pushMessage(out, message, `${source}[${index}]`, fallback);
    });
  }

  function hostContext(host) {
    try {
      return host && host.SillyTavern && typeof host.SillyTavern.getContext === "function"
        ? host.SillyTavern.getContext()
        : null;
    } catch (_) {
      return null;
    }
  }

  function contextProbeIdsForHosts() {
    const ids = [0];
    for (const host of hostWindows()) {
      try {
        const helper = host.TavernHelper;
        if (helper && typeof helper.getCurrentMessageId === "function") {
          const id = normalizeMessageId(helper.getCurrentMessageId());
          if (id >= 0) ids.push(id);
        }
      } catch (_) {}
      try {
        const helper = host.TavernHelper;
        if (helper && typeof helper.getLastMessageId === "function") {
          const id = normalizeMessageId(helper.getLastMessageId());
          if (id >= 0) ids.push(id);
        }
      } catch (_) {}
    }
    return Array.from(new Set(ids));
  }

  function pushHelperMessageById(out, host, id) {
    try {
      const helper = host.TavernHelper;
      if (helper && typeof helper.getChatMessages === "function") {
        pushMessageList(
          out,
          helper.getChatMessages(id, { include_swipes: true }) || [],
          `TavernHelper.getChatMessages(${id})`,
          id
        );
      }
    } catch (_) {}
  }

  function pushContextChatById(out, host, id) {
    const context = hostContext(host);
    if (!context || !Array.isArray(context.chat)) return;
    pushMessage(out, context.chat[id], `SillyTavern.context.chat[${id}]`, id);
  }

  function getContextRecordsForMessageId(index) {
    const out = [];
    const id = normalizeMessageId(index);
    if (id < 0) return out;
    for (const host of hostWindows()) {
      pushHelperMessageById(out, host, id);
      pushContextChatById(out, host, id);
    }
    return out;
  }

  function getContextProbeRecords() {
    const out = [];
    const ids = contextProbeIdsForHosts();
    for (const host of hostWindows()) {
      ids.forEach((id) => pushHelperMessageById(out, host, id));
      const context = hostContext(host);
      if (context && Array.isArray(context.chat)) {
        pushMessageList(out, context.chat, "SillyTavern.context.chat");
      }
    }
    return out;
  }

  function messageTextVariants(message) {
    const out = [];
    if (!message) return out;
    if (typeof message === "string") return [message];

    const activeSwipe = activeSwipeIndex(message);
    if (activeSwipe >= 0 && Array.isArray(message.swipes)) {
      pushVariant(out, message.swipes[activeSwipe]);
      try {
        pushVariant(out, message.swipe_info && message.swipe_info[activeSwipe]);
      } catch (_) {}
      if (out.length) return out;
    }

    pushMessageFields(out, message);

    if (Array.isArray(message.swipes) && message.swipes.length === 1) {
      pushVariant(out, message.swipes[0]);
      try {
        pushVariant(out, message.swipe_info && message.swipe_info[0]);
      } catch (_) {}
    }
    return out;
  }

  function swipePageCount(message) {
    return message && typeof message === "object" && Array.isArray(message.swipes)
      ? message.swipes.length
      : 0;
  }

  function textFromMessageValue(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    const values = messageTextVariants(value);
    return values.length ? values[0] : "";
  }

  function activeSwipeTextFromMessage(message, activeSwipe) {
    if (!message || typeof message !== "object" || !Array.isArray(message.swipes)) return "";
    const index = normalizeSwipeIndex(activeSwipe, message.swipes.length);
    if (index < 0) return "";
    return textFromMessageValue(message.swipes[index]);
  }

  function pushMessageFields(out, message) {
    if (!message || typeof message !== "object") return;
    ["mes", "message", "content", "text", "raw"].forEach((key) => {
      if (typeof message[key] === "string") out.push(message[key]);
    });
  }

  function pushVariant(out, value) {
    if (!value) return;
    if (typeof value === "string") {
      out.push(value);
      return;
    }
    messageTextVariants(value).forEach((item) => out.push(item));
  }

  function activeSwipeIndex(message) {
    if (!message || typeof message !== "object" || !Array.isArray(message.swipes)) return -1;
    const length = message.swipes.length;
    const keys = ["swipe_id", "swipeId", "swipeIndex", "currentSwipe", "current_swipe"];
    for (const key of keys) {
      const index = normalizeSwipeIndex(message[key], length);
      if (index >= 0) return index;
    }
    const inferred = inferSwipeIndexFromMessageBody(message, length);
    if (inferred >= 0) return inferred;
    return -1;
  }

  function normalizeSwipeIndex(value, length) {
    if (!Number.isFinite(Number(value)) || length <= 0) return -1;
    const raw = Math.trunc(Number(value));
    if (raw >= 0 && raw < length) return raw;
    if (raw > 0 && raw - 1 < length) return raw - 1;
    return -1;
  }

  function defaultFixedSwipeIndex(messageId, pageCount) {
    return hasFixedPageRoute() &&
      normalizeMessageId(messageId) === FIXED_UI_MESSAGE_ID &&
      Number(pageCount || 0) >= FIXED_UI_MIN_PAGE_COUNT
      ? 0
      : -1;
  }

  function routeSwipeIndexForRecord(record, pageCount) {
    const active = activeSwipeIndex(record && record.message);
    if (active >= 0) return active;
    return defaultFixedSwipeIndex(record && record.messageId, pageCount);
  }

  function messageFieldStrings(value) {
    if (!value) return [];
    if (typeof value === "string") return [value];
    if (typeof value !== "object") return [];
    const out = [];
    ["mes", "message", "content", "text", "raw"].forEach((key) => {
      if (typeof value[key] === "string") out.push(value[key]);
    });
    return out;
  }

  function comparableSwipeText(value) {
    return String(value || "").replace(/\r\n/g, "\n").trim();
  }

  function inferSwipeIndexFromMessageBody(message, length) {
    const currentTexts = messageFieldStrings(message).map(comparableSwipeText).filter(Boolean);
    if (!currentTexts.length) return -1;
    for (let i = 0; i < length; i += 1) {
      const swipeTexts = messageFieldStrings(message.swipes[i]).map(comparableSwipeText).filter(Boolean);
      if (swipeTexts.some((text) => currentTexts.includes(text))) return i;
    }
    return -1;
  }

  function readRawFromContextInfo(node, options = {}) {
    const index = messageIndexFromNode(node);
    const records = index >= 0
      ? getContextRecordsForMessageId(index)
      : (options.allowGlobalFallback ? getContextProbeRecords() : []);
    if (hasFixedPageRoute()) return readFixedPageFromContextInfo(node, records, index);
    return readMainTextFromContextInfo(node, records, index);
  }

  function readFixedPageFromContextInfo(node, records, index) {
    let firstRouteInfo = null;
    for (const record of records) {
      const pageCount = swipePageCount(record.message);
      const markerSwipe = fixedPageMarkerSwipeIndex(record.message);
      const activeSwipe = routeSwipeIndexForRecord(record, pageCount);
      const effectiveSwipe = activeSwipe >= 0 ? activeSwipe : markerSwipe;
      const explicitMarker = markerSwipe >= 0 && effectiveSwipe === markerSwipe;
      const routeInfo = {
        source: record.source || "context",
        strong: effectiveSwipe >= 0,
        swipeIndex: effectiveSwipe,
        pageCount,
        messageId: record.messageId,
        explicitMarker,
      };
      if (!firstRouteInfo) firstRouteInfo = routeInfo;
      if (!fixedPageRouteMatches(routeInfo)) continue;
      return {
        raw: activeSwipeTextFromMessage(record.message, effectiveSwipe),
        ...routeInfo,
      };
    }
    if (firstRouteInfo) {
      return {
        raw: "",
        ...firstRouteInfo,
        source: `${firstRouteInfo.source || "context"}-route-mismatch`,
      };
    }
    return {
      raw: "",
      source: index >= 0 ? "context-route-none" : "context-none",
      strong: false,
      swipeIndex: -1,
      pageCount: 0,
      messageId: index,
    };
  }

  function readMainTextFromContextInfo(node, records, index) {
    let firstRaw = null;
    let firstSource = "";
    let firstMessageId = index;
    let firstSwipeIndex = contextSwipeIndexForNode(node);
    let firstPageCount = 0;
    let firstStrongRaw = null;
    let firstStrongSource = "";
    let firstStrongMessageId = index;
    let firstStrongSwipeIndex = contextSwipeIndexForNode(node);
    let firstStrongPageCount = 0;

    for (const record of records) {
      if (contextRecordLooksUserAuthored(record)) continue;
      const activeSwipe = activeSwipeIndex(record.message);
      const pageCount = swipePageCount(record.message);
      const strong = activeSwipe >= 0;
      const routeInfo = {
        source: record.source || "context",
        strong,
        swipeIndex: activeSwipe,
        pageCount,
        messageId: record.messageId,
      };
      const variants = messageTextVariants(record.message);
      for (const value of variants) {
        const preferred = preferRawText(value, value);
        if (!preferred) continue;
        if (firstRaw == null) {
          firstRaw = preferred;
          firstSource = record.source || "context";
          firstMessageId = record.messageId;
          firstSwipeIndex = activeSwipe;
          firstPageCount = pageCount;
        }
        if (strong && firstStrongRaw == null) {
          firstStrongRaw = preferred;
          firstStrongSource = record.source || "context-active-swipe";
          firstStrongMessageId = record.messageId;
          firstStrongSwipeIndex = activeSwipe;
          firstStrongPageCount = pageCount;
        }
        if (detect(preferred, routeInfo)) {
          return {
            raw: preferred,
            ...routeInfo,
          };
        }
      }
    }

    if (firstStrongRaw != null) {
      return {
        raw: firstStrongRaw,
        source: firstStrongSource,
        strong: true,
        swipeIndex: firstStrongSwipeIndex,
        pageCount: firstStrongPageCount,
        messageId: firstStrongMessageId,
      };
    }
    if (firstRaw != null) {
      return {
        raw: firstRaw,
        source: firstSource,
        strong: false,
        swipeIndex: firstSwipeIndex,
        pageCount: firstPageCount,
        messageId: firstMessageId,
      };
    }
    return {
      raw: "",
      source: index >= 0 ? "context-index-none" : "context-none",
      strong: false,
      swipeIndex: -1,
      pageCount: 0,
      messageId: index,
    };
  }

  function readRawInfo(node, fallbackNode) {
    const contextNode = fallbackNode || node;
    if (hasFixedPageRoute()) {
      const domRaw = readRawFromDom(node, fallbackNode) || "";
      if (fixedPageMarkerMatches(domRaw)) {
        return {
          raw: domRaw,
          source: "dom-marker",
          strong: true,
          swipeIndex: contextSwipeIndexForNode(contextNode),
          pageCount: contextPageCountForNode(contextNode),
          messageId: messageIndexFromNode(contextNode),
          explicitMarker: true,
        };
      }
      const contextInfo = readRawFromContextInfo(contextNode, { allowGlobalFallback: isContextHostNode(contextNode) });
      if (fixedPageRouteMatches(contextInfo) && (!contextInfo.explicitMarker || !domRaw.trim())) return contextInfo;
      const blockedContextInfo = fixedPageRouteMatches(contextInfo) && contextInfo.explicitMarker && domRaw.trim()
        ? {
            raw: "",
            source: `${contextInfo.source || "context"}-dom-marker-mismatch`,
            strong: false,
            swipeIndex: contextSwipeIndexForNode(contextNode),
            pageCount: contextPageCountForNode(contextNode),
            messageId: messageIndexFromNode(contextNode),
            explicitMarker: false,
          }
        : contextInfo;
      const domInfo = {
        raw: "",
        source: "dom-route",
        strong: false,
        swipeIndex: contextSwipeIndexForNode(contextNode),
        pageCount: contextPageCountForNode(contextNode),
        messageId: messageIndexFromNode(contextNode),
      };
      return fixedPageRouteMatches(domInfo) ? domInfo : blockedContextInfo;
    }
    const domRaw = readRawFromDom(node, fallbackNode) || "";
    if (domRaw) {
      return {
        raw: domRaw,
        source: "dom",
        strong: true,
        swipeIndex: contextSwipeIndexForNode(contextNode),
        pageCount: contextPageCountForNode(contextNode),
        messageId: messageIndexFromNode(contextNode),
      };
    }
    return readRawFromContextInfo(contextNode, { allowGlobalFallback: isContextHostNode(contextNode) });
  }

  function readRaw(node, fallbackNode) {
    return readRawInfo(node, fallbackNode).raw;
  }

  function probeContextForModule() {
    const records = getContextProbeRecords();
    const result = {
      matched: false,
      recordCount: records.length,
      source: "",
      messageId: -1,
      swipeIndex: -1,
      pageCount: 0,
      strong: false,
      raw: "",
      rawPreview: "",
    };
    for (const record of records) {
      if (MODULE_KIND === "main-text" && contextRecordLooksUserAuthored(record)) continue;
      const pageCount = swipePageCount(record.message);
      const markerSwipe = hasFixedPageRoute() ? fixedPageMarkerSwipeIndex(record.message) : -1;
      const activeSwipe = hasFixedPageRoute()
        ? routeSwipeIndexForRecord(record, pageCount)
        : activeSwipeIndex(record.message);
      const effectiveSwipe = activeSwipe >= 0 ? activeSwipe : markerSwipe;
      const explicitMarker = markerSwipe >= 0 && effectiveSwipe === markerSwipe;
      const routeInfo = {
        source: record.source || "",
        messageId: record.messageId,
        swipeIndex: effectiveSwipe,
        pageCount,
        strong: effectiveSwipe >= 0,
        explicitMarker,
      };
      if (hasFixedPageRoute()) {
        if (!result.rawPreview) result.rawPreview = preview(activeSwipeTextFromMessage(record.message, effectiveSwipe));
        if (!fixedPageRouteMatches(routeInfo)) continue;
        const raw = activeSwipeTextFromMessage(record.message, effectiveSwipe);
        result.matched = true;
        result.source = routeInfo.source;
        result.messageId = routeInfo.messageId;
        result.swipeIndex = routeInfo.swipeIndex;
        result.pageCount = routeInfo.pageCount;
        result.strong = routeInfo.strong;
        result.raw = raw;
        result.rawPreview = preview(raw);
        return result;
      }
      const variants = messageTextVariants(record.message);
      for (const value of variants) {
        const preferred = preferRawText(value, value);
        if (!result.rawPreview && preferred) result.rawPreview = preview(preferred);
        if (detect(preferred, routeInfo)) {
          result.matched = true;
          result.source = record.source || "";
          result.messageId = record.messageId;
          result.swipeIndex = activeSwipe;
          result.pageCount = pageCount;
          result.strong = activeSwipe >= 0;
          result.raw = preferred;
          result.rawPreview = preview(preferred);
          return result;
        }
      }
    }
    return result;
  }

  function contextHostDatasetMatches(host, probe, rawHash, signature) {
    if (!host || !host.dataset) return false;
    return host.dataset.dlouContextModule === MODULE_KIND &&
      host.dataset.dlouContextMessageId === String(probe.messageId) &&
      host.dataset.dlouContextRawHash === rawHash &&
      host.dataset.dlouContextSignature === signature;
  }

  function contextHostsForModule() {
    const out = [];
    hostDocuments().forEach((entry) => {
      try {
        entry.document.querySelectorAll(CONTEXT_HOST_SELECTOR).forEach((node) => {
          if (node.dataset && node.dataset.dlouContextModule === MODULE_KIND) out.push(node);
        });
      } catch (_) {}
    });
    return out;
  }

  function findChatRootForContextHost() {
    for (const entry of hostDocuments()) {
      try {
        const root = entry.document.querySelector("#chat");
        if (root) return root;
      } catch (_) {}
    }
    return null;
  }

  function createContextHost(chatRoot, probe, rawHash, signature) {
    const doc = ownerDocumentOf(chatRoot);
    const host = doc.createElement("section");
    host.className = "dlou-context-host";
    host.setAttribute(CONTEXT_HOST_ATTR, MODULE_KIND);
    host.setAttribute("data-dlou-message", "");
    host.setAttribute("data-message-id", String(probe.messageId));
    host.dataset.dlouContextModule = MODULE_KIND;
    host.dataset.dlouContextMessageId = String(probe.messageId);
    host.dataset.dlouContextRawHash = rawHash;
    host.dataset.dlouContextSignature = signature;
    host.dataset.dlouContextSource = probe.source || "";

    const content = doc.createElement("div");
    content.className = "dlou-context-content";
    content.setAttribute("data-dlou-message-content", "");
    host.appendChild(content);
    const messageId = normalizeMessageId(probe.messageId);
    const before = messageId >= 0 && chatRoot.querySelectorAll
      ? Array.from(chatRoot.querySelectorAll(MESSAGE_SELECTOR)).find((node) => {
        if (isContextHostNode(node)) return false;
        const id = messageIndexFromNode(node);
        return id >= 0 && id > messageId;
      })
      : null;
    if (before && before.parentNode === chatRoot) {
      chatRoot.insertBefore(host, before);
    } else {
      chatRoot.appendChild(host);
    }
    return host;
  }

  function ensureContextHost(probe) {
    if (!probe || !probe.matched) return null;
    const rawHash = mountHashFromRaw(probe.raw);
    const signature = currentChatSignature();
    const hosts = contextHostsForModule();
    const existing = hosts.find((host) => contextHostDatasetMatches(host, probe, rawHash, signature));
    if (existing) return existing;
    hosts.forEach((host) => {
      if (!host.parentNode) return;
      try {
        host.parentNode.removeChild(host);
        state.contextHostCleanupCount += 1;
      } catch (_) {}
    });
    const chatRoot = findChatRootForContextHost();
    if (!chatRoot) return null;
    return createContextHost(chatRoot, probe, rawHash, signature);
  }

  function hasRealCandidateForContext(candidates, messageId) {
    const id = normalizeMessageId(messageId);
    if (id < 0) return false;
    return candidates.some((node) => {
      if (isContextHostNode(node)) return false;
      const messageNode = findMessageNode(node) || node;
      return messageIndexFromNode(messageNode) === id;
    });
  }

  function hasRealMountedModuleCandidate(candidates) {
    return candidates.some((node) => {
      if (isContextHostNode(node)) return false;
      const messageNode = findMessageNode(node) || node;
      const target = findContentContainer(node) || findContentContainer(messageNode) || messageNode;
      const mountedRoot = findMountedUiRoot(target);
      const mountedModule = mountedRoot && (mountedRoot.getAttribute("data-dlou-helper-root") || inferMountedModule(mountedRoot));
      return mountedModule === MODULE_KIND;
    });
  }

  function cleanupContextHostsForCandidates(candidates) {
    const ids = new Set();
    const removeAllForModule = hasRealMountedModuleCandidate(candidates);
    candidates.forEach((node) => {
      if (isContextHostNode(node)) return;
      const messageNode = findMessageNode(node) || node;
      const id = messageIndexFromNode(messageNode);
      if (id >= 0) ids.add(String(id));
    });
    if (!ids.size && !removeAllForModule) return 0;
    let removed = 0;
    contextHostsForModule().forEach((host) => {
      if (!host.parentNode || !host.dataset) return;
      if (!removeAllForModule && !ids.has(host.dataset.dlouContextMessageId || "")) return;
      try {
        host.parentNode.removeChild(host);
        removed += 1;
      } catch (_) {}
    });
    if (removed) state.contextHostCleanupCount += removed;
    return removed;
  }

  function mountFromContextProbe(candidates) {
    const probe = state.contextProbe && state.contextProbe.matched
      ? state.contextProbe
      : probeContextForModule();
    state.contextProbe = probe;
    if (!probe.matched) return 0;
    if (hasRealMountedModuleCandidate(candidates)) return 0;
    if (hasRealCandidateForContext(candidates, probe.messageId)) return 0;
    const host = ensureContextHost(probe);
    if (!host) {
      state.lastSkipReason = "context-host-unavailable";
      return 0;
    }
    const target = findContentContainer(host) || host;
    const mountedRoot = findMountedUiRoot(target);
    const mountedModule = mountedRoot && (mountedRoot.getAttribute("data-dlou-helper-root") || inferMountedModule(mountedRoot));
    const rawHash = mountHashFromRaw(probe.raw);
    if (mountedModule === MODULE_KIND && target.dataset[doneAttr] === "1" && target.dataset[hashAttr] === rawHash) {
      state.lastSkipReason = "context-host-already-mounted";
      return 0;
    }
    state.lastRawSource = probe.source || "context";
    state.lastRawStrong = Boolean(probe.strong);
    state.lastRawMessageId = normalizeMessageId(probe.messageId);
    state.lastRawSwipeIndex = normalizeSwipeIndex(probe.swipeIndex, probe.pageCount || 0);
    state.lastRawPageCount = Number(probe.pageCount || 0);
    state.lastRawPreview = probe.rawPreview || preview(probe.raw);
    state.lastMatched = state.lastRawPreview;
    state.lastContextHostMessageId = String(probe.messageId);
    state.lastContextHostSignature = currentChatSignature();
    state.lastContextHostRawHash = rawHash;
    const mountStatus = mountInternal(target, probe.raw);
    if (mountStatus === MOUNT_STATUS_SKIPPED) {
      state.lastSkipReason = "context-host-already-mounted";
      return 0;
    }
    if (mountStatus !== MOUNT_STATUS_MOUNTED) {
      state.lastSkipReason = state.lastError ? "context-host-mount-failed" : "context-host-mount-returned-false";
      return 0;
    }
    state.mounted += 1;
    state.contextHostMountCount += 1;
    state.lastSkipReason = "context-host-rendered";
    rememberMainTextRender(host, target, probe.raw, probe);
    rememberCandidateSample(makeCandidateSample(host, host, target, probe.raw, state.lastSkipReason, true));
    notify("rendered from context");
    return 1;
  }

  function preview(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 180);
  }

  function lockedMeta() {
    try {
      const all = window.__DLOU_HELPER_LOCKED_META__;
      return all && all[MODULE_KIND] && typeof all[MODULE_KIND] === "object" ? all[MODULE_KIND] : {};
    } catch (_) {
      return {};
    }
  }

  function windowLocation() {
    try {
      return String(window.location && window.location.href ? window.location.href : "");
    } catch (_) {
      return "";
    }
  }

  function nodeLabel(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return "";
    const parts = [node.tagName.toLowerCase()];
    if (node.id) parts.push(`#${node.id}`);
    if (node.classList && node.classList.length) {
      parts.push(`.${Array.from(node.classList).slice(0, 4).join(".")}`);
    }
    ["mesid", "data-message-id", "data-mes-id", "data-index", "data-root", "data-dls-root", "data-dlou-helper-root"].forEach((attr) => {
      const value = node.getAttribute && node.getAttribute(attr);
      if (value != null) parts.push(value === "" ? `[${attr}]` : `[${attr}="${String(value).slice(0, 24)}"]`);
    });
    return parts.join("");
  }

  function nodePath(node) {
    const parts = [];
    let cursor = node && node.nodeType === Node.ELEMENT_NODE ? node : null;
    while (cursor && parts.length < 6) {
      parts.unshift(nodeLabel(cursor));
      if (cursor.matches && cursor.matches(MESSAGE_SELECTOR)) break;
      cursor = cursor.parentElement;
    }
    return parts.filter(Boolean).join(" > ");
  }

  function sampleAttrs(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return {};
    const out = {};
    ["class", "id", "mesid", "data-message-id", "data-mes-id", "data-index", "data-root", "data-dls-root", "data-dlou-helper-root", "data-dlou-helper-module"].forEach((attr) => {
      const value = node.getAttribute && node.getAttribute(attr);
      if (value != null) out[attr] = value;
    });
    return out;
  }

  function editablePreviewFrom(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return "";
    const values = [];
    const controls = [];
    if (node.matches && node.matches(EDITABLE_SOURCE_SELECTOR)) controls.push(node);
    if (node.querySelectorAll) {
      node.querySelectorAll(EDITABLE_SOURCE_SELECTOR).forEach((control) => controls.push(control));
    }
    controls.slice(0, 4).forEach((control) => {
      if (control.closest && control.closest(ROOT_SELECTOR_ALL)) return;
      const value = control.matches && control.matches("[contenteditable='true']")
        ? control.textContent
        : control.value;
      if (value) values.push(value);
    });
    return preview(values.join(" | "));
  }

  function rememberCandidateSample(sample) {
    state.candidateSamples.push({
      at: new Date().toISOString(),
      module: MODULE_KIND,
      ...sample,
    });
    if (state.candidateSamples.length > 24) {
      state.candidateSamples.splice(0, state.candidateSamples.length - 24);
    }
  }

  function makeCandidateSample(candidate, messageNode, target, raw, skipReason, matched) {
    return {
      candidatePath: nodePath(candidate),
      targetPath: nodePath(target),
      messagePath: nodePath(messageNode),
      candidateAttrs: sampleAttrs(candidate),
      targetAttrs: sampleAttrs(target),
      messageAttrs: sampleAttrs(messageNode),
      textPreview: preview(candidate && candidate.textContent),
      htmlPreview: preview(candidate && candidate.innerHTML),
      editablePreview: editablePreviewFrom(candidate),
      rawPreview: preview(raw),
      rawSource: state.lastRawSource,
      rawStrong: state.lastRawStrong,
      rawMessageId: state.lastRawMessageId,
      rawSwipeIndex: state.lastRawSwipeIndex,
      rawPageCount: state.lastRawPageCount,
      skipReason: skipReason || "",
      matched: Boolean(matched),
    };
  }

  function restoreLastRawState(rawState) {
    if (!rawState) return;
    state.lastRawPreview = rawState.preview;
    state.lastRawSource = rawState.source;
    state.lastRawStrong = rawState.strong;
    state.lastRawMessageId = rawState.messageId;
    state.lastRawSwipeIndex = rawState.swipeIndex;
    state.lastRawPageCount = rawState.pageCount;
  }

  function processCandidate(candidate) {
    state.mountAttempts += 1;
    if (!candidate || candidate.nodeType !== Node.ELEMENT_NODE) {
      state.lastSkipReason = "not-element";
      rememberCandidateSample({ skipReason: state.lastSkipReason, matched: false });
      return false;
    }
    const messageNode = findMessageNode(candidate) || candidate;
    const target = findContentContainer(candidate) || findContentContainer(messageNode) || messageNode;
    if (!target) {
      state.lastSkipReason = "no-target";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, "", state.lastSkipReason, false));
      return false;
    }
    const mountedRoot = findMountedUiRoot(target);
    const mountedModule = mountedRoot && (mountedRoot.getAttribute("data-dlou-helper-root") || inferMountedModule(mountedRoot));
    if (messageIsBeingEdited(messageNode, target, mountedRoot)) {
      const restored = mountedModule === MODULE_KIND && restoreMainTextEditSurface(messageNode, target, mountedRoot);
      state.lastSkipReason = restored ? "editing-raw-restored" : "editing-message";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, "", state.lastSkipReason, false));
      return false;
    }
    if (messageLooksUserAuthored(messageNode)) {
      state.lastSkipReason = "main-text-user-message";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, "", state.lastSkipReason, false));
      return false;
    }
    const rawInfo = readRawInfo(target, messageNode);
    const raw = rawInfo.raw;
    const previousRawState = {
      preview: state.lastRawPreview,
      source: state.lastRawSource,
      strong: state.lastRawStrong,
      messageId: state.lastRawMessageId,
      swipeIndex: state.lastRawSwipeIndex,
      pageCount: state.lastRawPageCount,
    };
    state.lastRawSource = rawInfo.source || "";
    state.lastRawStrong = Boolean(rawInfo.strong);
    state.lastRawMessageId = normalizeMessageId(rawInfo.messageId);
    state.lastRawSwipeIndex = normalizeSwipeIndex(rawInfo.swipeIndex, rawInfo.pageCount || 0);
    state.lastRawPageCount = Number(rawInfo.pageCount || 0);
    state.lastRawPreview = preview(raw);
    if (!detect(raw, rawInfo)) {
      if (mountedModule === MODULE_KIND) {
        if (shouldPreserveMountedFixedPageMiss(rawInfo)) {
          state.lastSkipReason = "mounted-fixed-page-preserved";
          rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
          restoreLastRawState(previousRawState);
          return false;
        }
        if (!rawInfo.strong) {
          state.lastSkipReason = raw ? "mounted-weak-context-ignored" : "mounted-empty-raw";
          rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
          restoreLastRawState(previousRawState);
          return false;
        }
        if (shouldPreserveMountedMainTextContextMiss(rawInfo, raw)) {
          state.lastSkipReason = "mounted-context-miss-preserved";
          rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
          restoreLastRawState(previousRawState);
          return false;
        }
        if (shouldPreserveMountedMainTextMiss(messageNode, target, rawInfo, raw)) {
          state.lastSkipReason = state.lastMainTextStreamReason || "mounted-streaming-incomplete-preserved";
          rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
          restoreLastRawState(previousRawState);
          return false;
        }
        resetMainTextStreamState(target);
        clearElement(target);
        clearMountState(target);
        state.lastSkipReason = raw ? "stale-module-cleared" : "stale-module-empty-raw";
        rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
        return false;
      }
      if (mountedRoot) {
        state.lastSkipReason = "other-ui-mounted";
        rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
        return false;
      }
      if (restoreMainTextFromCache(messageNode, target, rawInfo, raw)) {
        state.lastSkipReason = state.lastMainTextStreamReason || "mounted-streaming-cache-restored";
        rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
        return true;
      }
      state.lastSkipReason = routeMissReason(rawInfo, raw);
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, false));
      return false;
    }
    if (shouldDebounceMountedMainTextUpdate(target, rawInfo, raw, mountedModule)) {
      state.lastSkipReason = state.lastMainTextStreamReason || "mounted-streaming-update-debounced";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, true));
      return false;
    }
    resetMainTextStreamState(target);
    if (mountedModule === MODULE_KIND && target.dataset[doneAttr] === "1" && target.dataset[hashAttr] === mountHashFromRaw(raw)) {
      state.lastSkipReason = "already-mounted";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, true));
      return false;
    }
    state.lastMatched = state.lastRawPreview;
    state.lastSkipReason = "";
    const mountStatus = mountInternal(target, raw);
    if (mountStatus === MOUNT_STATUS_MOUNTED) {
      state.mounted += 1;
      rememberMainTextRender(messageNode, target, raw, rawInfo);
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, "rendered", true));
      notify("rendered");
      return true;
    } else if (mountStatus === MOUNT_STATUS_SKIPPED) {
      state.lastSkipReason = "already-mounted";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, true));
      return false;
    } else {
      state.lastSkipReason = state.lastError ? "mount-failed" : "mount-returned-false";
      rememberCandidateSample(makeCandidateSample(candidate, messageNode, target, raw, state.lastSkipReason, true));
    }
    return false;
  }

  function findMountedUiRoot(target) {
    if (!target || target.nodeType !== Node.ELEMENT_NODE) return null;
    if (target.matches && target.matches(UI_HELPER_ROOT_SELECTOR)) return target;
    return target.querySelector ? target.querySelector(UI_HELPER_ROOT_SELECTOR) : null;
  }

  function inferMountedModule(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return "";
    if (root.matches("[data-cover-root]")) return "cover";
    if (root.matches("[data-main-text-root], .dmt-root")) return "main-text";
    if (root.matches(".ds8[data-root]")) return "character-create";
    return "";
  }

  function collectCandidatesFromScope(scope, nodes) {
    if (!scope) return;
    if (scope.matches && scope.matches(CONTENT_SELECTOR)) nodes.add(scope);
    if (scope.matches && scope.matches(MESSAGE_SELECTOR)) nodes.add(scope);
    if (scope.querySelectorAll) {
      scope.querySelectorAll(CONTENT_SELECTOR).forEach((node) => nodes.add(node));
      scope.querySelectorAll(MESSAGE_SELECTOR).forEach((node) => nodes.add(node));
    }
  }

  function collectCandidates(root) {
    const nodes = new Set();
    if (root) {
      state.scannedDocuments = ["custom-root"];
      collectCandidatesFromScope(root, nodes);
    } else {
      const docs = hostDocuments();
      docs.forEach((entry) => collectCandidatesFromScope(entry.document, nodes));
      if (!docs.length && !state.hostDomAccessError) {
        state.hostDomAccessError = "no accessible host document";
      }
    }
    return Array.from(nodes).sort((a, b) => {
      const aMsg = findMessageNode(a) || a;
      const bMsg = findMessageNode(b) || b;
      const aContext = isContextHostNode(aMsg) || isContextHostNode(a);
      const bContext = isContextHostNode(bMsg) || isContextHostNode(b);
      if (aContext !== bContext) return aContext ? 1 : -1;
      return messageIndexFromNode(aMsg) - messageIndexFromNode(bMsg);
    });
  }

  function scanNew(options = {}) {
    if (state.disposed) {
      return { rendered: 0, matched: 0, candidateCount: 0, lastSkipReason: "disposed" };
    }
    const latestOnly = Boolean(options.latestOnly);
    const candidates = collectCandidates(options.root || null);
    state.candidateCount = candidates.length;
    state.scanRuns += 1;
    state.contextProbe = probeContextForModule();
    if (!candidates.length) {
      state.lastSkipReason = state.accessibleHostDocumentCount ? "no-dom-candidates" : "no-accessible-dom";
      if (state.contextProbe.rawPreview) state.lastRawPreview = state.contextProbe.rawPreview;
    }
    const ordered = latestOnly ? candidates.reverse() : candidates;
    let rendered = 0;
    let matched = 0;
    for (const node of ordered) {
      const before = state.lastMatched;
      if (processCandidate(node)) {
        rendered += 1;
        if (latestOnly) break;
      }
      if (state.lastMatched && state.lastMatched !== before) matched += 1;
    }
    if (candidates.length) {
      cleanupContextHostsForCandidates(candidates);
    }
    if (!rendered) {
      const contextRendered = mountFromContextProbe(candidates);
      if (contextRendered) {
        rendered += contextRendered;
        matched += contextRendered;
      }
    }
    state.lastScanAt = Date.now();
    const result = {
      rendered,
      matched,
      candidateCount: candidates.length,
      lastRawPreview: state.lastRawPreview,
      lastSkipReason: state.lastSkipReason,
      lastMatched: state.lastMatched,
      scannedDocuments: state.scannedDocuments.slice(),
      accessibleHostDocumentCount: state.accessibleHostDocumentCount,
      hostDomAccessError: state.hostDomAccessError,
      contextProbe: state.contextProbe,
    };
    if (!rendered && !state.mounted && !state.reportedNoMatch && state.scanRuns >= 3) {
      state.reportedNoMatch = true;
      const docs = result.scannedDocuments.length ? result.scannedDocuments.join(",") : "none";
      const contextHint = result.contextProbe && result.contextProbe.matched
        ? `, context=${result.contextProbe.source || "matched"}`
        : "";
      notify(
        `No ${MODULE_KIND} render after scan: candidates=${result.candidateCount}, docs=${docs}, reason=${result.lastSkipReason || "unknown"}, raw="${result.lastRawPreview}"${contextHint}`,
        "warning"
      );
      try {
        console.warn(`[Douluo UI Helper][${MODULE_KIND}][${BUILD_ID}] diagnostic`, status());
      } catch (_) {}
    }
    return result;
  }

  function enqueue(node) {
    if (state.disposed) return;
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentElement;
      if (parent) enqueue(parent);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches && (node.matches(CONTENT_SELECTOR) || node.matches(MESSAGE_SELECTOR))) {
      state.pending.add(node);
    }
    const messageNode = findMessageNode(node);
    if (messageNode) state.pending.add(messageNode);
    const contentNode = findContentContainer(node);
    if (contentNode) state.pending.add(contentNode);
    if (!state.flushTimer) {
      state.flushTimer = scheduleTracked(flushQueue, 30);
    }
  }

  function flushQueue() {
    if (state.disposed) return;
    state.flushTimer = 0;
    const nodes = Array.from(state.pending);
    state.pending.clear();
    nodes.forEach((node) => processCandidate(node));
  }

  function observedEntryForDocument(targetDocument) {
    return state.observers.find((entry) => entry.document === targetDocument) || null;
  }

  function removeObserverEntry(entry) {
    if (!entry) return;
    try {
      entry.observer.disconnect();
    } catch (_) {}
    const index = state.observers.indexOf(entry);
    if (index >= 0) state.observers.splice(index, 1);
  }

  function startObserver() {
    if (state.disposed) return;
    const docs = hostDocuments();
    docs.forEach((entry) => {
      const doc = entry.document;
      if (!doc) return;
      const target = doc.body || doc.documentElement;
      if (!target) return;
      const Observer = (entry.window && entry.window.MutationObserver) || window.MutationObserver;
      if (typeof Observer !== "function") return;
      const existing = observedEntryForDocument(doc);
      if (existing && existing.target === target) return;
      if (existing) {
        removeObserverEntry(existing);
        state.observerRetargetCount += 1;
      }
      const observer = new Observer((mutations) => {
        if (state.disposed) return;
        mutations.forEach((mutation) => {
          enqueue(mutation.target);
          mutation.addedNodes.forEach((node) => {
            enqueue(node);
            if (node && node.nodeType === Node.ELEMENT_NODE && node.querySelectorAll) {
              node.querySelectorAll(CONTENT_SELECTOR).forEach((contentNode) => enqueue(contentNode));
              node.querySelectorAll(MESSAGE_SELECTOR).forEach((messageNode) => enqueue(messageNode));
            }
          });
        });
      });
      observer.observe(target, { childList: true, subtree: true, characterData: true });
      state.observers.push({ label: entry.label, document: doc, target, observer });
    });
    state.observed = state.observers.length > 0;
    state.observedDocuments = state.observers.map((entry) => entry.label);
  }

  function sillyContext(host) {
    try {
      return host && host.SillyTavern && typeof host.SillyTavern.getContext === "function"
        ? host.SillyTavern.getContext()
        : null;
    } catch (_) {
      return null;
    }
  }

  function lifecycleEventRecord(entry) {
    const host = entry && entry.host;
    const context = sillyContext(host);
    const eventSource = (context && context.eventSource) || (host && host.eventSource) || null;
    const eventTypes = (context && context.eventTypes) || (host && (host.eventTypes || host.event_types)) || {};
    return { label: entry.label, eventSource, eventTypes };
  }

  function lifecycleEventNames(eventTypes, key, index) {
    const names = new Set();
    try {
      if (eventTypes && typeof eventTypes[key] === "string") names.add(eventTypes[key]);
    } catch (_) {}
    names.add(CHAT_LIFECYCLE_EVENT_NAMES[index]);
    names.add(key);
    return Array.from(names).filter(Boolean);
  }

  function hasLifecycleSubscription(source, eventName) {
    return state.lifecycleSubscriptions.some((item) => item.source === source && item.eventName === eventName);
  }

  function addLifecycleSubscription(source, eventName, listener, label) {
    if (state.disposed || !source || !eventName || hasLifecycleSubscription(source, eventName)) return false;
    try {
      if (typeof source.on === "function") {
        source.on(eventName, listener);
      } else if (typeof source.addEventListener === "function") {
        source.addEventListener(eventName, listener);
      } else {
        return false;
      }
      state.lifecycleSubscriptions.push({ source, eventName, listener, label });
      return true;
    } catch (_) {
      return false;
    }
  }

  function clearLifecycleSubscriptions() {
    state.lifecycleSubscriptions.splice(0).forEach((item) => {
      try {
        if (typeof item.source.off === "function") item.source.off(item.eventName, item.listener);
        else if (typeof item.source.removeListener === "function") item.source.removeListener(item.eventName, item.listener);
        else if (typeof item.source.removeEventListener === "function") item.source.removeEventListener(item.eventName, item.listener);
      } catch (_) {}
    });
  }

  function scheduleLifecycleScans(reason) {
    if (state.disposed) return;
    const label = reason || "chat-lifecycle";
    state.lifecycleEventCount += 1;
    if (label !== "chat-signature-changed" || !state.lastLifecycleEvent || state.lastLifecycleEvent === "chat-signature-changed") {
      state.lastLifecycleEvent = label;
    }
    state.lastLifecycleAt = Date.now();
    state.lastLifecycleScanReason = label;
    CHAT_LIFECYCLE_SCAN_DELAYS.forEach((delay) => {
      scheduleTracked(() => {
        startObserver();
        scanNew({ includeExisting: true });
      }, delay);
    });
  }

  function subscribeChatLifecycleEvents() {
    if (state.disposed) return;
    hostWindowEntries().forEach((entry) => {
      const record = lifecycleEventRecord(entry);
      const source = record.eventSource;
      if (!source) return;
      CHAT_LIFECYCLE_EVENT_KEYS.forEach((key, index) => {
        lifecycleEventNames(record.eventTypes, key, index).forEach((eventName) => {
          addLifecycleSubscription(
            source,
            eventName,
            () => scheduleLifecycleScans(`${entry.label}:${eventName}`),
            entry.label
          );
        });
      });
    });
  }

  function firstString(values) {
    for (const value of values) {
      if (value == null) continue;
      const text = String(value);
      if (text) return text;
    }
    return "";
  }

  function chatSignatureForHost(entry) {
    const host = entry && entry.host;
    const context = sillyContext(host);
    const helper = host && host.TavernHelper;
    const chatId = context
      ? firstString([
          context.chatId,
          context.chat_id,
          context.chatFile,
          context.chat_file,
          context.chat_filename,
          context.chatFileName,
          context.characterId,
          context.character_id,
        ])
      : "";
    const chatLength = context && Array.isArray(context.chat) ? String(context.chat.length) : "";
    let lastId = "";
    let currentId = "";
    try {
      if (helper && typeof helper.getLastMessageId === "function") lastId = String(helper.getLastMessageId());
    } catch (_) {}
    try {
      if (helper && typeof helper.getCurrentMessageId === "function") currentId = String(helper.getCurrentMessageId());
    } catch (_) {}
    return [entry.label, chatId, chatLength, lastId, currentId].join(":");
  }

  function currentChatSignature() {
    const entries = hostWindowEntries();
    return entries.map((entry) => chatSignatureForHost(entry)).join("|");
  }

  function checkChatSignature() {
    const next = currentChatSignature();
    if (!next) return;
    if (state.lastChatSignature && next !== state.lastChatSignature) {
      state.chatSignatureChangeCount += 1;
      scheduleLifecycleScans("chat-signature-changed");
    }
    state.lastChatSignature = next;
  }

  function startChatSignaturePolling() {
    if (state.disposed || state.chatSignaturePollTimer) return;
    checkChatSignature();
    const tick = () => {
      state.chatSignaturePollTimer = 0;
      if (state.disposed) return;
      subscribeChatLifecycleEvents();
      checkChatSignature();
      state.chatSignaturePollTimer = scheduleTracked(tick, CHAT_SIGNATURE_POLL_MS);
    };
    state.chatSignaturePollTimer = scheduleTracked(tick, CHAT_SIGNATURE_POLL_MS);
  }

  function startChatLifecycleRescans() {
    subscribeChatLifecycleEvents();
    startChatSignaturePolling();
  }

  function scheduleRecoveryScans() {
    if (state.disposed) return;
    [0, 80, 240, 750, 1600, 3200].forEach((delay) => {
      scheduleTracked(() => {
        startObserver();
        scanNew({ includeExisting: true });
      }, delay);
    });
  }

  function queryContextHostCount() {
    let count = 0;
    hostDocuments().forEach((entry) => {
      try {
        entry.document.querySelectorAll(CONTEXT_HOST_SELECTOR).forEach((node) => {
          if (node.dataset && node.dataset.dlouContextModule === MODULE_KIND) count += 1;
        });
      } catch (_) {}
    });
    return count;
  }

  function disposeMountedApp(root) {
    if (!root) return;
    try {
      if (root.__douluoCoverV2 && typeof root.__douluoCoverV2.destroy === "function") {
        root.__douluoCoverV2.destroy();
      }
    } catch (_) {}
    if (MODULE_KIND === "character-create") {
      const host = ownerWindowOf(root);
      try {
        if (host.DouluoCharacterCreate && typeof host.DouluoCharacterCreate.destroy === "function") {
          host.DouluoCharacterCreate.destroy();
        }
      } catch (_) {}
    }
  }

  function restoreOwnedMounts() {
    hostDocuments().forEach((entry) => {
      const doc = entry.document;
      if (!doc || !doc.querySelectorAll) return;
      doc.querySelectorAll(`[data-dlou-helper-module="${MODULE_KIND}"]`).forEach((target) => {
        const contextHost = target.closest && target.closest(CONTEXT_HOST_SELECTOR);
        if (contextHost && contextHost.dataset && contextHost.dataset.dlouContextModule === MODULE_KIND) {
          const root = findMountedUiRoot(target);
          disposeMountedApp(root);
          contextHost.remove();
          return;
        }
        const root = findMountedUiRoot(target);
        disposeMountedApp(root);
        const original = target[originalStateKey];
        if (original && typeof original.html === "string") target.innerHTML = original.html;
        else if (root && root.parentNode) root.remove();
        clearMountState(target);
        try { delete target[originalStateKey]; } catch (_) {}
      });
      const style = doc.getElementById(STYLE_ID);
      if (style) style.remove();
    });
  }

  function destroy() {
    if (state.disposed) return true;
    state.disposed = true;
    document.removeEventListener("DOMContentLoaded", onDocumentReady);
    clearAllTrackedTimers();
    state.flushTimer = 0;
    state.chatSignaturePollTimer = 0;
    state.pending.clear();
    state.observers.splice(0).forEach((entry) => {
      try { entry.observer.disconnect(); } catch (_) {}
    });
    state.observed = false;
    state.observedDocuments = [];
    clearLifecycleSubscriptions();
    restoreOwnedMounts();
    try { if (window[API_NAME] === api) delete window[API_NAME]; } catch (_) {}
    return true;
  }

  function onDocumentReady() {
    if (state.disposed) return;
    startObserver();
    startChatLifecycleRescans();
    scheduleRecoveryScans();
  }

  function status() {
    const meta = lockedMeta();
    const contextHostCount = queryContextHostCount();
    return {
      script: SCRIPT_NAME,
      version: VERSION,
      module: MODULE_KIND,
      buildId: BUILD_ID,
      loadedAt,
      lockedMeta: meta,
      publicAssetSha: meta.expectedSha256 || meta.sha256 || "",
      publicAssetRef: meta.assetRef || meta.asset_ref || "",
      actualLoadUrl: meta.loadedUrl || meta.url || "",
      windowLocation: windowLocation(),
      documentReadyState: document.readyState,
      mounted: state.mounted,
      observed: state.observed,
      observerCount: state.observers.length,
      observedDocuments: state.observedDocuments.slice(),
      lastError: state.lastError,
      lastErrorStack: state.lastErrorStack,
      lastScanAt: state.lastScanAt,
      candidateCount: state.candidateCount,
      scannedDocuments: state.scannedDocuments.slice(),
      accessibleHostDocumentCount: state.accessibleHostDocumentCount,
      hostDomAccessError: state.hostDomAccessError,
      contextProbe: state.contextProbe,
      lastRawPreview: state.lastRawPreview,
      lastRawSource: state.lastRawSource,
      lastRawStrong: state.lastRawStrong,
      lastRawMessageId: state.lastRawMessageId,
      lastRawSwipeIndex: state.lastRawSwipeIndex,
      lastRawPageCount: state.lastRawPageCount,
      lastSkipReason: state.lastSkipReason,
      lastMatched: state.lastMatched,
      mountAttempts: state.mountAttempts,
      candidateSamples: state.candidateSamples.slice(),
      scanRuns: state.scanRuns,
      observerRetargetCount: state.observerRetargetCount,
      lifecycleSubscriptionCount: state.lifecycleSubscriptions.length,
      lifecycleEventCount: state.lifecycleEventCount,
      lastLifecycleEvent: state.lastLifecycleEvent,
      lastLifecycleAt: state.lastLifecycleAt,
      lastLifecycleScanReason: state.lastLifecycleScanReason,
      lastChatSignature: state.lastChatSignature,
      chatSignatureChangeCount: state.chatSignatureChangeCount,
      contextHostCount,
      contextHostMountCount: state.contextHostMountCount,
      contextHostCleanupCount: state.contextHostCleanupCount,
      lastContextHostMessageId: state.lastContextHostMessageId,
      lastContextHostSignature: state.lastContextHostSignature,
      lastContextHostRawHash: state.lastContextHostRawHash,
      lastMainTextStreamReason: state.lastMainTextStreamReason,
      lastMainTextStreamAt: state.lastMainTextStreamAt,
      mainTextStreamPreserveCount: state.mainTextStreamPreserveCount,
      scheduledTimerCount: state.scheduledTimers.size,
      disposed: state.disposed,
      upgradePendingBuildId: "",
      upgradeRequiresReload: false,
    };
  }

  const api = {
    version: VERSION,
    module: MODULE_KIND,
    buildId: BUILD_ID,
    detect,
    mount,
    scanNew,
    scanExisting() {
      return scanNew({ includeExisting: true });
    },
    destroy,
    status,
  };
  window[API_NAME] = api;
  notify("loaded");

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onDocumentReady, { once: true });
  } else {
    onDocumentReady();
  }
})();
