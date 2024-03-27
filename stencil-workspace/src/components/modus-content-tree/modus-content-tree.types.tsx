export type TreeViewItemOptions = {
  checkboxSelection?: boolean;
  disableTabbing?: boolean;
  getLevel?: (itemId: string) => number;
  hasItemDisabled?: (itemId: string) => boolean;
  hasItemFocus?: (itemId: string) => boolean;
  hasItemSelected?: (itemId: string) => boolean;
  hasItemExpanded?: (itemId: string) => boolean;
  hasItemChecked?: (itemId: string) => boolean;
  hasItemIndeterminate?: (itemId: string) => boolean;
  showSelectionIndicator?: (itemId: string) => boolean;
  multiCheckboxSelection?: boolean;
  multiSelection?: boolean;
  onCheckboxSelection?: (itemId: string, syncOnly?: boolean) => void;
  onChildTreeItemsChange?: (item: HTMLElement) => string[];
  onItemAdd?: (ele: HTMLElement) => void;
  onItemDelete?: (itemId: string) => void;
  onItemSelection?: (itemId: string, event?: KeyboardEvent | MouseEvent) => void;
  onItemExpandToggle?: (itemId: string) => void;
  onItemFocus?: (itemId: string) => void;
  onItemDrag?: (itemId: string, dragContent: HTMLElement, e: MouseEvent) => void;
  onItemUpdate?: (newValue: TreeViewItemInfo, oldValue?: TreeViewItemInfo) => void;
  size?: string;
  borderless?: boolean;
};

export type TreeViewItemInfo = {
  nodeId: string;
  index?: number;
  element?: HTMLModusTreeViewItemElement;
  content?: HTMLElement;
  disabled?: boolean;
  droppable?: boolean;
  parentId?: string;
  children?: string[];
  level?: number;
};

export type TreeViewItemDragState = {
  itemId: string;
  dragContent: HTMLElement;
  targetId?: string;
  validTarget?: boolean;
  origin?: Position;
  translation?: Position;
  width?: string;
  height?: string;
};

export type Position = { x: number; y: number };
