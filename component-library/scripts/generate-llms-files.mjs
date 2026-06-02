import { readFileSync } from 'node:fs';
import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { validateGeneratedOutputs } from './validate-llms-output.mjs';

const DEFAULT_BASE_URL = 'https://components.bcc.no';
const DEFAULT_OUTPUT_DIR = 'storybook-static';
const UTF8_BOM = '\uFEFF';
const EXCLUDED_DOCS_PATTERN =
	/(^|[/\\._-])(private|internal|secret|secrets|node_modules|dist|dist-types|dist-css|coverage|cache|\.cache|storybook-static)($|[/\\._-])/i;
const require = createRequire(import.meta.url);
let designTokenVars;

function normalizeBaseUrl(baseUrl) {
	return baseUrl.replace(/\/$/, '');
}

function trimDotSlash(filePath) {
	return filePath.replace(/^\.\//, '');
}

function docsRoute(id) {
	return `/docs/${id}`;
}

function markdownRoute(id) {
	return `${docsRoute(id)}.md`;
}

function docsUrl(baseUrl, id) {
	return `${baseUrl}${docsRoute(id)}`;
}

function markdownUrl(baseUrl, id) {
	return `${baseUrl}${markdownRoute(id)}`;
}

function storybookUrl(baseUrl, id) {
	return `${baseUrl}/?path=/docs/${id}`;
}

function titleToLabel(title) {
	return title.split('/').at(-1) ?? title;
}

function sectionForTitle(title) {
	return title.split('/').at(0) ?? 'Docs';
}

function sectionHeading(section) {
	if (section === 'Readme') return 'Start here';
	if (/(wrapped|custom|primevue)/i.test(section)) return `${section} components`;
	return section;
}

function sectionPriority(section) {
	const normalized = section.toLowerCase();
	if (normalized.includes('foundation')) return 0;
	if (normalized.includes('style')) return 1;
	if (normalized.includes('wrapped')) return 2;
	if (normalized.includes('custom')) return 3;
	if (normalized.includes('primevue')) return 4;
	return 10;
}

function isFoundationsOverview(page) {
	return page.section === 'Foundations' && page.label.toLowerCase() === 'overview';
}

function isStartHerePage(page) {
	return page.section === 'Readme' || page.section === 'AI Tools' || isFoundationsOverview(page);
}

function startHerePriority(page) {
	if (page.section === 'Readme') return 0;
	if (isFoundationsOverview(page)) return 1;
	if (page.section === 'AI Tools') return 2;
	return 10;
}

function llmsLabel(page) {
	if (page.section === 'AI Tools' && /llms\.txt/i.test(page.label)) return 'AI Tools';
	if (isFoundationsOverview(page)) return 'Foundations';
	if (page.section === 'Foundations' && page.label === 'Tokens') return 'Design Tokens';
	return page.label;
}

function compareEntries(left, right) {
	return left.order - right.order || left.title.localeCompare(right.title) || left.id.localeCompare(right.id);
}

function isPublicDocsEntry(entry) {
	if (entry.type !== 'docs') return false;

	const source = trimDotSlash(entry.importPath ?? '');
	const searchable = `${entry.id}\n${entry.title}\n${source}`;
	return !EXCLUDED_DOCS_PATTERN.test(searchable);
}

function groupBySection(pages) {
	const groups = new Map();

	for (const page of pages) {
		const section = page.section;
		const group = groups.get(section) ?? [];
		group.push(page);
		groups.set(section, group);
	}

	return Array.from(groups.entries()).sort(([left], [right]) => left.localeCompare(right));
}

function decodeEntities(value) {
	const namedEntities = {
		nbsp: ' ',
		ensp: ' ',
		emsp: ' ',
		thinsp: ' ',
		hairsp: ' ',
		zwnj: '',
		zwj: '',
		lrm: '',
		rlm: '',
		shy: '',
		amp: '&',
		lt: '<',
		gt: '>',
		quot: '"',
		apos: "'",
		'#39': "'",
		'#34': '"',
		copy: '©',
		reg: '®',
		trade: '™',
		euro: '€',
		pound: '£',
		yen: '¥',
		cent: '¢',
		deg: '°',
		plusmn: '±',
		times: '×',
		divide: '÷',
		middot: '·',
		bull: '•',
		sect: '§',
		para: '¶',
		numero: '№',
		frac14: '¼',
		frac12: '½',
		frac34: '¾',
		sup2: '²',
		sup3: '³',
		micro: 'µ',
		permil: '‰',
		rarr: '→',
		larr: '←',
		uarr: '↑',
		darr: '↓',
		harr: '↔',
		nearr: '↗',
		nwarr: '↖',
		searr: '↘',
		swarr: '↙',
		mdash: '—',
		ndash: '–',
		hellip: '…',
		ldquo: '“',
		rdquo: '”',
		lsquo: '‘',
		rsquo: '’',
		bdquo: '„',
		sbquo: '‚',
		lsaquo: '‹',
		rsaquo: '›',
		laquo: '«',
		raquo: '»',
	};

	return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
		const normalized = String(entity).toLowerCase();
		if (normalized.startsWith('#x')) {
			const codePoint = Number.parseInt(normalized.slice(2), 16);
			return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
		}

		if (normalized.startsWith('#')) {
			const codePoint = Number.parseInt(normalized.slice(1), 10);
			return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
		}

		return namedEntities[normalized] ?? match;
	});
}

function decodeJsUnicodeEscapes(value) {
	return value
		.replace(/\\u\{([0-9a-fA-F]+)\}/g, (match, hex) => {
			const codePoint = Number.parseInt(hex, 16);
			return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
		})
		.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
			const codePoint = Number.parseInt(hex, 16);
			return Number.isNaN(codePoint) ? match : String.fromCodePoint(codePoint);
		})
		.replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
			const codePoint = Number.parseInt(hex, 16);
			return Number.isNaN(codePoint) ? match : String.fromCharCode(codePoint);
		});
}

