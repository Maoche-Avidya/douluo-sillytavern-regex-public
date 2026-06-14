// @name         [助手]斗罗大陆 I-IV · Soul Land 正文阅读 @0.6
// @module       tavern-helper/main-text
// @version      @0.6
// @source       tavern-helper-scripts/main-text/dist/latest.json
"use strict";

(function () {
  "use strict";

  const SCRIPT_NAME = "斗罗正文阅读助手脚本";
  const VERSION = "0.6.0";
  const MODULE_KIND = "main-text";
  const API_NAME = "DouLuoMainTextHelper";
  const MARK_TEXT = null;
  const STYLE_ID = "douluo-main-text-helper-style";
  const ROOT_SELECTOR = "[data-main-text-root]";
  const HTML = "\u003c!DOCTYPE html>\n\u003chtml lang=\"zh-CN\">\n\u003chead>\n\u003cmeta charset=\"UTF-8\" />\n\u003cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n\u003ctitle>斗罗正文阅读\u003c/title>\n\u003clink rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n\u003clink rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n\u003clink href=\"https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&display=swap\" rel=\"stylesheet\" />\n\u003cscript>\n  (() => {\n    const themes = new Set([\"starsea\", \"starsea-night\", \"paper\", \"paper-night\"]);\n    let saved = \"starsea\";\n    try {\n      saved = (window.localStorage && window.localStorage.getItem(\"dl-main-text-theme\")) || \"starsea\";\n    } catch (_) {\n      saved = \"starsea\";\n    }\n    const theme = themes.has(saved) ? saved : \"starsea\";\n    window.__dlMainTextTheme = theme;\n    document.documentElement.style.colorScheme = theme.includes(\"night\") || theme === \"starsea\" ? \"dark\" : \"light\";\n  })();\n\u003c/script>\n\u003cscript>\n  window.dmtEnsureMainTextBootstrap = window.dmtEnsureMainTextBootstrap || function(anchor) {\n    var root = anchor && anchor.closest && anchor.closest('[data-main-text-root]');\n    var code = null;\n    if (root) {\n      if (!root.dataset.dmtInstanceId) {\n        window.__dmtMainTextInstanceSeq = (window.__dmtMainTextInstanceSeq || 0) + 1;\n        root.dataset.dmtInstanceId = 'dmt-' + window.__dmtMainTextInstanceSeq;\n      }\n      var cursor = root;\n      while (!code && cursor && cursor.nextElementSibling) {\n        cursor = cursor.nextElementSibling;\n        if (cursor.matches && cursor.matches('[data-dmt-bootstrap-code]')) code = cursor;\n        if (cursor.matches && cursor.matches('[data-main-text-root]')) break;\n      }\n    }\n    if (!code && anchor && anchor.matches && anchor.matches('[data-dmt-bootstrap-code]')) code = anchor;\n    if (!code && anchor && anchor.previousElementSibling && anchor.previousElementSibling.matches && anchor.previousElementSibling.matches('[data-dmt-bootstrap-code]')) code = anchor.previousElementSibling;\n    if (!code) code = document.querySelector('[data-dmt-bootstrap-code]');\n    if (!code || code.dataset.dmtBootstrapped === '1') return;\n    code.dataset.dmtBootstrapped = '1';\n    var script = document.createElement('script');\n    if (root && root.dataset.dmtInstanceId) script.setAttribute('data-dmt-target-root', root.dataset.dmtInstanceId);\n    script.text = decodeURIComponent(escape(atob(code.value || code.textContent || '')));\n    document.body.appendChild(script);\n  };\n\u003c/script>\n\u003c!-- BUILD:CSS -->\n\u003c/head>\n\u003cbody class=\"dmt-preload\" data-theme=\"starsea\">\n\u003cscript>\n  document.body.setAttribute(\"data-theme\", window.__dlMainTextTheme || \"starsea\");\n\u003c/script>\n\n\u003cdiv class=\"dmt-root\" data-root data-main-text-root>\n  \u003cheader class=\"dmt-topbar\">\n    \u003cdiv class=\"dmt-brandmark\" aria-hidden=\"true\">\u003c/div>\n    \u003cdiv class=\"dmt-title\">\n      \u003ch1>斗罗纪行\u003c/h1>\n      \u003cspan>Soul Land Chronicle\u003c/span>\n    \u003c/div>\n    \u003cdiv class=\"dmt-topbar-actions\">\n      \u003cdiv class=\"dmt-theme-selector dmt-theme-selector--topbar\" aria-label=\"外观模式\">\n        \u003cbutton type=\"button\" data-theme-key=\"starsea\" onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtApplyTheme&&window.dmtApplyTheme(this,'starsea');\">星海\u003c/button>\n        \u003cbutton type=\"button\" data-theme-key=\"starsea-night\" onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtApplyTheme&&window.dmtApplyTheme(this,'starsea-night');\">星夜\u003c/button>\n        \u003cbutton type=\"button\" data-theme-key=\"paper\" onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtApplyTheme&&window.dmtApplyTheme(this,'paper');\">米黄\u003c/button>\n        \u003cbutton type=\"button\" data-theme-key=\"paper-night\" onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtApplyTheme&&window.dmtApplyTheme(this,'paper-night');\">墨纸\u003c/button>\n      \u003c/div>\n      \u003cbutton class=\"dmt-icon-btn\" type=\"button\" data-settings-toggle title=\"设置\" aria-label=\"设置\" onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);var r=this.closest('[data-main-text-root]');var p=r&&r.querySelector('[data-settings-panel]');if(p)p.classList.toggle('is-open');\">\n        \u003csvg viewBox=\"0 0 24 24\" aria-hidden=\"true\">\n          \u003cpath d=\"M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.73 8.87c-.11.21-.07.47.12.61l2.03 1.58c-.04.3-.07.63-.07.94s.02.64.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .43-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8a3.6 3.6 0 0 1 0 7.2Z\"/>\n        \u003c/svg>\n      \u003c/button>\n    \u003c/div>\n  \u003c/header>\n\n  \u003caside class=\"dmt-settings\" data-settings-panel aria-label=\"正文设置\">\n    \u003csection class=\"dmt-setting-row\">\n      \u003clabel class=\"dmt-setting-label\" for=\"dmt-font-select\">正文字体\u003c/label>\n      \u003cselect id=\"dmt-font-select\" data-font-select onchange=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtApplyFont&&window.dmtApplyFont(this,this.value);\">\n        \u003coption value=\"theme\">跟随主题\u003c/option>\n        \u003coption value=\"serif\">思源宋体\u003c/option>\n        \u003coption value=\"sans\">思源黑体\u003c/option>\n        \u003coption value=\"yahei\">微软雅黑\u003c/option>\n        \u003coption value=\"songti\">宋体\u003c/option>\n        \u003coption value=\"kaiti\">楷体\u003c/option>\n        \u003coption value=\"fangsong\">仿宋\u003c/option>\n      \u003c/select>\n    \u003c/section>\n\n    \u003csection class=\"dmt-setting-row\">\n      \u003cdiv class=\"dmt-setting-label\">正文字号\u003c/div>\n      \u003cdiv class=\"dmt-stepper\">\n        \u003cbutton type=\"button\" data-font-dec onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtAdjustFontSize&&window.dmtAdjustFontSize(this,-1);\">-\u003c/button>\n        \u003coutput data-font-size>18\u003c/output>\n        \u003cbutton type=\"button\" data-font-inc onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtAdjustFontSize&&window.dmtAdjustFontSize(this,1);\">+\u003c/button>\n      \u003c/div>\n    \u003c/section>\n\n    \u003csection class=\"dmt-setting-row\">\n      \u003cdiv class=\"dmt-setting-label\">对白字号\u003c/div>\n      \u003cdiv class=\"dmt-stepper\">\n        \u003cbutton type=\"button\" data-dialogue-dec onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtAdjustDialogueSize&&window.dmtAdjustDialogueSize(this,-1);\">-\u003c/button>\n        \u003coutput data-dialogue-size>16\u003c/output>\n        \u003cbutton type=\"button\" data-dialogue-inc onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtAdjustDialogueSize&&window.dmtAdjustDialogueSize(this,1);\">+\u003c/button>\n      \u003c/div>\n    \u003c/section>\n\n    \u003csection class=\"dmt-user-panel\">\n      \u003cdiv class=\"dmt-setting-label\">玩家头像\u003c/div>\n      \u003cdiv class=\"dmt-user-avatar-row\">\n        \u003cspan class=\"dmt-user-avatar-preview\" data-user-avatar-preview>玩\u003c/span>\n        \u003cbutton type=\"button\" data-user-avatar-upload onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtUploadUserAvatar&&window.dmtUploadUserAvatar(this);\">上传玩家头像\u003c/button>\n        \u003cbutton type=\"button\" data-user-avatar-clear onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtClearUserAvatar&&window.dmtClearUserAvatar(this);\">使用角色创建头像\u003c/button>\n        \u003cinput type=\"file\" data-user-avatar-file accept=\"image/*\" hidden />\n      \u003c/div>\n    \u003c/section>\n\n    \u003csection class=\"dmt-character-panel\">\n      \u003cdiv class=\"dmt-setting-label\">自定义角色\u003c/div>\n      \u003cdiv class=\"dmt-character-list\" data-character-list>\u003c/div>\n      \u003cdiv class=\"dmt-character-form\">\n        \u003cinput type=\"text\" data-character-name placeholder=\"角色名称\" maxlength=\"32\" />\n        \u003cinput type=\"color\" data-character-color value=\"#e8c36c\" title=\"角色颜色\" />\n        \u003cbutton type=\"button\" data-character-upload onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtUploadCharacterAvatar&&window.dmtUploadCharacterAvatar(this);\">上传角色头像\u003c/button>\n        \u003cinput type=\"file\" data-character-file accept=\"image/*\" hidden />\n        \u003cimg data-character-preview alt=\"角色头像预览\" />\n        \u003cbutton type=\"button\" data-character-save onclick=\"window.dmtEnsureMainTextBootstrap&&window.dmtEnsureMainTextBootstrap(this);window.dmtSaveCustomCharacter&&window.dmtSaveCustomCharacter(this);\">保存角色\u003c/button>\n      \u003c/div>\n    \u003c/section>\n  \u003c/aside>\n\n  \u003cmain class=\"dmt-reader\">\n    \u003carticle class=\"dmt-content\" id=\"readingContent\" data-content>\n\u003ctemplate data-raw-content>\n$1\n\u003c/template>\n    \u003c/article>\n  \u003c/main>\n\n  \u003cdiv class=\"dmt-modal\" data-image-modal hidden>\n    \u003cbutton type=\"button\" class=\"dmt-modal-close\" data-modal-close aria-label=\"关闭预览\">x\u003c/button>\n    \u003cimg data-modal-image alt=\"放大预览\" />\n  \u003c/div>\n  \u003cdiv class=\"dmt-toast\" data-toast role=\"status\" aria-live=\"polite\">\u003c/div>\n\u003c/div>\n\n\u003c!-- BUILD:JS -->\n\u003c/body>\n\u003c/html>\n";
  const CSS = ".dmt-root, .dmt-root * {\n  box-sizing: border-box;\n}\n\n.dmt-root {\n  --dmt-radius: 8px;\n  --dmt-font-theme: \"FangSong\", \"STFangsong\", \"Noto Serif SC\", \"Source Han Serif SC\", \"Microsoft YaHei\", serif;\n  --dmt-font-body: var(--dmt-font-theme);\n  --dmt-font-size: 18px;\n  --dmt-dialogue-size: 16px;\n}\n\n.dmt-root {\n  color: var(--dmt-text);\n  font-family: var(--dmt-font-body);\n  letter-spacing: 0;\n  line-height: 2;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n}\n\n.dmt-root[data-theme=\"starsea\"] {\n  --dmt-bg: #030712;\n  --dmt-bg2: #07101f;\n  --dmt-panel: rgba(7, 18, 40, .86);\n  --dmt-panel-solid: #081630;\n  --dmt-text: #edf6ff;\n  --dmt-muted: #9cadc6;\n  --dmt-dim: #65728b;\n  --dmt-line: rgba(124, 205, 255, .22);\n  --dmt-line-strong: rgba(232, 195, 108, .36);\n  --dmt-accent: #e8c36c;\n  --dmt-accent2: #5ee7ff;\n  --dmt-bubble: rgba(8, 22, 48, .88);\n  --dmt-user-bubble: rgba(36, 31, 58, .90);\n  --dmt-control: rgba(94, 231, 255, .08);\n  --dmt-shadow: rgba(0, 0, 0, .55);\n  --dmt-font-theme: \"FangSong\", \"STFangsong\", \"Noto Serif SC\", serif;\n}\n\n.dmt-root[data-theme=\"starsea-night\"] {\n  --dmt-bg: #01030a;\n  --dmt-bg2: #050b17;\n  --dmt-panel: rgba(4, 11, 27, .92);\n  --dmt-panel-solid: #050d1e;\n  --dmt-text: #e4eefb;\n  --dmt-muted: #91a2bb;\n  --dmt-dim: #59687f;\n  --dmt-line: rgba(94, 231, 255, .18);\n  --dmt-line-strong: rgba(216, 182, 100, .32);\n  --dmt-accent: #d8b664;\n  --dmt-accent2: #65dfff;\n  --dmt-bubble: rgba(6, 15, 35, .92);\n  --dmt-user-bubble: rgba(29, 29, 54, .94);\n  --dmt-control: rgba(94, 231, 255, .06);\n  --dmt-shadow: rgba(0, 0, 0, .72);\n  --dmt-font-theme: \"FangSong\", \"STFangsong\", \"Noto Serif SC\", serif;\n}\n\n.dmt-root[data-theme=\"paper\"] {\n  --dmt-bg: #f4ead4;\n  --dmt-bg2: #fff9ec;\n  --dmt-panel: rgba(255, 250, 239, .96);\n  --dmt-panel-solid: #fffaf0;\n  --dmt-text: #31261a;\n  --dmt-muted: #826f55;\n  --dmt-dim: #a59277;\n  --dmt-line: rgba(135, 98, 58, .22);\n  --dmt-line-strong: rgba(166, 94, 55, .36);\n  --dmt-accent: #a84b3e;\n  --dmt-accent2: #2f7f8c;\n  --dmt-bubble: rgba(255, 252, 246, .98);\n  --dmt-user-bubble: rgba(238, 224, 197, .98);\n  --dmt-control: rgba(80, 55, 28, .08);\n  --dmt-shadow: rgba(83, 55, 24, .16);\n  --dmt-font-theme: \"Noto Serif SC\", \"Songti SC\", SimSun, serif;\n}\n\n.dmt-root[data-theme=\"paper-night\"] {\n  --dmt-bg: #131018;\n  --dmt-bg2: #1e1925;\n  --dmt-panel: rgba(30, 25, 36, .96);\n  --dmt-panel-solid: #1e1925;\n  --dmt-text: #e3d5c5;\n  --dmt-muted: #a89a8a;\n  --dmt-dim: #796f80;\n  --dmt-line: rgba(194, 168, 120, .20);\n  --dmt-line-strong: rgba(194, 168, 120, .38);\n  --dmt-accent: #c2a878;\n  --dmt-accent2: #8bb8c7;\n  --dmt-bubble: rgba(35, 30, 43, .98);\n  --dmt-user-bubble: rgba(57, 48, 70, .96);\n  --dmt-control: rgba(255, 255, 255, .06);\n  --dmt-shadow: rgba(0, 0, 0, .48);\n  --dmt-font-theme: \"Noto Serif SC\", \"Songti SC\", SimSun, serif;\n}\n\n.dmt-root[data-font=\"theme\"] {\n  --dmt-font-body: var(--dmt-font-theme);\n}\n\n.dmt-root[data-font=\"serif\"] {\n  --dmt-font-body: \"Noto Serif SC\", \"Source Han Serif SC\", serif;\n}\n\n.dmt-root[data-font=\"sans\"] {\n  --dmt-font-body: \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dmt-root[data-font=\"yahei\"] {\n  --dmt-font-body: \"Microsoft YaHei\", \"Noto Sans SC\", sans-serif;\n}\n\n.dmt-root[data-font=\"songti\"] {\n  --dmt-font-body: SimSun, \"Songti SC\", serif;\n}\n\n.dmt-root[data-font=\"kaiti\"] {\n  --dmt-font-body: KaiTi, \"Kaiti SC\", serif;\n}\n\n.dmt-root[data-font=\"fangsong\"] {\n  --dmt-font-body: FangSong, \"STFangsong\", serif;\n}\n\n.dmt-root {\n  width: min(100%, 980px);\n  min-height: 0;\n  margin: 18px auto;\n  position: relative;\n  overflow: hidden;\n  color: var(--dmt-text);\n  background:\n    linear-gradient(120deg, transparent 0 8%, rgba(94, 231, 255, .05) 12%, transparent 19% 100%),\n    radial-gradient(circle at 18% 10%, rgba(94, 231, 255, .12), transparent 32%),\n    radial-gradient(circle at 84% 16%, rgba(232, 195, 108, .11), transparent 30%),\n    linear-gradient(145deg, var(--dmt-bg), var(--dmt-bg2));\n  border: 1px solid var(--dmt-line-strong);\n  border-radius: 8px;\n  box-shadow: 0 22px 70px var(--dmt-shadow);\n}\n\n.dmt-root::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background-image: radial-gradient(circle, rgba(255, 255, 255, .28) 0 1px, transparent 1.4px);\n  background-size: 82px 82px;\n  opacity: .18;\n  pointer-events: none;\n  animation: dmtStarDrift 34s linear infinite;\n}\n\n.dmt-root[data-theme=\"paper\"]::before,\n.dmt-root[data-theme=\"paper-night\"]::before {\n  opacity: .05;\n}\n\n@keyframes dmtStarDrift {\n  from {\n    background-position: 0 0;\n  }\n\n  to {\n    background-position: 160px 80px;\n  }\n}\n\n.dmt-topbar {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  min-height: 72px;\n  display: grid;\n  grid-template-columns: 46px minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 14px;\n  padding: 0 24px;\n  background: color-mix(in srgb, var(--dmt-panel-solid) 88%, transparent);\n  border-bottom: 1px solid var(--dmt-line);\n  backdrop-filter: blur(14px);\n  -webkit-backdrop-filter: blur(14px);\n}\n\n.dmt-brandmark {\n  position: relative;\n  z-index: 2;\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  border: 1px solid var(--dmt-line-strong);\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .04), 0 0 18px color-mix(in srgb, var(--dmt-accent) 24%, transparent);\n  background:\n    radial-gradient(circle, var(--dmt-accent) 0 2px, transparent 3px),\n    conic-gradient(from 0deg, transparent 0 32deg, var(--dmt-accent2) 34deg 39deg, transparent 42deg 126deg, var(--dmt-accent) 128deg 134deg, transparent 136deg 360deg);\n}\n\n.dmt-title {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: max-content;\n  max-width: min(34vw, 260px);\n  min-width: 0;\n  display: grid;\n  justify-items: center;\n  gap: 3px;\n  text-align: center;\n  pointer-events: none;\n  transform: translate(-50%, -50%);\n}\n\n.dmt-title h1 {\n  margin: 0;\n  max-width: 100%;\n  overflow: hidden;\n  color: var(--dmt-text);\n  font-size: 22px;\n  font-weight: 600;\n  line-height: 1.18;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dmt-title span {\n  max-width: 100%;\n  overflow: hidden;\n  color: var(--dmt-accent);\n  font: 700 11px/1.2 \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n  text-overflow: ellipsis;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\n\n.dmt-topbar-actions {\n  position: relative;\n  z-index: 2;\n  justify-self: end;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n\n.dmt-icon-btn {\n  width: 40px;\n  height: 40px;\n  display: grid;\n  place-items: center;\n  color: var(--dmt-muted);\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 50%;\n  cursor: pointer;\n  transition: color .18s ease, transform .18s ease, background .18s ease, border-color .18s ease;\n}\n\n.dmt-icon-btn:hover {\n  color: var(--dmt-text);\n  background: var(--dmt-control);\n  border-color: var(--dmt-line);\n  transform: rotate(28deg);\n}\n\n.dmt-icon-btn svg {\n  width: 23px;\n  height: 23px;\n  fill: currentColor;\n}\n\n.dmt-reader {\n  width: min(100%, 830px);\n  margin: 0 auto;\n  padding: 28px 20px 24px;\n  position: relative;\n  z-index: 1;\n}\n\n.dmt-content {\n  min-height: 0;\n  padding: 0 10px;\n  color: var(--dmt-text);\n  font-size: var(--dmt-font-size);\n}\n\n.dmt-content p {\n  margin: 0 0 1.45em;\n  text-indent: 2em;\n  line-height: 2.2;\n  white-space: pre-wrap;\n}\n\n.dmt-narration {\n  color: var(--dmt-text);\n}\n\n.dmt-quote {\n  color: var(--dmt-accent);\n  font-weight: 600;\n}\n\n.dmt-dialogue {\n  margin: 30px 0;\n  display: flex;\n  width: 100%;\n}\n\n.dmt-dialogue-bubble {\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  gap: 20px;\n}\n\n.dmt-dialogue.is-user .dmt-dialogue-bubble {\n  flex-direction: row-reverse;\n}\n\n.dmt-avatar {\n  flex: 0 0 90px;\n  width: 90px;\n  height: 90px;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  color: #fff;\n  border: 1px solid color-mix(in srgb, var(--char-color, var(--dmt-accent)) 34%, var(--dmt-line));\n  border-radius: 12px;\n  background:\n    linear-gradient(135deg, color-mix(in srgb, var(--char-color, var(--dmt-accent)) 62%, #fff), color-mix(in srgb, var(--char-color, var(--dmt-accent)) 68%, #111));\n  box-shadow: 0 3px 10px var(--dmt-shadow);\n  user-select: none;\n}\n\n.dmt-avatar img {\n  width: 100%;\n  height: 100%;\n  display: none;\n  object-fit: cover;\n  cursor: zoom-in;\n}\n\n.dmt-avatar.has-image img {\n  display: block;\n}\n\n.dmt-avatar.has-image .dmt-avatar-fallback {\n  display: none;\n}\n\n.dmt-avatar-fallback {\n  font: 800 30px/1 \"Noto Serif SC\", serif;\n  text-shadow: 0 2px 9px rgba(0, 0, 0, .36);\n}\n\n.dmt-dialogue-main {\n  flex: 1;\n  min-width: 0;\n  display: grid;\n  align-self: stretch;\n}\n\n.dmt-bubble {\n  position: relative;\n  width: 100%;\n  min-height: 90px;\n  padding: 0;\n  color: var(--dmt-text);\n  background: transparent;\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n}\n\n.dmt-dialogue.is-user .dmt-bubble {\n  background: transparent;\n  border: 0;\n  box-shadow: none;\n}\n\n.dmt-name {\n  margin: 0 0 9px;\n  padding: 0;\n  color: color-mix(in srgb, var(--char-color, var(--dmt-accent)) 72%, var(--dmt-text));\n  border: 0;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1.25;\n  letter-spacing: .05em;\n}\n\n.dmt-dialogue.is-user .dmt-name {\n  text-align: right;\n}\n\n.dmt-dialogue-text {\n  min-height: 40px;\n  padding-left: 18px;\n  border-left: 2px solid color-mix(in srgb, var(--char-color, var(--dmt-accent)) 38%, var(--dmt-line-strong));\n  font-size: var(--dmt-dialogue-size);\n  line-height: 2.05;\n}\n\n.dmt-dialogue.is-user .dmt-dialogue-text {\n  padding-left: 0;\n  padding-right: 18px;\n  border-left: 0;\n  border-right: 2px solid color-mix(in srgb, var(--char-color, var(--dmt-accent)) 38%, var(--dmt-line-strong));\n}\n\n.dmt-dialogue-text p {\n  margin: 0 0 .82em;\n  text-indent: 0;\n  line-height: 2.05;\n}\n\n.dmt-dialogue-text p:last-child {\n  margin-bottom: 0;\n}\n\n.dmt-bilingual {\n  display: grid;\n  gap: 6px;\n}\n\n.dmt-bilingual__secondary {\n  color: var(--dmt-muted);\n  font-size: .92em;\n}\n\n.dmt-image-card {\n  width: min(100%, 620px);\n  margin: 24px auto;\n  padding: 8px;\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n  background: var(--dmt-panel);\n  box-shadow: 0 14px 34px var(--dmt-shadow);\n}\n\n.dmt-image-card img {\n  width: 100%;\n  height: auto;\n  display: block;\n  border-radius: 6px;\n  cursor: zoom-in;\n}\n\n.dmt-optional {\n  --optional-accent: var(--dmt-accent2);\n  --optional-accent-2: var(--dmt-accent);\n  position: relative;\n  width: min(100%, 720px);\n  margin: 22px auto 26px;\n  padding: 14px;\n  overflow: hidden;\n  color: var(--dmt-text);\n  border: 1px solid color-mix(in srgb, var(--optional-accent) 44%, var(--dmt-line));\n  border-radius: 8px;\n  background:\n    linear-gradient(var(--optional-accent), var(--optional-accent)) left top / 34px 1px no-repeat,\n    linear-gradient(var(--optional-accent), var(--optional-accent)) left top / 1px 34px no-repeat,\n    linear-gradient(var(--optional-accent-2), var(--optional-accent-2)) right top / 34px 1px no-repeat,\n    linear-gradient(var(--optional-accent-2), var(--optional-accent-2)) right top / 1px 34px no-repeat,\n    linear-gradient(var(--optional-accent), var(--optional-accent)) left bottom / 34px 1px no-repeat,\n    linear-gradient(var(--optional-accent), var(--optional-accent)) left bottom / 1px 34px no-repeat,\n    linear-gradient(var(--optional-accent-2), var(--optional-accent-2)) right bottom / 34px 1px no-repeat,\n    linear-gradient(var(--optional-accent-2), var(--optional-accent-2)) right bottom / 1px 34px no-repeat,\n    linear-gradient(90deg, color-mix(in srgb, var(--optional-accent) 10%, transparent), transparent 44%),\n    linear-gradient(180deg, rgba(255, 255, 255, .055), transparent 38%),\n    linear-gradient(145deg, color-mix(in srgb, var(--dmt-panel) 36%, transparent), color-mix(in srgb, var(--dmt-panel-solid) 18%, transparent));\n  box-shadow:\n    inset 0 1px 0 rgba(255, 255, 255, .10),\n    inset 0 -1px 0 rgba(255, 255, 255, .04),\n    inset 0 0 24px color-mix(in srgb, var(--optional-accent) 7%, transparent),\n    0 0 22px color-mix(in srgb, var(--optional-accent) 10%, transparent),\n    0 14px 34px color-mix(in srgb, var(--dmt-shadow) 52%, transparent);\n  backdrop-filter: blur(16px) saturate(132%);\n  -webkit-backdrop-filter: blur(16px) saturate(132%);\n}\n\n.dmt-optional::before {\n  content: \"\";\n  position: absolute;\n  inset: 0 0 auto;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, var(--optional-accent), var(--optional-accent-2), transparent);\n  opacity: .86;\n  pointer-events: none;\n}\n\n.dmt-optional::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(color-mix(in srgb, var(--optional-accent) 18%, transparent) 1px, transparent 1px),\n    linear-gradient(90deg, color-mix(in srgb, var(--optional-accent-2) 13%, transparent) 1px, transparent 1px);\n  background-size: 30px 30px;\n  opacity: .16;\n  pointer-events: none;\n}\n\n.dmt-optional--enemy {\n  --optional-accent: #ff647c;\n  --optional-accent-2: #e8c36c;\n}\n\n.dmt-optional--battle {\n  --optional-accent: #f59e0b;\n  --optional-accent-2: #ff647c;\n}\n\n.dmt-optional--daily {\n  --optional-accent: #5ee7ff;\n  --optional-accent-2: #8bb8c7;\n}\n\n.dmt-optional--growth {\n  --optional-accent: #e8c36c;\n  --optional-accent-2: #5ee7ff;\n}\n\n.dmt-optional--status {\n  --optional-accent: #6ee7b7;\n  --optional-accent-2: #8bb8c7;\n}\n\n.dmt-optional-head,\n.dmt-optional-ring,\n.dmt-optional-equipment,\n.dmt-optional-resources,\n.dmt-optional-fields {\n  position: relative;\n  z-index: 1;\n}\n\n.dmt-optional-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  padding-bottom: 11px;\n  border-bottom: 1px solid color-mix(in srgb, var(--optional-accent) 36%, transparent);\n}\n\n.dmt-optional-title {\n  min-width: 0;\n  display: grid;\n  gap: 2px;\n  line-height: 1.25;\n}\n\n.dmt-optional-title span {\n  color: color-mix(in srgb, var(--dmt-muted) 72%, transparent);\n  font: 700 10px/1.2 \"Segoe UI\", \"Microsoft YaHei\", sans-serif;\n  letter-spacing: 0;\n  text-transform: none;\n}\n\n.dmt-optional-title strong {\n  color: var(--dmt-text);\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.dmt-optional-tags {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 6px;\n  min-width: 0;\n}\n\n.dmt-optional-tags span {\n  max-width: 160px;\n  min-height: 22px;\n  display: inline-flex;\n  align-items: center;\n  padding: 1px 8px;\n  overflow-wrap: anywhere;\n  color: color-mix(in srgb, var(--optional-accent) 42%, var(--dmt-muted));\n  border: 1px solid color-mix(in srgb, var(--optional-accent) 24%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--optional-accent) 6%, transparent);\n  box-shadow: inset 0 0 10px color-mix(in srgb, var(--optional-accent) 4%, transparent);\n  font: 600 11px/1.35 \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dmt-optional-ring,\n.dmt-optional-equipment {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-top: 12px;\n  padding: 10px 0 2px;\n}\n\n.dmt-soul-ring {\n  flex: 0 0 54px;\n  width: 54px;\n  height: 54px;\n  border-radius: 50%;\n  border: 1px solid color-mix(in srgb, var(--ring-color-2) 64%, rgba(255, 255, 255, .45));\n  background:\n    radial-gradient(circle, transparent 0 46%, color-mix(in srgb, var(--ring-color) 48%, transparent) 49% 58%, transparent 62%),\n    conic-gradient(from 18deg, var(--ring-color), var(--ring-color-2), var(--ring-color), var(--ring-color-2), var(--ring-color));\n  box-shadow:\n    0 0 20px color-mix(in srgb, var(--ring-color) 48%, transparent),\n    inset 0 0 12px rgba(255, 255, 255, .16);\n}\n\n.dmt-soul-ring.is-spectrum {\n  background:\n    radial-gradient(circle, transparent 0 46%, rgba(255, 255, 255, .3) 49% 58%, transparent 62%),\n    conic-gradient(from 0deg, #ef4444, #f59e0b, #facc15, #22c55e, #22d3ee, #3b82f6, #a855f7, #ef4444);\n}\n\n.dmt-soul-ring.is-fallback {\n  border-style: dashed;\n}\n\n.dmt-optional-ring__text,\n.dmt-optional-equipment div {\n  min-width: 0;\n  display: grid;\n  gap: 2px;\n  line-height: 1.45;\n}\n\n.dmt-optional-ring__text strong,\n.dmt-optional-equipment strong {\n  color: var(--dmt-text);\n  font-size: 15px;\n  font-weight: 700;\n}\n\n.dmt-optional-ring__text span,\n.dmt-optional-ring__text em,\n.dmt-optional-equipment span {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  color: var(--dmt-muted);\n  font-style: normal;\n  font-size: 13px;\n}\n\n.dmt-optional-equipment__mark {\n  flex: 0 0 42px;\n  width: 42px;\n  height: 42px;\n  display: block;\n  border: 1px solid color-mix(in srgb, var(--optional-accent) 56%, var(--dmt-line));\n  background:\n    linear-gradient(135deg, color-mix(in srgb, var(--optional-accent) 76%, white), color-mix(in srgb, var(--optional-accent-2) 68%, black));\n  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);\n  box-shadow: 0 0 18px color-mix(in srgb, var(--optional-accent) 34%, transparent);\n}\n\n.dmt-optional-resources {\n  display: grid;\n  gap: 8px;\n  margin-top: 13px;\n}\n\n.dmt-optional-resource {\n  display: grid;\n  grid-template-columns: minmax(48px, auto) minmax(0, 1fr) auto;\n  gap: 9px;\n  align-items: center;\n  min-width: 0;\n  color: var(--dmt-muted);\n  font: 700 12px/1.3 \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dmt-optional-resource__name,\n.dmt-optional-resource__value {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.dmt-optional-resource__track {\n  height: 7px;\n  overflow: hidden;\n  border: 1px solid color-mix(in srgb, var(--optional-accent) 35%, transparent);\n  border-radius: 999px;\n  background: color-mix(in srgb, var(--dmt-panel-solid) 30%, transparent);\n}\n\n.dmt-optional-resource__track span {\n  width: var(--value-pct, 0%);\n  height: 100%;\n  display: block;\n  border-radius: inherit;\n  background: linear-gradient(90deg, var(--optional-accent), var(--optional-accent-2));\n  box-shadow: 0 0 12px color-mix(in srgb, var(--optional-accent) 48%, transparent);\n}\n\n.dmt-optional-fields {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 0 14px;\n  margin-top: 12px;\n}\n\n.dmt-optional-field {\n  min-width: 0;\n  display: grid;\n  grid-template-columns: minmax(58px, .38fr) minmax(0, 1fr);\n  gap: 9px;\n  align-items: start;\n  padding: 8px 0;\n  border-top: 1px solid color-mix(in srgb, var(--optional-accent) 17%, transparent);\n  line-height: 1.55;\n}\n\n.dmt-optional-field.is-free {\n  grid-column: 1 / -1;\n  grid-template-columns: 1fr;\n}\n\n.dmt-optional-label {\n  color: color-mix(in srgb, var(--optional-accent) 72%, var(--dmt-muted));\n  font: 700 12px/1.5 \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif;\n}\n\n.dmt-optional-value,\n.dmt-optional-field.is-free span {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  color: var(--dmt-text);\n  font-size: 14px;\n}\n\n.dmt-optional-highlight .dmt-optional-value {\n  color: color-mix(in srgb, var(--optional-accent) 74%, var(--dmt-text));\n  font-weight: 700;\n}\n\n.dmt-settings {\n  position: absolute;\n  top: 82px;\n  right: 20px;\n  z-index: 160;\n  width: min(92vw, 390px);\n  max-height: min(74vh, 680px);\n  overflow: auto;\n  display: none;\n  gap: 12px;\n  padding: 18px;\n  color: var(--dmt-text);\n  background: var(--dmt-panel);\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n  box-shadow: 0 16px 40px var(--dmt-shadow);\n  backdrop-filter: blur(18px);\n  -webkit-backdrop-filter: blur(18px);\n}\n\n.dmt-settings.is-open {\n  display: grid;\n}\n\n.dmt-setting-block,\n.dmt-user-panel,\n.dmt-character-panel {\n  display: grid;\n  gap: 10px;\n  padding: 0 0 12px;\n  border-bottom: 1px solid var(--dmt-line);\n}\n\n.dmt-setting-row {\n  display: grid;\n  grid-template-columns: minmax(96px, 1fr) auto;\n  gap: 12px;\n  align-items: center;\n  padding: 0 0 12px;\n  border-bottom: 1px solid var(--dmt-line);\n}\n\n.dmt-setting-label {\n  color: var(--dmt-text);\n  font-size: 14px;\n  font-weight: 700;\n}\n\n.dmt-theme-selector {\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  gap: 5px;\n  padding: 4px;\n  border-radius: 8px;\n  background: var(--dmt-control);\n}\n\n.dmt-theme-selector--topbar {\n  width: min(34vw, 244px);\n  grid-template-columns: repeat(4, minmax(42px, 1fr));\n  gap: 3px;\n  padding: 3px;\n  opacity: .84;\n  border: 1px solid color-mix(in srgb, var(--dmt-accent2) 11%, transparent);\n  background: color-mix(in srgb, var(--dmt-control) 42%, transparent);\n  box-shadow: inset 0 0 12px rgba(255, 255, 255, .018);\n}\n\n.dmt-theme-selector button,\n.dmt-stepper button,\n.dmt-character-form button,\n.dmt-user-avatar-row button,\n.dmt-character-chip button {\n  min-height: 32px;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  color: var(--dmt-muted);\n  background: transparent;\n  cursor: pointer;\n  font: 700 13px/1 \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif;\n  transition: color .18s ease, background .18s ease, border-color .18s ease;\n}\n\n.dmt-theme-selector--topbar button {\n  min-height: 28px;\n  padding: 0 6px;\n  color: color-mix(in srgb, var(--dmt-muted) 78%, transparent);\n  font-size: 11px;\n}\n\n.dmt-theme-selector.dmt-theme-selector--topbar button.active,\n.dmt-theme-selector.dmt-theme-selector--topbar button:hover {\n  color: color-mix(in srgb, var(--dmt-text) 76%, var(--dmt-muted));\n  background: color-mix(in srgb, var(--dmt-accent2) 10%, transparent);\n  border-color: color-mix(in srgb, var(--dmt-accent2) 22%, transparent);\n}\n\n.dmt-theme-selector button.active,\n.dmt-theme-selector button:hover,\n.dmt-stepper button:hover,\n.dmt-character-form button:hover,\n.dmt-user-avatar-row button:hover,\n.dmt-character-chip button:hover {\n  color: var(--dmt-text);\n  background: var(--dmt-control);\n  border-color: var(--dmt-line);\n}\n\n.dmt-setting-row select,\n.dmt-character-form input[type=\"text\"] {\n  width: 100%;\n  min-height: 34px;\n  padding: 0 10px;\n  color: var(--dmt-text);\n  background: var(--dmt-panel-solid);\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n  font: inherit;\n  outline: none;\n}\n\n.dmt-setting-row select {\n  color-scheme: dark;\n  cursor: pointer;\n}\n\n.dmt-root[data-theme=\"paper\"] .dmt-setting-row select {\n  color-scheme: light;\n}\n\n.dmt-setting-row select option {\n  color: var(--dmt-text);\n  background-color: var(--dmt-panel-solid);\n}\n\n.dmt-setting-row select option:checked {\n  color: var(--dmt-bg);\n  background-color: var(--dmt-accent);\n}\n\n.dmt-stepper {\n  display: grid;\n  grid-template-columns: 34px 48px 34px;\n  gap: 6px;\n  align-items: center;\n}\n\n.dmt-stepper output {\n  min-height: 32px;\n  display: grid;\n  place-items: center;\n  color: var(--dmt-accent);\n  border-radius: 8px;\n  background: var(--dmt-control);\n  font: 700 13px/1 \"Noto Sans SC\", sans-serif;\n}\n\n.dmt-user-avatar-row {\n  display: grid;\n  grid-template-columns: 52px 1fr 1fr;\n  gap: 8px;\n  align-items: center;\n}\n\n.dmt-user-avatar-preview {\n  width: 52px;\n  height: 52px;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  color: #fff;\n  border: 1px solid var(--dmt-line-strong);\n  border-radius: 8px;\n  background: linear-gradient(135deg, var(--dmt-accent2), var(--dmt-accent));\n  font-weight: 800;\n}\n\n.dmt-user-avatar-preview img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.dmt-character-list {\n  display: grid;\n  gap: 8px;\n  max-height: 150px;\n  overflow: auto;\n}\n\n.dmt-character-empty {\n  padding: 10px;\n  color: var(--dmt-muted);\n  border: 1px dashed var(--dmt-line);\n  border-radius: 8px;\n  font-size: 12px;\n}\n\n.dmt-character-chip {\n  display: grid;\n  grid-template-columns: 34px minmax(0, 1fr) auto;\n  gap: 9px;\n  align-items: center;\n  padding: 8px;\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n  background: var(--dmt-control);\n}\n\n.dmt-character-chip-avatar {\n  width: 34px;\n  height: 34px;\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n  color: #fff;\n  border-radius: 8px;\n  background: var(--char-color, var(--dmt-accent));\n  font-weight: 800;\n}\n\n.dmt-character-chip-avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.dmt-character-chip-name {\n  min-width: 0;\n  overflow: hidden;\n  color: var(--dmt-text);\n  font-size: 13px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.dmt-character-form {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) 44px;\n  gap: 8px;\n  padding-top: 8px;\n  border-top: 1px solid var(--dmt-line);\n}\n\n.dmt-character-form input[type=\"color\"] {\n  width: 44px;\n  height: 34px;\n  padding: 2px;\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n  background: var(--dmt-control);\n}\n\n.dmt-character-form button,\n.dmt-character-form img {\n  grid-column: 1 / -1;\n}\n\n.dmt-character-form img {\n  display: none;\n  width: 76px;\n  height: 76px;\n  object-fit: cover;\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n}\n\n.dmt-character-form img.has-preview {\n  display: block;\n}\n\n.dmt-modal {\n  position: fixed;\n  inset: 0;\n  z-index: 300;\n  display: grid;\n  place-items: center;\n  padding: 28px;\n  background: rgba(0, 0, 0, .88);\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n}\n\n.dmt-modal[hidden] {\n  display: none;\n}\n\n.dmt-modal img {\n  max-width: 92vw;\n  max-height: 90vh;\n  border-radius: 8px;\n  box-shadow: 0 4px 42px rgba(0, 0, 0, .82);\n}\n\n.dmt-modal-close {\n  position: fixed;\n  top: 20px;\n  right: 30px;\n  width: 42px;\n  height: 42px;\n  color: rgba(255, 255, 255, .75);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  font: 400 34px/1 Arial, sans-serif;\n}\n\n.dmt-modal-close:hover {\n  color: #fff;\n}\n\n.dmt-toast {\n  position: fixed;\n  left: 50%;\n  bottom: 24px;\n  z-index: 320;\n  max-width: min(90vw, 420px);\n  padding: 10px 14px;\n  color: var(--dmt-text);\n  background: var(--dmt-panel);\n  border: 1px solid var(--dmt-line);\n  border-radius: 8px;\n  box-shadow: 0 12px 32px var(--dmt-shadow);\n  opacity: 0;\n  pointer-events: none;\n  transform: translate(-50%, 12px);\n  transition: opacity .18s ease, transform .18s ease;\n}\n\n.dmt-toast.is-visible {\n  opacity: 1;\n  transform: translate(-50%, 0);\n}\n\n.dmt-root.dmt-preload * {\n  transition: none !important;\n}\n\n@media (max-width: 768px) {\n  .dmt-root {\n    width: min(100%, 98vw);\n    margin: 8px auto;\n  }\n\n  .dmt-topbar {\n    min-height: 62px;\n    grid-template-columns: 32px minmax(0, 1fr) auto;\n    gap: 8px;\n    padding: 0 8px;\n  }\n\n  .dmt-brandmark {\n    width: 32px;\n    height: 32px;\n  }\n\n  .dmt-title h1 {\n    font-size: 18px;\n  }\n\n  .dmt-title span {\n    font-size: 10px;\n  }\n\n  .dmt-title {\n    position: static;\n    width: auto;\n    max-width: none;\n    pointer-events: auto;\n    transform: none;\n  }\n\n  .dmt-topbar-actions {\n    gap: 6px;\n  }\n\n  .dmt-theme-selector--topbar {\n    width: min(46vw, 168px);\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 2px;\n    padding: 2px;\n  }\n\n  .dmt-theme-selector--topbar button {\n    min-height: 26px;\n    padding: 0 3px;\n    font-size: 10px;\n  }\n\n  .dmt-icon-btn {\n    width: 36px;\n    height: 36px;\n  }\n\n  .dmt-reader {\n    padding: 20px 10px 22px;\n  }\n\n  .dmt-content {\n    padding: 0 4px;\n  }\n\n  .dmt-dialogue-bubble {\n    gap: 12px;\n  }\n\n  .dmt-avatar {\n    flex-basis: 62px;\n    width: 62px;\n    height: 62px;\n    border-radius: 10px;\n  }\n\n  .dmt-avatar-fallback {\n    font-size: 22px;\n  }\n\n  .dmt-bubble {\n    min-height: 62px;\n  }\n\n  .dmt-name {\n    margin-bottom: 6px;\n    font-size: 15px;\n  }\n\n  .dmt-dialogue-text {\n    padding-left: 12px;\n  }\n\n  .dmt-dialogue.is-user .dmt-dialogue-text {\n    padding-right: 12px;\n  }\n\n  .dmt-optional {\n    width: 100%;\n    margin: 18px auto 22px;\n    padding: 12px;\n  }\n\n  .dmt-optional-head {\n    display: grid;\n    gap: 8px;\n  }\n\n  .dmt-optional-tags {\n    justify-content: flex-start;\n  }\n\n  .dmt-optional-tags span {\n    max-width: 100%;\n  }\n\n  .dmt-optional-fields {\n    grid-template-columns: 1fr;\n    gap: 0;\n  }\n\n  .dmt-optional-field {\n    grid-template-columns: minmax(54px, .32fr) minmax(0, 1fr);\n  }\n\n  .dmt-optional-resource {\n    grid-template-columns: minmax(42px, auto) minmax(0, 1fr);\n  }\n\n  .dmt-optional-resource__value {\n    grid-column: 2;\n  }\n\n  .dmt-soul-ring {\n    flex-basis: 48px;\n    width: 48px;\n    height: 48px;\n  }\n\n  .dmt-settings {\n    left: 10px;\n    right: 10px;\n    top: 70px;\n    width: auto;\n  }\n\n  .dmt-setting-row,\n  .dmt-user-avatar-row {\n    grid-template-columns: 1fr;\n  }\n}\n";
  const APP_JS = "(function () {\n  \"use strict\";\n\n  function ensureRootId(item) {\n    if (!item || !item.dataset) return \"\";\n    if (!item.dataset.dmtInstanceId) {\n      window.__dmtMainTextInstanceSeq = (window.__dmtMainTextInstanceSeq || 0) + 1;\n      item.dataset.dmtInstanceId = \"dmt-\" + window.__dmtMainTextInstanceSeq;\n    }\n    return item.dataset.dmtInstanceId;\n  }\n\n  function findRootForCurrentScript() {\n    const current = document.currentScript;\n    const targetId = current && current.getAttribute(\"data-dmt-target-root\");\n    if (targetId) {\n      const target = document.querySelector('[data-main-text-root][data-dmt-instance-id=\"' + targetId + '\"]');\n      if (target) return target;\n    }\n\n    let cursor = current && current.previousElementSibling;\n    while (cursor) {\n      if (cursor.matches && cursor.matches(\"[data-main-text-root]\")) return cursor;\n      cursor = cursor.previousElementSibling;\n    }\n\n    const roots = Array.from(document.querySelectorAll(\"[data-main-text-root]\"));\n    return roots.reverse().find(item => item && item.dataset && item.dataset.dmtMounted !== \"1\") || roots[0];\n  }\n\n  const root = findRootForCurrentScript();\n  if (!root) return;\n  ensureRootId(root);\n  if (root.dataset.dmtMounted === \"1\") return;\n  root.dataset.dmtMounted = \"1\";\n  window.__dmtMainTextMounted = false;\n\n  const contentEl = root.querySelector(\"[data-content]\");\n  if (!contentEl) return;\n\n  const STORAGE = {\n    theme: \"dl-main-text-theme\",\n    font: \"dl-main-text-font\",\n    fontSize: \"dl-main-text-font-size\",\n    dialogueSize: \"dl-main-text-dialogue-size\",\n    customCharacters: \"dl-main-text-custom-characters\",\n    userAvatar: \"dl-main-text-user-avatar\",\n    userAvatarOverride: \"dl-main-text-user-avatar-override\",\n  };\n\n  const VALID_THEMES = new Set([\"starsea\", \"starsea-night\", \"paper\", \"paper-night\"]);\n  const VALID_FONTS = new Set([\"theme\", \"serif\", \"sans\", \"yahei\", \"songti\", \"kaiti\", \"fangsong\"]);\n  const AVATAR_BASE_URL = \"https://raw.githubusercontent.com/INK-996/imgbed/main/%E6%96%97%E4%BA%8C/\";\n  const LOCAL_AVATAR_BASE = \"../图片库/人物/\";\n  const AVATAR_EXTENSIONS = [\"webp\", \"png\", \"jpg\", \"jpeg\"];\n  const AVATAR_SUFFIXES = [\"\", \"1\", \"2\", \"3\", \"4\", \"5\", \"_头像\", \"头像\"];\n  const MAX_AVATAR_BYTES = 5 * 1024 * 1024;\n  const PLAYER_AVATAR_EVENT = \"douluo-player-avatar:update\";\n  const AVATAR_DB_NAME = \"douluo-main-text-assets\";\n  const AVATAR_DB_VERSION = 1;\n  const AVATAR_STORE = \"avatars\";\n  const AVATAR_REF_PREFIX = \"dmt-avatar://\";\n  const USER_AVATAR_KEY = \"user/override\";\n\n  let customCharacters = readJson(STORAGE.customCharacters, {});\n  let discoveredCharacters = new Map();\n  let pendingCharacterAvatar = \"\";\n  let pendingCharacterAvatarBlob = null;\n  let toastTimer = null;\n  let beforeImageOpen = null;\n  let avatarDbPromise = null;\n  let avatarRenderSeq = 0;\n  const avatarCache = new Map();\n  const avatarObjectUrls = new Map();\n  const rawContentEl = root.querySelector(\"[data-raw-content]\");\n  const originalSource = rawContentEl ? rawContentEl.innerHTML : contentEl.innerHTML;\n\n  function clamp(value, min, max) {\n    const n = Number(value);\n    if (!Number.isFinite(n)) return min;\n    return Math.max(min, Math.min(max, n));\n  }\n\n  function storageGet(key, fallback = \"\") {\n    for (const host of hostWindows()) {\n      try {\n        const value = host.localStorage && host.localStorage.getItem(key);\n        if (value != null) return value;\n      } catch (_) {}\n    }\n    return fallback;\n  }\n\n  function storageSet(key, value) {\n    let saved = false;\n    const seen = new Set();\n    for (const host of hostWindows()) {\n      try {\n        const store = host.localStorage;\n        if (!store || seen.has(store)) continue;\n        seen.add(store);\n        store.setItem(key, value);\n        saved = true;\n      } catch (_) {}\n    }\n    return saved;\n  }\n\n  function storageRemove(key) {\n    let removed = false;\n    const seen = new Set();\n    for (const host of hostWindows()) {\n      try {\n        const store = host.localStorage;\n        if (!store || seen.has(store)) continue;\n        seen.add(store);\n        store.removeItem(key);\n        removed = true;\n      } catch (_) {}\n    }\n    return removed;\n  }\n\n  function hostWindows() {\n    const list = [window];\n    try {\n      if (window.parent && window.parent !== window) list.push(window.parent);\n    } catch (_) {}\n    try {\n      if (window.top && !list.includes(window.top)) list.push(window.top);\n    } catch (_) {}\n    return list;\n  }\n\n  function avatarRefForKey(key) {\n    return AVATAR_REF_PREFIX + key;\n  }\n\n  function avatarKeyFromRef(value) {\n    const text = String(value || \"\");\n    return text.startsWith(AVATAR_REF_PREFIX) ? text.slice(AVATAR_REF_PREFIX.length) : \"\";\n  }\n\n  function characterAvatarKey(name) {\n    return \"character/\" + encodeURIComponent(normalizeDisplayName(name));\n  }\n\n  function uniqueSources(values) {\n    const out = [];\n    values.forEach(value => {\n      const src = String(value || \"\").trim();\n      if (src && !out.includes(src)) out.push(src);\n    });\n    return out;\n  }\n\n  function dataUrlToBlob(dataUrl) {\n    const match = String(dataUrl || \"\").match(/^data:([^;,]+)?(;base64)?,(.*)$/);\n    if (!match) return null;\n    const mimeType = match[1] || \"image/png\";\n    const isBase64 = !!match[2];\n    const payload = match[3] || \"\";\n    try {\n      const binary = isBase64 ? atob(payload) : decodeURIComponent(payload);\n      const bytes = new Uint8Array(binary.length);\n      for (let i = 0; i \u003c binary.length; i += 1) bytes[i] = binary.charCodeAt(i);\n      return new Blob([bytes], { type: mimeType });\n    } catch (_) {\n      return null;\n    }\n  }\n\n  function revokeAvatarObjectUrl(key) {\n    const url = avatarObjectUrls.get(key);\n    if (!url) return;\n    try {\n      URL.revokeObjectURL(url);\n    } catch (_) {}\n    avatarObjectUrls.delete(key);\n  }\n\n  function openAvatarDb() {\n    if (avatarDbPromise) return avatarDbPromise;\n    avatarDbPromise = new Promise((resolve, reject) => {\n      try {\n        if (!window.indexedDB) {\n          reject(new Error(\"IndexedDB unavailable\"));\n          return;\n        }\n        const req = window.indexedDB.open(AVATAR_DB_NAME, AVATAR_DB_VERSION);\n        req.onupgradeneeded = () => {\n          const db = req.result;\n          if (!db.objectStoreNames.contains(AVATAR_STORE)) {\n            db.createObjectStore(AVATAR_STORE, { keyPath: \"key\" });\n          }\n        };\n        req.onsuccess = () => resolve(req.result);\n        req.onerror = () => reject(req.error || new Error(\"IndexedDB open failed\"));\n      } catch (error) {\n        reject(error);\n      }\n    }).catch(error => {\n      avatarDbPromise = null;\n      throw error;\n    });\n    return avatarDbPromise;\n  }\n\n  async function putAvatarRecord(key, blob) {\n    const db = await openAvatarDb();\n    return new Promise((resolve, reject) => {\n      const tx = db.transaction(AVATAR_STORE, \"readwrite\");\n      tx.objectStore(AVATAR_STORE).put({\n        key,\n        blob,\n        mimeType: blob && blob.type ? blob.type : \"image/png\",\n        updatedAt: Date.now(),\n      });\n      tx.oncomplete = () => resolve();\n      tx.onerror = () => reject(tx.error || new Error(\"Avatar write failed\"));\n    });\n  }\n\n  async function getAvatarRecord(key) {\n    const db = await openAvatarDb();\n    return new Promise((resolve, reject) => {\n      const req = db.transaction(AVATAR_STORE, \"readonly\").objectStore(AVATAR_STORE).get(key);\n      req.onsuccess = () => resolve(req.result || null);\n      req.onerror = () => reject(req.error || new Error(\"Avatar read failed\"));\n    });\n  }\n\n  async function deleteAvatarRecord(key) {\n    revokeAvatarObjectUrl(key);\n    try {\n      const db = await openAvatarDb();\n      await new Promise((resolve, reject) => {\n        const tx = db.transaction(AVATAR_STORE, \"readwrite\");\n        tx.objectStore(AVATAR_STORE).delete(key);\n        tx.oncomplete = () => resolve();\n        tx.onerror = () => reject(tx.error || new Error(\"Avatar delete failed\"));\n      });\n    } catch (_) {}\n  }\n\n  async function resolveAvatarSource(source) {\n    const key = avatarKeyFromRef(source);\n    if (!key) return String(source || \"\").trim();\n    if (avatarObjectUrls.has(key)) return avatarObjectUrls.get(key);\n    const record = await getAvatarRecord(key);\n    if (!record || !record.blob) return \"\";\n    const url = URL.createObjectURL(record.blob);\n    avatarObjectUrls.set(key, url);\n    return url;\n  }\n\n  async function persistAvatarAsset(key, dataUrl, blob) {\n    const value = String(dataUrl || \"\");\n    const imageBlob = blob || dataUrlToBlob(value);\n    if (imageBlob) {\n      try {\n        revokeAvatarObjectUrl(key);\n        await putAvatarRecord(key, imageBlob);\n        return { ok: true, value: avatarRefForKey(key), storage: \"indexeddb\" };\n      } catch (error) {\n        console.warn(\"[Douluo main text] IndexedDB avatar save failed:\", error);\n      }\n    }\n    if (value && value.startsWith(\"data:image/\")) {\n      return { ok: true, value, storage: \"localStorage\" };\n    }\n    return { ok: false, value: \"\", storage: \"\", error: new Error(\"No avatar storage available\") };\n  }\n\n  function notifyUserAvatarUpdate(value) {\n    hostWindows().forEach(host => {\n      try {\n        const EventCtor = host.CustomEvent || CustomEvent;\n        host.dispatchEvent(new EventCtor(PLAYER_AVATAR_EVENT, {\n          detail: { avatar: value, storageKey: STORAGE.userAvatarOverride, source: \"main-text\" },\n        }));\n      } catch (_) {}\n    });\n  }\n\n  function readHostStorage(key) {\n    for (const host of hostWindows()) {\n      try {\n        const value = host.localStorage && host.localStorage.getItem(key);\n        if (String(value || \"\").trim()) return String(value).trim();\n      } catch (_) {}\n    }\n    return storageGet(key, \"\");\n  }\n\n  function readCharacterCreateAvatar() {\n    const candidates = [];\n\n    hostWindows().forEach(host => {\n      try {\n        const api = host.DouluoPlayerAvatar;\n        const getter = api && api.source !== \"main-text\" && (api.getAvatar || api.get);\n        if (typeof getter === \"function\") {\n          const value = String(getter.call(api) || \"\").trim();\n          if (value) candidates.push(value);\n        }\n      } catch (_) {}\n    });\n\n    const stored = readHostStorage(STORAGE.userAvatar);\n    if (stored) candidates.push(stored);\n\n    return candidates.find(value => String(value || \"\").trim()) || \"\";\n  }\n\n  function readUserAvatarOverride() {\n    return readHostStorage(STORAGE.userAvatarOverride);\n  }\n\n  function getEffectiveUserAvatar() {\n    return readUserAvatarOverride() || readCharacterCreateAvatar();\n  }\n\n  async function setUserAvatarOverride(value, blob = null) {\n    const next = String(value || \"\");\n    if (next) {\n      const saved = await persistAvatarAsset(USER_AVATAR_KEY, next, blob);\n      if (!saved.ok) return false;\n      if (saved.storage === \"localStorage\" && !storageSet(STORAGE.userAvatarOverride, saved.value)) return false;\n      if (saved.storage === \"indexeddb\") storageSet(STORAGE.userAvatarOverride, saved.value);\n    } else {\n      storageRemove(STORAGE.userAvatarOverride);\n      await deleteAvatarRecord(USER_AVATAR_KEY);\n    }\n    avatarCache.clear();\n    renderReader();\n    notifyUserAvatarUpdate(next);\n    return true;\n  }\n\n  function exposePlayerAvatarInterface() {\n    const api = {\n      source: \"main-text\",\n      storageKey: STORAGE.userAvatarOverride,\n      defaultStorageKey: STORAGE.userAvatar,\n      eventName: PLAYER_AVATAR_EVENT,\n      get() {\n        return getEffectiveUserAvatar();\n      },\n      getDefault() {\n        return readCharacterCreateAvatar();\n      },\n      getOverride() {\n        return readUserAvatarOverride();\n      },\n      set(value) {\n        setUserAvatarOverride(value);\n      },\n      clear() {\n        setUserAvatarOverride(\"\");\n      },\n    };\n    hostWindows().forEach(host => {\n      try {\n        host.DouluoMainTextPlayerAvatar = api;\n        const existing = host.DouluoPlayerAvatar;\n        if (!existing || existing.source === \"main-text\") host.DouluoPlayerAvatar = api;\n      } catch (_) {}\n    });\n  }\n\n  function bindSharedAvatarUpdates() {\n    const onUpdate = event => {\n      const detail = event && event.detail ? event.detail : {};\n      if (detail.storageKey && ![STORAGE.userAvatar, STORAGE.userAvatarOverride].includes(detail.storageKey)) return;\n      avatarCache.clear();\n      renderReader();\n    };\n    hostWindows().forEach(host => {\n      try {\n        host.addEventListener(PLAYER_AVATAR_EVENT, onUpdate);\n      } catch (_) {}\n    });\n  }\n\n  function readJson(key, fallback) {\n    try {\n      const raw = storageGet(key, \"\");\n      return raw ? JSON.parse(raw) : fallback;\n    } catch (_) {\n      return fallback;\n    }\n  }\n\n  function writeJson(key, value) {\n    return storageSet(key, JSON.stringify(value));\n  }\n\n  function escapeHtml(value) {\n    const div = document.createElement(\"div\");\n    div.textContent = String(value == null ? \"\" : value);\n    return div.innerHTML;\n  }\n\n  function escapeAttr(value) {\n    const div = document.createElement(\"div\");\n    div.setAttribute(\"data-value\", String(value == null ? \"\" : value));\n    const match = div.outerHTML.match(/data-value=\"([^\"]*)\"/);\n    return match ? match[1] : \"\";\n  }\n\n  function decodeHtml(value) {\n    const textarea = document.createElement(\"textarea\");\n    textarea.innerHTML = String(value == null ? \"\" : value);\n    return textarea.value;\n  }\n\n  function htmlToText(html) {\n    const template = document.createElement(\"template\");\n    template.innerHTML = String(html == null ? \"\" : html);\n    return (template.content.textContent || \"\").replace(/\\u00a0/g, \" \");\n  }\n\n  function sanitizeColor(value, fallback = \"#e8c36c\") {\n    const s = String(value || \"\").trim();\n    return /^#[0-9a-fA-F]{6}$/.test(s) ? s : fallback;\n  }\n\n  function hashColor(name) {\n    const colors = [\"#e8c36c\", \"#5ee7ff\", \"#9d7bff\", \"#ff8fb8\", \"#68ff9b\", \"#ff9a3c\", \"#8ea8ff\", \"#d88da3\"];\n    const text = String(name || \"角色\");\n    let hash = 0;\n    for (let i = 0; i \u003c text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) | 0;\n    return colors[Math.abs(hash) % colors.length];\n  }\n\n  function getHostWindow() {\n    try {\n      return window.parent && window.parent !== window ? window.parent : window;\n    } catch (_) {\n      return window;\n    }\n  }\n\n  function getPlayerName() {\n    const host = getHostWindow();\n    const values = [\n      host && host.SillyTavern && host.SillyTavern.name1,\n      host && host.name1,\n      window && window.SillyTavern && window.SillyTavern.name1,\n      window && window.name1,\n    ];\n    const found = values.find(value => String(value || \"\").trim());\n    return String(found || \"玩家\").trim();\n  }\n\n  function getUserInfo() {\n    const name = getPlayerName();\n    return {\n      name,\n      color: \"#8bb8c7\",\n      avatar: getEffectiveUserAvatar(),\n    };\n  }\n\n  function isUserRole(rawName) {\n    const raw = String(rawName || \"\").trim();\n    const clean = raw.toLowerCase();\n    const player = getPlayerName();\n    return clean === \"_\" || clean === \"#\" || clean === \"user\" || raw === \"{{user}}\" || raw === player;\n  }\n\n  function normalizeDisplayName(raw) {\n    const s = String(raw || \"\")\n      .trim()\n      .replace(/^[\\s\"'“”‘’「」『』《》〈〉()（）【】\\[\\]]+|[\\s\"'“”‘’「」『』《》〈〉()（）【】\\[\\]]+$/g, \"\");\n    if (!s) return \"角色\";\n    if (isUserRole(s)) return getPlayerName();\n    return s;\n  }\n\n  function getCharacterInfo(rawName) {\n    if (isUserRole(rawName)) return getUserInfo();\n    const name = normalizeDisplayName(rawName);\n    const custom = customCharacters[name] || {};\n    if (!discoveredCharacters.has(name)) {\n      discoveredCharacters.set(name, {\n        color: sanitizeColor(custom.color, hashColor(name)),\n      });\n    }\n    return {\n      name,\n      color: sanitizeColor(custom.color, hashColor(name)),\n      avatar: custom.avatar || \"\",\n    };\n  }\n\n  function getNameVariants(characterName) {\n    const name = normalizeDisplayName(characterName);\n    const cleanName = String(name || \"\").replace(/[\\(（].*?[\\)）]/g, \"\").trim();\n    const bracketMatch = String(name || \"\").match(/[\\(（](.*?)[\\)）]/);\n    return Array.from(new Set([name, cleanName, bracketMatch && bracketMatch[1]].map(x => String(x || \"\").trim()).filter(Boolean)));\n  }\n\n  function buildAvatarSources(characterName) {\n    const info = getCharacterInfo(characterName);\n    const sources = [avatarRefForKey(characterAvatarKey(info.name))];\n    if (info.avatar) sources.push(info.avatar);\n\n    getNameVariants(info.name).forEach(name => {\n      AVATAR_SUFFIXES.forEach(suffix => {\n        AVATAR_EXTENSIONS.forEach(ext => {\n          const netUrl = AVATAR_BASE_URL + encodeURIComponent(name + suffix) + \".\" + ext;\n          const localUrl = LOCAL_AVATAR_BASE + name + suffix + \".\" + ext;\n          if (!sources.includes(netUrl)) sources.push(netUrl);\n          if (!sources.includes(localUrl)) sources.push(localUrl);\n        });\n      });\n    });\n\n    return uniqueSources(sources);\n  }\n\n  function buildUserAvatarSources() {\n    return uniqueSources([readUserAvatarOverride(), avatarRefForKey(USER_AVATAR_KEY), readCharacterCreateAvatar()]);\n  }\n\n  function applyAvatarFallback(box, name, color) {\n    if (!box) return;\n    box.classList.remove(\"has-image\");\n    box.style.setProperty(\"--char-color\", sanitizeColor(color, hashColor(name)));\n    const fallback = box.querySelector(\".dmt-avatar-fallback\");\n    if (fallback) fallback.textContent = String(name || \"角\").trim().charAt(0) || \"角\";\n  }\n\n  function setupAvatarImage(img, renderSeq = avatarRenderSeq) {\n    const isUser = img.hasAttribute(\"data-user-avatar\");\n    const info = isUser ? getUserInfo() : getCharacterInfo(img.getAttribute(\"data-char-name\") || \"角色\");\n    const box = img.closest(\".dmt-avatar\");\n    if (!box) return;\n\n    applyAvatarFallback(box, info.name, info.color);\n\n    const sources = isUser ? buildUserAvatarSources() : buildAvatarSources(info.name);\n    const cacheKey = (isUser ? \"user:\" : \"char:\") + info.name + \":\" + sources.join(\"|\");\n    const cached = avatarCache.get(cacheKey);\n    if (cached && cached.status === \"image\") {\n      img.src = cached.url;\n      box.classList.add(\"has-image\");\n      return;\n    }\n    if (cached && cached.status === \"fallback\") return;\n\n    let index = 0;\n    let resolved = false;\n    const isCurrent = () => renderSeq === avatarRenderSeq && img.isConnected;\n\n    const tryNext = async () => {\n      if (resolved || !isCurrent()) return;\n      if (index >= sources.length) {\n        resolved = true;\n        avatarCache.set(cacheKey, { status: \"fallback\" });\n        img.onload = null;\n        img.onerror = null;\n        return;\n      }\n      const source = sources[index];\n      index += 1;\n      let resolvedSource = \"\";\n      try {\n        resolvedSource = await resolveAvatarSource(source);\n      } catch (_) {\n        resolvedSource = \"\";\n      }\n      if (!resolvedSource) {\n        tryNext();\n        return;\n      }\n      if (!isCurrent()) return;\n      img.src = resolvedSource;\n    };\n\n    img.onload = () => {\n      if (resolved || !isCurrent()) return;\n      resolved = true;\n      avatarCache.set(cacheKey, { status: \"image\", url: img.src });\n      box.classList.add(\"has-image\");\n      img.onload = null;\n      img.onerror = null;\n    };\n\n    img.onerror = tryNext;\n    tryNext();\n  }\n\n  function setupAllAvatars(renderSeq = avatarRenderSeq) {\n    root.querySelectorAll(\"img[data-char-name], img[data-user-avatar]\").forEach(img => setupAvatarImage(img, renderSeq));\n  }\n\n  function highlightInlineQuotes(text) {\n    const safe = escapeHtml(text);\n    return safe.replace(/(「[^」]+」|『[^』]+』|“[^”]+”|‘[^’]+’)/g, '\u003cspan class=\"dmt-quote\">$1\u003c/span>');\n  }\n\n  function renderDialogueSegment(segment) {\n    const text = decodeHtml(String(segment || \"\").replace(/\\{[^}]+\\}/g, \"\")).trim();\n    if (!text) return \"\";\n\n    const patterns = [\n      /^「([^」]+)」（([^）]+)）$/,\n      /^「([^」]+)」\\(([^)]+)\\)$/,\n      /^『([^』]+)』（([^）]+)）$/,\n      /^【([^】]+)】（([^）]+)）$/,\n    ];\n\n    for (const pattern of patterns) {\n      const match = text.match(pattern);\n      if (match) {\n        return '\u003cdiv class=\"dmt-bilingual\">' +\n          '\u003cdiv class=\"dmt-bilingual__primary\">「' + escapeHtml(match[1]) + '」\u003c/div>' +\n          '\u003cdiv class=\"dmt-bilingual__secondary\">（' + escapeHtml(match[2]) + '）\u003c/div>' +\n          \"\u003c/div>\";\n      }\n    }\n\n    return \"\u003cp>\" + highlightInlineQuotes(text) + \"\u003c/p>\";\n  }\n\n  function createDialogueElement(rawName, segments) {\n    const isUser = isUserRole(rawName);\n    const info = isUser ? getUserInfo() : getCharacterInfo(rawName);\n    const body = segments.map(renderDialogueSegment).join(\"\");\n    if (!body) return \"\";\n    const imgAttr = isUser ? 'data-user-avatar=\"1\"' : 'data-char-name=\"' + escapeAttr(info.name) + '\"';\n    const alt = escapeAttr(info.name + \"头像\");\n\n    return '\u003csection class=\"dmt-dialogue' + (isUser ? ' is-user' : '') + '\" style=\"--char-color:' + escapeAttr(info.color) + '\">' +\n      '\u003cdiv class=\"dmt-dialogue-bubble\">' +\n      '\u003cspan class=\"dmt-avatar\" style=\"--char-color:' + escapeAttr(info.color) + '\">' +\n      '\u003cimg ' + imgAttr + ' alt=\"' + alt + '\" title=\"点击查看大图\" />' +\n      '\u003cspan class=\"dmt-avatar-fallback\">' + escapeHtml(info.name.charAt(0) || \"角\") + '\u003c/span>' +\n      '\u003c/span>' +\n      '\u003cdiv class=\"dmt-dialogue-main\">' +\n      '\u003cdiv class=\"dmt-bubble\">' +\n      '\u003cdiv class=\"dmt-name\">' + escapeHtml(info.name) + '\u003c/div>' +\n      '\u003cdiv class=\"dmt-dialogue-text\">' + body + '\u003c/div>' +\n      '\u003c/div>' +\n      '\u003c/div>' +\n      '\u003c/div>' +\n      '\u003c/section>';\n  }\n\n  function isSafeImageSrc(src) {\n    const value = String(src || \"\").trim();\n    return /^(https?:\\/\\/|data:image\\/|blob:|\\.{0,2}\\/|\\/)/i.test(value) && !/^(javascript|vbscript):/i.test(value);\n  }\n\n  function readHtmlAttr(tag, name) {\n    const pattern = new RegExp(\"\\\\s\" + name + \"\\\\s*=\\\\s*(?:\\\"([^\\\"]*)\\\"|'([^']*)'|([^\\\\s>]+))\", \"i\");\n    const match = String(tag || \"\").match(pattern);\n    return match ? (match[1] || match[2] || match[3] || \"\") : \"\";\n  }\n\n  function extractImageBlocks(line) {\n    let working = String(line || \"\");\n    const parts = [];\n\n    working = working.replace(/!\\[([^\\]]*)\\]\\((https?:\\/\\/[^)\\s]+|data:image\\/[^)]+|blob:[^)\\s]+|\\.{0,2}\\/[^)\\s]+|\\/[^)\\s]+)\\)/gi, (_, alt, src) => {\n      if (isSafeImageSrc(src)) {\n        parts.push('\u003cfigure class=\"dmt-image-card\">\u003cimg src=\"' + escapeAttr(src) + '\" alt=\"' + escapeAttr(alt || \"插画\") + '\" loading=\"lazy\" />\u003c/figure>');\n      }\n      return \" \";\n    });\n\n    if (!/\u003cimg[\\s>]/i.test(working) && !parts.length) return \"\";\n\n    working = working.replace(/\u003cimg\\b[^>]*>/gi, tag => {\n      const src = readHtmlAttr(tag, \"src\").trim();\n      if (isSafeImageSrc(src)) {\n        const alt = readHtmlAttr(tag, \"alt\") || \"插画\";\n        parts.push('\u003cfigure class=\"dmt-image-card\">\u003cimg src=\"' + escapeAttr(src) + '\" alt=\"' + escapeAttr(alt) + '\" loading=\"lazy\" />\u003c/figure>');\n      }\n      return \" \";\n    });\n\n    const text = htmlToText(working).trim();\n    if (text) parts.unshift(renderNarrationText(text));\n    return parts.join(\"\");\n  }\n  function splitNarrationText(text) {\n    const source = String(text || \"\").trim();\n    if (source.length \u003c= 180) return source ? [source] : [];\n\n    const sentences = source.match(/[^。！？!?；;]+[。！？!?；;]*/g) || [source];\n    const paragraphs = [];\n    let buffer = \"\";\n\n    sentences.forEach(sentence => {\n      const next = buffer + sentence;\n      if (buffer && next.length > 220) {\n        paragraphs.push(buffer.trim());\n        buffer = sentence;\n      } else {\n        buffer = next;\n      }\n    });\n\n    if (buffer.trim()) paragraphs.push(buffer.trim());\n    return paragraphs.length ? paragraphs : [source];\n  }\n\n  function renderNarrationText(text) {\n    return splitNarrationText(text)\n      .map(part => '\u003cp class=\"dmt-narration\">' + highlightInlineQuotes(part) + \"\u003c/p>\")\n      .join(\"\");\n  }\n\n  function processTextLine(line) {\n    const imageHtml = extractImageBlocks(line);\n    if (imageHtml) return imageHtml;\n\n    const text = htmlToText(line).trim();\n    if (!text) return \"\";\n    return renderNarrationText(text);\n  }\n\n  const OPTIONAL_BLOCK_TAGS = new Set([\n    \"斗罗敌人概览\",\n    \"斗罗战斗结算\",\n    \"斗罗日常检定\",\n    \"斗罗成长获取\",\n    \"斗罗状态资源\",\n  ]);\n\n  const OPTIONAL_BLOCK_META = {\n    \"斗罗敌人概览\": { title: \"敌人概览\", tone: \"enemy\", fallbackKind: \"enemy\" },\n    \"斗罗战斗结算\": { title: \"战斗结算\", tone: \"battle\", fallbackKind: \"battle\" },\n    \"斗罗日常检定\": { title: \"日常检定\", tone: \"daily\", fallbackKind: \"daily\" },\n    \"斗罗成长获取\": { title: \"成长获取\", tone: \"growth\", fallbackKind: \"growth\" },\n    \"斗罗状态资源\": { title: \"状态资源\", tone: \"status\", fallbackKind: \"status\" },\n  };\n\n  const OPTIONAL_WEAK_LABELS = {\n    \"斗罗敌人概览\": \"敌人\",\n    \"斗罗战斗结算\": \"战斗\",\n    \"斗罗日常检定\": \"检定\",\n    \"斗罗成长获取\": \"成长获取\",\n    \"斗罗状态资源\": \"状态资源\",\n  };\n\n  const OPTIONAL_IMPORTANT_LABELS = new Set([\"结果\", \"状态\", \"目标剩余\", \"计算\", \"骰运\", \"等级变化\", \"属性变化\"]);\n  const OPTIONAL_EQUIPMENT_KINDS = new Set([\"armor\", \"device\", \"gear\"]);\n\n  function escapeRegex(value) {\n    return String(value || \"\").replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n  }\n\n  function optionalTagPattern() {\n    return Array.from(OPTIONAL_BLOCK_TAGS).map(escapeRegex).join(\"|\");\n  }\n\n  function optionalStartTagName(line) {\n    const match = String(line || \"\").trim().match(new RegExp(\"^\u003c(\" + optionalTagPattern() + \")(?:\\\\s[^>]*)?>$\"));\n    return match ? match[1] : \"\";\n  }\n\n  function optionalEndTagName(line) {\n    const match = String(line || \"\").trim().match(new RegExp(\"^\u003c\\\\/(\" + optionalTagPattern() + \")\\\\s*>$\"));\n    return match ? match[1] : \"\";\n  }\n\n  function isOptionalFieldLine(line) {\n    return /^([^:：]{1,18})\\s*[:：]\\s*[\\s\\S]*$/.test(String(line || \"\").trim());\n  }\n\n  function tokenizePairedOptionalBlocks(source) {\n    const text = String(source || \"\");\n    const pattern = new RegExp(\"\u003c(\" + optionalTagPattern() + \")(?:\\\\s[^>]*)?>([\\\\s\\\\S]*?)\u003c\\\\/\\\\1>\", \"g\");\n    const tokens = [];\n    let cursor = 0;\n    let match;\n\n    while ((match = pattern.exec(text))) {\n      if (match.index > cursor) tokens.push({ type: \"text\", text: text.slice(cursor, match.index) });\n      tokens.push({ type: \"optional\", tag: match[1], body: match[2] });\n      cursor = pattern.lastIndex;\n    }\n\n    if (cursor \u003c text.length) tokens.push({ type: \"text\", text: text.slice(cursor) });\n    return tokens.length ? tokens : [{ type: \"text\", text }];\n  }\n\n  function tokenizeLooseOptionalBlocks(source) {\n    const tokens = [];\n    const textLines = [];\n    let block = null;\n\n    const flushText = () => {\n      const text = textLines.join(\"\\n\").trim();\n      if (text) tokens.push({ type: \"text\", text });\n      textLines.length = 0;\n    };\n\n    const flushBlock = () => {\n      if (!block) return;\n      if (block.lines.some(isOptionalFieldLine)) {\n        tokens.push({ type: \"optional\", tag: block.tag, body: block.lines.join(\"\\n\") });\n      } else {\n        textLines.push(\"\u003c\" + block.tag + \">\");\n        block.lines.forEach(line => textLines.push(line));\n      }\n      block = null;\n    };\n\n    String(source || \"\").split(/\\n/).forEach(line => {\n      const startTag = optionalStartTagName(line);\n      if (startTag) {\n        flushBlock();\n        flushText();\n        block = { tag: startTag, lines: [] };\n        return;\n      }\n\n      if (block) {\n        const endTag = optionalEndTagName(line);\n        if (endTag) {\n          flushBlock();\n          return;\n        }\n\n        const trimmed = String(line || \"\").trim();\n        if (!trimmed || isOptionalFieldLine(trimmed)) {\n          block.lines.push(line);\n          return;\n        }\n\n        flushBlock();\n      }\n\n      textLines.push(line);\n    });\n\n    flushBlock();\n    flushText();\n    return tokens.length ? tokens : [{ type: \"text\", text: String(source || \"\") }];\n  }\n\n  function tokenizeOptionalBlocks(source) {\n    const text = String(source || \"\");\n    if (new RegExp(\"^\\\\s*\u003c(\" + optionalTagPattern() + \")(?:\\\\s[^>]*)?>\\\\s*$\", \"m\").test(text)) {\n      return tokenizeLooseOptionalBlocks(text);\n    }\n    return tokenizePairedOptionalBlocks(text);\n  }\n\n  function parseOptionalFields(body) {\n    return String(body || \"\")\n      .replace(/\u003cbr\\s*\\/?>/gi, \"\\n\")\n      .split(/\\n+/)\n      .map(line => htmlToText(line).trim())\n      .filter(Boolean)\n      .filter(line => !/^\u003c\\/?斗罗/.test(line))\n      .map(line => {\n        const match = line.match(/^([^:：]{1,18})\\s*[:：]\\s*([\\s\\S]*)$/);\n        if (!match) return { label: \"\", value: line, free: true };\n        return { label: match[1].trim(), value: match[2].trim(), free: false };\n      });\n  }\n\n  function optionalFieldValue(fields, names) {\n    const wanted = names.map(name => String(name || \"\").trim());\n    const field = fields.find(item => !item.free && wanted.includes(item.label));\n    return field ? field.value : \"\";\n  }\n\n  function normalizeOptionalKind(text) {\n    const value = String(text || \"\").replace(/\\s+/g, \"\");\n    if (/魂环/.test(value)) return \"ring\";\n    if (/斗铠|机甲/.test(value)) return \"armor\";\n    if (/魂导/.test(value)) return \"device\";\n    if (/装备|武器|防具|物品/.test(value)) return \"gear\";\n    if (/魂灵/.test(value)) return \"spirit\";\n    if (/魂骨/.test(value)) return \"bone\";\n    if (/经验|等级|突破|修炼|任务奖励|奖励/.test(value)) return \"growth\";\n    if (/称号|成就/.test(value)) return \"title\";\n    if (/控制|治疗|护盾|反击|伤害|战斗/.test(value)) return \"battle\";\n    if (/状态|资源|冷却|次数|金钱|领域|真身|增益|减益|异常/.test(value)) return \"status\";\n    return \"\";\n  }\n\n  function optionalBlockKind(tag, fields) {\n    const meta = OPTIONAL_BLOCK_META[tag] || {};\n    const type = optionalFieldValue(fields, [\"类型\", \"项目\", \"结算\", \"获取\"]);\n    return normalizeOptionalKind(type) || meta.fallbackKind || \"general\";\n  }\n\n  function clampPercent(current, total) {\n    const now = Number(current);\n    const max = Number(total);\n    if (!Number.isFinite(now) || !Number.isFinite(max) || max \u003c= 0) return 0;\n    return clamp((now / max) * 100, 0, 100);\n  }\n\n  function extractOptionalResources(fields) {\n    const resources = [];\n    const rangePattern = /(HP|MP|SP|精神力|魂力|生命|体力)\\s*[:：]?\\s*(\\d+(?:\\.\\d+)?)\\s*\\/\\s*(\\d+(?:\\.\\d+)?)/gi;\n\n    fields.forEach(field => {\n      const labelText = String(field.label || \"\").trim();\n      const valueText = String(field.value || \"\").trim();\n      const direct = labelText.match(/^(HP|MP|SP|精神力|魂力|生命|体力)$/i);\n      const directRange = valueText.match(/(\\d+(?:\\.\\d+)?)\\s*\\/\\s*(\\d+(?:\\.\\d+)?)/);\n      if (direct && directRange) {\n        resources.push({\n          name: direct[1],\n          current: directRange[1],\n          total: directRange[2],\n        });\n      }\n\n      const combined = (labelText ? labelText + \": \" : \"\") + valueText;\n      let match;\n      while ((match = rangePattern.exec(combined))) {\n        resources.push({\n          name: match[1],\n          current: match[2],\n          total: match[3],\n        });\n      }\n    });\n\n    const seen = new Set();\n    return resources.filter(item => {\n      const key = item.name + \":\" + item.current + \"/\" + item.total;\n      if (seen.has(key)) return false;\n      seen.add(key);\n      return true;\n    });\n  }\n\n  function renderOptionalResources(fields) {\n    const resources = extractOptionalResources(fields);\n    if (!resources.length) return \"\";\n\n    return '\u003cdiv class=\"dmt-optional-resources\">' + resources.map(item => {\n      const pct = clampPercent(item.current, item.total).toFixed(1);\n      return '\u003cdiv class=\"dmt-optional-resource\" style=\"--value-pct:' + escapeAttr(pct) + '%\">' +\n        '\u003cspan class=\"dmt-optional-resource__name\">' + escapeHtml(item.name) + '\u003c/span>' +\n        '\u003cspan class=\"dmt-optional-resource__track\">\u003cspan>\u003c/span>\u003c/span>' +\n        '\u003cspan class=\"dmt-optional-resource__value\">' + escapeHtml(item.current) + \"/\" + escapeHtml(item.total) + '\u003c/span>' +\n        '\u003c/div>';\n    }).join(\"\") + \"\u003c/div>\";\n  }\n\n  function ringColorInfo(value) {\n    const raw = String(value || \"\").trim();\n    const custom = raw.match(/^自定义\\s*\\(\\s*(#[0-9a-fA-F]{6})\\s*\\)$/);\n    if (custom) {\n      return { label: raw, color: custom[1], color2: \"#5ee7ff\", className: \"is-custom\" };\n    }\n\n    const normalized = raw.replace(/\\s+/g, \"\") || \"金\";\n    const colors = {\n      \"白\": [\"#f8fafc\", \"#dbeafe\"],\n      \"黄\": [\"#facc15\", \"#fef08a\"],\n      \"紫\": [\"#8b5cf6\", \"#c4b5fd\"],\n      \"黑\": [\"#111827\", \"#475569\"],\n      \"红\": [\"#ef4444\", \"#fecaca\"],\n      \"金\": [\"#f5c542\", \"#fff2a6\"],\n      \"玫瑰金\": [\"#f4a7a8\", \"#ffd3b6\"],\n      \"青\": [\"#22d3ee\", \"#a5f3fc\"],\n      \"蓝\": [\"#3b82f6\", \"#bfdbfe\"],\n      \"橙\": [\"#fb923c\", \"#fed7aa\"],\n      \"银\": [\"#cbd5e1\", \"#f8fafc\"],\n      \"灰\": [\"#64748b\", \"#cbd5e1\"],\n      \"绿\": [\"#22c55e\", \"#bbf7d0\"],\n      \"暗金\": [\"#a16207\", \"#facc15\"],\n      \"血金\": [\"#b91c1c\", \"#fbbf24\"],\n      \"冰蓝\": [\"#7dd3fc\", \"#e0f2fe\"],\n      \"幽紫\": [\"#6d28d9\", \"#d8b4fe\"],\n      \"透明\": [\"rgba(226, 232, 240, .36)\", \"#5ee7ff\"],\n      \"无色\": [\"rgba(226, 232, 240, .36)\", \"#5ee7ff\"],\n    };\n\n    if (normalized === \"七彩\") {\n      return { label: normalized, color: \"#f5c542\", color2: \"#5ee7ff\", className: \"is-spectrum\" };\n    }\n    if (colors[normalized]) {\n      return { label: normalized, color: colors[normalized][0], color2: colors[normalized][1], className: \"\" };\n    }\n    return { label: raw || \"未识别\", color: \"#e8c36c\", color2: \"#5ee7ff\", className: \"is-fallback\" };\n  }\n\n  function renderOptionalRing(fields) {\n    const color = ringColorInfo(optionalFieldValue(fields, [\"颜色\", \"魂环颜色\"]));\n    const year = optionalFieldValue(fields, [\"年限\", \"年份\"]);\n    const order = optionalFieldValue(fields, [\"序号\", \"位置\"]);\n    const skill = optionalFieldValue(fields, [\"魂技\", \"技能\"]);\n    const style = \"--ring-color:\" + escapeAttr(color.color) + \";--ring-color-2:\" + escapeAttr(color.color2);\n\n    return '\u003cdiv class=\"dmt-optional-ring\">' +\n      '\u003cspan class=\"dmt-soul-ring ' + escapeAttr(color.className) + '\" style=\"' + style + '\">\u003c/span>' +\n      '\u003cdiv class=\"dmt-optional-ring__text\">' +\n      '\u003cstrong>' + escapeHtml(order || \"魂环\") + '\u003c/strong>' +\n      '\u003cspan>' + escapeHtml(color.label) + (year ? \" · \" + escapeHtml(year) : \"\") + '\u003c/span>' +\n      (skill ? '\u003cem>' + escapeHtml(skill) + '\u003c/em>' : \"\") +\n      '\u003c/div>' +\n      '\u003c/div>';\n  }\n\n  function renderOptionalEquipment(fields, kind) {\n    if (!OPTIONAL_EQUIPMENT_KINDS.has(kind)) return \"\";\n    const label = kind === \"armor\" ? \"斗铠\" : kind === \"device\" ? \"魂导器\" : \"装备\";\n    const name = optionalFieldValue(fields, [label, \"名称\", \"装备\", \"魂导器\", \"斗铠\", \"物品\", \"奖励\"]) || label;\n    const grade = optionalFieldValue(fields, [\"品级\", \"等级\", \"阶位\", \"品质\"]);\n    return '\u003cdiv class=\"dmt-optional-equipment\">' +\n      '\u003cspan class=\"dmt-optional-equipment__mark\">\u003c/span>' +\n      '\u003cdiv>\u003cstrong>' + escapeHtml(name) + '\u003c/strong>' +\n      (grade ? '\u003cspan>' + escapeHtml(grade) + '\u003c/span>' : \"\") +\n      '\u003c/div>' +\n      '\u003c/div>';\n  }\n\n  function renderOptionalFields(fields) {\n    return '\u003cdiv class=\"dmt-optional-fields\">' + fields.map(field => {\n      if (field.free) {\n        return '\u003cdiv class=\"dmt-optional-field is-free\">\u003cspan>' + escapeHtml(field.value) + '\u003c/span>\u003c/div>';\n      }\n      const important = OPTIONAL_IMPORTANT_LABELS.has(field.label) || /结果|状态|剩余|变化|获得|成功|失败/.test(field.label);\n      return '\u003cdiv class=\"dmt-optional-field' + (important ? ' dmt-optional-highlight' : '') + '\">' +\n        '\u003cspan class=\"dmt-optional-label\">' + escapeHtml(field.label) + '\u003c/span>' +\n        '\u003cspan class=\"dmt-optional-value\">' + escapeHtml(field.value) + '\u003c/span>' +\n        '\u003c/div>';\n    }).join(\"\") + \"\u003c/div>\";\n  }\n\n  function optionalHeaderModel(tag, meta, fields) {\n    const typeText = optionalFieldValue(fields, [\"类型\", \"项目\", \"结算\", \"获取\"]);\n    const enemyName = optionalFieldValue(fields, [\"敌人\"]);\n    const weakLabel = OPTIONAL_WEAK_LABELS[tag] || meta.title || \"记录\";\n    let title = meta.title || weakLabel;\n\n    if (tag === \"斗罗成长获取\") title = typeText || \"成长获取\";\n    if (tag === \"斗罗战斗结算\") title = typeText || \"战斗结算\";\n    if (tag === \"斗罗敌人概览\") title = enemyName || \"敌人概览\";\n    if (tag === \"斗罗日常检定\") title = \"日常检定\";\n    if (tag === \"斗罗状态资源\") title = typeText || \"状态资源\";\n\n    return { weakLabel, title, typeText };\n  }\n\n  function normalizeOptionalChip(value) {\n    return String(value || \"\").replace(/\\s+/g, \" \").trim();\n  }\n\n  function uniqueOptionalChips(values, weakLabel, title) {\n    const seen = new Set([weakLabel, title].map(normalizeOptionalChip).filter(Boolean));\n    return values\n      .map(normalizeOptionalChip)\n      .filter(value => {\n        if (!value || seen.has(value)) return false;\n        seen.add(value);\n        return true;\n      });\n  }\n\n  function renderOptionalHeader(tag, meta, fields) {\n    const header = optionalHeaderModel(tag, meta, fields);\n    const chips = uniqueOptionalChips([\n      optionalFieldValue(fields, [\"角色\"]),\n      optionalFieldValue(fields, [\"敌人\"]),\n      optionalFieldValue(fields, [\"目标\"]),\n      header.typeText,\n      optionalFieldValue(fields, [\"标签\"]),\n    ], header.weakLabel, header.title);\n    const tagHtml = chips.length\n      ? '\u003cdiv class=\"dmt-optional-tags\">' + chips.map(chip => '\u003cspan>' + escapeHtml(chip) + '\u003c/span>').join(\"\") + '\u003c/div>'\n      : \"\";\n    return '\u003cdiv class=\"dmt-optional-head\">' +\n      '\u003cdiv class=\"dmt-optional-title\">' +\n      '\u003cspan>' + escapeHtml(header.weakLabel) + '\u003c/span>' +\n      '\u003cstrong>' + escapeHtml(header.title) + '\u003c/strong>' +\n      '\u003c/div>' +\n      tagHtml +\n      '\u003c/div>';\n  }\n\n  function optionalPanelStyle(fields, kind) {\n    if (kind !== \"ring\") return \"\";\n    const color = ringColorInfo(optionalFieldValue(fields, [\"颜色\", \"魂环颜色\"]));\n    return ' style=\"--optional-accent:' + escapeAttr(color.color) + ';--optional-accent-2:' + escapeAttr(color.color2) + '\"';\n  }\n\n  function renderOptionalBlock(tag, body) {\n    const meta = OPTIONAL_BLOCK_META[tag];\n    if (!meta) return \"\";\n    const fields = parseOptionalFields(body);\n    if (!fields.length) return \"\";\n    const kind = optionalBlockKind(tag, fields);\n    return '\u003csection class=\"dmt-optional dmt-optional--' + escapeAttr(meta.tone) + ' dmt-optional-kind--' + escapeAttr(kind) + '\" data-optional-tag=\"' + escapeAttr(tag) + '\"' + optionalPanelStyle(fields, kind) + '>' +\n      renderOptionalHeader(tag, meta, fields) +\n      (kind === \"ring\" ? renderOptionalRing(fields) : \"\") +\n      renderOptionalEquipment(fields, kind) +\n      renderOptionalResources(fields) +\n      renderOptionalFields(fields) +\n      '\u003c/section>';\n  }\n\n  const STRUCTURE_TAGS = new Set([\"content\", \"now_plot\", \"gametext\", \"time\"]);\n\n  function normalizeStructureTagName(value) {\n    return String(value || \"\")\n      .trim()\n      .replace(/^\\/+/, \"\")\n      .toLowerCase();\n  }\n\n  function isStructureTagName(value) {\n    return STRUCTURE_TAGS.has(normalizeStructureTagName(value));\n  }\n\n  function isBareStructureTagLine(value) {\n    const text = String(value || \"\").trim();\n    if (!text) return false;\n    const bracketed = text.match(/^\\{\\/?([^{}]{1,40})\\}$/);\n    if (bracketed) return isStructureTagName(bracketed[1]);\n    const tagged = text.match(/^\u003c\\/?([a-z_][\\w-]*)\\s*\\/?>$/i);\n    if (tagged) return isStructureTagName(tagged[1]);\n    return isStructureTagName(text);\n  }\n\n  function parseBareDialogue(text) {\n    const source = String(text || \"\").trim().replace(/^[|｜\\-—\\s]+/, \"\");\n    const namePattern = \"([^\\\\s，。！？、；;,.!?：:\\\"“”‘’「」『』{}\u003c>]{1,24})\";\n    const quotePattern = \"(「[\\\\s\\\\S]+」|『[\\\\s\\\\S]+』|“[\\\\s\\\\S]+”|‘[\\\\s\\\\S]+’|\\\"[\\\\s\\\\S]+\\\")\";\n    const match = source.match(new RegExp(\"^\\\\s*\" + namePattern + \"\\\\s*(?:[:：])?\\\\s*\" + quotePattern + \"\\\\s*$\"));\n    if (!match) return null;\n    if (isStructureTagName(match[1])) return null;\n    return {\n      name: match[1].trim(),\n      body: match[2].trim(),\n    };\n  }\n\n  const NON_CONTENT_BLOCK_TAGS = [\n    \"think\",\n    \"thinking\",\n    \"thought\",\n    \"reasoning\",\n    \"tablethink\",\n    \"tablecheck\",\n    \"tableedit\",\n    \"style\",\n    \"script\",\n  ];\n\n  const STRUCTURE_BLOCK_PRIORITY = [\"content\", \"gametext\"];\n\n  function stripTaggedBlock(source, tagName) {\n    let text = String(source || \"\").replace(new RegExp(\"\u003c\" + tagName + \"\\\\b[^>]*>[\\\\s\\\\S]*?\u003c\\\\/\" + tagName + \">\", \"gi\"), \"\\n\");\n    text = text.replace(new RegExp(\"\u003c\" + tagName + \"\\\\b[^>]*>[\\\\s\\\\S]*?(?=\u003c(?:content|now_plot|gametext)\\\\b|$)\", \"gi\"), \"\\n\");\n    return text;\n  }\n\n  function stripNonContentBlocks(source) {\n    return NON_CONTENT_BLOCK_TAGS.reduce((text, tagName) => stripTaggedBlock(text, tagName), String(source || \"\"));\n  }\n\n  function collectStructureBlocks(source, tagName) {\n    const blocks = [];\n    String(source || \"\").replace(new RegExp(\"\u003c\" + tagName + \"\\\\b[^>]*>([\\\\s\\\\S]*?)\u003c\\\\/\" + tagName + \">\", \"gi\"), (_match, body) => {\n      const text = String(body || \"\").trim();\n      if (text) blocks.push(text);\n      return _match;\n    });\n    return blocks;\n  }\n\n  function extractStructureBlocks(source) {\n    const text = stripNonContentBlocks(source);\n    for (const tagName of STRUCTURE_BLOCK_PRIORITY) {\n      const blocks = collectStructureBlocks(text, tagName);\n      if (blocks.length) return blocks.join(\"\\n\\n\");\n    }\n    return text;\n  }\n\n  function stripStructureNoise(source) {\n    return stripNonContentBlocks(source)\n      .replace(/\u003ctime\\b[^>]*>[\\s\\S]*?\u003c\\/time>/gi, \"\")\n      .replace(/\u003c\\/?(content|now_plot|gametext|time)\\b[^>]*>/gi, \"\\n\")\n      .trim();\n  }\n\n  function hasRenderableStoryText(source) {\n    const text = stripStructureNoise(String(source || \"\"));\n    return Boolean(text) && !isLikelyStyleOrUiFragment(text);\n  }\n\n  function preferNonNowPlotText(source) {\n    const text = String(source || \"\");\n    const withoutNowPlot = stripTaggedBlock(text, \"now_plot\").trim();\n    if (hasRenderableStoryText(withoutNowPlot)) return withoutNowPlot;\n\n    const nowPlotBlocks = collectStructureBlocks(text, \"now_plot\");\n    if (nowPlotBlocks.length) return nowPlotBlocks.join(\"\\n\\n\");\n    return text;\n  }\n\n  function isLikelyStyleOrUiFragment(source) {\n    const text = String(source || \"\").trim();\n    if (!text) return false;\n    if (/```html|\u003c!doctype|\u003chtml\\b|\u003chead\\b|\u003cbody\\b|data-dlgithub-root|data-main-text-root/i.test(text)) return true;\n    if (/konata-(?:thinking|title|icon|content|arrow|bubble)|dmt-content|dmt-dialogue|dmt-narration/i.test(text)) return true;\n\n    const cssSelectorCount = (text.match(/^\\s*(?:[.#][\\w-]+|@(?:media|keyframes|supports)\\b)[^{\\n]*\\{/gim) || []).length;\n    const cssDeclarationCount = (text.match(/^\\s*-?[\\w-]+\\s*:\\s*[^;\\n]+;?\\s*$/gm) || []).length;\n    const wrappedDeclarations = /^\\s*\\{[\\s\\S]*\\}\\s*$/.test(text) && cssDeclarationCount > 0;\n    return wrappedDeclarations || cssDeclarationCount >= 3 || (cssSelectorCount > 0 && cssDeclarationCount > 0);\n  }\n\n  function normalizeSource(raw) {\n    let source = String(raw || \"\")\n      .replace(/\u003c!--[\\s\\S]*?-->/g, \"\")\n      .replace(/\u003cbr\\s*\\/?>/gi, \"\\n\")\n      .replace(/\u003c\\/p>\\s*\u003cp[^>]*>/gi, \"\\n\\n\")\n      .replace(/\u003c\\/div>\\s*\u003cdiv[^>]*>/gi, \"\\n\")\n      .replace(/^\u003cp[^>]*>/i, \"\")\n      .replace(/\u003c\\/p>$/i, \"\")\n      .trim();\n    for (let i = 0; i \u003c 3; i += 1) {\n      const decoded = source\n        .replace(/&amp;lt;/gi, \"&lt;\")\n        .replace(/&amp;gt;/gi, \"&gt;\")\n        .replace(/&lt;/gi, \"\u003c\")\n        .replace(/&gt;/gi, \">\");\n      if (decoded === source) break;\n      source = decoded;\n    }\n    source = preferNonNowPlotText(extractStructureBlocks(source));\n    for (let i = 0; i \u003c 4; i += 1) {\n      const nowPlot = source.match(/^\\s*\u003cnow_plot\\b[^>]*>([\\s\\S]*?)\u003c\\/now_plot>\\s*$/i);\n      if (nowPlot) {\n        source = nowPlot[1].trim();\n        continue;\n      }\n\n      const wrapped = source.match(/^\\s*\u003c(content|gametext)\\b[^>]*>([\\s\\S]*?)\u003c\\/\\1>\\s*$/i);\n      if (wrapped) {\n        source = wrapped[2].trim();\n        continue;\n      }\n\n      break;\n    }\n\n    source = stripNonContentBlocks(source);\n    source = source\n      .replace(/\u003ctime\\b[^>]*>[\\s\\S]*?\u003c\\/time>/gi, \"\")\n      .replace(/\u003c\\/?(content|now_plot|gametext|time)\\b[^>]*>/gi, \"\\n\")\n      .trim();\n    if (isLikelyStyleOrUiFragment(source)) return \"\";\n    return source;\n  }\n\n  function prepareLines(source) {\n    const splitInlineRoles = line => {\n      const text = String(line || \"\").trim();\n      if (!text) return [];\n\n      const markers = [];\n      const markerPattern = /\\{(?!\\{)([^{}\\n]{1,40})\\}\\s*/g;\n      let match;\n      while ((match = markerPattern.exec(text))) {\n        const start = match.index;\n        const end = markerPattern.lastIndex;\n        if (text[start - 1] === \"{\" || text[end] === \"}\") continue;\n        markers.push({ start });\n      }\n\n      if (!markers.length) return [text];\n\n      const parts = [];\n      let cursor = 0;\n      markers.forEach((marker, index) => {\n        if (marker.start > cursor) parts.push(text.slice(cursor, marker.start).trim());\n        const nextStart = markers[index + 1] ? markers[index + 1].start : text.length;\n        parts.push(text.slice(marker.start, nextStart).trim());\n        cursor = nextStart;\n      });\n\n      return parts.filter(Boolean);\n    };\n\n    return String(source || \"\")\n      .split(/\\n+/)\n      .flatMap(splitInlineRoles)\n      .filter(Boolean);\n  }\n\n  function renderContent(raw) {\n    const source = normalizeSource(raw);\n    let html = \"\";\n    let pending = null;\n    discoveredCharacters = new Map();\n\n    const flush = () => {\n      if (!pending) return;\n      html += createDialogueElement(pending.name, pending.segments);\n      pending = null;\n    };\n\n    const appendDialogue = (rawName, body) => {\n      const normalizedName = isUserRole(rawName) ? \"__user__\" : normalizeDisplayName(rawName);\n      if (pending && pending.normalizedName === normalizedName) {\n        pending.segments.push(body);\n      } else {\n        flush();\n        pending = { name: rawName, normalizedName, segments: [body] };\n      }\n    };\n\n    const renderTextSegment = segment => {\n      prepareLines(segment).forEach(line => {\n        const decodedLine = htmlToText(line).trim();\n        if (isBareStructureTagLine(decodedLine)) return;\n\n        if (/^\\{\\{[\\s\\S]*\\}\\}$/.test(decodedLine)) {\n          flush();\n          html += '\u003cp class=\"dmt-narration\">' + escapeHtml(decodedLine) + \"\u003c/p>\";\n          return;\n        }\n\n        const match = decodedLine.match(/^\\s*\\{([^{}]{1,40})\\}\\s*([\\s\\S]+)$/);\n        if (match) {\n          const rawName = match[1].trim();\n          const body = match[2].trim().replace(/^[|｜:：\\-—\\s]+/, \"\");\n\n          if (isStructureTagName(rawName)) {\n            const dialogue = parseBareDialogue(body);\n            if (dialogue) {\n              appendDialogue(dialogue.name, dialogue.body);\n            } else if (body) {\n              flush();\n              html += processTextLine(body);\n            }\n            return;\n          }\n\n          appendDialogue(rawName, body);\n          return;\n        }\n\n        const malformedTag = decodedLine.match(/^\\s*(content|now_plot|gametext|time)(?:\\s+|(?=[\\u3400-\\u9fff「『“‘\"]))([\\s\\S]+)$/i);\n        if (malformedTag) {\n          const body = malformedTag[2].trim();\n          const malformedDialogue = parseBareDialogue(body);\n          if (malformedDialogue) {\n            appendDialogue(malformedDialogue.name, malformedDialogue.body);\n          } else if (body) {\n            flush();\n            html += processTextLine(body);\n          }\n          return;\n        }\n\n        const bareDialogue = parseBareDialogue(decodedLine);\n        if (bareDialogue) {\n          appendDialogue(bareDialogue.name, bareDialogue.body);\n          return;\n        }\n\n        flush();\n        html += processTextLine(line);\n      });\n    };\n\n    tokenizeOptionalBlocks(source).forEach(token => {\n      if (token.type === \"optional\") {\n        flush();\n        html += renderOptionalBlock(token.tag, token.body);\n        return;\n      }\n      renderTextSegment(token.text);\n    });\n\n    flush();\n    return html || '\u003cp class=\"dmt-narration\">正文为空。\u003c/p>';\n  }\n\n  function renderReader() {\n    avatarRenderSeq += 1;\n    const renderSeq = avatarRenderSeq;\n    contentEl.innerHTML = renderContent(originalSource);\n    setupAllAvatars(renderSeq);\n    renderCustomCharacters(renderSeq);\n    renderUserAvatarPreview(renderSeq);\n  }\n\n  function showToast(message) {\n    const toast = root.querySelector(\"[data-toast]\");\n    if (!toast) return;\n    toast.textContent = message;\n    toast.classList.add(\"is-visible\");\n    clearTimeout(toastTimer);\n    toastTimer = setTimeout(() => toast.classList.remove(\"is-visible\"), 2200);\n  }\n\n  function applyTheme(theme) {\n    const next = VALID_THEMES.has(theme) ? theme : \"starsea\";\n    window.__dlMainTextTheme = next;\n    document.body.setAttribute(\"data-theme\", next);\n    root.setAttribute(\"data-theme\", next);\n    document.documentElement.style.colorScheme = next.includes(\"night\") || next === \"starsea\" ? \"dark\" : \"light\";\n    storageSet(STORAGE.theme, next);\n    root.querySelectorAll(\"[data-theme-key]\").forEach(btn => {\n      btn.classList.toggle(\"active\", btn.getAttribute(\"data-theme-key\") === next);\n    });\n  }\n\n  function applyFont(font) {\n    const next = VALID_FONTS.has(font) ? font : \"theme\";\n    document.body.setAttribute(\"data-font\", next);\n    root.setAttribute(\"data-font\", next);\n    storageSet(STORAGE.font, next);\n    const select = root.querySelector(\"[data-font-select]\");\n    if (select) select.value = next;\n  }\n\n  function setFontSize(value) {\n    const next = clamp(value, 14, 28);\n    document.body.style.setProperty(\"--dmt-font-size\", next + \"px\");\n    root.style.setProperty(\"--dmt-font-size\", next + \"px\");\n    storageSet(STORAGE.fontSize, String(next));\n    const out = root.querySelector(\"[data-font-size]\");\n    if (out) out.textContent = String(next);\n  }\n\n  function setDialogueSize(value) {\n    const next = clamp(value, 13, 26);\n    document.body.style.setProperty(\"--dmt-dialogue-size\", next + \"px\");\n    root.style.setProperty(\"--dmt-dialogue-size\", next + \"px\");\n    storageSet(STORAGE.dialogueSize, String(next));\n    const out = root.querySelector(\"[data-dialogue-size]\");\n    if (out) out.textContent = String(next);\n  }\n\n  function adjustFontSize(delta) {\n    const current = Number(storageGet(STORAGE.fontSize, \"18\"));\n    setFontSize(current + Number(delta || 0));\n  }\n\n  function adjustDialogueSize(delta) {\n    const current = Number(storageGet(STORAGE.dialogueSize, \"16\"));\n    setDialogueSize(current + Number(delta || 0));\n  }\n\n  function makePreviewImg(src, alt) {\n    const img = document.createElement(\"img\");\n    img.src = src;\n    img.alt = alt || \"\";\n    return img;\n  }\n\n  function setupPreviewImage(img, sources, renderSeq, onFallback) {\n    let index = 0;\n    const isCurrent = () => renderSeq === avatarRenderSeq && img.isConnected;\n    const tryNext = async () => {\n      if (!isCurrent()) return;\n      if (index >= sources.length) {\n        img.remove();\n        if (onFallback) onFallback();\n        return;\n      }\n      const source = sources[index];\n      index += 1;\n      let resolvedSource = \"\";\n      try {\n        resolvedSource = await resolveAvatarSource(source);\n      } catch (_) {\n        resolvedSource = \"\";\n      }\n      if (!resolvedSource) {\n        tryNext();\n        return;\n      }\n      if (!isCurrent()) return;\n      img.src = resolvedSource;\n    };\n    img.onerror = tryNext;\n    tryNext();\n  }\n\n  function renderUserAvatarPreview(renderSeq = avatarRenderSeq) {\n    const host = root.querySelector(\"[data-user-avatar-preview]\");\n    if (!host) return;\n    const info = getUserInfo();\n    const sources = buildUserAvatarSources();\n    host.innerHTML = \"\";\n    host.textContent = info.name.charAt(0) || \"玩\";\n    if (!sources.length) return;\n\n    const img = makePreviewImg(\"\", info.name + \"头像\");\n    host.textContent = \"\";\n    host.appendChild(img);\n    setupPreviewImage(img, sources, renderSeq, () => {\n      host.textContent = info.name.charAt(0) || \"玩\";\n    });\n  }\n\n  function renderCustomCharacters(renderSeq = avatarRenderSeq) {\n    const host = root.querySelector(\"[data-character-list]\");\n    if (!host) return;\n    host.innerHTML = \"\";\n\n    const map = new Map();\n    discoveredCharacters.forEach((info, name) => map.set(name, { source: \"正文\", ...info }));\n    Object.entries(customCharacters).forEach(([name, info]) => map.set(name, { source: \"自定义\", ...info }));\n    const names = Array.from(map.keys()).sort((a, b) => a.localeCompare(b, \"zh-Hans-CN\"));\n\n    if (!names.length) {\n      const empty = document.createElement(\"div\");\n      empty.className = \"dmt-character-empty\";\n      empty.textContent = \"正文中尚未捕获角色\";\n      host.appendChild(empty);\n      return;\n    }\n\n    names.forEach(name => {\n      const info = map.get(name) || {};\n      const color = sanitizeColor(info.color, hashColor(name));\n      const chip = document.createElement(\"div\");\n      chip.className = \"dmt-character-chip\";\n      chip.style.setProperty(\"--char-color\", color);\n\n      const avatar = document.createElement(\"span\");\n      avatar.className = \"dmt-character-chip-avatar\";\n      avatar.style.setProperty(\"--char-color\", color);\n      const previewSources = uniqueSources([avatarRefForKey(characterAvatarKey(name)), info.avatar]);\n      if (previewSources.length) {\n        const previewImg = makePreviewImg(\"\", name + \"头像\");\n        avatar.appendChild(previewImg);\n        setupPreviewImage(previewImg, previewSources, renderSeq, () => {\n          avatar.textContent = name.charAt(0) || \"角\";\n        });\n      } else {\n        avatar.textContent = name.charAt(0) || \"角\";\n      }\n\n      const label = document.createElement(\"span\");\n      label.className = \"dmt-character-chip-name\";\n      label.textContent = name + \" · \" + (info.source || \"正文\");\n\n      const remove = document.createElement(\"button\");\n      remove.type = \"button\";\n      remove.textContent = customCharacters[name] ? \"删\" : \"存\";\n      remove.title = customCharacters[name] ? \"删除自定义角色\" : \"存为自定义角色\";\n      remove.addEventListener(\"click\", async () => {\n        if (customCharacters[name]) {\n          delete customCharacters[name];\n          await deleteAvatarRecord(characterAvatarKey(name));\n          showToast(\"已删除「\" + name + \"」\");\n        } else {\n          customCharacters[name] = { color, avatar: \"\" };\n          showToast(\"已保存「\" + name + \"」\");\n        }\n        writeJson(STORAGE.customCharacters, customCharacters);\n        avatarCache.clear();\n        renderReader();\n      });\n\n      chip.appendChild(avatar);\n      chip.appendChild(label);\n      chip.appendChild(remove);\n      host.appendChild(chip);\n    });\n  }\n\n  function resetCharacterForm() {\n    const nameInput = root.querySelector(\"[data-character-name]\");\n    const colorInput = root.querySelector(\"[data-character-color]\");\n    const fileInput = root.querySelector(\"[data-character-file]\");\n    const preview = root.querySelector(\"[data-character-preview]\");\n    pendingCharacterAvatar = \"\";\n    pendingCharacterAvatarBlob = null;\n    if (nameInput) nameInput.value = \"\";\n    if (colorInput) colorInput.value = \"#e8c36c\";\n    if (fileInput) fileInput.value = \"\";\n    if (preview) {\n      preview.removeAttribute(\"src\");\n      preview.classList.remove(\"has-preview\");\n    }\n  }\n\n  async function saveCustomCharacter() {\n    const nameInput = root.querySelector(\"[data-character-name]\");\n    const colorInput = root.querySelector(\"[data-character-color]\");\n    const rawName = nameInput ? nameInput.value.trim() : \"\";\n    const name = normalizeDisplayName(rawName);\n    if (!rawName || name === \"角色\") {\n      showToast(\"请输入角色名称\");\n      return;\n    }\n\n    const existing = customCharacters[name] || {};\n    let avatar = existing.avatar || \"\";\n    let avatarStorage = \"\";\n    if (pendingCharacterAvatar) {\n      const saved = await persistAvatarAsset(characterAvatarKey(name), pendingCharacterAvatar, pendingCharacterAvatarBlob);\n      if (!saved.ok) {\n        showToast(\"头像保存失败，请换一张更小的图片\");\n        return;\n      }\n      avatar = saved.value;\n      avatarStorage = saved.storage;\n    }\n    customCharacters[name] = {\n      color: sanitizeColor(colorInput && colorInput.value, existing.color || hashColor(name)),\n      avatar,\n    };\n    const wroteSettings = writeJson(STORAGE.customCharacters, customCharacters);\n    if (!wroteSettings && avatarStorage !== \"indexeddb\") {\n      if (Object.keys(existing).length) customCharacters[name] = existing;\n      else delete customCharacters[name];\n      showToast(\"角色保存失败，本地存储不可用\");\n      return;\n    }\n    avatarCache.clear();\n    resetCharacterForm();\n    renderReader();\n    showToast(wroteSettings ? \"已保存「\" + name + \"」\" : \"头像已缓存，角色设置未写入本地存储\");\n  }\n\n  function readImageFile(file, callback) {\n    if (!file) return;\n    if (!file.type.startsWith(\"image/\")) {\n      showToast(\"请选择图片文件\");\n      return;\n    }\n    if (file.size > MAX_AVATAR_BYTES) {\n      showToast(\"图片不能超过 5MB\");\n      return;\n    }\n    const reader = new FileReader();\n    reader.onload = () => callback(String(reader.result || \"\"), file);\n    reader.onerror = () => showToast(\"图片读取失败\");\n    reader.readAsDataURL(file);\n  }\n\n  function openCharacterUpload() {\n    const fileInput = root.querySelector(\"[data-character-file]\");\n    if (fileInput) fileInput.click();\n  }\n\n  function openUserAvatarUpload() {\n    const fileInput = root.querySelector(\"[data-user-avatar-file]\");\n    if (fileInput) fileInput.click();\n  }\n\n  async function clearUserAvatar() {\n    await setUserAvatarOverride(\"\");\n    showToast(\"\\u5df2\\u6062\\u590d\\u89d2\\u8272\\u521b\\u5efa\\u5934\\u50cf\");\n  }\n\n  function isElement(value) {\n    return !!(value && value.nodeType === 1 && value.closest);\n  }\n\n  function getApiForAnchor(anchor) {\n    const targetRoot = isElement(anchor) ? anchor.closest(\"[data-main-text-root]\") : null;\n    return targetRoot && targetRoot.__dmtApi ? targetRoot.__dmtApi : root.__dmtApi;\n  }\n\n  function getEventAnchor() {\n    try {\n      return window.event && window.event.target;\n    } catch (_) {\n      return null;\n    }\n  }\n\n  function resolveCall(firstArg, args, fallbackMethod) {\n    const hasAnchor = isElement(firstArg);\n    const api = getApiForAnchor(hasAnchor ? firstArg : getEventAnchor());\n    return {\n      api,\n      args: hasAnchor ? args.slice(1) : args,\n      method: api && api[fallbackMethod],\n    };\n  }\n\n  function exposeControls() {\n    const api = {\n      applyTheme,\n      applyFont,\n      adjustFontSize,\n      adjustDialogueSize,\n      openUserAvatarUpload,\n      clearUserAvatar,\n      openCharacterUpload,\n      saveCustomCharacter,\n      renderReader,\n    };\n    root.__dmtApi = api;\n\n    const install = (globalName, methodName) => {\n      window[globalName] = function (...args) {\n        const resolved = resolveCall(args[0], args, methodName);\n        return typeof resolved.method === \"function\" ? resolved.method.apply(resolved.api, resolved.args) : undefined;\n      };\n    };\n\n    install(\"dmtApplyTheme\", \"applyTheme\");\n    install(\"setTheme\", \"applyTheme\");\n    install(\"dmtApplyFont\", \"applyFont\");\n    install(\"dmtAdjustFontSize\", \"adjustFontSize\");\n    install(\"adjustReadingFontSize\", \"adjustFontSize\");\n    install(\"dmtAdjustDialogueSize\", \"adjustDialogueSize\");\n    install(\"dmtUploadUserAvatar\", \"openUserAvatarUpload\");\n    install(\"dmtClearUserAvatar\", \"clearUserAvatar\");\n    install(\"dmtUploadCharacterAvatar\", \"openCharacterUpload\");\n    install(\"dmtSaveCustomCharacter\", \"saveCustomCharacter\");\n    install(\"dmtRenderMainText\", \"renderReader\");\n  }\n\n  function bindSettings() {\n    const panel = root.querySelector(\"[data-settings-panel]\");\n    const toggle = root.querySelector(\"[data-settings-toggle]\");\n    const topbarActions = root.querySelector(\".dmt-topbar-actions\");\n    if (toggle && panel) {\n      document.addEventListener(\"click\", event => {\n        if (!panel.classList.contains(\"is-open\")) return;\n        if (panel.contains(event.target) || toggle.contains(event.target) || (topbarActions && topbarActions.contains(event.target))) return;\n        panel.classList.remove(\"is-open\");\n      });\n    }\n\n    const fileInput = root.querySelector(\"[data-character-file]\");\n    const preview = root.querySelector(\"[data-character-preview]\");\n    if (fileInput) {\n      fileInput.addEventListener(\"change\", () => {\n        const file = fileInput.files && fileInput.files[0];\n        readImageFile(file, (dataUrl, blob) => {\n          pendingCharacterAvatar = dataUrl;\n          pendingCharacterAvatarBlob = blob;\n          if (preview) {\n            preview.src = dataUrl;\n            preview.classList.add(\"has-preview\");\n          }\n          showToast(\"角色头像已读取\");\n        });\n      });\n    }\n\n    const userFile = root.querySelector(\"[data-user-avatar-file]\");\n    if (userFile) {\n      userFile.addEventListener(\"change\", () => {\n        const file = userFile.files && userFile.files[0];\n        readImageFile(file, async (dataUrl, blob) => {\n          const saved = await setUserAvatarOverride(dataUrl, blob);\n          showToast(saved ? \"玩家头像已保存\" : \"头像保存失败，请换一张更小的图片\");\n        });\n      });\n    }\n  }\n\n  function openImage(src, meta) {\n    const modal = root.querySelector(\"[data-image-modal]\");\n    const modalImg = root.querySelector(\"[data-modal-image]\");\n    if (!modal || !modalImg || !isSafeImageSrc(src)) return false;\n    if (typeof beforeImageOpen === \"function\" && beforeImageOpen(src, meta || {}) === false) return false;\n    modalImg.src = src;\n    modal.hidden = false;\n    return true;\n  }\n\n  function closeImage() {\n    const modal = root.querySelector(\"[data-image-modal]\");\n    const modalImg = root.querySelector(\"[data-modal-image]\");\n    if (!modal || !modalImg) return;\n    modal.hidden = true;\n    modalImg.removeAttribute(\"src\");\n  }\n\n  function bindImageModal() {\n    const modal = root.querySelector(\"[data-image-modal]\");\n    const close = root.querySelector(\"[data-modal-close]\");\n    if (!modal) return;\n\n    root.addEventListener(\"click\", event => {\n      const target = event.target && event.target.closest ? event.target : null;\n      const img = target && target.closest(\".dmt-image-card img, .dmt-avatar.has-image img\");\n      if (!img) return;\n      openImage(img.src, {\n        alt: img.getAttribute(\"alt\") || \"\",\n        kind: img.closest(\".dmt-avatar\") ? \"avatar\" : \"inline-image\",\n      });\n    });\n\n    if (close) close.addEventListener(\"click\", closeImage);\n    modal.addEventListener(\"click\", event => {\n      if (event.target === modal) closeImage();\n    });\n    document.addEventListener(\"keydown\", event => {\n      if (event.key === \"Escape\" && !modal.hidden) closeImage();\n    });\n  }\n\n  function exposeImageInterface() {\n    const api = {\n      open: openImage,\n      close: closeImage,\n      setBeforeOpen(handler) {\n        beforeImageOpen = typeof handler === \"function\" ? handler : null;\n      },\n    };\n    window.DouluoMainTextImageModal = api;\n    window.DouluoMainTextAvatarModal = api;\n  }\n\n  function init() {\n    exposeControls();\n    exposeImageInterface();\n    exposePlayerAvatarInterface();\n    applyTheme(storageGet(STORAGE.theme, window.__dlMainTextTheme || \"starsea\"));\n    applyFont(storageGet(STORAGE.font, \"theme\"));\n    setFontSize(storageGet(STORAGE.fontSize, \"18\"));\n    setDialogueSize(storageGet(STORAGE.dialogueSize, \"16\"));\n    bindSettings();\n    bindImageModal();\n    bindSharedAvatarUpdates();\n    renderReader();\n    const ready = () => document.body.classList.remove(\"dmt-preload\");\n    if (typeof requestAnimationFrame === \"function\") requestAnimationFrame(ready);\n    else setTimeout(ready, 0);\n  }\n\n  init();\n})();\n";
  const COVER_DATABASE_TEMPLATE = null;
  const COVER_PLOT_PRESET = null;

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
  const ROOT_SELECTOR_ALL = [
    "[data-cover-root]",
    "[data-root]",
    "[data-main-text-root]",
    "[data-dlou-helper-root]",
  ].join(",");
  const IGNORED_TEXT_SELECTOR = [
    ROOT_SELECTOR_ALL,
    "[data-dls-root]",
    "[data-douluo-status-helper]",
    ".dls-status-helper-host",
    ".dls-status-helper-panel",
    ".dls-root",
    ".dmt-root",
    ".ds8",
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
  const MAIN_TEXT_RE = /^(?![\s\S]*<[a-z][\w:-]*(?:\s+[^<>]*)?\s+data-dl(?:s|github)-root\b)[\s\S]*?((?:<content\b[^>]*>[\s\S]*?<\/content>\s*)+)[\s\S]*$/;

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
    scanRuns: 0,
    reportedNoMatch: false,
  };

  const doneAttr = `dlou${toDatasetToken(MODULE_KIND)}Mounted`;
  const hashAttr = `dlou${toDatasetToken(MODULE_KIND)}Hash`;

  function toDatasetToken(value) {
    return String(value || "")
      .replace(/(^|[-_])([a-z])/g, (_, __, char) => char.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, "");
  }

  function notify(message, type = "info") {
    try {
      const detail = { module: MODULE_KIND, script: SCRIPT_NAME, message, type };
      document.dispatchEvent(new CustomEvent("douluo:ui-helper-status", { detail }));
    } catch (_) {
      // SillyTavern may run helpers in constrained iframes; status is optional.
    }
    const method = type === "error" ? "warn" : "log";
    try {
      console[method](`[${SCRIPT_NAME}] ${message}`);
    } catch (_) {}
  }

  function rememberError(error, label) {
    const text = error && error.message ? error.message : String(error || "Unknown error");
    state.lastError = `${label}: ${text}`;
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

  function ensureStyle() {
    if (!CSS || document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function runInlineApp(root, code, label) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = code;
    root.appendChild(script);
    script.remove();
    notify(`${label} rendered`);
  }

  function nodesFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = String(html || "").trim();
    return Array.from(template.content.childNodes);
  }

  function firstRootFromHtml(html, selector) {
    const nodes = nodesFromHtml(html);
    const wrapper = document.createElement("div");
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

  function prepareMountHost(target, raw, capture) {
    const hash = stableHash(`${MODULE_KIND}\n${capture || ""}\n${raw || ""}`);
    if (target.dataset[doneAttr] === "1" && target.dataset[hashAttr] === hash) {
      return null;
    }
    clearElement(target);
    target.dataset[doneAttr] = "1";
    target.dataset[hashAttr] = hash;
    target.dataset.dlouHelperModule = MODULE_KIND;
    return hash;
  }

  function mountCover(target, raw) {
    ensureStyle();
    window.__DLOU_COVER_DATABASE_TEMPLATE = COVER_DATABASE_TEMPLATE || "";
    window.__DLOU_COVER_PLOT_PRESET = COVER_PLOT_PRESET || "";
    const root = firstRootFromHtml(HTML, ROOT_SELECTOR);
    if (!root) throw new Error("Cover root not found");
    if (!prepareMountHost(target, raw, "")) return true;
    root.dataset.dlouHelperRoot = MODULE_KIND;
    target.appendChild(root);
    runInlineApp(
      root,
      `(function(){\nconst SL_COVER_DATABASE_TEMPLATE = window.__DLOU_COVER_DATABASE_TEMPLATE || "";\nconst SL_COVER_PLOT_PRESET = window.__DLOU_COVER_PLOT_PRESET || "";\n${APP_JS}\n})();`,
      "Cover"
    );
    return true;
  }

  function mountCharacterCreate(target, raw) {
    ensureStyle();
    const root = firstRootFromHtml(HTML, ROOT_SELECTOR);
    if (!root) throw new Error("Character create root not found");
    if (!prepareMountHost(target, raw, "")) return true;
    root.dataset.dlouHelperRoot = MODULE_KIND;
    target.appendChild(root);
    runInlineApp(root, APP_JS, "Character create");
    return true;
  }

  function cssAttrValue(value) {
    return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  function ensureHeadLinks(linksHtml) {
    const tmp = document.createElement("template");
    tmp.innerHTML = linksHtml;
    tmp.content.querySelectorAll("link").forEach((link) => {
      const href = link.getAttribute("href");
      const rel = link.getAttribute("rel") || "";
      if (!href) return;
      const selector = `link[href="${cssAttrValue(href)}"][rel="${cssAttrValue(rel)}"]`;
      if (document.head.querySelector(selector)) return;
      document.head.appendChild(link.cloneNode(true));
    });
  }

  function installMainTextBootstrap() {
    if (window.__DLOU_MAIN_TEXT_HELPER_BOOTSTRAPPED) return;
    window.__DLOU_MAIN_TEXT_HELPER_BOOTSTRAPPED = true;
    const themeScript = document.createElement("script");
    themeScript.textContent =
      "(function(){try{var b=document.body;if(!b)return;var set=function(){b.dataset.douluoTheme=b.dataset.douluoTheme||'dark';};set();new MutationObserver(set).observe(b,{attributes:true,attributeFilter:['class','data-theme']});}catch(_){}})();";
    (document.head || document.documentElement).appendChild(themeScript);
    themeScript.remove();
  }

  function splitMainTextHtml(html) {
    const headMatch = String(html || "").match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const bodyMatch = String(html || "").match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const head = headMatch ? headMatch[1] : "";
    const body = bodyMatch ? bodyMatch[1] : html;
    return { head, body };
  }

  function mountMainText(target, raw) {
    const match = String(raw || "").match(MAIN_TEXT_RE);
    if (!match) return false;
    const capture = match[1] || "";
    ensureStyle();
    installMainTextBootstrap();
    const parts = splitMainTextHtml(HTML);
    ensureHeadLinks(parts.head);
    const root = firstRootFromHtml(parts.body, ROOT_SELECTOR);
    if (!root) throw new Error("Main text root not found");
    if (!prepareMountHost(target, raw, capture)) return true;
    root.dataset.dlouHelperRoot = MODULE_KIND;
    const rawNode = root.querySelector("[data-raw-content]");
    if (rawNode) rawNode.innerHTML = capture;
    if (!root.dataset.instanceId) {
      root.dataset.instanceId = `helper-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;
    }
    target.appendChild(root);
    runInlineApp(root, APP_JS, "Main text");
    return true;
  }

  function detect(raw) {
    const text = String(raw || "");
    const trimmed = text.trim();
    if (!trimmed) return false;
    if (MODULE_KIND === "main-text") return MAIN_TEXT_RE.test(text);
    return trimmed.includes(MARK_TEXT);
  }

  function mount(target, raw) {
    try {
      if (MODULE_KIND === "cover") return mountCover(target, raw);
      if (MODULE_KIND === "character-create") return mountCharacterCreate(target, raw);
      if (MODULE_KIND === "main-text") return mountMainText(target, raw);
      return false;
    } catch (error) {
      rememberError(error, "Render failed");
      return false;
    }
  }

  function findMessageNode(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return null;
    if (node.matches && node.matches(MESSAGE_SELECTOR)) return node;
    return node.closest ? node.closest(MESSAGE_SELECTOR) : null;
  }

  function findContentContainer(node) {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) return null;
    if (node.matches && node.matches(CONTENT_SELECTOR)) return node;
    return node.querySelector ? node.querySelector(CONTENT_SELECTOR) : null;
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
    const rawNode = node.querySelector(RAW_NODE_SELECTOR);
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
      const preferred = preferModuleRaw(value, value);
      if (detect(preferred)) return preferred;
    }
    return "";
  }

  function markerOnly(value) {
    const text = String(value || "");
    if (MARK_TEXT && text.includes(MARK_TEXT)) return MARK_TEXT;
    return "";
  }

  function preferModuleRaw(text, html) {
    const plain = String(text || "");
    const markup = String(html || "");
    if (MODULE_KIND === "main-text") {
      if (MAIN_TEXT_RE.test(plain)) return plain;
      if (MAIN_TEXT_RE.test(markup)) return markup;
      return plain || markup;
    }
    const plainMarker = markerOnly(plain);
    if (plainMarker) return plainMarker;
    const markupMarker = markerOnly(markup);
    if (markupMarker) return markupMarker;
    return plain || markup;
  }

  function normalizeRawForModule(raw) {
    if (MODULE_KIND === "main-text") return raw;
    return markerOnly(raw) || raw;
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
      return preferModuleRaw(contentText(content), cleanedInnerHtml(content));
    }
    if (node && node.nodeType === Node.ELEMENT_NODE && !isIgnoredTextElement(node)) {
      return preferModuleRaw(contentText(node), cleanedInnerHtml(node));
    }
    return "";
  }

  function getContextChat() {
    try {
      if (window.TavernHelper && typeof window.TavernHelper.getChatMessages === "function") {
        return window.TavernHelper.getChatMessages(0, { include_swipes: true }) || [];
      }
    } catch (_) {}
    try {
      const context =
        window.SillyTavern && typeof window.SillyTavern.getContext === "function"
          ? window.SillyTavern.getContext()
          : null;
      if (context && Array.isArray(context.chat)) return context.chat;
    } catch (_) {}
    return [];
  }

  function normalizeMessageText(message) {
    if (!message) return "";
    if (typeof message === "string") return message;
    return (
      message.mes ||
      message.message ||
      message.content ||
      message.text ||
      message.raw ||
      ""
    );
  }

  function readRawFromContext(node) {
    const index = messageIndexFromNode(node);
    if (index < 0) return "";
    const chat = getContextChat();
    const message = chat[index];
    return normalizeMessageText(message);
  }

  function readRaw(node, fallbackNode) {
    return normalizeRawForModule(readRawFromDom(node, fallbackNode) || readRawFromContext(fallbackNode || node) || "");
  }

  function preview(value) {
    return String(value || "").replace(/\s+/g, " ").trim().slice(0, 180);
  }

  function processCandidate(candidate) {
    if (!candidate || candidate.nodeType !== Node.ELEMENT_NODE) {
      state.lastSkipReason = "not-element";
      return false;
    }
    const messageNode = findMessageNode(candidate) || candidate;
    const target = findContentContainer(candidate) || findContentContainer(messageNode) || messageNode;
    if (!target || target.querySelector(`[data-dlou-helper-root="${MODULE_KIND}"]`)) {
      state.lastSkipReason = "already-mounted";
      return false;
    }
    const raw = readRaw(target, messageNode);
    state.lastRawPreview = preview(raw);
    if (!detect(raw)) {
      state.lastSkipReason = raw ? "no-module-marker" : "empty-raw";
      return false;
    }
    state.lastMatched = state.lastRawPreview;
    state.lastSkipReason = "";
    const didMount = mount(target, raw);
    if (didMount) state.mounted += 1;
    return didMount;
  }

  function collectCandidates(root) {
    const scope = root || document;
    const nodes = new Set();
    if (scope.matches && scope.matches(CONTENT_SELECTOR)) nodes.add(scope);
    if (scope.matches && scope.matches(MESSAGE_SELECTOR)) nodes.add(scope);
    if (scope.querySelectorAll) {
      scope.querySelectorAll(CONTENT_SELECTOR).forEach((node) => nodes.add(node));
      scope.querySelectorAll(MESSAGE_SELECTOR).forEach((node) => nodes.add(node));
    }
    return Array.from(nodes).sort((a, b) => {
      const aMsg = findMessageNode(a) || a;
      const bMsg = findMessageNode(b) || b;
      return messageIndexFromNode(aMsg) - messageIndexFromNode(bMsg);
    });
  }

  function scanNew(options = {}) {
    const latestOnly = Boolean(options.latestOnly);
    const candidates = collectCandidates(options.root || document);
    state.candidateCount = candidates.length;
    state.scanRuns += 1;
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
    state.lastScanAt = Date.now();
    const result = {
      rendered,
      matched,
      candidateCount: candidates.length,
      lastRawPreview: state.lastRawPreview,
      lastSkipReason: state.lastSkipReason,
      lastMatched: state.lastMatched,
    };
    if (!rendered && !state.mounted && !state.reportedNoMatch && state.scanRuns >= 3) {
      state.reportedNoMatch = true;
      notify(
        `No ${MODULE_KIND} render after scan: candidates=${result.candidateCount}, reason=${result.lastSkipReason || "unknown"}, raw="${result.lastRawPreview}"`,
        "warning"
      );
    }
    return result;
  }

  function enqueue(node) {
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
      state.flushTimer = window.setTimeout(flushQueue, 30);
    }
  }

  function flushQueue() {
    state.flushTimer = 0;
    const nodes = Array.from(state.pending);
    state.pending.clear();
    nodes.forEach((node) => processCandidate(node));
  }

  function startObserver() {
    if (state.observed || !document.body) return;
    state.observed = true;
    const observer = new MutationObserver((mutations) => {
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
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    state.observer = observer;
  }

  function scheduleRecoveryScans() {
    [0, 80, 240, 750, 1600, 3200].forEach((delay) => {
      window.setTimeout(() => scanNew({ includeExisting: true }), delay);
    });
  }

  function status() {
    return {
      script: SCRIPT_NAME,
      version: VERSION,
      module: MODULE_KIND,
      mounted: state.mounted,
      observed: state.observed,
      lastError: state.lastError,
      lastScanAt: state.lastScanAt,
      candidateCount: state.candidateCount,
      lastRawPreview: state.lastRawPreview,
      lastSkipReason: state.lastSkipReason,
      lastMatched: state.lastMatched,
      scanRuns: state.scanRuns,
    };
  }

  window[API_NAME] = {
    version: VERSION,
    module: MODULE_KIND,
    detect,
    mount,
    scanNew,
    scanExisting() {
      return scanNew({ includeExisting: true });
    },
    status,
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        startObserver();
        scheduleRecoveryScans();
      },
      { once: true }
    );
  } else {
    startObserver();
    scheduleRecoveryScans();
  }
})();
