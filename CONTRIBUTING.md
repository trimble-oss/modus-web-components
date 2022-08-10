# 🔨👷 Contributing

---

## Dependencies

- Node (>= v14)
- NPM CLI (>= v7)

*We recommend using [NVM](https://github.com/nvm-sh/nvm). It is a great tool for switching between Node versions*

## Submitting Issues

Whether you're contributing directly to the code or have suggestions, submitting an issue through GitHub is needed
for referencing changes. Please submit change items as an Issue [here](https://github.com/trimble-oss/modus-web-components/issues).

If the issue's considered a bug, add the 'bug' label to the issue.

Also add a priority level label to the issue. The priority options are low, medium, and high.
If you are unsure of its priority, reach out to one of the developers for their opinion.

## Technologies

### Stencil

Stencil is a web component compiler. Web components is a suite of JavaScript technologies that let you register a component
directly with the browser. This means that the component can be used in any web application. It comes packed with a dev server
and live re-rendering. We are using it to build out the components.

### Storybook

Storybook is a tool for developing components in isolation. It also provides a framework for developing component library
documentation sites. We are using it to document our components.

### NPM

We are hosting this package on both the @trimble-oss GitHub NPM registry, and the public NPM registry.

## Available Scripts

All NPM scripts are run from the `./stencil-workspace` project directory.

`npm install` - Install 3rd party packages

`npm start` - Compile and run the Stencil development site

`npm run build` - Compile the component library

`npm run test` - Run the unit and e2e tests

`npm run test.watch` - Run the unit and e2e tests with auto re-run on changes

`npm run generate` - Start the interactive Stencil component generator

`npm run lint` - Run ESLint to find problems with JS, TS and SCSS code

## Running Locally

To get this application up and running, there are just two commands needed:
- Run `npm install`
- Run `npm start`

> **Note:** The `./stencil-workspace` project directory is the source of truth for this component library. This is where all component changes will take place.

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


## Styleguide

This project follows [Stencil's Style Guide](https://stenciljs.com/docs/style-guide).

## Testing

Each of the components has unit and end-to-end (e2e) tests. Both of these test types use Jest as the JavaScript testing solution. The e2e tests also use Puppeteer to test the
components in an actual browser (giving more realistic results).

Unit tests focus on testing a component's methods in isolation. For example, when a method is given the argument X, it should return Y.

E2e tests focus on how the components are rendered in the DOM and how the individual components work together. For example, when my-component has the X attribute, the child component then renders the text Y, and expects to receive the event Z.

For more information about Stencil's testing, and a better distinction between the unit and e2e tests, check out the testing docs [here](https://stenciljs.com/docs/testing-overview).

Run the tests with `npm run test`.

To run a specific test, run `stencil test --spec --e2e --silent [test file name]`.

## Making Changes and Submitting a PR

1. Before working on an issue, the repository should be forked with intent to contribute to the parent repository.
2. Branch from your fork using the naming convention `issue-{#}/{description}`. For example, `issue-123/my-bug-fix`.
3. Make your changes. Be sure to update or add relevant tests!
4. Run `npm run lint`, `npm run build`, and `npm run test`. If all is well, continue.
5. If the library is going to require a version bump for release, bump the version in `package.json` and run `npm i` after. If a release is not needed at this point, don't worry about this step.
6. If there is any change to the library's API, update the Storybook documentation under `./storybook/stories`.
    - To run the Storybook site, `cd` into the directory and run `npm run storybook`. The library build will need to be up to date. The changes to the site will be deployed upon the PR merge to `main`.
7. Update the `CHANGELOG.md` with notes on your changes.
    - For more information about how to update the changelog, refer to the detailed section in the readme.
8. Once all of your changes have been made, squash your commits down to a singular commit with a relevant message.
    - If you prefer to do this with a GUI, GitHub Desktop has a [great squashing feature](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/managing-commits/squashing-commits).
9. Submit your PR with your branch as the `head`, and the `@trimble-oss/modus-web-components` `main` branch as the `base`.
    - Don't forget to link your relevant issue in the PR description.
10. Rebase and Merge the PR upon approval.
