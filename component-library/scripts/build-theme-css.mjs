#!/usr/bin/env node
/**
 * Builds dist/theme.css for consumer apps. Inlines all local CSS so the output
 * has only external @import statements (tailwindcss, @bcc-code/...) and ends
 * with @imports for the two pre-compiled siblings:
 *   - dist/sfc-styles.css      (Vite-extracted SFC <style> blocks)
 *   - dist/library-utilities.css (Tailwind utility classes used in the library)
 *
 * Consumers import theme.css and use @tailwindcss/vite so Tailwind runs in
 * their build and exposes design tokens / @utility / @theme definitions to
 * their own templates, while the two imported siblings supply the rules baked
 * into the library's compiled components (which the consumer's Tailwind cannot
 * discover by default because the library ships as compiled JS).
 *
 * Expected to run AFTER:
 *   - `vite build` (produces dist/index.css for Option 2 / style.css)
 *   - `vite build --config vite.config.sfc-styles.ts` (produces dist/sfc-styles.css)
 *   - `tailwindcss` CLI on src/library-utilities-input.css (produces dist/library-utilities.css)
 * See package.json `build:vite`.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');
const OUT = join(DIST, 'theme.css');
const SFC_STYLES = join(DIST, 'sfc-styles.css');
const LIBRARY_UTILITIES = join(DIST, 'library-utilities.css');

function resolveImport(fromPath, importPath) {
	if (!importPath.startsWith('./') && !importPath.startsWith('../')) return null;
	const fromDir = dirname(fromPath);
	return join(fromDir, importPath);
}

function processFile(filePath, seen = new Set()) {
	if (seen.has(filePath)) return '';
	seen.add(filePath);
	const content = readFileSync(filePath, 'utf8');
	let out = '';
	for (const line of content.split(/\r?\n/)) {
		const importMatch = line.match(/^\s*@import\s+['"]([^'"]+)['"]\s*;/);
		if (importMatch) {
			const spec = importMatch[1];
			const resolved = resolveImport(filePath, spec);
			if (resolved) {
				out += `\n/* from ${spec} */\n`;
				out += processFile(resolved, seen);
				out += '\n';
				continue;
			}
			// External: keep as-is (tailwindcss, @bcc-code/...)
			out += line + '\n';
			continue;
		}
		out += line + '\n';
	}
	return out;
}

function main() {
	const mainPath = join(SRC, 'style.css');
	const content = readFileSync(mainPath, 'utf8');
	const seen = new Set();
	let output = '';
	for (const line of content.split(/\r?\n/)) {
		const importMatch = line.match(/^\s*@import\s+['"]([^'"]+)['"]\s*;/);
		if (importMatch) {
			const spec = importMatch[1];
			const resolved = resolveImport(mainPath, spec);
			if (resolved) {
				output += `\n/* === ${spec} === */\n`;
				output += processFile(resolved, seen);
				output += '\n';
				continue;
			}
			output += line + '\n';
			continue;
		}
		output += line + '\n';
	}

	mkdirSync(dirname(OUT), { recursive: true });

	if (!existsSync(SFC_STYLES)) {
		console.warn(
			`warning: ${SFC_STYLES} not found. ` +
				'Run `pnpm run build:sfc-styles` (or the full `pnpm run build:vite`) first ' +
				'so theme.css can @import the SFC <style> blocks.'
		);
	}
	if (!existsSync(LIBRARY_UTILITIES)) {
		console.warn(
			`warning: ${LIBRARY_UTILITIES} not found. ` +
				'Run `pnpm run build:library-utilities` (or the full `pnpm run build:vite`) first ' +
				'so theme.css can @import the compiled library utilities.'
		);
	}

	output += '\n/* SFC <style> blocks extracted all .vue components */\n' + "@import './sfc-styles.css';\n";

	output +=
		"\n/* Library utility classes, compiled from the library's own components.\n" +
		'   Contains only the utility class rules used inside the library — no preflight,\n' +
		'   no @theme variables, no design tokens, since theme.css already provides those. */\n' +
		"@import './library-utilities.css';\n";

	writeFileSync(OUT, output.trimEnd() + '\n');
	console.warn('Wrote dist/theme.css');
}

main();
