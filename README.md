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
- [Available Scripts](#available-scripts)
- [Technology](#technology)
- [Components](#components)
  - **Implemented**
    - Alert (modus-alert)
    - Badge (modus-badge)
    - Button (modus-button)
    - Checkbox (modus-checkbox)
    - Dropdown (modus-dropdown)
    - List (modus-list)
    - List Item (modus-list-item)
    - Progress Bar (modus-progress-bar)
    - Select (modus-select)
    - Spinner (modus-spinner)
    - Text Input (modus-text-input)
  - **Not Implemented**
    - [Accordion](#accordion)
    - [Breadcrumb](#breadcrumb)
    - [Card](#card)
    - [Chip](#chip)
    - [Dialog](#dialog)
    - [Input Date](#input-date)
    - [Input Number](#input-number)
    - [Input Radio](#input-radio)
    - [Message](#message)
    - [Pagination](#pagination)
    - [Pattern](#pattern)
    - [Slider](#slider)
    - [Switch](#switch)
    - [Table/List](#table/list)
    - [Table/Sheet](#table/sheet)
    - [Tab](#tab)
    - [Toast](#toast)
    - [Tooltip](#tooltip)
  
## Getting Started

###Contribution

If this is your first time in the project, run `npm install` to download 3rd party packages.

All web components are located under the src/components directory. 

The index.html file provides a place to render components for development and end to end testing.

Global SCSS files are available to provide Modus colors, variables and functions for component styling.

###Implementation

Stencil web component implementation details can be found in their [Framework Integration Docs](https://stenciljs.com/docs/overview).

If you need to use form input web components (eg modus-checkbox, modus-text-input, etc) there are many good examples online. 
We won't cover them here as they are often very specific to an individual SPA framework.

## Available Scripts

All NPM scripts are run from the root of the project.

`npm install` - Install 3rd party packages

`npm start` - Compile and run the Stencil development site

`npm run build` - Compile the component library

`npm run test` - Run the unit and e2e tests

`npm run test.watch` - Run the unit and e2e tests with auto re-run on changes

`npm run generate` - Start the interactive Stencil component generator

`npm run lint` - Run ESLint to find problems with JS and TS code

## Technology

- [ESLint](https://eslint.org/) - A JS linter to help find and fix problems in code.
- [Jest](https://jestjs.io/) - A JS testing framework.
- [Stencil](https://stenciljs.com/) - A toolchain for building reusable, scalable design systems and web components.
- [SASS](https://sass-lang.com/) - The most mature, stable, and powerful professional grade CSS extension language in the world.
- [rollup.js](https://rollupjs.org/) - A module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

------

[Back to Top](#modus-web-components)