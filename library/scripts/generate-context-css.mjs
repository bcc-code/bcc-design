#!/usr/bin/env node
/**
 * Generates context.css from exported Figma mode token files (src/figma-modes).
 * Each mode file defines ctx-* tokens; we resolve them to primitive/semantic
 * variable names and output CSS classes .ctx-{name} with --ctx-* custom properties.
 *
 * Variable names from aliasData (e.g. "color/text/inverse") become var(--color-text-inverse).
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const FIGMA_MODES_DIR = join(ROOT, 'src/figma-modes');
const OUT_CSS_PATH = join(ROOT, 'src/styles/contexts.css');

/** Slash to hyphen for CSS custom property names: "color/text/inverse" → "color-text-inverse" */
function toCssVarName(variableName) {
  return variableName.replace(/\//g, '-');
}

/**
 * Resolve a ctx token key to the primitive/semantic variable name.
 * Uses aliasData.targetVariableName when present; otherwise follows {ctx-xxx} references.
 */
function resolveTokenToVariableName(tokens, key, visited = new Set()) {
  if (visited.has(key)) return null;
  const node = tokens[key];
  if (!node || typeof node !== 'object') return null;

  const alias = node.$extensions?.['com.figma.aliasData']?.targetVariableName;
  if (alias) return alias;

  const value = node.$value;
  if (typeof value === 'string' && /^\{([^}]+)\}$/.test(value)) {
    const ref = value.slice(1, -1).trim();
    visited.add(key);
    const resolved = resolveTokenToVariableName(tokens, ref, visited);
    visited.delete(key);
    return resolved;
  }
  return null;
}

/** Build a map of every ctx-* key → resolved variable name (or null). */
function resolveAllTokens(tokens) {
  const resolved = {};
  for (const key of Object.keys(tokens)) {
    if (key.startsWith('ctx-') && key !== '$extensions') {
      const name = resolveTokenToVariableName(tokens, key);
      if (name) resolved[key] = name;
    }
  }
  return resolved;
}

/**
 * Derive the context class name from mode name and optional folder.
 * - "accent-blue-subtler" → "ctx-blue-subtler"
 * - "information-bolder" → "ctx-info-bolder"
 * - "brand-bolder" → "ctx-brand-bolder"
 */
function modeToContextClass(modeName) {
  let name = modeName;
  if (name.startsWith('accent-')) name = name.slice(7);
  if (name.startsWith('information')) name = 'info' + name.slice(11);
  return `ctx-${name}`;
}

/** Emit @utility block for one context (base + hover/pressed vars). */
function emitUtilityBlock(ctxClass, resolved) {
  const var_ = (key) => {
    const v = resolved[key];
    return v ? `var(--${toCssVarName(v)})` : null;
  };

  const baseKeys = [
    'ctx-text',
    'ctx-background',
    'ctx-border',
    'ctx-shadow',
    'ctx-gradient',
    'ctx-background-hover',
    'ctx-background-pressed',
    'ctx-text-hover',
    'ctx-text-pressed',
    'ctx-border-hover',
    'ctx-border-pressed',
  ];
  const decls = baseKeys
    .map((k) => {
      const v = var_(k);
      return v ? `  --${k}: ${v};` : null;
    })
    .filter(Boolean);
  if (decls.length === 0) return '';

  return [`@utility ${ctxClass} {`, ...decls, '}', ''].join('\n');
}

/** Emit component-layer rules for one context (strong/b, clickable:hover, clickable:active). */
function emitComponentRules(ctxClass, resolved) {
  const var_ = (key) => {
    const v = resolved[key];
    return v ? `var(--${toCssVarName(v)})` : null;
  };

  const lines = [];

  // Strong / b: use ctx-text-bold as --ctx-text
  const textBoldVar = var_('ctx-text-bold');
  if (textBoldVar) {
    lines.push(`  .${ctxClass} strong,`);
    lines.push(`  .${ctxClass} b {`);
    lines.push(`    --ctx-text: ${textBoldVar};`);
    lines.push('  }');
    lines.push('');
  }

  // Hover: map base vars to -hover vars
  const hasHover =
    var_('ctx-background-hover') || var_('ctx-text-hover') || var_('ctx-border-hover');
  if (hasHover) {
    lines.push(`  .clickable.${ctxClass}:hover {`);
    if (var_('ctx-background-hover')) lines.push('    --ctx-background: var(--ctx-background-hover);');
    if (var_('ctx-text-hover')) lines.push('    --ctx-text: var(--ctx-text-hover);');
    if (var_('ctx-border-hover')) lines.push('    --ctx-border: var(--ctx-border-hover);');
    lines.push('  }');
    lines.push('');
  }

  // Active (pressed)
  const hasPressed =
    var_('ctx-background-pressed') || var_('ctx-text-pressed') || var_('ctx-border-pressed');
  if (hasPressed) {
    lines.push(`  .clickable.${ctxClass}:active {`);
    if (var_('ctx-background-pressed')) lines.push('    --ctx-background: var(--ctx-background-pressed);');
    if (var_('ctx-text-pressed')) lines.push('    --ctx-text: var(--ctx-text-pressed);');
    if (var_('ctx-border-pressed')) lines.push('    --ctx-border: var(--ctx-border-pressed);');
    lines.push('  }');
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  const collections = readdirSync(FIGMA_MODES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name);

  const contexts = [];

  for (const collection of collections) {
    const collectionPath = join(FIGMA_MODES_DIR, collection);
    const files = readdirSync(collectionPath).filter((f) => f.endsWith('.tokens.json'));

    for (const file of files) {
      const filePath = join(collectionPath, file);
      const raw = readFileSync(filePath, 'utf8');
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.warn('Skip (invalid JSON):', filePath, e.message);
        continue;
      }

      const modeName =
        data.$extensions?.['com.figma.modeName'] ?? file.replace(/\.tokens\.json$/, '');
      const ctxClass = modeToContextClass(modeName);
      const resolved = resolveAllTokens(data);

      if (Object.keys(resolved).length === 0) {
        console.warn('Skip (no ctx-* tokens):', filePath);
        continue;
      }

      contexts.push({ ctxClass, resolved, modeName, file });
    }
  }

  // Sort for stable output: default first, then alphabetical by class name
  contexts.sort((a, b) => {
    if (a.ctxClass === 'ctx-default') return -1;
    if (b.ctxClass === 'ctx-default') return 1;
    return a.ctxClass.localeCompare(b.ctxClass);
  });

  const utilityBlocks = contexts
    .map(({ ctxClass, resolved }) => emitUtilityBlock(ctxClass, resolved))
    .filter(Boolean);

  const componentRules = contexts
    .map(({ ctxClass, resolved }) => emitComponentRules(ctxClass, resolved))
    .filter(Boolean);

  const layerComponents = [
    '@layer components {',
    '  .clickable:disabled,',
    '  .clickable.disabled {',
    '    cursor: not-allowed;',
    '    pointer-events: none;',
    '  }',
    '',
    '  .clickable.flat:hover {',
    '    background: var(--ctx-background);',
    '  }',
    '',
    ...componentRules,
    '}',
  ].join('\n');

  const cssParts = [
    '/* Auto-generated from src/figma-modes. Do not edit by hand. */',
    '/* Run: pnpm run generate:context-css */',
    '',
    ...utilityBlocks,
    layerComponents,
  ];

  const css = cssParts.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
  writeFileSync(OUT_CSS_PATH, css, 'utf8');
  console.log('Wrote', OUT_CSS_PATH, `(${contexts.length} contexts)`);
}

main();
