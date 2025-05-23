<p align="center">
  <img src="https://design.bcc.no/logos/bcc_logo_secondary.svg" width="120" style="margin-bottom: 10px;">
</p>
<h1 align="center">Design System</h1>
<p align="center">Packages, assets and documentation to use the BCC Design System in your products.</p>

## Links

[Full documentation](https://developer.bcc.no/bcc-design)

## Contributing

Do you want to contribute to the libraries in this repository? Many parts of the design system are maintained by the community and we welcome your involvement! Read the [contributing guide](./CONTRIBUTING.md) to get started.

## Repository structure

### Main packages

- [design-library](./design-library/README.md) - CSS and Vue implementation of components, tokens and typography
- [icons](./icons/README.md) - Icons based on Material Design, in SVG and Vue component formats

### Other folders

- `docs` folder is deployed with the common VuePress setup to [developer.bcc.no/bcc-design](https://developer.bcc.no/bcc-design/)
- `www` folder is used for design assets and is deployed to [design.bcc.no](https://design.bcc.no)
- `infra` folder contains terraform scripts

## Infrastructure

Infrastructure for the project is managed in [bcc-docsite](https://github.com/bcc-code/bcc-docsite) repository
