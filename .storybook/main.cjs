module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
    "@storybook/addon-mdx-gfm"
  ],
  "framework": {
    name: "@storybook/vue3-vite",
    options: {}
  },
  "core": {
    "disableTelemetry": true,
  },
  "features": {
    "storyStoreV7": true
  },
  docs: {
    autodocs: true
  }
};