import { CellContext, ColumnDefTemplate, RowData } from '@tanstack/table-core';
import { ModusColumnDataType } from '../enums/modus-column-data-type';

export default interface ModusTableColumn<TData extends RowData, TValue = unknown> {
  header: string;
  accessorKey: string;
  dataType: ModusColumnDataType;
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
}
