# Angular Integrations

This documentation serves as a guide for setting up and integrating Stencil web components with Angular projects.

For any updates or changes, please refer back to this document or the StencilJS [official documentation](https://stenciljs.com/docs/angular#creating-an-angular-component-library).

## How to Scaffold a Specific Version of Angular Integration

To scaffold a new Angular version integration, follow these steps:

> [!NOTE]
> replace `<version-number>` with target angular version you're creating the integration for in the following steps.

### Step 1: Create a New Angular Workspace

Run the following command from the angular-workspace directory to create a new Angular workspace without an application:

```bash
npx -p @angular/cli@<version-number> ng new ng<version-number> --no-create-application
```

### Step 2: Generate a New Library

From the angular workspace directory (`ng<version-number>/`) created in the previous step generate a new library for your Stencil web component integration:

```bash
npx -p @angular/cli@<version-number> ng generate library @trimble-oss/modus-angular-components
```

### Step 3: Delete generated files

You can delete the generated `*.component.ts`, `*.service.ts`, and `*.spec.ts` files in projects/trimble-oss/modus-angular-components/src/lib.

### Step 4: Add LICENSE file to new library

Add a new LICENSE file at ng<version-number>/projects/trimble-oss/modus-angular-components with the following content replacing `<current-year>` with the current year.

```text
MIT License

Copyright (c) <current-year> Trimble Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

### Step 5: Update library README.md

Replace the content of the ng<version-number>/projects/trimble-oss/modus-angular-components/README.md file with the following. Replace the `<version-number>` and `<angular-cli-version-number>` placeholders.

````markdown
# Modus Angular Components

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version <angular-cli-version-number>.

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

- From the `./angular-workspace/ng<version-number>` project directory run
  `npm run build`

## Debugging Locally

To use the Modus Angular components locally for debugging and other purposes:

- From the `./angular-workspace/ng<version-number>` project directory run
  `npm run start`
````

### Step 6: Update `modus-angular-components` version to reflect target Angular version

Append `ng<version-number>` to the version field in the `ng<version-number>/projects/trimble-oss/modus-web-components/package.json`:

```json
{
  "name": "@trimble-oss/modus-angular-components",
  "version": "0.0.1-ng<version-number>",
  ...
}
```

### Step 7: Update Peer Dependencies

Add `@trimble-oss/modus-web-components` as a peer dependency in the `package.json` file of your library located at `ng<version-number>/projects/trimble-oss/modus-angular-components/package.json`:

```json
{
  "peerDependencies": {
    "@trimble-oss/modus-web-components": "^<latest-version>"
  }
}
```

### Step 8: Remove unnecessary testing packages

Angular CLI will install Jasmine as a dependency in the angular workspace. However, Stencil uses Jest as it's testing solution,
so to avoid type definition collisions when building stencil remove `jasmine-core` and `@types/jasmine`.

```bash
# from `/packages/ng<version-number>`
npm uninstall jasmine-core @types/jasmine
```

### Step 9: Configure Stencil Output Target

In the root `stencil.config.ts` file, add the Angular output target to ensure proper integration with Angular:

> [!NOTE]
> The only thing that should change in the below paths is the version number corresponding to the Angular version you're targeting.

```ts
angularOutputTarget({
  componentCorePackage: '@trimble-oss/modus-web-components',
  outputType: 'component',
  directivesProxyFile:
    '../angular-workspace/ng<version-number>/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/components.ts',
  directivesArrayFile:
    '../angular-workspace/ng<version-number>/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/index.ts',
  valueAccessorConfigs: angularValueAccessorBindings,
});
```

### Step 10: Generate Angular Stencil Component Wrappers

Run the following command from the stencil-workspace directory to build the Stencil components and generate the Angular component wrappers:

```bash
npm run build
```

You should now be able to see the stencil generated angular component wrappers under `projects/trimble-oss/modus-angular-components/src/lib/stencil-generated`

### Step 11: Add the following .npmrc to your angular workspace

Create this .npmrc in the angular workspace.

```bash
# .npmrc
lockfile-version = "3"
registry = https://registry.npmjs.org/
```

### Step 12: Create Angular Module

Create a new module at `projects/trimble-oss/modus-angular-components/src/lib/modus-angular-components.module.ts` to import and export the generated component wrappers:

```ts
import { NgModule } from '@angular/core';
import { DIRECTIVES } from './stencil-generated';

@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class ModusAngularComponentsModule {}
```

### Step 13: Update the Public API

Update the `public-api.ts` file to export the components in the main entry point of your library:

```ts
/*
 * Public API Surface of modus-angular-components
 */

export * from './lib/modus-angular-components.module';
export * from './lib/stencil-generated/components';
```

Any components that are included in the exports array should additionally be exported in your main entry point (either public-api.ts or index.ts). Skipping this step will lead to Angular Ivy errors when building for production.

### Step 14: Update and Run Root package.json Scripts

Add the following to the end of the build-angular script in the root package.json

```json
 && cd ../ng<version-number> && npm i && npm run build
```

Add the following to the update-mwc-deps script in the root package.json

```json
 && cd ../../../../ng<version-number>/projects/trimble-oss/modus-angular-components && npx npm-check-updates -u --dep peer @trimble-oss* && npm i
```

Then run the update-mwc-deps script from the root directory

```bash
npm run update-mwc-deps
```

### Step 15: Install Dependencies and Build

Ensure `modus-web-components` dependency is installed in the `ng<version-number>/` angular workspace:

```bash
npm install @trimble-oss/modus-web-components
```

You may need to edit the build script in the angular workspace (`ng<version-number>/`) to specifically target the `projects/trimble-oss/modus-angular-components` component library.

For example:

```json
  "build": "ng run @trimble-oss/modus-angular-components:build:production",
```

Now we can install dependencies and build a local distribution. From `ng<version-number>/` run:

```bash
npm install
npm run build
```

### Step 16: Generate a New Test Harness App

From the angular workspace directory (`ng<version-number>/`) created in the previous step generate a new app:

```bash
npx -p @angular/cli@<version-number> ng generate application test-harness --style scss --ssr false
```

Import and call defineCustomElements in projects/test-harness/src/main.ts

```ts
...
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';

defineCustomElements();
...
```

Import the modus web component styling in projects/test-harness/src/styles.scss:

```scss
@import '@trimble-oss/modus-web-components/dist/modus-web-components/modus-web-components.css';
```

Replace the content of projects/test-harness/src/app/app.html with:

```html
<h1>Modus Angular Components Test Harness</h1>
<div>
  <modus-select
    [label]="'My Modus Select Element'"
    [options]="[{ key: 'Option 1', value: 'option_1' },{ key: 'Option 2', value: 'option_2' }]"
    optionsDisplayProp="key"
    (valueChange)="onValueChange()"></modus-select>
</div>
```

Replace the content of projects/test-harness/src/app/app.ts with:

```ts
import { Component } from '@angular/core';
import { ModusAngularComponentsModule } from '../../../trimble-oss/modus-angular-components/src/lib/modus-angular-components.module';

@Component({
  selector: 'app-root',
  imports: [ModusAngularComponentsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'test-harness';

  onValueChange() {
    console.log('Value Changed');
  }
}
```

### Step 17: Run the Test Harness App

Run the test harness app and verify that the modus select component shows up

```bash
ng serve
```

### Step 18: Package for Local Testing

You can package the angular component library for local testing by running the following command:

```bash
npm pack ./dist/trimble-oss/modus-angular-components
```

### Step 19: Update publish-angular.yml

Add the new version to the angularVersion options of workflow_dispatch inputs in .github/workflows/publish-angular.yml

```yaml
name: Create and publish Angular npm package
on:
  workflow_dispatch:
    inputs:
      angularVersion:
        required: true
        type: choice
        options:
          ...
          - '<version-number>'
        ...
```

Make sure the Node.js environment is setup to use the correct version for building and publishing the new angular version, this may already exist for earlier versions and the if condition for the last angular version may need to be updated to exclude the new angular version

```yaml
...
    steps:
      ...
      - name: Setup Node.js environment for Angular <version-number>
        if: ${{ github.event.inputs.angularVersion >= <version-number> }}
        uses: actions/setup-node@v4
        with:
          node-version: '<min-node-version>.x'
          registry-url: 'https://registry.npmjs.org'
```

### Step 20: Run Prettier

Run prettier to format files in the ng<version number> directory

```bash
npx prettier . --write
```
