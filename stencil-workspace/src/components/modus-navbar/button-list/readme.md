# modus-navbar-button-list



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                     | Type                  | Default     |
| --------- | --------- | ----------------------------------------------- | --------------------- | ----------- |
| `buttons` | --        | (optional) The buttons to render in the Navbar. | `ModusNavbarButton[]` | `undefined` |


## Events

| Event         | Description | Type                  |
| ------------- | ----------- | --------------------- |
| `buttonClick` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [modus-navbar](..)

### Depends on

- [modus-navbar-button](../button)

### Graph
```mermaid
graph TD;
  modus-navbar-button-list --> modus-navbar-button
  modus-navbar-button --> modus-tooltip
  modus-navbar --> modus-navbar-button-list
  style modus-navbar-button-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


