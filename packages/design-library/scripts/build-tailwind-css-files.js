import { promises } from "fs";

import postcss from "postcss";
import importPlugin from "postcss-import";

async function main() {
  const css = await promises.readFile("./src/css/index.css", "utf8");

  postcss()
    .use(importPlugin())
    .process(css, {
      from: "./src/css/index.css",
    })
    .then(async (result) => {
      const output = result.css;

      await promises.writeFile("./dist_css/tailwind/index.css", output, "utf8");
    });
}

main();
