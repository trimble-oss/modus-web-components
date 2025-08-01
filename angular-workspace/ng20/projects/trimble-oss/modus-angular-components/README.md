# Modus Angular Components

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.0.

## Installation

- Install the Modus Angular Components Library and its Modus Web Component dependency
  `npm install @trimble-oss/modus-angular-components --save`

- Add the following snippet to your `main.ts` (or any main module)

  ```typescript
  import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';

  defineCustomElements();
  ```

- Add the following snippet to your `app.module.ts` (or any app module)

  ```typescript
  import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

  @NgModule({
    ...
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  ```

## Example Usage

- Use a modus button in your `app.component.html`

  ```html
  <modus-button color="primary" [disabled]="false">Modus Button</modus-button>
  ```

## Contributing

To contribute to the Modus Angular Components library please see the [Modus Web Components](https://www.npmjs.com/package/@trimble-oss/modus-web-components) [contributing guidelines](https://github.com/trimble-oss/modus-web-components/blob/main/CONTRIBUTING.md).

## Build

To rebuild the Modus Angular Components you need to perform the following steps:

- from the `./stencil-workspace` project directory run the following:
  `npm run build`

- From the `./angular-workspace/ng20` project directory run
  `npm run build`

## Debugging Locally

To use the Modus Angular components locally for debugging and other purposes:

- From the `./angular-workspace/ng20` project directory run
  `npm run start`
