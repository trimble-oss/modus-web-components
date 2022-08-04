export type TreeViewItemOptions = {
  checkboxSelection?: boolean;
  hasItemDisabled?: (itemId: string) => boolean;
  hasItemFocus?: (itemId: string) => boolean;
  hasItemSelected?: (itemId: string) => boolean;
  multiCheckboxSelection?: boolean;
  multiSelection?: boolean;
  onCheckboxSelection?: (itemId: string) => void;
  onItemSelection?: (event: KeyboardEvent | MouseEvent, itemId: string) => void;
  onItemExpandToggle?: (itemId: string) => void;
  onItemFocus?: (itemId: string) => void;
  size?: string;
  updateItem?: (item: TreeViewItemInfo) => void;
};

export type TreeViewItemInfo = {
  nodeId: string;
  element?: HTMLModusTreeViewItemElement;
  disabled?: boolean;
  parentId?: string;
  children?: string[];
};
