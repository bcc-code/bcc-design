#!/usr/bin/env node
/**
 * Generates Tailwind-compatible CSS for bcc_semantic tokens:
 * - light.tokens.json → :root (light mode)
 * - dark.tokens.json → .dark (dark mode)
 * Resolves semantic aliasData to primitive hex values from primitive.tokens.json.
 *
 * Output: src/styles/semantic.css
 * Run: pnpm run generate:semantic-css (or after generate:semantic)
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LIGHT_PATH = join(ROOT, 'src/figma-modes/bcc_semantic/light.tokens.json');
const DARK_PATH = join(ROOT, 'src/figma-modes/bcc_semantic/dark.tokens.json');
const PRIMITIVE_PATH = join(ROOT, 'src/figma-modes/primitive.tokens.json');
const OUT_PATH = join(ROOT, 'src/styles/semantic.css');

/** Path in token tree to CSS variable name: color/default/neutral/1000 → --color-default-neutral-1000 */
function toCssVarName(path) {
	return '--' + path.replace(/\//g, '-');
}

/** Recursively collect color paths and their raw value (hex or ref string) from primitive tree. */
function collectPrimitiveValues(obj, prefix = '', out = new Map()) {
	if (!obj || typeof obj !== 'object') return out;
	if (obj.$type === 'color') {
		const path = prefix.replace(/^color\./, 'color/').replace(/\./g, '/');
		const v = obj.$value;
		if (v && typeof v === 'object' && typeof v.hex === 'string') {
			out.set(path, v.hex);
		} else if (typeof v === 'string' && /^\{[^}]+\}$/.test(v)) {
			out.set(path, v);
		}
		return out;
	}
	for (const [k, v] of Object.entries(obj)) {
		if (k.startsWith('$')) continue;
		collectPrimitiveValues(v, prefix ? `${prefix}.${k}` : k, out);
	}
	return out;
}

/** Resolve refs like "{color.bcc.100}" to path "color/bcc/100" and look up hex. */
function refToPath(ref) {
	const m = ref.match(/^\{(.+)\}$/);
	if (!m) return null;
	return m[1].trim().replace(/\./g, '/');
}

/** Resolve all primitive refs; mutates map so refs become hex where target exists. */
function resolvePrimitiveRefs(map, maxRounds = 10) {
	for (let round = 0; round < maxRounds; round++) {
		let changed = false;
		for (const [path, value] of map.entries()) {
			if (typeof value !== 'string' || !value.startsWith('{')) continue;
			const targetPath = refToPath(value);
			if (!targetPath) continue;
			const resolved = map.get(targetPath);
			if (typeof resolved === 'string' && !resolved.startsWith('{')) {
				map.set(path, resolved);
				changed = true;
			}
		}
		if (!changed) break;
	}
	return map;
}

/** Walk semantic color tree; return Map(semanticPath, primitivePath). */
function collectSemanticAliases(obj, prefix = '', out = new Map()) {
	if (!obj || typeof obj !== 'object') return out;
	if (obj.$type === 'color') {
		const alias = obj.$extensions?.['com.figma.aliasData']?.targetVariableName;
		if (alias) {
			const path = prefix.replace(/^color\./, 'color/').replace(/\./g, '/');
			out.set(path, alias);
		}
		return out;
	}
	for (const [k, v] of Object.entries(obj)) {
		if (k.startsWith('$')) continue;
		collectSemanticAliases(v, prefix ? `${prefix}.${k}` : k, out);
	}
	return out;
}

/** Resolve semantic path -> hex using alias map and primitive hex map. */
function resolveSemanticToHex(aliasMap, primitiveHexMap) {
	const result = new Map();
	for (const [semanticPath, primitivePath] of aliasMap.entries()) {
		const hex = primitiveHexMap.get(primitivePath);
		if (hex && typeof hex === 'string' && !hex.startsWith('{')) {
			result.set(semanticPath, hex);
		}
	}
	return result;
}

/** Emit CSS block (:root or .dark) with variable lines. */
function emitCssBlock(selector, pathToHex) {
	const lines = [];
	for (const [path, hex] of [...pathToHex.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
		lines.push(`  ${toCssVarName(path)}: ${hex};`);
	}
	return `${selector} {\n${lines.join('\n')}\n}\n`;
}

function main() {
	const primitiveRaw = readFileSync(PRIMITIVE_PATH, 'utf8');
	const primitiveJson = JSON.parse(primitiveRaw);
	const colorNode = primitiveJson.color;
	if (!colorNode) throw new Error(`No "color" in ${PRIMITIVE_PATH}`);

	const primitiveValues = collectPrimitiveValues(colorNode, 'color', new Map());
	const primitiveHex = resolvePrimitiveRefs(primitiveValues);

	const lightRaw = readFileSync(LIGHT_PATH, 'utf8');
	const lightJson = JSON.parse(lightRaw);
	const darkRaw = readFileSync(DARK_PATH, 'utf8');
	const darkJson = JSON.parse(darkRaw);

	const lightAliases = collectSemanticAliases(lightJson.color || lightJson, 'color', new Map());
	const darkAliases = collectSemanticAliases(darkJson.color || darkJson, 'color', new Map());

	const lightHex = resolveSemanticToHex(lightAliases, primitiveHex);
	const darkHex = resolveSemanticToHex(darkAliases, primitiveHex);

	const out = [
		'/* Auto-generated from bcc_semantic tokens. Do not edit. Run: pnpm run generate:semantic-css */',
		'/* Light mode from light.tokens.json; dark mode from dark.tokens.json */',
		'',
		emitCssBlock(':root', lightHex),
		emitCssBlock('.dark', darkHex),
	].join('\n');

	writeFileSync(OUT_PATH, out, 'utf8');
	console.log('Wrote', OUT_PATH, `(${lightHex.size} light, ${darkHex.size} dark variables)`);
}

main();
