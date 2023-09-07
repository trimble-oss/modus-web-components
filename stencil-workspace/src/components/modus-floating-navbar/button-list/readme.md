# modus-floating-navbar-button-list



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                     | Type                          | Default     |
| --------- | --------- | ----------------------------------------------- | ----------------------------- | ----------- |
| `buttons` | --        | (optional) The buttons to render in the Navbar. | `ModusFloatingNavbarButton[]` | `undefined` |


## Events

| Event         | Description | Type                  |
| ------------- | ----------- | --------------------- |
| `buttonClick` |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [modus-floating-navbar](..)

### Depends on

- [modus-floating-navbar-button](../button)

### Graph
```mermaid
graph TD;
  modus-floating-navbar-button-list --> modus-navbar-button
  modus-navbar-button --> modus-tooltip
  modus-floating-navbar --> modus-floating-navbar-button-list
  style modus-navbar-button-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


