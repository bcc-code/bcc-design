import "../src/storybook.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


const preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Introduction', 'Tokens', 'Forms', 'Common', 'Widgets', '*'],
      },
    },
    docs: {
      toc: true,
    }
  },
};

export default preview;