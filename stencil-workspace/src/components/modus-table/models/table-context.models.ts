import { EventEmitter } from '@stencil/core';
import {
  ModusTableColumn,
  ModusTableDisplayOptions,
  ModusTableRowSelectionOptions,
  ModusTableToolbarOptions,
  ModusTableCellValueChange,
  ModusTableCellLink,
  ModusTableColumnOrderState,
  ModusTableColumnSizingState,
  ModusTableColumnVisibilityState,
  ModusTableRowActionClick,
  ModusTableExpandedState,
  ModusTableSortingState,
  ModusTablePaginationState,
  ModusTableManualPaginationOptions,
  ModusTableErrors,
} from './modus-table.models';
import { Row, Table, Updater } from '@tanstack/table-core';
import ModusTableCore from '../modus-table.core';
import { TableRowActionWithOverflow } from './table-row-actions.models';

export type TableCellEdited = Omit<ModusTableCellValueChange, 'data'>;

export interface TableContext {
  element: HTMLElement;

  columns: ModusTableColumn<unknown>[];

  errors: ModusTableErrors;

  columnResize: boolean;

  columnReorder: boolean;

  data: unknown[];

  density: 'relaxed' | 'comfortable' | 'compact';

  displayOptions?: ModusTableDisplayOptions;

  hover: boolean;

  fullWidth: boolean;

  maxHeight: string;

  maxWidth: string;

  pageSizeList: number[];

  pagination: boolean;

  manualPaginationOptions: ModusTableManualPaginationOptions;

  rowActions: TableRowActionWithOverflow[];

  rowActionSize: number;

  rowActionHeader: string;

  rowsExpandable: boolean;

  rowSelection: boolean;

  rowSelectionOptions: ModusTableRowSelectionOptions;

  showSortIconOnHover: boolean;

  sort: boolean;

  sortIconStyle: 'alphabetical' | 'directional';

  summaryRow: boolean;

  toolbar: boolean;

  toolbarOptions: ModusTableToolbarOptions | null;

  cellValueChange: EventEmitter<ModusTableCellValueChange>;

  cellLinkClick: EventEmitter<ModusTableCellLink>;

  columnOrderChange: EventEmitter<ModusTableColumnOrderState>;

  columnSizingChange: EventEmitter<ModusTableColumnSizingState>;

  columnVisibilityChange: EventEmitter<ModusTableColumnVisibilityState>;

  rowActionClick: EventEmitter<ModusTableRowActionClick>;

  rowExpanded: EventEmitter<ModusTableExpandedState>;

  rowSelectionChange: EventEmitter<unknown>;

  sortChange: EventEmitter<ModusTableSortingState>;

  paginationChange: EventEmitter<ModusTablePaginationState>;

  componentId: string;

  frozenColumns: string[];

  isColumnResizing: boolean;

  tableInstance: Table<unknown>;

  tableCore: ModusTableCore;

  wrapText: boolean;

  anchorRowIndex: number;

  getRowId: (originalRow: unknown, index: number, parent?: Row<unknown>) => string;
  updateData: (updater: Updater<unknown>, context: TableCellEdited) => void;
  updateSelectedRows: (rowIndex: number, currentRowIndex: number) => void;
  updateClickedRows: (rowIndex: number, isShiftClick: boolean,isCtrlClick: boolean) => void;
  onColumnsChange: (newVal: ModusTableColumn<unknown>[]) => void;
  onColumnResizeChange: (newVal: boolean) => void;
  onColumnReorderChange: () => void;
  onDataChange: (newVal: unknown[]) => void;
  onRowsExpandableChange: (newVal: boolean) => void;
  onRowSelectionOptionsChange: (newVal: ModusTableRowSelectionOptions, oldVal: ModusTableRowSelectionOptions) => void;
  onSortChange: (newVal) => void;
  onToolbarOptionsChange: (newVal: ModusTableToolbarOptions | null) => void;
}
