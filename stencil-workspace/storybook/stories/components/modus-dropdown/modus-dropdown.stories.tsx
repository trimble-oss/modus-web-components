// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-dropdown-storybook-docs.mdx';
import { html } from 'lit-html';
import { withActions } from '@storybook/addon-actions/decorator';

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
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      name: 'border-radius',
      description: 'The border radius of the dropdown list.',
      table: {
        type: { summary: 'string' },
      },
      type: { required: false },
    },
    customPlacement: {
      name: 'custom-placement',
      description: 'Determines custom dropdown placement offset.',
      table: {
        type: { summary: '{ top?: number; right?: number; bottom?: number; left?: number; }' },
      },
      type: { required: false },
    },
    disabled: {
      name: 'disabled',
      description: 'Whether the dropdown is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disableCloseOnSelect: {
      name: 'disable-close-on-select',
      description: 'Prevents the dropdown from closing when an option is selected.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    placement: {
      name: 'placement',
      description: 'The placement of the dropdown in relation to the toggleElement.',
      options: ['top', 'right', 'bottom', 'left'],
      type: 'select',
      table: {
        type: { summary: `'top' | 'right' | 'bottom' | 'left'` },

        defaultValue: { summary: 'bottom' },
      },
    },
    showDropdownListBorder: {
      name: 'show-dropdown-list-border',
      description: 'Whether to show the dropdown list border',
      table: {
        type: {
          summary: 'boolean',
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
  decorators: [withActions],
};

const DefaultTemplate = ({
  animateList,
  ariaLabel,
  borderRadius,
  customPlacement,
  disableCloseOnSelect,
  disabled,
  placement,
  showDropdownListBorder,
}) => html`
  <modus-dropdown
    animate-list=${animateList}
    aria-label=${ariaLabel}
    border-radius=${borderRadius}
    disabled=${disabled}
    disable-close-on-select=${disableCloseOnSelect}
    placement=${placement}
    show-dropdown-list-border=${showDropdownListBorder}
    toggle-element-id="toggleElement">
    <modus-button id="toggleElement" slot="dropdownToggle" show-caret="true">Dropdown</modus-button>
    <modus-list slot="dropdownList">
      <modus-list-item size="condensed" borderless>Item 1</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 2</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 3</modus-list-item>
    </modus-list>
  </modus-dropdown>
  ${initializeCustomPlacement(customPlacement)}
`;
export const Default = DefaultTemplate.bind({});
Default.args = {
  animateList: false,
  ariaLabel: '',
  borderRadius: '0',
  customPlacement: { top: 0, right: 0, bottom: 0, left: 0 },
  disabled: false,
  disableCloseOnSelect: false,
  placement: 'bottom',
  showDropdownListBorder: true,
};

const WithManyItemsTemplate = ({
  animateList,
  ariaLabel,
  borderRadius,
  customPlacement,
  disabled,
  disableCloseOnSelect,
  placement,
  showDropdownListBorder,
}) => html`
  <modus-dropdown
    animate-list=${animateList}
    aria-label=${ariaLabel}
    border-radius=${borderRadius}
    disabled=${disabled}
    disable-close-on-select=${disableCloseOnSelect}
    placement=${placement}
    show-dropdown-list-border=${showDropdownListBorder}
    toggle-element-id="toggleElement">
    <modus-button id="toggleElement" slot="dropdownToggle" show-caret="true">Dropdown</modus-button>
    <modus-list slot="dropdownList">
      <modus-list-item size="condensed" borderless>Item 1</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 2</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 3</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 4</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 5</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 6</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 7</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 8</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 9</modus-list-item>
      <modus-list-item size="condensed" borderless>Item 10</modus-list-item>
    </modus-list>
  </modus-dropdown>
  ${initializeCustomPlacement(customPlacement)}
`;
export const WithManyItems = WithManyItemsTemplate.bind({});
WithManyItems.args = {
  animateList: false,
  ariaLabel: '',
  borderRadius: '0',
  customPlacement: { top: 0, right: 0, bottom: 0, left: 0 },
  disabled: false,
  disableCloseOnSelect: false,
  placement: 'bottom',
  showDropdownListBorder: true,
};

function initializeCustomPlacement(customPlacement) {
  const tag = document.createElement('script');
  tag.innerHTML = `
  var modusDropdown = document.querySelector('modus-dropdown');
  modusDropdown.customPlacement = ${JSON.stringify(customPlacement)};
  `;
  return tag;
}
