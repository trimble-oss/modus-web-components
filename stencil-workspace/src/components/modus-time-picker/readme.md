# modus-time-picker



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                                                                      | Type                  | Default     |
| ------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `allowedCharsRegex` | `allowed-chars-regex` | (optional) Regular expression to allow characters while typing the input. Default is /[0-9AaPpMm:\s]+/ or /[0-9:]+/ based on the display format. | `RegExp \| string`    | `undefined` |
| `ampm`              | `ampm`                | (optional) Sets 12/24 hour format for the input string.                                                                                          | `boolean`             | `undefined` |
| `ariaLabel`         | `aria-label`          | (optional) The input's aria-label.                                                                                                               | `string`              | `undefined` |
| `autoFocusInput`    | `auto-focus-input`    | (optional) Sets autofocus on the input.                                                                                                          | `boolean`             | `undefined` |
| `autoFormat`        | `auto-format`         | (optional) Formats the text while typing in the input field.                                                                                     | `boolean`             | `undefined` |
| `disableValidation` | `disable-validation`  | (optional) Disables default validation for the time input.                                                                                       | `boolean`             | `undefined` |
| `disabled`          | `disabled`            | (optional) Whether the input is disabled.                                                                                                        | `boolean`             | `undefined` |
| `errorText`         | `error-text`          | (optional) Custom error text displayed for the input.                                                                                            | `string`              | `undefined` |
| `helperText`        | `helper-text`         | (optional) Custom helper text displayed below the input.                                                                                         | `string`              | `undefined` |
| `label`             | `label`               | (optional) The input's label.                                                                                                                    | `string`              | `undefined` |
| `max`               | `max`                 | (optional) Maximum time (in 24 hour format).                                                                                                     | `string`              | `undefined` |
| `min`               | `min`                 | (optional) Minimum time (in 24 hour format).                                                                                                     | `string`              | `undefined` |
| `placeholder`       | `placeholder`         | (optional) The input's placeholder text.                                                                                                         | `string`              | `undefined` |
| `readOnly`          | `read-only`           | (optional) Whether the input's content is read-only                                                                                              | `boolean`             | `undefined` |
| `required`          | `required`            | (optional) Whether the input is required.                                                                                                        | `boolean`             | `undefined` |
| `size`              | `size`                | (optional) The input's size.                                                                                                                     | `"large" \| "medium"` | `'medium'`  |
| `validText`         | `valid-text`          | (optional) The input's valid state text.                                                                                                         | `string`              | `undefined` |
| `value`             | `value`               | (optional) Value of the time entered into the input.                                                                                             | `string`              | `undefined` |


## Events

| Event           | Description                                      | Type                                                   |
| --------------- | ------------------------------------------------ | ------------------------------------------------------ |
| `timeInputBlur` | An event that fires on input value out of focus. | `CustomEvent<{ value: string; inputString: string; }>` |
| `valueChange`   | An event that fires on input value change.       | `CustomEvent<{ value: string; inputString: string; }>` |


## Methods

### `focusInput() => Promise<void>`

Focus the input.

#### Returns

Type: `Promise<void>`




## Slots

| Slot         | Description                   |
| ------------ | ----------------------------- |
| `"timeZone"` | Slot for a Time Zone dropdown |


----------------------------------------------


