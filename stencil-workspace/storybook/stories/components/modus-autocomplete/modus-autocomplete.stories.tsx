import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-autocomplete-storybook-docs.mdx';

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
      description: 'The dropdown\'s z-index',
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'string' },
      },
    },
    errorText: {
      name: 'error-text',
      description: "The autocomplete's error text",
      table: {
        type: { summary: 'string' },
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
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      }
    },
    size: {
      control: {
        options: ['medium', 'large'],
        type: 'select',
      },
      description: 'The size of the autocomplete',
      table: {
        defaultValue: { summary: "'medium'" },
        type: { summary: "'medium' | 'large'" },
      },
    },
    value: {
      description: "The autocomplete's value",
      table: {
        type: { summary: 'string' },
      },
    },
    addChip: {
      description: "Adds chips functionality to the autocomplete",
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    }
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    actions: {
      handles: [
        'valueChange',
        'optionSelected',
      ],
    },
    docs: {
      inlineStories: true,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

export const Default = ({
                          ariaLabel,
                          clearable,
                          disabled,
                          dropdownMaxHeight,
                          dropdownZIndex,
                          errorText,
                          includeSearchIcon,
                          label,
                          noResultsFoundText,
                          noResultsFoundSubtext,
                          placeholder,
                          readOnly,
                          required,
                          showNoResultsFoundMessage,
                          showOptionsOnFocus,
                          size,
                          value }) => html`
  <div style="width: 600px">
    <modus-autocomplete
      id="autocomplete-default"
      aria-label=${ariaLabel}
      clearable=${clearable}
      disabled=${disabled}
      dropdown-max-height=${dropdownMaxHeight}
      dropdown-z-index=${dropdownZIndex}
      error-text=${errorText}
      include-search-icon=${includeSearchIcon}
      label=${label}
      no-results-found-text=${noResultsFoundText}
      no-results-found-subtext=${noResultsFoundSubtext}
      placeholder=${placeholder}
      read-only=${readOnly}
      required=${required}
      show-no-results-found-message=${showNoResultsFoundMessage}
      show-options-on-focus=${showOptionsOnFocus}
      size=${size}
      value=${value}>
    </modus-autocomplete>
  </div>
  ${setAutocomplete()}
`;
Default.args = {
  ariaLabel: 'autocomplete',
  clearable: false,
  disabled: false,
  dropdownMaxHeight: '300px',
  dropdownZIndex: '1',
  errorText: '',
  includeSearchIcon: true,
  label: 'Default Autocomplete',
  noResultsFoundText: 'No results found',
  noResultsFoundSubtext: 'Check spelling or try a different keyword',
  placeholder: 'Search...',
  readOnly: false,
  required: false,
  showNoResultsFoundMessage: true,
  showOptionsOnFocus: false,
  size: 'medium',
  value: '',
}

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the data table data for the default story.
const setAutocomplete = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#autocomplete-default').options = ['Apple', 'Banana', 'Orange'];
  `;

  return tag;
};

export const WithOption = ({
                             ariaLabel,
                             clearable,
                             disabled,
                             dropdownMaxHeight,
                             dropdownZIndex,
                             errorText,
                             includeSearchIcon,
                             label,
                             noResultsFoundText,
                             noResultsFoundSubtext,
                             placeholder,
                             readOnly,
                             required,
                             showNoResultsFoundMessage,
                             showOptionsOnFocus,
                             size,
                             value }) => html`
  <div style="width: 600px">
    <modus-autocomplete
      id="autocomplete-with-option"
      aria-label=${ariaLabel}
      clearable=${clearable}
      disabled=${disabled}
      dropdown-max-height=${dropdownMaxHeight}
      dropdown-z-index=${dropdownZIndex}
      error-text=${errorText}
      include-search-icon=${includeSearchIcon}
      label=${label}
      no-results-found-text=${noResultsFoundText}
      no-results-found-subtext=${noResultsFoundSubtext}
      placeholder=${placeholder}
      read-only=${readOnly}
      required=${required}
      show-no-results-found-message=${showNoResultsFoundMessage}
      show-options-on-focus=${showOptionsOnFocus}
      size=${size}
      value=${value}>
    </modus-autocomplete>
  </div>
  ${setAutocompleteWithOption()}
`;
WithOption.args = {
  ariaLabel: 'autocomplete',
  clearable: false,
  disabled: false,
  dropdownMaxHeight: '300px',
  dropdownZIndex: '1',
  errorText: '',
  includeSearchIcon: true,
  label: 'Autocomplete using option model',
  noResultsFoundText: 'No results found',
  noResultsFoundSubtext: 'Check spelling or try a different keyword',
  placeholder: 'Search...',
  readOnly: false,
  required: false,
  showNoResultsFoundMessage: true,
  showOptionsOnFocus: false,
  size: 'medium',
  value: '',
}
// The <script> tag cannot be used in the MDX file, so we use this method to
// set the data table data for the default story.
const setAutocompleteWithOption = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#autocomplete-with-option').options = [{ id: '0', value: 'Apple' }, { id: '1', value: 'Banana' }, { id: '2', value: 'Orange' }];
  `;

  return tag;
};