function stripDecorativeHtml(value) {
	return value.replace(
		/<span\b(?=[^>]*(?:class|className)=["'][^"']*\bmaterial-symbols-outlined\b[^"']*["'])[^>]*>[\s\S]*?<\/span>/gi,
		''
	);
}

function repeatedlyStrip(value, stripFn, maxPasses = 12) {
	let previous;
	let current = value;
	let pass = 0;

	do {
		previous = current;
		current = stripFn(current);
		pass += 1;
	} while (current !== previous && pass < maxPasses);

	return current;
}

function stripTagBlocks(value, tagName) {
	let current = String(value ?? '');
	const normalizedTag = String(tagName ?? '').toLowerCase();
	if (!normalizedTag) return current;

	let previous;
	do {
		previous = current;
		const lower = current.toLowerCase();
		let start = lower.indexOf(`<${normalizedTag}`);
		if (start === -1) continue;

		while (start !== -1) {
			const openTagEnd = lower.indexOf('>', start);
			if (openTagEnd === -1) {
				current = `${current.slice(0, start)} ${current.slice(start + 1)}`;
				break;
			}

			const closeTagStart = lower.indexOf(`</${normalizedTag}`, openTagEnd + 1);
			if (closeTagStart === -1) {
				current = `${current.slice(0, start)} ${current.slice(openTagEnd + 1)}`;
				break;
			}

			const closeTagEnd = lower.indexOf('>', closeTagStart);
			if (closeTagEnd === -1) {
				current = `${current.slice(0, start)} ${current.slice(closeTagStart + 2)}`;
				break;
			}

			current = `${current.slice(0, start)} ${current.slice(closeTagEnd + 1)}`;
			start = current.toLowerCase().indexOf(`<${normalizedTag}`);
		}
	} while (current !== previous);

	return current;
}

function stripDelimitedBlocks(value, startToken, endToken) {
	let current = String(value ?? '');
	if (!startToken || !endToken) return current;

	let previous;
	do {
		previous = current;
		let startIndex = current.indexOf(startToken);

		while (startIndex !== -1) {
			const endIndex = current.indexOf(endToken, startIndex + startToken.length);
			if (endIndex === -1) {
				current = `${current.slice(0, startIndex)} ${current.slice(startIndex + startToken.length)}`;
				break;
			}

			current = `${current.slice(0, startIndex)} ${current.slice(endIndex + endToken.length)}`;
			startIndex = current.indexOf(startToken);
		}
	} while (current !== previous);

	return current;
}

function stripHtmlTags(value, { preserveLineBreaks = false } = {}) {
	const blockTags =
		'article|aside|blockquote|dd|div|dl|dt|figcaption|figure|footer|form|h[1-6]|header|li|main|nav|ol|p|pre|section|table|tbody|td|tfoot|th|thead|tr|ul';
	const inlineOrBlockTags = preserveLineBreaks ? `${blockTags}|span` : blockTags;
	const breakPattern = new RegExp(`</?(?:${inlineOrBlockTags})\\b[^>]*>`, 'gi');
	const withoutScriptOrStyle = stripTagBlocks(stripTagBlocks(stripDecorativeHtml(value), 'script'), 'style');
	const withoutComments = stripDelimitedBlocks(stripDelimitedBlocks(withoutScriptOrStyle, '{/*', '*/}'), '<!--', '-->');

	return repeatedlyStrip(withoutComments, current => {
		return current
			.replace(/<br\s*\/?>/gi, '\n')
			.replace(breakPattern, '\n')
			.replace(/<\/?[A-Za-z][A-Za-z0-9:-]*(?:\s[^>]*)?\/?>/g, ' ')
			.replace(/[<>]/g, '');
	});
}

function normalizePlainTextWhitespace(value) {
	return value
		.replace(/\r\n?/g, '\n')
		.replace(/[ \t]+\n/g, '\n')
		.replace(/\n[ \t]+/g, '\n')
		.replace(/[ \t]{2,}/g, ' ')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function cleanInlineMarkdown(value) {
	const decoded = decodeEntities(decodeJsUnicodeEscapes(String(value ?? '')))
		.replace(/\{`([^`]+)`\}/g, '`$1`')
		.replace(/\{'([^']+)'\}/g, '$1')
		.replace(/\{"([^"]+)"\}/g, '$1')
		.replace(/\bctx-<([A-Za-z0-9_-]+)>/g, 'ctx-$1');
	const inlineCode = protectSegments(decoded, /`[^`\n]*`/g, 'INLINE_CODE');

	const stripped = normalizePlainTextWhitespace(stripHtmlTags(inlineCode.contents)).replace(/<|>/g, '').trim();
	return inlineCode.restore(stripped).trim();
}

function cleanInlineCode(value) {
	return decodeEntities(decodeJsUnicodeEscapes(String(value ?? '')))
		.replace(/\s+/g, ' ')
		.trim();
}

function htmlToPlainTextLines(html) {
	const text = normalizePlainTextWhitespace(
		stripHtmlTags(decodeEntities(String(html ?? '')), { preserveLineBreaks: true })
	);
	return text
		.split('\n')
		.map(line => line.trim())
		.filter(Boolean);
}

function renderMarkdownLink(attributes, label) {
	const href = attributeValue(attributes, 'href');
	const lines = htmlToPlainTextLines(label);
	const text = lines.join(' ');
	if (!href) return text;
	if (!text) return '';

	const normalizedHref = normalizeHref(href);
	const isBlockLink = lines.length > 1 || /<(?:div|p|section|article|h[1-6])\b/i.test(label);
	if (!isBlockLink) return `[${text}](${normalizedHref})`;

	const [title, ...details] = lines;
	const description = details.join(' ');
	return `\n- [${title}](${normalizedHref})${description ? `: ${description}` : ''}\n`;
}

function stripCssComments(input) {
	return input.replace(/\/\*[\s\S]*?\*\//g, '');
}

function extractCssBlock(css, selectorRegex) {
	const match = css.match(selectorRegex);
	return match ? match[1] : '';
}

function parseCssVars(block) {
	const vars = {};
	const cleanBlock = stripCssComments(block);
	const varRegex = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
	let match = varRegex.exec(cleanBlock);
	while (match) {
		vars[match[1].trim()] = match[2].trim();
		match = varRegex.exec(cleanBlock);
	}
	return vars;
}

function extractDarkCssVars(css) {
	const combinedPatterns = [
		/\.dark\s*,\s*\[data-theme="dark"\]\s*\{([\s\S]*?)\}/,
		/\[data-theme="dark"\]\s*,\s*\.dark\s*\{([\s\S]*?)\}/,
	];
	for (const pattern of combinedPatterns) {
		const block = extractCssBlock(css, pattern);
		if (block) return parseCssVars(block);
	}
	const darkClassVars = parseCssVars(extractCssBlock(css, /(?<![-\w])\.dark\s*\{([\s\S]*?)\}/m));
	const darkAttrVars = parseCssVars(extractCssBlock(css, /(?<!,\s*)\[data-theme="dark"\]\s*\{([\s\S]*?)\}/));
	return { ...darkClassVars, ...darkAttrVars };
}

function getDesignTokenVars() {
	if (designTokenVars) return designTokenVars;

	try {
		const tokenCss = readFileSync(require.resolve('@bcc-code/design-tokens/css'), 'utf8');
		const lightVars = parseCssVars(extractCssBlock(tokenCss, /:root\s*\{([\s\S]*?)\}/));
		designTokenVars = {
			light: lightVars,
			dark: { ...lightVars, ...extractDarkCssVars(tokenCss) },
		};
	} catch {
		designTokenVars = { light: {}, dark: {} };
	}

	return designTokenVars;
}

function resolveCssVar(varName, vars, seen = new Set()) {
	if (seen.has(varName)) return undefined;

	const value = vars[varName];
	if (!value) return undefined;

	const varRef = value.match(/^var\(\s*(--[a-z0-9-]+)\s*(?:,\s*[^)]+)?\)$/i);
	if (!varRef) return value;

	seen.add(varName);
	const resolved = resolveCssVar(varRef[1], vars, seen);
	seen.delete(varName);
	return resolved || value;
}

function tokenToCssVarName(token) {
	return `--${token.replace(/\./g, '-')}`;
}

function resolveTokenPair(token) {
	const cssVarName = tokenToCssVarName(token);
	const vars = getDesignTokenVars();

	return {
		lightValue: resolveCssVar(cssVarName, vars.light) || 'unresolved',
		darkValue: resolveCssVar(cssVarName, vars.dark) || 'unresolved',
	};
}

function resolveTokenValue(token) {
	return resolveTokenPair(token).lightValue;
}

function resolveColorTokenValues(token) {
	const { lightValue: lightHex, darkValue: darkHex } = resolveTokenPair(token);
	return { lightHex, darkHex };
}

function resolveShadowTokenValues(token) {
	const { lightValue: value, darkValue } = resolveTokenPair(token);
	return { value, darkValue };
}

function remToPx(value, rootFontSize = 16) {
	const match = value.trim().match(/^(-?\d*\.?\d+)(rem|em)$/i);
	if (!match) return value;

	const px = Number.parseFloat(match[1]) * rootFontSize;
	const normalized = Number(px.toFixed(4));
	return Number.isInteger(normalized) ? `${normalized}px` : `${normalized}px`;
}

function spaceTokenToPx(token) {
	const rawStep = token.replace(/^space\./, '');
	const step = Number(rawStep);
	if (!Number.isFinite(step)) return '';

	const px = (step / 100) * 8;
	return Number.isInteger(px) ? `${px}px` : `${px}px`;
}

function stripMdxImports(contents) {
	const lines = contents.split('\n');
	let inCodeFence = false;

	return lines
		.filter(line => {
			if (line.trimStart().startsWith('```')) {
				inCodeFence = !inCodeFence;
				return true;
			}

			return inCodeFence || !/^\s*import[\s\S]*?;?\s*$/.test(line);
		})
		.join('\n');
}

function protectSegments(contents, pattern, tokenPrefix) {
	const segments = [];
	const protectedContents = contents.replace(pattern, match => {
		const token = `@@${tokenPrefix}_${segments.length}@@`;
		segments.push([token, match]);
		return token;
	});

	return {
		contents: protectedContents,
		restore(value) {
			let restored = value;
			for (const [token, segment] of segments) {
				restored = restored.replaceAll(token, segment);
			}
			return restored;
		},
	};
}

function attributeValue(attributes, name) {
	const doubleQuoted = attributes.match(new RegExp(`${name}="([^"]*)"`, 'i'));
	if (doubleQuoted) return doubleQuoted[1];

	const singleQuoted = attributes.match(new RegExp(`${name}='([^']*)'`, 'i'));
	return singleQuoted?.[1] ?? '';
}

function humanizeIdentifier(identifier) {
	return identifier
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
		.replace(/[_-]+/g, ' ')
		.trim();
}

function normalizeHref(href) {
	if (href.startsWith('?path=/docs/')) {
		return `${href.replace('?path=', '')}.md`;
	}

	if (href.startsWith('/?path=/docs/')) {
		return `${href.replace('/?path=', '')}.md`;
	}

	const iframeMatch = href.match(/^\/iframe\.html\?id=([^&]+)&viewMode=docs/);
	if (iframeMatch) {
		return markdownRoute(iframeMatch[1]);
	}

	if (href.startsWith('/docs/') && !href.endsWith('.md')) {
		return `${href}.md`;
	}

	return href;
}

async function inlineRawMarkdownImports(contents, sourceFilePath) {
	const rawImports = new Map();
	const importPattern = /^\s*import\s+(\w+)\s+from\s+['"]([^'"]+\.md)\?raw['"];?\s*$/gm;
	const matches = [...contents.matchAll(importPattern)];

	for (const match of matches) {
		const [, importName, importTarget] = match;
		const rawPath = path.resolve(path.dirname(sourceFilePath), importTarget);
		rawImports.set(importName, await readFile(rawPath, 'utf8'));
	}

	let next = contents;
	for (const [importName, markdown] of rawImports) {
		next = next.replace(new RegExp(`<Markdown>\\s*\\{${importName}\\}\\s*</Markdown>`, 'g'), `\n${markdown}\n`);
	}

	return next;
}

function preserveMarkdownBlockquotesForMdx(markdown) {
	return markdown.replace(/^> /gm, '&gt; ');
}

function mdxToMarkdown(contents, { storyMarkdownByRef = new Map() } = {}) {
	const codeFences = protectSegments(stripMdxImports(contents), /```[\s\S]*?```/g, 'CODE_FENCE');
	let markdown = codeFences.contents;

	markdown = markdown.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
	markdown = markdown.replace(/<Meta\b[^>]*\/>/gi, '');
	markdown = markdown.replace(/<\/?Unstyled\b[^>]*>/gi, '\n');
	markdown = markdown.replace(/\s+on[A-Z]\w*=\{[^}]*\}/g, '');
	markdown = markdown.replace(/<Story\b[^>]*\bof=\{([^}]+)\}[^>]*\/>/gi, (_, storyRef) => {
		const storyMarkdown = storyMarkdownByRef.get(normalizeStoryReference(storyRef));
		if (storyMarkdown) return `\n\n${preserveMarkdownBlockquotesForMdx(storyMarkdown)}\n\n`;

		const storyName = String(storyRef).split('.').at(-1) ?? storyRef;
		return `\n\n&gt; Story example: ${humanizeIdentifier(storyName)}\n\n`;
	});

	const storyCodeFences = protectSegments(markdown, /```[\s\S]*?```/g, 'STORY_CODE_FENCE');
	markdown = storyCodeFences.contents;

	markdown = markdown.replace(/<img\b([^>]*?)\/?>/gi, (_, attributes) => {
		const src = attributeValue(attributes, 'src');
		if (!src) return '';
		const alt = attributeValue(attributes, 'alt') || 'Image';
		return `\n\n![${cleanInlineMarkdown(alt)}](${normalizeHref(src)})\n\n`;
	});
	markdown = markdown.replace(/<a\b([^>]*?)>([\s\S]*?)<\/a>/gi, (_, attributes, label) =>
		renderMarkdownLink(attributes, label)
	);
	markdown = markdown.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, code) => `\`${cleanInlineCode(code)}\``);
	const inlineCode = protectSegments(markdown, /`[^`\n]+`/g, 'INLINE_CODE');
	markdown = inlineCode.contents;
	markdown = markdown.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, (_, text) => `**${cleanInlineMarkdown(text)}**`);
	markdown = markdown.replace(/<em\b[^>]*>([\s\S]*?)<\/em>/gi, (_, text) => `_${cleanInlineMarkdown(text)}_`);

	for (const level of [6, 5, 4, 3, 2, 1]) {
		const marker = '#'.repeat(level);
		markdown = markdown.replace(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi'), (_, text) => {
			return `\n\n${marker} ${cleanInlineMarkdown(text)}\n\n`;
		});
	}

	markdown = markdown.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => {
		return `\n- ${cleanInlineMarkdown(text)}`;
	});
	markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
	markdown = markdown.replace(/<hr\b[^>]*\/?>/gi, '\n\n---\n\n');
	markdown = stripHtmlTags(markdown, { preserveLineBreaks: true });
	markdown = markdown.replace(/<|>/g, '');
	markdown = decodeEntities(markdown);
	markdown = markdown.replace(/[ \t]+\n/g, '\n');
	markdown = markdown.replace(/\n[ \t]+/g, '\n');
	markdown = markdown.replace(/\n{3,}/g, '\n\n');
	markdown = markdown.replace(/(- [^\n]+)\n\n(?=- )/g, '$1\n');
	markdown = inlineCode.restore(markdown);
	markdown = storyCodeFences.restore(markdown);
	markdown = codeFences.restore(markdown);

	return markdown.trim();
}

async function renderMdxMarkdown(sourceFilePath) {
	const rawContents = await readFile(sourceFilePath, 'utf8');
	const { storyMarkdownByRef } = await buildStoryMarkdownByRef(rawContents, sourceFilePath);
	const withRawMarkdown = await inlineRawMarkdownImports(rawContents, sourceFilePath);
	return mdxToMarkdown(withRawMarkdown, { storyMarkdownByRef });
}

function extractStoryDescriptions(source) {
	const descriptions = [];
	const firstStoryIndex = source.search(/\nexport\s+const\s+/);
	const metaSource = firstStoryIndex === -1 ? source : source.slice(0, firstStoryIndex);
	const componentDescription = metaSource.match(/description:\s*\{\s*component:\s*(['"`])([\s\S]*?)\1/);

	if (componentDescription) {
		descriptions.push(cleanInlineMarkdown(componentDescription[2]));
	}

	return descriptions;
}

