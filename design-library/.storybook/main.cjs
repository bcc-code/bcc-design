module.exports = {
  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
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