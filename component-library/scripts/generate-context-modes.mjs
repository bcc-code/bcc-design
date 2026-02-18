#!/usr/bin/env node
/**
 * Generates Figma context mode JSON files from the new semantic setup
 * (bcc_scheme with groups default, secondary, tertiary and primitive keys).
 * Each context mode maps ctx-* to semantic tokens (color/<group>/<key>).
 * Config: scripts/context-rules.config.json (rules + exceptions per type).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const RULES_CONFIG_PATH = join(__dirname, 'context-rules.config.json');

const SEMANTIC_SET_ID = 'VariableCollectionId:e28a14a5264389e942ac6df24b37345ca2ca8c68/-1:-1';
const SEMANTIC_SET_NAME = 'bcc/scheme';
const PRIMITIVE_SET_ID = 'VariableCollectionId:417c7ac5537f108f00dd75d03fdef006a1a47c4a/-1:-1';
const PRIMITIVE_SET_NAME = 'bcc/primitive';

/** Figma variable scopes per ctx token: fills (bg*) = frame/shape fill; strokes = border*; text = text* and icon*. */
const FIGMA_SCOPES = {
	'ctx-text': ['TEXT_FILL'],
	'ctx-text-bold': ['TEXT_FILL'],
	'ctx-text-subtle': ['TEXT_FILL'],
	'ctx-icon': ['TEXT_FILL'],
	'ctx-text-hover': ['TEXT_FILL'],
	'ctx-text-pressed': ['TEXT_FILL'],
	'ctx-background': ['FRAME_FILL', 'SHAPE_FILL'],
	'ctx-background-hover': ['FRAME_FILL', 'SHAPE_FILL'],
	'ctx-background-pressed': ['FRAME_FILL', 'SHAPE_FILL'],
	'ctx-border': ['STROKE_COLOR'],
	'ctx-border-bold': ['STROKE_COLOR'],
	'ctx-border-hover': ['STROKE_COLOR'],
	'ctx-border-pressed': ['STROKE_COLOR'],
	'ctx-shadow': ['EFFECT_COLOR'],
	'ctx-gradient': ['FRAME_FILL', 'SHAPE_FILL'],
	'ctx-gradient-hover': ['FRAME_FILL', 'SHAPE_FILL'],
	'ctx-gradient-pressed': ['FRAME_FILL', 'SHAPE_FILL'],
};
function getScopesForCtxKey(key) {
	return FIGMA_SCOPES[key] || ['ALL_SCOPES'];
}

/** Collect all (group, key) pairs from semantic color tree. Structure: color.<group>.<key> (key e.g. "neutral/1000"). */
function collectSemanticKeys(obj, group = '', out = new Set()) {
	if (!obj || typeof obj !== 'object') return out;
	if (obj.$type === 'color') return out;
	for (const [k, v] of Object.entries(obj)) {
		if (k.startsWith('$')) continue;
		if (v && typeof v === 'object' && v.$type === 'color') {
			out.add(JSON.stringify([group, k]));
		} else if (v && typeof v === 'object') {
			// First level under color is group name; next level keys are primitive keys
			const nextGroup = group || k;
			collectSemanticKeys(v, nextGroup, out);
		}
	}
	return out;
}

/** Semantic variable name for Figma alias: color/<group>/<key> */
function semanticName(group, key) {
	return `color/${group}/${key}`;
}

/** Parse a full path "group/key" (e.g. "default/neutral/1000") into { group, key }. */
function parsePath(path) {
	if (!path || typeof path !== 'string') return null;
	const idx = path.indexOf('/');
	if (idx === -1) return null;
	return { group: path.slice(0, idx), key: path.slice(idx + 1) };
}

/** Build a ctx token that aliases to a semantic variable. */
function ctxTokenAlias(semanticVariableName, ctxKey) {
	return {
		$type: 'color',
		$value: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
		$extensions: {
			'com.figma.scopes': getScopesForCtxKey(ctxKey),
			'com.figma.isOverride': true,
			'com.figma.aliasData': {
				targetVariableName: semanticVariableName,
				targetVariableSetId: SEMANTIC_SET_ID,
				targetVariableSetName: SEMANTIC_SET_NAME,
			},
		},
	};
}

/** Token that references another ctx variable (e.g. {ctx-text}). */
function ctxTokenRef(ref, ctxKey) {
	return {
		$type: 'color',
		$value: ref,
		$extensions: {
			'com.figma.scopes': getScopesForCtxKey(ctxKey),
			'com.figma.isOverride': true,
		},
	};
}

