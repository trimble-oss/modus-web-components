import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-autocomplete-storybook-docs.mdx';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'User Inputs/Autocomplete',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The autocomplete's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    clearable: {
      description: 'Whether the autocomplete is clearable',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Whether the autocomplete is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    dropdownMaxHeight: {
      name: 'dropdown-max-height',
      description: 'The maximum height of the dropdown',
      table: {
        defaultValue: { summary: '300px' },
        type: { summary: 'string' },
      },
    },
    dropdownZIndex: {
      name: 'dropdown-z-index',
      description: "The dropdown's z-index",
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'string' },
      },
    },
    disableCloseOnSelect: {
      name: 'disable-close-on-select',
      description: 'Whether the autocomplete options always display on select',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    errorText: {
      name: 'error-text',
      description: "The autocomplete's error text",
      table: {
        type: { summary: 'string' },
      },
    },
    filterOptions: {
      name: 'filter-options',
      description: 'Function to filter options',
      table: {
        type: { summary: 'function' },
      },
    },
    includeSearchIcon: {
      name: 'include-search-icon',
      description: 'Whether to include the search icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    label: {
      description: "The autocomplete's label",
      table: {
        type: { summary: 'string' },
      },
    },
    loading: {
      description: 'Whether the autocomplete is in a loading state',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    noResultsFoundText: {
      name: 'no-results-found-text',
      description: "The autocomplete's no results found text",
      table: {
        defaultValue: { summary: 'No results found' },
        type: { summary: 'string' },
      },
    },
    noResultsFoundSubtext: {
      name: 'no-results-found-subtext',
      description: "The autocomplete's no results found subtext",
      table: {
        defaultValue: { summary: 'Check spelling or try a different keyword' },
        type: { summary: 'string' },
      },
    },
    placeholder: {
      description: "The autocomplete's placeholder text",
      table: {
        type: { summary: 'string' },
      },
    },
    readOnly: {
      name: 'read-only',
      description: 'Whether the autocomplete is read-only',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    required: {
      description: 'Whether the autocomplete is required',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    showNoResultsFoundMessage: {
      name: 'show-no-results-found-message',
      description: 'Whether to show the no results found message when no results are found',
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    showOptionsOnFocus: {
      name: 'show-options-on-focus',
      description: 'Whether to show autocomplete options when focus',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      options: ['medium', 'large'],
      type: 'select',
      description: 'The size of the autocomplete',
      table: {
        defaultValue: { summary: "'medium'" },
        type: { summary: "'medium' | 'large'" },
      },
    },
    value: {
      description: "The autocomplete's value",
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    multiple: {
      description:
        'When enabled, multiple options can be selected in the component. And selected options are shown as chips in the input',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    actions: {
      handles: ['valueChange', 'optionSelected', 'selectionsChanged'],
    },
    docs: {
      inlineStories: true,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=5799-22364&m=dev',
    },
  },
  decorators: [withActions],
};

const Template = ({
  ariaLabel,
  clearable,
  disabled,
  dropdownMaxHeight,
  dropdownZIndex,
  disableCloseOnSelect,
  errorText,
  includeSearchIcon,
  label,
  multiple,
  noResultsFoundText,
  noResultsFoundSubtext,
  placeholder,
  readOnly,
  required,
  showNoResultsFoundMessage,
  showOptionsOnFocus,
  size,
  value,
  options,
}) => html`
  <div style="width: 600px">
    <modus-autocomplete
      id="autocomplete-default"
      aria-label=${ariaLabel}
      clearable=${clearable}
      ?disabled=${disabled}
      disable-close-on-select=${disableCloseOnSelect}
      dropdown-max-height=${dropdownMaxHeight}
      dropdown-z-index=${dropdownZIndex}
      error-text=${errorText}
      include-search-icon=${includeSearchIcon}
      label=${label}
      multiple=${multiple}
      no-results-found-text=${noResultsFoundText}
      no-results-found-subtext=${noResultsFoundSubtext}
      placeholder=${placeholder}
      read-only=${readOnly}
      ?required=${required}
      show-no-results-found-message=${showNoResultsFoundMessage}
      show-options-on-focus=${showOptionsOnFocus}
      size=${size}
      .value=${value}
      .options=${options}>
    </modus-autocomplete>
  </div>
`;

const defaultOptions = [
  'Apple',
  'Banana',
  'Orange',
  'Mango',
  'Pineapple',
  'Grapes',
  'Watermelon',
  'Strawberry',
  'Blueberry',
  'Raspberry',
  'Blackberry',
  'Cherry',
  'Peach',
  'Pear',
  'Plum',
  'Kiwi',
  'Lemon',
  'Lime',
  'Papaya',
  'Passion Fruit',
];

const defaultArgs = {
  ariaLabel: 'autocomplete',
  clearable: false,
  disabled: false,
  disableCloseOnSelect: false,
  dropdownMaxHeight: '300px',
  dropdownZIndex: '1',
  errorText: '',
  includeSearchIcon: true,
  label: 'Default Autocomplete',
  multiple: false,
  noResultsFoundText: 'No results found',
  noResultsFoundSubtext: 'Check spelling or try a different keyword',
  placeholder: 'Search...',
  readOnly: false,
  required: false,
  showNoResultsFoundMessage: true,
  showOptionsOnFocus: false,
  size: 'medium',
  value: '',
  options: defaultOptions,
};

const customOptions = [
  { id: 'ID0', value: 'Apple' },
  { id: 'ID1', value: 'Banana' },
  { id: 'ID2', value: 'Orange' },
];

export const Default = Template.bind({});
Default.args = defaultArgs;

export const WithOption = Template.bind({});
WithOption.args = { ...defaultArgs, label: 'Autocomplete using option model' };

export const MultipleSelection = Template.bind({});
MultipleSelection.args = {
  ...defaultArgs,
  label: 'Autocomplete with multiple selection',
  multiple: true,
  value: ['Apple', 'Banana'],
  options: customOptions,
};

export const WithCustomOption = ({
  ariaLabel,
  clearable,
  disabled,
  dropdownMaxHeight,
  dropdownZIndex,
  disableCloseOnSelect,
  errorText,
  includeSearchIcon,
  label,
  multiple,
  noResultsFoundText,
  noResultsFoundSubtext,
  placeholder,
  readOnly,
  required,
  showNoResultsFoundMessage,
  showOptionsOnFocus,
  size,
  value,
}) => html`
  <div style="width: 600px">
    <modus-autocomplete
      aria-label=${ariaLabel}
      clearable=${clearable}
      disabled=${disabled}
      dropdown-max-height=${dropdownMaxHeight}
      dropdown-z-index=${dropdownZIndex}
      disable-close-on-select=${disableCloseOnSelect}
      error-text=${errorText}
      include-search-icon=${includeSearchIcon}
      label=${label}
      multiple=${multiple}
      no-results-found-text=${noResultsFoundText}
      no-results-found-subtext=${noResultsFoundSubtext}
      placeholder=${placeholder}
      read-only=${readOnly}
      required=${required}
      show-no-results-found-message=${showNoResultsFoundMessage}
      show-options-on-focus=${showOptionsOnFocus}
      size=${size}
      value=${value}>
      <li data-search-value="The Git Guru" data-id="1" style="padding: 8px">
        <div style="font-weight: bold">The Git Guru</div>
        <div style="font-size: 12px">Lead DevOps Engineer</div>
      </li>
      <li data-search-value="Bob the Builder" data-id="2" style="padding: 8px">
        <div style="font-weight: bold">Bob the Builder</div>
        <div style="font-size: 12px">Senior Construction Engineer</div>
      </li>
    </modus-autocomplete>
  </div>
`;

WithCustomOption.args = {
  ariaLabel: 'autocomplete',
  clearable: false,
  disabled: false,
  dropdownMaxHeight: '300px',
  dropdownZIndex: '1',
  disableCloseOnSelect: false,
  errorText: '',
  includeSearchIcon: true,
  label: 'Employee Search',
  multiple: false,
  noResultsFoundText: 'No results found',
  noResultsFoundSubtext: 'Check spelling or try a different keyword',
  placeholder: 'Search...',
  readOnly: false,
  required: false,
  showNoResultsFoundMessage: true,
  showOptionsOnFocus: false,
  size: 'medium',
  value: '',
};

export const WithDynamicOptions = ({
  ariaLabel,
  clearable,
  disabled,
  dropdownMaxHeight,
  dropdownZIndex,
  disableCloseOnSelect,
  errorText,
  includeSearchIcon,
  label,
  loading,
  multiple,
  noResultsFoundText,
  noResultsFoundSubtext,
  placeholder,
  readOnly,
  required,
  showNoResultsFoundMessage,
  showOptionsOnFocus,
  size,
  value,
}) => html`
  <div style="width: 600px">
    <modus-autocomplete
      aria-label=${ariaLabel}
      clearable=${clearable}
      disabled=${disabled}
      dropdown-max-height=${dropdownMaxHeight}
      dropdown-z-index=${dropdownZIndex}
      disable-close-on-select=${disableCloseOnSelect}
      error-text=${errorText}
      include-search-icon=${includeSearchIcon}
      id="dynamic-options"
      label=${label}
      loading=${loading}
      multiple=${multiple}
      no-results-found-text=${noResultsFoundText}
      no-results-found-subtext=${noResultsFoundSubtext}
      placeholder=${placeholder}
      read-only=${readOnly}
      required=${required}
      show-no-results-found-message=${showNoResultsFoundMessage}
      show-options-on-focus=${showOptionsOnFocus}
      size=${size}
      .value=${value}>
    </modus-autocomplete>
  </div>
  ${setDynamicOptions()}
`;
WithDynamicOptions.args = {
  ariaLabel: 'autocomplete',
  clearable: false,
  disabled: false,
  dropdownMaxHeight: '300px',
  dropdownZIndex: '1',
  disableCloseOnSelect: false,
  errorText: '',
  includeSearchIcon: true,
  label: 'Dynamic Autocomplete',
  loading: false,
  multiple: false,
  noResultsFoundText: 'No results found',
  noResultsFoundSubtext: 'Check spelling or try a different keyword',
  placeholder: 'Search...',
  readOnly: false,
  required: false,
  showNoResultsFoundMessage: true,
  showOptionsOnFocus: false,
  size: 'medium',
  value: '',
};
const setDynamicOptions = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
        (function () {
          const modusAutocomplete = document.querySelector('#dynamic-options');
          if (modusAutocomplete) {
            const options = [
              { id: '0', value: 'Apple' },
              { id: '1', value: 'Banana' },
              { id: '2', value: 'Orange' },
              { id: '3', value: 'Mango' },
              { id: '4', value: 'Pineapple' },
            ];
            const dynamicOptions = [
              { id: '5', value: 'Grapes' },
              { id: '6', value: 'Watermelon' },
              { id: '7', value: 'Strawberry' },
              { id: '8', value: 'Blueberry' },
              { id: '9', value: 'Raspberry' },
              { id: '10', value: 'Blackberry' },
              { id: '11', value: 'Cherry' },
              { id: '12', value: 'Peach' },
              { id: '13', value: 'Pear' },
              { id: '14', value: 'Plum' },
              { id: '15', value: 'Kiwi' },
              { id: '16', value: 'Lemon' },
              { id: '17', value: 'Lime' },
              { id: '18', value: 'Papaya' },
              { id: '19', value: 'Passion Fruit' },
            ];
            function getFilteredOptions(value) {
              modusAutocomplete.loading = true;
              return new Promise((resolve) => {
                setTimeout(() => {
                  const filteredOptions = [...options, ...dynamicOptions].filter((option) =>
                    (option.value ?? option).toLowerCase().includes(value.toLowerCase())
                  );
                  resolve(filteredOptions);
                  modusAutocomplete.loading = false;
                }, 1500);
              });
            }
            modusAutocomplete.options = options;
            modusAutocomplete.filterOptions = getFilteredOptions;
          }
        }())
  `;

  return tag;
};
