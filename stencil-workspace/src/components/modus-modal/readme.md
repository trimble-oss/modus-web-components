# modus-modal



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                     | Description                                         | Type     | Default     |
| -------------------------- | ----------------------------- | --------------------------------------------------- | -------- | ----------- |
| `ariaLabel`                | `aria-label`                  | (optional) The modal's aria-label.                  | `string` | `undefined` |
| `headerText`               | `header-text`                 | (optional) The modal's primary button text.         | `string` | `undefined` |
| `primaryButtonAreaLabel`   | `primary-button-area-label`   | (optional) The modal's primary button Area label.   | `string` | `undefined` |
| `primaryButtonText`        | `primary-button-text`         | (optional) The modal's primary button text.         | `string` | `undefined` |
| `secondaryButtonAreaLabel` | `secondary-button-area-label` | (optional) The modal's secondary button Area Label. | `string` | `undefined` |
| `secondaryButtonText`      | `secondary-button-text`       | (optional) The modal's secondary button text.       | `string` | `undefined` |
| `zIndex`                   | `z-index`                     | (optional) The modal's z-index.                     | `string` | `'1'`       |


## Events

| Event                  | Description                                    | Type               |
| ---------------------- | ---------------------------------------------- | ------------------ |
| `closed`               | An event that fires on modal close.            | `CustomEvent<any>` |
| `opened`               | An event that fires on modal open.             | `CustomEvent<any>` |
| `primaryButtonClick`   | An event that fires on primary button click.   | `CustomEvent<any>` |
| `secondaryButtonClick` | An event that fires on secondary button click. | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [modus-button](../modus-button)

### Graph
```mermaid
graph TD;
  modus-modal --> modus-button
  style modus-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


