// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-list-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/List',
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
  <modus-list></modus-list>
`;
export const Default = Template.bind({});


