const { extendDefaultPlugins } = require('svgo');

module.exports = {
  multipass: true,
  plugins: extendDefaultPlugins([
    'cleanupListOfValues',
    'convertStyleToAttrs',
    'removeDimensions',
    'removeOffCanvasPaths',
    'removeRasterImages',
    'removeScriptElement',
    'removeStyleElement',
    'removeXMLNS',
    'sortAttrs',
    {
      name: 'removeUselessStrokeAndFill',
      params: {
        removeNone: true, // remove elements that have computed fill and stroke equal to "none"
      },
    },
    {
      name: 'removeViewBox',
      active: false,
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(stroke|fill)',
      },
    },
    {
        name: 'addAttributesToSVGElement',
        params: {
            attributes: [
                { fill: 'currentColor' },
                { 'aria-hidden': 'true' }
            ]
        }
    },
  ]),
};