export type TCell = number | string | boolean;

export type TRow = { [key: string]: TCell };

export interface ModusDataTableSort {
  columnId: string;
  direction: 'asc' | 'desc' | 'none';
}

// eslint-disable-next-line
export interface ModusDataTableSortEvent extends ModusDataTableSort {}

export interface TColumn {
  align?: 'left' | 'right';
  display: string;
  id?: string;
  readonly?: boolean;
  width?: string;
}

export interface ModusTableSortOptions {
  canSort: boolean;
  serverSide: boolean;
}
