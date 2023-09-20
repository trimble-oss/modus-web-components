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

export interface ModusTableRowSelectionOptions {
  multiple?: boolean;
  subRowSelection?: boolean;
}

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

export type ModusTableDataUpdaterProps = { rowId: string; accessorKey: string; newValue: string; oldValue?: string };

export type ModusTableSortingFunction<TData extends RowData> = SortingFnOption<TData> | 'sortForHyperlink';

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

  // editType?: ModusTableCellEditorType;
  // dropdownValues?: unknown[];
  // autocompleteValues?: string[];
  // dateFormat?: string;
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
