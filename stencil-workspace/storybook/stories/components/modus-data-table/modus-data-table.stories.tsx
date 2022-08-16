import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-data-table-storybook-docs.mdx';

export default {
  title: 'Components/Data Table',
  argTypes: {

  },
  parameters: {
    controls: { disabled: true, expanded: true, sort: 'alpha' },
    actions: {},
    docs: {
      inlineStories: false,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

export const Default = () => html`
  <div style="width: 800px">
    <modus-data-table />
  </div>
  ${setDataTable()}
`;

export const Sortable = () => html`
  <div style="width: 800px">
    <modus-data-table />
  </div>
  ${setDataTableCanSort()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the data table data for the default story.
const setDataTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ display: 'Name', width: '33%'}, { display: 'Age', width: '33%' }, { display: 'Contacted', width: '33%' }];
    document.querySelector('modus-data-table').data = [['John', 25, false], ['Jane', 26, false], ['Joe', 27, true]];
  `;

  return tag;
}

const setDataTableCanSort = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ display: 'Name', width: '33%'}, { display: 'Age', width: '33%' }, { display: 'Contacted', width: '33%' }];
    document.querySelector('modus-data-table').data = [['John', 25, false], ['Jane', 26, false], ['Joe', 27, true]];
    document.querySelector('modus-data-table').sortOptions = { canSort: true, serverSide: false };
  `;

  return tag;
}
