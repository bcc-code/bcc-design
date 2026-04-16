import tokenCss from '@bcc-code/design-tokens/css?raw';

type CssVarMap = Record<string, string>;

function stripCssComments(input: string): string {
	return input.replace(/\/\*[\s\S]*?\*\//g, '');
}

function extractBlock(css: string, selectorRegex: RegExp): string {
	const match = css.match(selectorRegex);
	return match ? match[1] : '';
}

function parseVars(block: string): CssVarMap {
	const vars: CssVarMap = {};
	const cleanBlock = stripCssComments(block);
	const varRegex = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
	let match = varRegex.exec(cleanBlock);
	while (match) {
		vars[match[1].trim()] = match[2].trim();
		match = varRegex.exec(cleanBlock);
	}
	return vars;
}

function resolveVar(varName: string, vars: CssVarMap, seen: Set<string> = new Set()): string | undefined {
	if (seen.has(varName)) {
		return undefined;
	}
	const value = vars[varName];
	if (!value) {
		return undefined;
	}
	const varRef = value.match(/^var\(\s*(--[a-z0-9-]+)\s*(?:,\s*[^)]+)?\)$/i);
	if (!varRef) {
		return value;
	}
	seen.add(varName);
	const resolved = resolveVar(varRef[1], vars, seen);
	seen.delete(varName);
	return resolved || value;
}

function tokenToCssVarName(token: string): string {
	if (!token.startsWith('color.')) {
		return '';
	}
	return '--color-' + token.replace('color.', '').replace(/\./g, '-');
}

function extractDarkVars(css: string): CssVarMap {
	const combinedPatterns: RegExp[] = [
		/\.dark\s*,\s*\[data-theme="dark"\]\s*\{([\s\S]*?)\}/,
		/\[data-theme="dark"\]\s*,\s*\.dark\s*\{([\s\S]*?)\}/,
	];
	for (const pattern of combinedPatterns) {
		const block = extractBlock(css, pattern);
		if (block) return parseVars(block);
	}
	const darkClassVars = parseVars(extractBlock(css, /(?<![-\w])\.dark\s*\{([\s\S]*?)\}/m));
	const darkAttrVars = parseVars(extractBlock(css, /(?<!,\s*)\[data-theme="dark"\]\s*\{([\s\S]*?)\}/));
	return { ...darkClassVars, ...darkAttrVars };
}

const rootBlock = extractBlock(tokenCss, /:root\s*\{([\s\S]*?)\}/);
const lightVars = parseVars(rootBlock);
const darkVars = { ...lightVars, ...extractDarkVars(tokenCss) };

export function resolveColorTokenValues(token: string): { lightHex: string; darkHex: string } {
	const cssVarName = tokenToCssVarName(token);
	if (!cssVarName) {
		return { lightHex: 'unresolved', darkHex: 'unresolved' };
	}
	const lightHex = resolveVar(cssVarName, lightVars) || 'unresolved';
	const darkHex = resolveVar(cssVarName, darkVars) || 'unresolved';

	if (lightHex === 'unresolved' || darkHex === 'unresolved') {
		console.warn(`Could not resolve token: ${token}`);
	}

	return { lightHex, darkHex };
}
