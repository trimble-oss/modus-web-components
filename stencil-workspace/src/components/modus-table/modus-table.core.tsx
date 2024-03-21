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
  Row,
} from '@tanstack/table-core';
import {
  ModusTableColumn,
  ModusTableColumnSort,
  ModusTableRowSelectionOptions,
  ModusTableSortingState,
  ModusTableToolbarOptions,
} from './models/modus-table.models';
import { sortHyperlink, sortBadge } from './functions/sortingFunction';
import { COLUMN_DEF_SUB_ROWS_KEY } from './modus-table.constants';

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
  manualPagination?: boolean;
  pageCount?: number;
  manualSorting?: boolean;
  sortingState?: ModusTableSortingState;
  preSelectedRows?: RowSelectionState;
  defaultSort?: ModusTableColumnSort;
  wrapText?: boolean;

  getRowId(originalRow: unknown, index: number, parent?: Row<unknown>): string;
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
      preSelectedRows,
      rowSelection,
      rowSelectionOptions,
      columnOrder,
      pageSizeList,
      toolbarOptions,
      manualPagination,
      pageCount,
      manualSorting,
      sortingState,
      defaultSort,
      getRowId,
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
    const defaultSortState = defaultSort ? [defaultSort] : [];
    const options: TableOptionsResolved<unknown> = {
      autoResetPageIndex: false,
      data: data ?? [],
      columns: (columns as ColumnDef<unknown>[]) ?? [],
      state: {
        columnPinning: {},
        columnSizing: {},
        columnSizingInfo: {} as ColumnSizingInfoState,
        columnVisibility: {},
        columnOrder: columnOrder,
        expanded: null,
        sorting: manualSorting ? sortingState : defaultSortState,
        rowSelection: preSelectedRows,
        pagination: {
          pageIndex: 0,
          pageSize: pagination ? pageSizeList[0] : data?.length,
        },
      },
      enableRowSelection: rowSelection,
      enableMultiRowSelection: multiple,
      enableSubRowSelection: multiple && subRowSelection,
      enableSorting: sort,
      sortingFns: {
        sortForHyperlink: sortHyperlink,
        sortForBadge: sortBadge,
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
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: (row) => row[COLUMN_DEF_SUB_ROWS_KEY],
      getRowId: getRowId,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onStateChange: () => {},
      renderFallbackValue: null,
      ...(manualPagination &&
        pageCount && {
          manualPagination,
          pageCount,
        }),
      manualSorting: manualSorting,
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
