# modus-checkbox



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                            | Type               | Default     |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `ariaLabel`       | `aria-label`       | (optional) The checkbox's aria-label.                                                  | `string`           | `undefined` |
| `checked`         | `checked`          | (optional) Whether the checkbox is checked.                                            | `boolean`          | `undefined` |
| `disabled`        | `disabled`         | (optional) Whether the checkbox is disabled.                                           | `boolean`          | `undefined` |
| `indeterminate`   | `indeterminate`    | (optional) Whether the checkbox is indeterminate.                                      | `boolean`          | `undefined` |
| `label`           | `label`            | (optional) The checkbox label.                                                         | `string`           | `undefined` |
| `stopPropagation` | `stop-propagation` | (optional) If you wish to prevent the propagation of your event, you may opt for this. | `boolean`          | `undefined` |
| `tabIndexValue`   | `tab-index-value`  | (optional) Tab Index for the checkbox                                                  | `number \| string` | `0`         |


## Events

| Event           | Description                            | Type                   |
| --------------- | -------------------------------------- | ---------------------- |
| `checkboxClick` | An event that fires on checkbox click. | `CustomEvent<boolean>` |


## Methods

### `focusCheckbox() => Promise<void>`

Focus the checkbox input

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [modus-data-table](../modus-data-table)
 - [modus-table](../modus-table)
 - [modus-table-columns-visibility](../modus-table/parts/panel/modus-table-columns-visibility)
 - [modus-tree-view-item](../modus-content-tree/modus-tree-view-item)

### Graph
```mermaid
graph TD;
  modus-data-table --> modus-checkbox
  modus-table --> modus-checkbox
  modus-table-columns-visibility --> modus-checkbox
  modus-tree-view-item --> modus-checkbox
  style modus-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


