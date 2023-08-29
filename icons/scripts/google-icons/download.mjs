/**
 * Download SVGs from Google Fonts
 * 
 * Based on the script from https://github.com/marella/material-design-icons/blob/main/scripts/svg.js
 * 
 * Reason for not using the original script:
 * We only need one set (the rounded 500) not all of them
 */

import isSvg from 'is-svg';
import * as fs from 'node:fs/promises';
import path from 'node:path';

import { getVersions } from './metadata.mjs';
import {
  downloadAll,
  map,
  mkdirs,
  remove,
  walk
} from './utils.mjs';

/**
 * 
 * @param {string} dir   'svg'
 * @param {string} style 'outlined', 'rounded', 'sharp' 
 * @param {object} axes  { fill: '0..1', weight: '500', grade: '0', size: '24' }  
 */
async function downloadSvgs(dir, style, axes) {
  // Remvoe dir if exists and recreate it
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir);

  const styleDirs = {
    [style]: path.resolve(dir, style),
  };
  const dirs = Object.values(styleDirs);
  await mkdirs(dirs);
  console.log('Fetching metadata');
  const versions = await getVersions('symbols');
  const downloads = getDownloads(versions, styleDirs, axes);
  console.log('::group::Downloading SVGs');
  await downloadAll(downloads, { ignoreExisting: true });
  console.log('::endgroup::');
  await checkSvgs(dirs);
  console.log('Done');
};

const getDownloads = (versions, styleDirs, axes) => {
  const variations = [];
  for (const fill of [0, 1]) {
    const suffix = fill === 0 ? '' : '-fill';
    variations.push({ axes: { ...axes, fill }, suffix });
  }
  const downloads = [];
  for (const [style, dir] of Object.entries(styleDirs)) {
    const theme = style.replaceAll('filled', '').replaceAll('-', '').trim();
    for (const [icon, version] of Object.entries(versions)) {
      const url = (axes) => {
        if (!axes) {
          return `https://fonts.gstatic.com/s/i/materialicons${theme}/${icon}/v${version}/24px.svg`;
        }
        let { fill, weight, size } = axes;
        fill = fill === 0 ? '' : `fill${fill}`;
        weight = weight === 400 ? '' : `wght${weight}`;
        axes = weight + fill || 'default';
        return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbols${theme}/${icon}/${axes}/${size}px.svg`;
      };
      for (const { axes, suffix } of variations) {
        const file = path.resolve(dir, `${icon}${suffix}.svg`);
        downloads.push([url(axes), file]);
      }
    }
  }
  return downloads;
};

const checkSvgs = async (dirs) => {
  console.log('Checking SVGs');
  await map(dirs, async (dir) => {
    await walk(dir, async (file) => {
      if (await isSvgFile(file)) {
        return;
      }
      await remove(file);
    });
  });
};

const isSvgFile = async (file) => {
  if (!file.endsWith('.svg')) {
    return false;
  }
  const svg = (await fs.readFile(file)).toString();
  return svg.startsWith('<svg') && svg.endsWith('</svg>') && isSvg(svg);
};

downloadSvgs('svg', 'rounded', {
  fill: '0..1',
  weight: '500',
  grade: '0',
  size: '24',
})