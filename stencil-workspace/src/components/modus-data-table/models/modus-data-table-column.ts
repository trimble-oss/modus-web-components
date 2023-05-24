import { CellContext, ColumnDefTemplate, RowData } from '@tanstack/table-core';
import { ModusColumnDataType } from '../enums/modus-column-data-type';

export interface ModusDataTableColumn<TData extends RowData, TValue = unknown> {
  header: string;
  accessorKey: string;
  dataType: ModusColumnDataType;
  id?: string;
  // columns?: ModusDataTableColumn[]; //To support in the future
  cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
  footer?: string;
  enableSorting?: boolean;
  enableResizing?: boolean;
  size?: number;
  minSize?: number;
  maxSize?: number;
  showTotal?: boolean;
}
