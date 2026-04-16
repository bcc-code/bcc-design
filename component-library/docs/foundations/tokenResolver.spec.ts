/// <reference types="node" />
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { createRequire } from 'module';

/**
 * Verifies that all tokens referenced across foundation docs resolve to actual
 * values from @bcc-code/design-tokens. If a token is renamed or removed upstream,
 * these tests will fail — preventing stale "unresolved" values in the docs.
 *
 * Uses direct CSS parsing instead of the tokenResolver module to avoid
 * Vite-specific `?raw` import issues in the test environment.
 */

const require = createRequire(import.meta.url);
const tokenCss = readFileSync(require.resolve('@bcc-code/design-tokens/css'), 'utf8');

function parseVars(block: string): Record<string, string> {
	const vars: Record<string, string> = {};
	const clean = block.replace(/\/\*[\s\S]*?\*\//g, '');
	const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
	let m: RegExpExecArray | null;
	while ((m = re.exec(clean))) vars[m[1].trim()] = m[2].trim();
	return vars;
}

function resolveVar(varName: string, vars: Record<string, string>, seen = new Set<string>()): string | undefined {
	if (seen.has(varName)) return undefined;
	const val = vars[varName];
	if (!val) return undefined;
	const ref = val.match(/^var\(\s*(--[a-z0-9-]+)\s*(?:,\s*[^)]+)?\)$/i);
	if (!ref) return val;
	seen.add(varName);
	return resolveVar(ref[1], vars, seen) || val;
}

const rootBlock = tokenCss.match(/:root\s*\{([\s\S]*?)\}/)![1];
const lightVars = parseVars(rootBlock);

function resolve(token: string): string {
	const cssVar = '--' + token.replace(/\./g, '-');
	return resolveVar(cssVar, lightVars) || 'UNRESOLVED';
}

// ── Primitive colors ────────────────────────────────────

const saturatedHues = ['blue', 'teal', 'green', 'brown', 'yellow', 'orange', 'red', 'magenta', 'purple', 'bcc'];
const saturatedSteps = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const neutralSteps = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
const alphaSteps = ['100-a', '200-a', '300-a', '400-a', '500-a'];

describe('primitive colors', () => {
	saturatedHues.forEach(hue => {
		it(`resolves all color.${hue} steps`, () => {
			saturatedSteps.forEach(step => {
				const val = resolve(`color.${hue}.${step}`);
				expect(val, `color.${hue}.${step}`).not.toBe('UNRESOLVED');
			});
		});
	});

	it('resolves all color.neutral steps', () => {
		neutralSteps.forEach(step => {
			expect(resolve(`color.neutral.${step}`), `color.neutral.${step}`).not.toBe('UNRESOLVED');
			expect(resolve(`color.dark-neutral.${step}`), `color.dark-neutral.${step}`).not.toBe('UNRESOLVED');
		});
	});

	it('resolves all alpha steps', () => {
		alphaSteps.forEach(step => {
			expect(resolve(`color.neutral-alpha.${step}`), `neutral-alpha.${step}`).not.toBe('UNRESOLVED');
			expect(resolve(`color.dark-neutral-alpha.${step}`), `dark-neutral-alpha.${step}`).not.toBe('UNRESOLVED');
		});
	});
});

// ── Spacing ─────────────────────────────────────────────

describe('spacing', () => {
	it('resolves all space tokens', () => {
		[0, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000].forEach(step => {
			expect(resolve(`space.${step}`), `space.${step}`).not.toBe('UNRESOLVED');
		});
	});
});

// ── Icon sizes ──────────────────────────────────────────

describe('icon sizes', () => {
	it('resolves all icon size tokens', () => {
		['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
			expect(resolve(`icon.size.${size}`), `icon.size.${size}`).not.toBe('UNRESOLVED');
		});
	});
});

// ── Border ──────────────────────────────────────────────

describe('border', () => {
	it('resolves border-radius tokens', () => {
		['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'].forEach(size => {
			expect(resolve(`border-radius.${size}`), `border-radius.${size}`).not.toBe('UNRESOLVED');
		});
	});

	it('resolves border-width tokens', () => {
		[0, 1, 2].forEach(w => {
			expect(resolve(`border-width.${w}`), `border-width.${w}`).not.toBe('UNRESOLVED');
		});
	});
});

// ── Typography ──────────────────────────────────────────

describe('typography', () => {
	it('resolves font-size tokens', () => {
		['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].forEach(size => {
			expect(resolve(`font-size.${size}`), `font-size.${size}`).not.toBe('UNRESOLVED');
		});
	});

	it('resolves line-height tokens', () => {
		['sm', 'md', 'lg', 'xl', '2xl', '3xl', '5xl', '6xl', '7xl'].forEach(size => {
			expect(resolve(`line-height.${size}`), `line-height.${size}`).not.toBe('UNRESOLVED');
		});
	});

	it('resolves font-weight tokens', () => {
		['regular', 'medium', 'semibold', 'bold'].forEach(w => {
			expect(resolve(`font-weight.${w}`), `font-weight.${w}`).not.toBe('UNRESOLVED');
		});
	});
});

// ── Semantic colors (sample) ────────────────────────────

describe('semantic colors', () => {
	it('resolves key semantic tokens', () => {
		[
			'color.text.default',
			'color.text.subtle',
			'color.text.subtlest',
			'color.text.brand.default',
			'color.icon.default',
			'color.border.default',
			'color.border.brand',
			'color.elevation.surface.default',
			'color.background.brand.bolder.default',
		].forEach(token => {
			expect(resolve(token), token).not.toBe('UNRESOLVED');
		});
	});
});
