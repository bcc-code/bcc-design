const fs = require("fs").promises;
const postcss = require("postcss");
const atImport = require("postcss-import");

async function main() {
  const css = await fs.readFile("./src/css/index.css", "utf8");

  postcss()
    .use(atImport())
    .process(css, {
      from: "./src/css/index.css",
    })
    .then(async (result) => {
      const output = result.css;

      await fs.writeFile("./dist_css/tailwind/index.css", output, { flag: "a" });
    });
}

main();