/** Shadow: alias to primitive neutral-alpha/500A. */
function shadowToken(primitivePath, ctxKey = 'ctx-shadow') {
	return {
		$type: 'color',
		$value: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
		$extensions: {
			'com.figma.scopes': getScopesForCtxKey(ctxKey),
			'com.figma.isOverride': true,
			'com.figma.aliasData': {
				targetVariableName: primitivePath,
				targetVariableSetId: PRIMITIVE_SET_ID,
				targetVariableSetName: PRIMITIVE_SET_NAME,
			},
		},
	};
}

/** Replace {{hue}} in key (or object values) with actual hue. */
function resolveKey(key, hue) {
	if (key == null) return key;
	if (typeof key !== 'string') return key;
	return hue ? key.replace(/\{\{hue\}\}/g, hue) : key;
}

/** Shallow merge: base + overrides (overrides win). */
function mergeKeys(base, overrides) {
	if (!overrides || typeof overrides !== 'object') return base;
	return { ...base, ...overrides };
}

/**
 * Expand context-rules.config.json into a flat list of { modeName, dir, group, keys }.
 * Applies exceptions per mode (override group or any key).
 */
function expandContextsFromRules(config) {
	const contexts = [];
	const g = config.global || {};
	const neutral = config.neutral || {};
	const brand = config.brand || {};
	const accent = config.accent || {};
	const severity = config.severity || {};

	const keyFields = ['text', 'textBold', 'textSubtle', 'icon', 'bg', 'bgHover', 'bgPressed', 'border', 'borderBold'];

	// Neutral: each mode has full paths (group/key); exceptions override any key
	for (const mode of neutral.modes || []) {
		const modeName = mode.modeName;
		const baseKeys = {
			text: mode.text,
			textBold: mode.textBold,
			textSubtle: mode.textSubtle,
			icon: mode.icon,
			bg: mode.bg,
			bgHover: mode.bgHover,
			bgPressed: mode.bgPressed,
			border: mode.border,
			borderBold: mode.borderBold,
		};
		const except = (neutral.exceptions || {})[modeName] || {};
		const keys = mergeKeys(baseKeys, except);
		contexts.push({ modeName, dir: neutral.dir || 'bcc_context', keys });
	}

	// Brand: levels × rules[level]; exceptions per modeName
	for (const { level, modeName } of brand.levels || []) {
		const rule = (brand.rules || {})[level] || {};
		const except = (brand.exceptions || {})[modeName] || {};
		const keys = mergeKeys(rule, except);
		contexts.push({ modeName, dir: brand.dir || 'bcc_context', keys });
	}

	// Accent: levels × hues; rules[level] with {{hue}} resolved; exceptions per modeName
	for (const levelSpec of accent.levels || []) {
		const level = levelSpec.level;
		const rule = (accent.rules || {})[level] || {};
		for (const hue of accent.hues || []) {
			const modeName = `accent-${hue}-${level}`;
			const except = (accent.exceptions || {})[modeName] || {};
			const resolvedRule = {};
			for (const f of keyFields) if (rule[f] != null) resolvedRule[f] = resolveKey(rule[f], hue);
			const keys = mergeKeys(resolvedRule, except);
			contexts.push({ modeName, dir: levelSpec.dir || 'bcc_accent_subtle', keys });
		}
	}

	// Severity: modes × variants; rules[variant] with {{hue}} resolved; exceptions per name or modeName
	for (const sev of severity.modes || []) {
		const name = sev.name;
		const hue = sev.hue;
		for (const variant of severity.variants || ['subtlest', 'bolder']) {
			const modeName = variant === 'default' ? name : `${name}-${variant}`;
			const rule = (severity.rules || {})[variant] || {};
			const except = (severity.exceptions || {})[modeName] || (severity.exceptions || {})[name] || {};
			const resolvedRule = {};
			for (const f of keyFields) if (rule[f] != null) resolvedRule[f] = resolveKey(rule[f], hue);
			const keys = mergeKeys(resolvedRule, except);
			contexts.push({ modeName, dir: severity.dir || 'bcc_severity', keys });
		}
	}

	return contexts;
}

