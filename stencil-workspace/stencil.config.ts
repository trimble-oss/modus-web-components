import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget as react } from '@stencil/react-output-target';
import autoprefixer from 'autoprefixer';
import angularValueAccessorBindings from './angular-value-accessor-bindings';

export const config: Config = {
  namespace: 'modus-web-components',
  buildDist: true,
  sourceMap: false,
  extras: {
    enableImportInjection: true,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      generateTypeDeclarations: false,
    },
    {
      type: 'docs-vscode',
      file: 'dist/vscode.html-custom-data.json',
    },
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: '@trimble-oss/modus-web-components',
      outputType: 'component',
      directivesProxyFile:
        '../angular-workspace/ng14/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular-workspace/ng14/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    angularOutputTarget({
      componentCorePackage: '@trimble-oss/modus-web-components',
      outputType: 'component',
      directivesProxyFile:
        '../angular-workspace/ng15/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular-workspace/ng15/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    angularOutputTarget({
      componentCorePackage: '@trimble-oss/modus-web-components',
      outputType: 'component',
      directivesProxyFile:
        '../angular-workspace/ng16/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular-workspace/ng16/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    angularOutputTarget({
      componentCorePackage: '@trimble-oss/modus-web-components',
      outputType: 'component',
      directivesProxyFile:
        '../angular-workspace/ng17/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../angular-workspace/ng17/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/index.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    react({
      componentCorePackage: '@trimble-oss/modus-web-components',
      proxiesFile: '../react-workspace/react-17/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
    react({
      componentCorePackage: '@trimble-oss/modus-web-components',
      proxiesFile: '../react-workspace/react-18/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),
  ],
  globalStyle: 'src/global/themes.scss',
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass({
      injectGlobalPaths: [
        'src/global/modus-functions.scss',
        'src/global/modus-colors.scss',
        'src/global/modus-light-theme.scss',
        'src/global/modus-variables.scss',
        'src/global/shared-mixins.scss',
      ],
    }),
  ],
};
