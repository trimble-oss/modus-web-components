# Changelog

All notable changes to this project will be documented in this file.

View all releases at: <https://github.com/trimble-oss/modus-web-components/releases/>

## Unreleased

### Fixed

- Fixed inexplicitly set aria-disabled values
- Modus Text Inputs no longer have 'clear input' button on by default

## 0.1.24 - 2022-11-17

### Added

- Added `backgroundColor`and `borderRadius` props for `modus-card` component in order to customize `background-color` and `border-radius`
- Added `showCardBorder` and `showShadowOnHover` flags props for `modus-card` component in order to display or not border for card component and shadow box when component is hovered.

### Fixed

- Modus Tooltips now have the correct background color (`$col_gray_9`) and vertical padding

## 0.1.23 - 2022-10-28

### Added

- Added optional property `fullWidth` for modus-tabs. Now component can be resizable from UI if `fullWidth` flag is set on true.
- Added a theme toggler to the toolbar in storybook pages to switch between `light` and `dark` themes

## 0.1.22 - 2022-10-18

### Fixed

- Fixed an issue with the Data Table where setting column ids was not working

## 0.1.21 - 2022-10-04

### Added

- Added optional links input to the Navbar's User Profile menu.

## 0.1.20 - 2022-19-28

### Added

- Added props `category` and `showCategory` slot in `App` interface and modified modus-navbar-apps-menu's style

## 0.1.19 - 2022-19-09

### Added

- Added props `showHelp` and `helpUrl` slot in `modus-navbar` component

## 0.1.18 - 2022-12-09

### Added

- Added props `draggableItem`, `droppableItem`, `editable` and `label` slot in `modus-tree-view-item` component

### Removed

- Removed `checked`, `expanded`, `selected`, `indeterminate` props from `modus-tree-view-item` component

## 0.1.17 - 2022-30-08

### Added

- Added Data Table row actions property
- Added custom placement option for dropdown

## 0.1.16 - 2022-29-08

### Fixed

- An issue where the Modus Dropdown would not open/close when nested in another component.

## 0.1.15 - 2022-29-08

### Fixed

- Fixed explicit optional aria label on Modus Message. Explicitly setting and optional aria labels gives the consumer this error: `Interface 'HTMLModusMessageElement' cannot simultaneously extend types 'ModusMessage' and 'HTMLStencilElement'.Named property 'ariaLabel' of types 'ModusMessage' and 'HTMLStencilElement' are not identical.`

### Removed

- Removed Small checkbox

## 0.1.14 - 2022-23-08

### Added

- Added Modus delete icon component svg and added this to the Icon Map

## 0.1.13 - 2022-23-08

### Added

- Added small Modus Chip variant
- Added Badge cell type to Data Table
- Added an Icon Map, and an example usage in Modus Message. It now takes an `icon` property.

### Fixed

- Improved accessibility for clear input buttons for Modus text Inputs

### Removed

- Removed large Modus Chip variant

## 0.1.12 - 2022-22-08

### Added

- Bare-bones Modus Data Table
- Enabled keyboard interactions for `Content Tree` components.
- Added a prop `auto-focus-input` and a public method `focusInput` to `modus-text-input` component.

### Fixed

- Modus Chips active state color is now blue
- Remove unused Warning button and make Primary button the default
- Modus Message color updates
- Add border to Modus Modal header and footer
- Final breadcrumb item now has `aria-current="page"`

## 0.1.11 - 2022-05-08

### Fixed

- Images in Modus Chips now have an alt tag for improve accessibility.
- Removed unneeded `role="region"` from accordion-items.

## 0.1.10 - 2022-19-07

### Added

- Added `role="button"` and `aria-label="Close"` to Modal Close button.
- Created new `Content Tree` components,
  - `modus-tree-view` is the root tag that manages context for all the tree items.
  - `modus-tree-view-item` is the item tag which is used to render each node in the tree.

### Removed

- Replaced `modus-content-tree-item` with the above content tree components.

### Fixed

- Correct font size for modal header and body text.
- Correct font size for accordion header.
- Change Accordion items border from 2px to 1px
- Change Accordion body font size change from 16px to 14px
- Remove _italic_ style from text input placeholder
- Change disabled text input to lighter gray (from `$col_gray_3` to `$col_gray_1`)
- Correct checkbox border color (from `$col_gray_6` to `$col_gray_4`)
- Add border-radius to Modus Dropdowns
- Correct bg color for disabled Modus number inputs
- Correct Active color for Pagination (now `$col_blue_light`).
- Adds 2px border radius to Modus-Modal
- Changes modal background opacity from 0.4 to 0.75 for greater contrast

## 0.1.9 - 2022-07-07

### Fixed

- Fixed Modus Modal's sizing minimum sizing for mobile views.
- Fixed aria-labels on Modus Progress Bar and Modus File Dropzone by moving to host elements.
- Fixed Modus Dropdown closing issue, it now closes when you click outside.
- Added inputmode option to modus-text-input components.
- Add `cursor: pointer;` CSS to accordion headers.

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

- Updated GitHub Actions to refer to the new Stencil location
- Updated `.prettierrc` to force single quotes which is consistent with our lint settings
- Moved all Stencil source code into ./stencil-workspace
- Moved Storybook code along with Stencil code to simplify the build script changes
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
