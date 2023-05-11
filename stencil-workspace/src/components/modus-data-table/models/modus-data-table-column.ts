import { ModusColumnDataType } from '../enums/modus-column-data-type';

export interface ModusDataTableColumn {
  header: string;
  accessorKey: string;
  dataType: ModusColumnDataType;
  id?: string;
  columns?: ModusDataTableColumn[];
  footer?: string;
  enableSorting?: boolean;
  enableResizing?: boolean;
  size?: number,
  minSize?: number,
  maxSize?: number
  showTotal?: boolean;
}
