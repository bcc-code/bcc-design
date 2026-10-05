<p align="center">
  <img src="https://design.bcc.no/logos/bcc_logo_secondary.svg" width="120" style="margin-bottom: 10px;">
</p>
<h1 align="center">Design System</h1>
<p align="center">Packages, assets and documentation to use the BCC Design System in your products.</p>

## Links

- [Component documentation (Storybook)](https://components.bcc.no)
- [Developer documentation](https://developer.bcc.no/bcc-design)

## Contributing

Do you want to contribute to the libraries in this repository? Many parts of the design system are maintained by the community and we welcome your involvement! Read the [contributing guide](./CONTRIBUTING.md) to get started.

## Repository structure

### Main packages

- [component-library](./component-library/README.md) - `@bcc-code/component-library-vue`, a Vue 3 component library built on PrimeVue and BCC design tokens
- [icons](./icons/README.md) - `@bcc-code/icons` and `@bcc-code/icons-vue`, icons based on Material Symbols in SVG and Vue component formats

Each package is installed, built and released separately with pnpm, so run commands from inside the package folder.

### Other folders

- `docs` folder is deployed with the common VuePress setup to [developer.bcc.no/bcc-design](https://developer.bcc.no/bcc-design/) and points to the component documentation
- `legacy-docs` folder contains documentation for the previous design library
- `www` folder is used for design assets and is deployed to [design.bcc.no](https://design.bcc.no)

## Infrastructure

Infrastructure for the project is managed in [bcc-docsite](https://github.com/bcc-code/bcc-docsite) repository
