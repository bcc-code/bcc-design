import "../src/storybook.css";

export const parameters = {
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

  tags: ['autodocs']
};

export default preview;