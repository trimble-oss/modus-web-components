module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../storybook/**/*.stories.mdx",
    "../storybook/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "staticDirs": ['../storybook/public'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/web-components"
}