function extractBalancedFromIndex(source, start, open, close) {
	if (start === -1 || source[start] !== open) return '';

	let depth = 0;
	let quote = '';
	let escaping = false;

	for (let index = start; index < source.length; index += 1) {
		const char = source[index];

		if (quote) {
			if (escaping) {
				escaping = false;
			} else if (char === '\\') {
				escaping = true;
			} else if (char === quote) {
				quote = '';
			}
			continue;
		}

		if (char === '"' || char === "'" || char === '`') {
			quote = char;
			continue;
		}

		if (char === open) {
			depth += 1;
		} else if (char === close) {
			depth -= 1;
			if (depth === 0) {
				return source.slice(start + 1, index);
			}
		}
	}

	return '';
}

function extractBalancedAfter(source, marker, open, close) {
	const markerIndex = source.indexOf(marker);
	if (markerIndex === -1) return '';

	const start = source.indexOf(open, markerIndex);
	return extractBalancedFromIndex(source, start, open, close);
}

function extractObjectAfter(source, marker) {
	return extractBalancedAfter(source, marker, '{', '}');
}

function extractObjectFromIndex(source, start) {
	return extractBalancedFromIndex(source, start, '{', '}');
}

function extractArrayFromIndex(source, start) {
	return extractBalancedFromIndex(source, start, '[', ']');
}

function extractArrayAfter(source, marker) {
	return extractBalancedAfter(source, marker, '[', ']');
}

function extractConstArray(source, name) {
	const pattern = new RegExp(`\\bconst\\s+${name}\\s*=\\s*\\[`);
	const match = source.match(pattern);
	if (!match) return '';

	const start = source.indexOf('[', match.index);
	return extractArrayFromIndex(source, start);
}

function extractCallArguments(source, functionName) {
	const functionIndex = source.indexOf(`${functionName}(`);
	if (functionIndex === -1) return '';

	const start = source.indexOf('(', functionIndex);
	return extractBalancedFromIndex(source, start, '(', ')');
}

function splitTopLevelEntries(objectSource) {
	const entries = [];
	let current = '';
	let quote = '';
	let escaping = false;
	let braceDepth = 0;
	let bracketDepth = 0;
	let parenDepth = 0;

	for (let index = 0; index < objectSource.length; index += 1) {
		const char = objectSource[index];

		if (quote) {
			current += char;
			if (escaping) {
				escaping = false;
			} else if (char === '\\') {
				escaping = true;
			} else if (char === quote) {
				quote = '';
			}
			continue;
		}

		if (char === '"' || char === "'" || char === '`') {
			quote = char;
			current += char;
			continue;
		}

		if (char === '{') braceDepth += 1;
		if (char === '}') braceDepth -= 1;
		if (char === '[') bracketDepth += 1;
		if (char === ']') bracketDepth -= 1;
		if (char === '(') parenDepth += 1;
		if (char === ')') parenDepth -= 1;

		if (char === ',' && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
			const trimmed = current.trim();
			if (trimmed) entries.push(trimmed);
			current = '';
			continue;
		}

		current += char;
	}

	const trimmed = current.trim();
	if (trimmed) entries.push(trimmed);

	return entries;
}

function extractTopLevelProperty(source, key) {
	for (const entry of splitTopLevelEntries(source)) {
		const match = entry.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
		if (match?.[1] === key) return match[2].trim();
	}

	return '';
}

function summarizeObjectEntries(objectSource, { skipKeys = [] } = {}) {
	const skip = new Set(skipKeys);
	const values = [];

	for (const entry of splitTopLevelEntries(objectSource)) {
		const match = entry.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
		if (!match) continue;

		const [, key, value] = match;
		if (skip.has(key)) continue;

		const text = cleanInlineMarkdown(value);
		if (text) values.push(`${key}: ${text}`);
	}

	return values.join(', ');
}

function summarizeObjectProperty(value, options) {
	const trimmed = value?.trim() ?? '';
	if (!trimmed) return '';

	if (trimmed.startsWith('{')) {
		const body = extractObjectFromIndex(trimmed, 0);
		return body ? summarizeObjectEntries(body, options) : '';
	}

	return cleanInlineMarkdown(trimmed);
}

