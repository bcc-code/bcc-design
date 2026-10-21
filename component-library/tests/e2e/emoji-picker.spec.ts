import { expect, test } from '@playwright/test';

// Needs real clicks: the reopen bug depended on how the browser runs microtasks during a click.
test('emoji picker popover toggles and reopens', async ({ page }) => {
	await page.goto('/iframe.html?id=custom-input-bccemojipicker--popover&viewMode=story');
	const button = page.getByLabel('Insert emoji');
	const popover = page.locator('.bcc-emoji-picker-popover');
	// A popover that closes straight away is still visible while it fades out, so check after the transition.
	const isOpenAfterClick = async () => {
		await button.click();
		await page.waitForTimeout(500);
		return popover.isVisible();
	};

	expect(await isOpenAfterClick()).toBe(true);
	expect(await isOpenAfterClick()).toBe(false);
	expect(await isOpenAfterClick()).toBe(true);

	await page.locator('textarea').click();
	await expect(popover).toBeHidden();
	expect(await isOpenAfterClick()).toBe(true);
});