/** Build full ctx block. Each key value is a full path "group/key" (e.g. "default/neutral/1000"). */
function buildCtxBlock(keys, semanticKeysSet, shadowPrimitive) {
	const has = (g, k) => semanticKeysSet.has(JSON.stringify([g, k]));
	const sem = (path, ctxKey) => {
		const p = parsePath(path);
		if (!p || !has(p.group, p.key)) return null;
		return ctxTokenAlias(semanticName(p.group, p.key), ctxKey);
	};

	const text = sem(keys.text, 'ctx-text');
	const textBold = sem(keys.textBold, 'ctx-text-bold');
	const textSubtle = sem(keys.textSubtle, 'ctx-text-subtle');
	const icon = sem(keys.icon, 'ctx-icon');
	const bg = sem(keys.bg, 'ctx-background');
	const bgHover = sem(keys.bgHover, 'ctx-background-hover');
	const bgPressed = sem(keys.bgPressed, 'ctx-background-pressed');
	const border = sem(keys.border, 'ctx-border');
	const borderBold = sem(keys.borderBold, 'ctx-border-bold');

	return {
		'ctx-text': text ?? textBold ?? ctxTokenAlias(semanticName('default', 'neutral/1000'), 'ctx-text'),
		'ctx-text-bold': textBold ?? text ?? ctxTokenAlias(semanticName('default', 'neutral/1100'), 'ctx-text-bold'),
		'ctx-text-subtle': textSubtle ?? text ?? ctxTokenAlias(semanticName('default', 'neutral/900'), 'ctx-text-subtle'),
		'ctx-icon': icon ?? text ?? ctxTokenAlias(semanticName('secondary', 'neutral/1100'), 'ctx-icon'),
		'ctx-text-hover': ctxTokenRef('{ctx-text}', 'ctx-text-hover'),
		'ctx-text-pressed': ctxTokenRef('{ctx-text}', 'ctx-text-pressed'),
		'ctx-background': bg ?? ctxTokenAlias(semanticName('default', 'neutral/0'), 'ctx-background'),
		'ctx-background-hover': bgHover ?? ctxTokenRef('{ctx-background}', 'ctx-background-hover'),
		'ctx-background-pressed': bgPressed ?? ctxTokenRef('{ctx-background}', 'ctx-background-pressed'),
		'ctx-border': border ?? ctxTokenAlias(semanticName('default', 'neutral/700'), 'ctx-border'),
		'ctx-border-bold': borderBold ?? border ?? ctxTokenAlias(semanticName('default', 'neutral/800'), 'ctx-border-bold'),
		'ctx-border-hover': ctxTokenRef('{ctx-border}', 'ctx-border-hover'),
		'ctx-border-pressed': ctxTokenRef('{ctx-border}', 'ctx-border-pressed'),
		'ctx-shadow': shadowToken(shadowPrimitive),
		'ctx-gradient': ctxTokenRef('{ctx-background-hover}', 'ctx-gradient'),
		'ctx-gradient-hover': ctxTokenRef('{ctx-background-pressed}', 'ctx-gradient-hover'),
		'ctx-gradient-pressed': ctxTokenRef('{ctx-background-pressed}', 'ctx-gradient-pressed'),
	};
}

function main() {
	if (!existsSync(RULES_CONFIG_PATH)) {
		throw new Error(`Config not found: ${RULES_CONFIG_PATH}`);
	}
	const configRaw = readFileSync(RULES_CONFIG_PATH, 'utf8');
	const config = JSON.parse(configRaw);

	const global = config.global || config;
	const semanticSource = global.semanticSource || config.semanticSource;
	const outputBaseDir = global.outputBaseDir || config.outputBaseDir;
	const shadowPrimitive = global.shadowPrimitive || config.shadowPrimitive || 'color/neutral-alpha/500A';

	const semanticPath = join(ROOT, semanticSource);
	if (!existsSync(semanticPath)) {
		throw new Error(`Semantic file not found: ${semanticPath}. Run restructure-semantic-primitives.mjs first.`);
	}
	const semanticRaw = readFileSync(semanticPath, 'utf8');
	const semanticJson = JSON.parse(semanticRaw);
	const colorNode = semanticJson.color || semanticJson;
	const semanticKeysSet = collectSemanticKeys(colorNode);
	const semanticKeysByGroup = new Map();
	for (const entry of semanticKeysSet) {
		const [g, k] = JSON.parse(entry);
		if (!semanticKeysByGroup.has(g)) semanticKeysByGroup.set(g, new Set());
		semanticKeysByGroup.get(g).add(k);
	}
	const semanticKeysSetNested = new Set();
	for (const [group, keys] of semanticKeysByGroup) {
		for (const k of keys) semanticKeysSetNested.add(JSON.stringify([group, k]));
	}

	const outputBase = join(ROOT, outputBaseDir);
	const contexts = expandContextsFromRules(config);

	for (const ctx of contexts) {
		const { modeName, dir: subdir, keys } = ctx;
		const ctxBlock = buildCtxBlock(keys || {}, semanticKeysSetNested, shadowPrimitive);
		ctxBlock['$extensions'] = { 'com.figma.modeName': modeName };
		const safeName = modeName.replace(/\//g, '-');
		const outDir = join(outputBase, subdir);
		mkdirSync(outDir, { recursive: true });
		const filePath = join(outDir, `${safeName}.tokens.json`);
		writeFileSync(filePath, JSON.stringify(ctxBlock, null, 2), 'utf8');
		console.log('Wrote', filePath);
	}

	console.log(`Generated ${contexts.length} context mode files.`);
}

main();
