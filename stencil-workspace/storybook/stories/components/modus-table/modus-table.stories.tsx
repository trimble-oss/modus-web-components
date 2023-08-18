import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-table-storybook-docs.mdx';

// Helpers
// for the data generator makeData function
function range(len) {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function newPerson() {
  const namesIndex = randomNumber(0, 17);
  const firstName = Names[namesIndex].split(' ')[0];
  const lastName = Names[namesIndex].split(' ')[1];
  return {
    firstName,
    lastName,
    age: randomNumber(20, 80) * 30,
    visits: randomNumber(1, 100) * 100,
    progress: randomNumber(1, 100) * 100,
    status: randomNumber(1, 100) > 66 ? 'Verified' : randomNumber(0, 100) > 33 ? 'Pending' : 'Rejected',
    income: randomNumber(1000, 1000000),
    city: Cities[randomNumber(0, 6)],
    createdAt: new Date(randomNumber(1990, 2020), randomNumber(0, 11), randomNumber(1, 30)).toDateString(),
  };
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function makeData(...lens): object[] {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

function initializeTable(columns, data, pageSizeList, panelOptions, displayOptions) {
  const tag = document.createElement('script');
  tag.innerHTML = `
  document.querySelector('modus-table').columns = ${JSON.stringify(columns)};
  document.querySelector('modus-table').data = ${JSON.stringify(data)};
  document.querySelector('modus-table').pageSizeList = ${JSON.stringify(pageSizeList)};
  document.querySelector('modus-table').panelOptions = ${JSON.stringify(panelOptions)};
  document.querySelector('modus-table').displayOptions = ${JSON.stringify(displayOptions)};
  `;
  return tag;
}

const Names = [
  'Mickey Mouse',
  'Bugs Bunny',
  'Homer Simpson',
  'Fred Flintstone',
  'Sponge Bob',
  'Daffy Duck',
  'Charlie Brown',
  'Scooby Doo',
  'Tom Cat',
  'Jerry Mouse',
  'Mighty Mouse',
  'Wile E Coyote',
  'Tweety Bird',
  'Pink Panther',
  'Road Runner',
  'Patrick Star',
  'Roger Rabbit',
  'Papa Smurf',
  'Buzz Lightyear',
];

const Cities = ['Austin', 'New York', 'Seattle', 'Chicago', 'Denver', 'Los Angeles', 'New Orleans'];

const DefaultColumns: object[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    id: 'first-name',
    dataType: 'text',
    size: 150,
    minSize: 80,
    footer: 'Total',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    id: 'last-name',
    dataType: 'text',
    size: 150,
    minSize: 80,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    id: 'age',
    dataType: 'integer',
    size: 80,
    minSize: 60,
  },
  {
    header: 'Visits',
    accessorKey: 'visits',
    id: 'visits',
    dataType: 'integer',
    maxSize: 80,
    showTotal: true,
    minSize: 80,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    id: 'status',
    dataType: 'text',
    minSize: 80,
  },
  {
    header: 'Profile Progress',
    accessorKey: 'progress',
    id: 'progress',
    dataType: 'integer',
    minSize: 100,
  },
  {
    header: 'Income',
    accessorKey: 'income',
    id: 'income',
    dataType: 'integer',
    size: 100,
    minSize: 100,
  },
  {
    header: 'City',
    accessorKey: 'city',
    id: 'city',
    dataType: 'text',
    minSize: 80,
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    id: 'createdAt',
    dataType: 'string',
    size: 150,
    minSize: 150,
  },
];

const emailColumn = {
  header: 'Email',
  accessorKey: 'email',
  id: 'email',
  dataType: 'link',
  size: 230,
  minSize: 80,
  sortingFn: 'sortForHyperlink',
};

const DefaultArgs = {
  hover: false,
  sort: false,
  columnResize: false,
  columnReorder: false,
  pagination: false,
  showSortIconOnHover: false,
  summaryRow: false,
  fullWidth: false,
  pageSizeList: [7, 10, 20],
  showTablePanel: false,
  columns: DefaultColumns,
  data: makeData(5),
  panelOptions: {},
  displayOptions: {},
  rowsExpandable: false,
  maxHeight: '',
  maxWidth: '',
};

export default {
  title: 'Components/Table',
  argTypes: {
    columns: {
      name: 'columns',
      description: 'Table header columns',
      table: {
        type: { summary: 'ModusTableColumn[]' },
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
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    sort: {
      name: 'sort',
      description: 'Enables sort for table columns',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    showSortIconOnHover: {
      name: 'show-sort-icon-on-hover',
      description: 'Enables sort for table columns and sort icon appears when you hover over a column header',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    summaryRow: {
      name: 'summary-row',
      description: 'Enables a summary row as footer',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    pagination: {
      name: 'pagination',
      description: 'Enable pagination on table data',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    columnResize: {
      name: 'column-resize',
      description: 'Enables the column resizing for table',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    columnReorder: {
      name: 'column-reorder',
      description: 'Enables the column reordering for table',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    fullWidth: {
      name: 'full-width',
      description: 'Manage table width.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    showTablePanel: {
      name: 'show-table-panel',
      description: 'Enables the table panel.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    panelOptions: {
      name: 'panel-options',
      description: 'To display a panel options, which allows access to table operations like hiding columns.',
      table: {
        type: { summary: 'ModusTablePanelOptions' },
      },
      type: { required: false },
    },
    rowsExpandable: {
      name: 'rows-expandable',
      description: 'Enables expanded rows.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
  },
  parameters: {
    actions: {
      handles: ['sortChange', 'cellLinkClick'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      inlineStories: false,
      page: docs,
    },
    options: {
      isToolshown: true,
      enableShortcuts: false,
    },
  },
};

const Template = ({
  hover,
  sort,
  columnResize,
  columnReorder,
  pagination,
  showSortIconOnHover,
  summaryRow,
  fullWidth,
  pageSizeList,
  showTablePanel,
  columns,
  data,
  panelOptions,
  displayOptions,
  rowsExpandable,
  maxHeight,
  maxWidth,
}) => html`
  <div style="width: 950px">
    <modus-table
      hover="${hover}"
      sort="${sort}"
      column-resize="${columnResize}"
      column-reorder="${columnReorder}"
      pagination="${pagination}"
      show-sort-icon-on-hover="${showSortIconOnHover}"
      summary-row="${summaryRow}"
      full-width="${fullWidth}"
      show-table-panel="${showTablePanel}"
      rows-expandable="${rowsExpandable}"
      max-height="${maxHeight}"
      max-width="${maxWidth}" />
  </div>
  ${initializeTable(columns, data, pageSizeList, panelOptions, displayOptions)}
`;

export const Default = Template.bind({});
Default.args = DefaultArgs;

export const Hover = Template.bind({});
Hover.args = { ...DefaultArgs, hover: true };

export const Borderless = Template.bind({});
Borderless.args = {
  ...DefaultArgs,
  displayOptions: {
    borderless: true,
    cellBorderless: true,
  },
};

export const Sorting = Template.bind({});
Sorting.args = { ...DefaultArgs, sort: true };

export const ValueFormatter = ({
  hover,
  sort,
  columnResize,
  pagination,
  showSortIconOnHover,
  summaryRow,
  fullWidth,
  pageSizeList,
  showTablePanel,
  columnReorder,
  panelOptions,
  displayOptions,
  maxHeight,
  maxWidth,
}) => html`
  <div style="width: 950px">
    <modus-table
      hover="${hover}"
      sort="${sort}"
      column-resize="${columnResize}"
      pagination="${pagination}"
      show-sort-icon-on-hover="${showSortIconOnHover}"
      summary-row="${summaryRow}"
      full-width="${fullWidth}"
      column-reorder="${columnReorder}"
      show-table-panel="${showTablePanel}"
      max-height="${maxHeight}"
      max-width="${maxWidth}" />
  </div>
  ${valueFormatterTable(pageSizeList, panelOptions, displayOptions)}
`;
ValueFormatter.args = {
  hover: false,
  sort: false,
  columnResize: false,
  columnReorder: false,
  pagination: false,
  showSortIconOnHover: false,
  summaryRow: false,
  fullWidth: false,
  pageSizeList: [7, 10, 20],
  showTablePanel: false,
  panelOptions: {},
  displayOptions: {},
  maxHeight: '',
  maxWidth: '',
};
const valueFormatterTable = (pageSizeList, panelOptions, displayOptions) => {
  const tag = document.createElement('script');
  tag.innerHTML = `
   document.querySelector('modus-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text' , footer: 'Total', size: 150,minSize: 80}, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', size: 150,minSize: 80}, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer', showTotal: true, size: 100,minSize: 60 }, { header: 'Amount', accessorKey: 'amount', id: 'amount', dataType: 'integer',size: 150,minSize: 80, cell: (props) => { return '$' + Number(props.cell.getValue()).toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,') }, }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text', minSize: 80}, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer',minSize: 100, cell: (props) => { return  Number(props.cell.getValue()).toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,') }, }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'text', cell: (props) => { const date = new Date(props.cell.getValue()); return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear(); }, }];
   document.querySelector('modus-table').data = [{ "firstName": "Chaim", "lastName": "Lubowitz", "age": 30, "amount": 330160, "progress": 99, "status": "single", "createdAt": "2002-11-19T12:48:51.739Z" }, { "firstName": "Vicky", "lastName": "Lehner", "age": 2, "amount": 41900, "progress": 36, "status": "single", "createdAt": "2003-10-02T12:48:51.739Z" }, { "firstName": "Nellie", "lastName": "Leuschke", "age": 15, "amount": 883112, "progress": 68, "status": "single", "createdAt": "2004-09-21T12:48:51.739Z" }, { "firstName": "Judy", "lastName": "Ritchie", "age": 3, "amount": 900293, "progress": 10, "status": "relationship", "createdAt": "2005-08-11T12:48:51.739Z" }, { "firstName": "Hertha", "lastName": "Bradtke", "age": 19, "amount": 112116, "progress": 87, "status": "relationship", "createdAt": "2006-07-13T12:48:51.739Z" }];

   document.querySelector('modus-table').pageSizeList = ${JSON.stringify(pageSizeList)};
  document.querySelector('modus-table').panelOptions = ${JSON.stringify(panelOptions)};
  document.querySelector('modus-table').displayOptions = ${JSON.stringify(displayOptions)};
  `;
  return tag;
};

export const Hyperlink = Template.bind({});
const HyperlinkColumns = [...DefaultColumns];
HyperlinkColumns.splice(2, 1, emailColumn);
const HyperlinkData = makeData(5).map((rowData: object) => {
  const email: string = `${rowData['firstName']}${rowData['lastName']}@gmail.com`.toLowerCase();
  rowData['email'] = { display: email, url: email };
  return rowData;
});
Hyperlink.args = { ...DefaultArgs, columns: HyperlinkColumns, data: HyperlinkData };

const InlineEditColumns = JSON.parse(JSON.stringify(DefaultColumns));
InlineEditColumns[1] = { editable: true, ...InlineEditColumns[1] };
InlineEditColumns[2] = { editable: true, ...InlineEditColumns[2] };
InlineEditColumns[4] = {
  editable: true,
  editType: 'dropdown',
  dropdownValues: [{ display: 'Verified' }, { display: 'Pending' }, { display: 'Rejected' }],
  ...InlineEditColumns[4],
};
InlineEditColumns[7] = {
  editable: true,
  editType: 'autocomplete',
  autocompleteValues: [...Cities],
  ...InlineEditColumns[7],
};

export const InlineEdit = Template.bind({});
InlineEdit.args = { ...DefaultArgs, columns: InlineEditColumns };

export const ColumnResize = Template.bind({});
ColumnResize.args = { ...DefaultArgs, columnResize: true };

export const Pagination = Template.bind({});
Pagination.args = { ...DefaultArgs, pagination: true, data: makeData(50), pageSizeList: [5, 10, 50] };

export const SummaryRow = Template.bind({});
SummaryRow.args = { ...DefaultArgs, summaryRow: true };

export const ColumnVisibility = Template.bind({});
ColumnVisibility.args = {
  ...DefaultArgs,
  panelOptions: {
    columnsVisibility: {
      title: '',
      requiredColumns: ['age', 'visits'],
    },
  },
  showTablePanel: true,
};

export const ColumnReorder = Template.bind({});
ColumnReorder.args = { ...DefaultArgs, columnReorder: true };

export const ExpandableRows = Template.bind({});
ExpandableRows.args = { ...DefaultArgs, rowsExpandable: true, data: makeData(7, 4, 3, 2, 1), fullWidth: true };

export const LargeDataset = Template.bind({});
const largeDatasetColumns = [...DefaultColumns];
largeDatasetColumns.splice(2, 1, emailColumn);
const largeDatasetData = makeData(10000, 2).map((rowData: object) => {
  const email: string = `${rowData['firstName']}${rowData['lastName']}@gmail.com`.toLowerCase();
  rowData['email'] = { display: email, url: email };
  return rowData;
});
largeDatasetColumns[1] = { editable: true, ...largeDatasetColumns[1] };
largeDatasetColumns[2] = { editable: true, ...largeDatasetColumns[2] };
largeDatasetColumns[5] = {
  editable: true,
  editType: 'dropdown',
  dropdownValues: [{ display: 'Verified' }, { display: 'Pending' }, { display: 'Rejected' }],
  ...largeDatasetColumns[5],
};
largeDatasetColumns[7] = {
  editable: true,
  editType: 'autocomplete',
  autocompleteValues: [...Cities],
  ...largeDatasetColumns[7],
};

LargeDataset.args = {
  ...DefaultArgs,
  columns: largeDatasetColumns,
  data: largeDatasetData,
  pagination: true,
  pageSizeList: [5, 10, 50],
  sort: true,
  hover: true,
  rowsExpandable: true,
  summaryRow: true,
  columnResize: true,
  panelOptions: {
    columnsVisibility: {
      title: '',
      requiredColumns: ['age', 'visits'],
    },
  },
  showTablePanel: true,
  columnReorder: true,
};
