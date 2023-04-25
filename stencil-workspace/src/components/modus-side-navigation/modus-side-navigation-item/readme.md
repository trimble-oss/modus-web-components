# modus-side-navigation-item



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                  | Type      | Default     |
| ------------------ | ------------------- | ------------------------------------------------------------ | --------- | ----------- |
| `disableSelection` | `disable-selection` | (optional) Disables item selection.                          | `boolean` | `false`     |
| `disabled`         | `disabled`          | (optional) The disabled state of side navigation panel item. | `boolean` | `false`     |
| `label`            | `label`             | (optional) Label for the item and the tooltip message.       | `string`  | `undefined` |
| `menuIcon`         | `menu-icon`         | (optional) A built-in menu icon string or a image url.       | `string`  | `undefined` |
| `selected`         | `selected`          | (optional) The selected state of side navigation panel item. | `boolean` | `false`     |
| `showExpandIcon`   | `show-expand-icon`  | (optional) Shows the expand icon.                            | `boolean` | `false`     |


## Events

| Event                | Description                                                           | Type                                              |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| `sideNavItemClicked` | An event that fires when mouse click or `Enter` key press on an item. | `CustomEvent<{ id: string; selected: boolean; }>` |
| `sideNavItemFocus`   | An event that fires when an item is in focus.                         | `CustomEvent<{ id: string; }>`                    |


## Methods

### `focusItem() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [modus-side-navigation](..)

### Depends on

- [modus-tooltip](../../modus-tooltip)

### Graph
```mermaid
graph TD;
  modus-side-navigation-item --> modus-tooltip
  modus-side-navigation --> modus-side-navigation-item
  style modus-side-navigation-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


