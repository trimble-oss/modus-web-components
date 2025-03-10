# modus-table-filler-column



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type                               | Default     |
| ------------------- | --------------------- | ----------- | ---------------------------------- | ----------- |
| `cell`              | --                    |             | `Cell<unknown, unknown>`           | `undefined` |
| `context`           | --                    |             | `TableContext`                     | `undefined` |
| `hasRowsExpandable` | `has-rows-expandable` |             | `boolean`                          | `undefined` |
| `valueChange`       | --                    |             | `(props: TableCellEdited) => void` | `undefined` |


## Events

| Event                  | Description | Type                                                                                       |
| ---------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| `cellInputValueChange` |             | `CustomEvent<{ accessorKey: string; row: unknown; newValue: string; oldValue?: string; }>` |


## Methods

### `handleCellEdit(rowIndex: string, columnId: string) => Promise<void>`

Returns whether a cell is editable based on row index and column ID.

#### Parameters

| Name       | Type     | Description           |
| ---------- | -------- | --------------------- |
| `rowIndex` | `string` | The index of the row. |
| `columnId` | `string` | The ID of the column. |

#### Returns

Type: `Promise<void>`

Boolean indicating if the cell is editable.


## Dependencies

### Used by

 - [modus-table](../../..)

### Depends on

- [modus-table-cell-editor](../modus-table-cell-editor)
- [modus-badge](../../../../modus-badge)
- [flex-renderer](..)

### Graph
```mermaid
graph TD;
  modus-table-cell-main --> modus-table-cell-editor
  modus-table-cell-main --> modus-badge
  modus-table-cell-main --> flex-renderer
  modus-table-cell-editor --> modus-number-input
  modus-table-cell-editor --> modus-text-input
  modus-table-cell-editor --> modus-select
  modus-table-cell-editor --> modus-date-picker
  modus-table-cell-editor --> modus-date-input
  modus-table-cell-editor --> modus-autocomplete
  modus-autocomplete --> modus-text-input
  modus-autocomplete --> modus-chip
  modus-autocomplete --> modus-spinner
  modus-table --> modus-table-cell-main
  style modus-table-cell-main fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


