# modus-table-panel



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                     | Type                     | Default     |
| --------- | --------- | ------------------------------- | ------------------------ | ----------- |
| `options` | --        | (Optional) Table Panel options. | `ModusTablePanelOptions` | `undefined` |
| `table`   | --        | Table data.                     | `Table<unknown>`         | `undefined` |


## Dependencies

### Used by

 - [modus-table](../../..)

### Depends on

- [modus-table-dropdown-menu](../modus-table-dropdown-menu)

### Graph
```mermaid
graph TD;
  modus-table-panel --> modus-table-dropdown-menu
  modus-table-dropdown-menu --> modus-table-columns-visibility
  modus-table-columns-visibility --> modus-checkbox
  modus-table-columns-visibility --> modus-button
  modus-table --> modus-table-panel
  style modus-table-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


