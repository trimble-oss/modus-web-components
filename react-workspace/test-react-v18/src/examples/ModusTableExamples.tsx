import React from 'react';
import {
  ModusTableColumn,
  ModusTableColumnDataType,
  ModusTableColumnsVisibilityOptions,
  ModusTableDisplayOptions,
  ModusTableRowSelectionOptions,
  ModusTableToolbarOptions,
} from '@trimble-oss/modus-web-components';
import { ModusTable } from '@trimble-oss/modus-react-components';

function range(len: number) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
}

function randomNumber(min: number, max: number) {
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
    email: { display: email, url: email },
    progress: randomNumber(1, 100) * 100,
    status: randomNumber(1, 100) > 66 ? 'Verified' : randomNumber(0, 100) > 33 ? 'Pending' : 'Rejected',
    createdAt: new Date(randomNumber(1990, 2020), randomNumber(0, 11), randomNumber(1, 30)).toDateString(),
  };
}

function makeData(...lens: number[]): object[] {
  const makeDataLevel: any = (depth = 0) => {
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
const DefaultColumns: ModusTableColumn<unknown>[] = [
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
    showTotal: true,
    minSize: 80,
    cell: function formatNumber({ cell }: any) {
      return `$${Number(cell.getValue())
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    },
  },
  {
    header: 'Email',
    accessorKey: 'email',
    id: 'email',
    dataType: 'link',
    size: 230,
    minSize: 80,
    sortingFn: 'sortForHyperlink',
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
    header: 'Created At',
    accessorKey: 'createdAt',
    id: 'createdAt',
    dataType: 'text',
    size: 150,
    minSize: 150,
  },
];

function ModusTableExamples() {
  const DefaultArgs: any = {
    showSortIconOnHover: true,
    fullWidth: false,
    pageSizeList: [7, 10, 20],
    displayOptions: {
      borderless: true,
      cellBorderless: false,
    } as ModusTableDisplayOptions,
    maxHeight: '',
    maxWidth: '800px',
    columns: DefaultColumns,
    data: makeData(10000, 1, 1),
    pagination: true,
    sort: true,
    hover: true,
    rowsExpandable: true,
    summaryRow: true,
    columnResize: true,
    columnReorder: true,
    toolbar: true,
    toolbarOptions: {
      columnsVisibility: {
        title: '',
        requiredColumns: ['age', 'visits'],
      } as ModusTableColumnsVisibilityOptions,
    } as ModusTableToolbarOptions,
    rowSelection: true,
    rowSelectionOptions: {
      multiple: true,
      subRowSelection: true,
    } as ModusTableRowSelectionOptions,
  };

  return <ModusTable {...DefaultArgs}></ModusTable>;
}

export default ModusTableExamples;
