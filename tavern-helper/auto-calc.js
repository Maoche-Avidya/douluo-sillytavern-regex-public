// @name         [助手]斗罗大陆 I-IV · Soul Land 自动计算脚本 @0.5
// @module       tavern-helper/auto-calc
// @version      @0.5
// @source       tavern-helper-scripts/auto-calc/dist/latest.json
"use strict";

(function () {
    'use strict';

    const SCRIPT_NAME = '斗罗自动计算脚本';
    const VERSION = '0.4.8';
    const STORAGE_KEY = 'douluo_auto_calc_enabled';
    const LEGACY_STORAGE_KEYS = Object.freeze(['douluo_v03_auto_calc_enabled']);
    const EXTREME_ATTACK_MULTIPLIER = 1.5;

    const CONFIG = {
        debug: false,
        autoIntervalMs: 30000,
        refreshAfterWrite: true,
        defaults: {
            baseAttr: 1,
            lifeCoef: 1,
            mpGrowth: 10,
            spiritGrowth: 10,
            baseSp: 100,
            baseDp: 25,
        },
        tables: {
            player: '玩家状态与信息',
            stats: '人物综合数值面板',
            statsRuntime: '人物运行状态面板',
            traits: '玩家天赋与特性表',
            traitState: '已选特性状态表',
            traitRules: '特性规则扩展表',
            traitAttributeRules: '特性属性改写规则表',
            traitEquipmentSlots: '特性装备栏扩展表',
            traitTempStates: '特性临时状态与乘区表',
            traitStoryProgress: '特性剧情线进度表',
            skills: '玩家通用技能',
            soulOverview: '武魂总览表',
            rings: ['第一武魂', '第二武魂', '第三武魂'],
            soulBones: '魂骨与魂核面板',
            spirits: '魂灵表',
            armor: '斗铠表',
            soulDevices: '魂导器表',
            titlePanel: '称号面板',
            titleLibrary: '称号库',
            notes: '纪要表',
            npcs: '重要NPC档案表',
            npcAbility: 'NPC能力档案表',
            combatState: '战斗与控制状态表',
            taskClues: '任务与线索追踪表',
            locationFactions: '地点与势力关系表',
        },
    };

    const REQUIRED_TEMPLATE_TABLES = Object.freeze(Object.values(CONFIG.tables).flat().filter(Boolean));

    const CORE_RECALC_TABLES = Object.freeze([
        CONFIG.tables.player,
        CONFIG.tables.stats,
        CONFIG.tables.soulOverview,
    ]);

    const DERIVED_STATS_FIELDS = Object.freeze([
        '精神力境界_脚本',
        '血量上限_脚本',
        '蓝量上限_脚本',
        '精神力上限_脚本',
        '肉体_武魂相关_脚本',
        '魂力_武魂相关_脚本',
        '精神_武魂相关_脚本',
        '肉体_最终_脚本',
        '魂力_最终_脚本',
        '精神_最终_脚本',
    ]);

    const DERIVED_PLAYER_FIELDS = Object.freeze([
        '战力标尺定位_脚本',
    ]);

    const QUALITY = [
        { key: '超神级', level: 30, multiplier: 5.0, exp: '500%' },
        { key: '神级', level: 20, multiplier: 3.0, exp: '300%' },
        { key: '顶级', level: 10, multiplier: 2.0, exp: '200%' },
        { key: '高级', level: 7, multiplier: 1.6, exp: '150%' },
        { key: '中级', level: 5, multiplier: 1.3, exp: '100%' },
        { key: '低级', level: 3, multiplier: 1.1, exp: '80%' },
        { key: '废武魂', level: 1, multiplier: 1.0, exp: '50%' },
        { key: '废', level: 1, multiplier: 1.0, exp: '50%' },
    ];

    const RING_TYPE_SCALE = [
        { test: /肉身|肉体|强攻|防御|体魄/, body: 1, soul: 0.25, mind: 0.1, name: '肉身型' },
        { test: /能量|魂力|元素|爆发|远程/, body: 0.25, soul: 1, mind: 0.5, name: '能量型' },
        { test: /精神|灵魂|幻|念|感知/, body: 0.1, soul: 0.5, mind: 1, name: '精神型' },
        { test: /控制|束缚|限制|封印/, body: 0.25, soul: 0.75, mind: 0.75, name: '控制型' },
        { test: /生命|辅助|治疗|恢复|增益/, body: 0.5, soul: 0.75, mind: 0.5, name: '生命/辅助型' },
        { test: /均衡|平衡|泛用/, body: 0.5, soul: 0.5, mind: 0.5, name: '均衡型' },
    ];

    let api = null;
    let timer = null;
    let isWriting = false;
    let lastInputHash = '';
    let pendingAutoRecalc = null;
    let tableUpdateCallback = null;

    function log(...args) {
        if (CONFIG.debug) console.log(`[${SCRIPT_NAME}]`, ...args);
    }

    function toast(message, type = 'info') {
        const t = window.toastr;
        if (t && typeof t[type] === 'function') t[type](message, SCRIPT_NAME);
        else console.log(`[${SCRIPT_NAME}][${type}]`, message);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function hostWindows() {
        const list = [window];
        try {
            if (window.parent && window.parent !== window) list.push(window.parent);
        } catch (_) {}
        try {
            if (window.top && !list.includes(window.top)) list.push(window.top);
        } catch (_) {}
        return list;
    }

    function getHostGlobal(name) {
        for (const host of hostWindows()) {
            try {
                if (host && host[name] !== undefined && host[name] !== null) return host[name];
            } catch (_) {}
        }
        return null;
    }

    function getDatabaseApi() {
        return getHostGlobal('AutoCardUpdaterAPI');
    }

    function getSillyTavernContext() {
        for (const host of hostWindows()) {
            try {
                if (host.SillyTavern && typeof host.SillyTavern.getContext === 'function') return host.SillyTavern.getContext();
            } catch (_) {}
        }
        const getter = getHostGlobal('getContext');
        try {
            if (typeof getter === 'function') return getter();
        } catch (_) {}
        return null;
    }

    async function waitForDatabaseApi(timeoutMs = 20000) {
        const start = Date.now();
        while (Date.now() - start < timeoutMs) {
            const found = getDatabaseApi();
            if (found) return found;
            await sleep(500);
        }
        return null;
    }

    function asText(value) {
        if (value === undefined || value === null) return '';
        return String(value).trim();
    }

    function yes(value) {
        const text = asText(value);
        return /^(是|启用|已启用|显示|已显示|true|yes|y|1)$/i.test(text);
    }

    function no(value) {
        const text = asText(value);
        return /^(否|禁用|未启用|隐藏|未显示|false|no|n|0)$/i.test(text);
    }

    function empty(value) {
        const text = asText(value);
        return !text || /^(无|空|未定|待定|待填写|null|undefined|-|0\/0)$/i.test(text);
    }

    function num(value, fallback = 0) {
        if (typeof value === 'number') return Number.isFinite(value) ? value : fallback;
        const text = asText(value).replace(/,/g, '');
        if (!text) return fallback;
        const match = text.match(/-?\d+(?:\.\d+)?/);
        if (!match) return fallback;
        const n = Number(match[0]);
        return Number.isFinite(n) ? n : fallback;
    }

    function round(value, digits = 2) {
        const factor = Math.pow(10, digits);
        return Math.round((Number(value) || 0) * factor) / factor;
    }

    function bonus(body = 0, soul = 0, mind = 0) {
        return { body, soul, mind };
    }

    function resBonus(hp = 0, mp = 0, spirit = 0) {
        return { hp, mp, spirit };
    }

    function addTri(target, source, scale = 1) {
        target.body += (Number(source.body) || 0) * scale;
        target.soul += (Number(source.soul) || 0) * scale;
        target.mind += (Number(source.mind) || 0) * scale;
        return target;
    }

    function addRes(target, source, scale = 1) {
        target.hp += (Number(source.hp) || 0) * scale;
        target.mp += (Number(source.mp) || 0) * scale;
        target.spirit += (Number(source.spirit) || 0) * scale;
        return target;
    }

    function stableHash(value) {
        const seen = new WeakSet();
        const text = JSON.stringify(value, (key, val) => {
            if (key === '__raw' || key === '__rowIndex') return undefined;
            if (key && /_脚本$/.test(key)) return undefined;
            if (key === '计算备注' || key === '加成计算备注' || key === '战力标尺定位_脚本') return undefined;
            if (val && typeof val === 'object') {
                if (seen.has(val)) return '[Circular]';
                seen.add(val);
                if (!Array.isArray(val)) {
                    return Object.keys(val).sort().reduce((out, k) => {
                        out[k] = val[k];
                        return out;
                    }, {});
                }
            }
            return val;
        });
        let hash = 2166136261;
        for (let i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return (hash >>> 0).toString(36);
    }

    function getSheet(db, tableName) {
        if (!db || !tableName) return null;
        if (db[tableName]) return db[tableName];
        for (const [key, value] of Object.entries(db)) {
            if (key === tableName) return value;
            if (value && typeof value === 'object' && value.name === tableName) return value;
        }
        if (Array.isArray(db.tables)) {
            return db.tables.find(t => t && (t.name === tableName || t.uid === tableName)) || null;
        }
        return null;
    }

    function missingTables(db, tableNames = REQUIRED_TEMPLATE_TABLES) {
        return tableNames.filter(tableName => !getSheet(db, tableName));
    }

    function databaseRepairHint(missing) {
        const listed = missing.slice(0, 6).join('、');
        const suffix = missing.length > 6 ? ` 等${missing.length}张表` : '';
        return `数据库模板/同步状态不完整，缺少：${listed}${suffix}。请重新注入最新 28 表 TavernDB 模板，执行数据清洗后调用 refreshDataAndWorldbook()，再手动重算。`;
    }

    function verifyDatabaseReady(db, tableNames = CORE_RECALC_TABLES) {
        const missing = missingTables(db, tableNames);
        if (!missing.length) return { ok: true, missing: [], message: '' };
        return { ok: false, missing, message: databaseRepairHint(missing) };
    }

    function rowToObject(headers, row, rowIndex) {
        const out = { __rowIndex: rowIndex, __raw: row };
        headers.forEach((header, index) => {
            out[header] = Array.isArray(row) ? row[index] : row?.[header];
        });
        return out;
    }

    function rowsFromSheet(sheet) {
        if (!sheet) return [];
        if (Array.isArray(sheet)) {
            if (!sheet.length) return [];
            if (Array.isArray(sheet[0])) {
                const headers = sheet[0].map(asText);
                return sheet.slice(1).map((row, idx) => rowToObject(headers, row, idx + 1));
            }
            return sheet.map((row, idx) => ({ ...row, __rowIndex: idx + 1 }));
        }
        if (Array.isArray(sheet.content)) {
            if (!sheet.content.length) return [];
            const headers = sheet.content[0].map(asText);
            return sheet.content.slice(1).map((row, idx) => rowToObject(headers, row, idx + 1));
        }
        if (Array.isArray(sheet.rows)) return sheet.rows.map((row, idx) => ({ ...row, __rowIndex: idx + 1 }));
        if (Array.isArray(sheet.data)) return sheet.data.map((row, idx) => ({ ...row, __rowIndex: idx + 1 }));
        return [];
    }

    function rows(db, tableName) {
        return rowsFromSheet(getSheet(db, tableName));
    }

    function tableHeaders(db, tableName) {
        const sheet = getSheet(db, tableName);
        if (sheet && Array.isArray(sheet.content) && Array.isArray(sheet.content[0])) return sheet.content[0].map(asText);
        if (Array.isArray(sheet) && Array.isArray(sheet[0])) return sheet[0].map(asText);
        return [];
    }

    function sanitizeWriteData(data = {}) {
        return Object.fromEntries(Object.entries(data || {}).map(([key, value]) => [key, value == null ? '' : value]));
    }

    function completeInsertData(tableName, data = {}) {
        const currentDb = api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : null;
        const headers = tableHeaders(currentDb, tableName);
        if (!headers.length) return sanitizeWriteData(data);

        const out = {};
        for (const header of headers) {
            if (!header || header === 'row_id') continue;
            out[header] = data[header] == null ? '' : data[header];
        }
        for (const [key, value] of Object.entries(data || {})) {
            out[key] = value == null ? '' : value;
        }
        return out;
    }

    function firstRow(db, tableName) {
        return rows(db, tableName)[0] || {};
    }

    function runtimeStatsTableName(db) {
        return getSheet(db, CONFIG.tables.statsRuntime) ? CONFIG.tables.statsRuntime : CONFIG.tables.stats;
    }

    function runtimeStatsRow(db, statsRow = null) {
        return firstRow(db, runtimeStatsTableName(db)) || statsRow || {};
    }

    const RUNTIME_ROW_DEFAULTS = Object.freeze({
        '血量当前': '',
        '蓝量当前': '',
        '精神力当前': '',
        '特性点': '',
        '红尘点': '',
        '武魂真身状态': '否',
        '其他增减益': '',
        '领域/持续状态': '',
        '控制/异常状态': '',
        '自动计算锁定': '否',
        '计算备注': '',
    });

    function runtimeRowDefaults(data = {}) {
        return { ...RUNTIME_ROW_DEFAULTS, ...data };
    }

    function runtimeRowNullRepair(existingRow, data = {}) {
        const out = { ...data };
        for (const [field, value] of Object.entries(RUNTIME_ROW_DEFAULTS)) {
            if (!existingRow || existingRow[field] === undefined || existingRow[field] === null) out[field] = value;
        }
        return out;
    }

    const COLUMN_ALIASES = {
        'row_id': ['行编号'],
        '行编号': ['row_id'],
        '槽位ID': ['槽位编号'],
        '槽位编号': ['槽位ID'],
        '其他Buff': ['其他增减益'],
        '其他增减益': ['其他Buff'],
        '特性点': ['剩余SP', 'SP剩余', 'spRemain'],
        '红尘点': ['剩余DP', 'DP剩余', 'dpRemain'],
        '是否显示_脚本': ['是否显示'],
        '武魂品级': ['武魂品质'],
        '武魂品质': ['武魂品级'],
    };

    function columnCandidates(name) {
        return [name, ...(COLUMN_ALIASES[name] || [])];
    }

    function cell(row, ...names) {
        for (const name of names) {
            for (const candidate of columnCandidates(name)) {
                if (row && row[candidate] !== undefined && row[candidate] !== null && row[candidate] !== '') return row[candidate];
            }
        }
        return '';
    }

    function missingDerivedFields(row, fields) {
        return fields.filter(field => empty(cell(row, field)));
    }

    function derivedFieldsMissing(statsRow, playerRow) {
        return missingDerivedFields(statsRow, DERIVED_STATS_FIELDS).length > 0
            || (playerRow && playerRow.__rowIndex && missingDerivedFields(playerRow, DERIVED_PLAYER_FIELDS).length > 0);
    }

    function verifyDerivedWrite(db, expectPlayer) {
        const issues = missingDerivedFields(firstRow(db, CONFIG.tables.stats), DERIVED_STATS_FIELDS)
            .map(field => `${CONFIG.tables.stats}.${field}`);
        if (expectPlayer) {
            issues.push(...missingDerivedFields(firstRow(db, CONFIG.tables.player), DERIVED_PLAYER_FIELDS)
                .map(field => `${CONFIG.tables.player}.${field}`));
        }
        return issues;
    }

    function qualityInfo(value) {
        const text = asText(value);
        for (const item of QUALITY) {
            if (text.includes(item.key)) return item;
        }
        return QUALITY[QUALITY.length - 1];
    }

    function compositeMultiplier(totalInnate, hasSuperGod) {
        const v = Math.max(0, Math.floor(Number(totalInnate) || 0));
        if (v >= 30) return hasSuperGod ? 5.0 : 4.5;
        if (v >= 25) return 4.0;
        if (v >= 20) return 3.0;
        if (v >= 15) return 2.5;
        if (v >= 10) return 2.0;
        if (v >= 7) return 1.6;
        if (v >= 5) return 1.3;
        if (v >= 3) return 1.1;
        return 1.0;
    }

    function parseLevel(statsRow, playerRow) {
        const text = asText(cell(statsRow, '魂力等级')) || asText(cell(playerRow, '魂力等级'));
        const n = num(text, NaN);
        if (Number.isFinite(n)) return Math.max(1, Math.floor(n));
        return 1;
    }

    function cappedGrowthLevel(level) {
        return Math.max(1, Math.min(200, Math.floor(Number(level) || 1)));
    }

    function pointGrowthForLevel(level) {
        const lv = cappedGrowthLevel(level);
        return {
            level: lv,
            sp: Math.max(0, Math.min(lv, 100) - 1) + Math.max(0, lv - 100) * 2,
            dp: Math.floor(lv / 5),
        };
    }

    function parsePointLedger(note) {
        const match = asText(note).match(/点数成长=等级(\d+);SP累计(\d+);DP累计(\d+)/);
        return match
            ? { level: Number(match[1]) || 1, sp: Number(match[2]) || 0, dp: Number(match[3]) || 0 }
            : { level: 1, sp: 0, dp: 0 };
    }

    function readPointRemain(runtimeRow) {
        const spText = cell(runtimeRow, '特性点', '剩余SP', 'SP剩余', 'spRemain');
        const dpText = cell(runtimeRow, '红尘点', '剩余DP', 'DP剩余', 'dpRemain');
        return {
            sp: num(spText, CONFIG.defaults.baseSp),
            dp: num(dpText, CONFIG.defaults.baseDp),
        };
    }

    function pointGrowthState(statsRow, runtimeRow, playerRow) {
        const level = parseLevel(statsRow, playerRow);
        const remain = readPointRemain(runtimeRow);
        const earned = pointGrowthForLevel(level);
        const ledger = parsePointLedger(cell(runtimeRow, '计算备注'));
        const applied = {
            level: Math.max(ledger.level, earned.level),
            sp: Math.max(ledger.sp, earned.sp),
            dp: Math.max(ledger.dp, earned.dp),
        };
        const delta = {
            sp: Math.max(0, earned.sp - ledger.sp),
            dp: Math.max(0, earned.dp - ledger.dp),
        };
        const after = {
            sp: remain.sp + delta.sp,
            dp: remain.dp + delta.dp,
        };

        return {
            level,
            remain,
            earned,
            applied,
            delta,
            after,
            note: `点数成长=等级${applied.level};SP累计${applied.sp};DP累计${applied.dp};本次+SP${delta.sp}/DP${delta.dp}`,
        };
    }

    async function getPointState() {
        api = getDatabaseApi() || api || await waitForDatabaseApi();
        if (!api) return null;
        const db = api.exportTableAsJson();
        const statsRow = firstRow(db, CONFIG.tables.stats);
        const runtimeRow = runtimeStatsRow(db, statsRow);
        const playerRow = firstRow(db, CONFIG.tables.player);
        return pointGrowthState(statsRow, runtimeRow, playerRow);
    }

    function soulRealm(level) {
        const lv = Math.max(1, Math.floor(Number(level) || 1));
        if (lv >= 100) return '神级';
        if (lv >= 99) return '极限斗罗';
        if (lv >= 95) return '超级斗罗';
        if (lv >= 91) return '封号斗罗';
        if (lv >= 81) return '魂斗罗';
        if (lv >= 71) return '魂圣';
        if (lv >= 61) return '魂帝';
        if (lv >= 51) return '魂王';
        if (lv >= 41) return '魂宗';
        if (lv >= 31) return '魂尊';
        if (lv >= 21) return '大魂师';
        if (lv >= 11) return '魂师';
        return '魂士';
    }

    function spiritRealm(points) {
        const v = Number(points) || 0;
        if (v >= 50000) return '神元境';
        if (v >= 20000) return '灵域境';
        if (v >= 5000) return '灵渊境';
        if (v >= 500) return '灵海境';
        if (v >= 51) return '灵通境';
        return '灵元境';
    }

    function battleScale(body, soul, mind) {
        const max = Math.max(Number(body) || 0, Number(soul) || 0, Number(mind) || 0);
        if (max >= 10000) return '神级 / 百万年概念体 / 法则级';
        if (max >= 5000) return '极限斗罗 / 半神，凡界顶点';
        if (max >= 1000) return '魂斗罗 - 弱封号，战略级';
        if (max >= 300) return '魂圣，武魂真身，人形凶兽';
        if (max >= 50) return '魂尊 / 魂宗，小规模战场核心';
        if (max >= 10) return '初级魂师及格线，初步超凡';
        return '普通人水平';
    }

    function parseYear(value, color = '') {
        const text = asText(value);
        if (/百万/.test(text)) {
            const n = num(text, 1);
            return Math.max(1, n) * 1000000;
        }
        const wan = text.match(/(\d+(?:\.\d+)?)\s*万/);
        if (wan) return Number(wan[1]) * 10000;
        const n = num(text, NaN);
        if (Number.isFinite(n)) return n;
        const c = asText(color);
        if (/金|百万/.test(c)) return 1000000;
        if (/红|十万/.test(c)) return 100000;
        if (/黑|万/.test(c)) return 10000;
        if (/紫|千/.test(c)) return 1000;
        if (/黄|百/.test(c)) return 100;
        if (/白|十年/.test(c)) return 10;
        return 0;
    }

    function ringBaseValue(year, color = '') {
        const y = Number(year) || 0;
        if (y >= 1000000 || /金|百万/.test(asText(color))) return 350;
        if (y >= 100000) return 150 + Math.floor((y - 100000) / 100000) * 10;
        if (y >= 10000) return 50 + Math.floor((y - 10000) / 10000) * 5;
        if (y >= 1000) return 20 + Math.floor((y - 1000) / 1000) * 2;
        if (y >= 100) return 5 + Math.floor((y - 100) / 100) * 0.5;
        if (y >= 10) return 1 + Math.floor(y / 10) * 0.1;
        const c = asText(color);
        if (/红|十万/.test(c)) return 150;
        if (/黑|万/.test(c)) return 50;
        if (/紫|千/.test(c)) return 20;
        if (/黄|百/.test(c)) return 5;
        if (/白|十年/.test(c)) return 1;
        return 0;
    }

    function ringTypeScale(type) {
        const text = asText(type);
        const found = RING_TYPE_SCALE.find(item => item.test.test(text));
        return found || { body: 0.5, soul: 0.5, mind: 0.5, name: '均衡型' };
    }

    function parseTriBonus(text) {
        const out = bonus();
        const raw = asText(text);
        if (!raw) return out;

        if (/全属性|三维|全部属性/.test(raw)) {
            const n = num(raw, 0);
            out.body += n;
            out.soul += n;
            out.mind += n;
        }

        const pairs = raw.split(/[;；,\n，]/).map(s => s.trim()).filter(Boolean);
        for (const pair of pairs) {
            const value = num(pair, NaN);
            if (!Number.isFinite(value)) continue;
            if (/肉体|肉身|体魄|力量|气血|防御/.test(pair)) out.body += value;
            else if (/魂力|蓝|能量|法力/.test(pair)) out.soul += value;
            else if (/精神|灵魂|神识|意志/.test(pair)) out.mind += value;
        }
        return out;
    }

    function parseResourceBonus(text) {
        const out = resBonus();
        const raw = asText(text);
        if (!raw) return out;
        const pairs = raw.split(/[;；,\n，]/).map(s => s.trim()).filter(Boolean);
        for (const pair of pairs) {
            const value = num(pair, NaN);
            if (!Number.isFinite(value)) continue;
            if (/血|生命|HP/i.test(pair)) out.hp += value;
            else if (/蓝|魂力|MP|法力|能量/i.test(pair)) out.mp += value;
            else if (/精神力|精神上限|灵魂/i.test(pair)) out.spirit += value;
        }
        return out;
    }

    function formatTri(value) {
        return `肉体:${round(value.body)};魂力:${round(value.soul)};精神:${round(value.mind)}`;
    }

    function traitName(row) {
        return asText(cell(row, '特性名称', '来源特性名称'));
    }

    function collectTraits(db) {
        const stateRows = rows(db, CONFIG.tables.traitState);
        const names = new Set();
        if (stateRows.length) {
            for (const row of stateRows) {
                const name = traitName(row);
                if (name && !no(cell(row, '是否启用'))) names.add(name);
            }
        } else {
            for (const row of rows(db, CONFIG.tables.traits)) {
                const name = traitName(row);
                if (name) names.add(name);
            }
        }
        return names;
    }

    function hasTrait(traits, pattern) {
        for (const name of traits) {
            if (pattern.test(name)) return true;
        }
        return false;
    }

    function traitMatchesSource(traits, source) {
        const text = asText(source);
        if (!text) return true;
        if (/武魂属性效果|规则属性汇总/.test(text)) return true;
        return Array.from(traits).some(name => name.includes(text) || text.includes(name));
    }

    function attrKey(value) {
        const text = asText(value);
        if (/肉体|肉身|体魄|力量|body/i.test(text)) return 'body';
        if (/魂力|蓝|能量|法力|soul/i.test(text)) return 'soul';
        if (/精神|灵魂|神识|意志|mind|spirit/i.test(text)) return 'mind';
        return '';
    }

    function collectTraitAttributeRules(db, traits) {
        const rules = [];
        for (const row of rows(db, CONFIG.tables.traitAttributeRules)) {
            if (no(cell(row, '是否启用'))) continue;
            if (!traitMatchesSource(traits, cell(row, '来源特性名称'))) continue;
            rules.push({
                sourceTrait: traitName(row),
                type: asText(cell(row, '规则类型')),
                stage: asText(cell(row, '作用阶段')),
                source: attrKey(cell(row, '来源属性')),
                target: attrKey(cell(row, '目标属性')),
                formula: asText(cell(row, '结算公式/参数')),
                cap: asText(cell(row, '上限/下限')),
                priority: num(cell(row, '优先级'), 100),
            });
        }
        return rules.sort((a, b) => a.priority - b.priority);
    }

    function builtinConversionRules(traits, attrRules = []) {
        const rules = [];
        const hasStructuredRule = (source, target) => attrRules.some(rule => rule && rule.source === source && rule.target === target);
        if (hasTrait(traits, /天与魂缚|天与咒缚|荒古圣体/) && !hasStructuredRule('soul', 'body')) {
            rules.push({ sourceTrait: '内置:魂力转肉体', type: '属性转换', source: 'soul', target: 'body', stage: 'all', priority: 1000 });
        }
        if (hasTrait(traits, /体修无上|数值怪|力道.*宗师/) && !hasStructuredRule('mind', 'body')) {
            rules.push({ sourceTrait: '内置:精神转肉体', type: '属性转换', source: 'mind', target: 'body', stage: 'all', priority: 1001 });
        }
        if (hasTrait(traits, /魂魄之躯|魂魄替代/) && !hasStructuredRule('body', 'mind')) {
            rules.push({ sourceTrait: '内置:肉体转精神', type: '属性转换', source: 'body', target: 'mind', stage: 'all', priority: 1002 });
        }
        return rules;
    }

    function ruleAppliesToStage(rule, stage) {
        const text = asText(rule.stage || 'all');
        if (!text || /all|全部|任意/.test(text)) return true;
        const explicitStage = text.match(/(?:\/|:)(base|martial|other|final|resource|daily)\b/i);
        if (explicitStage) return stage === explicitStage[1].toLowerCase();
        if (/onBeforeStatRecalc|onAfterStatRecalc|重算|自动计算/.test(text)) return true;
        if (stage === 'base') return /基础|base|等级|突破/.test(text);
        if (stage === 'martial') return /武魂|魂环|魂骨|martial/.test(text);
        if (stage === 'other') return /其余|装备|other/.test(text);
        if (stage === 'final') return /最终|final|乘区/.test(text);
        if (stage === 'resource') return /资源|血|蓝|精神力|resource|hp|mp/.test(text);
        if (stage === 'daily') return /日常|六维|daily|检定/.test(text);
        return text.includes(stage);
    }

    function applyConversionToTri(tri, traits, attrRules = [], diagnostics = [], stage = 'all') {
        const out = { ...tri };
        const conversionRules = [...attrRules, ...builtinConversionRules(traits, attrRules)];
        for (const rule of conversionRules) {
            if (!ruleAppliesToStage(rule, stage)) continue;
            const type = asText(rule.type);
            const from = rule.source;
            const to = rule.target;
            if (!from || !to) continue;
            if (/转换|convert/i.test(type)) {
                out[to] += out[from];
                out[from] = 0;
                diagnostics.push(`${rule.sourceTrait || '属性规则'}:${from}->${to}`);
            } else if (/替代|replace/i.test(type)) {
                out[to] = out[from];
                diagnostics.push(`${rule.sourceTrait || '属性规则'}:${to}=replace(${from})`);
            } else if (/锁定|上限/.test(type) && Number.isFinite(num(rule.cap, NaN))) {
                out[from] = Math.min(out[from], num(rule.cap, out[from]));
                diagnostics.push(`${rule.sourceTrait || '属性规则'}:${from} cap ${rule.cap}`);
            }
        }
        return out;
    }

    const PATH_ALIASES = {
        '肉体': 'final.body',
        '魂力': 'final.soul',
        '精神': 'final.mind',
        '基础肉体': 'base.body',
        '基础魂力': 'base.soul',
        '基础精神': 'base.mind',
        '武魂肉体': 'martial.body',
        '武魂魂力': 'martial.soul',
        '武魂精神': 'martial.mind',
        '最终肉体': 'final.body',
        '最终魂力': 'final.soul',
        '最终精神': 'final.mind',
        '血量上限': 'resource.hpMax',
        '蓝量上限': 'resource.mpMax',
        '精神力上限': 'resource.spiritMax',
    };

    function normalizePath(path, defaultScope = 'final') {
        const raw = asText(path).replace(/[：:]/g, '.');
        if (PATH_ALIASES[raw]) return PATH_ALIASES[raw];
        const mapped = raw
            .replace(/肉体/g, 'body')
            .replace(/魂力/g, 'soul')
            .replace(/精神力/g, 'spiritMax')
            .replace(/精神/g, 'mind')
            .replace(/血量上限/g, 'hpMax')
            .replace(/蓝量上限/g, 'mpMax');
        if (/^(base|martial|other|final|resource|daily|flags)\./.test(mapped)) return mapped;
        if (/^(body|soul|mind)$/.test(mapped)) return `${defaultScope}.${mapped}`;
        return mapped;
    }

    function pathGet(ctx, path) {
        const parts = normalizePath(path).split('.');
        let cur = ctx;
        for (const part of parts) {
            if (!cur || cur[part] === undefined) return undefined;
            cur = cur[part];
        }
        return cur;
    }

    function pathSet(ctx, path, value) {
        const parts = normalizePath(path).split('.');
        let cur = ctx;
        for (let i = 0; i < parts.length - 1; i += 1) {
            const part = parts[i];
            if (!cur[part] || typeof cur[part] !== 'object') cur[part] = {};
            cur = cur[part];
        }
        cur[parts[parts.length - 1]] = value;
    }

    function executeDslStatement(ctx, statement, diagnostics = [], source = 'DSL') {
        const text = asText(statement);
        if (!text) return;
        let match = text.match(/^(.+?)\s*(\+=|-=|\*=|=)\s*(-?\d+(?:\.\d+)?)$/);
        if (match) {
            const path = normalizePath(match[1]);
            const op = match[2];
            const value = Number(match[3]);
            const current = Number(pathGet(ctx, path)) || 0;
            if (op === '+=') pathSet(ctx, path, current + value);
            else if (op === '-=') pathSet(ctx, path, current - value);
            else if (op === '*=') pathSet(ctx, path, current * value);
            else pathSet(ctx, path, value);
            diagnostics.push(`${source}:${path}${op}${value}`);
            return;
        }
        match = text.match(/^(capMin|capMax)\((.+?),\s*(-?\d+(?:\.\d+)?)\)$/i);
        if (match) {
            const fn = match[1], path = normalizePath(match[2]), value = Number(match[3]), current = Number(pathGet(ctx, path)) || 0;
            pathSet(ctx, path, fn.toLowerCase() === 'capmin' ? Math.max(current, value) : Math.min(current, value));
            diagnostics.push(`${source}:${fn}(${path},${value})`);
            return;
        }
        match = text.match(/^(convertTo|replaceWith)\((.+?),\s*(.+?)\)$/i) || text.match(/^(.+?)\s+(convertTo|replaceWith)\s+(.+)$/i);
        if (match) {
            const fn = /^convert|^replace/i.test(match[1]) ? match[1] : match[2];
            const from = normalizePath(/^convert|^replace/i.test(match[1]) ? match[2] : match[1]);
            const to = normalizePath(/^convert|^replace/i.test(match[1]) ? match[3] : match[3]);
            const value = Number(pathGet(ctx, from)) || 0;
            if (/convert/i.test(fn)) {
                pathSet(ctx, to, (Number(pathGet(ctx, to)) || 0) + value);
                pathSet(ctx, from, 0);
            } else {
                pathSet(ctx, to, value);
            }
            diagnostics.push(`${source}:${fn}(${from}->${to})`);
            return;
        }
        match = text.match(/^(disable|immune)\((.+?)\)$/i);
        if (match) {
            const bucket = match[1].toLowerCase() === 'disable' ? 'disabled' : 'immune';
            if (!ctx.flags[bucket]) ctx.flags[bucket] = [];
            ctx.flags[bucket].push(match[2].trim());
            diagnostics.push(`${source}:${bucket}(${match[2].trim()})`);
            return;
        }
        diagnostics.push(`${source}:无法解析 ${text}`);
    }

    function executeDsl(ctx, scriptText, diagnostics = [], source = 'DSL') {
        asText(scriptText).split(/[;；\n]/).map(s => s.trim()).filter(Boolean)
            .forEach(statement => executeDslStatement(ctx, statement, diagnostics, source));
    }

    function formulaToDsl(formula, stageText) {
        const raw = asText(formula);
        if (!raw) return '';
        if (/[.=()]|\+=|-=|\*=|convertTo|replaceWith|capMin|capMax|disable|immune/i.test(raw)) return raw;
        const multiplier = raw.match(/(?:x|×)?\s*(\d+(?:\.\d+)?)\s*倍?/i);
        const add = raw.match(/([+-]\d+(?:\.\d+)?)/);
        const op = multiplier ? `*=${multiplier[1]}` : (add ? `+=${add[1]}` : '');
        if (!op) return raw;
        const stage = asText(stageText);
        const targets = [];
        if (/肉体|肉身|body/.test(stage)) targets.push('final.body');
        if (/魂力|soul/.test(stage)) targets.push('final.soul');
        if (/精神(?!力)|mind/.test(stage)) targets.push('final.mind');
        if (/全属性|三维|最终|乘区|领域|真身/.test(stage) || !targets.length) targets.push('final.body', 'final.soul', 'final.mind');
        return Array.from(new Set(targets)).map(path => `${path} ${op}`).join(';');
    }

    function collectDslRules(db, traits) {
        const out = [];
        for (const tableName of [CONFIG.tables.traitRules, CONFIG.tables.traitTempStates]) {
            for (const row of rows(db, tableName)) {
                if (no(cell(row, '是否启用', '是否脚本自动执行'))) continue;
                if (!traitMatchesSource(traits, cell(row, '来源特性名称'))) continue;
                const formula = cell(row, '结算参数', '修正公式/数值');
                if (!asText(formula)) continue;
                const stage = asText(cell(row, '作用阶段', '触发时机', '乘区类型'));
                out.push({
                    source: `${tableName}:${traitName(row) || cell(row, '状态名称') || '规则'}`,
                    stage,
                    formula: formulaToDsl(formula, stage),
                    priority: num(cell(row, '优先级'), 100),
                    layers: Math.max(1, num(cell(row, '当前层数/次数'), 1)),
                });
            }
        }
        return out.sort((a, b) => a.priority - b.priority);
    }

    function applyDslRules(ctx, rules, stage, diagnostics) {
        for (const rule of rules) {
            const stageText = asText(rule.stage);
            const allowFinalFallback = stage === 'final' && /final|最终|乘区|状态/.test(stageText);
            if (!ruleAppliesToStage(rule, stage) && !allowFinalFallback) continue;
            for (let i = 0; i < rule.layers; i += 1) executeDsl(ctx, rule.formula, diagnostics, rule.source);
        }
    }

    function activeText(db) {
        const stats = firstRow(db, CONFIG.tables.stats);
        const runtime = runtimeStatsRow(db, stats);
        const pieces = [
            cell(stats, '武魂真身状态'),
            cell(runtime, '武魂真身状态'),
            cell(stats, '其他Buff'),
            cell(runtime, '其他增减益'),
            cell(runtime, '领域/持续状态'),
            cell(runtime, '控制/异常状态'),
        ];
        for (const row of rows(db, CONFIG.tables.traitTempStates)) {
            if (!no(cell(row, '是否启用'))) {
                pieces.push(cell(row, '状态名称'), cell(row, '触发条件'), cell(row, '乘区类型'), cell(row, '修正公式/数值'));
            }
        }
        return pieces.map(asText).filter(Boolean).join(';');
    }

    function resonance(row) {
        const direct = num(cell(row, '共鸣率_脚本', '本体阶位'), NaN);
        if (Number.isFinite(direct) && direct > 0) {
            return direct > 3 ? direct / 100 : direct;
        }
        const text = asText(cell(row, '本体阶位'));
        if (/圆满|极致|完全|100/.test(text)) return 1;
        if (/高阶|80/.test(text)) return 0.8;
        if (/中阶|60/.test(text)) return 0.6;
        if (/初阶|40/.test(text)) return 0.4;
        if (/未/.test(text)) return 0.2;
        return yes(cell(row, '是否本体武魂')) ? 1 : 1;
    }

    function templateBonusFromText(text) {
        const value = asText(text);
        const innateMatch = value.match(/模板先天加值\s*[=：:]\s*([+-]?\d+(?:\.\d+)?)/);
        const multiplierMatch = value.match(/模板倍率加值\s*[=：:]\s*([+-]?\d+(?:\.\d+)?)/);
        return {
            innate: innateMatch ? Number(innateMatch[1]) || 0 : 0,
            multiplier: multiplierMatch ? Number(multiplierMatch[1]) || 0 : 0,
        };
    }

    function templateBonusFromRow(row) {
        return templateBonusFromText([
            cell(row, '计算备注'),
            cell(row, '简介与描述'),
            cell(row, '武魂来源/形态'),
        ].join(';'));
    }

    function martialContext(db, traits) {
        const overviewRows = rows(db, CONFIG.tables.soulOverview);
        const infos = overviewRows.map(row => {
            const q = qualityInfo(cell(row, '武魂品级'));
            const awakened = !no(cell(row, '觉醒状态')) && !/未觉醒/.test(asText(cell(row, '觉醒状态')));
            const templateBonus = templateBonusFromRow(row);
            return {
                row,
                name: asText(cell(row, '武魂名称')),
                seq: num(cell(row, '序号'), 0),
                quality: q,
                templateBonus,
                awakened,
                isExtreme: /极致/.test(asText(cell(row, '特殊属性'))) || yes(cell(row, '是否极致_脚本')),
                isBody: yes(cell(row, '是否本体武魂')),
                resonance: resonance(row),
            };
        });
        const active = infos.filter(info => info.awakened);
        const first = active[0]?.quality.level || 0;
        let totalInnate = 0;
        const templateInnate = active.reduce((sum, info) => sum + (Number(info.templateBonus?.innate) || 0), 0);
        if (active.length === 1) totalInnate = first;
        else if (active.length >= 2) {
            totalInnate = Math.max(first, 10) + active.slice(1).reduce((sum, info) => sum + info.quality.level, 0);
        }
        totalInnate += templateInnate;
        totalInnate = Math.min(30, totalInnate);
        const hasSuperGod = active.some(info => info.quality.key === '超神级');
        const byTotal = compositeMultiplier(totalInnate, hasSuperGod);
        const multiplierCap = hasSuperGod ? 5 : 4;
        const sortedMultipliers = active.map(info => Math.min(multiplierCap, info.quality.multiplier + (Number(info.templateBonus?.multiplier) || 0))).sort((a, b) => b - a);
        const hasLink = hasTrait(traits, /武魂串联|焚诀/);
        const multiplier = hasLink
            ? round(sortedMultipliers.slice(0, 2).reduce((sum, value) => sum + value, 0) || byTotal)
            : round(sortedMultipliers[0] || byTotal || 1);
        const bodySoul = active.find(info => info.isBody);
        const maxResonance = active.reduce((max, info) => Math.max(max, info.isBody ? info.resonance : 1), 1);
        return {
            rows: infos,
            active,
            totalInnate,
            byTotal,
            multiplier,
            hasLink,
            hasBodySoul: Boolean(bodySoul),
            resonance: maxResonance,
            source: hasLink ? '武魂串联/并联：取最高两个已觉醒武魂倍率求和' : '默认：取已觉醒武魂最高倍率',
        };
    }

    function calcRingBonus(row, traits, attrRules = [], diagnostics = []) {
        const year = parseYear(cell(row, '魂环年限'), cell(row, '魂环颜色'));
        const base = ringBaseValue(year, cell(row, '魂环颜色'));
        const scale = ringTypeScale(cell(row, '魂环类型'));
        let out = bonus(base * scale.body, base * scale.soul, base * scale.mind);
        const notes = [`${scale.name};基础值=${round(base)}`];

        const sourceText = [
            cell(row, '魂兽来源'),
            cell(row, '魂环类型'),
            cell(row, '详细效果'),
        ].join(';');
        const isDragon = /龙|dragon/i.test(sourceText);
        if (isDragon && hasTrait(traits, /龙心/)) {
            out = bonus(out.body * 2, out.soul * 2, out.mind * 2);
            notes.push('龙心:龙类来源三维增益x2');
        }
        if (isDragon && hasTrait(traits, /屠龙者/)) {
            out.body *= 2;
            notes.push('屠龙者:龙类魂环肉体增益x2');
        }

        const ringIndex = num(cell(row, '魂环序号'), 0);
        if (ringIndex === 1 && hasTrait(traits, /超绝吟唱|终极吟唱/)) {
            out = bonus(out.body * 2, out.soul * 2, out.mind * 2);
            notes.push('超绝吟唱:第一魂环属性x2');
        }

        out = applyConversionToTri(out, traits, attrRules, diagnostics, 'martial');
        return {
            year,
            base,
            tri: out,
            note: notes.join(';'),
        };
    }

    function collectEquipment(db) {
        const martial = bonus();
        const other = bonus();
        const resources = resBonus();
        const details = [];

        function addRows(tableName, options) {
            for (const row of rows(db, tableName)) {
                if (options.requireDisplay && no(cell(row, '是否显示_脚本'))) continue;
                const enabledFlag = cell(row, '是否装备', '是否启用', '状态');
                const enabled = options.enabledDefault ? !no(enabledFlag) : yes(enabledFlag);
                if (!enabled) continue;

                const tri = parseTriBonus([
                    cell(row, '三维加成'),
                    cell(row, '特殊能力'),
                    cell(row, '效果描述'),
                    cell(row, '备注'),
                ].filter(Boolean).join(';'));
                const res = parseResourceBonus([
                    cell(row, '资源加成'),
                    cell(row, '特殊能力'),
                    cell(row, '效果描述'),
                    cell(row, '备注'),
                ].filter(Boolean).join(';'));
                const joinMartial = yes(cell(row, '是否参与武魂相关计算')) || yes(cell(row, '是否参与倍率计算'));
                if (joinMartial) addTri(martial, tri);
                else addTri(other, tri);
                addRes(resources, res);
                details.push(`${options.label}:${asText(cell(row, options.nameCol)) || '未命名'}=>${joinMartial ? '武魂相关' : '其余加成'}`);
            }
        }

        addRows(CONFIG.tables.soulBones, { label: '魂骨/魂核', nameCol: '当前物品名称' });
        addRows(CONFIG.tables.spirits, { label: '魂灵', nameCol: '魂灵名称', enabledDefault: true });
        addRows(CONFIG.tables.armor, { label: '斗铠', nameCol: '斗铠部位/名称', requireDisplay: true });
        addRows(CONFIG.tables.soulDevices, { label: '魂导器', nameCol: '魂导器名称' });
        addRows(CONFIG.tables.skills, { label: '通用技能', nameCol: '技能名称', enabledDefault: true });

        return { martial, other, resources, details };
    }

    function collectDailyBonuses(db) {
        const daily = { 悟性: 0, 气场: 0, 百工: 0, 气运: 0, 学识: 0, 阅历: 0 };
        const details = [];
        function addDaily(text, source) {
            const raw = asText(text);
            if (!raw) return;
            for (const key of Object.keys(daily)) {
                const match = raw.match(new RegExp(`${key}\\s*[:：+＋]?\\s*(-?\\d+)`));
                if (match) {
                    daily[key] += Number(match[1]) || 0;
                    details.push(`${source}:${key}${match[1]}`);
                }
            }
        }
        for (const row of rows(db, CONFIG.tables.titlePanel)) {
            if (no(cell(row, '是否启用'))) continue;
            addDaily(cell(row, '六维调整值'), cell(row, '当前称号名称') || '称号');
        }
        return { daily, details };
    }

    function refreshTraitEquipmentSlots(db, traits) {
        const updates = [];
        const slotRows = rows(db, CONFIG.tables.traitEquipmentSlots);
        const visibleBySlot = new Map();

        for (const row of slotRows) {
            const trait = traitName(row);
            const active = trait && Array.from(traits).some(name => name.includes(trait) || trait.includes(name));
            const display = active ? '是' : '否';
            const enabled = active ? '是' : '否';
            visibleBySlot.set(asText(cell(row, '槽位ID')), display);
            if (asText(cell(row, '是否显示_脚本')) !== display || asText(cell(row, '是否启用')) !== enabled) {
                updates.push({
                    table: CONFIG.tables.traitEquipmentSlots,
                    rowIndex: row.__rowIndex,
                    data: { '是否显示_脚本': display, '是否启用': enabled },
                });
            }
        }

        for (const tableName of [CONFIG.tables.armor, CONFIG.tables.soulDevices, CONFIG.tables.soulBones]) {
        for (const row of rows(db, tableName)) {
            const slotId = asText(cell(row, '槽位ID', '槽位编号', '部位'));
            const condition = asText(cell(row, '显示条件'));
            let display = '是';
            if (visibleBySlot.has(slotId)) display = visibleBySlot.get(slotId);
            else if (/需要特性/.test(condition)) display = '否';
            if (row['是否显示_脚本'] === undefined && row['是否显示'] === undefined) continue;
            if (asText(cell(row, '是否显示_脚本')) !== display) {
                updates.push({
                    table: tableName,
                    rowIndex: row.__rowIndex,
                    data: { '是否显示_脚本': display },
                });
            }
        }
        }

        return updates;
    }

    function calcFinals(baseInput, martialRawInput, otherInput, ctx, traits, stateText, ruleState = {}) {
        const diagnostics = ruleState.diagnostics || [];
        let base = { ...baseInput };
        let martialRaw = { ...martialRawInput };
        let other = { ...otherInput };
        const preDslContext = {
            base,
            martial: martialRaw,
            other,
            final: {},
            resource: {},
            daily: ruleState.daily || {},
            flags: ruleState.flags || {},
        };
        applyDslRules(preDslContext, ruleState.dslRules || [], 'base', diagnostics);
        applyDslRules(preDslContext, ruleState.dslRules || [], 'martial', diagnostics);
        applyDslRules(preDslContext, ruleState.dslRules || [], 'other', diagnostics);
        base = applyConversionToTri(preDslContext.base, traits, ruleState.attrRules || [], diagnostics, 'base');
        martialRaw = applyConversionToTri(preDslContext.martial, traits, ruleState.attrRules || [], diagnostics, 'martial');
        other = applyConversionToTri(preDslContext.other, traits, ruleState.attrRules || [], diagnostics, 'other');

        let multiplier = ctx.multiplier || 1;
        if (hasTrait(traits, /魂力心脏|柱间细胞/)) multiplier += 0.8;

        if (/永劫燔世|先天领域|领域开启/.test(stateText)) {
            multiplier += 0.8;
        }

        const avatar = /已开启|开启|真身|完全燃烧/.test(stateText);
        const resonanceRate = ctx.hasBodySoul ? (ctx.resonance || 1) : 1;

        const final = bonus();
        const martialScript = bonus();
        for (const key of ['body', 'soul', 'mind']) {
            let value;
            if (ctx.hasBodySoul) {
                value = avatar
                    ? (base[key] + martialRaw[key]) * multiplier * resonanceRate + other[key]
                    : (base[key] * resonanceRate + martialRaw[key]) * multiplier + other[key];
            } else if (avatar) {
                value = (base[key] + martialRaw[key]) * multiplier + other[key];
            } else {
                value = base[key] + martialRaw[key] * multiplier + other[key];
            }
            final[key] = round(value);
            martialScript[key] = round(value - base[key] - other[key]);
        }

        if (hasTrait(traits, /真祖/)) {
            if (/夜晚|黑夜|夜间/.test(stateText)) {
                final.body *= 2; final.soul *= 2; final.mind *= 2;
            } else if (/白天|日间|正午/.test(stateText)) {
                final.body *= 0.5; final.soul *= 0.5; final.mind *= 0.5;
            }
        }
        if (hasTrait(traits, /太阳之子/)) {
            if (/白天|日间|正午|强光/.test(stateText)) {
                final.body *= 2; final.soul *= 2; final.mind *= 2;
            } else if (/夜晚|黑夜|夜间/.test(stateText)) {
                final.body *= 0.5; final.soul *= 0.5; final.mind *= 0.5;
            }
        }
        if (hasTrait(traits, /神气合一/)) {
            const high = Math.max(final.soul, final.mind);
            const low = Math.min(final.soul, final.mind);
            const fused = round(high + low * 0.5);
            final.soul = fused;
            final.mind = fused;
            diagnostics.push(`神气合一:魂力/精神=${fused}`);
        }

        const dslContext = {
            base,
            martial: martialRaw,
            other,
            final: { ...final },
            resource: {},
            daily: ruleState.daily || {},
            flags: ruleState.flags || {},
        };
        applyDslRules(dslContext, ruleState.dslRules || [], 'final', diagnostics);
        base = dslContext.base;
        martialRaw = dslContext.martial;
        other = dslContext.other;
        final.body = dslContext.final.body;
        final.soul = dslContext.final.soul;
        final.mind = dslContext.final.mind;

        final.body = round(final.body);
        final.soul = round(final.soul);
        final.mind = round(final.mind);
        return { base, martialRaw, other, martialScript, final, multiplier: round(multiplier), avatar, resonanceRate, flags: dslContext.flags, daily: dslContext.daily };
    }

    function resourceMax(level, final, resourceBonus, traits, stateText, ruleState = {}) {
        let hpStat = final.body;
        let mpStat = final.soul;
        if (hasTrait(traits, /魂魄之躯/)) hpStat = final.mind;
        if (hasTrait(traits, /魔人之躯/)) hpStat = Math.floor((final.body + final.soul) * 0.75);
        if (hasTrait(traits, /九戒体质/)) mpStat = Math.floor((final.soul + final.mind) * 0.75);

        let hp = final.body * 5 * CONFIG.defaults.lifeCoef + level * 100;
        hp = hp - final.body * 5 * CONFIG.defaults.lifeCoef + hpStat * 5 * CONFIG.defaults.lifeCoef;
        let mp = level * CONFIG.defaults.mpGrowth + mpStat;
        let spirit = (level * CONFIG.defaults.spiritGrowth + final.mind) * 5;

        if (hasTrait(traits, /点燃星海|流萤/)) hp *= 0.5;
        if (hasTrait(traits, /魂力心脏|柱间细胞/)) mp *= 3;
        if (/永劫燔世|先天领域|领域开启/.test(stateText)) hp *= 3;

        hp += resourceBonus.hp;
        mp += resourceBonus.mp;
        spirit += resourceBonus.spirit;

        const dslContext = {
            base: {},
            martial: {},
            other: {},
            final: { ...final },
            resource: { hpMax: hp, mpMax: mp, spiritMax: spirit },
            daily: ruleState.daily || {},
            flags: ruleState.flags || {},
        };
        applyDslRules(dslContext, ruleState.dslRules || [], 'resource', ruleState.diagnostics || []);
        hp = dslContext.resource.hpMax;
        mp = dslContext.resource.mpMax;
        spirit = dslContext.resource.spiritMax;

        return {
            hp: Math.max(1, Math.floor(hp)),
            mp: Math.max(0, Math.floor(mp)),
            spirit: Math.max(0, Math.floor(spirit)),
        };
    }

    function clampCurrentValue(current, max, label, diagnostics) {
        if (empty(current)) return { value: String(max), changed: true, reason: `${label}为空，写入上限` };
        const n = num(current, NaN);
        if (!Number.isFinite(n)) return { value: current, changed: false, reason: '' };
        if (n > max) {
            diagnostics.push(`${label}当前值${n}超过上限${max}，已钳制`);
            return { value: String(max), changed: true, reason: `${label}钳制${n}->${max}` };
        }
        return { value: current, changed: false, reason: '' };
    }

    async function updateRows(updates, options = {}) {
        const failed = [];
        for (const update of updates) {
            if (!update || !update.table || !update.rowIndex || !update.data) continue;
            const result = await updateRowCompat(update.table, update.rowIndex, update.data, options);
            if (apiWriteFailed(result)) failed.push(`${update.table}:updateRow failed`);
        }
        return failed;
    }

    async function upsertFirstRow(tableName, existingRow, data, options = {}) {
        if (existingRow && existingRow.__rowIndex) {
            const updateData = tableName === CONFIG.tables.statsRuntime ? runtimeRowNullRepair(existingRow, data) : data;
            return updateRowCompat(tableName, existingRow.__rowIndex, updateData, options);
        }
        if (typeof api.insertRow === 'function') {
            const insertData = tableName === CONFIG.tables.statsRuntime ? runtimeRowDefaults(data) : data;
            return insertRowCompat(tableName, { row_id: 1, ...insertData }, options);
        }
        return false;
    }

    function ageLabel(value) {
        const map = { none: '未选择年限', 10: '十年', 100: '百年', 1000: '千年', 10000: '万年', 100000: '十万年', 1000000: '百万年' };
        return map[String(value)] || asText(value) || '未选择年限';
    }

    function noteText(note, key) {
        return note && typeof note === 'object' ? asText(note[key]) : '';
    }

    function rowIsBlank(row) {
        return row && Object.keys(row).filter(k => !k.startsWith('__')).every(k => !asText(row[k]));
    }

    function resolveMappingRow(db, tableName, options = {}) {
        const list = rows(db, tableName);
        const matched = options.match ? list.find(options.match) : null;
        if (matched) return { rowIndex: matched.__rowIndex, mode: 'update' };
        const blank = list.find(rowIsBlank);
        if (blank) return { rowIndex: blank.__rowIndex, mode: 'update' };
        if (options.fallbackIndex && list[options.fallbackIndex - 1]) return { rowIndex: list[options.fallbackIndex - 1].__rowIndex, mode: 'update' };
        return { rowIndex: null, mode: 'insert' };
    }

    function addMappingOp(db, ops, tableName, data, options = {}) {
        const target = resolveMappingRow(db, tableName, options);
        ops.push({ table: tableName, rowIndex: target.rowIndex, mode: target.mode, data });
    }

    function payloadSoulName(soul, index) {
        return asText(soul?.name) || ['第一武魂', '第二武魂', '第三武魂'][index] || `第${index + 1}武魂`;
    }

    function payloadSoulQualityName(soul) {
        return asText(soul?.qualityName || soul?.quality?.name || soul?.qualityLabel || soul?.quality) || '中级';
    }

    function isThousandForgedTrait(trait) {
        return /thousand_forged_blade|千冶成刃/.test([trait?.id, trait?.name, trait?.hook, trait?.scriptHook].map(asText).join('|'));
    }

    const TRAIT_ADAPTATION_MATRIX = Object.freeze([
        { id: 'custom_specialty', type: 'manualTrigger', settlement: '待解析规则', tables: '玩家天赋与特性表;已选特性状态表' },
        { id: 'body_force', type: 'recalcRule', settlement: '成长倍率', tables: '特性规则扩展表' },
        { id: 'soul_bound_body', type: 'recalcRule', settlement: '属性转换', tables: '特性属性改写规则表' },
        { id: 'ignite_starsea', type: 'combatHook', settlement: '资源改写/临时状态', tables: '特性临时状态与乘区表;特性装备栏扩展表' },
        { id: 'body_grandmaster', type: 'recalcRule', settlement: '属性转换', tables: '特性属性改写规则表' },
        { id: 'fire_steel', type: 'combatHook', settlement: '低血线乘区/致命保护', tables: '特性临时状态与乘区表;已选特性状态表' },
        { id: 'uncrowned_king', type: 'manualTrigger', settlement: '每日爆发', tables: '特性临时状态与乘区表;已选特性状态表' },
        { id: 'ultimate_chant', type: 'combatHook', settlement: '技能禁用', tables: '特性规则扩展表' },
        { id: 'imagine_breaker', type: 'combatHook', settlement: '免疫/技能禁用', tables: '特性规则扩展表' },
        { id: 'true_ancestor', type: 'recalcRule', settlement: '昼夜乘区', tables: '特性临时状态与乘区表' },
        { id: 'sun_child', type: 'recalcRule', settlement: '昼夜乘区', tables: '特性临时状态与乘区表' },
        { id: 'soul_body', type: 'recalcRule', settlement: '属性替代/资源公式', tables: '特性属性改写规则表' },
        { id: 'absolute_guard', type: 'combatHook', settlement: '守护链接/伤害转移', tables: '特性临时状态与乘区表;战斗单位状态_脚本' },
        { id: 'soul_link', type: 'recalcRule', settlement: '武魂倍率策略', tables: '特性规则扩展表' },
        { id: 'dual_armor', type: 'recalcRule', settlement: '装备槽扩展', tables: '特性装备栏扩展表' },
        { id: 'arsenal_body', type: 'recalcRule', settlement: '装备槽/装备乘区', tables: '特性装备栏扩展表' },
        { id: 'nine_ring_body', type: 'recalcRule', settlement: '属性合并/资源公式', tables: '特性属性改写规则表' },
        { id: 'demon_body', type: 'recalcRule', settlement: '属性合并/资源公式', tables: '特性属性改写规则表' },
        { id: 'ancient_saint_body', type: 'recalcRule', settlement: '复合路线', tables: '特性属性改写规则表;特性规则扩展表' },
        { id: 'spirit_soul_unity', type: 'recalcRule', settlement: '属性融合/资源共鸣', tables: '特性规则扩展表' },
        { id: 'eight_gates', type: 'combatHook', settlement: '临时状态/生命代价', tables: '特性临时状态与乘区表;战斗单位状态_脚本' },
        { id: 'valkyrie', type: 'combatHook', settlement: '机动规避/火控链接', tables: '特性临时状态与乘区表' },
        { id: 'dragon_heart', type: 'recalcRule', settlement: '龙类来源收益', tables: '特性规则扩展表' },
        { id: 'nascent_soul', type: 'combatHook', settlement: '额外行动/伤害反馈', tables: '特性临时状态与乘区表;战斗单位状态_脚本' },
        { id: 'soul_heart', type: 'recalcRule', settlement: '资源上限/倍率修正', tables: '特性规则扩展表' },
        { id: 'twelve_trials', type: 'combatHook', settlement: '致命保护次数', tables: '已选特性状态表;特性临时状态与乘区表' },
        { id: 'dragon_slayer', type: 'combatHook', settlement: '种族克制', tables: '特性规则扩展表;战斗单位状态_脚本' },
        { id: 'six_eyes', type: 'combatHook', settlement: '消耗修正/检定下限', tables: '特性规则扩展表;特性属性改写规则表' },
        { id: 'reincarnation_again', type: 'combatHook', settlement: '领域模板', tables: '特性临时状态与乘区表;特性剧情线进度表' },
        { id: 'king_treasure', type: 'manualTrigger', settlement: '剧情权限', tables: '特性剧情线进度表' },
        { id: 'projection', type: 'manualTrigger', settlement: '临时复制', tables: '特性临时状态与乘区表' },
        { id: 'supreme_bone', type: 'recalcRule', settlement: '魂骨生成/属性加成', tables: '魂骨与魂核面板' },
        { id: 'ring_elder', type: 'recalcRule', settlement: '焚诀/多武魂策略', tables: '特性规则扩展表;特性剧情线进度表' },
        { id: 'thousand_forged_blade', type: 'combatHook', settlement: '生命攻击值/血炉剑域', tables: '特性规则扩展表;特性临时状态与乘区表' },
        { id: 'traveler', type: 'recordOnly', settlement: '剧情特权', tables: '特性剧情线进度表' },
        { id: 'god_trial', type: 'recordOnly', settlement: '神考剧情线', tables: '特性剧情线进度表' },
        { id: 'system', type: 'recordOnly', settlement: '外部奖励接口', tables: '特性剧情线进度表' },
        { id: 'phoenix_god', type: 'combatHook', settlement: '涅槃/净化/致命保护', tables: '特性临时状态与乘区表;特性剧情线进度表' },
        { id: 'godking_shadow', type: 'recordOnly', settlement: '负面剧情线', tables: '特性剧情线进度表' },
    ]);

    function traitIdentityText(trait) {
        return [trait?.id, trait?.name, trait?.tag, trait?.desc, trait?.configSummary].map(asText).filter(Boolean).join('|');
    }

    function traitAdaptationFor(trait) {
        const id = asText(trait?.id);
        const text = traitIdentityText(trait);
        return TRAIT_ADAPTATION_MATRIX.find(item => item.id === id || new RegExp(item.id, 'i').test(text))
            || TRAIT_ADAPTATION_MATRIX.find(item => asText(trait?.name).includes(item.id));
    }

    function traitSourceName(trait, fallback = '') {
        return asText(trait?.name) || asText(fallback) || asText(trait?.id) || '未命名特性';
    }

    function traitRuleRow(sourceName, module, data = {}) {
        return {
            '来源特性名称': sourceName,
            '规则模块': module,
            '结算方式': data.settlement || '规则记录',
            '触发时机': data.trigger || 'onBeforeStatRecalc',
            '脚本钩子': data.hook || 'onBeforeStatRecalc',
            '优先级': String(data.priority ?? 100),
            '启用条件': data.condition || '已选特性启用',
            '结算参数': data.params || '',
            '是否脚本自动执行': data.auto || '否',
            '备注': data.note || '',
        };
    }

    function traitAttributeRuleRow(sourceName, type, data = {}) {
        return {
            '来源特性名称': sourceName,
            '是否启用': data.enabled || '是',
            '规则类型': type,
            '作用阶段': data.stage || 'onBeforeStatRecalc',
            '来源属性': data.source || '',
            '目标属性': data.target || '',
            '作用范围': data.scope || '玩家自身',
            '结算公式/参数': data.formula || '',
            '上限/下限': data.cap || '',
            '叠加规则': data.stack || '同源不重复',
            '脚本钩子': data.hook || 'onBeforeStatRecalc',
            '优先级': String(data.priority ?? 100),
            '备注': data.note || '',
        };
    }

    function traitTempStateRow(sourceName, stateName, data = {}) {
        return {
            '来源特性名称': sourceName,
            '状态名称': stateName,
            '是否启用': data.enabled || '否',
            '触发条件': data.condition || '手动或剧情触发',
            '持续时间': data.duration || '按状态说明',
            '影响对象': data.target || '自身',
            '乘区类型': data.layer || '状态记录',
            '修正公式/数值': data.formula || '',
            '是否可叠加': data.stackable || '否',
            '当前层数/次数': data.count || '',
            '脚本钩子': data.hook || 'onBattleStart;onTurnStart;onBeforeDamage',
            '备注': data.note || '',
        };
    }

    function traitStoryRow(sourceName, storyName, data = {}) {
        return {
            '来源特性名称': sourceName,
            '剧情线名称': storyName,
            '是否启用': data.enabled || '是',
            '当前阶段': data.stage || '建卡记录',
            '当前目标': data.goal || '等待剧情推进',
            '触发条件': data.condition || '剧情触发',
            '成功条件': data.success || '',
            '失败条件': data.failure || '',
            '奖励/惩罚': data.reward || '',
            '脚本钩子': data.hook || 'onStoryEvent',
            '备注': data.note || '',
        };
    }

    function adaptationRowsForTrait(trait) {
        const source = traitSourceName(trait);
        const id = asText(trait?.id);
        const text = traitIdentityText(trait);
        const rows = { traitRules: [], traitAttributeRules: [], traitTempStates: [], traitStoryProgress: [], soulBones: [] };
        const has = pattern => pattern.test(`${id}|${source}|${text}`);

        if (has(/body_force|力道式微|劲儿大|一力破万法|拳碎虚空/)) {
            rows.traitRules.push(traitRuleRow(source, '等级成长基础肉体翻倍', {
                settlement: '成长倍率',
                trigger: 'onBeforeStatRecalc/base',
                hook: 'onBeforeStatRecalc',
                priority: 18,
                params: 'base.body *= 2',
                auto: '是',
                note: '仅作用于基础肉体，魂环/装备加成不重复翻倍。',
            }));
        }
        if (has(/soul_bound_body|天与魂缚/)) {
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '属性转换', {
                stage: 'all',
                source: '魂力',
                target: '肉体',
                formula: '魂力增益全部转为基础肉体；魂力路线锁定为0',
                priority: 20,
            }));
        }
        if (has(/body_grandmaster|体修无上|力道.*宗师/)) {
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '属性转换', {
                stage: 'all',
                source: '精神',
                target: '肉体',
                formula: '精神增益全部转为基础肉体；精神路线锁定为0',
                priority: 21,
            }));
        }
        if (has(/soul_body|魂魄之躯/)) {
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '属性转换', {
                stage: 'all',
                source: '肉体',
                target: '精神',
                formula: '肉体增益全部转为精神；HP计算使用最终精神',
                priority: 22,
            }));
        }
        if (has(/ancient_saint_body|荒古圣体|战斗民族之躯/)) {
            rows.traitRules.push(traitRuleRow(source, '荒古圣体基础肉体翻倍', {
                settlement: '成长倍率',
                trigger: 'onBeforeStatRecalc/base',
                priority: 19,
                params: 'base.body *= 2',
                auto: '是',
                note: '复合力道式微效果；经验3倍作为剧情/成长限制记录。',
            }));
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '属性转换', {
                stage: 'all',
                source: '魂力',
                target: '肉体',
                formula: '魂力增益全部转为肉体',
                priority: 23,
            }));
            rows.traitRules.push(traitRuleRow(source, '万法不侵', {
                settlement: '免疫/抗性',
                trigger: 'onBeforeDamage',
                hook: 'onBeforeDamage;onBeforeControl',
                priority: 70,
                params: 'immune(同级及以下魂力效果)',
                auto: '是',
                note: '战斗引擎记录免疫标记；具体叙事边界仍按等级差裁定。',
            }));
        }
        if (has(/spirit_soul_unity|神气合一/)) {
            rows.traitRules.push(traitRuleRow(source, '魂力精神融合', {
                settlement: '属性融合',
                trigger: 'onAfterStatRecalc',
                priority: 45,
                params: '魂力/精神相关结算取高+低值50%；资源上限互相共鸣',
                auto: '否',
                note: '由重算器内置融合公式执行，表格记录公式边界。',
            }));
        }
        if (has(/soul_link|武魂串联/)) {
            rows.traitRules.push(traitRuleRow(source, '多武魂倍率策略', {
                settlement: '武魂倍率策略',
                trigger: 'onBeforeStatRecalc/martial',
                priority: 30,
                params: '最高两个已觉醒武魂倍率求和',
                auto: '否',
                note: 'martialContext 读取特性名称执行。',
            }));
        }
        if (has(/ring_elder|戒指里的老爷爷|萧火火/)) {
            rows.traitRules.push(traitRuleRow(source, '焚诀多武魂倍率策略', {
                settlement: '武魂倍率策略',
                trigger: 'onBeforeStatRecalc/martial',
                priority: 31,
                params: '焚诀：帝火成长线使用最高两个已觉醒武魂倍率求和；帝火吞噬阶梯最高5.0x',
                auto: '否',
                note: 'martialContext 将萧火火/戒指老爷爷视为焚诀兼容源。',
            }));
            rows.traitStoryProgress.push(traitStoryRow(source, '焚诀帝火吞噬阶梯', {
                goal: '通过剧情素材推进帝火倍率阶梯',
                reward: '帝火倍率最高成长至5.0x；炎帝复苏后第三武魂可正常成长',
                note: '常规炼丹可自动成功，高阶丹药需材料/时间/剧情条件。',
            }));
        }
        if (has(/ignite_starsea|点燃星海/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '点燃星海燃烧', {
                condition: '主动点燃或失熵症进入燃烧态',
                duration: '本场战斗或剧情确认',
                layer: '最终伤害/资源代价',
                formula: 'damageMultiplier *= 1.2',
                note: 'HP上限减半由重算器内置执行；额外斗铠/机甲槽由装备栏扩展表驱动。',
            }));
        }
        if (has(/fire_steel|火与钢|狂战士体质/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '火与钢低血线', {
                condition: '当前HP<=35%最大HP',
                duration: '低血线期间',
                layer: '最终伤害/治疗禁用/控制免疫',
                formula: 'damageMultiplier *= 1.5',
                count: '复仇恢复1/1',
                note: '友方治疗禁用；首次致命/复仇恢复由战斗状态扣次数。',
            }));
        }
        if (has(/uncrowned_king|无冕之王|一刀修罗/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '一刀修罗', {
                condition: '每天一次，主动开启',
                duration: '短时间/本次爆发',
                layer: '最终伤害/承伤代价',
                formula: 'damageMultiplier *= 2',
                count: '1/1',
                note: '魂力成长极低作为剧情成长限制记录。',
            }));
        }
        if (has(/ultimate_chant|超绝吟唱|终极吟唱/)) {
            rows.traitRules.push(traitRuleRow(source, '非第一魂技主动禁用', {
                settlement: '技能禁用',
                trigger: 'onBeforeSkill',
                hook: 'onBeforeSkill',
                priority: 15,
                params: 'disable(非第一魂技主动释放)',
                auto: '是',
                note: '第一魂环属性翻倍由魂环计算执行；战斗阶段阻止第二及之后魂技主动释放。',
            }));
        }
        if (has(/imagine_breaker|幻想杀手|万法不侵/)) {
            rows.traitRules.push(traitRuleRow(source, '魂力效果免疫与魂力技能禁用', {
                settlement: '免疫/技能禁用',
                trigger: 'onBeforeDamage/onBeforeSkill',
                hook: 'onBeforeDamage;onBeforeSkill',
                priority: 16,
                params: 'immune(同级及以下魂力效果);disable(基于魂力消耗的主动技能)',
                auto: '是',
                note: '战斗阶段阻止消耗蓝量/魂力的主动技能。',
            }));
        }
        if (has(/true_ancestor|真祖/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '真祖昼夜乘区', {
                enabled: '是',
                condition: '昼夜变化',
                duration: '随时间变化',
                layer: '三维最终乘区',
                formula: '夜晚三维x2；白天三维x0.5',
                hook: 'onTimeChanged;onBeforeStatRecalc',
                note: '实际倍数由 activeText 中昼夜关键词触发。',
            }));
        }
        if (has(/sun_child|太阳之子/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '太阳之子昼夜乘区', {
                enabled: '是',
                condition: '日照变化',
                duration: '随时间变化',
                layer: '三维最终乘区',
                formula: '白天/强光三维x2；夜晚三维x0.5',
                hook: 'onTimeChanged;onBeforeStatRecalc',
                note: '实际倍数由 activeText 中昼夜/强光关键词触发。',
            }));
        }
        if (has(/absolute_guard|绝对守卫/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '守护链接', {
                condition: '选择守护对象后启用',
                duration: '链接持续期间',
                layer: '防御取高/伤害转移',
                formula: 'guardLink=manual',
                note: '战斗单位状态_脚本需要写入 guardTarget 才能自动转移。',
            }));
        }
        if (has(/nine_ring_body|九戒体质/)) {
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '属性合并', {
                stage: 'resource/combat',
                source: '魂力+精神',
                target: 'MP/魂力攻击/精神攻击',
                formula: 'floor((最终魂力+最终精神)*0.75)',
                priority: 55,
                note: 'MP公式已由重算器内置执行；战斗检定后续读取规则。',
            }));
        }
        if (has(/demon_body|魔人之躯/)) {
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '属性合并', {
                stage: 'resource/combat',
                source: '肉体+魂力',
                target: 'HP/肉体攻击/魂力攻击',
                formula: 'floor((最终肉体+最终魂力)*0.75)',
                priority: 56,
                note: 'HP公式已由重算器内置执行；战斗检定后续读取规则。',
            }));
        }
        if (has(/eight_gates|八门遁甲/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '八门开启', {
                condition: '战斗中声明开启门数',
                duration: '本场战斗或关闭后结算',
                layer: '肉体伤害乘区/生命代价',
                formula: 'damageMultiplier *= 1.5',
                count: '门数=0',
                note: '门数可写入战斗单位状态_脚本.gates；生命代价由战斗日志记录。',
            }));
        }
        if (has(/valkyrie|战场女武神/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '女武神机动', {
                condition: '穿戴斗铠或机甲',
                duration: '装备启用期间',
                layer: '机动规避/火控链接',
                formula: 'evasion=advantage',
                note: '规避与火控作为战斗修正/叙事优势记录。',
            }));
        }
        if (has(/dragon_heart|龙心/)) {
            rows.traitRules.push(traitRuleRow(source, '龙类来源三维增益翻倍', {
                settlement: '来源收益修正',
                trigger: 'onAcquireSoulRing;onAcquireSoulBone;onBeforeStatRecalc',
                priority: 35,
                params: '龙类魂环/魂骨/仙草/传承三维收益x2',
                auto: '否',
                note: '魂环部分已由 calcRingBonus 执行；魂骨/传承需按装备行写入龙类来源。',
            }));
        }
        if (has(/nascent_soul|元婴/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '元婴协同', {
                condition: '每场战斗一次',
                duration: '一次额外行动',
                layer: '额外行动/伤害反馈',
                formula: 'extraAction=1',
                count: '1/1',
                note: '额外行动使用后写回0/1；伤害反馈按剧情或战斗状态记录。',
            }));
        }
        if (has(/soul_heart|魂力心脏|柱间细胞/)) {
            rows.traitRules.push(traitRuleRow(source, '魂力心脏资源倍率', {
                settlement: '资源上限/武魂倍率',
                trigger: 'onBeforeStatRecalc',
                priority: 40,
                params: '蓝量上限x3；武魂倍率+0.8',
                auto: '否',
                note: '由重算器内置执行，表格记录反噬边界。',
            }));
        }
        if (has(/twelve_trials|十二试炼/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '十二试炼致命免疫', {
                enabled: '是',
                condition: '受到致命伤害',
                duration: '次数耗尽前永久',
                layer: '致命保护/恢复',
                formula: 'fatalProtection=12;restoreHpPct=25',
                count: '12/12',
                hook: 'onFatalDamage',
                note: '每次触发后扣1次并恢复最大HP25%。',
            }));
        }
        if (has(/dragon_slayer|屠龙者/)) {
            rows.traitRules.push(traitRuleRow(source, '屠龙最终伤害', {
                settlement: '种族克制',
                trigger: 'onBeforeDamage',
                hook: 'onBeforeDamage',
                priority: 12,
                params: 'target.tags contains 龙 => damageMultiplier *= 10',
                auto: '是',
                note: '目标 species/tags/特殊能力/当前战斗状态 含龙、亚龙、龙血或dragon时生效。',
            }));
        }
        if (has(/six_eyes|苍蓝之眸|六眼/)) {
            rows.traitRules.push(traitRuleRow(source, '六眼消耗修正', {
                settlement: '消耗修正',
                trigger: 'onBeforeCost',
                hook: 'onBeforeCost;onBeforeSkill',
                priority: 13,
                params: 'costMultiplier *= 0.7',
                auto: '是',
                note: '魂技、魂骨技能、魂导器激活蓝量消耗降低30%。',
            }));
            rows.traitAttributeRules.push(traitAttributeRuleRow(source, '检定下限', {
                stage: 'daily',
                source: '洞悉/气场',
                target: '检定下限',
                formula: '洞悉与气场相关检定获得优势或下限保护',
                priority: 60,
                enabled: '否',
                note: '日常检定具体DC由剧情推进裁定。',
            }));
        }
        if (has(/reincarnation_again|再次踏上轮回/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '永劫燔世领域', {
                condition: '主动开启先天领域',
                duration: '领域开启期间',
                layer: '最终乘区/生命上限/强制单挑',
                formula: 'damageMultiplier *= 2.7;resource.hpMax *= 3',
                count: '0/1',
                note: 'HP与倍率由结构化状态触发；强制单挑、队友锁定、后遗症由剧情线记录。',
            }));
            rows.traitStoryProgress.push(traitStoryRow(source, '十二火种轮回', {
                goal: '推进十二火种与第10-12魂环规则',
                reward: '第一武魂神级化，领域永劫燔世按状态启用',
            }));
        }
        if (has(/king_treasure|王之宝库/)) {
            rows.traitStoryProgress.push(traitStoryRow(source, '王之宝库奇物权限', {
                goal: '每个重要场景可声明一件合理克制奇物',
                reward: '剧情菜单权限；不直接改写战斗数值',
            }));
        }
        if (has(/projection|投影/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '投影结构', {
                condition: '见过目标武魂/武器/魂导结构后声明投影',
                duration: '本场战斗',
                layer: '临时复制',
                formula: 'projection=manual',
                note: '复制对象、持续和代价写入战斗单位状态_脚本。',
            }));
        }
        if (has(/supreme_bone|至尊骨|至尊魂骨/)) {
            rows.soulBones.push({
                '部位': '外附魂骨',
                '当前物品名称': '至尊骨 / 至尊魂骨',
                '物品类型': '百万年外附魂骨',
                '品质/年限': '百万年',
                '是否装备': '是',
                '是否参与武魂相关计算': '否',
                '三维加成': '肉体+350;魂力+350;精神+350',
                '资源加成': '',
                '附带技能': '至尊魂骨技能组',
                '技能类型': '魂骨技能',
                '消耗/冷却': '按技能记录',
                '限制/代价': '剧情确认具体魂骨技能边界',
                '计算来源': source,
                '效果描述': '建卡特性生成；全属性+350。',
                '状态': '已装备',
            });
        }
        if (has(/god_trial|神考/)) {
            rows.traitStoryProgress.push(traitStoryRow(source, '十级神考路线', {
                goal: '每10级完成神考并领取节点奖励',
                reward: '第一武魂神级化；最终神考后开启百级通道',
            }));
        }
        if (has(/phoenix_god|凤凰神/)) {
            rows.traitTempStates.push(traitTempStateRow(source, '凤凰涅槃', {
                enabled: '是',
                condition: '每场战斗一次，受到致命伤害',
                duration: '瞬时',
                layer: '致命保护/净化/恢复',
                formula: 'fatalProtection=1;restoreHpPct=30',
                count: '1/1',
                hook: 'onFatalDamage',
                note: '解锁武魂真身后恢复50%，可转移给队友由剧情状态记录。',
            }));
            rows.traitStoryProgress.push(traitStoryRow(source, '涅槃凰心融合机制', {
                goal: '推进凤凰神炎、神火净化与涅槃重燃',
                reward: '超神级凤凰武魂资质；涅槃不是无限复活',
            }));
        }
        if (has(/traveler|穿越者/)) {
            rows.traitStoryProgress.push(traitStoryRow(source, '穿越者外挂声明', {
                goal: '记录穿越来源、前世知识、携带物和审查豁免边界',
                reward: '剧情承认配置；创建阶段不自动改数值',
            }));
        }
        if (has(/system|系统/)) {
            rows.traitStoryProgress.push(traitStoryRow(source, '系统奖励接口', {
                goal: '通过任务/签到/商店/成就等发放奖励',
                reward: '奖励需后续明确回写到表格',
            }));
        }
        if (has(/godking_shadow|神王之嗣的阴影/)) {
            rows.traitStoryProgress.push(traitStoryRow(source, '神王阴影倒计时', {
                goal: '追踪灵魂分裂、夺舍或高位阴影纠缠',
                reward: '负面剧情线；不自动给予数值收益',
            }));
        }
        return rows;
    }

    function thousandForgedRows(sourceName = '千冶成刃') {
        const lifeNote = '生命攻击值=最大HP×百分比，向下取整；只替代伤害公式中的攻击值，仍结算抗性/状态/命中/调整项；默认不再额外乘常规技能倍率。';
        return {
            traitRules: [
                {
                    '来源特性名称': sourceName,
                    '规则模块': '生命攻击值',
                    '结算方式': 'calculateCombat:lifeAttack',
                    '触发时机': 'onBeforeDamage',
                    '脚本钩子': 'calculateCombat.lifeAttack;onBeforeDamage',
                    '优先级': '20',
                    '启用条件': '攻击声明使用生命攻击值，或技能名包含血刃/归葬追击/千冶铸一',
                    '结算参数': '普通血刃=10%最大HP；强化血刃=15%最大HP；归葬追击=15%最大HP；千冶铸一=52.5%最大HP；不额外乘常规技能倍率',
                    '是否脚本自动执行': '否',
                    '备注': `${lifeNote}；脚本支持在 DouLuoAutoCalc.calculateCombat(input) 中通过 useLifeAttack/lifeAttackPct 或技能名关键词触发。`,
                },
                {
                    '来源特性名称': sourceName,
                    '规则模块': '血肉即薪',
                    '结算方式': '自损费用',
                    '触发时机': 'onBeforeDamage/onHpChanged',
                    '脚本钩子': 'onBeforeDamage;onHpChanged',
                    '优先级': '25',
                    '启用条件': '发动本特性相关主动攻击',
                    '结算参数': '失去最大生命值10%的当前生命值；不能被护盾/减伤/闪避/替身/治疗反向抵消；最低降至1',
                    '是否脚本自动执行': '否',
                    '备注': '自动计算返回 selfCost 提示，实际扣血由剧情/状态写回确认。',
                },
                {
                    '来源特性名称': sourceName,
                    '规则模块': '血炉剑域',
                    '结算方式': '临时领域/乘区',
                    '触发时机': '主动开启/onBattleStart',
                    '脚本钩子': 'onBattleStart;onTurnStart;onAfterDamage',
                    '优先级': '30',
                    '启用条件': '每场战斗1次，失去最大生命值20%当前生命值',
                    '结算参数': '持续3回合或至战斗结束；最终伤害+30%；受最终伤害-30%；治疗+30%；嘲讽；免疫第一次常规无法行动控制；归葬追击延长1回合',
                    '是否脚本自动执行': '否',
                    '备注': '开启后应把特性临时状态与乘区表「血炉剑域」改为启用。',
                },
                {
                    '来源特性名称': sourceName,
                    '规则模块': '充能与追击',
                    '结算方式': '状态计数/追加攻击',
                    '触发时机': 'onAfterDamage/onAfterAllyAction/onTurnEnd',
                    '脚本钩子': 'onAfterDamage;onAfterAllyAction;onTurnEnd',
                    '优先级': '35',
                    '启用条件': '血炉剑域期间',
                    '结算参数': '千锤百炼充能上限7；满7清空并触发归葬追击；归葬追击生命攻击值=15%最大HP，不产生新充能',
                    '是否脚本自动执行': '否',
                    '备注': '神若当殒额外充能每目标回合结束后至多触发一次。',
                },
                {
                    '来源特性名称': sourceName,
                    '规则模块': '千冶百工',
                    '结算方式': '检定自动成功',
                    '触发时机': 'onDailyCheck/onStoryEvent',
                    '脚本钩子': 'onDailyCheck;onStoryEvent',
                    '优先级': '40',
                    '启用条件': '常规百工检定',
                    '结算参数': '常规百工检定自动成功；神级造物/唯一神器/跨境界魂导器/神位载体/规则级机关/剧情核心造物不能自动成功，但获得优势',
                    '是否脚本自动执行': '否',
                    '备注': '高阶失败通常改为成功但有代价、需要额外材料、时间或剧情条件。',
                },
            ],
            traitAttributeRules: [
                {
                    '来源特性名称': sourceName,
                    '是否启用': '否',
                    '规则类型': '检定自动成功',
                    '作用阶段': 'dailyCheck/craft',
                    '来源属性': '百工',
                    '目标属性': '常规百工检定',
                    '作用范围': '常规制作/炼器/机关/魂导器维护',
                    '结算公式/参数': '常规百工检定视为自动成功；高阶造物仅获得优势',
                    '上限/下限': '不适用于神级造物/唯一神器/剧情核心造物的无条件成功',
                    '叠加规则': '不与其他自动成功重复叠加',
                    '脚本钩子': 'onDailyCheck',
                    '优先级': '40',
                    '备注': '千冶：失败时通常转为成功但有代价或需要材料/时间/剧情条件。',
                },
            ],
            traitTempStates: [
                {
                    '来源特性名称': sourceName,
                    '状态名称': '血炉剑域',
                    '是否启用': '否',
                    '触发条件': '每场战斗一次，主动失去最大生命值20%的当前生命值',
                    '持续时间': '3回合或本场战斗结束；归葬追击可延长1回合',
                    '影响对象': '自身/敌方全体',
                    '乘区类型': '最终伤害/承伤/治疗/控制免疫',
                    '修正公式/数值': '自身最终伤害×1.3；受最终伤害×0.7；治疗×1.3；免疫第一次常规无法行动控制',
                    '是否可叠加': '否',
                    '当前层数/次数': '0/1',
                    '脚本钩子': 'onBattleStart;onTurnStart;onAfterDamage',
                    '备注': '开启时同步给敌方全体煞火缠身2回合。',
                },
                {
                    '来源特性名称': sourceName,
                    '状态名称': '煞火缠身',
                    '是否启用': '否',
                    '触发条件': '血炉剑域开启时敌方全体获得；我方攻击可刷新目标',
                    '持续时间': '2回合，可刷新',
                    '影响对象': '敌方目标',
                    '乘区类型': '承受属性/状态修正',
                    '修正公式/数值': '被你攻击时承受属性视为80%；受你伤害状态修正×1.3；受队友伤害状态修正×1.15',
                    '是否可叠加': '否',
                    '当前层数/次数': '0',
                    '脚本钩子': 'onAfterDamage',
                    '备注': '血炉剑域期间敌方抗性修正下降一级，最低至小弱点；已有弱点时你造成伤害状态修正额外×1.15。',
                },
                {
                    '来源特性名称': sourceName,
                    '状态名称': '千锤百炼充能',
                    '是否启用': '否',
                    '触发条件': '受伤、自损、队友攻击煞火目标、队友施放大招/真身/融合技/倍率>3.0x技能',
                    '持续时间': '血炉剑域期间',
                    '影响对象': '自身',
                    '乘区类型': '充能/追加攻击',
                    '修正公式/数值': '上限7；满7清空并触发归葬追击；炉火未熄与神若当殒可额外充能',
                    '是否可叠加': '是',
                    '当前层数/次数': '0/7',
                    '脚本钩子': 'onAfterDamage;onAfterAllyAction;onTurnEnd',
                    '备注': '归葬追击不消耗行动，生命攻击值=15%最大HP，不产生新充能。',
                },
                {
                    '来源特性名称': sourceName,
                    '状态名称': '万劫不灭',
                    '是否启用': '否',
                    '触发条件': '血炉剑域期间受到致命伤害',
                    '持续时间': '每场战斗一次',
                    '影响对象': '自身',
                    '乘区类型': '致命保护/恢复',
                    '修正公式/数值': '解除血炉剑域，清空充能，恢复最大生命值25%；解锁武魂真身后恢复50%',
                    '是否可叠加': '否',
                    '当前层数/次数': '1/1',
                    '脚本钩子': 'onFatalDamage',
                    '备注': '触发后本场战斗置为0/1。',
                },
                {
                    '来源特性名称': sourceName,
                    '状态名称': '千冶铸一',
                    '是否启用': '否',
                    '触发条件': '解锁武魂真身后，血炉剑域期间每场战斗一次',
                    '持续时间': '瞬时；使用后解除血炉剑域',
                    '影响对象': '敌方全体',
                    '乘区类型': '范围攻击/终结技',
                    '修正公式/数值': '主动失去当前生命值50%；生命攻击值=52.5%最大HP；煞火目标状态修正额外×1.3',
                    '是否可叠加': '否',
                    '当前层数/次数': '0/1',
                    '脚本钩子': 'onBeforeDamage;onAfterDamage',
                    '备注': '使用后本场战斗无法再次开启血炉剑域。',
                },
            ],
        };
    }

    function addThousandForgedCreationOps(db, ops, sourceName = '千冶成刃', fallbackBase = 80) {
        const rowsByTable = thousandForgedRows(sourceName);
        rowsByTable.traitRules.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitRules, data, {
            fallbackIndex: fallbackBase + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '规则模块')) === asText(data['规则模块']),
        }));
        rowsByTable.traitAttributeRules.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitAttributeRules, data, {
            fallbackIndex: fallbackBase + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '规则类型')) === asText(data['规则类型']) && asText(cell(row, '目标属性')) === asText(data['目标属性']),
        }));
        rowsByTable.traitTempStates.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitTempStates, data, {
            fallbackIndex: fallbackBase + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '状态名称')) === asText(data['状态名称']),
        }));
    }

    function addTraitAdaptationCreationOps(db, ops, trait, traitIndex) {
        const sourceName = traitSourceName(trait);
        const rowsByTable = adaptationRowsForTrait(trait);
        const base = 20 + traitIndex * 80;
        rowsByTable.traitRules.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitRules, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '规则模块')) === asText(data['规则模块']),
        }));
        rowsByTable.traitAttributeRules.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitAttributeRules, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName
                && asText(cell(row, '规则类型')) === asText(data['规则类型'])
                && asText(cell(row, '目标属性')) === asText(data['目标属性']),
        }));
        rowsByTable.traitTempStates.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitTempStates, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '状态名称')) === asText(data['状态名称']),
        }));
        rowsByTable.traitStoryProgress.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitStoryProgress, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '剧情线名称')) === asText(data['剧情线名称']),
        }));
        rowsByTable.soulBones.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.soulBones, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '当前物品名称')) === asText(data['当前物品名称']) || asText(cell(row, '计算来源')) === sourceName,
        }));
    }

    function traitInitialState(trait, adaptation, traitDescText) {
        const text = traitIdentityText(trait);
        const out = {
            stage: adaptation?.type === 'recordOnly' ? '剧情记录' : adaptation?.type === 'manualTrigger' ? '待触发' : '常驻',
            remaining: '',
            refresh: '',
            duration: adaptation?.type === 'recordOnly' ? '永久/剧情推进' : '永久',
            marker: adaptation?.type === 'combatHook' ? '待触发' : '建卡写入',
            hook: adaptation?.type === 'combatHook' ? 'onBeforeDamage;onAfterDamage;onFatalDamage;onBeforeSkill' : 'onBeforeStatRecalc',
            note: traitDescText,
        };
        if (/thousand_forged_blade|千冶成刃/.test(text)) {
            out.stage = '常驻；血炉剑域未开启；充能0/7';
            out.remaining = '血炉剑域1/1；万劫不灭1/1；千冶铸一0/1';
            out.refresh = '每场战斗刷新；千冶铸一需武魂真身后可用';
            out.duration = '常驻；血炉剑域开启后3回合';
            out.hook = 'onBeforeDamage;onAfterDamage;onFatalDamage;onDailyCheck';
        } else if (/twelve_trials|十二试炼/.test(text)) {
            out.stage = '常驻；致命免疫待触发';
            out.remaining = '12/12';
            out.refresh = '不恢复';
            out.hook = 'onFatalDamage';
        } else if (/phoenix_god|凤凰神/.test(text)) {
            out.stage = '常驻；涅槃未触发';
            out.remaining = '涅槃1/1';
            out.refresh = '每场战斗刷新';
            out.hook = 'onFatalDamage;onAfterDamage';
        } else if (/fire_steel|火与钢|狂战士/.test(text)) {
            out.stage = '常驻；低血线未触发';
            out.remaining = '复仇恢复1/1';
            out.refresh = '每场战斗刷新';
            out.hook = 'onHpChanged;onFatalDamage;onBeforeDamage';
        } else if (/uncrowned_king|无冕之王|一刀修罗/.test(text)) {
            out.stage = '常驻；爆发未开启';
            out.remaining = '1/1';
            out.refresh = '每天刷新';
            out.duration = '开启后短时间';
            out.hook = 'onDailyCheck;onBeforeDamage';
        } else if (/nascent_soul|元婴/.test(text)) {
            out.stage = '常驻；额外行动未使用';
            out.remaining = '1/1';
            out.refresh = '每场战斗刷新';
            out.hook = 'onBattleStart;onTurnStart;onAfterDamage';
        }
        return out;
    }

    function addAttributeEffectCreationOps(db, ops, attributeTotals = {}) {
        const sourceName = '武魂属性效果';
        const base = 900;
        const ruleRows = [];
        const tempRows = [];
        const extraSlots = Number(attributeTotals.extraSoulDeviceSlots || 0) || 0;
        const hpBonusPct = Number(attributeTotals.hpBonusPct || 0) || 0;
        const recoveryBonusPct = Number(attributeTotals.recoveryBonusPct || 0) || 0;
        const attackPct = Number(attributeTotals.attackCoefficientBonusPct || 0) || 0;
        const defensePct = Number(attributeTotals.defenseCoefficientBonusPct || 0) || 0;
        const antiEvilPct = Number(attributeTotals.antiEvilAttackPct || 0) || 0;
        if (hpBonusPct) ruleRows.push(traitRuleRow(sourceName, '生命属性HP上限', {
            settlement: '资源改写',
            trigger: 'onBeforeStatRecalc/resource',
            priority: base,
            params: `resource.hpMax *= ${round(1 + hpBonusPct / 100)}`,
            auto: '是',
            note: `来自规则/特殊属性汇总：HP上限+${hpBonusPct}%`,
        }));
        if (attackPct) ruleRows.push(traitRuleRow(sourceName, '攻击系数修正', {
            settlement: '战斗乘区',
            trigger: 'onBeforeDamage',
            hook: 'onBeforeDamage',
            priority: base + 1,
            params: `damageMultiplier *= ${round(1 + attackPct / 100)}`,
            auto: '是',
            note: `来自规则属性：攻击系数+${attackPct}%`,
        }));
        if (defensePct) ruleRows.push(traitRuleRow(sourceName, '防御系数修正', {
            settlement: '承伤乘区',
            trigger: 'onBeforeDamage',
            hook: 'onBeforeDamage',
            priority: base + 2,
            params: `incomingDamageMultiplier *= ${round(1 - defensePct / 100)}`,
            auto: '是',
            note: `来自规则属性：防御系数+${defensePct}%`,
        }));
        if (antiEvilPct) ruleRows.push(traitRuleRow(sourceName, '破邪特攻', {
            settlement: '战斗乘区',
            trigger: 'onBeforeDamage',
            hook: 'onBeforeDamage',
            priority: base + 3,
            params: `target.tags contains 邪 => damageMultiplier *= ${round(1 + antiEvilPct / 100)}`,
            auto: '是',
            note: `对邪祟/邪魂师/邪恶标签目标伤害+${antiEvilPct}%`,
        }));
        if (recoveryBonusPct) tempRows.push(traitTempStateRow(sourceName, '恢复效果修正', {
            enabled: '是',
            condition: '治疗/恢复效果结算',
            duration: '常驻',
            layer: '治疗乘区',
            formula: `healingMultiplier *= ${round(1 + recoveryBonusPct / 100)}`,
            hook: 'onBeforeHeal',
            note: `来自规则属性：恢复+${recoveryBonusPct}%`,
        }));
        ruleRows.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitRules, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '规则模块')) === asText(data['规则模块']),
        }));
        tempRows.forEach((data, index) => addMappingOp(db, ops, CONFIG.tables.traitTempStates, data, {
            fallbackIndex: base + index,
            match: row => asText(cell(row, '来源特性名称')) === sourceName && asText(cell(row, '状态名称')) === asText(data['状态名称']),
        }));
        for (let index = 0; index < extraSlots; index += 1) {
            const slotNo = index + 1;
            addMappingOp(db, ops, CONFIG.tables.traitEquipmentSlots, {
                '来源特性名称': sourceName,
                '槽位编号': `soul_device_extra_attr_${slotNo}`,
                '槽位名称': `属性额外魂导器槽${slotNo}`,
                '装备栏类型': '魂导器栏',
                '允许装备类型': '魂导器',
                '绑定装备表': CONFIG.tables.soulDevices,
                '是否默认隐藏': '否',
                '显示条件': '武魂规则属性提供额外魂导器槽',
                '是否显示_脚本': '是',
                '是否启用': '是',
                '是否允许同类叠加': '是',
                '是否参与武魂相关计算': '否',
                '是否参与倍率计算': '否',
                '脚本钩子': 'onEquipmentSlotRefresh;onEquipmentChanged',
                '备注': '由角色创建页 attributeEffectTotals.extraSoulDeviceSlots 写入。',
            }, {
                fallbackIndex: base + 10 + index,
                match: row => asText(cell(row, '槽位编号')) === `soul_device_extra_attr_${slotNo}`,
            });
        }
    }

    function noteSummary(note) {
        if (!note || typeof note !== 'object') return '';
        return Object.entries(note).filter(([, value]) => asText(value)).map(([key, value]) => `${key}:${asText(value)}`).join(';');
    }

    function clipText(value, maxLength) {
        const text = asText(value);
        if (!Number.isFinite(Number(maxLength)) || maxLength <= 0) return text;
        return text.length > maxLength ? text.slice(0, maxLength) : text;
    }

    function creationTimeSpan(payload) {
        const explicit = asText(payload?.timeSpan || payload?.time_span || payload?.timeline).replace(/～/g, '~');
        if (explicit.includes('~')) return explicit;
        const chapter = asText(payload?.chapter || payload?.character?.chapter || '第一章').replace(/～/g, '~');
        if (chapter.includes('~')) return chapter;
        return `开局建档 ~ ${chapter || '第一章'}`;
    }

    function creationDayCount(payload) {
        const value = Number(payload?.dayCount ?? payload?.day_count ?? payload?.day);
        return Number.isFinite(value) && value >= 1 ? String(Math.floor(value)) : '1';
    }

    function buildCreationMapping(payload, db = {}) {
        const character = payload?.character || {};
        const pointBuy = payload?.pointBuy || {};
        const profile = payload?.effectiveInnateProfile || {};
        const worldBook = payload?.worldBookProfile || {};
        const ops = [];
        const runtimeTable = runtimeStatsTableName(db);
        const battle = character.battle || payload?.battle || {};
        const daily = character.daily || payload?.daily || {};
        const dailyLabels = { comprehension: '悟性', presence: '气场', craft: '百工', luck: '气运', knowledge: '学识', experience: '阅历' };
        const attributeTotals = character.attributeEffectTotals || payload?.attributeEffectTotals || {};
        const dailyAttributeBonuses = attributeTotals.dailyAttributeBonuses || {};
        const dailyText = Object.entries(daily).map(([key, value]) => {
            const base = Number(value ?? 8) || 8;
            const bonusValue = Number(dailyAttributeBonuses[key] || 0) || 0;
            const total = base + bonusValue;
            return `${dailyLabels[key] || key}:${total}${bonusValue ? `(基础${base}+属性${bonusValue})` : ''}`;
        }).join(';');
        const attributeCheckText = asText(attributeTotals.dailyCheckBonusSummary)
            || (Array.isArray(attributeTotals.dailyCheckBonuses) ? attributeTotals.dailyCheckBonuses.map(item => asText(item.summary) || [asText(item.attr), asText(item.scene), asText(item.check) ? `${asText(item.check)}检定+${Number(item.bonus) || 1}` : '检定+1'].filter(Boolean).join(':')).filter(Boolean).join(';') : '');
        const attributeSpecialText = asText(attributeTotals.specialEffectSummary)
            || (Array.isArray(attributeTotals.specialEffects) ? attributeTotals.specialEffects.map(item => asText(item.summary)).filter(Boolean).join(';') : '');
        const level = asText(character.level) || asText(profile.level) || '10';
        const name = asText(character.name) || (payload?.species === 'beast' ? '未命名魂兽' : '未命名魂师');
        const effectiveSouls = (Array.isArray(character.effectiveSouls) && character.effectiveSouls.length
            ? character.effectiveSouls
            : Array.isArray(payload?.effectiveSouls) && payload.effectiveSouls.length
                ? payload.effectiveSouls
                : character.souls || []).slice(0, 3);
        const traitEffects = Array.isArray(character.traitEffects) && character.traitEffects.length
            ? character.traitEffects
            : Array.isArray(payload?.traitEffects)
                ? payload.traitEffects
                : [];
        const traitEffectSummary = traitEffects.map(effect => asText(effect.summary) || [asText(effect.traitName), asText(effect.type)].filter(Boolean).join(':')).filter(Boolean).join(';');
        const highBackground = character.resources?.highBackground || {};
        const highBackgroundText = Object.entries(highBackground).filter(([, value]) => asText(value)).map(([key, value]) => `${key}:${asText(value)}`).join(';');
        const bondProfiles = character.bondProfiles || payload?.bondProfiles || {};
        const bondProfileText = Object.entries(bondProfiles).flatMap(([type, list]) => Array.isArray(list)
            ? list.filter(item => item && Object.values(item).some(value => asText(value))).map(item => `${type}:${asText(item.name) || '未命名'}(${asText(item.identity)}/${asText(item.relationship)}/${asText(item.favorTrend)}/${asText(item.plotPurpose)})`)
            : []).join(';');

        addMappingOp(db, ops, CONFIG.tables.player, {
            '人物名称': name,
            '性别': asText(character.gender),
            '年龄/阶段': asText(character.age),
            '身份/阵营': [payload?.species === 'beast' ? `魂兽开局/${payload?.beastForm || ''}` : '人类魂师', asText(character.profileRole)].filter(Boolean).join(' / '),
            '外貌特征': [asText(character.profileAppearance), asText(character.outfit), asText(character.concept)].filter(Boolean).join('；'),
            '当前所在主地点': asText(payload?.location),
            '当前子地点': asText(payload?.chapter),
            '魂力等级': level,
            '当前目标': asText(character.startingGoal) || '开局建档完成，等待第一幕推进',
            '状态备注': [asText(character.canonRelation), asText(character.concept), highBackgroundText, bondProfileText, attributeCheckText ? `属性检定修正=${attributeCheckText}` : '', attributeSpecialText ? `特殊属性效果=${attributeSpecialText}` : ''].filter(Boolean).join('；'),
        }, { fallbackIndex: 1 });

        addMappingOp(db, ops, CONFIG.tables.stats, {
            '魂力等级': level,
            '肉体_基础': String(battle.body ?? 1),
            '魂力_基础': String(battle.soulPower ?? battle.soul ?? 1),
            '精神_基础': String(battle.spirit ?? battle.mind ?? 1),
            '日常六维与调整值': dailyText,
        }, { fallbackIndex: 1 });

        addMappingOp(db, ops, runtimeTable, runtimeTable === CONFIG.tables.statsRuntime ? runtimeRowDefaults({
            '特性点': String(pointBuy.remain ?? pointBuy.spRemain ?? CONFIG.defaults.baseSp),
            '红尘点': String(pointBuy.dpRemain ?? CONFIG.defaults.baseDp),
            '自动计算锁定': '否',
            '计算备注': [`前端建档;SP剩余=${pointBuy.remain ?? pointBuy.spRemain ?? CONFIG.defaults.baseSp};DP剩余=${pointBuy.dpRemain ?? CONFIG.defaults.baseDp}`, attributeCheckText ? `属性检定修正=${attributeCheckText}` : '', attributeSpecialText ? `特殊属性效果=${attributeSpecialText}` : ''].filter(Boolean).join(';'),
        }) : {
            '特性点': String(pointBuy.remain ?? pointBuy.spRemain ?? CONFIG.defaults.baseSp),
            '红尘点': String(pointBuy.dpRemain ?? CONFIG.defaults.baseDp),
            '自动计算锁定': '否',
            '计算备注': [`前端建档;SP剩余=${pointBuy.remain ?? pointBuy.spRemain ?? CONFIG.defaults.baseSp};DP剩余=${pointBuy.dpRemain ?? CONFIG.defaults.baseDp}`, attributeCheckText ? `属性检定修正=${attributeCheckText}` : '', attributeSpecialText ? `特殊属性效果=${attributeSpecialText}` : ''].filter(Boolean).join(';'),
        }, { fallbackIndex: 1 });

        effectiveSouls.forEach((soul, index) => {
            const soulName = payloadSoulName(soul, index);
            const waivedNote = soul.costWaived
                ? `免费生效;标准价值=${asText(soul.standardSpValue) || '待定'}SP;来源=${asText(soul.grantSource || soul.costWaiverReason)}`
                : '';
            const templateNote = soul.templateId
                ? `模板武魂=${asText(soul.templateName || soul.templateId)};模板先天加值=${Number(soul.templateInnateBonus ?? soul.templateBonus?.innateBonus ?? 0) || 0};模板倍率加值=${Number(soul.templateMultiplierBonus ?? soul.templateBonus?.multiplierBonus ?? 0) || 0};模板特性=${asText(soul.templateFeatureRules || soul.templateBonus?.featureSummary)}${asText(soul.growthRule) ? `;成长规则=${asText(soul.growthRule)}` : ''}`
                : '';
            const attributeNote = soul.attributeEffects && asText(soul.attributeEffects.summary)
                ? `属性效果=${asText(soul.attributeEffects.summary)}`
                : '';
            addMappingOp(db, ops, CONFIG.tables.soulOverview, {
                '序号': String(index + 1),
                '武魂名称': soulName,
                '主导倾向': asText(soul.dominance),
                '武魂品级': payloadSoulQualityName(soul),
                '觉醒状态': soul.unlocked ? '已觉醒' : '未觉醒',
                '是否极致_脚本': soul.isExtreme ? '是' : '否',
                '特殊属性': [...(soul.normalAttributes || []), soul.customAttribute, ...(soul.ruleAttributes || [])].filter(Boolean).join('/'),
                '是否本体武魂': soul.category === '本体武魂' || soul.isBodySoul ? '是' : '否',
                '本体部位': soul.category === '本体武魂' ? asText(soul.bodyPart) : '',
                '简介与描述': [asText(soul.appearance), asText(soul.combatStyle), soul.isExtreme ? `极致属性=${asText(soul.extremeAttribute) || '待定'}` : ''].filter(Boolean).join('；'),
                '武魂来源/形态': [asText(soul.category || soul.cat), soul.templateId ? `模板:${asText(soul.templateName || soul.templateId)}` : ''].filter(Boolean).join('/'),
                '规则属性': (soul.ruleAttributes || []).join('/'),
                '限制/代价': asText(soul.costOrLimit),
                '计算备注': [`前端建档;品质对应等级=${soul.innateSoulPower || soul.qualityMappedLevel || ''};极致属性=${soul.isExtreme ? (asText(soul.extremeAttribute) || '待定') : '否'}`, templateNote, attributeNote, waivedNote, asText(soul.traitEffectSummary)].filter(Boolean).join(';'),
            }, { fallbackIndex: index + 1, match: row => Number(cell(row, '序号')) === index + 1 || asText(cell(row, '武魂名称')) === soulName });
        });

        CONFIG.tables.rings.forEach((tableName, soulIndex) => {
            const soul = effectiveSouls[soulIndex] || {};
            const ringNotes = character.ringNotes || {};
            (character.rings || []).forEach((value, index) => {
                const note = ringNotes[`ring-${index}`] || {};
                if (String(value || 'none') === 'none' && !noteSummary(note)) return;
                addMappingOp(db, ops, tableName, {
                    '武魂名称': payloadSoulName(soul, soulIndex),
                    '魂环序号': String(index + 1),
                    '魂技名称': noteText(note, 'skill1Name') || noteText(note, 'name') || `第${index + 1}魂环`,
                    '魂环年限': ageLabel(value),
                    '魂环颜色': ageLabel(value),
                    '魂环类型': noteText(note, 'source') || '待定',
                    '魂兽来源': noteText(note, 'source'),
                    '来源标签': noteText(note, 'source'),
                    '详细效果': noteSummary(note),
                }, { fallbackIndex: index + 1, match: row => Number(cell(row, '魂环序号')) === index + 1 });
            });
        });

        const spiritNotes = character.spiritNotes || {};
        (character.spirits || []).forEach((value, index) => {
            const note = spiritNotes[`spirit-${index}`] || {};
            if (String(value || 'none') === 'none' && !noteSummary(note)) return;
            const spiritName = noteText(note, 'name') || `魂灵契约${index + 1}`;
            addMappingOp(db, ops, CONFIG.tables.spirits, {
                '魂灵名称': spiritName,
                '年限/等级': ageLabel(value),
                '绑定武魂': payloadSoulName(effectiveSouls[0] || {}, 0),
                '附带魂环/魂技': noteText(note, 'skill1Name') || '待定',
                '特殊能力': noteSummary(note),
                '状态': '已记录',
                '备注': '前端建档写入',
            }, { fallbackIndex: index + 1, match: row => asText(cell(row, '魂灵名称')) === spiritName });
        });

        const traitDetails = character.resources?.traitDetails || [];
        traitDetails.forEach((trait, index) => {
            const traitNameText = asText(trait.name);
            if (!traitNameText) return;
            const custom = trait.id === 'custom_specialty';
            const adaptation = traitAdaptationFor(trait);
            const traitConfigText = asText(trait.configSummary);
            const traitDescText = [asText(trait.desc), traitConfigText ? `配置=${traitConfigText}` : ''].filter(Boolean).join(';');
            const stateInit = traitInitialState(trait, adaptation, traitDescText);
            addMappingOp(db, ops, CONFIG.tables.traits, {
                '特性名称': traitNameText,
                '花费特性点': `${Number(trait.cost) > 0 ? '+' : ''}${trait.cost || 0} SP`,
                '特性类型': asText(trait.tag) || '特性',
                '结算方式': custom ? '待解析规则' : (adaptation?.settlement || '被动常驻'),
                '触发时机': adaptation?.type === 'combatHook' ? '建卡/进入战斗/触发状态' : '建卡/onBeforeStatRecalc',
                '脚本钩子': stateInit.hook.includes('onBeforeDamage') ? `onCharacterCreate;${stateInit.hook}` : `onCharacterCreate;${stateInit.hook}`,
                '底层规则干涉': traitDescText,
            }, { fallbackIndex: index + 1, match: row => asText(cell(row, '特性名称')) === traitNameText });
            addMappingOp(db, ops, CONFIG.tables.traitState, {
                '特性名称': traitNameText,
                '来源特性行编号': String(index + 1),
                '是否启用': '是',
                '当前阶段/状态': custom ? '待解析规则' : stateInit.stage,
                '剩余次数': stateInit.remaining,
                '冷却/刷新条件': stateInit.refresh,
                '持续时间': stateInit.duration,
                '触发标记': stateInit.marker,
                '脚本钩子': stateInit.hook,
                '状态备注': [traitDescText, adaptation ? `适配=${adaptation.type};落表=${adaptation.tables}` : ''].filter(Boolean).join(';'),
            }, { fallbackIndex: index + 1, match: row => asText(cell(row, '特性名称')) === traitNameText });
            addTraitAdaptationCreationOps(db, ops, trait, index);
            if (isThousandForgedTrait(trait)) addThousandForgedCreationOps(db, ops, traitNameText, 80 + index * 10);
        });
        addAttributeEffectCreationOps(db, ops, attributeTotals);

        traitEffects.forEach((effect, index) => {
            const effectName = asText(effect.summary) || `${asText(effect.traitName) || '特性效果'}:${asText(effect.type)}`;
            const sourceName = asText(effect.traitName) || '特性效果';
            const ruleModule = asText(effect.type) || '特性效果';
            addMappingOp(db, ops, CONFIG.tables.traitRules, {
                '来源特性名称': sourceName,
                '规则模块': ruleModule,
                '结算方式': '前端建档记录',
                '触发时机': '建卡生效',
                '脚本钩子': 'onCharacterCreate',
                '优先级': String(100 + index),
                '启用条件': '已选特性启用',
                '结算参数': effectName,
                '是否脚本自动执行': '否',
                '备注': [
                    Number.isFinite(Number(effect.slotIndex)) ? `武魂槽=${Number(effect.slotIndex) + 1}` : '',
                    effect.replacedSoul ? `原始保留=${payloadSoulName(effect.replacedSoul, Number(effect.slotIndex) || 0)}` : '',
                ].filter(Boolean).join(';'),
            }, {
                fallbackIndex: index + 1,
                match: row => asText(cell(row, '来源特性名称')) === sourceName
                    && asText(cell(row, '规则模块')) === ruleModule
                    && asText(cell(row, '结算参数')) === effectName,
            });
        });

        const chronicleSummary = clipText([
            `时代=${payload?.era?.name || ''};综合先天魂力=${profile.level || ''}`,
            traitEffectSummary ? `特性效果=${traitEffectSummary}` : '',
        ].filter(Boolean).join(';') || '开局建档', 80);
        const chronicleText = clipText([
            asText(character.concept) || '角色创建前端写入开局档案',
            `角色=${name}`,
            asText(payload?.location) ? `地点=${asText(payload?.location)}` : '',
            asText(character.bondNote) ? `待办=${asText(character.bondNote)}` : '',
        ].filter(Boolean).join('；'), 750);
        addMappingOp(db, ops, CONFIG.tables.notes, {
            '编码索引': 'character-create',
            '时间跨度': creationTimeSpan(payload),
            '概览': chronicleSummary,
            '纪要': chronicleText,
            '重要对话': '',
            '天数': creationDayCount(payload),
        }, { match: row => asText(cell(row, '编码索引')) === 'character-create' });

        (worldBook.bondCharacterControls || []).forEach((npc, index) => {
            const npcName = asText(npc.name);
            if (!npcName) return;
            addMappingOp(db, ops, CONFIG.tables.npcs, {
                '姓名': npcName,
                '性别': asText(npc.gender),
                '身份/阵营': asText(npc.groupName || npc.version),
                '当前地点': asText(payload?.location),
                '关系定位': '前端羁绊控制预留',
                '当前状态': asText(npc.version),
                '互动准则': (npc.entries || []).join('/'),
                '关系变化提示': asText(character.bondNote) || '按剧情推进更新',
                '备注': '角色创建前端写入，不推断未填能力',
            }, { fallbackIndex: index + 1, match: row => asText(cell(row, '姓名')) === npcName });
        });

        return { payload, ops, summary: { count: ops.length, tables: Array.from(new Set(ops.map(op => op.table))), spRemain: pointBuy.remain ?? pointBuy.spRemain } };
    }

    function previewCreationMapping(payload, dbOverride = null) {
        const db = dbOverride || (api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : {});
        return buildCreationMapping(payload, db);
    }

    function apiWriteFailed(result) {
        return result === false
            || result === null
            || result === -1
            || (result && typeof result === 'object' && result.success === false);
    }

    function writeMutationOptions(options = {}) {
        const quiet = options.quiet !== false;
        return {
            skipNotify: options.skipNotify ?? quiet,
            silent: options.silent ?? quiet,
            isImportMode: options.isImportMode ?? quiet,
        };
    }

    async function updateRowCompat(tableName, rowIndex, data, options = {}) {
        if (!api || typeof api.updateRow !== 'function') return false;
        const safeData = sanitizeWriteData(data);
        try {
            const result = await api.updateRow(tableName, rowIndex, safeData);
            if (!apiWriteFailed(result) || options.fallbackObject === false) return result;
        } catch (error) {
            if (options.fallbackObject === false) throw error;
            console.warn(`[${SCRIPT_NAME}] updateRow legacy args failed, fallback to object args`, error);
        }
        try {
            return await api.updateRow({
                tableName,
                rowIndex,
                data: safeData,
                ...writeMutationOptions(options),
            });
        } catch (error) {
            console.warn(`[${SCRIPT_NAME}] updateRow object args failed`, error);
            return false;
        }
    }

    async function insertRowCompat(tableName, data, options = {}) {
        if (!api || typeof api.insertRow !== 'function') return false;
        const safeData = completeInsertData(tableName, data);
        try {
            const result = await api.insertRow(tableName, safeData);
            if (!apiWriteFailed(result) || options.fallbackObject === false) return result;
        } catch (error) {
            if (options.fallbackObject === false) throw error;
            console.warn(`[${SCRIPT_NAME}] insertRow legacy args failed, fallback to object args`, error);
        }
        try {
            return await api.insertRow({
                tableName,
                data: safeData,
                ...writeMutationOptions(options),
            });
        } catch (error) {
            console.warn(`[${SCRIPT_NAME}] insertRow object args failed`, error);
            return false;
        }
    }

    async function deleteRowCompat(tableName, rowIndex, options = {}) {
        const deleteFn = api && (api.deleteRow || api.removeRow);
        if (!deleteFn) return false;
        try {
            const result = await deleteFn.call(api, tableName, rowIndex);
            if (!apiWriteFailed(result) || options.fallbackObject === false) return result;
        } catch (error) {
            if (options.fallbackObject === false) throw error;
            console.warn(`[${SCRIPT_NAME}] deleteRow legacy args failed, fallback to object args`, error);
        }
        try {
            return await deleteFn.call(api, {
                tableName,
                rowIndex,
                ...writeMutationOptions(options),
            });
        } catch (error) {
            console.warn(`[${SCRIPT_NAME}] deleteRow object args failed`, error);
            return false;
        }
    }

    async function applyCreationPayload(payload, options = {}) {
        api = getDatabaseApi() || api || await waitForDatabaseApi();
        if (!api || typeof api.updateRow !== 'function') return { ok: false, message: 'AutoCardUpdaterAPI.updateRow unavailable' };
        const db = api.exportTableAsJson ? api.exportTableAsJson() : {};
        const mapping = buildCreationMapping(payload, db);
        const readiness = verifyDatabaseReady(db, mapping.summary.tables);
        if (!readiness.ok) {
            console.warn(`[${SCRIPT_NAME}] ${readiness.message}`, readiness.missing);
            return { ok: false, message: readiness.message, missingTables: readiness.missing, mapping };
        }
        const spRemain = Number(mapping.summary.spRemain);
        if (Number.isFinite(spRemain) && spRemain < 0 && !options.force) {
            return { ok: false, message: 'SP 已超支，阻止写入数据库。', mapping };
        }
        const missing = [];
        for (const op of mapping.ops) {
            if (op.rowIndex) {
                const result = await updateRowCompat(op.table, op.rowIndex, op.data, options);
                if (apiWriteFailed(result)) missing.push(`${op.table}:updateRow失败`);
            } else if (typeof api.insertRow === 'function') {
                const result = await insertRowCompat(op.table, op.data, options);
                if (apiWriteFailed(result)) missing.push(`${op.table}:insertRow失败`);
            }
            else missing.push(`${op.table}:缺少可写行`);
        }
        let recalculation = null;
        if (!options.skipRecalculate) {
            recalculation = await recalculate({ force: true });
            if ((recalculation?.skipped || recalculation?.ok === false) && api.refreshDataAndWorldbook) await api.refreshDataAndWorldbook();
        }
        else if (api.refreshDataAndWorldbook) await api.refreshDataAndWorldbook();
        return { ok: missing.length === 0, message: missing.length ? `部分写入完成，跳过${missing.length}项。` : `已写入${mapping.ops.length}项数据库更新。`, missing, mapping };
    }

    function diagnose(dbOverride = null) {
        const db = dbOverride || (api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : null);
        const issues = [];
        if (!db) return { ok: false, issues: ['无法读取数据库'] };
        const missing = missingTables(db);
        if (missing.length) {
            issues.push(databaseRepairHint(missing));
            missing.forEach(tableName => issues.push(`缺少表：${tableName}`));
        }
        for (const row of rows(db, CONFIG.tables.traitRules)) {
            const formula = cell(row, '结算参数');
            if (asText(formula)) {
                const diagnostics = [];
                executeDsl({ base: bonus(), martial: bonus(), other: bonus(), final: bonus(), resource: {}, daily: {}, flags: {} }, formula, diagnostics, `诊断:${traitName(row) || '规则'}`);
                diagnostics.filter(text => text.includes('无法解析')).forEach(text => issues.push(text));
            }
        }
        for (const row of rows(db, CONFIG.tables.traitTempStates)) {
            const formula = cell(row, '修正公式/数值');
            if (asText(formula) && /[A-Za-z\u4e00-\u9fa5]/.test(asText(formula))) {
                const diagnostics = [];
                executeDsl({ base: bonus(), martial: bonus(), other: bonus(), final: bonus(), resource: {}, daily: {}, flags: {} }, formula, diagnostics, `诊断:${cell(row, '状态名称') || '状态'}`);
                diagnostics.filter(text => text.includes('无法解析')).forEach(text => issues.push(text));
            }
        }
        return { ok: issues.length === 0, issues };
    }

    function weightedCombatValue(stats, ratios, mode = 'attack') {
        if (!ratios || typeof ratios !== 'object') return NaN;
        const bodyRatio = Number(ratios.body ?? ratios.肉体 ?? 0) || 0;
        const soulRatio = Number(ratios.soul ?? ratios.魂力 ?? 0) || 0;
        const mindRatio = Number(ratios.mind ?? ratios.精神 ?? 0) || 0;
        const total = bodyRatio + soulRatio + mindRatio;
        if (total <= 0) return NaN;
        const bodyWeight = bodyRatio / total;
        const soulWeight = soulRatio / total;
        const mindWeight = mindRatio / total;
        if (mode === 'defense') {
            return combatDefenseValue(stats, '肉体') * bodyWeight
                + combatDefenseValue(stats, '魂力') * soulWeight
                + combatDefenseValue(stats, '精神') * mindWeight;
        }
        return combatAttackValue(stats, '肉体') * bodyWeight
            + combatAttackValue(stats, '魂力') * soulWeight
            + combatAttackValue(stats, '精神') * mindWeight;
    }

    function combatAttackValue(stats, type, ratios = null) {
        const body = Number(stats.body ?? stats.肉体 ?? stats.finalBody ?? 0) || 0;
        const soul = Number(stats.soul ?? stats.魂力 ?? stats.finalSoul ?? 0) || 0;
        const mind = Number(stats.mind ?? stats.精神 ?? stats.finalMind ?? 0) || 0;
        const text = asText(type);
        if (/魂力/.test(text)) return soul;
        if (/精神/.test(text)) return mind;
        if (/混合/.test(text)) return weightedCombatValue(stats, ratios, 'attack');
        return body;
    }

    function combatDefenseValue(stats, type, ratios = null) {
        const direct = Number(stats.defenseValue ?? stats.defense ?? stats.承受值 ?? NaN);
        if (Number.isFinite(direct) && direct > 0) return direct;
        const body = Number(stats.body ?? stats.肉体 ?? stats.finalBody ?? 0) || 0;
        const soul = Number(stats.soul ?? stats.魂力 ?? stats.finalSoul ?? 0) || 0;
        const mind = Number(stats.mind ?? stats.精神 ?? stats.finalMind ?? 0) || 0;
        const text = asText(type);
        if (/魂力/.test(text)) return soul * 0.70 + body * 0.15 + mind * 0.15;
        if (/精神/.test(text)) return mind * 0.85 + soul * 0.15;
        if (/混合/.test(text)) return weightedCombatValue(stats, ratios, 'defense');
        return body * 0.85 + soul * 0.15;
    }

    function maxHpValue(source) {
        if (!source || typeof source !== 'object') return 0;
        return num(source.maxHp ?? source.hpMax ?? source.HPMax ?? source.maxHP ?? source.最大HP ?? source.最大生命值 ?? source.血量上限_脚本 ?? source.血量上限, 0);
    }

    function ratioValue(value, fallback = NaN) {
        if (value === undefined || value === null || value === '') return fallback;
        const raw = typeof value === 'number' ? value : num(value, fallback);
        if (!Number.isFinite(raw)) return fallback;
        return raw > 1 ? raw / 100 : raw;
    }

    function lifeAttackProfile(input, attacker) {
        const text = [
            input.lifeAttackName,
            input.skillName,
            input.attackName,
            input.attackType,
            input.type,
            input.damageType,
            input.effectType,
            input.伤害类型,
            input['伤害/效果类型'],
        ].map(asText).filter(Boolean).join(';');
        let pct = ratioValue(input.lifeAttackPct ?? input.lifeAttackPercent ?? input.生命攻击百分比 ?? input.生命攻击值百分比, NaN);
        if (!Number.isFinite(pct)) {
            if (/千冶铸一/.test(text)) pct = 0.525;
            else if (/强化血刃|归葬追击/.test(text)) pct = 0.15;
            else if (/普通血刃|血刃|血肉即薪|生命攻击值|血炉/.test(text)) pct = 0.10;
        }
        const requested = yes(input.useLifeAttack ?? input.lifeAttack ?? input.生命攻击值) || Number.isFinite(pct);
        const maxHp = maxHpValue(attacker) || maxHpValue(input);
        if (!requested || !Number.isFinite(pct) || pct <= 0 || maxHp <= 0) return { active: false };
        const currentCostPct = /千冶铸一/.test(text) ? ratioValue(input.selfCurrentHpCostPct ?? input.当前生命消耗百分比, 0.5) : ratioValue(input.selfCurrentHpCostPct ?? input.当前生命消耗百分比, 0);
        let maxCostPct = ratioValue(input.selfHpCostPct ?? input.selfCostPct ?? input.生命消耗百分比, NaN);
        if (!Number.isFinite(maxCostPct)) {
            if (/血炉剑域/.test(text)) maxCostPct = 0.20;
            else if (/归葬追击|千冶铸一/.test(text)) maxCostPct = 0;
            else maxCostPct = 0.10;
        }
        return {
            active: true,
            source: '千冶成刃/生命攻击值',
            maxHp,
            pct,
            attackValue: Math.floor(maxHp * pct),
            skillMultiplierApplied: yes(input.allowSkillMultiplierWithLifeAttack) ? '保留' : '跳过',
            selfCost: {
                maxHpPct: Math.max(0, maxCostPct),
                maxHpValue: Math.floor(maxHp * Math.max(0, maxCostPct)),
                currentHpPct: Math.max(0, currentCostPct),
                note: '自损不能被护盾、减伤、闪避、替身或治疗反向抵消；自身效果最低降至1点生命值。',
            },
            note: `生命攻击值=${Math.floor(maxHp * pct)}(最大HP${maxHp}×${round(pct * 100)}%)`,
        };
    }

    function normalizeCombatAttribute(value) {
        return asText(value)
            .replace(/极致之?/g, '')
            .replace(/属性|元素|攻击|伤害|效果|类型|系/g, '')
            .replace(/[=：:]/g, '')
            .trim();
    }

    function splitCombatAttributes(value) {
        if (Array.isArray(value)) return value.flatMap(splitCombatAttributes);
        const text = asText(value);
        if (!text) return [];
        return text
            .split(/[\/,，、;；|]/)
            .map(normalizeCombatAttribute)
            .filter(Boolean);
    }

    function taggedExtremeAttributes(value) {
        const text = asText(value);
        if (!text) return [];
        const out = [];
        text.replace(/极致属性\s*[=：:]\s*([^;；,，、\/|]+)/g, (_, attr) => {
            out.push(...splitCombatAttributes(attr));
            return _;
        });
        text.replace(/极致之?([^;；,，、\/|\s]+)/g, (_, attr) => {
            out.push(...splitCombatAttributes(attr));
            return _;
        });
        return out;
    }

    function collectExtremeAttributes(source) {
        const attrs = [];
        function add(value) { attrs.push(...splitCombatAttributes(value)); }
        function addTagged(value) { attrs.push(...taggedExtremeAttributes(value)); }
        if (!source) return attrs;
        if (typeof source === 'string' || Array.isArray(source)) {
            addTagged(source);
            return attrs;
        }
        add(source.extremeAttribute);
        add(source.extremeAttributes);
        add(source.极致属性);
        add(source.极致属性列表);
        addTagged(source.简介与描述);
        addTagged(source.计算备注);
        if (source.isExtreme || yes(source.是否极致) || yes(source.是否极致_脚本)) {
            add(source.特殊属性);
            add(source.规则属性);
        }
        return attrs;
    }

    function combatTextMatchesAttribute(attribute, text) {
        const attr = normalizeCombatAttribute(attribute);
        if (!attr) return false;
        const haystack = asText(text).replace(/\s+/g, '');
        if (!haystack) return false;
        return haystack.includes(attr) || haystack.includes(`极致${attr}`) || haystack.includes(`${attr}属性`);
    }

    function extremeCombatBonus(input, attacker, attackType, defenseType) {
        const attrs = Array.from(new Set([
            ...collectExtremeAttributes(attacker),
            ...collectExtremeAttributes(input),
        ]));
        const targetText = [
            attackType,
            defenseType,
            input.damageType,
            input.effectType,
            input.damageElement,
            input.伤害类型,
            input.效果类型,
            input.伤害属性,
            input['伤害/效果类型'],
        ].map(asText).filter(Boolean).join(';');
        const matched = attrs.filter(attr => combatTextMatchesAttribute(attr, targetText));
        const forced = input.isExtremeAttack || input.极致攻击;
        const active = matched.length > 0 || yes(forced);
        return {
            active,
            multiplier: active ? EXTREME_ATTACK_MULTIPLIER : 1,
            attributes: attrs,
            matched: matched.length ? matched : (active ? ['强制极致攻击'] : []),
            note: active ? `极致属性命中:${matched.join('/') || '强制'};倍率=${EXTREME_ATTACK_MULTIPLIER}x` : '',
        };
    }

    function controlResult(ratio) {
        if (ratio <= 0.5) return '无效';
        if (ratio <= 0.75) return '轻微干扰';
        if (ratio <= 1.0) return '明显干扰';
        if (ratio <= 1.25) return '短暂限制';
        if (ratio <= 1.75) return '成功控制，持续1回合';
        if (ratio <= 2.5) return '强控制，持续1-2回合或附带破防/禁技';
        return '压倒性控制';
    }

    function combatConfrontationCoefficient(ratio) {
        const value = Number(ratio);
        if (value === Infinity) return 1.30;
        if (!Number.isFinite(value) || value <= 0) return 0.1;
        if (value <= 0.25) return 0.10;
        if (value <= 0.50) return 0.18;
        if (value <= 0.75) return 0.28;
        if (value <= 1.25) return 0.40;
        if (value <= 1.75) return 0.55;
        if (value <= 2.50) return 0.70;
        if (value <= 4.00) return 0.90;
        if (value <= 6.00) return 1.10;
        return 1.30;
    }

    const SKILL_TIER_MULTIPLIERS = Object.freeze([
        { test: /融合技|神技/, value: 9.0, label: '融合技/神技' },
        { test: /武魂真身技|真身技/, value: 7.0, label: '武魂真身技' },
        { test: /大招|奥义|绝技/, value: 5.25, label: '大招' },
        { test: /主力魂技|核心魂技|主力/, value: 3.75, label: '主力魂技' },
        { test: /常规魂技|标准魂技|常规/, value: 2.5, label: '常规魂技' },
        { test: /小魂技|轻魂技|小型/, value: 1.5, label: '小魂技' },
        { test: /普通攻击|普攻|平A/i, value: 0.8, label: '普通攻击' },
    ]);

    const CONTROL_TIER_MULTIPLIERS = Object.freeze([
        { test: /神技级控制|神技/, value: 4.25, label: '神技级控制' },
        { test: /领域|武魂真身|真身控制/, value: 3.0, label: '领域/真身控制' },
        { test: /大招级控制|大招|奥义|绝技/, value: 2.15, label: '大招级控制' },
        { test: /强控制|强控/, value: 1.5, label: '强控制' },
        { test: /普通控制|常规控制|控制/, value: 1.0, label: '普通控制' },
        { test: /轻微干扰|干扰|牵制/, value: 0.65, label: '轻微干扰' },
    ]);

    function skillMultiplierForTier(value, fallback = 1) {
        const text = asText(value);
        if (!text) return fallback;
        const direct = num(text, NaN);
        if (Number.isFinite(direct) && direct > 0) return direct > 20 ? direct / 100 : direct;
        const tier = SKILL_TIER_MULTIPLIERS.find(item => item.test.test(text));
        return tier ? tier.value : fallback;
    }

    function controlMultiplierForTier(value, fallback = 1) {
        const text = asText(value);
        if (!text) return fallback;
        const direct = num(text, NaN);
        if (Number.isFinite(direct) && direct > 0) return direct > 20 ? direct / 100 : direct;
        const tier = CONTROL_TIER_MULTIPLIERS.find(item => item.test.test(text));
        return tier ? tier.value : fallback;
    }

    function controlAntiMultiplierForResult(result) {
        const text = asText(result);
        if (/压倒性|强控制/.test(text)) return 2.0;
        if (/成功控制/.test(text)) return 1.5;
        return 1.0;
    }

    function messageText(value) {
        if (typeof value === 'string') return value;
        if (!value || typeof value !== 'object') return '';
        for (const key of ['mes', 'message', 'content', 'text', 'value', 'prompt']) {
            const found = value[key];
            if (typeof found === 'string' && found.trim()) return found;
            if (found && typeof found === 'object') {
                const nested = messageText(found);
                if (nested) return nested;
            }
        }
        return '';
    }

    function messageIsUser(value) {
        if (typeof value === 'string') return true;
        if (!value || typeof value !== 'object') return false;
        if (value.is_user === true || value.isUser === true || value.role === 'user' || value.type === 'user') return true;
        if (value.sender === 'user' || value.from === 'user') return true;
        return false;
    }

    function latestPlayerInputText() {
        const ctx = getSillyTavernContext();
        const candidates = [];
        if (ctx) {
            candidates.push(ctx.chat, ctx.messages, ctx.messageHistory, ctx.chatHistory);
            try {
                if (typeof ctx.getChat === 'function') candidates.push(ctx.getChat());
            } catch (_) {}
        }
        candidates.push(getHostGlobal('chat'), getHostGlobal('messages'));

        for (const source of candidates) {
            if (!Array.isArray(source)) continue;
            for (let i = source.length - 1; i >= 0; i -= 1) {
                const item = source[i];
                if (!messageIsUser(item)) continue;
                const text = messageText(item).trim();
                if (text) return text;
            }
        }
        return '';
    }

    function ordinalNumber(value) {
        const text = asText(value);
        const direct = text.match(/\d+/);
        if (direct) return Number(direct[0]) || 0;
        const map = {
            一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5,
            六: 6, 七: 7, 八: 8, 九: 9, 十: 10,
        };
        if (/十/.test(text)) {
            const parts = text.split('十');
            const tens = parts[0] ? (map[parts[0]] || 1) : 1;
            const ones = parts[1] ? (map[parts[1]] || 0) : 0;
            return tens * 10 + ones;
        }
        for (const [key, number] of Object.entries(map)) {
            if (text.includes(key)) return number;
        }
        return 0;
    }

    function normalizeActionObject(value, text = '') {
        if (!value || typeof value !== 'object') return null;
        const action = {
            actor: asText(value.actor || value.source || value.角色) || 'player',
            target: asText(value.target || value.targetName || value.目标 || value.攻击目标),
            skill_ref: asText(value.skill_ref || value.skillRef || value.skill || value.skillName || value.技能 || value.魂技),
            intent: asText(value.intent || value.type || value.action || value.意图) || 'attack',
            raw_text: asText(value.raw_text || value.text || text),
            action_id: asText(value.action_id || value.actionId || value.id),
        };
        if (!action.action_id) action.action_id = `act_${stableHash({ text: action.raw_text, action })}`;
        return action;
    }

    function parsePlayerCombatAction(text, options = {}) {
        const structured = normalizeActionObject(options.action, text);
        if (structured) {
            structured.activate_avatar = yes(structured.activate_avatar || structured.activateAvatar || structured.开启武魂真身)
                || /武魂真身/.test(asText(structured.raw_text || text));
            return structured;
        }

        const raw = asText(text);
        if (!raw) {
            return { ok: false, diagnostics: ['未读取到玩家本轮输入文本。'] };
        }

        const normalized = raw.replace(/\s+/g, '');
        const action = {
            actor: 'player',
            target: '',
            skill_ref: '',
            intent: /控制|束缚|禁锢|眩晕|沉默|封印/.test(normalized) ? 'control' : 'attack',
            raw_text: raw,
            action_id: `msg_${stableHash(raw)}`,
            activate_avatar: /(?:开启|发动|进入).{0,8}武魂真身|武魂真身.{0,8}(?:开启|发动|进入)/.test(normalized),
        };

        if (/结束战斗|战斗结束|冲突结束|脱离战斗|退出战斗|结束冲突/.test(normalized)) {
            action.intent = 'end_combat';
            return action;
        }

        if (/结束回合|回合结束|下一回合|推进回合|进入下回合/.test(normalized)) {
            action.intent = 'advance_turn';
            return action;
        }

        const soulSkill = normalized.match(/第?([一二两三四五六七八九十\d]+)魂技/);
        if (soulSkill) action.skill_ref = `第${soulSkill[1]}魂技`;

        if (!action.skill_ref) {
            const general = normalized.match(/(?:使用|释放|施展|发动|用)通用技能([^攻击打向打击斩轰，。；,.\s]+)/);
            if (general) action.skill_ref = general[1];
        }

        if (!action.skill_ref) {
            const named = raw.match(/(?:使用|释放|施展|发动|用)([^，。；,.!?！？\s]{2,20})(?:攻击|打向|打|击向|斩向|轰向|对付|针对)/);
            if (named) action.skill_ref = named[1];
        }

        const targetPatterns = [
            /(?:攻击|打向|击向|斩向|轰向|对付|针对|控制|束缚|禁锢|封印|缠绕)([^，。；,.!?！？\s]+)/,
            /(?:打|击|斩|轰)([^，。；,.!?！？\s]+)/,
        ];
        for (const pattern of targetPatterns) {
            const match = normalized.match(pattern);
            if (match && match[1]) {
                action.target = match[1].replace(/^(了|向)/, '').replace(/(?:的)?(?:头部|胸口|腹部|手臂|腿部|后背|要害|弱点|方向|位置)$/g, '');
                break;
            }
        }

        if (!action.skill_ref && /普通攻击|普攻|平A/i.test(raw)) action.skill_ref = '普通攻击';
        if (!action.skill_ref && action.target && /攻击|打|击|斩|轰/.test(normalized)) action.skill_ref = '普通攻击';
        if (action.activate_avatar && !action.target && !action.skill_ref) {
            action.intent = 'activate_avatar';
            action.skill_ref = '武魂真身';
            action.target = 'self';
        }
        return action;
    }

    function parseJsonLoose(value, fallback = null) {
        const text = asText(value);
        if (!text) return fallback;
        const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
        const body = fenced ? fenced[1].trim() : text;
        try {
            return JSON.parse(body);
        } catch (_) {
            return fallback;
        }
    }

    function compactJson(value) {
        return JSON.stringify(value);
    }

    function appendJsonLine(existing, entry, maxLines = 20) {
        const lines = asText(existing).split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        lines.push(compactJson(entry));
        return lines.slice(-maxLines).join('\n');
    }

    function processedActionIdSet(row) {
        const out = new Set();
        const text = asText(cell(row, '已处理动作ID_脚本'));
        if (!text) return out;
        const parsed = parseJsonLoose(text, null);
        if (Array.isArray(parsed)) {
            parsed.map(asText).filter(Boolean).forEach(id => out.add(id));
            return out;
        }
        text.split(/\r?\n|[,，；;]/).map(asText).filter(Boolean).forEach(line => {
            const item = parseJsonLoose(line, null);
            out.add(asText(item?.action_id || item?.id || line));
        });
        return out;
    }

    function appendProcessedActionId(row, actionId) {
        const ids = Array.from(processedActionIdSet(row));
        if (!ids.includes(actionId)) ids.push(actionId);
        return ids.slice(-30).join('\n');
    }

    function combatDiagnostic(code, message) {
        return `[${code}] ${message}`;
    }

    function parseExplicitMultiplier(text, labels) {
        const body = asText(text);
        if (!body) return NaN;
        const escaped = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const pattern = new RegExp(`(?:${escaped})\\s*(?:=|:|：)?\\s*(\\d+(?:\\.\\d+)?%?)`, 'i');
        const match = body.match(pattern);
        if (!match) return NaN;
        const raw = match[1];
        const value = num(raw, NaN);
        if (!Number.isFinite(value) || value <= 0) return NaN;
        return /%/.test(raw) || value > 20 ? value / 100 : value;
    }

    function parseMixedAttributeRatios(...parts) {
        const text = parts.map(asText).filter(Boolean).join(';');
        if (!text) return null;
        const ratios = { body: 0, soul: 0, mind: 0 };
        const labelMap = [
            { key: 'body', test: /肉体|身体|力量/ },
            { key: 'soul', test: /魂力|能量|元素/ },
            { key: 'mind', test: /精神|灵魂|意志/ },
        ];
        const patterns = [
            /((?:肉体|身体|力量|魂力|能量|元素|精神|灵魂|意志))(?:占比|比例)?\s*(?:=|:|：)?\s*(\d+(?:\.\d+)?)\s*%?/g,
            /(\d+(?:\.\d+)?)\s*%?\s*((?:肉体|身体|力量|魂力|能量|元素|精神|灵魂|意志))/g,
        ];
        let found = false;
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(text))) {
                const label = match[1] && /\d/.test(match[1]) ? match[2] : match[1];
                const valueText = match[1] && /\d/.test(match[1]) ? match[1] : match[2];
                const mapped = labelMap.find(item => item.test.test(label));
                const value = num(valueText, NaN);
                if (!mapped || !Number.isFinite(value) || value <= 0) continue;
                ratios[mapped.key] += value;
                found = true;
            }
        }
        if (!found) return null;
        const total = ratios.body + ratios.soul + ratios.mind;
        if (total <= 0) return null;
        return ratios;
    }

    function combatValueProfile(stats, type, ratios = null) {
        const text = asText(type);
        const usesMixed = /混合|复合|多属性/.test(text);
        if (usesMixed && !ratios) {
            return {
                ok: false,
                attackValue: NaN,
                defenseValue: NaN,
                diagnostics: [combatDiagnostic('missing_mixed_ratio', '混合攻击缺少肉体/魂力/精神比例，已停止硬结算。')],
            };
        }
        const attackValue = combatAttackValue(stats.attacker, type, ratios);
        const defenseValue = combatDefenseValue(stats.defender, type, ratios);
        const diagnostics = [];
        if (!Number.isFinite(attackValue)) diagnostics.push(combatDiagnostic('missing_attacker_stat', `攻击属性 ${text || '未指定'} 无法计算攻击值。`));
        if (!Number.isFinite(defenseValue) || defenseValue <= 0) diagnostics.push(combatDiagnostic('missing_defender_stat', `目标缺少 ${text || '默认'} 对应承受值。`));
        return { ok: diagnostics.length === 0, attackValue, defenseValue, diagnostics };
    }

    function skillRuleText(skill) {
        return [
            skill?.name,
            skill?.attackType,
            skill?.effectType,
            skill?.tier,
            skill?.detail,
            skill?.source,
        ].map(asText).filter(Boolean).join(';');
    }

    function classifySkill(skill, action = {}) {
        if (action.intent === 'activate_avatar') return { kind: 'avatar', hasDamage: false, hasControl: false };
        if (!skill || skill.source === 'default' || skill.name === '普通攻击') {
            return { kind: 'damage', hasDamage: true, hasControl: false };
        }
        const typeText = [skill.effectType, skill.detail, skill.name].map(asText).filter(Boolean).join(';');
        const explicitHybrid = /伤害.{0,6}控制|控制.{0,6}伤害|伤控|输出.{0,6}控制|控制.{0,6}输出|破防|禁技/.test(typeText);
        const hasControl = /控制|束缚|限制|禁锢|眩晕|沉默|封印|定身|减速|干扰|缠绕|牵制|禁技/.test(typeText)
            || action.intent === 'control';
        const hasDamage = /伤害|输出|杀伤|打击|攻击型|普通攻击|爆发|斩击|穿刺|生命攻击/.test(typeText);
        if ((hasDamage && hasControl) || explicitHybrid) return { kind: 'hybrid', hasDamage: true, hasControl: true };
        if (hasControl) return { kind: 'control', hasDamage: false, hasControl: true };
        if (hasDamage) return { kind: 'damage', hasDamage: true, hasControl: false };
        return {
            kind: 'unknown',
            hasDamage: false,
            hasControl: false,
            diagnostics: [combatDiagnostic('missing_skill_classification', `技能 ${skill.name || '未知'} 缺少伤害/控制定位，已停止硬结算。`)],
        };
    }

    function resolveSkillNumbers(skill, classification, options = {}) {
        const text = skillRuleText(skill);
        const diagnostics = [];
        const ratios = options.mixRatios || parseMixedAttributeRatios(skill.attackType, skill.effectType, skill.detail);
        let damageMultiplier = Number(options.skillMultiplier ?? NaN);
        if (!Number.isFinite(damageMultiplier) || damageMultiplier <= 0) {
            damageMultiplier = parseExplicitMultiplier(text, ['伤害倍率', '伤害倍数', '倍率', '技能倍率']);
        }
        if ((!Number.isFinite(damageMultiplier) || damageMultiplier <= 0) && classification.hasDamage) {
            damageMultiplier = skillMultiplierForTier(skill.tier || skill.effectType || skill.detail || skill.name, NaN);
        }
        let controlMultiplier = Number(options.controlMultiplier ?? NaN);
        if (!Number.isFinite(controlMultiplier) || controlMultiplier <= 0) {
            controlMultiplier = parseExplicitMultiplier(text, ['控制倍率', '控制强度倍率', '控制倍数']);
        }
        if ((!Number.isFinite(controlMultiplier) || controlMultiplier <= 0) && classification.hasControl) {
            controlMultiplier = controlMultiplierForTier(skill.tier || skill.effectType || skill.detail || skill.name, NaN);
        }
        if (classification.hasDamage && (!Number.isFinite(damageMultiplier) || damageMultiplier <= 0)) {
            diagnostics.push(combatDiagnostic('missing_skill_multiplier', `技能 ${skill.name} 缺少伤害倍率或可识别档位。`));
        }
        if (classification.hasControl && (!Number.isFinite(controlMultiplier) || controlMultiplier <= 0)) {
            diagnostics.push(combatDiagnostic('missing_control_multiplier', `技能 ${skill.name} 缺少控制倍率或可识别控制档位。`));
        }
        if (/混合|复合|多属性/.test(asText(skill.attackType)) && !ratios) {
            diagnostics.push(combatDiagnostic('missing_mixed_ratio', `技能 ${skill.name} 为混合攻击，但没有写明肉体/魂力/精神比例。`));
        }
        return { damageMultiplier, controlMultiplier, ratios, diagnostics };
    }

    function cloneCombatState(state) {
        return JSON.parse(JSON.stringify(state || { units: {}, cooldowns: {} }));
    }

    function cooldownValue(state, skill) {
        const cooldowns = state && state.cooldowns && typeof state.cooldowns === 'object' ? state.cooldowns : {};
        return cooldownTurns(cooldowns[skill.key] ?? cooldowns[skill.name] ?? 0);
    }

    function decrementCooldowns(state) {
        const next = cloneCombatState(state);
        if (!next.cooldowns || typeof next.cooldowns !== 'object') next.cooldowns = {};
        for (const [key, value] of Object.entries(next.cooldowns)) {
            const turns = cooldownTurns(value);
            if (turns <= 1) delete next.cooldowns[key];
            else next.cooldowns[key] = turns - 1;
        }
        return next;
    }

    function antiControlForAttempt(unitData) {
        const base = numericStat(unitData, 'antiControl', '抗控修正') || 1;
        const nextOnly = numericStat(unitData, 'nextAntiControlMultiplier', 'nextAntiControl', '下一次抗控倍率') || 1;
        const legacy = numericStat(unitData, 'antiControlMultiplier') || 1;
        return Math.max(1, base * Math.max(nextOnly, legacy));
    }

    function clearConsumedAntiControl(unitData) {
        if (!unitData || typeof unitData !== 'object') return unitData;
        const next = { ...unitData };
        delete next.nextAntiControlMultiplier;
        delete next.nextAntiControl;
        if (next.antiControlMultiplier && Number(next.antiControlMultiplier) > 1) delete next.antiControlMultiplier;
        return next;
    }

    function pendingCombatAction(row) {
        const text = asText(cell(row, '待结算事项'));
        if (!text) return null;
        const parsed = parseJsonLoose(text, null);
        if (Array.isArray(parsed)) {
            const item = parsed.find(value => value && typeof value === 'object') || parsed[0];
            return normalizeActionObject(item, text);
        }
        if (parsed && typeof parsed === 'object') return normalizeActionObject(parsed, text);
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        for (const line of lines) {
            const item = parseJsonLoose(line, null);
            const action = normalizeActionObject(item, line);
            if (action) return action;
        }
        const action = parsePlayerCombatAction(text, {});
        return action && action.ok === false ? null : action;
    }

    function combatRows(db) {
        return rows(db, CONFIG.tables.combatState);
    }

    function currentCombatRow(db) {
        const list = combatRows(db);
        return list.find(row => !/已结算|结束/.test(asText(cell(row, '结果摘要')))) || list[0] || {};
    }

    function parseCombatUnitState(row) {
        const parsed = parseJsonLoose(cell(row, '战斗单位状态_脚本'), null);
        if (parsed && typeof parsed === 'object') {
            if (!parsed.units || typeof parsed.units !== 'object') parsed.units = {};
            if (!parsed.cooldowns || typeof parsed.cooldowns !== 'object') parsed.cooldowns = {};
            return parsed;
        }
        return { units: {}, cooldowns: {} };
    }

    function unitEntries(state) {
        if (!state || typeof state !== 'object') return [];
        if (state.units && typeof state.units === 'object') return Object.entries(state.units);
        return Object.entries(state).filter(([, value]) => value && typeof value === 'object');
    }

    function allKnownCombatUnitsDefeated(state) {
        const hpValues = unitEntries(state)
            .map(([, data]) => numericStat(data, 'hp', 'currentHp', 'HP', '血量', '当前血量', '生命'))
            .filter(value => Number.isFinite(value));
        return hpValues.length > 0 && hpValues.every(value => value <= 0);
    }

    function resolveUnit(state, targetName) {
        const target = asText(targetName);
        const entries = unitEntries(state);
        if (!entries.length) return null;
        if (/^(敌人|目标|对手|敌方)$/.test(target) && entries.length === 1) {
            return { key: entries[0][0], data: entries[0][1] };
        }
        for (const [key, data] of entries) {
            const names = [key, data?.name, data?.姓名, data?.target].map(asText).filter(Boolean);
            if (names.some(name => name === target || name.includes(target) || target.includes(name))) {
                return { key, data };
            }
        }
        return null;
    }

    function npcUnitFromRow(row) {
        const name = asText(cell(row, '姓名'));
        if (!name) return null;
        const text = [
            cell(row, '当前战斗状态'),
            cell(row, '魂力等级/境界'),
            cell(row, '魂技摘要'),
            cell(row, '战斗定位'),
            cell(row, '备注'),
        ].map(asText).filter(Boolean).join(';');
        const pick = (...labels) => {
            const escaped = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            const match = text.match(new RegExp(`(?:${escaped})\\s*(?:=|:|：)?\\s*(\\d+(?:\\.\\d+)?)`, 'i'));
            return match ? Number(match[1]) : NaN;
        };
        const pickPair = (...labels) => {
            const escaped = labels.map(label => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
            const match = text.match(new RegExp(`(?:${escaped})\\s*(?:=|:|：)?\\s*(\\d+(?:\\.\\d+)?)\\s*/\\s*(\\d+(?:\\.\\d+)?)`, 'i'));
            return match ? { current: Number(match[1]), max: Number(match[2]) } : null;
        };
        const hpPair = pickPair('HP', 'hp', '血量', '当前血量', '生命');
        const hp = hpPair ? hpPair.current : pick('HP', 'hp', '血量', '当前血量', '生命');
        const maxHp = hpPair ? hpPair.max : pick('最大HP', '血量上限', '最大血量', '生命上限');
        const antiControl = pick('抗控', '抗控修正', '控制抗性', 'antiControl');
        return {
            name,
            姓名: name,
            body: pick('肉体', '最终肉体'),
            soul: pick('魂力', '最终魂力'),
            mind: pick('精神', '最终精神'),
            hp,
            currentHp: hp,
            maxHp: Number.isFinite(maxHp) ? maxHp : hp,
            antiControl: Number.isFinite(antiControl) ? antiControl : undefined,
            source: CONFIG.tables.npcAbility,
        };
    }

    function resolveCombatUnit(db, state, targetName) {
        const target = asText(targetName);
        const fromState = resolveUnit(state, target);
        if (fromState) return { ...fromState, source: '战斗单位状态_脚本' };

        const npcMatches = rows(db, CONFIG.tables.npcAbility)
            .map(row => ({ row, unit: npcUnitFromRow(row) }))
            .filter(item => {
                const name = asText(item.unit?.name);
                return name && (name === target || name.includes(target) || target.includes(name));
            });
        if (npcMatches.length === 1) {
            const unit = npcMatches[0].unit;
            return { key: unit.name, data: unit, source: CONFIG.tables.npcAbility, fromNpc: true };
        }
        if (npcMatches.length > 1) {
            return {
                ambiguous: true,
                diagnostics: [combatDiagnostic('ambiguous_unit', `目标 ${target} 在 NPC能力档案表 中匹配到多个候选。`)],
            };
        }
        return null;
    }

    function numericStat(source, ...names) {
        for (const name of names) {
            const value = source && source[name];
            const parsed = num(value, NaN);
            if (Number.isFinite(parsed)) return parsed;
        }
        return 0;
    }

    function numericStatMaybe(source, ...names) {
        for (const name of names) {
            const value = source && source[name];
            const parsed = num(value, NaN);
            if (Number.isFinite(parsed)) return parsed;
        }
        return NaN;
    }

    function playerCombatStats(db) {
        const statsRow = firstRow(db, CONFIG.tables.stats);
        const runtimeRow = runtimeStatsRow(db, statsRow);
        const finalBody = num(cell(statsRow, '肉体_最终_脚本'), NaN);
        const finalSoul = num(cell(statsRow, '魂力_最终_脚本'), NaN);
        const finalMind = num(cell(statsRow, '精神_最终_脚本'), NaN);
        return {
            body: Number.isFinite(finalBody) ? finalBody : num(cell(statsRow, '肉体_基础'), 0),
            soul: Number.isFinite(finalSoul) ? finalSoul : num(cell(statsRow, '魂力_基础'), 0),
            mind: Number.isFinite(finalMind) ? finalMind : num(cell(statsRow, '精神_基础'), 0),
            hp: num(cell(runtimeRow, '血量当前'), NaN),
            mp: num(cell(runtimeRow, '蓝量当前'), NaN),
            spirit: num(cell(runtimeRow, '精神力当前'), NaN),
            maxHp: num(cell(statsRow, '血量上限_脚本'), NaN),
            maxMp: num(cell(statsRow, '蓝量上限_脚本'), NaN),
            maxSpirit: num(cell(statsRow, '精神力上限_脚本'), NaN),
            runtimeRow,
            runtimeTable: runtimeStatsTableName(db),
        };
    }

    function unitCombatStats(unit) {
        const source = unit || {};
        return {
            body: numericStat(source, 'body', '肉体', 'finalBody', '肉体_最终_脚本'),
            soul: numericStat(source, 'soul', '魂力', 'finalSoul', '魂力_最终_脚本'),
            mind: numericStat(source, 'mind', '精神', 'finalMind', '精神_最终_脚本'),
            defenseValue: numericStat(source, 'defenseValue', 'defense', '承受值'),
            hp: numericStatMaybe(source, 'hp', 'currentHp', 'HP', '当前血量'),
            maxHp: numericStat(source, 'maxHp', 'hpMax', '最大血量', '血量上限'),
            antiControl: numericStat(source, 'antiControl', 'antiControlMultiplier', '抗控修正') || 1,
        };
    }

    function skillRows(db) {
        const out = [];
        for (const row of rows(db, CONFIG.tables.skills)) {
            out.push({ table: CONFIG.tables.skills, row, kind: 'general' });
        }
        CONFIG.tables.rings.forEach(tableName => {
            for (const row of rows(db, tableName)) out.push({ table: tableName, row, kind: 'soul' });
        });
        return out;
    }

    function skillName(entry) {
        return asText(cell(entry.row, '技能名称', '魂技名称'));
    }

    function resolveSkill(db, action) {
        const ref = asText(action.skill_ref);
        if (!ref || ref === '普通攻击') {
            return {
                ok: true,
                skill: {
                    name: '普通攻击',
                    attackType: '肉体',
                    effectType: '普通攻击',
                    tier: '普通攻击',
                    cost: '',
                    cooldown: '',
                    source: 'default',
                    key: '普通攻击',
                },
            };
        }

        const ordinal = /魂技/.test(ref) ? ordinalNumber(ref) : 0;
        const all = skillRows(db);
        let matched = null;
        if (ordinal) {
            matched = all.find(entry => entry.kind === 'soul' && ordinalNumber(cell(entry.row, '魂环序号')) === ordinal);
        }
        if (!matched) {
            matched = all.find(entry => {
                const name = skillName(entry);
                return name && (name === ref || name.includes(ref) || ref.includes(name));
            });
        }
        if (!matched) return { ok: false, diagnostics: [`无法唯一识别技能：${ref}`] };

        const row = matched.row;
        return {
            ok: true,
            skill: {
                name: skillName(matched) || ref,
                attackType: asText(cell(row, '攻击属性')) || '肉体',
                effectType: asText(cell(row, '伤害/效果类型', '效果类型')),
                tier: asText(cell(row, '倍率档位')),
                cost: asText(cell(row, '消耗')),
                cooldown: asText(cell(row, '冷却')),
                detail: asText(cell(row, '详细效果', '效果描述')),
                source: matched.table,
                key: `${matched.table}:${cell(row, '魂环序号') || skillName(matched) || ref}`,
            },
        };
    }

    function resourceCost(costText, player) {
        const text = asText(costText);
        if (!text || /无|不消耗|免费/.test(text)) return { field: 'mp', amount: 0, note: '', hasCost: false, unknown: false };
        const field = /精神|意志|灵魂/.test(text) ? 'spirit' : /血|生命|HP/i.test(text) ? 'hp' : 'mp';
        const maxMap = { hp: player.maxHp, mp: player.maxMp, spirit: player.maxSpirit };
        const maxValue = Number(maxMap[field]);
        const direct = num(text, NaN);
        let amount = 0;
        let unknown = false;
        if (Number.isFinite(direct) && direct > 0) {
            if (/%/.test(text)) {
                if (Number.isFinite(maxValue) && maxValue > 0) amount = Math.ceil(maxValue * direct / 100);
                else unknown = true;
            } else {
                amount = direct;
            }
        } else {
            const qualitative = /极端/.test(text) ? 0.35
                : /沉重|大量|高/.test(text) ? 0.20
                    : /中等|中量/.test(text) ? 0.10
                        : /轻微|少量|低/.test(text) ? 0.05
                            : NaN;
            if (Number.isFinite(qualitative)) {
                if (Number.isFinite(maxValue) && maxValue > 0) amount = Math.ceil(maxValue * qualitative);
                else unknown = true;
            } else {
                unknown = true;
            }
        }
        return { field, amount: Math.max(0, Math.round(amount)), note: text, hasCost: true, unknown };
    }

    function textForCombatTags(...values) {
        const out = [];
        for (const value of values) {
            if (!value) continue;
            if (Array.isArray(value)) out.push(...value.map(asText));
            else if (typeof value === 'object') {
                out.push(
                    value.species, value.race, value.tags, value.tag, value.属性, value.种族,
                    value.特殊能力, value['特殊能力/特性'], value.当前战斗状态, value.status,
                    value.name, value.姓名, value.武魂概况, value.战斗定位, value.备注,
                );
            } else out.push(value);
        }
        return out.map(asText).filter(Boolean).join(';');
    }

    function combatTargetMatches(targetData, pattern) {
        return pattern.test(textForCombatTags(targetData));
    }

    function parseMultiplierFromText(text, keys) {
        const raw = asText(text);
        for (const key of keys) {
            const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            let match = raw.match(new RegExp(`${escaped}\\s*(?:\\*=|x|×|变为|=)\\s*(\\d+(?:\\.\\d+)?)`, 'i'));
            if (match) return Number(match[1]);
            match = raw.match(new RegExp(`${escaped}\\s*(?:\\+|增加|提升)\\s*(\\d+(?:\\.\\d+)?)\\s*%`, 'i'));
            if (match) return 1 + Number(match[1]) / 100;
            match = raw.match(new RegExp(`${escaped}.*?(\\d+(?:\\.\\d+)?)\\s*倍`, 'i'));
            if (match) return Number(match[1]);
        }
        return NaN;
    }

    function resolveConditionalCombatFormula(formula, targetData) {
        const raw = asText(formula);
        const match = raw.match(/(?:target|目标)\.(?:tags|tag|species|race|属性|种族)\s*(?:contains|包含|=~|=)\s*([^=;]+?)\s*=>\s*(.+)$/i);
        if (!match) return { applies: true, formula: raw };
        const targetText = textForCombatTags(targetData);
        const candidates = asText(match[1]).replace(/["'`/]/g, '').split(/[|,，、\s]+/).map(asText).filter(Boolean);
        const applies = candidates.length > 0 && candidates.some(item => targetText.includes(item));
        return { applies, formula: asText(match[2]) };
    }

    function collectActiveTraitTextRows(db, traits) {
        const out = [];
        for (const tableName of [CONFIG.tables.traitRules, CONFIG.tables.traitTempStates]) {
            for (const row of rows(db, tableName)) {
                if (no(cell(row, '是否启用', '是否脚本自动执行'))) continue;
                if (!traitMatchesSource(traits, cell(row, '来源特性名称'))) continue;
                out.push({ tableName, row });
            }
        }
        return out;
    }

    function collectCombatModifiers(db, traits, context = {}) {
        const player = context.player || {};
        const targetData = context.targetData || {};
        const skill = context.skill || {};
        const stateText = asText(context.stateText);
        const actionText = textForCombatTags(context.action || {}, skill);
        const modifiers = {
            damageMultiplier: 1,
            controlMultiplier: 1,
            costMultiplier: 1,
            incomingDamageMultiplier: 1,
            healingMultiplier: 1,
            disabled: [],
            immune: [],
            notes: [],
        };
        const addDamage = (value, note) => {
            if (Number.isFinite(value) && value > 0) {
                modifiers.damageMultiplier *= value;
                if (note) modifiers.notes.push(note);
            }
        };
        const addCost = (value, note) => {
            if (Number.isFinite(value) && value > 0) {
                modifiers.costMultiplier *= value;
                if (note) modifiers.notes.push(note);
            }
        };

        if (hasTrait(traits, /屠龙者/) && combatTargetMatches(targetData, /龙|亚龙|龙血|dragon/i)) {
            addDamage(10, '屠龙者:龙类目标最终伤害x10');
        }
        if (hasTrait(traits, /苍蓝之眸|六眼/)) {
            addCost(0.7, '六眼:蓝量/魂力消耗x0.7');
        }
        if (hasTrait(traits, /幻想杀手|万法不侵/)) {
            modifiers.immune.push('同级及以下魂力效果');
            const skillText = [skill.cost, skill.attackType, skill.effectType, skill.detail, skill.name].map(asText).join(';');
            if (/魂力|蓝量|MP|mp|能量/.test(skillText)) modifiers.disabled.push('幻想杀手禁用基于魂力消耗的主动技能');
        }
        if (hasTrait(traits, /超绝吟唱|终极吟唱/)) {
            const ordinal = ordinalNumber(skill.key) || ordinalNumber(skill.name);
            if (ordinal > 1) modifiers.disabled.push('超绝吟唱仅允许第一魂技作为主动技能');
        }
        if (hasTrait(traits, /火与钢|狂战士体质/)) {
            const hp = Number(player.hp);
            const maxHp = Number(player.maxHp);
            if (Number.isFinite(hp) && Number.isFinite(maxHp) && maxHp > 0 && hp / maxHp <= 0.35) {
                addDamage(1.5, '火与钢:低血线最终伤害x1.5');
            }
        }
        if (/血炉剑域/.test(stateText)) addDamage(1.3, '血炉剑域:最终伤害x1.3');
        if (/八门|开门|休门|生门|伤门|杜门|景门|惊门|死门/.test(`${stateText};${actionText}`)) addDamage(1.5, '八门遁甲:开启门数伤害修正x1.5');
        if (/永劫燔世|先天领域|领域开启/.test(stateText) && hasTrait(traits, /再次踏上轮回/)) addDamage(2.7, '永劫燔世:领域伤害修正x2.7');

        for (const { row } of collectActiveTraitTextRows(db, traits)) {
            const source = asText(cell(row, '来源特性名称')) || asText(cell(row, '状态名称')) || '特性规则';
            if (/屠龙者|苍蓝之眸|六眼|幻想杀手|万法不侵|超绝吟唱|终极吟唱/.test(source)) continue;
            const resolvedFormula = resolveConditionalCombatFormula(cell(row, '结算参数', '修正公式/数值'), targetData);
            if (!resolvedFormula.applies) continue;
            const formula = resolvedFormula.formula;
            const hook = asText(cell(row, '脚本钩子', '触发时机'));
            if (!/onBeforeDamage|calculateCombat|onBeforeSkill|onBeforeCost|战斗|伤害|消耗/.test(`${hook};${formula}`)) continue;
            const damage = parseMultiplierFromText(formula, ['damageMultiplier', '最终伤害', '伤害乘区', '自身最终伤害']);
            if (Number.isFinite(damage)) addDamage(damage, `${source}:伤害乘区x${damage}`);
            const cost = parseMultiplierFromText(formula, ['costMultiplier', '消耗', '蓝量消耗', '魂力消耗']);
            if (Number.isFinite(cost)) addCost(cost, `${source}:消耗乘区x${cost}`);
            const incoming = parseMultiplierFromText(formula, ['incomingDamageMultiplier', '受最终伤害', '承伤']);
            if (Number.isFinite(incoming)) {
                modifiers.incomingDamageMultiplier *= incoming;
                modifiers.notes.push(`${source}:承伤乘区x${incoming}`);
            }
            if (/disable\((.+?)\)/i.test(formula)) modifiers.disabled.push(`${source}:${RegExp.$1}`);
            if (/immune\((.+?)\)/i.test(formula)) modifiers.immune.push(`${source}:${RegExp.$1}`);
        }
        return modifiers;
    }

    function applyCostModifier(cost, multiplier) {
        const next = { ...cost };
        const m = Number(multiplier);
        if (next.amount > 0 && Number.isFinite(m) && m > 0 && m !== 1) {
            next.amount = Math.max(0, Math.ceil(next.amount * m));
            next.modifier = round(m);
            next.note = [next.note, `消耗修正x${round(m)}`].filter(Boolean).join(';');
        }
        return next;
    }

    function fatalProtectionFromUnit(unit, traits = new Set(), stateText = '') {
        const text = textForCombatTags(unit, stateText);
        const maxHp = maxHpValue(unit);
        if (hasTrait(traits, /十二试炼/) || /十二试炼/.test(text)) return { name: '十二试炼', restorePct: 0.25, remainingKey: 'twelveTrials', maxHp };
        if (hasTrait(traits, /凤凰神/) || /凤凰涅槃|涅槃重燃/.test(text)) return { name: '凤凰涅槃', restorePct: /武魂真身|真身/.test(text) ? 0.5 : 0.3, remainingKey: 'phoenixNirvana', maxHp };
        if (/万劫不灭/.test(text)) return { name: '万劫不灭', restorePct: /武魂真身|真身/.test(text) ? 0.5 : 0.25, remainingKey: 'undyingForge', maxHp };
        if (/火与钢|复仇恢复/.test(text)) return { name: '火与钢复仇恢复', restorePct: 0.25, remainingKey: 'fireSteelRevenge', maxHp };
        return null;
    }

    function applyFatalProtectionToUnit(unit, nextHp, traits = new Set(), stateText = '') {
        if (nextHp > 0) return { unit, hp: nextHp, triggered: null };
        const profile = fatalProtectionFromUnit(unit, traits, stateText);
        if (!profile || !Number.isFinite(profile.maxHp) || profile.maxHp <= 0) return { unit, hp: nextHp, triggered: null };
        const state = unit && typeof unit === 'object' ? { ...unit } : {};
        const usedKey = `${profile.remainingKey}Used`;
        const remainingKey = `${profile.remainingKey}Remaining`;
        const remaining = Number(state[remainingKey] ?? NaN);
        if (state[usedKey] === true || state[usedKey] === '是' || (Number.isFinite(remaining) && remaining <= 0)) return { unit, hp: nextHp, triggered: null };
        const hp = Math.max(1, Math.floor(profile.maxHp * profile.restorePct));
        if (Number.isFinite(remaining)) state[remainingKey] = Math.max(0, remaining - 1);
        else state[usedKey] = true;
        state.hp = hp;
        state.currentHp = hp;
        state.fatalProtectionLast = `${profile.name}:恢复${hp}`;
        return { unit: state, hp, triggered: { ...profile, hp } };
    }

    function cooldownTurns(value) {
        const n = num(value, 0);
        return Math.max(0, Math.floor(n));
    }

    function buildCombatResolution(text, options = {}) {
        const db = options.db || (api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : {});
        const diagnostics = [];
        const combatRow = currentCombatRow(db);
        const unitState = parseCombatUnitState(combatRow);
        const actionSource = options.action ? '' : (asText(text) || latestPlayerInputText());
        const action = actionSource || options.action
            ? parsePlayerCombatAction(actionSource, options)
            : (pendingCombatAction(combatRow) || { ok: false, diagnostics: ['未读取到玩家本轮输入文本，也没有可回放的待结算事项。'] });
        if (action.ok === false) return { ok: false, action, diagnostics: action.diagnostics || [] };

        if (action.intent === 'end_combat') {
            const hasCombatRow = Boolean(combatRow && combatRow.__rowIndex);
            return {
                ok: true,
                action,
                combatRow,
                unitState,
                deleteCombatRow: hasCombatRow,
                skipped: !hasCombatRow,
                result: {
                    intent: 'end_combat',
                    summary: hasCombatRow ? '战斗结束，删除临时战斗状态。' : '没有进行中的战斗，无需删除。',
                },
                diagnostics,
            };
        }

        if (action.intent === 'advance_turn') {
            const nextState = decrementCooldowns(unitState);
            return {
                ok: true,
                action,
                combatRow,
                unitState: nextState,
                result: { intent: 'advance_turn', summary: '回合推进，技能冷却已递减。' },
                writeback: {
                    combat: {
                        '待结算事项': compactJson(action),
                        '结果摘要': '回合推进：技能冷却已递减。',
                        '战斗单位状态_脚本': compactJson(nextState),
                        '已处理动作ID_脚本': appendProcessedActionId(combatRow, action.action_id),
                        '战斗结算日志_脚本': appendJsonLine(cell(combatRow, '战斗结算日志_脚本'), {
                            action_id: action.action_id,
                            intent: 'advance_turn',
                            cooldowns: nextState.cooldowns || {},
                        }),
                        '战斗诊断_脚本': '',
                    },
                },
                diagnostics,
            };
        }

        if (action.intent === 'activate_avatar') {
            return {
                ok: true,
                action,
                combatRow,
                unitState,
                result: { intent: 'activate_avatar', summary: '武魂真身状态已标记为开启。' },
                recalculateAfterWrite: true,
                writeback: {
                    runtime: { '武魂真身状态': '已开启' },
                    combat: {
                        '待结算事项': compactJson(action),
                        '结果摘要': '玩家开启武魂真身，自动计算脚本将立即按既有真身公式重算。',
                        '已处理动作ID_脚本': appendProcessedActionId(combatRow, action.action_id),
                    },
                },
                diagnostics,
            };
        }

        const skillResult = resolveSkill(db, action);
        if (!skillResult.ok) diagnostics.push(...(skillResult.diagnostics || []));
        const target = resolveCombatUnit(db, unitState, action.target);
        if (!action.target) diagnostics.push(combatDiagnostic('missing_target', '未能从玩家输入中识别攻击目标。'));
        if (target?.ambiguous) diagnostics.push(...(target.diagnostics || []));
        if (!target) diagnostics.push(combatDiagnostic('missing_target', `未在战斗单位状态_脚本或 NPC能力档案表 中找到目标：${action.target || '空'}`));
        if (!skillResult.ok || !target || target?.ambiguous) {
            return { ok: false, action, combatRow, unitState, diagnostics };
        }

        const player = playerCombatStats(db);
        const targetStats = unitCombatStats(target.data);
        const skill = skillResult.skill;
        const classification = classifySkill(skill, action);
        diagnostics.push(...(classification.diagnostics || []));
        const numbers = resolveSkillNumbers(skill, classification, options);
        diagnostics.push(...numbers.diagnostics);
        const traits = collectTraits(db);
        const stateText = activeText(db);
        const combatModifiers = collectCombatModifiers(db, traits, {
            player,
            targetData: { ...(target.data || {}), ...targetStats },
            skill,
            action,
            stateText,
            unitState,
            options,
        });
        if (combatModifiers.disabled.length) {
            diagnostics.push(...combatModifiers.disabled.map(reason => combatDiagnostic('trait_skill_disabled', reason)));
        }

        const activeCooldown = cooldownValue(unitState, skill);
        if (activeCooldown > 0) {
            diagnostics.push(combatDiagnostic('cooldown_blocked', `${skill.name} 冷却中，剩余 ${activeCooldown} 回合。`));
        }

        const cost = applyCostModifier(resourceCost(skill.cost, player), combatModifiers.costMultiplier);
        const currentResource = Number(player[cost.field]);
        if (cost.hasCost && cost.unknown) {
            diagnostics.push(combatDiagnostic('missing_cost_resource', `${skill.name} 的消耗「${cost.note}」需要资源上限，但当前上限未知。`));
        }
        if (cost.amount > 0 && !Number.isFinite(currentResource)) {
            diagnostics.push(combatDiagnostic('missing_cost_resource', `${skill.name} 需要扣除 ${cost.field}，但当前资源未知。`));
        }
        if (cost.amount > 0 && Number.isFinite(currentResource) && currentResource < cost.amount) {
            diagnostics.push(combatDiagnostic('insufficient_resource', `资源不足：${cost.field} 当前 ${currentResource}，需要 ${cost.amount}。`));
        }

        if (classification.hasDamage && (!Number.isFinite(targetStats.hp) || targetStats.hp <= 0)) {
            diagnostics.push(combatDiagnostic('missing_target_hp', `目标 ${target.key} 缺少可扣减的当前 HP。`));
        }
        const valueProfile = combatValueProfile({
            attacker: player,
            defender: { ...(target.data || {}), ...targetStats },
        }, skill.attackType || '肉体', numbers.ratios);
        diagnostics.push(...valueProfile.diagnostics);
        if (diagnostics.length) {
            return { ok: false, action, combatRow, unitState, skill, target, classification, cost, diagnostics };
        }

        const defaultNotes = [];
        if (classification.hasDamage && options.resistance === undefined) defaultNotes.push('抗性修正默认1.0');
        if (classification.hasDamage && options.hit === undefined) defaultNotes.push('命中修正默认1.0');
        if (options.state === undefined) defaultNotes.push('状态修正默认1.0');
        defaultNotes.push(...combatModifiers.notes);
        const antiControl = classification.hasControl ? antiControlForAttempt(target.data) : 1;
        const combatInput = {
            attacker: player,
            defender: { ...(target.data || {}), ...targetStats },
            skillName: skill.name,
            attackType: skill.attackType || '肉体',
            damageType: skill.effectType,
            skillTier: skill.tier || skill.effectType || skill.detail,
            mode: classification.kind,
            skillMultiplier: numbers.damageMultiplier,
            controlMultiplier: numbers.controlMultiplier,
            mixRatios: numbers.ratios,
            resistance: options.resistance ?? 1,
            hit: options.hit ?? 1,
            state: options.state ?? 1,
            antiControl,
            traitDamageMultiplier: combatModifiers.damageMultiplier,
            traitControlMultiplier: combatModifiers.controlMultiplier,
        };
        const result = calculateCombat(combatInput);
        const damage = classification.hasDamage ? Math.max(0, Math.round(result.damage || 0)) : 0;
        const rawNextHp = classification.hasDamage ? Math.max(0, round(targetStats.hp - damage)) : targetStats.hp;
        const cooldown = cooldownTurns(skill.cooldown);
        const nextState = cloneCombatState(unitState);
        if (!nextState.units || typeof nextState.units !== 'object') nextState.units = {};
        let nextUnit = classification.hasControl ? clearConsumedAntiControl(target.data || {}) : { ...(target.data || {}) };
        let nextHp = rawNextHp;
        let fatalProtection = null;
        if (classification.hasDamage) {
            const protectedResult = applyFatalProtectionToUnit({
                ...(target.data || {}),
                maxHp: targetStats.maxHp || maxHpValue(target.data) || targetStats.hp,
            }, rawNextHp, new Set(), textForCombatTags(target.data));
            nextHp = protectedResult.hp;
            fatalProtection = protectedResult.triggered;
            nextUnit = { ...nextUnit, ...protectedResult.unit, hp: nextHp, currentHp: nextHp };
        }
        if (classification.hasControl && result.control?.nextAntiControlMultiplier > 1) {
            nextUnit.nextAntiControlMultiplier = result.control.nextAntiControlMultiplier;
            nextUnit.controlState = result.control.result;
        }
        nextState.units[target.key] = nextUnit;
        if (!nextState.cooldowns || typeof nextState.cooldowns !== 'object') nextState.cooldowns = {};
        if (cooldown > 0) nextState.cooldowns[skill.key] = cooldown;

        const runtime = {};
        if (action.activate_avatar) runtime['武魂真身状态'] = '已开启';
        if (cost.amount > 0) {
            const fieldName = cost.field === 'hp' ? '血量当前' : cost.field === 'spirit' ? '精神力当前' : '蓝量当前';
            runtime[fieldName] = String(Math.max(0, round((Number(player[cost.field]) || 0) - cost.amount)));
        }

        const logEntry = {
            action_id: action.action_id,
            actor: action.actor,
            target: target.key,
            skill: skill.name,
            classification: classification.kind,
            damage,
            cost,
            cooldown,
            defaultNotes,
            formula: {
                attackValue: result.attackValue,
                defenseValue: result.defenseValue,
                confrontationRatio: result.confrontation?.ratio,
                confrontationCoefficient: result.confrontation?.coefficient,
                skillMultiplier: result.skillMultiplier,
                traitDamageMultiplier: result.traitDamageMultiplier,
                traitControlMultiplier: result.controlResolution?.traitControlMultiplier ?? result.traitControlMultiplier,
                controlMultiplier: result.controlResolution?.controlMultiplier ?? result.controlMultiplier,
            },
            control: result.control,
            traitModifiers: combatModifiers,
            fatalProtection,
        };

        const summaryParts = [];
        if (action.activate_avatar) summaryParts.push('开启武魂真身');
        if (classification.hasDamage) summaryParts.push(`${skill.name} 命中 ${target.key}，伤害 ${damage}`);
        if (fatalProtection) summaryParts.push(`${target.key}触发${fatalProtection.name}，恢复${fatalProtection.hp}`);
        if (classification.hasControl && result.control) summaryParts.push(`${skill.name} 控制 ${target.key}：${result.control.result}`);

        return {
            ok: true,
            action,
            combatRow,
            unitState: nextState,
            skill,
            target,
            result,
            damage,
            cost,
            cooldown,
            classification,
            traitModifiers: combatModifiers,
            fatalProtection,
            recalculateBeforeAction: action.activate_avatar && options.avatarAlreadyApplied !== true,
            deleteCombatRow: classification.hasDamage && allKnownCombatUnitsDefeated(nextState),
            writeback: {
                runtime,
                combat: {
                    '玩家资源摘要': Object.keys(runtime).length ? Object.entries(runtime).map(([k, v]) => `${k}:${v}`).join(';') : asText(cell(combatRow, '玩家资源摘要')),
                    '敌方状态': classification.hasDamage ? `${target.key}:HP ${targetStats.hp}->${nextHp}` : asText(cell(combatRow, '敌方状态')),
                    '控制/异常状态': classification.hasControl && result.control ? `${target.key}:${result.control.result}${result.control.nextAntiControlMultiplier > 1 ? `;下一次抗控x${result.control.nextAntiControlMultiplier}` : ''}` : asText(cell(combatRow, '控制/异常状态')),
                    '待结算事项': compactJson(action),
                    '结果摘要': `${summaryParts.join('；')}。`,
                    '战斗单位状态_脚本': compactJson(nextState),
                    '已处理动作ID_脚本': appendProcessedActionId(combatRow, action.action_id),
                    '战斗结算日志_脚本': appendJsonLine(cell(combatRow, '战斗结算日志_脚本'), logEntry),
                    '战斗诊断_脚本': diagnostics.join('\n'),
                },
            },
            diagnostics,
        };
    }

    function calculateDamageResolution(input = {}) {
        const attacker = input.attacker || {};
        const defender = input.defender || {};
        const attackType = input.attackType || input.type || '肉体攻击';
        const defenseType = input.defenseType || attackType.replace('攻击', '承受');
        const lifeAttack = lifeAttackProfile(input, attacker);
        const attackValue = lifeAttack.active ? lifeAttack.attackValue : combatAttackValue(attacker, attackType, input.mixRatios);
        const defenseValue = combatDefenseValue(defender, defenseType, input.mixRatios);
        const explicitSkillMultiplier = Number(input.skillMultiplier ?? input.multiplier ?? NaN);
        const skillMultiplier = Number.isFinite(explicitSkillMultiplier) && explicitSkillMultiplier > 0
            ? explicitSkillMultiplier
            : skillMultiplierForTier(input.skillTier ?? input.multiplierTier ?? input.tier ?? input.skillName ?? input.attackName, 1);
        const effectiveSkillMultiplier = lifeAttack.active && !yes(input.allowSkillMultiplierWithLifeAttack) ? 1 : skillMultiplier;
        const resistance = Number(input.resistance ?? 1) || 1;
        const hit = Number(input.hit ?? 1) || 1;
        const state = Number(input.state ?? 1) || 1;
        const traitDamageMultiplier = Number(input.traitDamageMultiplier ?? input.finalDamageMultiplier ?? 1) || 1;
        const adjustment = Number(input.adjustment ?? 0) || 0;
        const extreme = extremeCombatBonus(input, attacker, attackType, defenseType);
        const confrontationRatio = defenseValue > 0 ? attackValue / defenseValue : attackValue > 0 ? Infinity : 0;
        const confrontationCoefficient = combatConfrontationCoefficient(confrontationRatio);
        const damage = Math.max(0, round(attackValue * effectiveSkillMultiplier * confrontationCoefficient * extreme.multiplier * resistance * hit * state * traitDamageMultiplier + adjustment));
        const controlMultiplier = Number(input.controlMultiplier ?? effectiveSkillMultiplier) || 1;
        const traitControlMultiplier = Number(input.traitControlMultiplier ?? 1) || 1;
        const controlStrength = attackValue * controlMultiplier * state * extreme.multiplier * traitControlMultiplier;
        const controlResistance = Math.max(1, defenseValue * (Number(input.antiControl ?? 1) || 1));
        const controlRatio = round(controlStrength / controlResistance);
        const controlText = controlResult(controlRatio);
        return {
            attackType,
            defenseType,
            attackValue: round(attackValue),
            defenseValue: round(defenseValue),
            confrontation: {
                ratio: round(confrontationRatio),
                coefficient: confrontationCoefficient,
            },
            lifeAttack,
            skillMultiplier: effectiveSkillMultiplier,
            traitDamageMultiplier,
            traitControlMultiplier,
            skippedSkillMultiplier: lifeAttack.active && effectiveSkillMultiplier !== skillMultiplier,
            extreme,
            damage,
        };
    }

    function calculateControlResolution(input = {}) {
        const attacker = input.attacker || {};
        const defender = input.defender || {};
        const attackType = input.attackType || input.type || '魂力控制';
        const defenseType = input.defenseType || attackType.replace('攻击', '承受').replace('控制', '承受');
        const attackValue = combatAttackValue(attacker, attackType, input.mixRatios);
        const defenseValue = combatDefenseValue(defender, defenseType, input.mixRatios);
        const controlMultiplier = Number(input.controlMultiplier ?? controlMultiplierForTier(input.controlTier ?? input.skillTier ?? input.tier ?? input.skillName, 1)) || 1;
        const state = Number(input.state ?? 1) || 1;
        const extreme = extremeCombatBonus(input, attacker, attackType, defenseType);
        const antiControl = Number(input.antiControl ?? 1) || 1;
        const traitControlMultiplier = Number(input.traitControlMultiplier ?? 1) || 1;
        const controlStrength = attackValue * controlMultiplier * state * extreme.multiplier * traitControlMultiplier;
        const controlResistance = Math.max(1, defenseValue * antiControl);
        const controlRatio = round(controlStrength / controlResistance);
        const controlText = controlResult(controlRatio);
        return {
            attackType,
            defenseType,
            attackValue: round(attackValue),
            defenseValue: round(defenseValue),
            controlMultiplier,
            traitControlMultiplier,
            state,
            extreme,
            control: {
                strength: round(controlStrength),
                resistance: round(controlResistance),
                ratio: controlRatio,
                result: controlText,
                nextAntiControlMultiplier: controlAntiMultiplierForResult(controlText),
            },
        };
    }

    function calculateCombat(input = {}) {
        const mode = asText(input.mode || input.intent || input.kind || 'damage');
        const wantsControl = /control|控制|hybrid|mixed|混合/.test(mode) || input.controlMultiplier !== undefined || input.includeControl === true;
        const wantsDamage = !/control|控制/.test(mode) || /hybrid|mixed|混合/.test(mode) || input.includeDamage === true;
        const damage = wantsDamage ? calculateDamageResolution(input) : null;
        const control = wantsControl ? calculateControlResolution(input) : null;
        if (damage && control) return { ...damage, control: control.control, controlResolution: control };
        if (control) return { ...control, damage: 0 };
        return { ...damage, control: null };
    }

    function previewPlayerCombatInput(text = '', options = {}) {
        return buildCombatResolution(text, options);
    }

    async function writeCombatDiagnosis(db, combatRow, diagnostics, action = null, options = {}) {
        const data = {
            '战斗诊断_脚本': diagnostics.join('\n'),
        };
        if (action) data['待结算事项'] = compactJson(action);
        const row = combatRow && combatRow.__rowIndex ? combatRow : currentCombatRow(db);
        return upsertFirstRow(CONFIG.tables.combatState, row, {
            '冲突编码': asText(cell(row, '冲突编码')) || 'combat-auto',
            ...data,
        }, options);
    }

    async function processPlayerCombatInput(text = '', options = {}) {
        api = getDatabaseApi() || api || await waitForDatabaseApi();
        if (!api || typeof api.updateRow !== 'function') {
            return { ok: false, message: 'AutoCardUpdaterAPI.updateRow unavailable' };
        }
        let db = api.exportTableAsJson ? api.exportTableAsJson() : {};
        const sourceText = asText(text) || latestPlayerInputText();
        const preliminaryAction = parsePlayerCombatAction(sourceText, options);
        let combatRow = currentCombatRow(db);
        const preliminaryActionId = asText(preliminaryAction?.action_id);

        if (preliminaryActionId && processedActionIdSet(combatRow).has(preliminaryActionId) && !options.force) {
            return { ok: true, skipped: true, reason: 'duplicate action', action: preliminaryAction };
        }

        let avatarPreRecalculated = false;
        if (preliminaryAction?.activate_avatar && preliminaryAction.intent !== 'activate_avatar' && options.avatarAlreadyApplied !== true) {
            const runtimeRow = playerCombatStats(db).runtimeRow;
            await upsertFirstRow(runtimeStatsTableName(db), runtimeRow, { '武魂真身状态': '已开启' }, options);
            await recalculate({ force: true, reason: 'combat-avatar-before-action' });
            avatarPreRecalculated = true;
            db = api.exportTableAsJson ? api.exportTableAsJson() : db;
            combatRow = currentCombatRow(db);
        }

        const preview = buildCombatResolution(sourceText, { ...options, db, avatarAlreadyApplied: avatarPreRecalculated || options.avatarAlreadyApplied });
        combatRow = preview.combatRow && preview.combatRow.__rowIndex ? preview.combatRow : currentCombatRow(db);
        const actionId = asText(preview.action?.action_id);

        if (actionId && processedActionIdSet(combatRow).has(actionId) && !options.force) {
            return { ok: true, skipped: true, reason: 'duplicate action', action: preview.action, preview };
        }

        if (preview.action?.intent === 'end_combat' && preview.skipped && !preview.deleteCombatRow) {
            return {
                ...preview,
                ok: true,
                failedWrites: [],
                message: '没有进行中的战斗，无需删除。',
            };
        }

        if (!preview.ok) {
            await writeCombatDiagnosis(db, combatRow, preview.diagnostics || ['战斗动作无法结算。'], preview.action, options);
            if (CONFIG.refreshAfterWrite && options.skipRefresh !== true && typeof api.refreshDataAndWorldbook === 'function') {
                await api.refreshDataAndWorldbook();
            }
            return { ...preview, ok: false, message: '战斗动作未结算，已写入诊断。' };
        }

        const failedWrites = [];
        const runtimeRow = playerCombatStats(db).runtimeRow;
        if (preview.writeback?.runtime && Object.keys(preview.writeback.runtime).length) {
            const result = await upsertFirstRow(runtimeStatsTableName(db), runtimeRow, preview.writeback.runtime, options);
            if (apiWriteFailed(result)) failedWrites.push(`${runtimeStatsTableName(db)}:update failed`);
        }

        const combatData = {
            '冲突编码': asText(cell(combatRow, '冲突编码')) || 'combat-auto',
            ...(preview.writeback?.combat || {}),
        };
        if (preview.deleteCombatRow) {
            const combatResult = combatRow?.__rowIndex
                ? await deleteRowCompat(CONFIG.tables.combatState, combatRow.__rowIndex, options)
                : false;
            if (apiWriteFailed(combatResult)) failedWrites.push(`${CONFIG.tables.combatState}:delete failed`);
        } else {
            const combatResult = await upsertFirstRow(CONFIG.tables.combatState, combatRow, combatData, options);
            if (apiWriteFailed(combatResult)) failedWrites.push(`${CONFIG.tables.combatState}:update failed`);
        }

        let postRecalculate = null;
        if (preview.recalculateAfterWrite && failedWrites.length === 0) {
            postRecalculate = await recalculate({ force: true, reason: 'combat-avatar-after-action' });
        }

        if (!postRecalculate && CONFIG.refreshAfterWrite && options.skipRefresh !== true && typeof api.refreshDataAndWorldbook === 'function') {
            await api.refreshDataAndWorldbook();
        }

        return {
            ...preview,
            ok: failedWrites.length === 0,
            failedWrites,
            postRecalculate,
            message: failedWrites.length
                ? `战斗结算完成，但 ${failedWrites.length} 项写入失败。`
                : preview.deleteCombatRow
                    ? '战斗已结束，临时战斗状态已删除。'
                    : '战斗结算已写回数据库。',
        };
    }

    async function recalculate(options = {}) {
        if (isWriting) return { skipped: true, reason: '正在写入' };
        api = getDatabaseApi() || api || await waitForDatabaseApi();
        if (!api) {
            toast('未检测到 shujuku / AutoCardUpdaterAPI，无法计算数据库。', 'warning');
            return { ok: false, reason: 'AutoCardUpdaterAPI unavailable' };
        }

        const db = api.exportTableAsJson();
        if (!db) {
            toast('无法导出当前数据库。', 'warning');
            return { ok: false, reason: 'exportTableAsJson failed' };
        }

        const readiness = verifyDatabaseReady(db);
        if (!readiness.ok) {
            console.warn(`[${SCRIPT_NAME}] ${readiness.message}`, readiness.missing);
            toast(readiness.message, 'warning');
            return { ok: false, reason: 'database template incomplete', missingTables: readiness.missing };
        }

        const statsRow = firstRow(db, CONFIG.tables.stats);
        const runtimeTable = runtimeStatsTableName(db);
        const runtimeRow = runtimeStatsRow(db, statsRow);
        const playerRow = firstRow(db, CONFIG.tables.player);
        const hasMissingDerived = derivedFieldsMissing(statsRow, playerRow);

        const inputHash = stableHash({
            stats: rows(db, CONFIG.tables.stats),
            statsRuntime: rows(db, CONFIG.tables.statsRuntime),
            player: rows(db, CONFIG.tables.player),
            traits: rows(db, CONFIG.tables.traits),
            traitState: rows(db, CONFIG.tables.traitState),
            traitRules: rows(db, CONFIG.tables.traitRules),
            traitAttributeRules: rows(db, CONFIG.tables.traitAttributeRules),
            traitEquipmentSlots: rows(db, CONFIG.tables.traitEquipmentSlots),
            traitTempStates: rows(db, CONFIG.tables.traitTempStates),
            skills: rows(db, CONFIG.tables.skills),
            soulOverview: rows(db, CONFIG.tables.soulOverview),
            rings: CONFIG.tables.rings.map(name => rows(db, name)),
            soulBones: rows(db, CONFIG.tables.soulBones),
            spirits: rows(db, CONFIG.tables.spirits),
            armor: rows(db, CONFIG.tables.armor),
            soulDevices: rows(db, CONFIG.tables.soulDevices),
            titlePanel: rows(db, CONFIG.tables.titlePanel),
        });
        if (!options.force && !hasMissingDerived && inputHash === lastInputHash) {
            log('输入未变化，跳过重算');
            return { ok: true, skipped: true };
        }

        if (/是|锁定|true|1/i.test(asText(cell(runtimeRow, '自动计算锁定')))) {
            toast('人物运行状态面板已锁定，跳过自动计算。', 'info');
            return { ok: true, skipped: true, reason: 'locked' };
        }

        isWriting = true;
        try {
            const level = parseLevel(statsRow, playerRow);
            const traits = collectTraits(db);
            const attrRules = collectTraitAttributeRules(db, traits);
            const dslRules = collectDslRules(db, traits);
            const dailyBonuses = collectDailyBonuses(db);
            const ruleDiagnostics = [];
            const ruleState = { attrRules, dslRules, diagnostics: ruleDiagnostics, daily: dailyBonuses.daily, flags: {} };
            const ctx = martialContext(db, traits);
            const stateText = activeText(db);

            const updates = [];
            updates.push(...refreshTraitEquipmentSlots(db, traits));

            const overviewUpdateBase = {
                '多武魂倍率策略_脚本': ctx.hasLink ? '武魂串联：最高两个倍率求和' : '默认：最高倍率',
                '全局总先天魂力_脚本': String(ctx.totalInnate),
                '全局综合倍率_脚本': `${round(ctx.multiplier)}x`,
                '全局倍率来源_脚本': `${ctx.source};总先天魂力综合倍率参考=${round(ctx.byTotal)}x`,
            };
            for (const info of ctx.rows) {
                if (!info.row.__rowIndex) continue;
                updates.push({
                    table: CONFIG.tables.soulOverview,
                    rowIndex: info.row.__rowIndex,
                    data: {
                        '先天等级_脚本': `${info.quality.level}级`,
                        '倍率与经验效率_脚本': `倍率:${info.quality.multiplier}x;经验效率:${info.quality.exp}`,
                        '是否极致_脚本': info.isExtreme ? '是' : '否',
                        '共鸣率_脚本': info.isBody ? `${round(info.resonance * 100)}%` : '不适用',
                        ...overviewUpdateBase,
                        '计算备注': `品质=${info.quality.key};觉醒=${info.awakened ? '是' : '否'}`,
                    },
                });
            }

            const ringMartial = bonus();
            for (const tableName of CONFIG.tables.rings) {
                for (const row of rows(db, tableName)) {
                    if (empty(cell(row, '魂环序号')) && empty(cell(row, '魂环年限')) && empty(cell(row, '魂技名称'))) continue;
                    const result = calcRingBonus(row, traits, attrRules, ruleDiagnostics);
                    addTri(ringMartial, result.tri);
                    updates.push({
                        table: tableName,
                        rowIndex: row.__rowIndex,
                        data: {
                            '肉体加成_脚本': String(round(result.tri.body)),
                            '魂力加成_脚本': String(round(result.tri.soul)),
                            '精神加成_脚本': String(round(result.tri.mind)),
                            '加成计算备注': `年份=${Math.floor(result.year)};${result.note}`,
                        },
                    });
                }
            }

            const equipment = collectEquipment(db);
            let base = bonus(
                num(cell(statsRow, '肉体_基础'), CONFIG.defaults.baseAttr),
                num(cell(statsRow, '魂力_基础'), CONFIG.defaults.baseAttr),
                num(cell(statsRow, '精神_基础'), CONFIG.defaults.baseAttr),
            );
            let manualOther = bonus(
                num(cell(statsRow, '肉体_其余加成'), 0),
                num(cell(statsRow, '魂力_其余加成'), 0),
                num(cell(statsRow, '精神_其余加成'), 0),
            );

            const martialRaw = bonus();
            addTri(martialRaw, ringMartial);
            addTri(martialRaw, equipment.martial);

            const other = bonus();
            addTri(other, manualOther);
            addTri(other, equipment.other);

            const finalCalc = calcFinals(base, martialRaw, other, ctx, traits, stateText, ruleState);
            const maxRes = resourceMax(level, finalCalc.final, equipment.resources, traits, stateText, ruleState);
            const realm = spiritRealm(maxRes.spirit);
            const scale = battleScale(finalCalc.final.body, finalCalc.final.soul, finalCalc.final.mind);
            const pointState = pointGrowthState(statsRow, runtimeRow, playerRow);

            const statsUpdate = {
                '魂力等级': String(level),
                '魂师境界': soulRealm(level),
                '精神力境界_脚本': realm,
                '血量上限_脚本': String(maxRes.hp),
                '蓝量上限_脚本': String(maxRes.mp),
                '精神力上限_脚本': String(maxRes.spirit),
                '肉体_武魂相关_脚本': String(round(finalCalc.martialScript.body)),
                '魂力_武魂相关_脚本': String(round(finalCalc.martialScript.soul)),
                '精神_武魂相关_脚本': String(round(finalCalc.martialScript.mind)),
                '肉体_最终_脚本': String(round(finalCalc.final.body)),
                '魂力_最终_脚本': String(round(finalCalc.final.soul)),
                '精神_最终_脚本': String(round(finalCalc.final.mind)),
                '日常六维与调整值': [
                    asText(cell(statsRow, '日常六维与调整值')),
                    dailyBonuses.details.length ? `称号调整=${dailyBonuses.details.join('|')}` : '',
                ].filter(Boolean).join(';'),
            };
            const runtimeUpdate = {
                '特性点': String(pointState.after.sp),
                '红尘点': String(pointState.after.dp),
                '计算备注': [
                    `v${VERSION}`,
                    `武魂倍率=${finalCalc.multiplier}x`,
                    `真身=${finalCalc.avatar ? '是' : '否'}`,
                    `本体共鸣=${round(finalCalc.resonanceRate * 100)}%`,
                    pointState.note,
                    `魂环武魂原始=${formatTri(ringMartial)}`,
                    `装备武魂原始=${formatTri(equipment.martial)}`,
                    `装备其余=${formatTri(equipment.other)}`,
                    ruleDiagnostics.slice(0, 8).join('|'),
                    equipment.details.slice(0, 5).join('|'),
                ].filter(Boolean).join(';'),
            };
            const hpClamp = clampCurrentValue(cell(runtimeRow, '血量当前'), maxRes.hp, '血量', ruleDiagnostics);
            const mpClamp = clampCurrentValue(cell(runtimeRow, '蓝量当前'), maxRes.mp, '蓝量', ruleDiagnostics);
            const spiritClamp = clampCurrentValue(cell(runtimeRow, '精神力当前'), maxRes.spirit, '精神力', ruleDiagnostics);
            if (hpClamp.changed) runtimeUpdate['血量当前'] = hpClamp.value;
            if (mpClamp.changed) runtimeUpdate['蓝量当前'] = mpClamp.value;
            if (spiritClamp.changed) runtimeUpdate['精神力当前'] = spiritClamp.value;
            if (hpClamp.reason || mpClamp.reason || spiritClamp.reason) {
                runtimeUpdate['计算备注'] += `;当前值处理=${[hpClamp.reason, mpClamp.reason, spiritClamp.reason].filter(Boolean).join('|')}`;
            }

            const failedWrites = [];
            failedWrites.push(...await updateRows(updates, { quiet: true }));
            const statsResult = await upsertFirstRow(CONFIG.tables.stats, statsRow, statsUpdate, { quiet: true });
            if (apiWriteFailed(statsResult)) failedWrites.push(`${CONFIG.tables.stats}:upsert failed`);
            const runtimeResult = await upsertFirstRow(runtimeTable, runtimeRow, runtimeUpdate, { quiet: true });
            if (apiWriteFailed(runtimeResult)) failedWrites.push(`${runtimeTable}:upsert failed`);
            if (playerRow && playerRow.__rowIndex) {
                const playerResult = await updateRowCompat(CONFIG.tables.player, playerRow.__rowIndex, {
                    '魂力等级': String(level),
                    '战力标尺定位_脚本': scale,
                }, { quiet: true });
                if (apiWriteFailed(playerResult)) failedWrites.push(`${CONFIG.tables.player}:updateRow failed`);
            }

            if (CONFIG.refreshAfterWrite && typeof api.refreshDataAndWorldbook === 'function') {
                await api.refreshDataAndWorldbook();
            }

            const verifyDb = typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : db;
            const missingDerived = verifyDerivedWrite(verifyDb, Boolean(playerRow && playerRow.__rowIndex));
            if (!failedWrites.length && !missingDerived.length) lastInputHash = inputHash;

            if (failedWrites.length || missingDerived.length) {
                const parts = [];
                if (failedWrites.length) parts.push(`${failedWrites.length}项写入失败：${failedWrites.slice(0, 3).join('、')}`);
                if (missingDerived.length) parts.push(`脚本字段未落库：${missingDerived.slice(0, 6).join('、')}`);
                console.warn(`[${SCRIPT_NAME}] writeback incomplete`, { failedWrites, missingDerived });
                toast(`重算完成，但${parts.join('；')}，下轮会继续重试。`, 'warning');
            } else {
                toast(`重算完成：${soulRealm(level)} / ${realm} / ${scale}`, 'success');
            }
            return { ok: failedWrites.length === 0 && missingDerived.length === 0, level, realm, scale, pointState, failedWrites, missingDerived };
        } catch (error) {
            console.error(`[${SCRIPT_NAME}]`, error);
            toast(`重算失败：${error.message || error}`, 'error');
            return { ok: false, error };
        } finally {
            isWriting = false;
        }
    }

    function storedAutoSetting() {
        let stored = localStorage.getItem(STORAGE_KEY);
        if (stored !== null) return stored;
        for (const key of LEGACY_STORAGE_KEYS) {
            const legacy = localStorage.getItem(key);
            if (legacy !== null) {
                localStorage.setItem(STORAGE_KEY, legacy);
                localStorage.removeItem(key);
                stored = legacy;
                break;
            }
        }
        return stored;
    }

    function autoEnabled() {
        const stored = storedAutoSetting();
        return stored === null ? true : stored === '1';
    }

    function setAutoEnabled(enabled) {
        localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
        LEGACY_STORAGE_KEYS.forEach(key => localStorage.removeItem(key));
    }

    function scheduleAutoRecalculate(reason = 'auto', delayMs = 250) {
        if (!autoEnabled() || isWriting) return;
        if (pendingAutoRecalc) clearTimeout(pendingAutoRecalc);
        pendingAutoRecalc = setTimeout(() => {
            pendingAutoRecalc = null;
            recalculate({ force: true, reason });
        }, delayMs);
    }

    function registerTableUpdateListener() {
        if (!api || tableUpdateCallback || typeof api.registerTableUpdateCallback !== 'function') return;
        tableUpdateCallback = () => scheduleAutoRecalculate('table-update', 300);
        api.registerTableUpdateCallback(tableUpdateCallback);
    }

    function unregisterTableUpdateListener() {
        if (!api || !tableUpdateCallback || typeof api.unregisterTableUpdateCallback !== 'function') {
            tableUpdateCallback = null;
            return;
        }
        api.unregisterTableUpdateCallback(tableUpdateCallback);
        tableUpdateCallback = null;
    }

    function startAuto(showToast = true) {
        stopAuto(false);
        registerTableUpdateListener();
        timer = setInterval(() => recalculate({ force: true, reason: 'interval' }), CONFIG.autoIntervalMs);
        setAutoEnabled(true);
        if (showToast) toast('已开启自动重算。', 'success');
        scheduleAutoRecalculate('start', 0);
    }

    function stopAuto(showToast = true) {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        if (pendingAutoRecalc) {
            clearTimeout(pendingAutoRecalc);
            pendingAutoRecalc = null;
        }
        unregisterTableUpdateListener();
        setAutoEnabled(false);
        if (showToast) toast('已关闭自动重算。', 'info');
    }

    function toggleAuto() {
        if (timer || autoEnabled()) stopAuto(true);
        else startAuto();
    }

    function getStatus() {
        return {
            version: VERSION,
            autoEnabled: autoEnabled(),
            running: !!timer,
            writing: isWriting,
            pending: !!pendingAutoRecalc,
            intervalMs: CONFIG.autoIntervalMs,
            hasApi: !!(api || getDatabaseApi()),
            lastInputHash,
        };
    }

    function status() {
        const live = getStatus();
        const message = `版本 ${live.version}；自动重算：${live.autoEnabled ? '开' : '关'}；计时器：${live.running ? '运行中' : '未运行'}；间隔 ${live.intervalMs / 1000}s`;
        toast(message, 'info');
        return message;
    }

    async function init() {
        api = await waitForDatabaseApi(20000);
        if (!api) {
            toast('未检测到数据库 API。导入脚本后，请确认神·数据库 / SP·数据库 II/III 已加载。', 'warning');
            return;
        }
        if (autoEnabled()) {
            startAuto(false);
        }
        log('ready');
    }

    const publicApi = {
        version: VERSION,
        recalculate: () => recalculate({ force: true }),
        getPointState,
        pointGrowthForLevel,
        previewCreationMapping,
        applyCreationPayload,
        diagnose,
        checkDatabaseReady: () => verifyDatabaseReady(api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : null),
        checkCoreDatabaseReady: () => verifyDatabaseReady(api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : null, CORE_RECALC_TABLES),
        checkFullTemplateReady: () => verifyDatabaseReady(api && typeof api.exportTableAsJson === 'function' ? api.exportTableAsJson() : null, REQUIRED_TEMPLATE_TABLES),
        calculateCombat,
        calculateDamageResolution,
        calculateControlResolution,
        combatConfrontationCoefficient,
        skillMultiplierForTier,
        controlMultiplierForTier,
        previewPlayerCombatInput,
        processPlayerCombatInput,
        getStatus,
        toggleAuto,
        startAuto: () => startAuto(true),
        stopAuto,
        status,
    };

    for (const host of hostWindows()) {
        try {
            host.DouLuoAutoCalc = publicApi;
        } catch (_) {}
    }

    init();
})();
