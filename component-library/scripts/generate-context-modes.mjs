#!/usr/bin/env node
/**
 * Generates Figma context mode JSON files from light.tokens.json.
 * Each context (default, neutral-subtle, neutral-subtlest, warning, brand-*, accent-*-default, accent-*-bold)
 * gets a mode file that maps ctx-* variables to the correct semantic tokens.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const LIGHT_TOKENS_PATH = join(ROOT, 'src/modes/light.tokens.json');
const MODES_DIR = join(ROOT, 'src/modes');

// Semantic set name for aliasData (Figma variable collection)
const SEMANTIC_SET_ID = 'VariableCollectionId:3c069fd07d1f1e721c71262b40021ae2c49ab1f3/-1:-1';
const SEMANTIC_SET_NAME = 'bcc/semantic';
const PRIMITIVE_SET_ID = 'VariableCollectionId:417c7ac5537f108f00dd75d03fdef006a1a47c4a/-1:-1';
const PRIMITIVE_SET_NAME = 'bcc/primitive';

/** Check if node is a token (has $type and $value) */
function isToken(node) {
  return node && typeof node === 'object' && node.$type === 'color' && node.$value != null;
}

/** Clone token for ctx (use primitive alias for shadow; semantic for others when path given).
 *  For semantic aliases we set only targetVariableName and set IDs so Figma resolves by name
 *  (the token's aliasData.targetVariableId points at the primitive; we want the semantic variable). */
function cloneTokenForCtx(token, semanticPath, usePrimitive = false) {
  if (!token || !token.$value) return null;
  const ext = token.$extensions || {};
  const alias = ext['com.figma.aliasData'];
  const value = token.$value;
  const isRef = typeof value === 'string' && value.startsWith('{');
  const semanticName = semanticPath ? semanticPath.replace(/\./g, '/') : null;
  return {
    $type: 'color',
    $value: isRef ? value : (typeof value === 'object' && value.hex ? { ...value } : value),
    $extensions: {
      'com.figma.variableId': ext['com.figma.variableId'],
      'com.figma.scopes': ['ALL_SCOPES'],
      'com.figma.isOverride': true,
      ...(semanticName && !usePrimitive
        ? {
            'com.figma.aliasData': {
              targetVariableName: semanticName,
              targetVariableSetId: SEMANTIC_SET_ID,
              targetVariableSetName: SEMANTIC_SET_NAME,
            },
          }
        : usePrimitive && alias
          ? { 'com.figma.aliasData': alias }
          : {}),
    },
  };
}

