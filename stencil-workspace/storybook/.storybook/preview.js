import React from 'react';
import { defineCustomElements } from '../../loader';
import yourTheme from './your-theme';
import { themes } from '@storybook/theming';
import addons from '@storybook/addons';
import { DocsContainer } from '@storybook/addon-docs';
import {
  useDarkMode
} from 'storybook-dark-mode';

defineCustomElements();

// get channel to listen to event emitter
const channel = addons.getChannel();


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
    stylePreview: true
  },
  backgrounds: {
    disable: true
  },
  docs: {
    theme: yourTheme,
    container: props => {
      const isDark = useDarkMode();
      const getBodyElement = () => {
        const iframe = document.getElementById('storybook-preview-iframe');

        if (!iframe) {
          return;
        }

        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        const target = iframeDocument?.querySelector('body');

        if (!target) {
          return document.body;
        }
      };

      React.useEffect(() => {
        document.body?.setAttribute('data-mwc-theme', isDark ? 'dark' : 'light');
      }, [isDark, useDarkMode]);



      return (
          <DocsContainer {...props} />
      );
    }
  },
  options: {
    storySort: {
      order: [
        'Introduction',
        ['Welcome', 'Getting Started'],
        'Components',
        'User Inputs',
        'Framework Integrations'
      ]
    }
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  }
}

