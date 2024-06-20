import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-group-storybook-docs.mdx';

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
      control: {
        options: ['borderless', 'fill', 'outline'],
        type: 'select',
      },
      description: 'The style of the buttons in group, not all colors are supported for each button style',
      table: {
        defaultValue: { summary: `'outline'` },
        type: { summary: `'borderless' | 'fill' | 'outline'` },
      },
    },
    color: {
      control: {
        options: ['danger', 'primary', 'secondary', 'tertiary'],
        type: 'select',
      },
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
      control: {
        options: ['none', 'single', 'multiple'],
        type: 'select',
      },
      table: {
        defaultValue: { summary: `'none'` },
        type: { summary: `'none' | 'single' | 'multiple'` },
      },
    },
    size: {
      name: 'size',
      description: 'The size of the buttons',
      control: {
        options: ['small', 'medium', 'large'],
        type: 'select',
      },
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'small' | 'medium' | 'large'` },
      },
    },
  },

  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions: {
      handles: ['buttonGroupClick', 'buttonSelectionChange'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};
const Template = ({ ariaLabel, buttonStyle, color, disabled, selectionType, size }) => html`
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
const DefaultArgs = {
  ariaDisabled: '',
  ariaLabel: '',
  disabled: false,
  selectionType: 'none',
  size: 'medium',
  color: 'primary',
  buttonStyle: 'outline',
};
export const Default = Template.bind({});
Default.args = { ...DefaultArgs };

export const SingleSelection = Template.bind({});
SingleSelection.args = { ...DefaultArgs, selectionType: 'single' };

export const MultipleSelection = Template.bind({});
MultipleSelection.args = { ...DefaultArgs, selectionType: 'multiple' };
