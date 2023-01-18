import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-autocomplete-storybook-docs.mdx';

export default {
  title: 'User Inputs/Autocomplete',
  argTypes: {},
  parameters: {
    controls: { disabled: true, expanded: true, sort: 'alpha' },
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

export const Default = () => html`
  <div style="width: 600px">
    <modus-autocomplete id="autocomplete-default" label="Default Autocomplete" placeholder="Search..."></modus-autocomplete>
  </div>
  ${setAutocomplete()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the data table data for the default story.
const setAutocomplete = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#autocomplete-default').options = ['Apple', 'Banana', 'Orange'];
  `;

  return tag;
};

export const WithOption = () => html`
  <div style="width: 600px">
    <modus-autocomplete id="autocomplete-with-option" label="Autocomplete using option model" placeholder="Search..."></modus-autocomplete>
  </div>
  ${setAutocompleteWithOption()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the data table data for the default story.
const setAutocompleteWithOption = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#autocomplete-with-option').options = [{ id: '0', value: 'Apple' }, { id: '1', value: 'Banana' }, { id: '2', value: 'Orange' }];
  `;

  return tag;
};

export const WithCustomOption = () => html`
  <div style="width: 600px">
    <modus-autocomplete label="Employee Search" clearable placeholder="Search...">
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