export const WithChips = ({
  ariaLabel,
  clearable,
  disabled,
  dropdownMaxHeight,
  dropdownZIndex,
  errorText,
  includeSearchIcon,
  label,
  noResultsFoundText,
  noResultsFoundSubtext,
  placeholder,
  readOnly,
  required,
  showNoResultsFoundMessage,
  size,
  value,
 addChip }) => html`
<div style="width: 600px">
<modus-autocomplete
id="autocomplete-with-chips"
aria-label=${ariaLabel}
clearable=${clearable}
disabled=${disabled}
dropdown-max-height=${dropdownMaxHeight}
dropdown-z-index=${dropdownZIndex}
error-text=${errorText}
include-search-icon=${includeSearchIcon}
label=${label}
no-results-found-text=${noResultsFoundText}
no-results-found-subtext=${noResultsFoundSubtext}
placeholder=${placeholder}
read-only=${readOnly}
required=${required}
show-no-results-found-message=${showNoResultsFoundMessage}
size=${size}
value=${value}
add-chip=${addChip}>
</modus-autocomplete>
</div>
${setAutocompleteWithChips()}
`;
WithChips.args = {
ariaLabel: 'autocomplete',
clearable: false,
disabled: false,
dropdownMaxHeight: '300px',
dropdownZIndex: '1',
errorText: '',
includeSearchIcon: true,
label: 'Autocomplete using option model',
noResultsFoundText: 'No results found',
noResultsFoundSubtext: 'Check spelling or try a different keyword',
placeholder: 'Search...',
readOnly: false,
required: false,
showNoResultsFoundMessage: true,
size: 'medium',
value: '',
addChip: true
}
const setAutocompleteWithChips = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#autocomplete-with-chips').options = [{ id: '0', value: 'Apple' }, { id: '1', value: 'Banana' }, { id: '2', value: 'Orange' }];
  `;

  return tag;
};
export const WithCustomOption = ({
                                   ariaLabel,
                                   clearable,
                                   disabled,
                                   dropdownMaxHeight,
                                   dropdownZIndex,
                                   errorText,
                                   includeSearchIcon,
                                   label,
                                   noResultsFoundText,
                                   noResultsFoundSubtext,
                                   placeholder,
                                   readOnly,
                                   required,
                                   showNoResultsFoundMessage,
                                   showOptionsOnFocus,
                                   size,
                                   value }) => html`
  <div style="width: 600px">
    <modus-autocomplete
      aria-label=${ariaLabel}
      clearable=${clearable}
      disabled=${disabled}
      dropdown-max-height=${dropdownMaxHeight}
      dropdown-z-index=${dropdownZIndex}
      error-text=${errorText}
      include-search-icon=${includeSearchIcon}
      label=${label}
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
  errorText: '',
  includeSearchIcon: true,
  label: 'Employee Search',
  noResultsFoundText: 'No results found',
  noResultsFoundSubtext: 'Check spelling or try a different keyword',
  placeholder: 'Search...',
  readOnly: false,
  required: false,
  showNoResultsFoundMessage: true,
  showOptionsOnFocus: false,
  size: 'medium',
  value: '',
}
