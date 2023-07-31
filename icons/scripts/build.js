/*
 * This file has been adapted from the heroicons package
 * https://github.com/tailwindlabs/heroicons/blob/1a07e812164e12da83e6bd90d652aa91a27e0eb1/scripts/build.js
 */

const fs = require('fs').promises
const camelcase = require('camelcase')
const { compile: compileVue } = require('@vue/compiler-dom')
const { dirname } = require('path')
const converter = require('number-to-words')

let transform = {
  vue: (svg, componentName, format) => {
    let { code } = compileVue(svg, {
      mode: 'module',
    })

    if (format === 'esm') {
      return code.replace('export function', 'export default function')
    }

    return code
      .replace(
        /import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])(.*?)\2/,
        (_match, imports, _quote, mod) => {
          let newImports = imports
            .split(',')
            .map((i) => i.trim().replace(/\s+as\s+/, ': '))
            .join(', ')

          return `const { ${newImports} } = require("${mod}")`
        }
      )
      .replace('export function render', 'module.exports = function render')
  },
}

async function getIcons() {
  let files = await fs.readdir(`./icons`)
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./icons/${file}`, 'utf8'),
      componentName: `${camelcase(file.replace(/\.svg$/, '').replace(/^\d+/g, (number) => `${converter.toWords(number)}_`), {
        pascalCase: true,
      })}Icon`,
    }))
  )
}

function exportAll(icons, format, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      let extension = includeExtension ? '.js' : ''
      if (format === 'esm') {
        return `export { default as ${componentName} } from './${componentName}${extension}'`
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`
    })
    .join('\n')
}

async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true })
  await fs.writeFile(file, text, 'utf8')
}

async function buildIcons(format) {
  let outDir = `./vue/dist`
  if (format === 'esm') {
    outDir += '/esm'
  }

  let icons = await getIcons()

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      let content = await transform["vue"](svg, componentName, format)
      let types = `import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';\ndeclare const ${componentName}: FunctionalComponent<HTMLAttributes & VNodeProps>;\nexport default ${componentName};\n`

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types)] : []),
      ]
    })
  )

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format))

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, 'esm', false))
}

async function main() {
  console.log("Building package...")

  await Promise.all([
    buildIcons('cjs'),
    buildIcons('esm'),
  ])

  return console.log(`Finished building package.`)
}

main()
