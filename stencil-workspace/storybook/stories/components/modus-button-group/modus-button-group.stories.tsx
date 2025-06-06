import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-group-storybook-docs.mdx';

import { withActions } from '@storybook/addon-actions/decorator';
export default {
  title: 'Components/Button Group',
  argTypes: {
    ariaDisabled: {
      name: 'aria-disabled',
      description: "The button group's aria-disabled state",
      table: {
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      name: 'aria-label',
      description: "The button's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    buttonStyle: {
      name: 'button-style',
      options: ['borderless', 'fill', 'outline'],
      type: 'select',
      description: 'The style of the buttons in group, not all colors are supported for each button style',
      table: {
        defaultValue: { summary: `'outline'` },
        type: { summary: `'borderless' | 'fill' | 'outline'` },
      },
    },
    color: {
      options: ['danger', 'primary', 'secondary', 'tertiary'],
      type: 'select',
      description: 'The color of the buttons in group, not all button styles are supported for each color',
      table: {
        defaultValue: { summary: `'primary'` },
        type: { summary: `'danger' | 'primary' | 'secondary' | 'tertiary'` },
      },
    },
    disabled: {
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    selectionType: {
      name: 'selection-type',
      description: 'The type of selection',
      options: ['none', 'single', 'multiple'],
      type: 'select',
      table: {
        defaultValue: { summary: `'none'` },
        type: { summary: `'none' | 'single' | 'multiple'` },
      },
    },
    size: {
      name: 'size',
      description: 'The size of the buttons',
      options: ['small', 'medium', 'large'],
      type: 'select',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      },
    },
  },

  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions: {
      handles: ['buttonGroupClick modus-button-group', 'buttonSelectionChange modus-button-group'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=24902-8726&m=dev',
    },
  },
  decorators: [withActions],
};
const DefaultTemplate = ({ ariaLabel, buttonStyle, color, disabled, selectionType, size }) => html`
  <modus-button-group
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    .disabled=${disabled}
    selection-type=${selectionType}
    size=${size}>
    <modus-button>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-button-group>
`;
const SingleSelectionTemplate = ({ ariaLabel, buttonStyle, color, disabled, selectionType, size }) => html`
  <modus-button-group
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    .disabled=${disabled}
    selection-type=${selectionType}
    size=${size}>
    <modus-button selected>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-button-group>
`;
const MultipleSelectionTemplate = ({ ariaLabel, buttonStyle, color, disabled, selectionType, size }) => html`
  <modus-button-group
    aria-label=${ariaLabel}
    button-style=${buttonStyle}
    color=${color}
    .disabled=${disabled}
    selection-type=${selectionType}
    size=${size}>
    <modus-button selected>Button 1</modus-button>
    <modus-button selected>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-button-group>
`;
const DefaultArgs = {
  ariaDisabled: '',
  ariaLabel: '',
  disabled: false,
  selectionType: 'none',
  size: 'medium',
  color: 'primary',
  buttonStyle: 'outline',
};
export const Default = DefaultTemplate.bind({});
Default.args = { ...DefaultArgs };

export const SingleSelection = SingleSelectionTemplate.bind({});
SingleSelection.args = { ...DefaultArgs, selectionType: 'single' };

export const MultipleSelection = MultipleSelectionTemplate.bind({});
MultipleSelection.args = { ...DefaultArgs, selectionType: 'multiple' };
