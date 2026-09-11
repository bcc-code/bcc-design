import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { componentDataAttrPlugin } from './vite-plugin-component-attr';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Maps a Rollup module id to its output path so the ES build stays tree-shakeable.
 *
 * `preserveModules` emits one file per module instead of one big bundle, which is
 * what makes tree-shaking work for consumers (see the note on the build config
 * below). Rollup's default naming would place bundled dependencies under
 * `dist/node_modules/.pnpm/<pkg>@<version>_<hash>/...`, which is unusable: npm
 * always strips `node_modules` directories from published tarballs, and the
 * `.pnpm` path embeds dependency versions so file paths would churn on every
 * upgrade. Everything from a dependency is therefore re-rooted under `dist/vendor`
 * at its package-relative path.
 *
 * The mapping has to stay injective, or two modules collapse onto one file and
 * Rollup fails with a module importing itself. Two things make ids collide once
 * the path alone is used: a non-`.js` extension (a package shipping both
 * `index.js` and `index.mjs`) and the `?commonjs-*` query suffixes that
 * `@rollup/plugin-commonjs` appends to synthesize helper modules. Both are folded
 * into the file name rather than dropped.
 */
function moduleFileName(id: string): string {
	const [filePath, query] = id.split('?');
	const lastNodeModules = filePath.lastIndexOf('node_modules/');

	// Our own sources (and Rollup's virtual modules) keep Rollup's default naming,
	// which is already relative to `preserveModulesRoot`.
	if (lastNodeModules === -1) {
		return query ? `[name].${sanitizeQuery(query)}.js` : '[name].js';
	}

	// `node_modules/.pnpm/<pkg>@<version>/node_modules/<pkg>/<path>` -> `<pkg>/<path>`
	const packageRelative = filePath.slice(lastNodeModules + 'node_modules/'.length);
	const extension = packageRelative.match(/\.(m|c)?js$/)?.[0];
	const base = extension ? packageRelative.slice(0, -extension.length) : packageRelative;

	const parts = [base];
	// `.js` is the output extension anyway, so only record the others.
	if (extension && extension !== '.js') parts.push(extension.slice(1));
	if (query) parts.push(sanitizeQuery(query));

	return `vendor/${parts.join('.')}.js`;
}

function sanitizeQuery(query: string): string {
	return query.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default defineConfig({
	plugins: [componentDataAttrPlugin(), vue(), tailwindcss()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			// UMD is built separately (vite.config.umd.ts) because `preserveModules`
			// only supports the ES format.
			formats: ['es'],
		},
		rollupOptions: {
			// Only Vue is external; PrimeVue and Tailwind are bundled so consumers need only this lib.
			// PrimeVue in particular must stay bundled: the `@primevue/icons` pnpm patch that swaps
			// in `@bcc-code/icons-vue` only reaches consumers through our own build output.
			external: ['vue'],
			output: {
				exports: 'named',
				// One output file per module. A single-file bundle is not tree-shakeable:
				// PrimeVue's style modules and the theme preset run `BaseStyle.extend()` /
				// `definePreset()` at module top level, and once concatenated those become
				// impure top-level statements a consumer's bundler cannot drop. That put
				// ~785 kB of unused code in every consumer bundle (see issue #369).
				// This only pays off together with `sideEffects` in package.json.
				preserveModules: true,
				preserveModulesRoot: 'src',
				entryFileNames: (chunk) => moduleFileName(chunk.facadeModuleId ?? chunk.name),
				chunkFileNames: 'chunks/[name]-[hash].js',
				assetFileNames: (asset) =>
					asset.names.some((name) => name.endsWith('.css')) ? 'index.css' : 'assets/[name][extname]',
			},
		},
		// Keep every stylesheet in a single dist/index.css, as the `./style.css`
		// export promises. With code splitting the CSS fragments across the
		// per-module output instead.
		cssCodeSplit: false,
	},
});
