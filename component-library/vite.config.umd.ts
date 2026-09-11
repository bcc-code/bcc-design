import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { componentDataAttrPlugin } from './vite-plugin-component-attr';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Auxiliary Vite build that produces ONLY the single-file UMD bundle
 * (dist/component-library.umd.cjs) served to `require()` consumers.
 *
 * Why a separate config: the main build (vite.config.ts) uses `preserveModules`
 * so the ES output is tree-shakeable, and Rollup only supports that option for
 * the ES format. UMD is inherently one file, so it cannot be tree-shaken either
 * way — nothing is lost by keeping it as it was.
 *
 * `cssCodeSplit` stays true to match the previous combined build: for non-ES
 * formats Vite inlines the stylesheet into the bundle and injects it at runtime
 * via a <style> tag, so `require()` consumers get styles without importing
 * `style.css` themselves. That costs ~240 kB of duplicated CSS inside the UMD
 * file, but changing it would break those consumers.
 *
 * Because the CSS is inlined, no stylesheet asset is normally emitted here. The
 * `assetFileNames` override is a guard: any asset that does get emitted would
 * otherwise default to `index.css` and clobber the real dist/index.css written
 * by the main build. The renamed copy is deleted by the `build:umd` script.
 */
export default defineConfig({
	plugins: [componentDataAttrPlugin(), vue(), tailwindcss()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		emptyOutDir: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'BccComponentLibrary',
			fileName: 'component-library',
			formats: ['umd'],
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				exports: 'named',
				globals: {
					vue: 'Vue',
				},
				assetFileNames: 'umd-styles.css',
			},
		},
		cssCodeSplit: true,
	},
});
