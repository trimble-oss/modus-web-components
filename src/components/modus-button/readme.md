# modus-button



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                         | Type                                                             | Default     |
| ------------- | -------------- | ----------------------------------- | ---------------------------------------------------------------- | ----------- |
| `buttonStyle` | `button-style` | (optional) The style of the button  | `"borderless" \| "fill" \| "outline"`                            | `'fill'`    |
| `color`       | `color`        | (optional) The color of the button. | `"danger" \| "default" \| "primary" \| "secondary" \| "warning"` | `'default'` |
| `disabled`    | `disabled`     | (optional) Disables the button.     | `boolean`                                                        | `undefined` |
| `size`        | `size`         | (optional) The size of the button.  | `"large" \| "medium" \| "small"`                                 | `'medium'`  |


## Events

| Event         | Description                                     | Type               |
| ------------- | ----------------------------------------------- | ------------------ |
| `buttonClick` | (optional) An event that fires on button click. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [modus-dialog](../modus-dialog)
 - [modus-navbar-profile-menu](../modus-navbar/profile-menu)

### Graph
```mermaid
graph TD;
  modus-dialog --> modus-button
  modus-navbar-profile-menu --> modus-button
  style modus-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