function dedentCodeBlock(value) {
	const lines = String(value ?? '')
		.replace(/^\n+|\n+$/g, '')
		.split('\n');
	const firstLineStartsAtColumnZero = Boolean(lines[0]?.trim()) && !/^\s/.test(lines[0]);
	const indents = lines
		.filter((line, index) => line.trim().length > 0 && !(firstLineStartsAtColumnZero && index === 0))
		.map(line => line.match(/^\s*/)?.[0].length ?? 0);
	const minIndent = indents.length > 0 ? Math.min(...indents) : 0;

	return lines
		.map((line, index) => {
			if (firstLineStartsAtColumnZero && index === 0) return line.trimEnd();
			const indent = line.match(/^\s*/)?.[0].length ?? 0;
			return line.slice(Math.min(indent, minIndent));
		})
		.join('\n')
		.trim();
}

function normalizeCodeSnippet(snippet) {
	const decoded = snippet
		.replace(/\\r\\n/g, '\n')
		.replace(/\\n/g, '\n')
		.replace(/\\t/g, '\t')
		.replace(/\\`/g, '`');

	return dedentCodeBlock(decoded);
}

function escapeRegExp(value) {
	return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractStringLiteralAt(source, quoteIndex) {
	const quote = source[quoteIndex];
	if (!(quote === '"' || quote === "'" || quote === '`')) return null;

	let value = '';
	let escaping = false;

	for (let index = quoteIndex + 1; index < source.length; index += 1) {
		const char = source[index];

		if (escaping) {
			value += `\\${char}`;
			escaping = false;
			continue;
		}

		if (char === '\\') {
			escaping = true;
			continue;
		}

		if (char === quote) {
			return { value, end: index + 1 };
		}

		value += char;
	}

	return null;
}

function extractStringPropertyValues(source, key) {
	const values = [];
	const propertyPattern = new RegExp(`\\b${escapeRegExp(key)}\\s*:\\s*(["'\`])`, 'g');

	for (const match of source.matchAll(propertyPattern)) {
		const literal = extractStringLiteralAt(source, (match.index ?? 0) + match[0].length - 1);
		if (literal) values.push(normalizeCodeSnippet(literal.value));
	}

	return values.filter(Boolean);
}

function extractSourceCodeSnippets(objectBody) {
	const snippets = [];
	const sourcePattern = /\bsource\s*:\s*\{/g;

	for (const match of objectBody.matchAll(sourcePattern)) {
		const objectStart = objectBody.indexOf('{', match.index);
		const sourceBody = extractObjectFromIndex(objectBody, objectStart);
		if (!sourceBody) continue;

		snippets.push(...extractStringPropertyValues(sourceBody, 'code'));
	}

	return snippets.filter(Boolean);
}

function withoutStringLiterals(source) {
	let output = '';
	let quote = '';
	let escaping = false;

	for (let index = 0; index < source.length; index += 1) {
		const char = source[index];

		if (quote) {
			output += ' ';
			if (escaping) {
				escaping = false;
			} else if (char === '\\') {
				escaping = true;
			} else if (char === quote) {
				quote = '';
			}
			continue;
		}

		if (char === '"' || char === "'" || char === '`') {
			quote = char;
			output += ' ';
			continue;
		}

		output += char;
	}

	return output;
}

const IGNORED_TEMPLATE_IDENTIFIERS = new Set([
	'and',
	'as',
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'default',
	'delete',
	'do',
	'else',
	'false',
	'for',
	'function',
	'if',
	'in',
	'instanceof',
	'let',
	'new',
	'null',
	'of',
	'or',
	'return',
	'switch',
	'this',
	'true',
	'typeof',
	'undefined',
	'var',
	'void',
	'while',
]);

function identifiersFromExpression(expression) {
	const identifiers = new Set();
	const source = withoutStringLiterals(expression);
	const identifierPattern = /\b[A-Za-z_$][\w$]*\b/g;

	for (const match of source.matchAll(identifierPattern)) {
		const name = match[0];
		const previous = source[(match.index ?? 0) - 1];

		if (previous === '.' || IGNORED_TEMPLATE_IDENTIFIERS.has(name)) continue;
		identifiers.add(name);
	}

	return identifiers;
}

function extractTemplateIdentifiers(template) {
	const identifiers = new Set();
	const source = String(template ?? '');
	const directivePattern = /(?:^|[\s<])(?:v-[\w-]+|:[\w-]+|@[\w-]+)\s*=\s*(["'])([\s\S]*?)\1/g;
	const interpolationPattern = /\{\{([\s\S]*?)\}\}/g;

	for (const match of source.matchAll(directivePattern)) {
		for (const identifier of identifiersFromExpression(match[2])) {
			identifiers.add(identifier);
		}
	}

	for (const match of source.matchAll(interpolationPattern)) {
		for (const identifier of identifiersFromExpression(match[1])) {
			identifiers.add(identifier);
		}
	}

	return identifiers;
}

function scanStatement(source, start) {
	let quote = '';
	let escaping = false;
	let braceDepth = 0;
	let bracketDepth = 0;
	let parenDepth = 0;

	for (let index = start; index < source.length; index += 1) {
		const char = source[index];

		if (quote) {
			if (escaping) {
				escaping = false;
			} else if (char === '\\') {
				escaping = true;
			} else if (char === quote) {
				quote = '';
			}
			continue;
		}

		if (char === '"' || char === "'" || char === '`') {
			quote = char;
			continue;
		}

		if (char === '{') braceDepth += 1;
		if (char === '}') braceDepth -= 1;
		if (char === '[') bracketDepth += 1;
		if (char === ']') bracketDepth -= 1;
		if (char === '(') parenDepth += 1;
		if (char === ')') parenDepth -= 1;

		if (char === ';' && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
			return source.slice(start, index + 1).trim();
		}
	}

	return source.slice(start).trim();
}

function extractDeclarationFromSource(source, name) {
	const declarationPattern = new RegExp(`\\b(?:const|let|var)\\s+${escapeRegExp(name)}\\b\\s*=`, 'g');
	const declarationMatch = declarationPattern.exec(source);
	if (declarationMatch) return scanStatement(source, declarationMatch.index);

	const functionPattern = new RegExp(`\\bfunction\\s+${escapeRegExp(name)}\\s*\\(`, 'g');
	const functionMatch = functionPattern.exec(source);
	if (!functionMatch) return '';

	const bodyStart = source.indexOf('{', functionMatch.index);
	const body = extractObjectFromIndex(source, bodyStart);
	if (!body) return '';

	return source.slice(functionMatch.index, bodyStart + body.length + 2).trim();
}

function extractSetupBody(objectBody) {
	const methodMatch = objectBody.match(/\bsetup\s*\([^)]*\)\s*\{/);
	if (methodMatch) {
		const bodyStart = objectBody.indexOf('{', methodMatch.index);
		return extractObjectFromIndex(objectBody, bodyStart);
	}

	const arrowMatch = objectBody.match(/\bsetup\s*:\s*(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>\s*\{/);
	if (arrowMatch) {
		const bodyStart = objectBody.indexOf('{', arrowMatch.index);
		return extractObjectFromIndex(objectBody, bodyStart);
	}

	return '';
}

function extractSetupReturnBindings(setupBody) {
	const bindings = new Map();
	const returnIndex = setupBody.lastIndexOf('return');
	if (returnIndex === -1) return bindings;

	const objectStart = setupBody.indexOf('{', returnIndex);
	const objectBody = extractObjectFromIndex(setupBody, objectStart);
	if (!objectBody) return bindings;

	for (const entry of splitTopLevelEntries(objectBody)) {
		const shorthand = entry.match(/^([A-Za-z_$][\w$]*)$/);
		if (shorthand) {
			bindings.set(shorthand[1], shorthand[1]);
			continue;
		}

		const aliased = entry.match(/^([A-Za-z_$][\w$]*)\s*:\s*([A-Za-z_$][\w$]*)$/);
		if (aliased) bindings.set(aliased[1], aliased[2]);
	}

	return bindings;
}

function collectDeclarationsByName(source, names) {
	const declarations = [];

	for (const name of names) {
		const declaration = extractDeclarationFromSource(source, name);
		if (!declaration) continue;

		declarations.push({
			name,
			declaration: dedentCodeBlock(declaration),
			index: source.indexOf(declaration),
		});
	}

	return declarations;
}

function declarationNamesInSource(source) {
	const names = new Set();
	const declarationPattern = /\b(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)\b/g;

	for (const match of source.matchAll(declarationPattern)) {
		names.add(match[1]);
	}

	return names;
}

function expandDeclarationDependencies(declarations, neededNames) {
	let changed = true;

	while (changed) {
		changed = false;
		for (const declaration of declarations) {
			if (!neededNames.has(declaration.name)) continue;

			for (const candidate of declarations) {
				if (neededNames.has(candidate.name)) continue;
				if (identifiersFromExpression(declaration.declaration).has(candidate.name)) {
					neededNames.add(candidate.name);
					changed = true;
				}
			}
		}
	}
}

function namedImportsFromSource(source) {
	const imports = [];
	const importPattern = /^\s*import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"];?\s*$/gm;

	for (const match of source.matchAll(importPattern)) {
		const names = [];
		for (const part of match[1].split(',')) {
			const cleaned = part.trim().replace(/^type\s+/, '');
			if (!cleaned) continue;

			const [, imported, local] = cleaned.match(/^([A-Za-z_$][\w$]*)(?:\s+as\s+([A-Za-z_$][\w$]*))?$/) ?? [];
			if (imported) names.push({ imported, local: local || imported });
		}

		if (names.length > 0) imports.push({ names, target: match[2] });
	}

	return imports;
}

function publicImportTarget(target) {
	if (/^(?:\.\.?\/)+index$/.test(target) || /\/index$/.test(target)) {
		return '@bcc-code/component-library-vue';
	}

	return target;
}

function contextImports(source, context) {
	const identifiers = identifiersFromExpression(context);
	const imports = [];

	for (const importEntry of namedImportsFromSource(source)) {
		const used = importEntry.names.filter(name => identifiers.has(name.local));
		if (used.length === 0) continue;

		const specifier = used
			.map(name => (name.imported === name.local ? name.imported : `${name.imported} as ${name.local}`))
			.join(', ');
		imports.push(`import { ${specifier} } from '${publicImportTarget(importEntry.target)}';`);
	}

	return imports;
}

function indentTemplateForSfc(template) {
	return template
		.split('\n')
		.map(line => (line.trim() ? `\t${line}` : line))
		.join('\n');
}

function renderTemplateCodeSnippet(template, setupContext) {
	if (!setupContext.trim()) return template;

	return `<script setup lang="ts">\n${setupContext.trim()}\n</script>\n\n<template>\n${indentTemplateForSfc(template)}\n</template>`;
}

function buildSetupContextForTemplate({ source, objectBody, template, args }) {
	const templateIdentifiers = extractTemplateIdentifiers(template);
	if (templateIdentifiers.size === 0) return '';

	const setupBody = extractSetupBody(objectBody);
	const returnBindings = extractSetupReturnBindings(setupBody);
	const desiredSetupNames = new Set();
	const moduleNames = new Set();

	for (const identifier of templateIdentifiers) {
		if (identifier === 'args' && args) continue;

		const localName = returnBindings.get(identifier);
		if (localName) {
			desiredSetupNames.add(localName);
			continue;
		}

		moduleNames.add(identifier);
	}

	const allSetupDeclarations = collectDeclarationsByName(setupBody, declarationNamesInSource(setupBody));
	const setupDeclarationNames = new Set(allSetupDeclarations.map(declaration => declaration.name));

	for (const identifier of templateIdentifiers) {
		const localName = returnBindings.get(identifier);
		if (!localName || localName === 'args') continue;
		if (!setupDeclarationNames.has(localName)) moduleNames.add(localName);
	}

	expandDeclarationDependencies(allSetupDeclarations, desiredSetupNames);

	const setupDeclarations = allSetupDeclarations.filter(declaration => desiredSetupNames.has(declaration.name));
	const moduleDeclarations = collectDeclarationsByName(source, moduleNames);
	const declarations = [...setupDeclarations, ...moduleDeclarations]
		.filter((declaration, index, all) => all.findIndex(item => item.name === declaration.name) === index)
		.filter(declaration => declaration.name !== 'args')
		.sort((left, right) => left.index - right.index)
		.map(declaration => declaration.declaration);

	if (declarations.length === 0) return '';

	const contextWithoutImports = declarations.join('\n');
	return [...contextImports(source, contextWithoutImports), contextWithoutImports].filter(Boolean).join('\n\n');
}

function parseStringArgument(value) {
	const trimmed = value?.trim() ?? '';
	if (!trimmed || trimmed === 'undefined' || trimmed === 'null') return '';

	if (trimmed.startsWith('[')) {
		const body = extractArrayFromIndex(trimmed, 0);
		if (!body) return cleanInlineMarkdown(trimmed);
		return splitTopLevelEntries(body).map(parseStringArgument).filter(Boolean).join(', ');
	}

	const quote = trimmed[0];
	if ((quote === '"' || quote === "'" || quote === '`') && trimmed.endsWith(quote)) {
		return cleanInlineMarkdown(
			trimmed
				.slice(1, -1)
				.replace(/\\n/g, '\n')
				.replace(/\\t/g, '\t')
				.replace(/\\(['"`\\])/g, '$1')
		);
	}

	return cleanInlineMarkdown(trimmed);
}

function parseObjectLiteralProperties(source) {
	const trimmed = source.trim();
	if (!trimmed.startsWith('{')) return {};

	const body = extractObjectFromIndex(trimmed, 0);
	if (!body) return {};

	const properties = {};
	for (const entry of splitTopLevelEntries(body)) {
		const match = entry.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
		if (!match) continue;

		properties[match[1]] = parseStringArgument(match[2]);
	}

	return properties;
}

function parseObjectArrayRows(arraySource) {
	const rows = [];

	for (const entry of splitTopLevelEntries(arraySource)) {
		const trimmed = entry.trim();
		if (!trimmed.startsWith('{')) continue;

		const properties = parseObjectLiteralProperties(trimmed);
		if (Object.keys(properties).length > 0) {
			rows.push(properties);
		}
	}

	return rows;
}

function humanizeObjectKey(key) {
	return humanizeIdentifier(key).replace(/\b\w/g, letter => letter.toUpperCase());
}

function htmlToPlainText(html) {
	return cleanInlineMarkdown(
		stripHtmlTags(html.replace(/\{\{\s*([^}]+?)\s*\}\}/g, '$1').replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, '`$1`'), {
			preserveLineBreaks: true,
		})
	);
}

function colorTokenCssVariable(token) {
	return `var(--color-${token.replace(/^color\./, '').replace(/\./g, '-')})`;
}

function colorTokenTailwindClass(token) {
	return token
		.replace(/^color\./, '')
		.replace(/\./g, '-')
		.replace('background-', 'bg-');
}

function parseTokenEntry(entry) {
	const trimmed = entry.trim();
	if (!trimmed) return null;

	if (trimmed.startsWith('{')) {
		const properties = parseObjectLiteralProperties(trimmed);
		if (!properties.token) return null;

		return {
			kind: 'preview',
			token: properties.token,
			description: properties.desc,
			preview: properties.preview,
			tailwindClass: properties.tw,
		};
	}

	const callMatch = trimmed.match(/^([A-Za-z_$][\w$]*)\s*\(([\s\S]*)\)$/);
	if (!callMatch) return null;

	const [, helperName, argsSource] = callMatch;
	const args = splitTopLevelEntries(argsSource).map(parseStringArgument);
	const token = args[0];
	if (!token) return null;

	if (helperName === 'c') {
		const { lightHex, darkHex } = resolveColorTokenValues(token);
		return {
			kind: 'color',
			token,
			description: args[1],
			lightValue: args[2] || lightHex,
			darkValue: args[3] || darkHex,
			cssVariable: colorTokenCssVariable(token),
			tailwindClass: colorTokenTailwindClass(token),
		};
	}

	if (helperName === 's') {
		const resolved = resolveTokenValue(token);
		return {
			kind: 'size',
			token,
			value: resolved === 'unresolved' ? spaceTokenToPx(token) || resolved : remToPx(resolved),
			tailwindClass: `spacing-${token.replace(/^space\./, '')}`,
		};
	}

	if (helperName === 'sp') {
		const multiplier = Number(args[1]);
		return {
			kind: 'spacing',
			token,
			multiplier: Number.isFinite(multiplier) ? `${multiplier}x` : args[1],
			rem: Number.isFinite(multiplier) ? `${multiplier / 2}rem` : '',
			px: Number.isFinite(multiplier) ? `${(multiplier / 2) * 16}px` : '',
			tailwindClass: `spacing-${token.replace(/^space\./, '')}`,
		};
	}

	if (helperName === 'b' || helperName === 'sizedToken' || helperName === 'isize') {
		const description = helperName === 'isize' ? '' : args[1];
		const tailwindClass = helperName === 'isize' ? args[1] : args[2];

		return {
			kind: 'size',
			token,
			description,
			value: remToPx(resolveTokenValue(token)),
			cssVariable: tokenToCssVarName(token),
			tailwindClass,
		};
	}

	if (helperName === 'sh') {
		const { value, darkValue } = resolveShadowTokenValues(token);
		return {
			kind: 'shadow',
			token,
			description: args[1],
			lightValue: value,
			darkValue,
			cssVariable: tokenToCssVarName(token),
			tailwindClass: args[2],
		};
	}

	return null;
}

function extractTokenRows(source) {
	const tokensSource = extractArrayAfter(source, 'tokens:');
	if (!tokensSource) return [];

	return splitTopLevelEntries(tokensSource).map(parseTokenEntry).filter(Boolean);
}

function extractDoDontGuidance(source) {
	const argsSource = extractCallArguments(source, 'doDont');
	if (!argsSource) return null;

	const args = splitTopLevelEntries(argsSource).map(parseStringArgument);
	if (args.length < 4) return null;

	return {
		doExample: htmlToPlainText(args[0]),
		doText: args[1],
		dontExample: htmlToPlainText(args[2]),
		dontText: args[3],
	};
}

function extractObjectArrayTables(source) {
	const tables = [];
	const constArrayPattern = /\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*\[/g;
	const seen = new Set();

	for (const match of source.matchAll(constArrayPattern)) {
		const name = match[1];
		if (seen.has(name)) continue;

		const arrayStart = source.indexOf('[', (match.index ?? 0) + match[0].length - 1);
		const arraySource = extractArrayFromIndex(source, arrayStart);
		if (!arraySource) continue;

		const rows = parseObjectArrayRows(arraySource);
		if (rows.length === 0) {
			const values = splitTopLevelEntries(arraySource).map(parseStringArgument).filter(Boolean);
			if (values.length === 0 || values.some(value => value.startsWith('{') || value.includes('=>'))) continue;

			seen.add(name);
			tables.push({ name, rows: values.map(value => ({ value })) });
			continue;
		}

		seen.add(name);
		tables.push({ name, rows });
	}

	return tables;
}

function parsePrimitiveArray(source) {
	if (!source) return [];
	return splitTopLevelEntries(source).map(parseStringArgument).filter(Boolean);
}

function extractRampTable(source, objectBody) {
	const argsSource = extractCallArguments(objectBody, 'rampTemplate');
	if (!argsSource) return null;

	const args = splitTopLevelEntries(argsSource);
	if (args.length < 2) return null;

	const rampSourceArg = args[0].trim();
	const labelSourceArg = args[1].trim();
	const rampSource = /^[A-Za-z_$][\w$]*$/.test(rampSourceArg)
		? extractConstArray(source, rampSourceArg)
		: rampSourceArg.startsWith('[')
			? extractArrayFromIndex(rampSourceArg, 0)
			: '';
	const labels = /^[A-Za-z_$][\w$]*$/.test(labelSourceArg)
		? parsePrimitiveArray(extractConstArray(`${source}\n${objectBody}`, labelSourceArg))
		: labelSourceArg.startsWith('[')
			? parsePrimitiveArray(extractArrayFromIndex(labelSourceArg, 0))
			: [];

	if (!rampSource) return null;

	const rows = [];
	const rampPattern = /ramp\(\s*(['"`])([^'"`]+)\1\s*,\s*(['"`])([^'"`]+)\3(?:\s*,\s*([A-Za-z_$][\w$]*))?\s*\)/g;
	for (const match of rampSource.matchAll(rampPattern)) {
		const [, , label, , tokenBase, stepsVariable] = match;
		const tokenSteps = stepsVariable
			? parsePrimitiveArray(extractConstArray(`${source}\n${objectBody}`, stepsVariable))
			: labels;
		const tokenList = tokenSteps.map((step, index) => {
			const display = labels[index] && labels[index] !== step ? `${labels[index]}: ` : '';
			return `${display}${tokenBase}.${step}`;
		});

		rows.push({
			ramp: label,
			tokenBase,
			tokens: tokenList.join(', '),
		});
	}

	if (rows.length === 0) return null;
	return { name: 'color ramp tokens', rows };
}

function escapeMarkdownTableCell(value) {
	const text = cleanInlineMarkdown(String(value ?? ''));
	if (!text) return '-';

	return text
		.replace(/\\/g, '\\\\') // Escape backslashes first to avoid double-escaping
		.replace(/\|/g, '\\|') // Escape pipe characters
		.replace(/\n/g, '<br>'); // Replace newlines with <br>
}

function renderMarkdownTable(headers, rows) {
	if (rows.length === 0) return '';

	const lines = [
		`| ${headers.map(escapeMarkdownTableCell).join(' | ')} |`,
		`| ${headers.map(() => '---').join(' | ')} |`,
	];

	for (const row of rows) {
		lines.push(`| ${row.map(escapeMarkdownTableCell).join(' | ')} |`);
	}

	return lines.join('\n');
}

function renderTokenRowsMarkdown(rows) {
	if (rows.length === 0) return '';

	const kind = rows[0].kind;

	if (kind === 'color') {
		return renderMarkdownTable(
			['Token', 'Description', 'Light value', 'Dark value', 'CSS variable', 'Tailwind class'],
			rows.map(row => [
				`\`${row.token}\``,
				row.description,
				row.lightValue,
				row.darkValue,
				`\`${row.cssVariable}\``,
				`\`${row.tailwindClass}\``,
			])
		);
	}

	if (kind === 'shadow') {
		return renderMarkdownTable(
			['Token', 'Description', 'Light shadow', 'Dark shadow', 'CSS variable', 'Tailwind class'],
			rows.map(row => [
				`\`${row.token}\``,
				row.description,
				row.lightValue,
				row.darkValue,
				`\`${row.cssVariable}\``,
				`\`${row.tailwindClass}\``,
			])
		);
	}

	if (kind === 'preview') {
		return renderMarkdownTable(
			['Token', 'Description', 'Preview', 'Tailwind class'],
			rows.map(row => [`\`${row.token}\``, row.description, row.preview, `\`${row.tailwindClass}\``])
		);
	}

	if (kind === 'spacing') {
		return renderMarkdownTable(
			['Token', 'Multiplier', 'REM', 'Pixels', 'Tailwind class'],
			rows.map(row => [`\`${row.token}\``, row.multiplier, row.rem, row.px, `\`${row.tailwindClass}\``])
		);
	}

	return renderMarkdownTable(
		['Token', 'Description', 'Value', 'CSS variable', 'Tailwind class'],
		rows.map(row => [
			`\`${row.token}\``,
			row.description,
			row.value,
			row.cssVariable ? `\`${row.cssVariable}\`` : '',
			`\`${row.tailwindClass}\``,
		])
	);
}

function renderObjectArrayTableMarkdown(table) {
	const keys = [];

	for (const row of table.rows) {
		for (const key of Object.keys(row)) {
			if (!keys.includes(key)) keys.push(key);
		}
	}

	if (keys.length === 0) return '';

	const title = `**${humanizeIdentifier(table.name)}**`;
	const markdownTable = renderMarkdownTable(
		keys.map(humanizeObjectKey),
		table.rows.map(row => keys.map(key => row[key] ?? ''))
	);

	return `${title}\n\n${markdownTable}`;
}

function extractArgDescriptions(source) {
	const props = new Map();
	const argTypes = extractObjectAfter(source, 'argTypes:');
	if (!argTypes) return [];

	for (const entry of splitTopLevelEntries(argTypes)) {
		const match = entry.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
		if (!match) continue;

		const [, propName, definition] = match;
		if (propName === 'docs' || propName === 'description') continue;

		const descriptionMatch = definition.match(/description:\s*(['"`])([\s\S]*?)\1/);
		const controlMatch = definition.match(
			/control:\s*(?:\{\s*type:\s*(['"`])([\s\S]*?)\1[\s\S]*?\}|(['"`])([\s\S]*?)\3)/
		);
		const optionsMatch = definition.match(/options:\s*\[([\s\S]*?)\]/);
		const defaultMatch = definition.match(/defaultValue:\s*\{[\s\S]*?summary:\s*(['"`])([\s\S]*?)\1/);
		const typeMatch = definition.match(/type:\s*\{[\s\S]*?summary:\s*(['"`])([\s\S]*?)\1/);

		props.set(propName, {
			description: descriptionMatch ? cleanInlineMarkdown(descriptionMatch[2]) : '',
			control: cleanInlineMarkdown(controlMatch?.[2] ?? controlMatch?.[4] ?? ''),
			options: cleanInlineMarkdown(optionsMatch?.[1]?.replace(/\s+/g, ' ') ?? ''),
			defaultValue: cleanInlineMarkdown(defaultMatch?.[2] ?? ''),
			typeSummary: cleanInlineMarkdown(typeMatch?.[2] ?? ''),
		});
	}

	return Array.from(props.entries()).map(([name, values]) => ({ name, ...values }));
}

function extractStoryNames(source) {
	const names = new Set();
	const exportPattern = /export\s+const\s+([A-Z]\w*)\s*[:=]/g;

	for (const match of source.matchAll(exportPattern)) {
		names.add(match[1]);
	}

	return Array.from(names);
}

function extractComponentName(source) {
	const match = source.match(/\bcomponent:\s*([A-Za-z_$][\w$]*)/);
	return match?.[1] ?? '';
}

function extractTopLevelParameters(source) {
	const parameters = extractObjectAfter(source, 'parameters:');
	if (!parameters) return [];

	const values = [];
	const componentDescription = parameters.match(/description:\s*\{[\s\S]*?component:\s*(['"`])([\s\S]*?)\1/);
	if (componentDescription) {
		values.push(`component description: ${cleanInlineMarkdown(componentDescription[2])}`);
	}

	for (const entry of splitTopLevelEntries(parameters)) {
		const match = entry.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
		if (!match) continue;
		const [, key, value] = match;
		if (key === 'docs') continue;
		values.push(`${key}: ${cleanInlineMarkdown(value).slice(0, 180)}`);
	}

	return values;
}

function extractStoryDefinitions(source) {
	const definitions = [];
	const exportPattern = /export\s+const\s+([A-Z]\w*)\s*(?::[^=]+)?=\s*/g;

	for (const match of source.matchAll(exportPattern)) {
		const storyName = match[1];
		const afterExportIndex = (match.index ?? 0) + match[0].length;
		const objectStart = source.indexOf('{', afterExportIndex);
		if (objectStart === -1) continue;

		const objectBody = extractObjectFromIndex(source, objectStart);
		if (!objectBody) continue;

		const args = extractTopLevelProperty(objectBody, 'args');
		const parameters = extractTopLevelProperty(objectBody, 'parameters');
		const tokenRows = extractTokenRows(objectBody);
		const doDont = extractDoDontGuidance(objectBody);
		const rampTable = extractRampTable(source, objectBody);
		const dataTables = extractObjectArrayTables(objectBody);
		const templates = extractStringPropertyValues(objectBody, 'template');
		const sourceCodes = extractSourceCodeSnippets(objectBody);
		const templateCodes = templates.map(template =>
			renderTemplateCodeSnippet(
				template,
				buildSetupContextForTemplate({
					source,
					objectBody,
					template,
					args,
				})
			)
		);

		definitions.push({
			name: storyName,
			args: summarizeObjectProperty(args),
			parameters: summarizeObjectProperty(parameters, { skipKeys: ['docs'] }),
			tokenRows,
			doDont,
			rampTable,
			dataTables,
			templates: templates.filter(Boolean),
			sourceCodes: sourceCodes.filter(Boolean),
			templateCodes: templateCodes.filter(Boolean),
		});
	}

	return definitions;
}

async function resolveStoryImportPath(sourceFilePath, importTarget) {
	const resolvedBase = path.resolve(path.dirname(sourceFilePath), importTarget);
	const candidates = [
		resolvedBase,
		`${resolvedBase}.ts`,
		`${resolvedBase}.tsx`,
		`${resolvedBase}.js`,
		`${resolvedBase}.jsx`,
	];

	for (const candidate of candidates) {
		const contents = await readFile(candidate, 'utf8').catch(() => '');
		if (contents) {
			return { path: candidate, contents };
		}
	}

	return null;
}

function addStoryImport(importsByTarget, importTarget, binding) {
	const entry = importsByTarget.get(importTarget) ?? {
		importTarget,
		namespaces: new Set(),
		named: [],
	};

	if (binding.namespace) {
		entry.namespaces.add(binding.namespace);
	}

	if (binding.named) {
		entry.named.push(binding.named);
	}

	importsByTarget.set(importTarget, entry);
}

function parseNamedStoryImports(specifier) {
	return specifier
		.split(',')
		.map(part => part.trim())
		.filter(Boolean)
		.map(part => {
			const [exported, local] = part.split(/\s+as\s+/i).map(value => value.trim());
			return { exported, local: local || exported };
		});
}

function parseStoryImports(mdxSource) {
	const importsByTarget = new Map();
	const namespacePattern =
		/^\s*import\s+\*\s+as\s+([A-Za-z_$][\w$]*)\s+from\s+['"]([^'"]*\.stories(?:\.[cm]?[jt]sx?)?)['"];?\s*$/gm;
	const namedPattern = /^\s*import\s+\{([^}]+)\}\s+from\s+['"]([^'"]*\.stories(?:\.[cm]?[jt]sx?)?)['"];?\s*$/gm;

	for (const match of mdxSource.matchAll(namespacePattern)) {
		const [, namespace, importTarget] = match;
		addStoryImport(importsByTarget, importTarget, { namespace });
	}

	for (const match of mdxSource.matchAll(namedPattern)) {
		const [, specifier, importTarget] = match;
		for (const named of parseNamedStoryImports(specifier)) {
			addStoryImport(importsByTarget, importTarget, { named });
		}
	}

	return Array.from(importsByTarget.values()).map(entry => ({
		...entry,
		namespaces: Array.from(entry.namespaces),
	}));
}

async function loadReferencedStorySources(mdxSource, sourceFilePath) {
	const imports = parseStoryImports(mdxSource);

	const resolved = [];
	for (const storyImport of imports) {
		const { importTarget } = storyImport;
		const entry = await resolveStoryImportPath(sourceFilePath, importTarget);
		if (entry) resolved.push({ ...entry, imports: [storyImport] });
	}

	return resolved;
}

function normalizeStoryReference(storyRef) {
	return String(storyRef).replace(/\s+/g, '');
}

function renderStoryContentMarkdown(story, { includeHeading = false, headingLevel = 3 } = {}) {
	const lines = [];
	const sourceCodes = story.sourceCodes ?? [];
	const templateCodes = story.templateCodes ?? [];
	const codeExamples = sourceCodes.length > 0 ? sourceCodes : templateCodes;

	if (includeHeading) {
		lines.push(`${'#'.repeat(headingLevel)} ${humanizeIdentifier(story.name)}`, '');
	}

	if (story.doDont) {
		lines.push(
			renderMarkdownTable(
				['Do', "Don't"],
				[
					[
						[story.doDont.doExample, story.doDont.doText].filter(Boolean).join('\n\n'),
						[story.doDont.dontExample, story.doDont.dontText].filter(Boolean).join('\n\n'),
					],
				]
			),
			''
		);
	} else if (story.tokenRows.length > 0) {
		lines.push(renderTokenRowsMarkdown(story.tokenRows), '');
	} else if (story.rampTable) {
		lines.push(renderObjectArrayTableMarkdown(story.rampTable), '');
	} else if (story.dataTables.length > 0) {
		for (const table of story.dataTables) {
			lines.push(renderObjectArrayTableMarkdown(table), '');
		}
	}

	if (story.args) lines.push(`- Args: ${story.args}`);
	if (story.parameters) lines.push(`- Parameters: ${story.parameters}`);
	if (story.args || story.parameters) lines.push('');

	for (const snippet of codeExamples) {
		lines.push('```vue', snippet, '```', '');
	}

	if (lines.length === 0 || (includeHeading && lines.length === 2)) {
		lines.push(`> Visual example: ${humanizeIdentifier(story.name)}`, '');
	}

	return lines.join('\n').trim();
}

async function buildStoryMarkdownByRef(mdxSource, sourceFilePath) {
	const references = await loadReferencedStorySources(mdxSource, sourceFilePath);
	const storyMarkdownByRef = new Map();

	for (const reference of references) {
		const storyDefinitions = extractStoryDefinitions(reference.contents);
		const storyDefinitionsByName = new Map(storyDefinitions.map(story => [story.name, story]));

		for (const storyImport of reference.imports) {
			for (const namespace of storyImport.namespaces) {
				for (const story of storyDefinitions) {
					storyMarkdownByRef.set(
						normalizeStoryReference(`${namespace}.${story.name}`),
						renderStoryContentMarkdown(story)
					);
				}
			}

			for (const named of storyImport.named) {
				const story = storyDefinitionsByName.get(named.exported);
				if (!story) continue;
				storyMarkdownByRef.set(normalizeStoryReference(named.local), renderStoryContentMarkdown(story));
			}
		}
	}

	return { references, storyMarkdownByRef };
}

async function renderStoryMarkdown(sourceFilePath, entry) {
	const source = await readFile(sourceFilePath, 'utf8');
	const component = extractComponentName(source);
	const descriptions = extractStoryDescriptions(source);
	const props = extractArgDescriptions(source);
	const stories = extractStoryNames(source);
	const parameters = extractTopLevelParameters(source);
	const storyDefinitions = extractStoryDefinitions(source);
	const lines = [];

	if (descriptions.length > 0) {
		lines.push(...descriptions, '');
	} else {
		lines.push(`Documentation for ${entry.title}.`, '');
	}

	if (component) {
		lines.push('## Component', '', `\`${component}\``, '');
	}

	if (parameters.length > 0) {
		lines.push('## Parameters', '');
		for (const parameter of parameters) {
			lines.push(`- ${parameter}`);
		}
		lines.push('');
	}

	if (props.length > 0) {
		lines.push(
			'## Props',
			'',
			'| Prop | Description | Type | Default | Control | Options |',
			'| --- | --- | --- | --- | --- | --- |'
		);
		for (const prop of props) {
			lines.push(
				`| \`${prop.name}\` | ${prop.description || '-'} | ${prop.typeSummary || '-'} | ${prop.defaultValue || '-'} | ${prop.control || '-'} | ${prop.options || '-'} |`
			);
		}
		lines.push('');
	}

	if (stories.length > 0) {
		lines.push('## Stories', '');
		for (const storyName of stories) {
			lines.push(`- ${humanizeIdentifier(storyName)}`);
		}
		lines.push('');
	}

	if (storyDefinitions.length > 0) {
		lines.push('## Story Details', '');
		for (const story of storyDefinitions) {
			lines.push(renderStoryContentMarkdown(story, { includeHeading: true }), '');
		}
	}

	return lines.join('\n').trim();
}

function ensurePageHeader(entry, markdown) {
	const source = trimDotSlash(entry.importPath);
	const metadata = `> Source: \`${source}\`. Docs route: \`${docsRoute(entry.id)}\`.`;
	const trimmed = markdown.trim();

	if (trimmed.startsWith('# ')) {
		return `${trimmed.replace(/^# .*(?:\n|$)/, match => `${match.trimEnd()}\n\n${metadata}\n\n`)}`.trim();
	}

	return `# ${entry.title}\n\n${metadata}\n\n${trimmed}`.trim();
}

function summarizeMarkdown(markdown, fallback) {
	const lines = markdown
		.split('\n')
		.map(line => line.trim())
		.filter(Boolean)
		.filter(line => !line.startsWith('#'))
		.filter(line => !line.startsWith('> Source:'))
		.filter(line => !line.startsWith('---'));

	const summary =
		lines.find(
			line => !line.startsWith('- ') && !line.startsWith('> Story example:') && !line.startsWith('> Visual example:')
		) ?? fallback;
	return summary;
}

async function renderPage(entry, cwd, baseUrl) {
	const source = trimDotSlash(entry.importPath);
	const sourceFilePath = path.resolve(cwd, source);
	const workspaceRoot = `${cwd}${path.sep}`;

	if (!sourceFilePath.startsWith(workspaceRoot)) {
		throw new Error(`Refusing to read docs source outside workspace: ${entry.importPath}`);
	}

	const sourceMarkdown = source.endsWith('.mdx')
		? await renderMdxMarkdown(sourceFilePath)
		: await renderStoryMarkdown(sourceFilePath, entry);
	const markdown = `${ensurePageHeader(entry, sourceMarkdown)}\n`;

	return {
		id: entry.id,
		title: entry.title,
		label: titleToLabel(entry.title),
		section: sectionForTitle(entry.title),
		source,
		route: docsRoute(entry.id),
		url: docsUrl(baseUrl, entry.id),
		markdownRoute: markdownRoute(entry.id),
		markdownUrl: markdownUrl(baseUrl, entry.id),
		storybookUrl: storybookUrl(baseUrl, entry.id),
		summary: summarizeMarkdown(markdown, `Documentation page for ${entry.title}.`),
		markdown,
		order: entry.order,
	};
}

function llmsSummary(page, baseUrl) {
	const base = normalizeBaseUrl(baseUrl);
	return page.summary.replace(/\]\((\/(?:docs\/[^)#]+\.md|llms-full\.txt)(?:#[^)]+)?)\)/g, `](${base}$1)`);
}

function renderLlmsEntry(page, baseUrl) {
	return `- [${llmsLabel(page)}](${page.markdownUrl}): ${llmsSummary(page, baseUrl)}`;
}

function llmsPageBuckets(pages) {
	const startHerePages = pages
		.filter(isStartHerePage)
		.sort((left, right) => startHerePriority(left) - startHerePriority(right) || compareEntries(left, right));

	const startHereIds = new Set(startHerePages.map(page => page.id));
	const groupedSections = groupBySection(pages.filter(page => !startHereIds.has(page.id))).sort(([left], [right]) => {
		const priorityDiff = sectionPriority(left) - sectionPriority(right);
		return priorityDiff || left.localeCompare(right);
	});

	return [
		{ name: 'Start here', pages: startHerePages },
		...groupedSections.map(([section, group]) => {
			return {
				name: sectionHeading(section),
				pages: group.slice().sort(compareEntries),
			};
		}),
	];
}

function validationSectionBuckets(pages) {
	return llmsPageBuckets(pages).map(bucket => ({
		name: bucket.name,
		labels: bucket.pages.map(llmsLabel),
	}));
}

function renderLlmsTxt(pages, baseUrl = DEFAULT_BASE_URL) {
	const sections = llmsPageBuckets(pages)
		.map(bucket => {
			if (bucket.pages.length === 0) return '';

			const links = bucket.pages.map(page => renderLlmsEntry(page, baseUrl)).join('\n');
			return `## ${bucket.name}\n\n${links}`;
		})
		.filter(Boolean)
		.join('\n\n');

	const fullDocumentationSection = `## Full documentation\n\n- [llms-full.txt](${normalizeBaseUrl(baseUrl)}/llms-full.txt): Complete export of all public Storybook docs pages.`;

	return `# BCC Component Library\n\n> Vue 3 component library built on PrimeVue and BCC design tokens.\n\n${sections}\n\n${fullDocumentationSection}\n`;
}

function renderLlmsFullTxt(pages) {
	const contents = pages
		.slice()
		.sort(compareEntries)
		.map(page => {
			return `---\n\n${page.markdown.trim()}\n\nMarkdown URL: ${page.markdownUrl}\nStorybook URL: ${page.storybookUrl}`;
		})
		.join('\n\n');

	return `# BCC Component Library Full Documentation\n\n> Complete AI-ready Markdown export for all public Storybook docs pages.\n\n${contents}\n`;
}

async function removeStaleGeneratedMarkdown(outputDir) {
	const rootEntries = await readdir(outputDir, { withFileTypes: true }).catch(() => []);

	await Promise.all(
		rootEntries
			.filter(entry => entry.isFile() && entry.name.endsWith('--docs.md'))
			.map(entry => unlink(path.join(outputDir, entry.name)))
	);

	const docsDir = path.join(outputDir, 'docs');
	const docsEntries = await readdir(docsDir, { withFileTypes: true }).catch(() => []);

	await Promise.all(
		docsEntries
			.filter(entry => entry.isFile() && entry.name.endsWith('.md'))
			.map(entry => unlink(path.join(docsDir, entry.name)))
	);
}

async function writeOutputs(outputDir, pages, baseUrl) {
	const docsDir = path.join(outputDir, 'docs');
	await mkdir(docsDir, { recursive: true });
	await removeStaleGeneratedMarkdown(outputDir);

	const llmsTxt = renderLlmsTxt(pages, baseUrl);
	const llmsFullTxt = renderLlmsFullTxt(pages);

	await Promise.all([
		writeFile(path.join(outputDir, 'llms.txt'), llmsTxt, 'utf8'),
		writeFile(path.join(outputDir, 'llms-full.txt'), llmsFullTxt, 'utf8'),
		...pages.map(page => writeFile(path.join(docsDir, `${page.id}.md`), `${UTF8_BOM}${page.markdown}`, 'utf8')),
	]);

	return { llmsTxt, llmsFullTxt };
}

async function main() {
	const cwd = process.cwd();
	const outputDir = path.resolve(cwd, process.env.STORYBOOK_OUT_DIR ?? DEFAULT_OUTPUT_DIR);
	const baseUrl = normalizeBaseUrl(process.env.LLMS_BASE_URL ?? DEFAULT_BASE_URL);
	const indexJsonPath = path.join(outputDir, 'index.json');
	const rawIndex = await readFile(indexJsonPath, 'utf8').catch(error => {
		throw new Error(`Unable to read ${indexJsonPath}. Run Storybook build before generating AI docs. ${error.message}`);
	});
	const manifest = JSON.parse(rawIndex);
	const entries = Object.values(manifest.entries ?? {}).map((entry, order) => ({ ...entry, order }));
	const docsEntries = entries.filter(isPublicDocsEntry).sort(compareEntries);
	const pages = await Promise.all(docsEntries.map(entry => renderPage(entry, cwd, baseUrl)));

	const outputs = await writeOutputs(outputDir, pages, baseUrl);
	await validateGeneratedOutputs({
		outputDir,
		pages,
		baseUrl,
		...outputs,
		sectionBuckets: validationSectionBuckets(pages),
	});

	console.log(`Generated AI docs in ${outputDir}`);
	console.log(`Base URL: ${baseUrl}`);
	console.log(`Docs pages: ${pages.length}`);
	console.log('Outputs: llms.txt, llms-full.txt, docs/*.md');
	console.log('Quality check: passed');
}

export { cleanInlineMarkdown, extractStoryDefinitions, mdxToMarkdown, renderStoryContentMarkdown, renderStoryMarkdown };

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	main().catch(error => {
		console.error(error);
		process.exitCode = 1;
	});
}
