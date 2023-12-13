# modus-toolbar



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                      | Type                         | Default        |
| -------------- | --------------- | -------------------------------- | ---------------------------- | -------------- |
| `buttons`      | --              | The buttons to render.           | `ModusToolbarButton[]`       | `undefined`    |
| `layout`       | `layout`        | (optional) The toolbar's layout. | `"horizontal" \| "vertical"` | `'horizontal'` |
| `toolbarStyle` | `toolbar-style` | (optional) The toolbar's style   | `"combined" \| "split"`      | `'combined'`   |


## Dependencies

### Depends on

- [modus-toolbar-button](button)

### Graph
```mermaid
graph TD;
  modus-toolbar --> modus-toolbar-button
  modus-toolbar-button --> modus-tooltip
  style modus-toolbar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


