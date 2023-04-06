import { ColumnDef } from '@tanstack/table-core';

export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  createdAt?: Date;
  subRows?: Person[];
}

export const DefaultData: Person[] = [
  {
    age: 40,
    firstName: 'Gordon',
    lastName: 'Lemke',
    progress: 97,
    status: 'single',
    subRows: undefined,
    visits: 434,
  },
  {
    firstName: 'Elliott',
    lastName: 'Bosco',
    age: 21,
    visits: 348,
    progress: 60,
    status: 'complicated',
  },
  {
    firstName: 'Agnes',
    lastName: 'Breitenberg',
    age: 34,
    visits: 639,
    progress: 84,
    status: 'single',
  },
  {
    firstName: 'Nicolette',
    lastName: 'Stamm',
    age: 13,
    visits: 518,
    progress: 28,
    status: 'relationship',
  },
  {
    firstName: 'Anjali',
    lastName: 'Ratke',
    age: 22,
    visits: 585,
    progress: 7,
    status: 'single',
  },
  {
    firstName: 'Kamryn',
    lastName: 'Gerlach',
    age: 23,
    visits: 488,
    progress: 71,
    status: 'single',
  },
];

export const DefaultColumns: ColumnDef<Person>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
    columns: [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        id: 'first-name',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        id: 'last-name',
      },
    ],
  },
  {
    header: 'Info',
    accessorKey: 'info',
    id: 'info',
    columns: [
      {
        header: 'Age',
        accessorKey: 'age',
        id: 'age',
      },
      {
        header: 'More Info',
        accessorKey: 'moreInfo',
        id: 'more-info',
        columns: [
          {
            header: 'Visits',
            accessorKey: 'visits',
            id: 'visits',
          },
          {
            header: 'Status',
            accessorKey: 'status',
            id: 'status',
          },
          {
            header: 'Profile Progress',
            accessorKey: 'progress',
            id: 'progress',
          },
        ],
      },
      // {
      //   header: 'Created At',
      //   accessorKey: 'createdAt',
      //   id: 'createdAt',
      // },
    ],
  },
];

export const DefaultColumns2: ColumnDef<Person>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
    id: 'first-name',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
    id: 'last-name',
  },
  {
    header: 'Age',
    accessorKey: 'age',
    id: 'age',
  },
  {
    header: 'Visits',
    accessorKey: 'visits',
    id: 'visits',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    id: 'status',
  },
  {
    header: 'Profile Progress',
    accessorKey: 'progress',
    id: 'progress',
  },
];
