import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-badge-storybook-docs.mdx';

export default {
  title: 'Components/Badge',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The badge's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      options: ['danger', 'dark', 'primary', 'secondary', 'success', 'tertiary', 'warning'],
      type: 'select',
      description: 'The color of the badge',
      table: {
        defaultValue: { summary: `'primary'` },
        type: {
          summary: `'danger' | 'dark' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning'`,
        },
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      type: 'select',
      description: 'The size of the badge',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      },
    },
    type: {
      options: ['counter', 'default', 'text'],
      type: 'select',
      description: 'The type of the badge',
      table: {
        defaultValue: { summary: `'default'` },
        type: { summary: `'counter' | 'default' | 'text'` },
      },
    },
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1346-16&m=dev',
    },
  },
};

// TODO - Figure how to work with slots.
export const Default = ({ ariaLabel, color, size, type }) => html`
  <modus-badge aria-label=${ariaLabel} color=${color} size=${size} type=${type}> Default </modus-badge>
`;
Default.args = {
  ariaLabel: '',
  color: 'primary',
  size: 'medium',
  type: 'default',
};

export const Counter = ({ ariaLabel, color, size, type }) => html`
  <modus-badge aria-label=${ariaLabel} color=${color} size=${size} type=${type}> 12 </modus-badge>
`;
Counter.args = {
  ariaLabel: '',
  color: 'primary',
  size: 'medium',
  type: 'counter',
};

export const Text = ({ ariaLabel, color, size, type }) => html`
  <modus-badge aria-label=${ariaLabel} color=${color} size=${size} type=${type}> Text </modus-badge>
`;
Text.args = { ariaLabel: '', color: 'primary', size: 'medium', type: 'text' };
