import { CellContext, ColumnDefTemplate, Row, RowData, SortingFnOption, SortingState } from '@tanstack/table-core';
import { COLUMN_DEF_DATATYPE_INTEGER, COLUMN_DEF_DATATYPE_LINK, COLUMN_DEF_DATATYPE_TEXT } from '../modus-table.constants';

export type ModusTableRowData = RowData;

export interface ModusTableRowSelectionOptions {
  multiple?: boolean;
  subRowSelection?: boolean;
}

export type ModusTableSortingState = SortingState;

export type ModusTableCellData = CellContext<unknown, unknown>;

export type ModusTableColumnDataType =
  | typeof COLUMN_DEF_DATATYPE_TEXT
  | typeof COLUMN_DEF_DATATYPE_INTEGER
  | typeof COLUMN_DEF_DATATYPE_LINK;
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

export interface ModusTableRowAction {
  id: string;
  icon: string;
  label: string;
  isVisible: (row: Row<unknown>) => boolean | boolean;
}

export interface ModusTableRowActionClickEvent {
  actionId: string;
  rowId: string;
}
