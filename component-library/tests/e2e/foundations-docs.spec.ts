import { expect, test } from '@playwright/test';

/**
 * Smoke tests for Foundations documentation pages.
 * Each test loads a --docs page via the Storybook iframe URL and verifies it
 * renders without errors.
 */

const docsPages = [
	'ai-tools-llms-txt--docs',
	'foundations-overview--docs',
	'foundations-colors--docs',
	'foundations-typography--docs',
	'foundations-spacing--docs',
	'foundations-elevation--docs',
	'foundations-border--docs',
	'foundations-radius--docs',
	'foundations-icons--docs',
	'foundations-logos--docs',
	'foundations-token-reference--docs',
	'foundations-visual-identity--docs',
	'foundations-tokens--docs',
];

docsPages.forEach((pageId) => {
	test(`${pageId} loads without errors`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (err) => errors.push(err.message));

		await page.goto(`/iframe.html?id=${pageId}&viewMode=docs`, {
			waitUntil: 'networkidle',
		});

		// Page should contain rendered content (not a blank page)
		const body = page.locator('body');
		await expect(body).not.toBeEmpty();

		// Storybook docs root should be present
		const docsRoot = page.locator('#storybook-docs');
		await expect(docsRoot).toBeVisible({ timeout: 15_000 });

		// Should have at least one heading
		const headings = page.locator('#storybook-docs h1, #storybook-docs h2, #storybook-docs h3');
		await expect(headings.first()).toBeVisible({ timeout: 10_000 });

		// No JavaScript errors should have occurred
		expect(errors).toEqual([]);
	});
});

test('Storybook .md docs path redirects to the generated Markdown file', async ({ page }) => {
	await page.goto('/?path=/docs/readme--docs.md');

	await expect(page).toHaveURL(/\/docs\/readme--docs\.md$/);
	const response = await page.request.get(page.url());
	expect(response.headers()['content-type']).toContain('text/markdown');
	expect(await response.text()).toContain('# @bcc-code/component-library-vue');
});

test('Storybook llms query paths redirect to the generated llms files', async ({ page }) => {
	for (const llmsPath of ['/llms.txt', '/llms-full.txt']) {
		await page.goto(`/?path=${encodeURIComponent(llmsPath)}`);

		await expect(page).toHaveURL(new RegExp(`${llmsPath.replace('.', '\\.').replace('/', '\\/')}$`));
		const response = await page.request.get(page.url());
		expect(response.headers()['content-type']).toContain('text/plain');
		expect(await response.text()).toContain('# BCC Component Library');
	}
});

test('LLMS docs page links point directly to raw llms files', async ({ page }) => {
	await page.goto('/?path=/docs/ai-tools-llms-txt--docs', { waitUntil: 'networkidle' });

	const frame = page.frame({ url: /iframe\.html/ });
	expect(frame).not.toBeNull();

	for (const llmsPath of ['/llms.txt', '/llms-full.txt']) {
		const link = frame!.locator(`#storybook-docs a[href="${llmsPath}"]`);
		await expect(link).toHaveAttribute('target', '_top');
	}
});

test('docs pages show the markdown actions menu beside the title', async ({ page }) => {
	for (const pageId of ['ai-tools-llms-txt--docs', 'foundations-overview--docs']) {
		await page.goto(`/?path=/docs/${pageId}`, { waitUntil: 'networkidle' });

		const frame = page.frame({ url: /iframe\.html/ });
		expect(frame).not.toBeNull();

		const headerRow = frame!.locator('.bcc-docs-header-row').first();
		await expect(headerRow).toBeVisible();

		const actions = headerRow.locator('[data-markdown-url]').first();
		await expect(actions).toHaveAttribute('data-markdown-url', new RegExp(`/docs/${pageId.replace('.', '\\.')}\\.md$`));
		await expect(actions.locator('.bcc-docs-markdown-trigger')).toBeVisible();

		await actions.locator('.bcc-docs-markdown-trigger').click();
		await expect(actions.locator('[data-action="copy-markdown"]')).toBeVisible();
		await expect(actions.locator('[data-action="copy-link"]')).toBeVisible();
		await expect(actions.locator('[data-action="open-github"]')).toBeVisible();
		await expect(actions.locator('[data-action="open-chatgpt"]')).toBeVisible();
		await expect(actions.locator('[data-action="open-claude"]')).toBeVisible();
	}
});

test('generated markdown files preserve UTF-8 punctuation in the browser', async ({ page }) => {
	await page.goto('/docs/readme--docs.md');

	await expect(page.locator('body')).toContainText("project’s **`.npmrc`**");
	await expect(page.locator('body')).not.toContainText("projectâ€™s **`.npmrc`**");
});

// ── Story embed tests ──────────────────────────────────────

const storyEmbeds = [
	{ id: 'foundations-colors-demos--color-roles', selector: '.rounded-full' },
	{ id: 'foundations-spacing-demos--spacing-ruler', selector: '.spacing-indicator' },
	{ id: 'foundations-elevation-demos--elevation-levels', selector: '.bg-elevation-surface-sunken-default' },
	{ id: 'foundations-elevation-demos--surface-tokens', selector: '.color-swatch' },
	{ id: 'foundations-elevation-demos--shadow-tokens', selector: '.color-swatch' },
	{ id: 'foundations-token-reference-demos--color-text', selector: '.color-swatch' },
	{ id: 'foundations-token-reference-demos--elevation-shadow', selector: '.color-swatch' },
	{ id: 'foundations-radius-demos--tokens-table', selector: '.color-swatch' },
	{ id: 'foundations-typography-demos--heading-scale', selector: '.color-swatch' },
];

storyEmbeds.forEach(({ id, selector }) => {
	test(`story ${id} renders expected elements`, async ({ page }) => {
		await page.goto(`/iframe.html?id=${id}&viewMode=story`, {
			waitUntil: 'networkidle',
		});

		const el = page.locator(selector).first();
		await expect(el).toBeVisible({ timeout: 10_000 });
	});
});
