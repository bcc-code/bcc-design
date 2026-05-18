#!/usr/bin/env node
/**
 * Copies self-hosted Archivo @font-face CSS and woff2 assets to dist/ for the
 * package export `@bcc-code/component-library-vue/archivo-font.css`.
 *
 * Expected to run as part of `build:vite` after `rimraf dist` and the Vite build.
 */

import { cpSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_STYLES = join(ROOT, 'src', 'styles');
const DIST = join(ROOT, 'dist');

mkdirSync(DIST, { recursive: true });
cpSync(join(SRC_STYLES, 'archivo-font.css'), join(DIST, 'archivo-font.css'));
cpSync(join(SRC_STYLES, 'archivo-font'), join(DIST, 'archivo-font'), { recursive: true });
console.warn('Copied dist/archivo-font.css and dist/archivo-font/');
