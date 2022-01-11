<p align="center">
  <img src="https://user-images.githubusercontent.com/84749026/148590605-2eb2a27d-4a7e-4e62-909f-ad8c0e72cd79.png" alt="Modus Web Components" />
</p>

<p align="center">
  <a href="https://modus-web-components.netlify.app/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg">
  </a>

  <a href="https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.18">
    <img src="https://img.shields.io/badge/latest%20version-v0.0.18-%230063a3" />
  </a>
  
  <a href="https://app.netlify.com/sites/modus-web-components/deploys"> 
  <img src="https://api.netlify.com/api/v1/badges/c9f1de7d-daf8-4dd4-876d-4aa36a077213/deploy-status" />
  </a>
</p>

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
    - Accordion (modus-accordion)
    - Accordion Item (modus-accordion-item)
    - Alert (modus-alert)
    - Badge (modus-badge)
    - Breadcrumb (modus-breadcrumb)
    - Button (modus-button)
    - Card (modus-card)
    - Checkbox (modus-checkbox)
    - Chip (modus-chip)
    - Dialog (modus-dialog)
    - Dropdown (modus-dropdown)
    - Input Number (modus-number-input)
    - Input Radio Group (modus-radio-group)
    - Input Text (modus-text-input)
    - List (modus-list)
    - List Item (modus-list-item)
    - Message (modus-message)
    - Modal (modus-modal)
    - Navbar (modus-navbar)
    - Pagination (modus-pagination)
    - Progress Bar (modus-progress-bar)
    - Select (modus-select)
    - Slider (modus-slider)
    - Spinner (modus-spinner)
    - Switch (modus-switch)
    - Tabs (modus-tabs)
    - Toast (modus-toast)
    - Tooltip (modus-tooltip)
  - **Not Implemented**
    - _initial development of defined components finished_
  - **Future Development**
    - Input Date (design not currently specified)
    - Table/List (in re-design by tiger team - do not create)
    - Table/Sheet (in re-design by tiger team - do not create)

## Getting Started

### Contribution

If this is your first time in the project, run `npm install` to download 3rd party packages.

All web components are located under the src/components directory.

The index.html file provides a place to render components for development and end to end testing.

Global SCSS files are available to provide Modus colors, variables and functions for component styling.

### Implementation

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

`npm run lint` - Run ESLint to find problems with JS, TS and SCSS code

## Technology

- [ESLint](https://eslint.org/) - A JS linter to help find and fix problems in code.
- [Jest](https://jestjs.io/) - A JS testing framework.
- [Stencil](https://stenciljs.com/) - A toolchain for building reusable, scalable design systems and web components.
- [SASS](https://sass-lang.com/) - The most mature, stable, and powerful professional grade CSS extension language in the world.
- [rollup.js](https://rollupjs.org/) - A module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.

------

[Back to Top](#modus-web-components)
