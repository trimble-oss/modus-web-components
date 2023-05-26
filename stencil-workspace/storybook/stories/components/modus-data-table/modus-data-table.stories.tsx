import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-data-table-storybook-docs.mdx';

export default {
  title: 'Components/Data Table',
  argTypes: {
    columns: {
      name: 'columns',
      description: 'Table header columns',
      table: {
        type: { summary: 'ModusDataTableColumn[]' },
      },
      type: { required: true },
    },
    data: {
      name: 'data',
      description: 'Table data',
      table: {
        type: { summary: 'Data[]' },
      },
      type: { required: true },
    },
    hover: {
      name: 'hover',
      description: 'Enables hover on table rows',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    sort: {
      name: 'sort',
      description: 'Enables sort for table columns',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    showSortIconOnHover: {
      name: 'show-sort-icon-on-hover',
      description:
        'Enables sort for table columns and sort icon appears when you hover over a column header',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    summaryRow: {
      name: 'summary-row',
      description: 'Enables a summary row as footer',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    pagination: {
      name: 'pagination',
      description: 'Enable pagination on table data',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    columnResize: {
      name: 'column-resize',
      description: 'Enables the column resizing for table',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
  },
  parameters: {
    controls: { expanded: false, sort: 'requiredFirst' },
    actions: {
      handles: ['sortChange'],
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
  <div style="width: 950px">
    <modus-data-table />
  </div>
  ${defaultTable()}
`;

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the table data for the default story.
const defaultTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', },];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
  `;

  return tag;
};

export const Hover = () => html`
  <div style="width: 950px">
    <modus-data-table hover="true" />
  </div>
  ${hoverTable()}
`;

const hoverTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
  `;
  return tag;
};

export const Borderless = () => html`
  <div style="width: 950px">
    <modus-data-table hover="true" />
  </div>
  ${borderlessTable()}
`;

const borderlessTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
    document.querySelector('modus-data-table').displayOptions = { borderless: true, cellBorderless: true }
  `;
  return tag;
};

export const Sorting = () => html`
  <div style="width: 950px">
    <modus-data-table hover="true" sort="true" show-sort-icon-hover="false" />
  </div>
  ${sortingTable()}
`;

const sortingTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }];
    document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }];
    document.querySelector('modus-data-table').displayOptions = { borderless: false, cellBorderless: false }
  `;
  return tag;
};

export const ValueFormatter = () => html`
  <div style="width: 950px">
    <modus-data-table
      hover="true"
      sort="true"
      column-resize="false"
      pagination="false"
      show-sort-icon-hover="true"
      summary-row="false" />
  </div>
  <div style="width: 950px">
    <modus-data-table column-resize="true" full-width="false" />
  </div>
  ${valueFormatterTable()}
`;

const valueFormatterTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
   document.querySelector('modus-data-table').columns = [ { header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text' }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer', }, { header: 'Amount', accessorKey: 'amount', id: 'amount', dataType: 'integer', cell: (props) => { return '$' + Number(props.cell.getValue()).toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,') }, }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text', }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', cell: (props) => { return  Number(props.cell.getValue()).toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,') }, }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'text', cell: (props) => { const date = new Date(props.cell.getValue()); return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear(); }, }, ];

   document.querySelector('modus-data-table').data = [ { "firstName": "Chaim", "lastName": "Lubowitz", "age": 30, "amount": 330160, "progress": 99, "status": "single", "createdAt": "2002-11-19T12:48:51.739Z" }, { "firstName": "Vicky", "lastName": "Lehner", "age": 2, "amount": 41900, "progress": 36, "status": "single", "createdAt": "2003-10-02T12:48:51.739Z" }, { "firstName": "Nellie", "lastName": "Leuschke", "age": 15, "amount": 883112, "progress": 68, "status": "single", "createdAt": "2004-09-21T12:48:51.739Z" }, { "firstName": "Judy", "lastName": "Ritchie", "age": 3, "amount": 900293, "progress": 10, "status": "relationship", "createdAt": "2005-08-11T12:48:51.739Z" }, { "firstName": "Hertha", "lastName": "Bradtke", "age": 19, "amount": 112116, "progress": 87, "status": "relationship", "createdAt": "2006-07-13T12:48:51.739Z" } ];
  `;
  return tag;
};

export const ColumnResize = () => html`
  <div style="width: 950px">
    <modus-data-table
      hover="true"
      sort="true"
      column-resize="true"
      full-width="false" />
  </div>
  ${columnResize()}
`;

const columnResize = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  document.querySelector('modus-data-table').columns = [{header: 'First Name',accessorKey: 'firstName',id: 'first-name',dataType: 'text',size: 150,minSize: 80},{header: 'Last Name',accessorKey: 'lastName',id: 'last-name',dataType: 'text',size: 150,minSize: 80},{header: 'Age',accessorKey: 'age',id: 'age',dataType: 'integer',size: 100,minSize: 60},{header: 'Visits',accessorKey: 'visits',id: 'visits',dataType: 'integer',maxSize: 150,minSize: 80,enableResizing: false,},{header: 'Status',accessorKey: 'status',id: 'status',dataType: 'text' ,minSize: 80},{header: 'Profile Progress',accessorKey: 'progress',id: 'progress',dataType: 'integer',minSize: 100},];
  document.querySelector('modus-data-table').data = [{ firstName: 'Gordon', lastName: 'Lemke', age: 40, visits: 434, progress: 97, status: 'single', createdAt: '2002-11-21T12:48:51.739Z', }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: '2012-02-08T12:14:22.776Z', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: '1995-04-07T07:24:57.577Z', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: '2009-07-28T14:29:51.505Z', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: '2000-09-10T12:45:15.824Z', }, {
    "firstName": "Chaim",
    "lastName": "Lubowitz",
    "age": 30,
    "amount": 336,
    "progress": 99,
    "status": "single",
  },
  {
    "firstName": "Vicky",
    "lastName": "Lehner",
    "age": 2,
    "amount": 419,
    "progress": 36,
    "status": "single",
  },
  {
    "firstName": "Nellie",
    "lastName": "Leuschke",
    "age": 15,
    "amount": 883,
    "progress": 68,
    "status": "single",
  }];
  `;
  return tag;
};

export const Pagination = () => html`
  <div style="width: 950px">
    <modus-data-table
      hover="true"
      sort="true"
      column-resize="true"
      pagination="true" />
  </div>
  ${paginationTable()}
`;

const paginationTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', }];
    document.querySelector('modus-data-table').data = [{ age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }];
    document.querySelector('modus-data-table').pageSizeList = [5,10,20,50,100];
    `;
  return tag;
};

