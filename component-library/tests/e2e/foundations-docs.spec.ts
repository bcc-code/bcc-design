import { test, expect } from '@playwright/test';

/**
 * Smoke tests for Foundations documentation pages.
 * Each test loads a --docs page via the Storybook iframe URL and verifies it
 * renders without errors.
 */

const docsPages = [
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

for (const pageId of docsPages) {
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
}

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

for (const { id, selector } of storyEmbeds) {
	test(`story ${id} renders expected elements`, async ({ page }) => {
		await page.goto(`/iframe.html?id=${id}&viewMode=story`, {
			waitUntil: 'networkidle',
		});

		const el = page.locator(selector).first();
		await expect(el).toBeVisible({ timeout: 10_000 });
	});
}
