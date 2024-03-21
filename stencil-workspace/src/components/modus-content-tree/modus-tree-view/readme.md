# modus-tree-view



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description                                                                                                                                                                                   | Type                                   | Default      |
| ------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------ |
| `borderless`             | `borderless`               | (optional) Whether the content tree and items have a border or not                                                                                                                            | `boolean`                              | `undefined`  |
| `checkboxSelection`      | `checkbox-selection`       | (optional) Enables checkbox selection on each tree item                                                                                                                                       | `boolean`                              | `undefined`  |
| `checkedItems`           | --                         | (optional) Set checked tree items                                                                                                                                                             | `string[]`                             | `[]`         |
| `disableTabbing`         | `disable-tabbing`          | (optional) Disable usage of `tab` key to focus elements inside a tree view. Use `Arrow Up/Down` for focussing a tree item and `Shift + Arrow Right` for focussing a checkbox inside the item. | `boolean`                              | `undefined`  |
| `expandedItems`          | --                         | (optional) Set expanded tree items                                                                                                                                                            | `string[]`                             | `[]`         |
| `multiCheckboxSelection` | `multi-checkbox-selection` | (optional) Enables multiple checkbox selection                                                                                                                                                | `boolean`                              | `undefined`  |
| `multiSelection`         | `multi-selection`          | (optional) Enables multiple tree items selection                                                                                                                                              | `boolean`                              | `undefined`  |
| `selectedItems`          | --                         | (optional) Set selected tree items                                                                                                                                                            | `string[]`                             | `[]`         |
| `size`                   | `size`                     | (optional) The default size of all tree items                                                                                                                                                 | `"condensed" \| "large" \| "standard"` | `'standard'` |


## Events

| Event             | Description                                                                                                                           | Type               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `itemActionClick` | Fired when an action is clicked within any tree item. Includes both the `actionId` and `nodeId` of the action and item, respectively. | `CustomEvent<any>` |


----------------------------------------------


