import { ModusColumnDataType } from '../enums/modus-column-data-type';

export interface ModusDataTableColumn {
  header: string;
  accessorKey?: string;
  id: string;
  columns?: ModusDataTableColumn[];
  dataType: ModusColumnDataType;
}
