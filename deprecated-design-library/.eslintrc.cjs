/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: ["**/*.config.cjs", "**/*.config.ts", "src/tokens/**/*.ts", "scripts/**/*.*"],
  rules: {
    "prettier/prettier": "error",
  },
};
