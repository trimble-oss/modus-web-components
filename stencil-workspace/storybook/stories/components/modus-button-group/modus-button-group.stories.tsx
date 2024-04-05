import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-group-storybook-docs.mdx';


export default {
  title: 'Components/Button Group',
  argTypes:{
    ariaLabel: {
      name: 'aria-label',
      description: "The button's aria-label",
      table: {
        type: { summary: 'string' },
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
    }
  },

  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions:{
      handles: ['buttonGroupClick', 'selectionChange'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};
const Template = ({ ariaLabel, disabled, selectionType, size }) => html`
  <modus-button-group aria-label=${ariaLabel} .disabled=${disabled} selection-type=${selectionType} size=${size}>
    <modus-button>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-button-group>
`;
const DefaultArgs = {
  ariaLabel: '',
  disabled: false,
  selectionType: 'none',
  size: 'medium',
};
export const Default = Template.bind({});
Default.args = { ...DefaultArgs };

export const SingleSelection = Template.bind({});
SingleSelection.args = { ...DefaultArgs, selectionType: 'single' };

export const MultipleSelection = Template.bind({});
MultipleSelection.args = { ...DefaultArgs, selectionType: 'multiple' };


