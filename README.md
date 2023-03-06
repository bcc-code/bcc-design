# @bcc-code/vue-components
This library is a collection of components that conform to the BCC Design System, implemented in Vue.js and styled with Tailwind CSS.

[![version](https://img.shields.io/npm/v/@bcc-code/vue-components)](https://github.com/bcc-code/bcc-vue-components/releases) [![license](https://img.shields.io/npm/l/@bcc-code/vue-components)](https://github.com/bcc-code/bcc-vue-components/blob/main/LICENSE)

## Installation & Usage
Refer to the [documentation](https://developer.bcc.no/bcc-vue-components) for installation instructions and to [Storybook](https://vue-components-storybook.developer.bcc.no) for interactive example of the components and their variants.

## Developing the package locally
### Recommended IDE Setup
[VSCode](https://code.visualstudio.com/) with the following plugins:
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Tailwind CSS Intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

Add the following to `.vscode/settings.json` to enable Tailwind Intellisense in places where the `cva` package is used for building classes:
```json
    "tailwindCSS.experimental.classRegex": [
        ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
    ]
```

### Get started
Install dependencies:
```sh
npm ci
```

Then run Storybook when developing components to have a live reloading server to test them:
```sh
npm run storybook
```

Run a live reloading unit test server:
```sh
npm run test:unit
```

### Creating a new component
The repository contains a handy script for scaffolding a new component:
```sh
npm run create-component ComponentName
```
This will create a Vue component, with an accompanying test and stories file, and will also update the exports for the library.

### Building for production
To build the package for production, including types and icons, run:
```sh
npm run build
```

## License
This package is licensed under the [Apache 2.0 license](./LICENSE).
