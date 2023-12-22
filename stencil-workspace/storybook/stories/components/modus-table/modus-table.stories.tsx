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
    priority: Priorities[
      randomNumber(1, 100) > 66 ? 'high':
      randomNumber(0, 100) > 33 ? 'medium'
      : 'low'
    ],
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

function initializeTable(columns, data, pageSizeList, toolbarOptions, displayOptions, rowSelectionOptions, rowActions, manualPaginationOptions, manualSortingOptions, defaultSort) {
  const tag = document.createElement('script');
  tag.innerHTML = `
  var modusTable = document.querySelector('modus-table');
  modusTable.columns = ${JSON.stringify(columns)};
  modusTable.data = ${JSON.stringify(data)};
  modusTable.pageSizeList = ${JSON.stringify(pageSizeList)};
  modusTable.toolbarOptions = ${JSON.stringify(toolbarOptions)};
  modusTable.displayOptions = ${JSON.stringify(displayOptions)};
  modusTable.rowSelectionOptions = ${JSON.stringify(rowSelectionOptions)};
  modusTable.rowActions = ${JSON.stringify(rowActions)};
  modusTable.manualPaginationOptions = ${JSON.stringify(manualPaginationOptions)};
  modusTable.manualSortingOptions = ${JSON.stringify(manualSortingOptions)};
  modusTable.defaultSort = ${JSON.stringify(defaultSort)};

  var globalData = ${JSON.stringify(data)};
  if(!!modusTable.manualSortingOptions){
    let currentData = globalData;
    const accessorKey = getAccessortKey(modusTable.columns, modusTable.manualSortingOptions.currentSortingState[0].id);
    currentData.sort(compareValues(accessorKey, modusTable.manualSortingOptions.currentSortingState[0].desc));
    if(!!modusTable.manualPaginationOptions){
      modusTable.data = currentData.slice((modusTable.manualPaginationOptions.currentPageIndex - 1) * modusTable.manualPaginationOptions.currentPageSize,
        modusTable.manualPaginationOptions.currentPageIndex * modusTable.manualPaginationOptions.currentPageSize);
    } else {
      modusTable.data = currentData;
    }
  } else if(!!modusTable.manualPaginationOptions){
    modusTable.data = globalData.slice((modusTable.manualPaginationOptions.currentPageIndex - 1) * modusTable.manualPaginationOptions.currentPageSize,
      modusTable.manualPaginationOptions.currentPageIndex * modusTable.manualPaginationOptions.currentPageSize);
  } else {
    modusTable.data = globalData;
  }

  function compareValues(key, desc) {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
      let varA = '';
      let varB = '';

      if (typeof a[key] === 'string'){
        varA = a[key].toUpperCase();
      } else if (typeof a[key] === 'object'){
        varA = a[key].display;
      } else {
        varA = a[key];
      }
      if (typeof b[key] === 'string'){
        varB = b[key].toUpperCase();
      } else if (typeof b[key] === 'object'){
        varB = b[key].display;
      } else {
        varB = b[key];
      }

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        desc ? (comparison * -1) : comparison
      );
    };
  }

  function getAccessortKey(array, id){
    return array.find((c) => c.id === id)?.accessorKey;
  }

  modusTable.addEventListener(
    "paginationChange", (ev)=> {
      if(!!modusTable.manualPaginationOptions){
        let currentData = ${JSON.stringify(data)};
        modusTable.manualPaginationOptions = {
          currentPageIndex : ev.detail.pageIndex + 1,
          currentPageSize : ev.detail.pageSize,
          pageCount: Math.ceil( currentData.length / ev.detail.pageSize),
          totalRecords: currentData.length
        }
        if(!!modusTable.manualSortingOptions && modusTable.manualSortingOptions.currentSortingState.length > 0){
          const accessorKey = getAccessortKey(modusTable.columns, modusTable.manualSortingOptions.currentSortingState[0].id);
          currentData.sort(compareValues(accessorKey, modusTable.manualSortingOptions.currentSortingState[0].desc));
        }
        modusTable.data = currentData.slice((modusTable.manualPaginationOptions.currentPageIndex - 1) * modusTable.manualPaginationOptions.currentPageSize,
          modusTable.manualPaginationOptions.currentPageIndex * modusTable.manualPaginationOptions.currentPageSize);
      }
   });

  modusTable.addEventListener(
    "sortChange", (ev)=> {
      if(!!modusTable.manualSortingOptions){
        modusTable.manualSortingOptions = {
          currentSortingState : ev.detail
        };
        let currentData = ${JSON.stringify(data)};
        if(modusTable.manualSortingOptions.currentSortingState.length > 0) {
          const accessorKey = getAccessortKey(modusTable.columns, modusTable.manualSortingOptions.currentSortingState[0].id);
          currentData.sort(compareValues(accessorKey, modusTable.manualSortingOptions.currentSortingState[0].desc));
        }
        if(!!modusTable.manualPaginationOptions){
          modusTable.data = currentData.slice((modusTable.manualPaginationOptions.currentPageIndex - 1) * modusTable.manualPaginationOptions.currentPageSize,
            modusTable.manualPaginationOptions.currentPageIndex * modusTable.manualPaginationOptions.currentPageSize);
        } else {
          modusTable.data = currentData;
        }
      }
  });
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

const Priorities = {
  "high": {
    size: 'medium',
    type: 'counter',
    text: 'High',
    color: 'success',
  },
  "medium": {
    size: 'medium', type: 'counter',
    text: 'Medium',
    color: 'warning'
  },
  "low": {
    size: 'medium', type: 'counter',
    text: 'Low',
    color: 'danger'
  }
}


const DefaultColumns = [
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
  },
  {
    header: 'Profile Progress',
    accessorKey: 'progress',
    id: 'progress',
    dataType: 'integer',
    minSize: 100,
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
  rowActions: [],
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
    density: {
      name: 'density',
      description: 'Manage table density.',
      control: {
        options: ['relaxed', 'comfortable', 'compact'],
        type: 'select',
      },
      table: {
        defaultValue: { summary: `'relaxed'` },
        type: { summary: `'relaxed', 'comfortable', 'compact'` },
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
    rowActions: {
      name: 'rowActions',
      description: 'Control row actions.',
      table: {
        type: { summary: 'ModusTableRowAction[]' },
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
      name: 'pageSizeList',
      description: 'To set page size options for the pagination.',
      table: {
        type: { summary: 'number[]' },
      },
      type: { required: false },
    },
    rowSelectionOptions: {
      name: 'rowSelectionOptions',
      description: 'To control multiple row selection.',
      table: {
        type: { summary: 'ModusTableRowSelectionOptions' },
      },
      type: { required: false },
    },
    manualPaginationOptions: {
      name: 'manualPaginationOptions',
      description: 'To switch to manual pagination mode.',
      table: {
        type: { summary: 'ModusTableManualPaginationOptions' },
      },
      type: { required: false },
    },
    manualSortingOptions: {
      name: 'manualSortingOptions',
      description: 'To switch to manual sorting mode.',
      table: {
        type: { summary: 'ModusTableManualSortingOptions' },
      },
      type: { required: false },
    },
    defaultSort : {
      name: 'defaultSort',
      description: 'To set the default sorting of the table',
      table: {
        type: { summary: 'ColumnSort' },
      },
      type: { required: false },
    }
  },

  parameters: {
    actions: {
      handles: ['cellValueChange','cellLinkClick', 'columnOrderChange', 'columnSizingChange', 'columnVisibilityChange', 'paginationChange', 'rowExpanded', 'rowSelectionChange', 'rowUpdated', 'sortChange', 'rowActionClick'],
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
  rowActions,
  rowSelection,
  rowSelectionOptions,
  manualPaginationOptions,
  manualSortingOptions,
  defaultSort,
  density
}) => html`
  <div style="width: 950px">
    <modus-table
      hover="${hover}"
      sort="${sort}"
      column-resize="${columnResize}"
      column-reorder="${columnReorder}"
      density="${density}"
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
  ${initializeTable(columns, data, pageSizeList, toolbarOptions, displayOptions, rowSelectionOptions, rowActions, manualPaginationOptions, manualSortingOptions, defaultSort)}
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

export const ManualSorting = Template.bind({});
ManualSorting.args = {
  ...DefaultArgs,
  sort: true,
  manualSortingOptions: {
    currentSortingState: [{
      id: 'first-name',
      desc: false
    }]
  }
};

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
  rowSelectionOptions,
  density
}) => html`
  <div style="width: 950px">
    <modus-table
      hover="${hover}"
      sort="${sort}"
      column-resize="${columnResize}"
      density="${density}"
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

export const Badge = Template.bind({});
Badge.args = {
  ...DefaultArgs,
  columns: [
    ...DefaultColumns.slice(0, DefaultColumns.length-2),
    {
      header: 'Priority',
      accessorKey: 'priority',
      sortingFn: 'sortForBadge',
      id: 'priority',
      dataType: 'badge',
      maxSize: 100,
    },
    ...DefaultColumns.slice(DefaultColumns.length - 1)
  ],
  data: makeData(7)

}

export const ColumnResize = Template.bind({});
ColumnResize.args = { ...DefaultArgs, columnResize: true };

export const Pagination = Template.bind({});
Pagination.args = { ...DefaultArgs, pagination: true, data: makeData(50), pageSizeList: [5, 10, 50] };

export const ManualPagination = Template.bind({});
ManualPagination.args = {
  ...DefaultArgs,
  pagination: true,
  data: makeData(50),
  manualPaginationOptions: {
    currentPageIndex: 1,
    currentPageSize: 5,
    pageCount: 10,
    totalRecords: 50,
  },
  pageSizeList: [5, 10, 50],
};

export const SummaryRow = Template.bind({});
SummaryRow.args = { ...DefaultArgs, summaryRow: true };

export const ColumnVisibility = Template.bind({});
ColumnVisibility.args = {
  ...DefaultArgs,
  toolbarOptions: {
    columnsVisibility: {
      title: '',
      requiredColumns: ['age', 'visits'],
      hiddenColumns: ['progress', 'createdAt'],
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
    subRowSelection: true,
    preSelectedRows:["0"],
  }, data: makeData(7)
};

const EditableColumns =DefaultColumns.map(col =>{
  if(col.dataType === 'link') return col;
  if(col.accessorKey === 'status'){
    return {...col,  cellEditable:true,
      cellEditorType: 'dropdown',
      cellEditorArgs: {
        options:[
        { display: 'Verified' },
        { display: 'Pending' },
        { display: 'Rejected' },
        ]
      } };
  }
  else return {...col, cellEditable: true};
});
export const InlineEditing = Template.bind({});
InlineEditing.args = { ...DefaultArgs, columns: EditableColumns, data: makeData(7) };

export const LargeDataset = Template.bind({});

LargeDataset.args = { ...DefaultArgs, columns: EditableColumns, data: makeData(10000, 1,1 ),pagination: true, pageSizeList: [5, 10, 50], sort: true , hover: true, rowsExpandable: true, summaryRow: true , columnReorder:true, columnResize: true, toolbar:true,  toolbarOptions: {
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

export const RowActions = Template.bind({});
RowActions.args = {
  ...DefaultArgs, rowActions:[
    {
      id: '1',
      icon: 'add',
      label: 'Add',
      index: 0,
    },

    {
      id: '2',
      icon: 'calendar',
      label: 'calendar',
      index: 1,
    },

    {
      id: '3',
      icon: 'cancel',
      label: 'Cancel',
      index: 2,
    },
    {
      id: '4',
      index: 3,
      icon: 'add',
      label: 'Add',
    },
    {
      id: '5',
      index: 4,
      icon: 'delete',
      label: 'Delete',
    }

  ], data: makeData(7), fullWidth: true
};
