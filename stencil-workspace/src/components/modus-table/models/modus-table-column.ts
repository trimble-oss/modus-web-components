import { CellContext, ColumnDefTemplate, RowData, SortingFnOption } from '@tanstack/table-core';
import { ModusTableColumnDataType } from '../enums';
import { ModusTableCellEditType } from '../enums/modus-table-cell-edit-type';

export default interface ModusTableColumn<TData extends RowData, TValue = unknown> {
  header: string;
  accessorKey: string;
  dataType: ModusTableColumnDataType;
  id?: string;
  cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
  footer?: string;
  enableSorting?: boolean;
  enableResizing?: boolean;
  size?: number;
  minSize?: number;
  maxSize?: number;
  showTotal?: boolean;
  subRows?: ModusTableColumn<TData, TValue>[];
  sortingFn?: SortingFnOption<TData>;
  editType?: ModusTableCellEditType;
  dropdownValues?: unknown[];
  autocompleteValues?: string[];
  dateFormat?: string;
}
