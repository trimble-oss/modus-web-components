import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-storybook-docs.mdx';

export default {
  title: 'Components/Button',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: 'The button\'s aria-label',
      table: {
        type: { summary: 'string' }
      }
    },
    buttonStyle: {
      name: 'button-style',
      control: {
        options: ['borderless', 'fill', 'outline'],
        type: 'select',
      },
      description: 'The style of the button',
      table: {
        defaultValue: { summary: `'fill'` },
        type: { summary: `'borderless' | 'fill' | 'outline'` },
      }
    },
    color: {
      control: {
        options: ['danger', 'default', 'primary', 'secondary', 'warning'],
        type: 'select',
      },
      description: 'The color of the button',
      table: {
        defaultValue: { summary: `'default'` },
        type: { summary: `'danger' | 'default' | 'primary' | 'secondary' | 'warning'` },
      }
    },
    disabled: {
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    size: {
      control: {
        options: ['small', 'medium', 'large'],
        type: 'select',
      },
      description: 'The size of the button',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      }
    }
  },
  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions: {
      handles: ['buttonClick'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true
    },
  },
};

export const Default = ({ ariaLabel, buttonStyle, color, disabled, size }) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size}>
    Default
  </modus-button>
`;
Default.args = { ariaLabel: '', buttonStyle: 'fill', color: 'default', disabled: false, size: 'medium' };

export const Borderless = ({ ariaLabel, buttonStyle, color, disabled, size }) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size}>
    Borderless
  </modus-button>
`;
Borderless.args = { ariaLabel: '', buttonStyle: 'borderless', color: 'default', disabled: false, size: 'medium' };

export const Outline = ({ ariaLabel, buttonStyle, color, disabled, size }) => html`
  <modus-button
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    disabled=${disabled}
    size=${size}>
    Outline
  </modus-button>
`;
Outline.args = { ariaLabel: '', buttonStyle: 'outline', color: 'default', disabled: false, size: 'medium' };

