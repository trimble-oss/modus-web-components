# modus-buttongroup



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                               | Type                                                 | Default                  |
| --------------- | ---------------- | ----------------------------------------- | ---------------------------------------------------- | ------------------------ |
| `ariaLabel`     | `aria-label`     | (optional) The button group's aria-label. | `string`                                             | `undefined`              |
| `buttonStyle`   | `button-style`   |                                           | `"borderless" \| "fill" \| "outline"`                | `'outline'`              |
| `color`         | `color`          |                                           | `"danger" \| "primary" \| "secondary" \| "tertiary"` | `'primary'`              |
| `disabled`      | `disabled`       | (optional) Disables the button group.     | `boolean`                                            | `undefined`              |
| `selectionType` | `selection-type` | (optional) The selection type of buttons  | `"multiple" \| "none" \| "single"`                   | `DEFAULT_SELECTION_TYPE` |
| `size`          | `size`           | (optional) The size of the buttons        | `"large" \| "medium" \| "small"`                     | `'medium'`               |


## Events

| Event              | Description                              | Type                                            |
| ------------------ | ---------------------------------------- | ----------------------------------------------- |
| `buttonGroupClick` | Event emitted when a button is clicked   | `CustomEvent<ModusButtonGroupButtonClickEvent>` |
| `selectionChange`  | Event emitted when the selection changes | `CustomEvent<HTMLModusButtonElement[]>`         |


----------------------------------------------


