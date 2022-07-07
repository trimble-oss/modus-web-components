# Changelog

All notable changes to this project will be documented in this file.

View all releases at: https://github.com/trimble-oss/modus-web-components/releases/

## Unreleased

## 0.1.9 - 2022-07-07

### Fixed

- Fixed Modus Modal's sizing minimum sizing for mobile views.
- Fixed aria-labels on Modus Progress Bar and Modus File Dropzone by moving to host elements.
- Fixed Modus Dropdown closing issue, it now closes when you click outside.
- Added inputmode option to modus-text-input components.
- Add `cursor: pointer;` CSS to acccordion headers

## 0.1.8 - 2022-24-06

### Fixed

- Fixed Toast's ariaLabel type.
- Added JSX to types output.

## 0.1.7 - 2022-19-06

### Added

- Input to change the modal's z-index.

## 0.1.6 - 2022-19-06

### Added

- Modus File Dropzone component.
- Created modus-content-tree-item to aid content tree development.
- Added angular-workspace project directory to house the generated angular wrapper components
- Added a 'size' input to the modus-progress-bar component. This includes a new 'compact' size.
- Added a 'type' input to the modus-text-component, allows values 'text' or 'password'.

### Changed

Restructured the repo to allow for build generated angular and react components:

- Updated github actions to refer to the new stencil location
- Updated `.prettierrc` to force single quotes which is consistent with our lint settings
- Moved all stencil source code into ./stencil-workspace
- Moved storybook code along with stencil code to simplify the build script changes
- Updated `package.json` types to use interfaces.d.ts which exposes
  internal interfaces to consumers of Angular Components.

## 0.1.5 - 2022-19-04

### Changed

- `modus-list-item` added a `size` option, and now has three options for its `size` property: `'condensed'`, `'standard'`, and `'large'`. `'standard'` is the default, and is now a height `40px`.
- Replaced onclick function call to assignment for icon: triangle-down.

## 0.1.4 - 2022-14-03

### Added

- Added show-shadow property to modus nav-bar.

## 0.1.3 - 2022-14-03

### Fixed

- Add styling to modus-select component so that items with long text in the dropdown wrap properly

## 0.1.1 - 2022-02-03

### Added

- Add explanation of semantic versioning to the readme file.

### Changed

- Rename changelog to reflect context.
- Improve project organization by adding a changelog.

### Removed

- Section about date formatting.

### Fixed

- Fix typos in changelog.
- Update changelog dates to reflect current versioning.

## 0.1.1 - 2022-24-02

### Changed

- Update the package version to 0.1.1

## 0.1.0 - 2022-14-02

### Added

- Publish npm package to both registries

## 0.0.2.0 - 2022-28-01

### Fixed

- Fix modus-dropdown issue when used with shadow DOM
