// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-dropdown-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Dropdown',
  argTypes: {
    animateList: {
      name: 'animate-list',
      description: 'Whether the dropdown list should animate',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
     },
    ariaLabel: {
      name: 'aria-label',
      description: "The dropdowns's aria-label",
      table: {
        type: { summary: 'string' }
      },
    },
    disabled: {
    name: 'disabled',
    description: 'Whether the dropdown is disabled',
    table: {
       type: { summary: 'boolean' },
       defaultValue: { summary: false },
      }
    },
    placement: {
      name: 'placement',
     description: 'The placement of the dropdown in relation to the toggleElement.',
     control: {
      options: [
        'top' , 'right' , 'bottom' , 'left'
      ],
      type: 'select',
    },
      table: { type: { summary: `'top' | 'right' | 'bottom' | 'left'` },

    defaultValue: { summary: 'bottom'}
    } },
    showDropdownListBorder: {
      name: 'show-dropdown-list-border',
      description: 'Whether to show the dropdown list border',
      table: {
        type:
        {
           summary: 'boolean'
           },
           defaultValue: { summary: true },
          },
     },
  },
  parameters: {
    actions: {
      handles: ['dropdownClose'],
    },
    docs: {
      page: docs,
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      isToolshown: true,
    },
  },
};


const Template = ({ animateList, ariaLabel, disabled, placement, showDropdownListBorder }) => html`
  <modus-dropdown animate-list=${animateList} aria-label=${ariaLabel} disabled=${disabled} placement=${placement} show-dropdown-list-border=${showDropdownListBorder} toggle-element-id="toggleElement">
  <modus-button id="toggleElement" slot="dropdownToggle" show-caret="true">Dropdown</modus-button>
  <modus-list slot="dropdownList">
    <modus-list-item size="condensed" borderless>Item 1</modus-list-item>
    <modus-list-item size="condensed" borderless>Item 2</modus-list-item>
    <modus-list-item size="condensed" borderless>Item 3</modus-list-item>
  </modus-list>
  </modus-dropdown>
`;
export const Default = Template.bind({});
Default.args = {
animateList: false,
ariaLabel: '',
disabled: false,
placement: 'bottom',
showDropdownListBorder: true,
}



