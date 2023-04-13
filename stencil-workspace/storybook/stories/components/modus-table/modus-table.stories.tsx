import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-table-storybook-docs.mdx';

export default {
  title: 'Components/Table',
  argTypes: {},
  parameters: {
    controls: { disabled: true, expanded: true, sort: 'alpha' },
    actions: {
      handles: [
        'cellLinkClick',
        'rowDoubleClick',
        'selection',
        'sort',
        'rowActionClick',
      ],
    },
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
    <modus-table />
  </div>
  ${setTable()}
`;

export const Hodgepodge = () => html`
  <div style="width: 800px">
    <modus-table />
  </div>
  ${setTableHodgepodge()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the table data for the default story.
const setTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-table').columns = [{ display: 'Name', width: '33%'}, { display: 'Age', width: '33%' }, { display: 'Contacted', width: '33%' }];
    document.querySelector('modus-table').data = [['John', 25, false], ['Jane', 26, false], ['Joe', 27, true]];
  `;

  return tag;
};

const setTableHodgepodge = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-table').columns = [
      { display: 'Name', width: '100px' },
      { display: 'Age', align: 'right', width: '34px' },
      { display: 'Status', align: 'center' },
      { display: 'Email' }
    ];
    document.querySelector('modus-table').data = [
      {
        _id: '0',
        name: 'Joe',
        age: 27,
        status: {
          _type: 'badge',
          text: 'Complete'
        },
        email: {
          _type: 'link',
          display: 'joe@example.com',
          url: 'mailto:joe@example.com',
        },
      },
      {
        _id: '1',
        name: 'Jane',
        age: 34,
        status: {
          _type: 'badge',
          text: 'Complete'
        },
        email: {
          _type: 'link',
          display: 'jane@example.com',
          url: 'mailto:jane@example.com',
        },
      },
      {
        _id: '2',
        name: 'William',
        age: 28,
        status: {
          _type: 'badge',
          text: 'Incomplete',
          color: 'warning'
        },
        email: {
          _type: 'link',
          display: 'william@example.com',
          url: 'mailto:william@example.com',
        },
      },
    ];
    document.querySelector('modus-table').sortOptions = { canSort: true, serverSide: false };
    document.querySelector('modus-table').selectionOptions = { canSelect: true, checkboxSelection: true };
    document.querySelector('modus-table').rowActions = [
      {
        _id: '0',
        display: {
          text: 'Delete',
          icon: 'delete'
        }
      }
    ];
  `;

  return tag;
};
