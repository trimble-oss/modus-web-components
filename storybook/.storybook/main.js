module.exports = {
  "stories": [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "staticDirs": ['../public'],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/web-components"
}
