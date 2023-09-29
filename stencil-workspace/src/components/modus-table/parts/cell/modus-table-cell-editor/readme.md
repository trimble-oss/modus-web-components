# modus-table-filler-column



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description | Type                                             | Default     |
| -------------- | --------- | ----------- | ------------------------------------------------ | ----------- |
| `args`         | --        |             | `{ format: string; } \| { options: unknown[]; }` | `undefined` |
| `type`         | `type`    |             | `string`                                         | `undefined` |
| `value`        | `value`   |             | `string`                                         | `undefined` |
| `valueEntered` | --        |             | `(newValue: string, oldValue: string) => void`   | `undefined` |


## Dependencies

### Used by

 - [modus-table-cell-main](../modus-table-cell-main)

### Depends on

- [modus-number-input](../../../../modus-number-input)
- [modus-text-input](../../../../modus-text-input)
- [modus-select](../../../../modus-select)
- [modus-date-picker](../../../../modus-date-picker)
- [modus-date-input](../../../../modus-date-input)
- [modus-autocomplete](../../../../modus-autocomplete)

### Graph
```mermaid
graph TD;
  modus-table-cell-editor --> modus-number-input
  modus-table-cell-editor --> modus-text-input
  modus-table-cell-editor --> modus-select
  modus-table-cell-editor --> modus-date-picker
  modus-table-cell-editor --> modus-date-input
  modus-table-cell-editor --> modus-autocomplete
  modus-autocomplete --> modus-text-input
  modus-table-cell-main --> modus-table-cell-editor
  style modus-table-cell-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


