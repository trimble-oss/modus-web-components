import { ModusColumnDataType } from '../enums/modus-column-data-type';

export interface ModusDataTableColumn {
  header: string;
  accessorKey?: string;
  id: string;
  columns?: ModusDataTableColumn[];
  dataType: ModusColumnDataType;
  enableSorting?: boolean;
  enableResizing?: boolean;
  size?: number,
  minSize?: number,
  maxSize?: number
}
