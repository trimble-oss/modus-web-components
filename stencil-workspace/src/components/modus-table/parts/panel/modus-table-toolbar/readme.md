# modus-table-toolbar



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                     | Type                       | Default     |
| --------- | --------- | ------------------------------- | -------------------------- | ----------- |
| `options` | --        | (Optional) Table Panel options. | `ModusTableToolbarOptions` | `undefined` |
| `table`   | --        | Table data.                     | `Table<unknown>`           | `undefined` |


## Dependencies

### Used by

 - [modus-table](../../..)

### Depends on

- [modus-table-dropdown-menu](../modus-table-dropdown-menu)

### Graph
```mermaid
graph TD;
  modus-table-toolbar --> modus-table-dropdown-menu
  modus-table-dropdown-menu --> modus-table-columns-visibility
  modus-table-columns-visibility --> modus-checkbox
  modus-table-columns-visibility --> modus-button
  modus-table --> modus-table-toolbar
  style modus-table-toolbar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


