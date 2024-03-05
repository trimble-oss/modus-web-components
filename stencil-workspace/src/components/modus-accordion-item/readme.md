# modus-accordion-item



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                    | Type                        | Default      |
| ------------ | ------------- | -------------------------------------------------------------- | --------------------------- | ------------ |
| `disabled`   | `disabled`    | (optional) Disables the accordion item, locks expand/collapse. | `boolean`                   | `undefined`  |
| `expanded`   | `expanded`    | (optional) Whether the accordion item is expanded.             | `boolean`                   | `undefined`  |
| `headerText` | `header-text` | (required) The text to render in the header.                   | `string`                    | `undefined`  |
| `icon`       | `icon`        | (optional) Takes the icon name and renders the icon.           | `string`                    | `undefined`  |
| `size`       | `size`        | (optional) The size of accordion item.                         | `"condensed" \| "standard"` | `'standard'` |


## Events

| Event    | Description                                   | Type               |
| -------- | --------------------------------------------- | ------------------ |
| `closed` | An event that fires on every accordion close. | `CustomEvent<any>` |
| `opened` | An event that fires on every accordion open.  | `CustomEvent<any>` |


----------------------------------------------


