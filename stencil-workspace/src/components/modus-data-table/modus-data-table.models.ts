export type TCell = number | string | boolean | ModusDataTableCellBadge | ModusDataTableCellLink;

export type TRow = {
  [key: string]: TCell;
} & {
  _id?: string;
  _selected?: boolean;
};

export interface ModusDataTableCellBadge {
  _type: 'badge'; // Used internally to identify the type of cell. Does not set the badge's type.
  color?: 'danger' | 'dark' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning';
  text: string;
  type?: 'counter' | 'default' | 'text';
}

export interface ModusDataTableCellLink {
  _type: 'link';
  display: string;
  url: string;
}

export interface ModusDataTableSort {
  columnId: string;
  direction: 'asc' | 'desc' | 'none';
}

// eslint-disable-next-line
export interface ModusDataTableSortEvent extends ModusDataTableSort {}

export interface ModusDataTableRowActionClickEvent {
  actionId: string;
  rowId: string;
}

export interface TColumn {
  align?: 'center' | 'left' | 'right';
  display: string;
  id?: string;
  readonly?: boolean;
  width?: string;
}

export interface ModusDataTableDisplayOptions {
  animateRowActionsDropdown?: boolean;
  borderless?: boolean;
  cellBorderless?: boolean;
  rowStripe?: boolean;
  size?: 'small' | 'large';
}

export interface ModusDataTableRowAction {
  _id: string;
  display: {
    icon?: string;
    text: string;
  };
}

export interface ModusTableSelectionOptions {
  canSelect: boolean;
  checkboxSelection: boolean;
}

export interface ModusTableSortOptions {
  canSort: boolean;
  serverSide: boolean;
}
