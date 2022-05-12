<p align="center">
  <img src="https://user-images.githubusercontent.com/84749026/148590605-2eb2a27d-4a7e-4e62-909f-ad8c0e72cd79.png" alt="Modus Web Components" />
</p>

<p align="center">
  <a href="https://modus-web-components.trimble.com/" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg" alt/>
  </a>
  <a href="https://www.npmjs.com/package/@trimble-oss/modus-web-components">
    <img src="https://img.shields.io/github/package-json/v/trimble-oss/modus-web-components?color=blue&filename=stencil-workspace%2Fpackage.json" alt/>
  </a>
  <a href="https://app.netlify.com/sites/modus-web-components/deploys">
    <img src="https://api.netlify.com/api/v1/badges/c9f1de7d-daf8-4dd4-876d-4aa36a077213/deploy-status" alt/>
  </a>
  <a href="https://github.com/trimble-oss/modus-web-components/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/trimble-oss/modus-web-components?color=lightblue" alt/>
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

## Getting Started

### Contribution

If this is your first time in the project, navigate to the `./stencil-workspace` directory and run `npm install` to download 3rd party packages.

All web components are located under the `./stencil-workspace/src/components directory.`

The index.html file provides a place to render components for development and end to end testing.

Global SCSS files are available to provide Modus colors, variables and functions for component styling.

### Implementation

Stencil web component implementation details can be found in their [Framework Integration Docs](https://stenciljs.com/docs/overview).

If you need to use form input web components (eg modus-checkbox, modus-text-input, etc) there are many good examples online.
We won't cover them here as they are often very specific to an individual SPA framework.

## Available Scripts

All NPM scripts are run from the `./stencil-workspace` project directory.

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

## Changelog
- Changelog - A file that contains a curated list of chronological entries for each version of a project.
- Purpose - Enable users to quickly see precise changes between each release or version of a project.
- Uses - End users want to know how and why the software they use changes.

### Semantic Versioning
This project uses the following semantic versioning convention for the repository and changelog entries.
Given a version number [MAJOR.MINOR.PATCH], increment the following:
1. Major Version: to make incompatible API changes - updates containing new dependencies.
2. Minor Version: to add functionality in a backwards compatible manner.
3. Patch Version: to make backwards compatible bug fixes.
Example: Version 1.0.0 has a function added in accordance with a minor version update. The new version will be 1.1.0.
See: [semver.org](https://semver.org/spec/v2.0.0.html).

### Guidelines
- Entries are are easy to understand.
- Each version has an entry and release date.
- Entries have corresponding addresses linked.
- Entries are ordered by date from newest to oldest.
- Entries contain updates relevant to an end user and may not reflect every commit.

### Update-Types
Each changelog entry will include one or more update types relevant to each change:
- Added: New features.
- Changed: Changes in functionality.
- Deprecated: For soon to be removed features.
- Removed: For removed features.
- Fixed: For bug Fixes.
- Security: For vulnerabilities.

------

[Back to Top](#modus-web-components)
