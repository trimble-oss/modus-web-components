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
  <modus-data-table />
  ${setDataTable()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the data table data for the default story.
const setDataTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = ['Name', 'Age', 'Contacted'];
    document.querySelector('modus-data-table').data = [['John', 25, false], ['Jane', 26, false], ['Joe', 27, true]];
  `;

  return tag;
}
