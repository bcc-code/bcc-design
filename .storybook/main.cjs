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
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite",
    "disableTelemetry": true,
  },
  "features": {
    "storyStoreV7": true
  },
}