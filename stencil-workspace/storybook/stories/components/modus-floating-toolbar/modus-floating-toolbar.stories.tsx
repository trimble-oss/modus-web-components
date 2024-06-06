import { html } from 'lit-html';
import docs from './modus-floating-toolbar-storybook-docs.mdx';

export default {
  title: 'Components/Floating Toolbar',
  component: 'modus-floating-toolbar',
  argTypes: {

    ariaLabel: {
      name: 'aria-label',
      description: "The toolbar's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      name: 'disabled',
      description:'Whether the toolbar is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    tabIndex: {
      name: 'tab-index',
      description: 'Tab Index for the toolbar',
      table: {
        type: { summary: 'number' },
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

const Template = ({ ariaLabel, disabled, tabIndex }) => html`
  <modus-floating-toolbar .disabled=${disabled} aria-label=${ariaLabel} tab-index=${tabIndex}>
    <modus-button>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-divider></modus-divider>
    <modus-button>Button 3</modus-button>
  </modus-floating-toolbar>
`;

const IconOnlyTemplate = ({ ariaLabel, disabled, tabIndex }) => html`
  <modus-floating-toolbar .disabled=${disabled} aria-label=${ariaLabel} tab-index=${tabIndex}>
    <modus-button button-style="borderless" icon-only="notifications"></modus-button>
    <modus-divider></modus-divider>
    <modus-button button-style="borderless" icon-only="notifications"></modus-button>
    <modus-divider></modus-divider>
    <modus-button button-style="borderless" icon-only="notifications"></modus-button>
  </modus-floating-toolbar>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'Floating Toolbar',
  disabled: false,
  tabIndex: 0,
};

export const IconOnly = IconOnlyTemplate.bind({});
IconOnly.args = {
  ariaLabel: 'Floating Toolbar',
  disabled: false,
  tabIndex: 0,
};

