#!/usr/bin/env node
/**
 * Generates bcc_semantic light.tokens.json and dark.tokens.json from a config file.
 * Config defines groups and light→dark primitive mapping rules. Only primitive
 * variables that exist in primitive.tokens.json are emitted, so semantic tokens
 * always match the correct Figma variables.
 *
 * Usage: node scripts/restructure-semantic-primitives.mjs
 * Config: scripts/semantic-primitive-groups.config.json
 * Primitives: src/figma-modes/primitive.tokens.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SEMANTIC_DIR = join(ROOT, 'src/figma-modes/bcc_semantic');
const LIGHT_PATH = join(SEMANTIC_DIR, 'light.tokens.json');
const DARK_PATH = join(SEMANTIC_DIR, 'dark.tokens.json');
const CONFIG_PATH = join(__dirname, 'semantic-primitive-groups.config.json');
const PRIMITIVE_PATH = join(ROOT, 'src/figma-modes/primitive.tokens.json');

const PRIMITIVE_SET_ID = 'VariableCollectionId:417c7ac5537f108f00dd75d03fdef006a1a47c4a/-1:-1';
const PRIMITIVE_SET_NAME = 'bcc/primitive';

/** Check if node is a color token. */
function isColorToken(node) {
	return node && typeof node === 'object' && node.$type === 'color';
}

/**
 * Collect all color primitive paths from primitive.tokens.json.
 * Returns a Set of "color/scale/level" strings (e.g. "color/neutral/0", "color/neutral-alpha/400A").
 */
function collectPrimitiveColorPaths(obj, prefix = '', out = new Set()) {
	if (!obj || typeof obj !== 'object') return out;
	if (isColorToken(obj)) {
		out.add(prefix.replace(/^color\./, 'color/').replace(/\./g, '/'));
		return out;
	}
	for (const [k, v] of Object.entries(obj)) {
		if (k.startsWith('$')) continue;
		collectPrimitiveColorPaths(v, prefix ? `${prefix}.${k}` : k, out);
	}
	return out;
}

/** Build a token that aliases to the given primitive variable name. */
function aliasToken(primitiveName) {
	const name = primitiveName.startsWith('color/') ? primitiveName : `color/${primitiveName}`;
	return {
		$type: 'color',
		$value: { colorSpace: 'srgb', components: [0, 0, 0], alpha: 1, hex: '#000000' },
		$extensions: {
			'com.figma.scopes': ['ALL_SCOPES'],
			'com.figma.isOverride': true,
			'com.figma.aliasData': {
				targetVariableName: name,
				targetVariableSetId: PRIMITIVE_SET_ID,
				targetVariableSetName: PRIMITIVE_SET_NAME,
			},
		},
	};
}

/** Recursively set a value at a dotted path (e.g. "color.default.neutral/1000") into obj. */
function setByPath(obj, path, value) {
	const parts = path.split('.');
	let cur = obj;
	for (let i = 0; i < parts.length - 1; i++) {
		const p = parts[i];
		if (cur[p] == null) cur[p] = {};
		cur = cur[p];
	}
	cur[parts[parts.length - 1]] = value;
}

/**
 * Expand a group config into a list of { key, lightPrim, darkPrim }.
 * Only includes pairs where both lightPrim and darkPrim exist in primitives.
 */
function expandGroup(group, accentHues, primitives) {
	const pairs = [];
	const path = group.path;
	const colors = group.colors || {};

	function add(key, lightPrim, darkPrim) {
		if (primitives.has(lightPrim) && primitives.has(darkPrim)) {
			pairs.push({ key, lightPrim, darkPrim });
		}
	}

	// brand: scale name is "bcc"
	if (colors.brand) {
		for (const [lightLvl, darkLvl] of colors.brand) {
			add(`bcc/${lightLvl}`, `color/bcc/${lightLvl}`, `color/bcc/${darkLvl}`);
		}
	}

	// accent: one scale per hue (only hues that exist in primitives)
	if (colors.accent && accentHues && accentHues.length) {
		for (const hue of accentHues) {
			for (const [lightLvl, darkLvl] of colors.accent) {
				add(`${hue}/${lightLvl}`, `color/${hue}/${lightLvl}`, `color/${hue}/${darkLvl}`);
			}
		}
	}

	// neutral: light/dark prefix + levels (numeric)
	if (colors.neutral) {
		const { light, dark, levels } = colors.neutral;
		for (const [lightLvl, darkLvl] of levels) {
			add(`${light}/${lightLvl}`, `color/${light}/${lightLvl}`, `color/${dark}/${darkLvl}`);
		}
	}

	// alpha: light/dark prefix + levels (string, e.g. "400A")
	if (colors.alpha) {
		const { light, dark, levels } = colors.alpha;
		for (const [lightLvl, darkLvl] of levels) {
			add(`${light}/${lightLvl}`, `color/${light}/${lightLvl}`, `color/${dark}/${darkLvl}`);
		}
	}

	// default group: add transparent (same in light and dark)
	if (path === 'default' && primitives.has('color/transparent')) {
		pairs.push({
			key: 'transparent',
			lightPrim: 'color/transparent',
			darkPrim: 'color/transparent',
		});
	}

	return pairs;
}

function main() {
	const primitiveRaw = readFileSync(PRIMITIVE_PATH, 'utf8');
	const primitiveJson = JSON.parse(primitiveRaw);
	const colorNode = primitiveJson.color;
	if (!colorNode) {
		throw new Error(`No "color" key in ${PRIMITIVE_PATH}`);
	}
	const primitives = collectPrimitiveColorPaths(colorNode, 'color', new Set());
	console.log(`Primitives: ${primitives.size} color variables`);

	const configRaw = readFileSync(CONFIG_PATH, 'utf8');
	const config = JSON.parse(configRaw);
	const { groups = [], accentHues = [] } = config;

	const lightOut = { color: {} };
	const darkOut = { color: {} };

	for (const group of groups) {
		const path = group.path;
		const pairs = expandGroup(group, accentHues, primitives);

		for (const { key, lightPrim, darkPrim } of pairs) {
			setByPath(lightOut, `color.${path}.${key}`, aliasToken(lightPrim));
			setByPath(darkOut, `color.${path}.${key}`, aliasToken(darkPrim));
		}

		console.log(`Group "${path}": ${pairs.length} tokens`);
	}

	lightOut.$extensions = { 'com.figma.modeName': 'light' };
	darkOut.$extensions = { 'com.figma.modeName': 'dark' };

	writeFileSync(LIGHT_PATH, JSON.stringify(lightOut, null, 2), 'utf8');
	writeFileSync(DARK_PATH, JSON.stringify(darkOut, null, 2), 'utf8');

	console.log('Wrote', LIGHT_PATH);
	console.log('Wrote', DARK_PATH);
}

main();
