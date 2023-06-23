# Modus React Components Test Harness - React 18

This application has been created using Create React App and is for the purpose of testing the Modus React Components locally without having to publish the latest web components or react components to npm

## Getting Started

Setting up this small react project relies on `npm link`. See the docs [here](https://docs.npmjs.com/cli/v8/commands/npm-link)

From inside the `./stencil-workspace` directory:

1. Run `npm install`
2. Run `npm run build`
3. Run `npm link`

From inside the `./react-workspace/react-18` directory:

1. Run `npm install`
2. Run `npm run build`
3. Run `npm link`

From inside the `./react-workspace/test-react-v18` directory:

1. Run `npm install`
2. Run `npm link @trimble-oss/modus-web-components @trimble-oss/modus-react-components`
3. Run `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Examples

Examples for the React components can be found under `./src/examples` and can be used in `App.tsx`
