import { TCell, TColumn, TRow } from './modus-data-table.models';

export class ModusDataTableUtilities {
  static convertToTColumns(columns: string[] | TColumn[]): TColumn[] {
    return columns?.map((column) => {
      return {
        align: column.align ?? 'left',
        display: column.display ?? column,
        id: column.id ?? column.display?.toLocaleLowerCase() ?? column.toLocaleLowerCase(),
        readonly: column.readonly ?? false,
        width: column.width ?? ''
      };
    });
  }

  static convertToTRows(data: TCell[][] | TRow[], columns: string[] | TColumn[]): TRow[] {
    if (data?.length && !Array.isArray(data[0])) { return data as TRow[]; }

    return data?.map((row) => {
      const tRows = {};
      row.forEach((cell, rowIndex) => {
        tRows[(columns[rowIndex] as TColumn).id] = cell;
      });

      return tRows;
    });
  }

  static sortData(data: TRow[], columnId: string, direction: 'asc' | 'desc' | 'none'): TRow[] {
    const dataCopy = [...data];
    if (direction === 'asc') {
      return dataCopy.sort((row1, row2) => (row1[columnId] > row2[columnId] ? 1 : -1 ));
    } else {
      return dataCopy.sort((row1, row2) => (row1[columnId] > row2[columnId] ? -1 : 1 ));
    }
  }
}
