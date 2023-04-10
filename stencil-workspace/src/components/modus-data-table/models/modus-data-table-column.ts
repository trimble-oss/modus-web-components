import { ColumnDataType } from '../enums/column-data-type';

export interface ModusDataTableColumn {
  header: string;
  accessorKey?: string;
  id: string;
  columns?: ModusDataTableColumn[];
  dataType: ColumnDataType;
}
