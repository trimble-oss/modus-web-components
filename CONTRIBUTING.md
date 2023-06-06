# 🔨👷 Contributing

---

## Table of Contents

- [Dependencies](#dependencies)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Submitting Issues](#submitting-issues)
- [Technologies](#technologies)
- [Running Locally](#running-locally)
- [Developing a Component](#developing-a-component)
- [Style Guide](#style-guide)
- [Testing](#testing)
- [Making Changes and Submitting a PR](#making-changes-and-submitting-a-pr)
- [Changelog](#changelog)
- [Releasing Framework Outputs](#releasing-framework-outputs)

## Dependencies

- Node (>= v14)
- npm CLI (>= v7)

_We recommend using [nvm](https://github.com/nvm-sh/nvm). It is a great tool for switching between Node versions_

## Getting Started

### Running the App

If this is your first time in the project, navigate to the `./stencil-workspace` directory and run `npm install` to download third-party packages.

Once you've installed the project's packages, run `npm start`.
A development environment will start up with the contents of `index.html`.
This file provides a place to render components for development and end-to-end testing.

All web components are located under the `./stencil-workspace/src/components` directory.

Global SCSS files are available to provide Modus colors, variables and functions for component styling.

### Implementation

Stencil web component implementation details can be found in their [Framework Integration Docs](https://stenciljs.com/docs/overview).

## Available Scripts

All npm scripts are run from the `./stencil-workspace` project directory.

`npm install` - Install third-party packages

`npm start` - Compile and run the Stencil development site

`npm run build` - Compile the component library

`npm run test` - Run the unit and e2e tests

`npm run test.watch` - Run the unit and e2e tests with auto re-run on changes

`npm run generate` - Start the interactive Stencil component generator

`npm run lint` - Run ESLint to find problems with JS, TS and SCSS code

`npm run start-storybook`: Build and run the Storybook documentation site.
Note: You will need to manually install the packages in `./stencil-workspace/storybook` before running this command

## Submitting Issues

Whether you're contributing directly to the code or have suggestions, submitting an issue through GitHub is needed
for referencing changes. Please submit change items as an Issue [here](https://github.com/trimble-oss/modus-web-components/issues).

If the issue's considered a bug, add the 'bug' label to the issue.

Also add a priority level label to the issue. The priority options are low, medium, and high.
If you are unsure of its priority, reach out to one of the developers for their opinion.

## Technologies

- [Stencil](https://stenciljs.com/)
- [Storybook](https://storybook.js.org/)
- [npm](https://docs.npmjs.com/getting-started)
- [Sass](https://sass-lang.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest](https://jestjs.io/)
- [rollup.js](https://rollupjs.org/)

### Stencil

Stencil is a web component compiler. Web components is a suite of JavaScript technologies that let you register a component
directly with the browser. This means that the component can be used in any web application. It comes packed with a dev server
and live re-rendering. We are using it to build out the components.

### Storybook

Storybook is a tool for developing components in isolation. It also provides a framework for developing component library
documentation sites. We are using it to document our components.

### npm

We are hosting this package on both the @trimble-oss GitHub npm registry, and the public npm registry.

## Running Locally

To get this application up and running, there are just two commands needed:

- Run `npm install`
- Run `npm start`

> **Note:** The `./stencil-workspace` project directory is the source of truth for this component library. This is where all component changes will take place. The other directories are generated.

## Developing a Component

Stencil gives us a dev server to work with out of the box. Using this dev server is our recommended way for developing on these components.
When running `npm start`, the `./src/index.html` is served up.
To start developing on a component, you must add the component to the `index.html` using its HTML tag. After manually adding the component to the body
of the index, you're able to add arguments to its attributes in the markup. Properties that cannot be accessed through attributes can be set in the `<script>` tag of
the index.

The components are automatically registered with the browser in this environment, so all you'll need to do is reference its tag like so:

```html
...
<body>
  <modus-alert message="Hello, dev environment!"></modus-alert>
</body>
...
```

You can find more in depth examples of how these attributes and properties are set on the [Modus Web Components Storybook site](https://modus-web-components.trimble.com/?path=/docs/introduction-getting-started--page).

## Style Guide

This project follows [Stencil's Style Guide](https://stenciljs.com/docs/style-guide).

## Testing

Each of the components has unit and end-to-end (e2e) tests. Both of these test types use Jest as the JavaScript testing solution. The e2e tests also use Puppeteer to test the
components in an actual browser (giving more realistic results).

Unit tests focus on testing a component's methods in isolation. For example, when a method is given the argument X, it should return Y.

E2e tests focus on how the components are rendered in the DOM and how the individual components work together. For example, when my-component has the X attribute, the child component then renders the text Y, and expects to receive the event Z.

For more information about Stencil's testing, and a better distinction between the unit and e2e tests, check out the testing docs [here](https://stenciljs.com/docs/testing-overview).

Run the tests with `npm run test`.

To run a specific test, run `stencil test --spec --e2e --silent [test file name]`.

### Debugging Tests

Before running the `test.debug` script, make sure to add the file you want to debug to the end of the script line. For example,
`"stencil test --spec --e2e --watchAll --devtools -- modus-autocomplete.e2e.ts"`.
This will open Chrome dev tools for debugging, and run only the Autocomplete e2e tests.

You can add the following code to the test file to pause the test at a specific point while it's running in Chrome dev tools:
`page.evaluate(() => { debugger; });`

## Considerations

When submitting or reviewing contributions to the Modus Web Components library (MWC), it is important to keep code quality in mind.
Check out the [Considerations](CONSIDERATIONS.md) doc for more information.

## Making Changes and Submitting a PR

1. Before working on an issue, the repository should be forked with intent to contribute to the parent repository.
2. Branch from your fork using the naming convention `issue-{#}/{description}`. For example, `issue-123/my-bug-fix`.
3. Make your changes. Be sure to update or add relevant tests!
4. Run `npm run lint`, `npm run build`, and `npm run test`. If all is well, continue.
5. If the library is going to require a version bump for release, bump the version in `package.json` and run `npm i` after. If a release is not needed at this point, don't worry about this step.
6. If there is any change to the library's API, update the Storybook documentation under `./storybook/stories`.
   - To run the Storybook site, `cd` into the directory and run `npm run storybook`. The library build will need to be up to date. The changes to the site will be deployed upon the PR merge to `main`.
7. Once all of your changes have been made, squash your commits down to a singular commit with a relevant message.
   - If you prefer to do this with a GUI, GitHub Desktop has a [great squashing feature](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/managing-commits/squashing-commits).
8. Submit your PR with your branch as the `head`, and the `@trimble-oss/modus-web-components` `main` branch as the `base`.
   - Don't forget to link your relevant issue in the PR description.
9. Rebase and Merge the PR upon approval.

## Changelog

The release notes can be viewed on the [GitHub Releases](https://github.com/trimble-oss/modus-web-components/releases) page.

### Semantic Versioning

This project uses the following semantic versioning convention for the repository and changelog entries.
Given a version number [MAJOR.MINOR.PATCH], increment the following:

1. Major: to make incompatible API changes - updates containing new dependencies.
2. Minor: to add functionality in a backwards compatible manner.
3. Patch: to make backwards compatible bug fixes.
   Example: Version 1.0.0 has a function added in accordance with a minor version update. The new version will be 1.1.0.
   See: [semver.org](https://semver.org/spec/v2.0.0.html).

## Releasing Framework Outputs

Before releasing any of the framework outputs, the targeted version of the Modus Web Components should be successfully released.

### Angular

1. Update `./angular-workspace/projects/trimble-oss/modus-angular-components/package.json`'s:
   1. Dependency on the Modus Web Components library to the targeted version
   2. The package's version to reflect the targeted version
2. From the `./angular-workspace/projects/trimble-oss/modus-angular-components` directory, run `npm i`.
3. From the `./angular-workspace` directory, run `npm i`.
4. From the `./angular-workspace` directory, run `npm run build`.
5. From the newly generated `./angular-workspace/dist/trimble-oss/modus-angular-components` directory, run `npm publish`.

### React

1. Update `./react-workspace/package.json`'s:
   1. Dependency on the Modus Web Components library to the targeted version
   2. The package's version to reflect the targeted version
2. From the `./react-workspace` directory, run `npm i`.
3. From the `./react-workspace` directory, run `npm run build`.
4. From the `./react-workspace` directory, run `npm publish`.

As an alternative to publish, this can be also consumed in a local react application using `npm link` or generate a tarball file using `npm pack`.

#### Recommended

Import the React library in `./react-workspace/projects/test-react-v17` for testing the components locally, refer to `src/App.tsx` file for more details on how to test the components.
