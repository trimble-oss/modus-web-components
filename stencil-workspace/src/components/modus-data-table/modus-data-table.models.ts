export type TCell = number | string | boolean | ModusDataTableCellLink;

export type TRow = {
  _id?: string;
  _selected?: boolean;
  [key: string]: TCell;
};

export interface ModusDataTableCellLink {
  display: string;
  type: 'link';
  url: string;
}

export interface ModusDataTableSort {
  columnId: string;
  direction: 'asc' | 'desc' | 'none';
}

// eslint-disable-next-line
export interface ModusDataTableSortEvent extends ModusDataTableSort {}

export interface TColumn {
  align?: 'center' | 'left' | 'right';
  display: string;
  id?: string;
  readonly?: boolean;
  width?: string;
}

export interface ModusDataTableDisplayOptions {
  borderless?: boolean;
  cellBorderless?: boolean;
  rowStripe?: boolean;
  size?: 'small' | 'large';
}

export interface ModusTableSelectionOptions {
  canSelect: boolean;
  checkboxSelection: boolean;
}

export interface ModusTableSortOptions {
  canSort: boolean;
  serverSide: boolean;
}
