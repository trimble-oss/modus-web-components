import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-badge-storybook-docs.mdx';

export default {
  title: 'Components/Badge',
  argTypes: {
    color: {
      control: {
        options: ['danger', 'dark', 'primary', 'secondary', 'success', 'tertiary', 'warning'],
        type: 'select',
      },
      description: 'The color of the badge',
      table: {
        defaultValue: { summary: `'primary'` },
        type: { summary: `'danger' | 'dark' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning'` },
      }
    },
    size: {
      control: {
        options: ['small', 'medium', 'large'],
        type: 'select',
      },
      description: 'The size of the badge',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      }
    },
    type: {
      control: {
        options: ['counter', 'default', 'text'],
        type: 'select',
      },
      description: 'The type of the badge',
      table: {
        defaultValue: { summary: `'default'` },
        type: { summary: `'counter' | 'default' | 'text'` },
      }
    }
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true
    },
  }
};

// TODO - Figure how to work with slots.
export const Default = ({ color, size, type }) => html`
  <modus-badge
    color=${color}
    size=${size}
    type=${type}>
    Default
  </modus-badge>
`;
Default.args = { color: 'primary', size: 'medium', type: 'default' };

export const Counter = ({ color, size, type }) => html`
  <modus-badge
    color=${color}
    size=${size}
    type=${type}>
    Counter
  </modus-badge>
`;
Counter.args = { color: 'primary', size: 'medium', type: 'counter' };

export const Text = ({ color, size, type }) => html`
  <modus-badge
    color=${color}
    size=${size}
    type=${type}>
    Text
  </modus-badge>
`;
Text.args = { color: 'primary', size: 'medium', type: 'text' };