export const SummaryRow = () => html`
  <div style="width: 950px">
    <modus-data-table
      hover="true"
      sort="true"
      column-resize="true"
      pagination="true"
      show-sort-icon-hover="true"
      summary-row="true" />
  </div>
  <div style="width: 950px">
    <modus-data-table column-resize="true" full-width="false" />
  </div>
  ${summaryRowTable()}
`;

const summaryRowTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-data-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text', footer: 'Total' }, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', }, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' }, { header: 'Visits', accessorKey: 'visits', id: 'visits', dataType: 'integer', showTotal: true }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text' }, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer', showTotal: true}];
    document.querySelector('modus-data-table').data = [{ age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', createdAt: "2002-11-21T12:48:51.739Z" }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }, { firstName: 'Elliott', lastName: 'Bosco', age: 21, visits: 348, progress: 60, status: 'complicated', }, { firstName: 'Agnes', lastName: 'Breitenberg', age: 34, visits: 639, progress: 84, status: 'single', }, { firstName: 'Nicolette', lastName: 'Stamm', age: 13, visits: 518, progress: 28, status: 'relationship', }, { firstName: 'Anjali', lastName: 'Ratke', age: 22, visits: 585, progress: 7, status: 'single', }, { firstName: 'Kamryn', lastName: 'Gerlach', age: 23, visits: 488, progress: 71, status: 'single', }, { age: 40, firstName: 'Gordon', lastName: 'Lemke', progress: 97, status: 'single', subRows: undefined, visits: 434, }];
    document.querySelector('modus-data-table').pageSizeList = [5,10,20,50,100];
    `;
  return tag;
};

export const ExpandableRows = () => html`
  <div style="width: 950px">
    <modus-data-table
      hover="true"
      sort="true"
      column-resize="true"
      pagination="false"
      show-sort-icon-hover="true"
      is-expand="true"
      summary-row="false" />
  </div>
  <div style="width: 950px">
    <modus-data-table column-resize="true" full-width="false" />
  </div>
  ${expandableRowsTable()}
`;

const expandableRowsTable = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  document.querySelector('modus-data-table').columns = [ { "header":"First Name", "accessorKey":"firstName", "id":"first-name", "dataType":"text", "footer":"Total" }, { "header":"Last Name", "accessorKey":"lastName", "id":"last-name", "dataType":"text" }, { "header":"Age", "accessorKey":"age", "id":"age", "dataType":"integer" }, { "header":"Visits", "accessorKey":"visits", "id":"visits", "dataType":"integer", "showTotal":true }, { "header":"Status", "accessorKey":"status", "id":"status", "dataType":"text" }, { "header":"Profile Progress", "accessorKey":"progress", "id":"progress", "dataType":"integer" } ];
  document.querySelector('modus-data-table').data =[ { firstName: 'Frederick', lastName: 'Cummerata', age: 33, visits: 970, progress: 42, status: 'complicated', subRows: [ { firstName: 'Emile', lastName: 'Koelpin', age: 22, visits: 924, progress: 75, status: 'single', }, { firstName: 'Brandt', lastName: 'Stark', age: 9, visits: 850, progress: 22, status: 'single', }, { firstName: 'Leola', lastName: 'Reichel', age: 12, visits: 496, progress: 72, status: 'relationship', subRows: [ { firstName: 'Angelica', lastName: 'Kautzer', age: 25, visits: 96, progress: 81, status: 'complicated', }, { firstName: 'Amari', lastName: 'Walter', age: 18, visits: 559, progress: 45, status: 'complicated', }, ], }, { firstName: 'Sabryna', lastName: 'Nolan', age: 9, visits: 596, progress: 61, status: 'single', }, ], }, { firstName: 'Moriah', lastName: 'Smith', age: 13, visits: 459, progress: 42, status: 'complicated', subRows: [ { firstName: 'Freddie', lastName: 'Bernhard', age: 38, visits: 519, progress: 27, status: 'complicated', }, { firstName: 'Meagan', lastName: 'Brekke', age: 23, visits: 344, progress: 8, status: 'relationship', }, { firstName: 'Alfreda', lastName: 'Fadel', age: 19, visits: 555, progress: 72, status: 'relationship', subRows: [ { firstName: 'Monserrate', lastName: 'Smitham', age: 32, visits: 438, progress: 58, status: 'single', }, ], }, ], }, ];
  `;
  return tag;
};
