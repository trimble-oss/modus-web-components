# modus-table



<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description                                | Type                           | Default                                                                                                                               |
| ---------------------- | --------- | ------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `columns` _(required)_ | --        |                                            | `TColumn[] \| string[]`        | `undefined`                                                                                                                           |
| `data` _(required)_    | --        |                                            | `TCell[][] \| TRow[]`          | `undefined`                                                                                                                           |
| `displayOptions`       | --        | Options for data table display.            | `ModusTableDisplayOptions` | `{     animateRowActionsDropdown: false,     borderless: true,     cellBorderless: true,     rowStripe: false,     size: 'large'   }` |
| `rowActions`           | --        | Actions that can be performed on each row. | `ModusTableRowAction[]`    | `[]`                                                                                                                                  |
| `selectionOptions`     | --        | Options for data table item selection.     | `ModusTableSelectionOptions`   | `{     canSelect: false,     checkboxSelection: false,   }`                                                                           |
| `sortOptions`          | --        | Options for data table column sort.        | `ModusTableSortOptions`        | `{     canSort: false,     serverSide: false,   }`                                                                                    |


## Events

| Event            | Description                                       | Type                                             |
| ---------------- | ------------------------------------------------- | ------------------------------------------------ |
| `cellLinkClick`  | An event that fires on cell link click.           | `CustomEvent<ModusTableCellLink>`            |
| `rowActionClick` | An event that fires when a row action is clicked. | `CustomEvent<ModusTableRowActionClickEvent>` |
| `rowDoubleClick` | An event that fires on row double click.          | `CustomEvent<string>`                            |
| `selection`      | An event that fires on selection change.          | `CustomEvent<string[]>`                          |
| `sort`           | An event that fires on column sort.               | `CustomEvent<ModusTableSortEvent>`           |


## Dependencies

### Depends on

- [modus-checkbox](../modus-checkbox)
- [modus-tooltip](../modus-tooltip)
- [modus-badge](../modus-badge)
- [modus-dropdown](../modus-dropdown)

### Graph
```mermaid
graph TD;
  modus-table --> modus-checkbox
  modus-table --> modus-tooltip
  modus-table --> modus-badge
  modus-table --> modus-dropdown
  style modus-table fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


