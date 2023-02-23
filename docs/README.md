# Introduction

This library is a collection of components that conform to the BCC Design System, implemented in [Vue.js](https://vuejs.org/) and styled with [Tailwind](https://tailwindcss.com).

View the components with [Storybook](https://vue-components-storybook.developer.bcc.no)

## Quick installation
Install the `dev` version which points to the latest commit on the `main` branch:
```sh
npm install @bcc-code/bcc-vue-components@dev
```

### Authenticating with the GitHub package registry
This package is hosted on GitHub and not the public NPM registry, which means that you need to follow these steps the first time you try to install this package locally.

::: tip INFO
These steps are taken from the GitHub documentation, refer to [this page](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package) for more background information and advanced configuration.
:::

1. Generate a *classic* access token via your [GitHub settings](https://github.com/settings/tokens), with the `read:packages` permission.

2. Log in to the GitHub npm registry with the following command:

```sh
$ npm login --scope=@bcc-code --auth-type=legacy --registry=https://npm.pkg.github.com

> Username: USERNAME
> Password: TOKEN
```

3. In the same directory as your `package.json` file, create or edit an `.npmrc` file to include a line specifying GitHub Packages URL.

```
@bcc-code:registry=https://npm.pkg.github.com
```

4. Run `npm install` with the desired package version.

### Using the package in CI
With the above steps you've authenticated to fetch the package locally, but some more configuration is needed to get it working in GitHub Actions.

1. Add permission to read packages to the `GITHUB_TOKEN`. Be sure to also add the default permission `contents: read`, otherwise the token will lose the ability to read the repository.
```yml
permissions:
  contents: read
  packages: read
```

2. Pass the token along as `NODE_AUTH_TOKEN` in steps where you're talking to the npm registry, typically when installing dependencies:
```yml
- name: Install dependencies
  run: npm ci
  env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

3. Add or ask an admin to add your repository to the [package settings](https://github.com/orgs/bcc-code/packages/npm/bcc-vue-components/settings) on GitHub. This is currently also needed for repositories in `bcc-code`.
