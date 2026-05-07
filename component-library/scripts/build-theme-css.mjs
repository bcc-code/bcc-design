#!/usr/bin/env node
/**
 * Builds dist/theme.css for consumer apps. Inlines all local CSS so the output
 * has only external @import statements (tailwindcss, @bcc-code/...) and ends
 * with @import './library-utilities.css' so the library's compiled utility
 * classes are automatically included for consumers running their own Tailwind.
 *
 * Consumers import this file and use @tailwindcss/vite so Tailwind runs in
 * their build and exposes design tokens to their own classes, while the
 * imported library-utilities.css supplies the utility classes used inside the
 * library's compiled components (which Tailwind in the consumer's build cannot
 * discover by default because the library ships as compiled JS).
 *
 * Expected to run AFTER `tailwindcss` CLI has produced dist/library-utilities.css
 * from src/library-utilities-input.css (see package.json `build:vite`).
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'src');
const DIST = join(__dirname, '..', 'dist');
const OUT = join(DIST, 'theme.css');
const LIBRARY_UTILITIES = join(DIST, 'library-utilities.css');
const ARCHIVO_FONT_SRC = join(SRC, 'styles', 'archivo-font');
const ARCHIVO_FONT_DIST = join(DIST, 'archivo-font');

function resolveImport(fromPath, importPath) {
	if (!importPath.startsWith('./') && !importPath.startsWith('../')) return null;
	const fromDir = dirname(fromPath);
	return join(fromDir, importPath);
}

function processFile(filePath, seen = new Set()) {
	if (seen.has(filePath)) return '';
	seen.add(filePath);
	const dir = dirname(filePath);
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

	if (!existsSync(LIBRARY_UTILITIES)) {
		console.warn(
			`warning: ${LIBRARY_UTILITIES} not found. ` +
				'Run `pnpm run build:library-utilities` (or the full `pnpm run build:vite`) first ' +
				'so theme.css can @import the compiled library utilities.'
		);
	}

	output +=
		"\n/* Library utility classes, compiled from the library's own components.\n" +
		'   Contains only the utility class rules used inside the library — no preflight, no @theme\n' +
		'   variables, no design tokens, since theme.css already provides those. */\n' +
		"@import './library-utilities.css';\n";

	writeFileSync(OUT, output.trimEnd() + '\n');
	console.log('Wrote dist/theme.css');
}

main();
