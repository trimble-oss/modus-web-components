type TreeViewItemOptions = {
  checkboxSelection?: boolean;
  disabled?: boolean;
  multiCheckboxSelection?: boolean;
  multiSelection?: boolean;
  onItemSelection?: (id: string, element: HTMLModusTreeViewItemElement) => void;
  onCheckboxSelection?: (id: string, element: HTMLModusTreeViewItemElement) => void;
  size?: string;
};

export default TreeViewItemOptions;
