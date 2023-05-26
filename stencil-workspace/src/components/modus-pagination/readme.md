# modus-pagination



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                               | Type                             | Default     |
| -------------------- | ----------------------- | ----------------------------------------- | -------------------------------- | ----------- |
| `activePage`         | `active-page`           |                                           | `number`                         | `undefined` |
| `ariaLabel`          | `aria-label`            |                                           | `string`                         | `undefined` |
| `maxPage`            | `max-page`              |                                           | `number`                         | `undefined` |
| `minPage`            | `min-page`              |                                           | `number`                         | `undefined` |
| `nextPageButtonText` | `next-page-button-text` | Weather to display text or next icon.     | `string`                         | `undefined` |
| `prevPageButtonText` | `prev-page-button-text` | Weather to display text or previous icon. | `string`                         | `undefined` |
| `size`               | `size`                  |                                           | `"large" \| "medium" \| "small"` | `'medium'`  |


## Events

| Event        | Description                         | Type                  |
| ------------ | ----------------------------------- | --------------------- |
| `pageChange` | An event that fires on page change. | `CustomEvent<number>` |


## Dependencies

### Used by

 - [modus-data-table](../modus-data-table)

### Graph
```mermaid
graph TD;
  modus-data-table --> modus-pagination
  style modus-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


