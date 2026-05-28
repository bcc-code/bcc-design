import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE_URL = 'https://components.bcc.no';
const DEFAULT_OUTPUT_DIR = 'storybook-static';
const EXCLUDED_DOCS_PATTERN =
	/(^|[/\\._-])(private|internal|secret|secrets|node_modules|dist|dist-types|dist-css|coverage|cache|\.cache|storybook-static)($|[/\\._-])/i;

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
	return value
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

function cleanInlineMarkdown(value) {
	return decodeEntities(value)
		.replace(/\{`([^`]+)`\}/g, '`$1`')
		.replace(/\{'([^']+)'\}/g, '$1')
		.replace(/\{"([^"]+)"\}/g, '$1')
		.replace(/[ \t]+\n/g, '\n')
		.replace(/\n[ \t]+/g, '\n')
		.replace(/[ \t]{2,}/g, ' ')
		.trim();
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

function mdxToMarkdown(contents) {
	const codeFences = protectSegments(stripMdxImports(contents), /```[\s\S]*?```/g, 'CODE_FENCE');
	let markdown = codeFences.contents;

	markdown = markdown.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
	markdown = markdown.replace(/<Meta\b[^>]*\/>/gi, '');
	markdown = markdown.replace(/<\/?Unstyled\b[^>]*>/gi, '\n');
	markdown = markdown.replace(/\s+on[A-Z]\w*=\{[^}]*\}/g, '');
	markdown = markdown.replace(/<Story\b[^>]*\bof=\{([^}]+)\}[^>]*\/>/gi, (_, storyRef) => {
		const storyName = String(storyRef).split('.').at(-1) ?? storyRef;
		return `\n\n> Story example: ${humanizeIdentifier(storyName)}\n\n`;
	});
	markdown = markdown.replace(/<img\b([^>]*?)\/?>/gi, (_, attributes) => {
		const src = attributeValue(attributes, 'src');
		if (!src) return '';
		const alt = attributeValue(attributes, 'alt') || 'Image';
		return `\n\n![${cleanInlineMarkdown(alt)}](${normalizeHref(src)})\n\n`;
	});
	markdown = markdown.replace(/<a\b([^>]*?)>([\s\S]*?)<\/a>/gi, (_, attributes, label) => {
		const href = attributeValue(attributes, 'href');
		const text = cleanInlineMarkdown(label.replace(/<[^>]+>/g, ''));
		return href ? `[${text}](${normalizeHref(href)})` : text;
	});
	markdown = markdown.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, (_, code) => `\`${cleanInlineMarkdown(code)}\``);
	const inlineCode = protectSegments(markdown, /`[^`\n]+`/g, 'INLINE_CODE');
	markdown = inlineCode.contents;
	markdown = markdown.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, (_, text) => `**${cleanInlineMarkdown(text)}**`);
	markdown = markdown.replace(/<em\b[^>]*>([\s\S]*?)<\/em>/gi, (_, text) => `_${cleanInlineMarkdown(text)}_`);

	for (const level of [6, 5, 4, 3, 2, 1]) {
		const marker = '#'.repeat(level);
		markdown = markdown.replace(new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, 'gi'), (_, text) => {
			return `\n\n${marker} ${cleanInlineMarkdown(text.replace(/<[^>]+>/g, ''))}\n\n`;
		});
	}

	markdown = markdown.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (_, text) => {
		return `\n- ${cleanInlineMarkdown(text.replace(/<[^>]+>/g, ''))}`;
	});
	markdown = markdown.replace(/<br\s*\/?>/gi, '\n');
	markdown = markdown.replace(/<hr\b[^>]*\/?>/gi, '\n\n---\n\n');
	markdown = markdown.replace(/<\/?(div|span|p|ul|ol|section|article|header|footer|main)\b[^>]*>/gi, '\n');
	markdown = markdown.replace(/<[^>]+>/g, '');
	markdown = decodeEntities(markdown);
	markdown = markdown.replace(/[ \t]+\n/g, '\n');
	markdown = markdown.replace(/\n[ \t]+/g, '\n');
	markdown = markdown.replace(/\n{3,}/g, '\n\n');
	markdown = inlineCode.restore(markdown);
	markdown = codeFences.restore(markdown);

	return markdown.trim();
}

async function renderMdxMarkdown(sourceFilePath) {
	const rawContents = await readFile(sourceFilePath, 'utf8');
	const withRawMarkdown = await inlineRawMarkdownImports(rawContents, sourceFilePath);
	return mdxToMarkdown(withRawMarkdown);
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

function extractObjectAfter(source, marker) {
	const markerIndex = source.indexOf(marker);
	if (markerIndex === -1) return '';

	const start = source.indexOf('{', markerIndex);
	if (start === -1) return '';

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

		if (char === '{') {
			depth += 1;
		} else if (char === '}') {
			depth -= 1;
			if (depth === 0) {
				return source.slice(start + 1, index);
			}
		}
	}

	return '';
}

function extractObjectFromIndex(source, start) {
	if (start === -1 || source[start] !== '{') return '';

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

		if (char === '{') {
			depth += 1;
		} else if (char === '}') {
			depth -= 1;
			if (depth === 0) {
				return source.slice(start + 1, index);
			}
		}
	}

	return '';
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

function normalizeCodeSnippet(snippet) {
	const lines = snippet.replace(/^\n+|\n+$/g, '').split('\n');
	const indents = lines
		.filter(line => line.trim().length > 0)
		.map(line => line.match(/^\s*/)?.[0].length ?? 0);
	const minIndent = indents.length > 0 ? Math.min(...indents) : 0;

	return lines.map(line => line.slice(minIndent)).join('\n').trim();
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
		const controlMatch = definition.match(/control:\s*(?:\{\s*type:\s*(['"`])([\s\S]*?)\1[\s\S]*?\}|(['"`])([\s\S]*?)\3)/);
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

		const wrapped = `{${objectBody}}`;
		const args = extractObjectAfter(wrapped, 'args:');
		const parameters = extractObjectAfter(wrapped, 'parameters:');
		const templates = Array.from(objectBody.matchAll(/template:\s*`([\s\S]*?)`/g)).map(match =>
			normalizeCodeSnippet(match[1])
		);
		const sourceCodes = Array.from(
			objectBody.matchAll(/source:\s*\{[\s\S]*?code:\s*`([\s\S]*?)`[\s\S]*?\}/g)
		).map(match => normalizeCodeSnippet(match[1]));

		definitions.push({
			name: storyName,
			args: args ? cleanInlineMarkdown(args) : '',
			parameters: parameters ? cleanInlineMarkdown(parameters) : '',
			templates: templates.filter(Boolean),
			sourceCodes: sourceCodes.filter(Boolean),
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

async function loadReferencedStorySources(mdxSource, sourceFilePath) {
	const imports = new Set();
	const importPattern =
		/^\s*import\s+(?:[\w*\s{},]+)\s+from\s+['"]([^'"]*\.stories(?:\.[cm]?[jt]sx?)?)['"];?\s*$/gm;
	const extensionlessPattern = /^\s*import\s+(?:[\w*\s{},]+)\s+from\s+['"]([^'"]*\.stories)['"];?\s*$/gm;

	for (const match of mdxSource.matchAll(importPattern)) {
		imports.add(match[1]);
	}

	for (const match of mdxSource.matchAll(extensionlessPattern)) {
		imports.add(match[1]);
	}

	const resolved = [];
	for (const importTarget of imports) {
		const entry = await resolveStoryImportPath(sourceFilePath, importTarget);
		if (entry) resolved.push(entry);
	}

	return resolved;
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
		lines.push(`Autogenerated Storybook documentation for ${entry.title}.`, '');
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
		lines.push('## Props', '', '| Prop | Description | Type | Default | Control | Options |', '| --- | --- | --- | --- | --- | --- |');
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
			lines.push(`### ${humanizeIdentifier(story.name)}`, '');
			if (story.args) {
				lines.push(`- Args: ${story.args}`);
			}
			if (story.parameters) {
				lines.push(`- Parameters: ${story.parameters}`);
			}

			for (const snippet of story.sourceCodes) {
				lines.push('', '```vue', snippet, '```');
			}

			if (story.sourceCodes.length === 0) {
				for (const template of story.templates.slice(0, 1)) {
					lines.push('', '```vue', template, '```');
				}
			}

			lines.push('');
		}
	}

	return lines.join('\n').trim();
}

async function appendReferencedStoriesToMarkdown(markdown, sourceFilePath, entry) {
	const rawContents = await readFile(sourceFilePath, 'utf8');
	const references = await loadReferencedStorySources(rawContents, sourceFilePath);
	if (references.length === 0) return markdown;

	const sections = [];
	for (const reference of references) {
		const relativePath = trimDotSlash(path.relative(process.cwd(), reference.path).replaceAll(path.sep, '/'));
		const storyEntry = {
			...entry,
			title: `${entry.title} (${path.basename(reference.path)})`,
			importPath: relativePath,
		};
		const storyMarkdown = await renderStoryMarkdown(reference.path, storyEntry);
		sections.push(`### ${path.basename(reference.path)}\n\n${storyMarkdown}`);
	}

	if (sections.length === 0) return markdown;
	return `${markdown}\n\n---\n\n## Referenced Story Files\n\n${sections.join('\n\n')}`.trim();
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

	const summary = lines.find(line => !line.startsWith('- ') && !line.startsWith('> Story example:')) ?? fallback;
	return summary.length > 220 ? `${summary.slice(0, 217)}...` : summary;
}

async function renderPage(entry, cwd, baseUrl) {
	const source = trimDotSlash(entry.importPath);
	const sourceFilePath = path.resolve(cwd, source);
	const workspaceRoot = `${cwd}${path.sep}`;

	if (!sourceFilePath.startsWith(workspaceRoot)) {
		throw new Error(`Refusing to read docs source outside workspace: ${entry.importPath}`);
	}

	const sourceMarkdown = source.endsWith('.mdx')
		? await appendReferencedStoriesToMarkdown(await renderMdxMarkdown(sourceFilePath), sourceFilePath, entry)
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

function renderLlmsTxt(pages) {
	const sections = groupBySection(pages)
		.map(([section, group]) => {
			const links = group
				.slice()
				.sort(compareEntries)
				.map(page => `- [${page.label}](${page.markdownUrl}): ${page.summary}`)
				.join('\n');
			return `## ${section}\n\n${links}`;
		})
		.join('\n\n');

	return `# BCC Component Library\n\n> AI-ready Markdown index for the public BCC Component Library documentation.\n\nEach link points to the generated Markdown version of the matching Storybook docs route. HTML docs use \`/docs/{page}\`; Markdown mirrors that route at \`/docs/{page}.md\`.\n\n${sections}\n`;
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

function renderDocsIndex(pages, baseUrl) {
	return `${JSON.stringify(
		{
			name: '@bcc-code/component-library-vue',
			baseUrl,
			source: 'storybook-static/index.json',
			outputs: {
				llms: '/llms.txt',
				llmsFull: '/llms-full.txt',
				docsIndex: '/docs-index.json',
				markdownPages: '/docs/*.md',
			},
			exclusions: ['private/internal/secrets paths', 'env files', 'node_modules', 'build outputs', 'caches'],
			pages: pages
				.slice()
				.sort(compareEntries)
				.map(({ markdown, order, ...page }) => page),
		},
		null,
		2
	)}\n`;
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

	await Promise.all([
		writeFile(path.join(outputDir, 'llms.txt'), renderLlmsTxt(pages), 'utf8'),
		writeFile(path.join(outputDir, 'llms-full.txt'), renderLlmsFullTxt(pages), 'utf8'),
		writeFile(path.join(outputDir, 'docs-index.json'), renderDocsIndex(pages, baseUrl), 'utf8'),
		...pages.map(page => writeFile(path.join(docsDir, `${page.id}.md`), page.markdown, 'utf8')),
	]);
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

	await writeOutputs(outputDir, pages, baseUrl);

	console.log(`Generated AI docs in ${outputDir}`);
	console.log(`Base URL: ${baseUrl}`);
	console.log(`Docs pages: ${pages.length}`);
	console.log('Outputs: llms.txt, llms-full.txt, docs-index.json, docs/*.md');
}

main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
