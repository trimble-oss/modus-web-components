import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-group-storybook-docs.mdx';


export default {
  title: 'Components/ButtonGroup',
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
    groupStyle: {
      name: 'group-style',
      control: {
        options: [ 'fill', 'outline'],
        type: 'select',
      },
      description: 'The style of the button group',
      table: {
        defaultValue: { summary: `'fill'` },
        type: { summary: `'fill' | 'outline'` },
      },
    },
    variant: {
      control: {
        options: ['primary', 'secondary'],
        type: 'select',
      },
      description: 'The variant of the button group',
      table: {
        defaultValue: { summary: `'primary'` },
        type: { summary: `'primary' | 'secondary'` },
      },
    },
    selectionType: {
      name: 'selection-type',
      control: {
        options: ['single', 'default'],
        type: 'select',
      },
      description: 'The selection type of button',
      table: {
        defaultValue: { summary: `'default'` },
        type: { summary: `'single' | 'default'` },
      },
    },
    tabIndexValue: {
      name: 'tab-index-value',
      description: 'Tab Index for the button',
      table: {
        type: { summary: 'number' },
      },
    },
  },

  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions:{
      handles: ['groupClick'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};
const Default = ({ ariaLabel, disabled, groupStyle, selectionType, tabIndexValue, variant }) => html`
  <modus-button-group aria-label=${ariaLabel} disabled=${disabled} group-style=${groupStyle} selection-type=${selectionType} tab-index-value=${tabIndexValue} variant=${variant}>
    <modus-button>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-button-group>
`;
const DefaultArgs = {
  ariaLabel: '',
  groupStyle: 'fill',
  selectionType: 'default',
  variant: 'primary',
  disabled: false,
  tabIndexValue: 0,
};
export const DefaultSelectionButtonGroup = Default.bind({});
DefaultSelectionButtonGroup.args = { ...DefaultArgs };

export const SingleSelectionButtonGroup = Default.bind({});
const SingleSelectionArgs = {
  ...DefaultArgs,
  selectionType: 'single',
};
SingleSelectionButtonGroup.args = { ...SingleSelectionArgs };

