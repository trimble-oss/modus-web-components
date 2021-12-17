import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-switch-storybook-docs.mdx';

export default {
  title: 'Components/Switch',
  argTypes: {
    checked: {
      description: 'Whether the switch is checked',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    disabled: {
      description: 'Whether the switch is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    label: {
      description: 'The switch\'s label',
      table: {
        type: { summary: 'string' }
      }
    }
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
      isToolshown: true
    },
  },
};

export const Default = ({ checked, disabled, label }) => html`
  <modus-switch
    checked=${checked}
    disabled=${disabled}
    label=${label}>
  </modus-switch>
`;
Default.args = {
  checked: false,
  disabled: false,
  label: 'Default'
};

export const Checked = ({ checked, disabled, label }) => html`
  <modus-switch
    checked=${checked}
    disabled=${disabled}
    label=${label}>
  </modus-switch>
`;
Checked.args = {
  checked: true,
  disabled: false,
  label: 'Checked'
};

export const Disabled = ({ checked, disabled, label }) => html`
  <modus-switch
    checked=${checked}
    disabled=${disabled}
    label=${label}>
  </modus-switch>
`;
Disabled.args = {
  checked: false,
  disabled: true,
  label: 'Disabled'
};

