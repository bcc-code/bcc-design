---
order: 10
---
# CSS library
::: tip
View interactive examples of the components [in Storybook](https://design-library.developer.bcc.no)
:::

For project that don't use Vue we offer a CSS library with classes for all the components. Note that some components might require JavaScript for interactive parts, which you would need to write yourself, although you could take inspiration from the [Vue source](https://github.com/bcc-code/bcc-design/tree/main/design-library/src/components).

## Installation and usage
The `latest` tag is the recommended, most stable version of the library. It is also possible to install a `dev` version (swap `@latest` out for `@dev` in the examples below), which always points to the latest commit on the `main` branch. You can view unreleased components on the [dev Storybook](https://design-library-dev.developer.bcc.no).

### 1. Install package
[![version](https://img.shields.io/npm/v/@bcc-code/design-library?label=%40bcc-code%2Fdesign-library)](https://github.com/bcc-code/bcc-design/releases)

<CodeGroup>
  <CodeGroupItem title="PNPM" active>

```sh
pnpm add @bcc-code/design-library@latest
```
  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```sh
npm install @bcc-code/design-library@latest
```

  </CodeGroupItem>
</CodeGroup>

### 2. Import CSS
#### Tailwind
You need to import the CSS classes in your main CSS file to be able to use them:

```css
/* main.css */
@import "@bcc-code/design-library/tailwind/index.css";

@tailwind ...
```

In some cases this might not work, depending on the set up of your build tool, which means you need to use the path to the location of this file on disk:

```css
/* main.css */
@import "node_modules/@bcc-code/design-library/dist_css/tailwind/index.css";

@tailwind ...
```

All classes are added on the Tailwind [component layer](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer), which means that even if the CSS is imported at the top of the file it will still be inserted at the right place in your CSS, so component classes can be overridden with utility classes.

##### Import tokens in your Tailwind config
Importing the theme in your Tailwind config consists of two parts:

1. Import the theme you want
2. Import the Tailwind plugin for the theme. This will add some required CSS variables which are used by the component library.

```js{2,6-8,13}
// tailwind.config.cjs
const themes = require("@bcc-code/design-library");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    themes.bccForbundetTheme
  ],
  content: [
    "./src/**/*.{vue,ts}",
  ],
  plugins: [
    themes.tailwindPlugin
  ],
};
```

##### Disable dark mode
In the future, dark mode styles will be enabled by default, which can lead to washed out colors if your app only has a light mode (because the library will follow the system setting for dark mode). It is therefore recommended to turn off dark mode in your app. It is not possible to turn off dark mode support in Tailwind but by changing to the [class strategy](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually) dark mode won't trigger as long as you don't put a `dark` class on your HTML.

```js
// tailwind.config.cjs
module.exports = {
  // ...
  darkMode: 'class',
  // ...
}
```

#### Without Tailwind
We strongly recommend to use Tailwind, especially in new apps, but if this is not possible due to an existing setup, you can include the compiled CSS file in your CSS:

```css
/* main.css */
@import "@bcc-code/design-library/style.css";
```

Or if you need to use the full path:

```css
/* main.css */
@import "node_modules/@bcc-code/design-library/dist/style.css";
```

This approach has a few downsides:
  - Only the component classes are included, not other design system tokens.
  - When using Tailwind it's possible to style components with utility classes, because the component classes are inserted into the output CSS before the utilities. You would need to take care of that yourself when importing all the styles.

## Using classes
The classes follow a naming convention of `.bcc-<component-name><-optional-modifier>`, so for example the button has `.bcc-button` base class and `.bcc-button-primary` for the primary variant and `.bcc-button-xl` for the `xl` size. Applying all three classes gives you an XL primary button.

At the moment there is no separate documentation about all the CSS classes. One way to find out which classes to use are to use Inspect element on the [components Storybook](https://design-library.developer.bcc.no) to view which classes are added with which prop. Or check out the [components source](https://github.com/bcc-code/bcc-design/tree/main/design-library/src/components).
