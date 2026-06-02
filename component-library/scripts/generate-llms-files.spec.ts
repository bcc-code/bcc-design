import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
	cleanInlineMarkdown,
	extractStoryDefinitions,
	mdxToMarkdown,
	renderStoryContentMarkdown,
} from './generate-llms-files.mjs';

function storyMarkdown(relativePath: string, storyName: string): string {
	const source = readFileSync(new URL(relativePath, import.meta.url), 'utf8');
	const story = extractStoryDefinitions(source).find(definition => definition.name === storyName);

	if (!story) {
		throw new Error(`Missing story ${storyName} in ${relativePath}`);
	}

	return renderStoryContentMarkdown(story, { includeHeading: true });
}

function expectVueCodeBlock(markdown: string) {
	expect(markdown).toContain('```vue');
	expect(markdown).not.toMatch(/^> Visual example:/m);
}

describe('llms Storybook story code examples', () => {
	test('labels tw table columns as Tailwind in generated markdown', () => {
		const markdown = storyMarkdown('../docs/foundations/Typography.stories.ts', 'HeadingScale');

		expect(markdown).toContain('| Token | Tailwind |');
		expect(markdown).not.toContain('| Token | Tw |');
	});

	test('uses parameters.docs.source.code when present', () => {
		const markdown = storyMarkdown('../src/components/wrapped/BccMessage.stories.ts', 'Severities');

		expectVueCodeBlock(markdown);
		expect(markdown).toContain('<template>');
		expect(markdown).toContain('<BccMessage severity="success" icon>');
	});

	test('falls back to a simple Vue template when source.code is missing', () => {
		const markdown = storyMarkdown('../src/stories/primevue/Card.stories.ts', 'ContentOnly');

		expectVueCodeBlock(markdown);
		expect(markdown).toContain('<BccCard>');
		expect(markdown).toContain('<template #content>');
	});

	test('preserves bindings, events, classes, and helper setup context', () => {
		const markdown = storyMarkdown('../src/stories/primevue/Toast.stories.ts', 'AllSeverities');

		expectVueCodeBlock(markdown);
		expect(markdown).toContain('const toast = useToast();');
		expect(markdown).toContain("const show = (severity: 'success' | 'info' | 'warn' | 'error')");
		expect(markdown).toContain('class="flex flex-wrap gap-2"');
		expect(markdown).toContain('@click="show(\'success\')"');
	});

	test('includes args before generated template code', () => {
		const markdown = storyMarkdown('../src/components/wrapped/BccButton.stories.ts', 'Default');

		expectVueCodeBlock(markdown);
		expect(markdown).toContain("- Args: label: 'Default', icon: CheckIcon");
		expect(markdown.indexOf('- Args:')).toBeLessThan(markdown.indexOf('```vue'));
		expect(markdown).toContain('<BccButton v-bind="args" />');
	});

	test('documents BccTreeSelect v-model, options, selectionMode args, and setup context', () => {
		const markdown = storyMarkdown('../src/stories/primevue/TreeSelect.stories.ts', 'Multiple');

		expectVueCodeBlock(markdown);
		expect(markdown).toContain("selectionMode: 'multiple'");
		expect(markdown).toContain('const selected = ref<Record<string, boolean>>({});');
		expect(markdown).toContain('const nodes = [');
		expect(markdown).toContain('v-model="selected"');
		expect(markdown).toContain(':options="nodes"');
	});

	test('keeps story code fences inserted into MDX separate from HTML conversion', () => {
		const markdown = mdxToMarkdown('<Story of={Stories.Example} />', {
			storyMarkdownByRef: new Map([
				[
					'Stories.Example',
					'```vue\n<a :href="base + item.file + \'.svg\'"><img :src="base + item.file + \'.svg\'" /></a>\n```',
				],
			]),
		});

		expect(markdown).toContain('```vue');
		expect(markdown).toContain('<a :href="base + item.file + \'.svg\'">');
		expect(markdown).not.toContain('](base + item.file');
	});

	test('renders do/don\'t guidance as structured sections with code snippets', () => {
		const markdown = storyMarkdown('../docs/foundations/Elevation.stories.ts', 'DoPairing');

		expect(markdown).toContain('**Do**');
		expect(markdown).toContain("**Don't**");
		expect(markdown).toContain('```html');
		expect(markdown).toContain('box-shadow: var(--elevation-shadow-raised)');
		expect(markdown).toContain('Always pair raised and overlay surfaces with their shadow token.');
		expect(markdown).toContain("Don't use raised or overlay surfaces without their paired shadow.");
		expect(markdown).not.toContain('| Do | Don\'t |');
	});
});

describe('llms prose sanitizer', () => {
	test('removes nested script and style blocks from MDX/HTML prose', () => {
		const markdown = mdxToMarkdown(
			'<div>Safe<script>alert(1)<script>alert(2)</script></script><style>.x{}</style><p>Text</p></div>'
		);

		expect(markdown).toBe('Safe\nText');
		expect(markdown).not.toContain('alert');
		expect(markdown).not.toContain('<script');
	});

	test('strips HTML-like tags, event attributes, and comments while preserving text', () => {
		const text = cleanInlineMarkdown(
			'Before <img src=x onerror="alert(1)"><span><strong>After</strong></span><!-- hidden -->'
		);

		expect(text).toBe('Before After');
		expect(text).not.toContain('onerror');
		expect(text).not.toContain('hidden');
	});
});
