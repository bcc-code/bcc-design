# Getting Started
The design system consists of a set of [guidelines](../guidelines.md), tokens and components. These are implemented in CSS and we offer a Vue wrapper around the CSS library as well.

- [@bcc-code/design-library-vue](./vue-components.md) when using Vue 3
- [@bcc-code/design-library](./css-library.md) when not using Vue 3.

::: tip
View interactive examples of the components [in Storybook](https://design-library.developer.bcc.no)
:::

## Usage without npm
In projects that lack a setup with npm, like for example WordPress, you can still include the compiled CSS file from a CDN, for example from Unpkg:

```
https://unpkg.com/@bcc-code/design-library@latest/dist/style.css
```

Note that it's recommended to pin the version to a specific [version](https://github.com/bcc-code/bcc-design-library/releases) of the Vue components instead of the `latest` tag.

::: warning HEADS UP
This will just include the component classes and other design system tokens, and we therefore do recommend looking into a setup with npm and optionally Tailwind to easily apply all aspects of the design system to your interface.
:::
