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
  const email: string = `${firstName}${lastName}@example.com`.toLowerCase();
  return {
    firstName,
    lastName,
    age: randomNumber(20, 80) * 30,
    visits: randomNumber(1, 100) * 100,
    email:{ display: email, url: email },
    progress: randomNumber(1, 100) * 100,
    status: randomNumber(1, 100) > 66 ? 'Verified' : randomNumber(0, 100) > 33 ? 'Pending' : 'Rejected',
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

function initializeTable(columns, data, pageSizeList, toolbarOptions, displayOptions, rowSelectionOptions) {
  const tag = document.createElement('script');
  tag.innerHTML = `
  document.querySelector('modus-table').columns = ${JSON.stringify(columns)};
  document.querySelector('modus-table').data = ${JSON.stringify(data)};
  document.querySelector('modus-table').pageSizeList = ${JSON.stringify(pageSizeList)};
  document.querySelector('modus-table').toolbarOptions = ${JSON.stringify(toolbarOptions)};
  document.querySelector('modus-table').displayOptions = ${JSON.stringify(displayOptions)};
  document.querySelector('modus-table').rowSelectionOptions = ${JSON.stringify(rowSelectionOptions)};
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
const DefaultColumns = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    id: 'first-name',
    dataType: 'text',
    size: 150,
    minSize: 80,
    footer: 'Total',
    cellEditable:true,
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    id: 'last-name',
    dataType: 'text',
    size: 150,
    minSize: 80,
    cellEditable:true,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    id: 'age',
    dataType: 'integer',
    size: 80,
    minSize: 60,
    cellEditable:true,
  },
  {
    header: 'Visits',
    accessorKey: 'visits',
    id: 'visits',
    dataType: 'integer',
    maxSize: 80,
    showTotal: true,
    minSize: 80,
    cellEditable:true,
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    dataType: 'link',
    size: 230,
    minSize: 80,
    sortingFn: 'sortForHyperlink'},
  {
    header: 'Status',
    accessorKey: 'status',
    id: 'status',
    dataType: 'text',
    minSize: 80,
    cellEditable:true,
    cellEditorType: 'dropdown',
    cellEditorArgs: {
      options:[
      { display: 'Verified' },
      { display: 'Pending' },
      { display: 'Rejected' },
      ]
    },
  },
  {
    header: 'Profile Progress',
    accessorKey: 'progress',
    id: 'progress',
    dataType: 'integer',
    minSize: 100,
    cellEditable:true,
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
  toolbar: false,
  columns: DefaultColumns,
  data: makeData(5),
  toolbarOptions: {},
  displayOptions: {},
  rowsExpandable: false,
  maxHeight: '',
  maxWidth: '',
  rowSelection: false,
  rowSelectionOptions: {},
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
      name: 'showSortIconOnHover',
      description: 'Enables sort for table columns and sort icon appears when you hover over a column header',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    summaryRow: {
      name: 'summaryRow',
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
      name: 'columnResize',
      description: 'Enables the column resizing for table',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    columnReorder: {
      name: 'columnReorder',
      description: 'Enables the column reordering for table',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    fullWidth: {
      name: 'fullWidth',
      description: 'Manage table width.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    toolbar: {
      name: 'toolbar',
      description: 'Enables the toolbar.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    toolbarOptions: {
      name: 'toolbarOptions',
      description: 'To display toolbar options, which allows access to table operations like hiding columns.',
      table: {
        type: { summary: 'ModusTableToolbarOptions' },
      },
      type: { required: false },
    },
    rowsExpandable: {
      name: 'rowsExpandable',
      description: 'Enables expanded rows.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    rowSelection: {
      name: 'rowSelection',
      description: 'Enables row selection.',
      control: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
      type: { required: false },
    },
    maxHeight: {
      name: 'maxHeight',
      description: 'To display a vertical scrollbar when the height is exceeded.',
      control: 'string',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
      type: { required: false },
    },
    maxWidth: {
      name: 'maxWidth',
      description: 'To display a horizontal scrollbar when the width is exceeded.',
      control: 'string',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
      type: { required: false },
    },
    pageSizeList: {
      name: 'toolbarOptions',
      description: 'To set page size options for the pagination.',
      table: {
        type: { summary: 'number[]' },
      },
      type: { required: false },
    },
    rowSelectionOptions: {
      name: 'toolbarOptions',
      description: 'To control multiple row selection.',
      table: {
        type: { summary: 'ModusTableRowSelectionOptions' },
      },
      type: { required: false },
    },
  },

  parameters: {
    actions: {
      handles: ['cellLinkClick', 'columnOrderChange', 'columnSizingChange', 'columnVisibilityChange', 'paginationChange', 'rowExpanded', 'rowSelectionChange', 'rowUpdated', 'sortChange'],
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
  toolbar,
  columns,
  data,
  toolbarOptions,
  displayOptions,
  rowsExpandable,
  maxHeight,
  maxWidth,
  rowSelection,
  rowSelectionOptions
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
      toolbar="${toolbar}"
      rows-expandable="${rowsExpandable}"
      max-height="${maxHeight}"
      max-width="${maxWidth}"
      row-selection="${rowSelection}" />
  </div>
  ${initializeTable(columns, data, pageSizeList, toolbarOptions, displayOptions, rowSelectionOptions)}
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
  toolbar,
  columnReorder,
  toolbarOptions,
  displayOptions,
  maxHeight,
  maxWidth,
  rowSelection,
  rowSelectionOptions
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
      toolbar="${toolbar}"
      max-height="${maxHeight}"
      max-width="${maxWidth}"
      row-selection="${rowSelection}" />
  </div>
  ${valueFormatterTable(pageSizeList, toolbarOptions, displayOptions, rowSelectionOptions)}
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
  toolbar: false,
  toolbarOptions: {},
  displayOptions: {},
  maxHeight: '',
  maxWidth: '',
  rowSelection: false,
  rowSelectionOptions: {}
};
const valueFormatterTable = (pageSizeList, toolbarOptions, displayOptions, rowSelectionOptions) => {
  const tag = document.createElement('script');
  tag.innerHTML = `
   document.querySelector('modus-table').columns = [{ header: 'First Name', accessorKey: 'firstName', id: 'first-name', dataType: 'text' , footer: 'Total', size: 150,minSize: 80}, { header: 'Last Name', accessorKey: 'lastName', id: 'last-name', dataType: 'text', size: 150,minSize: 80}, { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer', showTotal: true, size: 100,minSize: 60 }, { header: 'Amount', accessorKey: 'amount', id: 'amount', dataType: 'integer',size: 150,minSize: 80, cell: (props) => { return '$' + Number(props.cell.getValue()).toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,') }, }, { header: 'Status', accessorKey: 'status', id: 'status', dataType: 'text', minSize: 80}, { header: 'Profile Progress', accessorKey: 'progress', id: 'progress', dataType: 'integer',minSize: 100, cell: (props) => { return  Number(props.cell.getValue()).toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,') }, }, { header: 'Created At', accessorKey: 'createdAt', id: 'createdAt', dataType: 'text', cell: (props) => { const date = new Date(props.cell.getValue()); return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear(); }, }];
   document.querySelector('modus-table').data = [{ "firstName": "Chaim", "lastName": "Lubowitz", "age": 30, "amount": 330160, "progress": 99, "status": "single", "createdAt": "2002-11-19T12:48:51.739Z" }, { "firstName": "Vicky", "lastName": "Lehner", "age": 2, "amount": 41900, "progress": 36, "status": "single", "createdAt": "2003-10-02T12:48:51.739Z" }, { "firstName": "Nellie", "lastName": "Leuschke", "age": 15, "amount": 883112, "progress": 68, "status": "single", "createdAt": "2004-09-21T12:48:51.739Z" }, { "firstName": "Judy", "lastName": "Ritchie", "age": 3, "amount": 900293, "progress": 10, "status": "relationship", "createdAt": "2005-08-11T12:48:51.739Z" }, { "firstName": "Hertha", "lastName": "Bradtke", "age": 19, "amount": 112116, "progress": 87, "status": "relationship", "createdAt": "2006-07-13T12:48:51.739Z" }];

   document.querySelector('modus-table').pageSizeList = ${JSON.stringify(pageSizeList)};
  document.querySelector('modus-table').toolbarOptions = ${JSON.stringify(toolbarOptions)};
  document.querySelector('modus-table').displayOptions = ${JSON.stringify(displayOptions)};
  document.querySelector('modus-table').rowSelectionOptions = ${JSON.stringify(rowSelectionOptions)};
  `;
  return tag;
};

export const Hyperlink = Template.bind({});
Hyperlink.args = { ...DefaultArgs, columns: DefaultColumns, data: makeData(7) };

export const ColumnResize = Template.bind({});
ColumnResize.args = { ...DefaultArgs, columnResize: true };

export const Pagination = Template.bind({});
Pagination.args = { ...DefaultArgs, pagination: true, data: makeData(50), pageSizeList: [5, 10, 50] };

export const SummaryRow = Template.bind({});
SummaryRow.args = { ...DefaultArgs, summaryRow: true };

export const ColumnVisibility = Template.bind({});
ColumnVisibility.args = {
  ...DefaultArgs,
  toolbarOptions: {
    columnsVisibility: {
      title: '',
      requiredColumns: ['age', 'visits'],
    },
  },
  toolbar: true,
};

export const ColumnReorder = Template.bind({});
ColumnReorder.args = { ...DefaultArgs, columnReorder: true };

export const ExpandableRows = Template.bind({});
ExpandableRows.args = { ...DefaultArgs, rowsExpandable: true, data: makeData(7, 4, 3, 2, 1), fullWidth: true };

export const CheckboxRowSelection = Template.bind({});
CheckboxRowSelection.args = {
  ...DefaultArgs, rowSelection: true, rowSelectionOptions: {
    multiple: true,
    subRowSelection: true
  }, data: makeData(7)
};

export const LargeDataset = Template.bind({});

LargeDataset.args = { ...DefaultArgs, columns: DefaultColumns, data: makeData(10000, 1,1 ),pagination: true, pageSizeList: [5, 10, 50], sort: true , hover: true, rowsExpandable: true, summaryRow: true , columnReorder:true, columnResize: true, toolbar:true,  toolbarOptions: {
  columnsVisibility: {
    title: '',
    requiredColumns: ['age', 'visits'],
  }
},
rowSelection: true, rowSelectionOptions: {
  multiple: true,
  subRowSelection: true
}
};
