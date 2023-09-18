# BCC Design System Library
This library is a collection of tokens and components that conform to the BCC Design System.

> **Note** This is the Vue implementation, for the CSS-only library [see here](./css-package/README.md)

### @bcc-code/design-library-vue
[![version](https://img.shields.io/npm/v/@bcc-code/design-library-vue)](https://github.com/bcc-code/bcc-design/releases) [![license](https://img.shields.io/npm/l/@bcc-code/design-library-vue)](https://github.com/bcc-code/bcc-design/blob/main/design-library/LICENSE)

## Installation & Usage
Refer to the [documentation](https://developer.bcc.no/bcc-design/design-library) for installation instructions and to [Storybook](https://design-library.developer.bcc.no) for interactive example of the components and their variants (view the [dev Storybook](https://design-library-dev.developer.bcc.no) for unreleased changes).

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

### Linting
This project includes a [linting](https://en.wikipedia.org/wiki/Lint_(software)) setup via [ESLint](https://eslint.org/), which includes [Prettier](https://prettier.io/). The linting settings are intentionally strict, and all Prettier alerts are treated as errors. This ensures the code is always formatted in the same way.

When using VS Code, install the [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and make sure it is set to format on save, or manually add this to your VS Code settings:
```json
  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
```

You can manually run the linting command as well to check for linting errors:
```sh
pnpm lint
```
This command is also run in CI and will fail the build if there are any errors.

Errors can be automatically fixed by running
```sh
pnpm lint:fix
```

### Building for production
To build the package for production, including types, run:
```sh
pnpm build
```

### Releasing a new version
A new version can be released by running the [Create New Version](https://github.com/bcc-code/bcc-design/actions/workflows/design-library-create-version.yml) workflow from GitHub.
This will update the version in the `package.json`, push a Git commit and tag, and create a new [release](https://github.com/bcc-code/bcc-design/releases) in GitHub.
Maintainers can publish this release, after which the new version will be pushed to npm with the `latest` tag.

All commits to main will be released under the `dev` tag on npm, so they can be tested and installed immediately even if a new release hasn't come out.

## Tokens
This repository includes a setup with tokens from the design system. These tokens are exported from Figma and can be found in `src/tokens/input/figma.json`.

To build the tokens from this source file, run:
```sh
pnpm build:tailwind
```

This will update the files of the Tailwind theme which can then be checked into Git.

## License
This package is licensed under the [Apache 2.0 license](./LICENSE).
