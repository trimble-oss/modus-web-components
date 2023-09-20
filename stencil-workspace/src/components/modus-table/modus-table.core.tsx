import {
  ColumnDef,
  ColumnSizingInfoState,
  ColumnSizingState,
  ExpandedState,
  PaginationState,
  Table,
  RowSelectionState,
  TableOptionsResolved,
  Updater,
  VisibilityState,
  createTable,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableState,
} from '@tanstack/table-core';
import { ModusTableColumn, ModusTableRowSelectionOptions, ModusTableToolbarOptions } from './models/modus-table.models';
import { sortHyperlink } from './functions/sortingFunction';

export interface TableCoreOptions {
  data: unknown[];
  columns: ModusTableColumn<unknown>[];
  columnResize: boolean;
  sort: boolean;
  pagination: boolean;
  rowSelection: boolean;
  rowSelectionOptions: ModusTableRowSelectionOptions;
  columnOrder: string[];
  toolbarOptions: ModusTableToolbarOptions | null;
  pageSizeList: number[];

  setExpanded: (updater: Updater<ExpandedState>) => void;
  setSorting: (updater: Updater<SortingState>) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  setPagination: (updater: Updater<PaginationState>) => void;
  setColumnSizing: (updater: Updater<ColumnSizingState>) => void;
  setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void;
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;
  setColumnOrder: (updater: Updater<string[]>) => void;
}

export default class ModusTableCore {
  private tableCore: Table<unknown> = null;

  constructor(tableOptions: TableCoreOptions) {
    const {
      data,
      columns,
      columnResize,
      sort,
      pagination,
      rowSelection,
      rowSelectionOptions,
      columnOrder,
      pageSizeList,
      toolbarOptions,
      setExpanded,
      setSorting,
      setRowSelection,
      setPagination,
      setColumnSizing,
      setColumnSizingInfo,
      setColumnVisibility,
      setColumnOrder,
    } = tableOptions;
    const { multiple, subRowSelection } = rowSelectionOptions;
    const options: TableOptionsResolved<unknown> = {
      data: data ?? [],
      columns: (columns as ColumnDef<unknown>[]) ?? [],
      state: {
        columnPinning: {},
        columnSizing: {},
        columnSizingInfo: {} as ColumnSizingInfoState,
        columnVisibility: {},
        columnOrder: columnOrder,
        expanded: null,
        sorting: [],
        rowSelection: {},
        pagination: pagination && {
          pageIndex: 0,
          pageSize: pageSizeList[0],
        },
      },
      enableRowSelection: rowSelection,
      enableMultiRowSelection: multiple,
      enableSubRowSelection: multiple && subRowSelection,
      enableSorting: sort,
      sortingFns: {
        sortForHyperlink: sortHyperlink,
      },
      columnResizeMode: 'onChange',
      enableColumnResizing: columnResize,
      enableHiding: !!toolbarOptions?.columnsVisibility,
      sortDescFirst: false, // To-Do, workaround to prevent sort descending on certain columns, e.g. numeric.
      onExpandedChange: setExpanded,
      onSortingChange: setSorting,
      onRowSelectionChange: setRowSelection,
      onPaginationChange: setPagination,
      onColumnSizingChange: setColumnSizing,
      onColumnSizingInfoChange: setColumnSizingInfo,
      onColumnVisibilityChange: setColumnVisibility,
      onColumnOrderChange: setColumnOrder,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: pagination && getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: (row) => row['subRows'],
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onStateChange: () => {},
      renderFallbackValue: null,
    };
    this.tableCore = createTable(options);
  }

  getTableInstance(): Table<unknown> {
    return this.tableCore;
  }

  getInitialState(): TableState {
    return this.tableCore.initialState;
  }

  getState<T = unknown>(updater: Updater<T>, value: T): Updater<T> {
    return updater instanceof Function ? updater(value) : updater;
  }

  setState(key: string, value: Updater<unknown>): void {
    this.tableCore.options.state[key] = value;
  }

  setOptions(key: string, value: unknown): void {
    this.tableCore.options[key] = value;
  }
}
