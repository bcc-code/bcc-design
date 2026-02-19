# @bcc-code/component-library-vue

Vue 3 component library built on [PrimeVue](https://primevue.org/) and BCC design tokens. You only need this package—no separate Tailwind or PrimeVue install.

## View on with [Storybook](https://components.bcc.no)

## Install

```bash
pnpm add @bcc-code/component-library-vue
# or
npm install @bcc-code/component-library-vue
# or
yarn add @bcc-code/component-library-vue
```

**Peer dependency:** Vue 3.

## Quick start

1. **Register the library** in your app (e.g. `main.ts`):

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { BccComponentLibrary } from '@bcc-code/component-library-vue';

const app = createApp(App);
app.use(BccComponentLibrary);
app.mount('#app');
```

2. **Add styles** using one of the two options below.

---

## Styling: two options

### Option 1 — Recommended: full Tailwind in your app

Use this if you want Tailwind utility classes in your own templates and only ship the classes you use (tree-shaking).

1. **Add the Tailwind Vite plugin** (the package brings Tailwind in as a dependency; you only wire it up):

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [vue(), tailwindcss()],
	// ...
});
```

2. **Import the theme in your main CSS file** (e.g. `src/main.css` or `src/assets/main.css`):

```css
@import '@bcc-code/component-library-vue/theme.css';
```

Tailwind will run as part of your build and only include the utility classes that appear in your app and in the library.

### Option 2 — Pre-built CSS only

Use this if you don’t want Tailwind in your project and only need the library’s styles and components.

In your entry file (e.g. `main.ts`), before mounting the app:

```ts
import '@bcc-code/component-library-vue/style.css';
```

You get the BCC theme and component styles only; no Tailwind utilities in your app.

---

## Using components

All components are namespaced with `Bcc`. Use them in templates or register them globally after `app.use(BccComponentLibrary)`.

**Example:**

```vue
<template>
	<div class="flex gap-4 p-4">
		<BccButton label="Save" />
		<BccInput v-model="name" placeholder="Name" />
	</div>
</template>

<script setup lang="ts">
import { BccButton, BccInput } from '@bcc-code/component-library-vue';
import { ref } from 'vue';

const name = ref('');
</script>
```

# Setup

```ts
// main.ts
import { BccComponentLibrary } from '@bcc-code/component-library-vue';

const app = createApp(…)
BccComponentLibrary(app);
```

```css
/* styles.css */
@import '@bcc-code/component-library-vue/theme.css';

/* Optional include the archivo font */
@import '@bcc-code/component-library-vue/archivo-font.css';
font-family:
	Archivo,
	system-ui,
	-apple-system,
	BlinkMacSystemFont,
	'Segoe UI',
	'Open Sans',
	sans-serif;
```

The library exports both **custom BCC components** (e.g. `BccBadge`, `BccFrame`, `BccReact`) and **wrapped PrimeVue components** (e.g. `BccButton`, `BccDialog`, `BccDataTable`). PrimeVue services (Toast, Confirm, Dialog) are configured by `BccComponentLibrary`; use the composables `useToast`, `useConfirm`, and `useDialog` from the library when you need them.

---

## Development

```bash
pnpm install
pnpm run start        # Storybook on port 6006
pnpm run build        # Typecheck, types, and Vite build
pnpm run build:vite   # Vite build only (includes theme.css)
```

## License

Apache-2.0
