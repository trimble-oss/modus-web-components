import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import { angularOutputTarget } from '@stencil/angular-output-target';
import autoprefixer from 'autoprefixer';

export const config: Config = {
  namespace: 'modus-web-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
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
      directivesProxyFile: '../angular-workspace/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/trimble-oss/modus-angular-components/src/lib/stencil-generated/index.ts',
    }),
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
    sass({
      injectGlobalPaths: [
        'src/global/modus-functions.scss', // adds @import 'src/global/modus-functions.scss' statement
        'src/global/modus-colors.scss', // adds @import 'src/global/modus-colors.scss' statement
        'src/global/modus-light-theme.scss', // adds @import 'src/global/modus-light-theme.scss' statement
        'src/global/modus-variables.scss', // adds @import 'src/global/modus-variables.scss' statement
        'src/global/shared-mixins.scss',
      ],
    }),
  ],
};
