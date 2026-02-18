#!/usr/bin/env node
/**
 * Builds dist/theme.css for consumer apps. Inlines all local CSS so the output
 * has no relative imports; only @import "tailwindcss" and @import "@bcc-code/...".
 * Consumers import this file and use @tailwindcss/vite so Tailwind runs in their
 * build and they get full utility classes and tree-shaking.
 */

import { readFileSync, writeFileSync, mkdirSync, cpSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'src');
const DIST = join(__dirname, '..', 'dist');
const OUT = join(DIST, 'theme.css');
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
	writeFileSync(OUT, output.trimEnd() + '\n');
	console.log('Wrote dist/theme.css');

	// Copy Archivo font files to dist so theme.css and consumers can load them
	cpSync(ARCHIVO_FONT_SRC, ARCHIVO_FONT_DIST, { recursive: true });
	console.log('Copied archivo-font to dist/archivo-font');
}

main();
