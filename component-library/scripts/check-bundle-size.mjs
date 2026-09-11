#!/usr/bin/env node
/**
 * Guards the tree-shakeability of the published ES build (issue #369).
 *
 * A consumer that imports one small component should pay for that component and
 * nothing else. That property is easy to break by accident — dropping
 * `sideEffects` from package.json, or going back to a single-file bundle, puts
 * ~760 kB of unused PrimeVue styles and theme tokens into every consumer bundle
 * again — and nothing else in CI would notice.
 *
 * How it works: bundle two tiny apps with Vite, one importing only `BccBadge`
 * from the built `dist`, one importing nothing from the library at all. The
 * difference is what the library actually costs. Comparing against a Vue-only
 * baseline rather than an absolute number keeps the check stable across Vue
 * upgrades.
 *
 * Expected to run AFTER `pnpm run build:vite`.
 * Usage: node scripts/check-bundle-size.mjs
 */

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

/**
 * Budget for the library's own contribution to a single-small-component bundle.
 * At the time of writing `BccBadge` costs ~3.5 kB on top of Vue; the headroom
 * absorbs normal growth while still catching a collapse back to no
 * tree-shaking, which costs three orders of magnitude more.
 */
const BUDGET_BYTES = 40 * 1024;

/**
 * The probe app has to resolve the library the way a real consumer does, by
 * package name, so that the `exports` map and — crucially — the `sideEffects`
 * field are honoured. A path alias would bypass both. So stage the built
 * package under our own node_modules and import it from a directory inside the
 * project, where its dependencies resolve.
 */
const PROBE_PACKAGE = '@bcc-code/component-library-tree-shake-probe';
const probePackageDir = join(projectRoot, 'node_modules', PROBE_PACKAGE);
const probeAppDir = join(projectRoot, 'node_modules', '.bundle-size-probe');

const distDir = join(projectRoot, 'dist');
if (!existsSync(join(distDir, 'index.js'))) {
	console.error('check-bundle-size: dist/index.js not found. Run `pnpm run build:vite` first.');
	process.exit(1);
}

const packageJson = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));

function stageProbe() {
	rmSync(probePackageDir, { recursive: true, force: true });
	rmSync(probeAppDir, { recursive: true, force: true });
	mkdirSync(probePackageDir, { recursive: true });
	mkdirSync(join(probeAppDir, 'src'), { recursive: true });

	cpSync(distDir, join(probePackageDir, 'dist'), { recursive: true });
	writeFileSync(
		join(probePackageDir, 'package.json'),
		JSON.stringify(
			{
				name: PROBE_PACKAGE,
				version: packageJson.version,
				type: 'module',
				sideEffects: packageJson.sideEffects,
				module: packageJson.module,
				exports: { '.': { import: { default: packageJson.module } } },
			},
			null,
			2,
		),
	);

	writeFileSync(
		join(probeAppDir, 'src', 'baseline.js'),
		["import { createApp, h } from 'vue';", "createApp({ render: () => h('div', 'hi') }).mount('#app');", ''].join(
			'\n',
		),
	);
	writeFileSync(
		join(probeAppDir, 'src', 'one-component.js'),
		[
			"import { createApp, h } from 'vue';",
			`import { BccBadge } from '${PROBE_PACKAGE}';`,
			"createApp({ render: () => h(BccBadge, null, () => 'hi') }).mount('#app');",
			'',
		].join('\n'),
	);
}

async function bundleSize(entry) {
	const outDir = join(probeAppDir, `out-${entry}`);
	await build({
		root: probeAppDir,
		configFile: false,
		logLevel: 'error',
		build: {
			outDir,
			emptyOutDir: true,
			rollupOptions: { input: join(probeAppDir, 'src', `${entry}.js`) },
		},
	});

	const assets = join(outDir, 'assets');
	return readdirSync(assets)
		.filter((file) => file.endsWith('.js'))
		.reduce((total, file) => total + statSync(join(assets, file)).size, 0);
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;

try {
	stageProbe();

	const baseline = await bundleSize('baseline');
	const oneComponent = await bundleSize('one-component');
	const libraryCost = oneComponent - baseline;

	console.log(`check-bundle-size: Vue-only baseline      ${kb(baseline)}`);
	console.log(`check-bundle-size: baseline + BccBadge    ${kb(oneComponent)}`);
	console.log(`check-bundle-size: library contribution   ${kb(libraryCost)} (budget ${kb(BUDGET_BYTES)})`);

	if (libraryCost > BUDGET_BYTES) {
		console.error(
			[
				'',
				`check-bundle-size: FAILED — importing a single component pulls in ${kb(libraryCost)},`,
				`over the ${kb(BUDGET_BYTES)} budget. The ES build is no longer tree-shakeable.`,
				'',
				'Most likely causes:',
				'  - package.json lost its "sideEffects" field',
				'  - vite.config.ts lost `output.preserveModules` (a single-file bundle cannot be shaken)',
				'  - a new module-level side effect became reachable from src/index.ts',
				'',
				'See https://github.com/bcc-code/bcc-design/issues/369',
			].join('\n'),
		);
		process.exit(1);
	}

	console.log('check-bundle-size: OK');
} finally {
	rmSync(probePackageDir, { recursive: true, force: true });
	rmSync(probeAppDir, { recursive: true, force: true });
}
