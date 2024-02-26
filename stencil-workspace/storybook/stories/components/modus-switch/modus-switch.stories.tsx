import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-switch-storybook-docs.mdx';

export default {
  title: 'User Inputs/Switch',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The switch's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      description: 'Whether the switch is checked',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    label: {
      description: "The switch's label",
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: {
        options: ['small', 'medium'],
        type: 'select',
      },
      description: 'The size of the button',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium'` },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['switchClick'],
    },
    controls: { expanded: true },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

export const Medium = ({ ariaLabel, checked, disabled, label, size }) =>
  html`
    <modus-switch
      aria-label=${ariaLabel}
      checked=${checked}
      ?disabled=${disabled}
      label=${label}
      size=${size}>
    </modus-switch>
  `;
Medium.args = {
  ariaLabel: '',
  checked: false,
  disabled: false,
  label: 'Medium',
  size: 'medium',
};

export const Checked = ({ ariaLabel, checked, disabled, label, size }) =>
  html`
    <modus-switch
      aria-label=${ariaLabel}
      checked=${checked}
      ?disabled=${disabled}
      label=${label}
      size=${size}>
    </modus-switch>
  `;
Checked.args = {
  ariaLabel: '',
  checked: true,
  disabled: false,
  label: 'Checked',
  size: 'medium',
};

export const Disabled = ({ ariaLabel, checked, disabled, label, size }) =>
  html`
    <modus-switch
      aria-label=${ariaLabel}
      checked=${checked}
      ?disabled=${disabled}
      label=${label}
      size=${size}>
    </modus-switch>
  `;
Disabled.args = {
  ariaLabel: '',
  checked: false,
  disabled: true,
  label: 'Disabled',
  size: 'medium',
};
