const plugin = require("tailwindcss");
const bccForbundetTheme = require("@bcc-code/design-tokens");

// Add base colors
// --neutral-0: #asdsdf

// Add other tokens
// bg-primary-

// const contexts = [
//     {
//       name: 'global',
//       colors: {
//         'text-base': colors.fuchsia['800'],
//         'text-inverted': colors.fuchsia['100'],
//         'bg-base': colors.fuchsia['100'],
//         'bg-inverted': colors.fuchsia['800'],
//       },
//     },
//     {
//       name: 'brand',
//       colors: {
//         'text-base': colors.red['800'],
//         'text-inverted': colors.red['100'],
//         'bg-base': colors.red['100'],
//         'bg-inverted': colors.red['800'],
//       },
//     },
// ]

module.exports = plugin(function ({ addBase }) {
  const colors = bccForbundetTheme.colors;

  console.log("bla");

  addBase({
    ":root": {
      "--test-color": "purple",
    },
  });

  // for (let [colorKey] of Object.entries(colors)) {
  //   for (let [colorWeightKey, colorWeightToken] of Object.entries(colors[colorKey])) {
  //     console.log(colorWeightKey, colorWeightToken);
  //   }
  // }
});
