# Copilot Instructions

- This project is for a web components library, Modus Web Components.
- The library is built with StencilJS.
- The site is built with Storybook 8.
- We use GitHub for tracking issues/bugs.
- All code is formatted with Prettier.
- Ensure all code passes linting and tests before submitting a pull request.
- Node v18 or later is required.

## GitHub Actions

- The GitHub Actions workflows should be placed in the .github/workflows directory.
- The workflows should be named `<workflow-name>.yml`.
- All GitHub Actions should be pinned versions to avoid breaking changes (SHA-1).
- If using actions/checkout, it should have `persist-credentials: false` set.
