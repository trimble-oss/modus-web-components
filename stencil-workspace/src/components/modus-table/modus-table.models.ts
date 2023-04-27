export type TCell = number | string | boolean | ModusTableCellBadge | ModusTableCellLink;

export type TRow = {
  [key: string]: TCell;
} & {
  _id?: string;
  _selected?: boolean;
};

export interface ModusTableCellBadge {
  _type: 'badge'; // Used internally to identify the type of cell. Does not set the badge's type.
  color?: 'danger' | 'dark' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning';
  text: string;
  type?: 'counter' | 'default' | 'text';
}

export interface ModusTableCellLink {
  _type: 'link';
  display: string;
  url: string;
}

export interface ModusTableSort {
  columnId: string;
  direction: 'asc' | 'desc' | 'none';
}

// eslint-disable-next-line
export interface ModusTableSortEvent extends ModusTableSort {}

export interface ModusTableRowActionClickEvent {
  actionId: string,
  rowId: string
}

export interface TColumn {
  align?: 'center' | 'left' | 'right';
  display: string;
  id?: string;
  readonly?: boolean;
  width?: string;
}

export interface ModusTableDisplayOptions {
  animateRowActionsDropdown?: boolean;
  borderless?: boolean;
  cellBorderless?: boolean;
  rowStripe?: boolean;
  size?: 'small' | 'large';
}

export interface ModusTableRowAction {
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
