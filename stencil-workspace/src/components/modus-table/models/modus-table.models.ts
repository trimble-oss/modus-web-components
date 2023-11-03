import {
  CellContext,
  ColumnDefTemplate,
  ColumnOrderState,
  ColumnSizingState,
  ExpandedState,
  PaginationState,
  RowData,
  SortingFnOption,
  SortingState,
  VisibilityState,
} from '@tanstack/table-core';
import {
  COLUMN_DEF_DATATYPE_INTEGER,
  COLUMN_DEF_DATATYPE_LINK,
  COLUMN_DEF_DATATYPE_TEXT,
  CELL_EDIT_TYPE_DROPDOWN,
} from '../modus-table.constants';

export type ModusTableRowData = RowData;
export type ModusTableSortingState = SortingState;
export type ModusTableExpandedState = ExpandedState;
export type ModusTablePaginationState = PaginationState;
export type ModusTableColumnSizingState = ColumnSizingState;
export type ModusTableColumnVisibilityState = VisibilityState;
export type ModusTableColumnOrderState = ColumnOrderState;
export type ModusTableCellData = CellContext<unknown, unknown>;

// Avoided using enum because it causes issues at runtime
export type ModusTableColumnDataType =
  | typeof COLUMN_DEF_DATATYPE_TEXT
  | typeof COLUMN_DEF_DATATYPE_INTEGER
  | typeof COLUMN_DEF_DATATYPE_LINK;
// | typeof COLUMN_DEF_DATATYPE_DATE;

export type ModusTableCellEditorType = typeof CELL_EDIT_TYPE_DROPDOWN;
// typeof CELL_EDIT_TYPE_AUTOCOMPLETE |

export type ModusTableCellDateEditorArgs = { format: string };
export type ModusTableCellDropdownEditorArgs = { options: unknown[] };
export type ModusTableCellEditorArgs = ModusTableCellDropdownEditorArgs | ModusTableCellDateEditorArgs;

export type ModusTableSortingFunction<TData extends RowData> = SortingFnOption<TData> | 'sortForHyperlink';

export interface ManualPaginationOptions {
  currentPageIndex: number;
  currentPageSize: number;
  pageCount: number;
  totalRecords: number;
}
export interface ModusTableRowAction {
  id: string;
  icon?: string;
  label?: string;
  index: number;
  isDisabled?: (row: unknown) => boolean;
}

export interface ModusTableRowActionClick {
  actionId: string;
  row: unknown;
}

export interface ModusTableColumn<TData extends RowData, TValue = unknown> {
  header: string;
  accessorKey: string;
  dataType: ModusTableColumnDataType;
  id?: string;
  cell?: ColumnDefTemplate<ModusTableCellData>;
  footer?: string;
  enableSorting?: boolean;
  enableResizing?: boolean;
  size?: number;
  minSize?: number;
  maxSize?: number;
  showTotal?: boolean;
  subRows?: ModusTableColumn<TData, TValue>[];
  sortingFn?: ModusTableSortingFunction<TData>;

  cellEditable?: boolean;
  cellEditorType?: ModusTableCellEditorType;
  cellEditorArgs?: ModusTableCellEditorArgs;
}

export interface ModusTableDisplayOptions {
  borderless?: boolean;
  cellBorderless?: boolean;
}

export interface ModusTableToolbarOptions {
  columnsVisibility?: ModusTableColumnsVisibilityOptions;
}

export interface ModusTableColumnsVisibilityOptions {
  title: string;
  requiredColumns?: string[];
}

export interface ModusTableCellLink {
  display: string;
  url: string;
  _type?: typeof COLUMN_DEF_DATATYPE_LINK;
}

export interface ModusTableCellValueChange {
  row: unknown;
  accessorKey: string;
  newValue: string;
  oldValue?: string;
  data: unknown[];
}

export interface ModusTableRowSelectionOptions {
  multiple?: boolean;
  subRowSelection?: boolean;
}