function collectPaths(obj, prefix = '', out = new Map()) {
  if (!obj || typeof obj !== 'object') return out;
  if (isToken(obj)) {
    out.set(prefix, obj);
    return out;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    collectPaths(v, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

function main() {
  const raw = readFileSync(LIGHT_TOKENS_PATH, 'utf8');
  const light = JSON.parse(raw);
  const color = light.color || light;
  const tokensByPath = collectPaths(color, 'color');

  const accentColors = ['gray', 'blue', 'teal', 'green', 'brown', 'yellow', 'orange', 'red', 'magenta', 'purple'];

  /** Resolve semantic path in design tokens (e.g. "color.text.accent.brown.bold" -> token) */
  function token(path) {
    const full = path.startsWith('color.') ? path : `color.${path}`;
    return tokensByPath.get(full);
  }

  /** Shadow is always neutral-alpha/500A - get that token from overlay or similar */
  const shadowToken = token('blanket.default');
  const neutralAlpha500A = shadowToken
    ? cloneTokenForCtx(shadowToken, null, true)
    : {
        $type: 'color',
        $value: {
          colorSpace: 'srgb',
          components: [0.019607843831181526, 0.0470588244497776, 0.12156862765550613],
          alpha: 0.46,
          hex: '#050C1F',
        },
        $extensions: {
          'com.figma.scopes': ['ALL_SCOPES'],
          'com.figma.isOverride': true,
          'com.figma.aliasData': {
            targetVariableName: 'color/neutral-alpha/500A',
            targetVariableSetId: PRIMITIVE_SET_ID,
            targetVariableSetName: PRIMITIVE_SET_NAME,
          },
        },
      };

  /** Build standard ctx block from text, textBold, bg, bgHover, bgPressed, border tokens and semantic paths */
  function ctxBlock(textTok, textBoldTok, bgTok, bgHoverTok, bgPressedTok, borderTok, semanticText, semanticTextBold, semanticBg, semanticBgHover, semanticBgPressed, semanticBorder) {
    return {
      'ctx-text': cloneTokenForCtx(textTok, semanticText),
      'ctx-text-bold': cloneTokenForCtx(textBoldTok, semanticTextBold),
      'ctx-text-hover': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-text-pressed': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-background': cloneTokenForCtx(bgTok, semanticBg),
      'ctx-background-hover': cloneTokenForCtx(bgHoverTok, semanticBgHover),
      'ctx-background-pressed': cloneTokenForCtx(bgPressedTok, semanticBgPressed),
      'ctx-border': cloneTokenForCtx(borderTok, semanticBorder),
      'ctx-border-hover': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-border-pressed': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-shadow': neutralAlpha500A,
      'ctx-gradient': { $type: 'color', $value: '{ctx-background-hover}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-hover': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-pressed': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
    };
  }

  const contexts = [];

  // 1) default
  contexts.push({
    modeName: 'default',
    ctx: {
      'ctx-text': cloneTokenForCtx(token('text.default'), 'color/text/default'),
      'ctx-text-bold': cloneTokenForCtx(token('text.inverse'), 'color/text/inverse'),
      'ctx-text-hover': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-text-pressed': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-background': cloneTokenForCtx(token('background.input.default'), 'color/background/input/default'),
      'ctx-background-hover': cloneTokenForCtx(token('background.input.hovered'), 'color/background/input/hovered'),
      'ctx-background-pressed': cloneTokenForCtx(token('background.input.pressed'), 'color/background/input/pressed'),
      'ctx-border': cloneTokenForCtx(token('border.default'), 'color/border/default'),
      'ctx-border-hover': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-border-pressed': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-shadow': neutralAlpha500A,
      'ctx-gradient': { $type: 'color', $value: '{ctx-background-hover}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-hover': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-pressed': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
    },
  });

  // 2) neutral-subtle
  contexts.push({
    modeName: 'neutral-subtle',
    ctx: {
      'ctx-text': cloneTokenForCtx(token('text.subtle'), 'color/text/subtle'),
      'ctx-text-bold': cloneTokenForCtx(token('text.default'), 'color/text/default'),
      'ctx-text-hover': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-text-pressed': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-background': cloneTokenForCtx(token('background.input.default'), 'color/background/input/default'),
      'ctx-background-hover': cloneTokenForCtx(token('background.input.hovered'), 'color/background/input/hovered'),
      'ctx-background-pressed': cloneTokenForCtx(token('background.input.pressed'), 'color/background/input/pressed'),
      'ctx-border': cloneTokenForCtx(token('border.default'), 'color/border/default'),
      'ctx-border-hover': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-border-pressed': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-shadow': neutralAlpha500A,
      'ctx-gradient': { $type: 'color', $value: '{ctx-background-hover}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-hover': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-pressed': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
    },
  });

  // 3) neutral-subtlest
  contexts.push({
    modeName: 'neutral-subtlest',
    ctx: {
      'ctx-text': cloneTokenForCtx(token('text.subtlest'), 'color/text/subtlest'),
      'ctx-text-bold': cloneTokenForCtx(token('text.subtle'), 'color/text/subtle'),
      'ctx-text-hover': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-text-pressed': { $type: 'color', $value: '{ctx-text}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-background': cloneTokenForCtx(token('background.input.default'), 'color/background/input/default'),
      'ctx-background-hover': cloneTokenForCtx(token('background.input.hovered'), 'color/background/input/hovered'),
      'ctx-background-pressed': cloneTokenForCtx(token('background.input.pressed'), 'color/background/input/pressed'),
      'ctx-border': cloneTokenForCtx(token('border.default'), 'color/border/default'),
      'ctx-border-hover': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-border-pressed': { $type: 'color', $value: '{ctx-border}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-shadow': neutralAlpha500A,
      'ctx-gradient': { $type: 'color', $value: '{ctx-background-hover}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-hover': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
      'ctx-gradient-pressed': { $type: 'color', $value: '{ctx-background-pressed}', $extensions: { 'com.figma.scopes': ['ALL_SCOPES'], 'com.figma.isOverride': true } },
    },
  });

  // 4) warning (same structure as existing warning.tokens.json - use same mappings)
  const warningDefault = token('background.warning.default');
  const warningHover = token('background.warning.hover');
  const warningPressed = token('background.warning.pressed');
  contexts.push({
    modeName: 'warning',
    ctx: ctxBlock(
      token('text.warning.default'),
      token('text.warning.inverse'),
      warningDefault,
      warningHover,
      warningPressed,
      token('border.warning'),
      'color/text/warning/default',
      'color/text/warning/inverse',
      'color/background/warning/default',
      'color/background/warning/hover',
      'color/background/warning/pressed',
      'color/border/warning'
    ),
  });

  // 4b) information, success, danger, warning: base mode plus -subtle and -bolder
  const statusColors = ['information', 'success', 'danger', 'warning'];
  for (const name of statusColors) {
    const borderTok = token(`border.${name}`);
    const isWarning = name === 'warning';
    const textDefaultTok = isWarning ? token('text.warning.default') : token(`text.${name}`);
    const textBoldTok = isWarning ? token('text.warning.inverse') : token('text.inverse');

    // base mode (same as -subtle: default background)
    const bgDefault = (t) => token(`background.${name}.${t}`);
    contexts.push({
      modeName: name,
      ctx: ctxBlock(
        textDefaultTok,
        textBoldTok,
        bgDefault('default'),
        bgDefault('hover'),
        bgDefault('pressed'),
        borderTok,
        isWarning ? 'color/text/warning/default' : `color/text/${name}`,
        isWarning ? 'color/text/warning/inverse' : 'color/text/inverse',
        `color/background/${name}/default`,
        `color/background/${name}/hover`,
        `color/background/${name}/pressed`,
        `color/border/${name}`
      ),
    });

    // {name}-subtle (explicit; same as default)
    contexts.push({
      modeName: `${name}-subtle`,
      ctx: ctxBlock(
        textDefaultTok,
        textBoldTok,
        bgDefault('default'),
        bgDefault('hover'),
        bgDefault('pressed'),
        borderTok,
        isWarning ? 'color/text/warning/default' : `color/text/${name}`,
        isWarning ? 'color/text/warning/inverse' : 'color/text/inverse',
        `color/background/${name}/default`,
        `color/background/${name}/hover`,
        `color/background/${name}/pressed`,
        `color/border/${name}`
      ),
    });

    // {name}-bolder (dark background; inverse text)
    const bgBolder = (t) => token(`background.${name}.bolder.${t}`);
    contexts.push({
      modeName: `${name}-bolder`,
      ctx: ctxBlock(
        token('text.inverse'),
        token('text.inverse'),
        bgBolder('default'),
        bgBolder('hover'),
        bgBolder('pressed'),
        borderTok,
        'color/text/inverse',
        'color/text/inverse',
        `color/background/${name}/bolder/default`,
        `color/background/${name}/bolder/hover`,
        `color/background/${name}/bolder/pressed`,
        `color/border/${name}`
      ),
    });
  }

  // 4c) neutral-subtler, neutral-bold, neutral-boldest (tokens use "bold" not "bolder"; boldest uses bold as fallback)
  for (const level of ['subtler', 'bold']) {
    const bg = (t) => token(`background.neutral.${level}.${t}`);
    const isBold = level === 'bold';
    contexts.push({
      modeName: `neutral-${level}`,
      ctx: ctxBlock(
        isBold ? token('text.default') : token('text.subtle'),
        isBold ? token('text.inverse') : token('text.default'),
        bg('default'),
        bg('hover'),
        bg('pressed'),
        token('border.default'),
        isBold ? 'color/text/default' : 'color/text/subtle',
        isBold ? 'color/text/inverse' : 'color/text/default',
        `color/background/neutral/${level}/default`,
        `color/background/neutral/${level}/hover`,
        `color/background/neutral/${level}/pressed`,
        'color/border/default'
      ),
    });
  }
  // neutral-boldest (background.neutral has no boldest in tokens; use default = subtlest as fallback)
  const neutralBoldestBg = (t) => token(`background.neutral.boldest.${t}`) || token(`background.neutral.subtlest.${t}`);
  contexts.push({
    modeName: 'neutral-boldest',
    ctx: ctxBlock(
      token('text.default'),
      token('text.inverse'),
      neutralBoldestBg('default'),
      neutralBoldestBg('hover'),
      neutralBoldestBg('pressed'),
      token('border.default'),
      'color/text/default',
      'color/text/inverse',
      'color/background/neutral/boldest/default',
      'color/background/neutral/boldest/hover',
      'color/background/neutral/boldest/pressed',
      'color/border/default'
    ),
  });

  // 5) brand: default, bold, subtlest, subtler, subtle, bolder, boldest
  const brandLevels = [
        { mode: 'brand-default', bgLevel: 'subtlest', text: 'default', textBold: 'bold' },
        { mode: 'brand-bold', bgLevel: 'bolder', text: 'bold', textBold: 'inverse' },
        { mode: 'brand-subtlest', bgLevel: 'subtlest', text: 'default', textBold: 'bold' },
        { mode: 'brand-subtler', bgLevel: 'subtler', text: 'default', textBold: 'bold' },
        { mode: 'brand-subtle', bgLevel: 'subtle', text: 'default', textBold: 'bold' },
        { mode: 'brand-bolder', bgLevel: 'bolder', text: 'bold', textBold: 'inverse' },
        { mode: 'brand-boldest', bgLevel: 'boldest', text: 'inverse', textBold: 'inverse' },
  ];
  for (const { mode, bgLevel, text, textBold } of brandLevels) {
    const bg = (t) => token(`background.brand.${bgLevel}.${t}`);
    const textTok = text === 'inverse' ? token('text.inverse') : text === 'bold' ? token('text.brand.bold') : token('text.brand.default');
    const textBoldTok = textBold === 'inverse' ? token('text.inverse') : token('text.brand.bold');
    const semanticText = text === 'inverse' ? 'color/text/inverse' : text === 'bold' ? 'color/text/brand/bold' : 'color/text/brand/default';
    const semanticTextBold = textBold === 'inverse' ? 'color/text/inverse' : 'color/text/brand/bold';
    contexts.push({
      modeName: mode,
      ctx: ctxBlock(
        textTok,
        textBoldTok,
        bg('default'),
        bg('hover'),
        bg('pressed'),
        token('border.brand'),
        semanticText,
        semanticTextBold,
        `color/background/brand/${bgLevel}/default`,
        `color/background/brand/${bgLevel}/hover`,
        `color/background/brand/${bgLevel}/pressed`,
        'color/border/brand'
      ),
    });
  }

  // 6) accent-{color}: only subtlest, subtler, subtle, bolder. ctx-text = default, ctx-text-bold = bold.
  const accentLevels = ['subtlest', 'subtler', 'subtle', 'bolder'];
  for (const accent of accentColors) {
    const borderAccent = token(`border.accent.${accent}`);
    const textDefault = token(`text.accent.${accent}.default`);
    const textBold = token(`text.accent.${accent}.bold`);

    for (const level of accentLevels) {
      const bg = (t) => token(`background.accent.${accent}.${level}.${t}`);
      contexts.push({
        modeName: `accent-${accent}-${level}`,
        ctx: ctxBlock(
          textDefault,
          textBold,
          bg('default'),
          bg('hover'),
          bg('pressed'),
          borderAccent,
          `color/text/accent/${accent}/default`,
          `color/text/accent/${accent}/bold`,
          `color/background/accent/${accent}/${level}/default`,
          `color/background/accent/${accent}/${level}/hover`,
          `color/background/accent/${accent}/${level}/pressed`,
          `color/border/accent/${accent}`
        ),
      });
    }
  }

  // Filter out null values and add mode extension
  const skipExisting = new Set(['warning']); // preserve hand-edited Figma variable IDs
  for (const { modeName, ctx } of contexts) {
    const safeName = modeName.replace(/\//g, '-');
    if (skipExisting.has(modeName)) {
      console.log('Skipped (preserved)', join(MODES_DIR, `${safeName}.tokens.json`));
      continue;
    }
    const cleaned = {};
    for (const [k, v] of Object.entries(ctx)) {
      if (v != null) cleaned[k] = v;
    }
    cleaned['$extensions'] = { 'com.figma.modeName': modeName };
    const out = JSON.stringify(cleaned);
    const filePath = join(MODES_DIR, `${safeName}.tokens.json`);
    writeFileSync(filePath, out, 'utf8');
    console.log('Wrote', filePath);
  }

  console.log(`Generated ${contexts.length} context mode files.`);
}

main();
