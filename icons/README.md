# bcc-icons
Icons used in the BCC design system, adapted from Material Symbols.

[![version](https://img.shields.io/npm/v/@bcc-code/icons)](https://github.com/bcc-code/bcc-icons/releases) [![license](https://img.shields.io/npm/l/@bcc-code/icons)](https://github.com/bcc-code/bcc-icons/blob/main/LICENSE) [![install size](https://packagephobia.com/badge?p=@bcc-code/icons)](https://packagephobia.com/result?p=@bcc-code/icons)

The basis of this package are the [rounded SVG icons](https://github.com/marella/material-design-icons/tree/main/svg/rounded) from [Material Symbols](https://fonts.google.com/icons?icon.style=Rounded). Some icons might be redesigned by the design team in the future and replace the default icons.

## Installation & Usage
Refer to the [documentation](https://developer.bcc.no/bcc-design/icons) for installation instructions and usage information.

## Developing this package locally
To build a version locally, first install dependencies:
```
pnpm install
```

Then build the icons to both the SVG and the Vue library:
```
pnpm build
```

### Releasing a new version
A new version can be released by running the [Create New Version](https://github.com/bcc-code/bcc-icons/actions/workflows/create-version.yml) workflow from GitHub. This will update the version in the `package.json`, push a Git commit and tag, and create a new [release](https://github.com/bcc-code/bcc-vue-components/releases) in GitHub. Maintainers can publish this release, after which the new version will be pushed to npm with the `latest` tag.

This will automatically create a new [release](https://github.com/bcc-code/bcc-icons/releases) in GitHub. Maintainers can publish this release, after which the new version will be pushed to npm with the `latest` tag.

## License
This package is licensed under the [Apache 2.0 license](./LICENSE).
