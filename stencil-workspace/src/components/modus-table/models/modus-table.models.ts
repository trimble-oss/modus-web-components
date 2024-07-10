import {
  CellContext,
  ColumnDefTemplate,
  ColumnOrderState,
  ColumnSizingState,
  ColumnSort,
  ExpandedState,
  PaginationState,
  RowData,
  SortingFnOption,
  SortingState,
  VisibilityState,
} from '@tanstack/table-core';
import { BadgeProperties } from '../../modus-badge/modus-badge';
import {
  COLUMN_DEF_DATATYPE_INTEGER,
  COLUMN_DEF_DATATYPE_LINK,
  COLUMN_DEF_DATATYPE_TEXT,
  COLUMN_DEF_DATATYPE_BADGE,
  CELL_EDIT_TYPE_SELECT,
  CELL_EDIT_TYPE_DATE,
  CELL_EDIT_TYPE_AUTOCOMPLETE,
  CELL_EDIT_TYPE_INT,
  CELL_EDIT_TYPE_TEXT,
} from '../modus-table.constants';
import { ModusAutocompleteOption } from '../../modus-autocomplete/modus-autocomplete';

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
  | typeof COLUMN_DEF_DATATYPE_LINK
  | typeof COLUMN_DEF_DATATYPE_BADGE;
// | typeof COLUMN_DEF_DATATYPE_DATE;

export type ModusTableCellEditorType =
  | typeof CELL_EDIT_TYPE_SELECT
  | typeof CELL_EDIT_TYPE_TEXT
  | typeof CELL_EDIT_TYPE_INT
  | typeof CELL_EDIT_TYPE_AUTOCOMPLETE
  | typeof CELL_EDIT_TYPE_DATE;

export type ModusTableCellDateEditorArgs = { format: string };
export type ModusTableCellSelectEditorArgs = { options: unknown[]; optionsDisplayProp?: string };
export type ModusTableCellAutocompleteEditorArgs = {
  options: ModusAutocompleteOption[];
  noResultsFoundText: string;
  noResultsFoundSubtext: string;
  showNoResultsFoundMessage: boolean;
  showOptionsOnFocus: boolean;
};
export type ModusTableCellEditorArgs = ModusTableCellSelectEditorArgs | ModusTableCellDateEditorArgs;

export type ModusTableSortingFunction<TData extends RowData> = SortingFnOption<TData> | 'sortForHyperlink' | 'sortForBadge';

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

export interface ModusTableRowWithId {
  id: string;
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
  hiddenColumns?: string[];
}

export interface ModusTableCellLink {
  display: string;
  url: string;
  _type?: typeof COLUMN_DEF_DATATYPE_LINK;
}

export interface ModusTableCellBadge extends BadgeProperties {
  text: string;
  _type?: typeof COLUMN_DEF_DATATYPE_BADGE;
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
  preSelectedRows?: string[];
}

export interface ModusTableManualPaginationOptions {
  currentPageIndex: number;
  currentPageSize: number;
  pageCount: number;
  totalRecords: number;
}

export interface ModusTableManualSortingOptions {
  currentSortingState: ModusTableSortingState;
}

export type ModusTableColumnSort = ColumnSort;

export interface ModusTableRowClick {
  row: unknown;
  column: string;
}
