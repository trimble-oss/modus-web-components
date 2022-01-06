import { defineCustomElements } from '../../loader';
import yourTheme from './your-theme';

defineCustomElements();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: yourTheme,
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Getting Started'],
        'Components',
        'User Inputs'
      ]
    }
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  }
}
