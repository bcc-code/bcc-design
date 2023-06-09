# BCC Design System Components
This library is a collection of components that conform to the BCC Design System.

> **Note** This is the Vue component implementation, for the CSS-only library [see here](./css-package/README.md)

### @bcc-code/vue-components
[![version](https://img.shields.io/npm/v/@bcc-code/vue-components)](https://github.com/bcc-code/bcc-vue-components/releases) [![license](https://img.shields.io/npm/l/@bcc-code/vue-components)](https://github.com/bcc-code/bcc-vue-components/blob/main/LICENSE)

## Installation & Usage
Refer to the [documentation](https://developer.bcc.no/bcc-design/vue-components/) for installation instructions and to [Storybook](https://vue-components-storybook.developer.bcc.no) for interactive example of the components and their variants.

## Developing the package locally
### Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) with the following plugins:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Prerequisites
This project uses [pnpm](https://pnpm.io/), which you need to install before usage. The easiest way is to install it with npm:
```sh
npm install -g pnpm
```

### Get started
Install dependencies:
```sh
pnpm install --frozen-lockfile
```

Then run Storybook when developing components to have a live reloading server to test them:
```sh
pnpm storybook
```

Run a live reloading unit test server:
```sh
pnpm test:unit
```

Some unit test use [snapshots](https://vitest.dev/guide/snapshot.html). Be sure to update snapshots after updating a component that has such a test:
```sh
pnpm test:unit:update-snapshots
```

### Creating a new component
The repository contains a handy script for scaffolding a new component:
```sh
pnpm create-component ComponentName
```
This will create a Vue component, with accompanying test, stories and CSS files, and will also update the exports for the library.

### Building for production
To build the package for production, including types, run:
```sh
pnpm build
```

### Releasing a new version
Only maintainers who can push to the `main` branch can currently release new versions.

To create a new version, don't use `npm version` but run the custom version script. This passes the version argument to `npm version`, so you use it like that command. For example, to update from v0.12.0 to v0.13.0:
```sh
./scripts/version.sh minor
```

This will update both the root `package.json` as well as the `css-package/package.json`, and create a Git commit with a tag pointing to it. Then, push this commit:
```sh
git push --follow-tags
```
This will create a new [release](https://github.com/bcc-code/bcc-vue-components/releases) in GitHub. Maintainers can publish this release, after which the new version will be pushed to npm with the `latest` tag.

## Tokens
This repository includes a setup with tokens from the design system. These tokens are exported from Figma and can be found in `src/tokens/input/figma.json`.

To build the tokens from this source file, run:
```sh
pnpm build:tailwind
```

This will update the files of the Tailwind theme which can then be checked into Git.

## License
This package is licensed under the [Apache 2.0 license](./LICENSE).
