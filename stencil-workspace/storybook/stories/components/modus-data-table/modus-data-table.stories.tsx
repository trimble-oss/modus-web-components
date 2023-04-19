import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-data-table-storybook-docs.mdx';

export default {
  title: 'Components/Data Table',
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
    <modus-data-table />
  </div>
  ${setTable()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the table data for the default story.
const setTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columnHeaders = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: '2003-10-25T20:58:20.233Z', }];
  `;

  return tag;
};

export const Hover = () => html`
  <div style="width: 800px">
    <modus-data-table />
  </div>
  ${hover()}
`;

const hover = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columnHeaders = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: '2003-10-25T20:58:20.233Z', }];
    document.querySelector('modus-data-table').hover = true;
  `;
  return tag;
};

export const BorderLess = () => html`
  <div style="width: 800px">
    <modus-data-table />
  </div>
  ${borderLess()}
`;

const borderLess = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columnHeaders = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: '2003-10-25T20:58:20.233Z', }];
    document.querySelector('modus-data-table').hover = true;
    document.querySelector('modus-data-table').displayOptions = { borderless: true, cellBorderless: true }
  `;
  return tag;
};

export const NestedHeaders = () => html`
  <div style="width: 800px">
    <modus-data-table />
  </div>
  ${nestedHeaders()}
`;

const nestedHeaders = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columnHeaders = [ { header: 'Name', accessorKey: 'name', id: 'name', columns: [ { header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text' }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text' }, ], }, { header: 'Info', accessorKey: 'info', id: 'info', columns: [ { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'More Info', accessorKey: 'moreInfo', id: 'more-info', columns: [ { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer' }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer' }, ], }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date' }, ], }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: '2003-10-25T20:58:20.233Z', }];
    document.querySelector('modus-data-table').hover = true;
  `;
  return tag;
};
