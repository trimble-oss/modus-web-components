import { html } from 'lit-html';
import docs from './modus-toolbar-storybook-docs.mdx';

export default {
  title: 'Components/Toolbar',
  component: 'modus-toolbar',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The Toolbar's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      name: 'disabled',
      description: 'Whether the Toolbar is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['buttonClick'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
  },
};

const Template = ({ ariaLabel, disabled }) => html`
  <modus-toolbar .disabled=${disabled} aria-label=${ariaLabel}>
    <modus-button>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-toolbar>
`;

const IconOnlyTemplate = ({ ariaLabel, disabled }) => html`
  <modus-toolbar .disabled=${disabled} aria-label=${ariaLabel}>
    <modus-tooltip text="Undo" position="top">
      <modus-button icon-only="undo"></modus-button>
    </modus-tooltip>
    <modus-tooltip text="Redo" position="top">
      <modus-button icon-only="redo"></modus-button>
    </modus-tooltip>
    <modus-tooltip text="Expand" position="top">
      <modus-button icon-only="expand"></modus-button>
    </modus-tooltip>
    <modus-tooltip text="Collapse" position="top">
      <modus-button icon-only="collapse"></modus-button>
    </modus-tooltip>
    <modus-divider></modus-divider>
    <modus-tooltip text="Window Dock / Undock" position="top">
      <modus-button icon-only="window_dock_undock"></modus-button>
    </modus-tooltip>
  </modus-toolbar>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Toolbar',
  disabled: false,
  tabIndex: 0,
};

export const IconOnly = IconOnlyTemplate.bind({});
IconOnly.args = {
  ariaLabel: 'Toolbar',
  disabled: false,
  tabIndex: 0,
};
