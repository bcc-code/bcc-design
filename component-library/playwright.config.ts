import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests/e2e',
	timeout: 30_000,
	retries: 0,
	use: {
		baseURL: 'http://localhost:6099',
		headless: true,
	},
	webServer: {
		command: 'npx http-server storybook-static -p 6099 -s',
		port: 6099,
		reuseExistingServer: true,
		timeout: 10_000,
	},
	projects: [
		{
			name: 'chromium',
			use: { browserName: 'chromium' },
		},
	],
});
