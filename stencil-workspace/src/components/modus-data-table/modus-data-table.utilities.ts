import { ModusDataTableCellBadge, ModusDataTableCellLink, TCell, TColumn, TRow } from './modus-data-table.models';

export class ModusDataTableUtilities {
  static convertToTColumns(columns: string[] | TColumn[]): TColumn[] {
    return columns?.map((column) => {
      return {
        align: column.align ?? 'left',
        display: column.display ?? column,
        id: column.id ?? column.display?.toLocaleLowerCase() ?? column.toLocaleLowerCase(),
        readonly: column.readonly ?? false,
        width: column.width ?? '',
      };
    });
  }

  static convertToTRows(data: TCell[][] | TRow[], columns: string[] | TColumn[]): TRow[] {
    if (data?.length && !Array.isArray(data[0])) {
      return data as TRow[];
    }

    return data?.map((row) => {
      const tRows = {
        _id: row._id ?? '',
        _selected: row._selected ?? false,
      };

      row.forEach((cell, rowIndex) => {
        tRows[(columns[rowIndex] as TColumn).id] = cell;
      });

      return tRows;
    });
  }

  static sortData(data: TRow[], columnId: string, direction: 'asc' | 'desc' | 'none'): TRow[] {
    const dataCopy = [...data];
    if (direction === 'asc') {
      return dataCopy.sort((row1, row2) => {
        if (row1[columnId]['_type'] === 'badge') {
          return (row1[columnId] as ModusDataTableCellBadge).text > (row2[columnId] as ModusDataTableCellBadge).text
            ? 1
            : -1;
        }

        if (row1[columnId]['_type'] === 'link') {
          return (row1[columnId] as ModusDataTableCellLink).display > (row2[columnId] as ModusDataTableCellLink).display
            ? 1
            : -1;
        }

        return row1[columnId] > row2[columnId] ? 1 : -1;
      });
    } else {
      return dataCopy.sort((row1, row2) => {
        if (row1[columnId]['_type'] === 'badge') {
          return (row1[columnId] as ModusDataTableCellBadge).text > (row2[columnId] as ModusDataTableCellBadge).text
            ? -1
            : 1;
        }

        if (row1[columnId]['_type'] === 'link') {
          return (row1[columnId] as ModusDataTableCellLink).display > (row2[columnId] as ModusDataTableCellLink).display
            ? -1
            : 1;
        }

        return row1[columnId] > row2[columnId] ? -1 : 1;
      });
    }
  }
}
