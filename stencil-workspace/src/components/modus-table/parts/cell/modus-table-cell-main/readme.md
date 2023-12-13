# modus-table-filler-column



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description | Type                               | Default     |
| ------------------- | --------------------- | ----------- | ---------------------------------- | ----------- |
| `cell`              | --                    |             | `Cell<unknown, unknown>`           | `undefined` |
| `context`           | --                    |             | `TableContext`                     | `undefined` |
| `hasRowsExpandable` | `has-rows-expandable` |             | `boolean`                          | `undefined` |
| `valueChange`       | --                    |             | `(props: TableCellEdited) => void` | `undefined` |


## Dependencies

### Used by

 - [modus-table](../../..)

### Depends on

- [modus-table-cell-editor](../modus-table-cell-editor)
- [modus-badge](../../../../modus-badge)

### Graph
```mermaid
graph TD;
  modus-table-cell-main --> modus-table-cell-editor
  modus-table-cell-main --> modus-badge
  modus-table-cell-editor --> modus-number-input
  modus-table-cell-editor --> modus-text-input
  modus-table-cell-editor --> modus-select
  modus-table-cell-editor --> modus-date-picker
  modus-table-cell-editor --> modus-date-input
  modus-table-cell-editor --> modus-autocomplete
  modus-autocomplete --> modus-text-input
  modus-autocomplete --> modus-chip
  modus-table --> modus-table-cell-main
  style modus-table-cell-main fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


