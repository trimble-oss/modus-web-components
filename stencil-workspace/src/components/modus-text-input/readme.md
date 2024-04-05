# modus-text-input



<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute                      | Description                                                                                              | Type                                                                        | Default     |
| --------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------- |
| `ariaLabel`                 | `aria-label`                   | (optional) The input's aria-label.                                                                       | `string`                                                                    | `undefined` |
| `autoFocusInput`            | `auto-focus-input`             | (optional) Sets autofocus on the input.                                                                  | `boolean`                                                                   | `undefined` |
| `autocapitalize`            | `autocapitalize`               | (optional) Capitalization behavior when using a non-traditional keyboard (e.g. microphone, touch screen) | `"characters" \| "none" \| "off" \| "on" \| "sentences" \| "words"`         | `undefined` |
| `autocomplete`              | `autocomplete`                 | (optional) Sets autocomplete on the input.                                                               | `string`                                                                    | `undefined` |
| `autocorrect`               | `autocorrect`                  | (optional) Whether to activate automatic correction while the user is editing this field in Safari.      | `"off" \| "on" \| boolean`                                                  | `undefined` |
| `clearable`                 | `clearable`                    | (optional) Whether the input has a clear button.                                                         | `boolean`                                                                   | `false`     |
| `disabled`                  | `disabled`                     | (optional) Whether the input is disabled.                                                                | `boolean`                                                                   | `undefined` |
| `enterkeyhint`              | `enterkeyhint`                 | (optional) Which action label to present for the enter key on virtual keyboards.                         | `"done" \| "enter" \| "go" \| "next" \| "previous" \| "search" \| "send"`   | `undefined` |
| `errorText`                 | `error-text`                   | (optional) The input's error state text.                                                                 | `string`                                                                    | `undefined` |
| `helperText`                | `helper-text`                  | (optional) The input's helper text displayed below the input.                                            | `string`                                                                    | `undefined` |
| `includePasswordTextToggle` | `include-password-text-toggle` | (optional) Whether the password text toggle icon is included.                                            | `boolean`                                                                   | `true`      |
| `includeSearchIcon`         | `include-search-icon`          | (optional) Whether the search icon is included.                                                          | `boolean`                                                                   | `undefined` |
| `inputmode`                 | `inputmode`                    | (optional) The input's inputmode.                                                                        | `"decimal" \| "email" \| "numeric" \| "search" \| "tel" \| "text" \| "url"` | `undefined` |
| `label`                     | `label`                        | (optional) The input's label.                                                                            | `string`                                                                    | `undefined` |
| `maxLength`                 | `max-length`                   | (optional) The input's maximum length.                                                                   | `number`                                                                    | `undefined` |
| `minLength`                 | `min-length`                   | (optional) The input's minimum length.                                                                   | `number`                                                                    | `undefined` |
| `pattern`                   | `pattern`                      | (optional) The input's pattern HTML attribute.                                                           | `string`                                                                    | `undefined` |
| `placeholder`               | `placeholder`                  | (optional) The input's placeholder text.                                                                 | `string`                                                                    | `undefined` |
| `readOnly`                  | `read-only`                    | (optional) Whether the input's content is read-only                                                      | `boolean`                                                                   | `undefined` |
| `required`                  | `required`                     | (optional) Whether the input is required.                                                                | `boolean`                                                                   | `undefined` |
| `size`                      | `size`                         | (optional) The input's size.                                                                             | `"large" \| "medium"`                                                       | `'medium'`  |
| `spellcheck`                | `spellcheck`                   | (optional) Whether to enable spell checking.                                                             | `boolean`                                                                   | `undefined` |
| `textAlign`                 | `text-align`                   | (optional) The input's text alignment.                                                                   | `"left" \| "right"`                                                         | `'left'`    |
| `type`                      | `type`                         | (optional) The input's type.                                                                             | `"email" \| "password" \| "search" \| "tel" \| "text" \| "url"`             | `'text'`    |
| `validText`                 | `valid-text`                   | (optional) The input's valid state text.                                                                 | `string`                                                                    | `undefined` |
| `value`                     | `value`                        | (optional) The input's value.                                                                            | `string`                                                                    | `undefined` |


## Events

| Event         | Description                                | Type                  |
| ------------- | ------------------------------------------ | --------------------- |
| `valueChange` | An event that fires on input value change. | `CustomEvent<string>` |


## Methods

### `focusInput() => Promise<void>`

Focus the input.

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part                | Description |
| ------------------- | ----------- |
| `"input-container"` |             |


## Dependencies

### Used by

 - [modus-autocomplete](../modus-autocomplete)
 - [modus-navbar-search-overlay](../modus-navbar/search-overlay)
 - [modus-table-cell-editor](../modus-table/parts/cell/modus-table-cell-editor)
 - [modus-tree-view-item](../modus-content-tree/modus-tree-view-item)

### Graph
```mermaid
graph TD;
  modus-autocomplete --> modus-text-input
  modus-navbar-search-overlay --> modus-text-input
  modus-table-cell-editor --> modus-text-input
  modus-tree-view-item --> modus-text-input
  style modus-text-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


