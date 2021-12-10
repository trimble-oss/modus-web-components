import { defineCustomElements } from '../loader';

defineCustomElements();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        'Components'
      ]
    }
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  }
}
