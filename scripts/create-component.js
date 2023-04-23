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
Example.parameters = {
  viewMode: "docs",
};
Example.args = {

};
`
  );
}

async function createComponent(componentName) {
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
    appendFile(
      "src/index.ts",
      `export { default as ${componentName} } from "./components/${componentName}/${componentName}.vue";\n`
    ),
  ]);

  console.log(`Scaffolded ${componentName} component. The following files were created:\n`);
  console.log(`
src
├── components
\t├── ${componentName}
\t\t├── ${componentName}.spec.ts
\t\t├── ${componentName}.stories.ts
\t\t├── ${componentName}.vue
\t\t`);
}

createComponent(process.argv[2]);
