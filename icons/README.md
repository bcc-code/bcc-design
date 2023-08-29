# bcc-icons
Icons used in the BCC design system, adapted from Material Symbols.

[![version](https://img.shields.io/npm/v/@bcc-code/icons)](https://github.com/bcc-code/bcc-design/releases) [![license](https://img.shields.io/npm/l/@bcc-code/icons)](https://github.com/bcc-code/bcc-design/blob/main/icons/LICENSE) [![install size](https://packagephobia.com/badge?p=@bcc-code/icons)](https://packagephobia.com/result?p=@bcc-code/icons)

The basis of this package are the [rounded SVG icons](https://github.com/marella/material-design-icons/tree/main/svg/rounded) from [Material Symbols](https://fonts.google.com/icons?icon.style=Rounded). Some icons might be redesigned by the design team in the future and replace the default icons.

## Installation & Usage
Refer to the [documentation](https://developer.bcc.no/bcc-design/icons) for installation instructions and usage information.

## Updating Icons

### Custom/Override Icons

Add custom icons to then `custom-icons` folder. These will be merged on to the default icons during build.

Ensure to replace the `fill` attribute with `currentColor` to allow for color overrides.

### Google Icons

```
pnpm install
```

Download and optimise the Google icons:
```
pnpm google-icons
```

### Releasing a new version
A new version can be released by running the [Create New Version](https://github.com/bcc-code/bcc-design/actions/workflows/icons-create-version.yml) workflow from GitHub. This will update the version in the `package.json`, push a Git commit and tag, and create a new [release](https://github.com/bcc-code/bcc-design/releases) in GitHub. Maintainers can publish this release, after which the new version will be pushed to npm with the `latest` tag.

All commits to master will be released under the `dev` tag on npm, so they can be tested and installed immediately even if a new release hasn't come out.

## License
This package is licensed under the [Apache 2.0 license](./LICENSE).
