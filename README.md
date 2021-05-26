# Modus Web Components

The [Trimble Modus Design System](https://modus.trimble.com/) describes the UX that Trimble wants to provide in its UI across its many applications. The benefits of using Modus include rapid prototyping, development efficiency, and UX consistency.

Modus includes...

- Typography
- Colors
- Rules
- Elements (components)

This library provides Modus Elements as web components. Web components are reusable, encapsulated UI elements that are framework agnostic (can be implemented in any site). The modus-web-components library was built using the latest UX specs from Figma. Releases follow the [semantic versioning 2.0.0](https://semver.org/) spec.

## Table of Contents

- [Getting Started](#getting-started)
- [Technology](#technology)
- [Components](#components)
  - **Implemented**
    - [Button](src/components/modus-button/readme.md)
  - **Not Implemented**
    - [Accordion](#accordion)
    - [Alert](#alert)
    - [Badge](#badge)
    - [Breadcrumb](#breadcrumb)
    - [Checkbox](#checkbox)
    - [Chip](#chip)
    - [Dialog](#dialog)
    - [Dropdown](#dropdown)
    - [Pattern](#pattern)
    - [Radio](#radio)
    - [Switch](#switch)
    - [Table/List](#table/list)
    - [Table/Sheet](#table/sheet)
    - [Tab](#tab)
    - [Text Input](#text-input)
    - [Toast](#toast)
    - [Tooltip](#tooltip)
  
## Getting Started

All NPM scripts are run from the root of the project.

`npm install` - Install 3rd party packages

`npm start` - Compile and run the Stencil development site

`npm run build` - Compile the component library

`npm run test` - Run the unit and e2e tests

`npm run test.watch` - Run the unit and e2e tests with auto re-run on changes

`npm run generate` - Start the interactive Stencil component generator

## Technology

- [ESLint](https://eslint.org/) - A JS linter to help find and fix problems in code.
- [Jest](https://jestjs.io/) - A JS testing framework.
- [Stencil](https://stenciljs.com/) - A toolchain for building reusable, scalable design systems and web components.
- [SASS](https://sass-lang.com/) - The most mature, stable, and powerful professional grade CSS extension language in the world.
- [rollup.js](https://rollupjs.org/) - A module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

------

[Back to Top](#modus-web-components)