/* eslint-env node */

import fs, { promises } from "fs";
import util from "util";
import path from "path";

const rootPath = path.resolve(process.argv[1], "../../") + path.sep;

async function fileExists(filePath) {
  return !!(await promises.stat(rootPath + filePath).catch(() => false));
}

function mkDir(dirPath) {
  return promises.mkdir(rootPath + dirPath, { recursive: true });
}

function appendFile(filePath, fileContent) {
  const append = util.promisify(fs.appendFile);
  return append(rootPath + filePath, fileContent);
}

function getLowercaseComponentName(componentName) {
  // Remove Bcc prefix and lowercase component name (this doesn't take into account names with multiple words)
  const lowercaseUnprefixedComponentName = componentName.slice(3).toLowerCase();
  return lowercaseUnprefixedComponentName;
}

function createVueFile(componentName) {
  return promises.writeFile(
    rootPath + `src/components/${componentName}/${componentName}.vue`,
    `<script setup lang="ts">
type Props = {

};

withDefaults(defineProps<Props>(), {

});
</script>

<template>
</template>`
  );
}

function createTestFile(componentName) {
  return promises.writeFile(
    rootPath + `src/components/${componentName}/${componentName}.spec.ts`,
    `import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ${componentName} from "./${componentName}.vue";

describe("${componentName}", () => {

});`
  );
}

async function createStoryFile(componentName) {
  return promises.writeFile(
    rootPath + `src/components/${componentName}/${componentName}.stories.ts`,
    `import ${componentName} from "./${componentName}.vue";

import type { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Components/${componentName}",
  component: ${componentName},
  argTypes: {

  },
} as Meta<typeof ${componentName}>;

const Template: StoryFn<typeof ${componentName}> = (args) => ({
  components: { ${componentName} },
  setup() {
    return { args };
  },
  template: \`
    <${componentName} v-bind="args" />
  \`,
});

export const Example = Template.bind({});
Example.args = {

};
`
  );
}

function createCssFile(componentName) {
  const cssClassName = getLowercaseComponentName(componentName);
  return promises.writeFile(
    rootPath + `src/components/${componentName}/${componentName}.css`,
    `@layer components {
    .bcc-${cssClassName} {
        @apply ;
    }
  }`
  );
}

async function createComponent(componentName) {
  if (!componentName.startsWith("Bcc")) {
    console.log(`Component name needs to be prefixed with "Bcc", provided "${componentName}"`);
    return;
  }

  console.log(`Create component ${componentName}`);

  if (await fileExists(`src/components/${componentName}`)) {
    console.log(`${componentName} folder already exists, skipping.`);
    return;
  }

  await mkDir(`src/components/${componentName}`);

  await Promise.all([
    createVueFile(componentName),
    createTestFile(componentName),
    createStoryFile(componentName),
    createCssFile(componentName),
    appendFile(
      "src/index.ts",
      `export { default as ${componentName} } from "./components/${componentName}/${componentName}.vue";\n`
    ),
    appendFile(
      "src/css/index.css",
      `@import "../components/${componentName}/${componentName}.css";\n`
    ),
  ]);

  console.log(`Scaffolded ${componentName} component. The following files were created:\n`);
  console.log(`
src
├── components
\t├── ${componentName}
\t\t├── ${componentName}.css
\t\t├── ${componentName}.spec.ts
\t\t├── ${componentName}.stories.ts
\t\t├── ${componentName}.vue
\t\t`);
}

createComponent(process.argv[2]);
