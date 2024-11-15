import { defineCustomElements } from '../../loader';
import yourTheme from './your-theme';
import { themes } from '@storybook/theming';
import '../../dist/modus-web-components/modus-web-components.css';

defineCustomElements();

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    // Set the initial theme
    current: 'light',
    // Override the default dark theme
    dark: { ...themes.dark, appBg: '#252a2e' },
    stylePreview: true,
  },
  backgrounds: {
    disable: true,
  },
  docs: {
    theme: yourTheme,
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Getting Started', 'Accessibility', 'Contributing'],
        'Components',
        'User Inputs',
        'Framework Integrations',
      ],
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};
export const tags = ['autodocs'];
