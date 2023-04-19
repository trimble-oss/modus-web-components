import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-data-table-storybook-docs.mdx';

export default {
  title: 'Components/Data Table',
  argTypes: {
    columns: {
      description: 'Table header columns',
      table: {
        type: { summary: 'ModusDataTableColumn[]' },
      },
      type: { required: true },
    },
    data: {
      description: 'Table data',
      table: {
        type: { summary: 'Data[]' },
      },
      type: { required: true },
    },
    hover: {
      description: 'Enables hover on table rows',
      table: {
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    sort: {
      description: 'Sort table data',
      table: {
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    showSortIconOnHover: {
      description: 'Sort icon on hover of table header',
      table: {
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
  },
  parameters: {
    controls: { hover: false, sort: false },
    actions: {
      handles: ['sorting'],
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
  <div>
    <modus-data-table />
  </div>
  ${defaultTable()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the table data for the default story.
const defaultTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
  `;

  return tag;
};

export const Hover = () => html`
  <div>
    <modus-data-table hover="true" />
  </div>
  ${hoverTable()}
`;

const hoverTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
  `;
  return tag;
};

export const Borderless = () => html`
  <div>
    <modus-data-table hover="true" />
  </div>
  ${borderlessTable()}
`;

const borderlessTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
    document.querySelector('modus-data-table').displayOptions = { borderless: true, cellBorderless: true }
  `;
  return tag;
};

export const Sorting = () => html`
  <div>
    <modus-data-table hover="true" sort="true" showSortIconHover="false" />
  </div>
  ${sortingTable()}
`;

const sortingTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
    document.querySelector('modus-data-table').displayOptions = { borderless: false, cellBorderless: false }
  `;
  return tag;
};

export const ColumnResize = () => html`
  <div style="width: 800px">
    <modus-data-table enable-column-resizing=true/>
  </div>
  ${columnResize()}
`;

const columnResize = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer', enableResizing: false }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', enableResizing: false }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'date', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: '2003-10-25T20:58:20.233Z', }];
  `;
  return tag;
};
