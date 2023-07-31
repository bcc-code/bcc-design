const { extendDefaultPlugins } = require('svgo');

module.exports = {
  multipass: true,
  plugins: extendDefaultPlugins([
    'removeDimensions',
    'sortAttrs',
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
    }
  ]),
};