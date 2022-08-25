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

export const Default = ({ ariaLabel, checked, disabled, label }) =>
  html`
    <modus-switch
      aria-label=${ariaLabel}
      checked=${checked}
      disabled=${disabled}
      label=${label}>
    </modus-switch>
  `;
Default.args = {
  ariaLabel: '',
  checked: false,
  disabled: false,
  label: 'Default',
};

export const Checked = ({ ariaLabel, checked, disabled, label }) =>
  html`
    <modus-switch
      aria-label=${ariaLabel}
      checked=${checked}
      disabled=${disabled}
      label=${label}>
    </modus-switch>
  `;
Checked.args = {
  ariaLabel: '',
  checked: true,
  disabled: false,
  label: 'Checked',
};

export const Disabled = ({ ariaLabel, checked, disabled, label }) =>
  html`
    <modus-switch
      aria-label=${ariaLabel}
      checked=${checked}
      disabled=${disabled}
      label=${label}>
    </modus-switch>
  `;
Disabled.args = {
  ariaLabel: '',
  checked: false,
  disabled: true,
  label: 'Disabled',
};
