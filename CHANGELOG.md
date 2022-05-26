# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Added angular-workspace project directory to house the generated angular wrapper components
- Added a 'size' input to the modus-progress-bar component. This includes a new 'compact' size.

## [Unreleased]
### Added
- Modus File Dropzone component.
- Created modus-content-tree-item to aid content tree development.

### Changed
Restructured the repo to allow for build generated angular and react components:
- Updated github actions to refer to the new stencil location
- Updated .prettierrc to force single quotes which is consistent with our lint settings
- Moved all stencil source code into ./stencil-workspace
- Moved storybook code along with stencil code to simplify the  build script changes
- Updated package.json types to use interfaces.d.ts which exposes
  internal interfaces to consumers of Angular Components.

## [0.1.5] - 2022-19-04
### Changed
- `modus-list-item` added a `size` option, and now has three options for its `size` property: `'condensed'`, `'standard'`, and `'large'`. `'standard'` is the default, and is now a height `40px`.
- Replaced onclick function call to assignment for icon: triangle-down.

## [0.1.4] - 2022-14-03
### Added
- Added show-shadow property to modus nav-bar.

## [0.1.3] - 2022-14-03
### Fixed
- Add styling to modus-select component so that items with long text in the dropdown wrap properly

## [0.1.1] - 2022-02-03
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

## [0.1.1] - 2022-24-02
### Changed
- Update the package version to 0.1.1

## [0.1.0] - 2022-14-02
### Added
- Publish npm package to both registries

##[0.0.2.0] - 2022-28-01
### Fixed
- Fix modus-dropdown issue when used with shadow dom

[unreleased]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.1.1
[0.1.1]:  https://github.com/trimble-oss/modus-web-components/releases/tag/v0.1.1
[0.1.0]:  https://github.com/trimble-oss/modus-web-components/releases/tag/v0.1.0
[0.0.19]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.19
[0.0.18]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.18
[0.0.17]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.17
[0.0.16]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.16
[0.0.15]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.15
[0.0.14]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.14
[0.0.13]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.13
[0.0.12]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.12
[0.0.11]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.11
[0.0.10]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.10
[0.0.09]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.9
[0.0.08]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.8
[0.0.07]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.7
[0.0.06]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.6
[0.0.05]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.5
[0.0.04]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.4
[0.0.03]: https://github.com/trimble-oss/modus-web-components/releases/tag/v0.0.3
