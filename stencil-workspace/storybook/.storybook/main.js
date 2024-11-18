module.exports = {
  stories: ['../stories/framework-integrations/*.mdx', '../stories/introduction/*.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    {
      name: '@storybook/addon-styling',
      options: {
        postCss: {
          implementation: require('postcss'),
        },
      },
    },
    '@storybook/addon-mdx-gfm',
    '@storybook/addon-webpack5-compiler-babel',
  ],

  babel: async (options) => ({
    ...options,
    presets: ['@babel/preset-react', '@babel/preset-flow'],
  }),

  framework: {
    name: '@storybook/web-components-webpack5',
    options: {},
  },
};
