// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-dropdown-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Dropdown',
  parameters: {
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true
    },
    previewTabs: {
      canvas: {
        hidden: true
      }
    },
    viewMode: 'docs'
  },
};

const Template = () => html`
  <modus-dropdown></modus-dropdown>
`;
export const Default = Template.bind({});


