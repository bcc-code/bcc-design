import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Auxiliary Vite build that produces ONLY the CSS extracted from SFC <style>
 * blocks in src/components/**\/*.vue.
 *
 * Why a separate config: the main build (vite.config.ts) outputs one combined
 * dist/index.css containing tokens, Tailwind, and SFC styles, which is what
 * Option 2 (`style.css`) consumers want. For Option 1 (`theme.css`) we want
 * just the SFC styles as a standalone file so we can @import it without
 * duplicating the tokens/preflight/etc. that theme.css already provides.
 *
 * The entry imports each .vue file via import.meta.glob so the @vitejs/plugin-vue
 * extracts every SFC <style> block; the @tailwindcss/vite plugin is included
 * so @apply / @reference inside scoped styles still resolve. The companion JS
 * chunk produced by this lib build is unused and harmless.
 */
export default defineConfig({
	plugins: [vue(), tailwindcss()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		emptyOutDir: false,
		outDir: 'dist',
		lib: {
			entry: resolve(__dirname, 'src/sfc-styles-entry.ts'),
			name: 'BccSfcStyles',
			fileName: 'sfc-styles',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue', /^primevue(\/.*)?$/, /^@bcc-code\/.+/],
			output: {
				assetFileNames: 'sfc-styles.css',
			},
			// Don't tree-shake the SFC modules; we want every component's <style>
			// side-effect import preserved so its CSS ends up in the output bundle.
			treeshake: false,
		},
		cssCodeSplit: false,
	},
});
