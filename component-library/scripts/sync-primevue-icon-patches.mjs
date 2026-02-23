#!/usr/bin/env node
/**
 * Reads the main @primevue/icons index.mjs in the pnpm patch dir and, for each
 * icon that is re-exported from @bcc-code/icons-vue, writes that icon's
 * index.mjs to use the bcc-code component (same pattern as chevrondown).
 *
 * Run after editing node_modules/.pnpm_patches/@primevue/icons@4.5.4/index.mjs
 * so that direct imports like @primevue/icons/chevrondown also get the bcc icon.
 *
 * Usage: PATCH_ICONS_ROOT=/path/to/.pnpm_patches/@primevue/icons@4.5.4 node scripts/sync-primevue-icon-patches.mjs
 * Default path: <project>/node_modules/.pnpm_patches/@primevue/icons@4.5.4
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const defaultPatchRoot = join(projectRoot, 'node_modules', '.pnpm_patches', '@primevue', 'icons@4.5.4');
const patchRoot = process.env.PATCH_ICONS_ROOT || defaultPatchRoot;

const mainIndexPath = join(patchRoot, 'index.mjs');
if (!existsSync(mainIndexPath)) {
	console.warn('sync-primevue-icon-patches: main index not found at', mainIndexPath);
	console.warn('Set PATCH_ICONS_ROOT or run from repo root after pnpm patch @primevue/icons');
	process.exit(1);
}

const content = readFileSync(mainIndexPath, 'utf8');
const bccRe = /export\s+\{\s*(\w+)\s+as\s+(\w+)\s+\}\s+from\s+'@bcc-code\/icons-vue'/g;
const overrides = [];
let m;
while ((m = bccRe.exec(content)) !== null) {
	overrides.push({ bccName: m[1], primeVueName: m[2] });
}

function primeVueNameToFolder(name) {
	if (!name.endsWith('Icon')) return name.toLowerCase();
	return name.slice(0, -4).replace(/([A-Z])/g, (c) => c.toLowerCase());
}

const template = (bccName, primeVueName) =>
	`import BaseIcon from '@primevue/icons/baseicon';
import { h } from 'vue';
import { ${bccName} } from '@bcc-code/icons-vue';

var script = {
  name: '${primeVueName}',
  "extends": BaseIcon
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return h(${bccName}, _ctx.pti());
}

script.render = render;

export { script as default };
`;

let written = 0;
for (const { bccName, primeVueName } of overrides) {
	const folder = primeVueNameToFolder(primeVueName);
	const dir = join(patchRoot, folder);
	const filePath = join(dir, 'index.mjs');
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}
	writeFileSync(filePath, template(bccName, primeVueName));
	written++;
}

console.log('sync-primevue-icon-patches: wrote', written, 'icon index.mjs files under', patchRoot);
