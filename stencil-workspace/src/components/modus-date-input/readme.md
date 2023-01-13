# modus-date-picker-input



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                                             | Type                           | Default     |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ----------- |
| `ariaLabel`         | `aria-label`         | (optional) The input's aria-label.                                                                                      | `string`                       | `undefined` |
| `autoFocusInput`    | `auto-focus-input`   | (optional) Sets autofocus on the input.                                                                                 | `boolean`                      | `undefined` |
| `disableValidation` | `disable-validation` | (optional) Disables default validation for the date input.                                                              | `boolean`                      | `undefined` |
| `disabled`          | `disabled`           | (optional) Whether the input is disabled.                                                                               | `boolean`                      | `undefined` |
| `errorText`         | `error-text`         | (optional) Custom error text displayed for the input.                                                                   | `string`                       | `undefined` |
| `helperText`        | `helper-text`        | (optional) Custom helper text displayed below the input. Default is 'dd/mm/yyyy'                                        | `string`                       | `undefined` |
| `invalid`           | `invalid`            | (optional) Sets input error state.                                                                                      | `boolean`                      | `undefined` |
| `label`             | `label`              | (optional) The input's label.                                                                                           | `string`                       | `undefined` |
| `placeholder`       | `placeholder`        | (optional) The input's placeholder text.                                                                                | `string`                       | `undefined` |
| `readOnly`          | `read-only`          | (optional) Whether the input's content is read-only                                                                     | `boolean`                      | `undefined` |
| `required`          | `required`           | (optional) Whether the input is required.                                                                               | `boolean`                      | `undefined` |
| `showCalendarIcon`  | `show-calendar-icon` | (optional) Show a calendar icon. Note: Clicking on this icon will only emit an event `calendarIconClicked`.             | `boolean`                      | `undefined` |
| `size`              | `size`               | (optional) The input's size.                                                                                            | `"large" \| "medium"`          | `'medium'`  |
| `type`              | `type`               | (optional) Denotes what type of date and the types are 'start','end','single'. Required when using `modus-date-picker`. | `"end" \| "single" \| "start"` | `'single'`  |
| `validText`         | `valid-text`         | (optional) The input's valid state text.                                                                                | `string`                       | `undefined` |
| `value`             | `value`              | (optional) The input's value.                                                                                           | `string`                       | `undefined` |


## Events

| Event                 | Description                                      | Type                                                |
| --------------------- | ------------------------------------------------ | --------------------------------------------------- |
| `calendarIconClicked` | An event that fires on calendar icon click.      | `CustomEvent<{ date: Date; type: DateInputType; }>` |
| `dateInputBlur`       | An event that fires on input value out of focus. | `CustomEvent<{ date: Date; type: DateInputType; }>` |
| `valueChange`         | An event that fires on input value change.       | `CustomEvent<{ date: Date; type: DateInputType; }>` |


## Methods

### `focusInput() => Promise<void>`

Focus the input.

#### Returns

Type: `Promise<void>`



### `getDate() => Promise<Date>`

Gets date object value

#### Returns

Type: `Promise<Date>`



### `setDate(date: Date) => Promise<void>`

Sets value on the input field

#### Returns

Type: `Promise<void>`




----------------------------------------------


