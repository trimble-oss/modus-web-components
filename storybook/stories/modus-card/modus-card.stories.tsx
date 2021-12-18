// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-card-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Card',
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
    }
  },
};

const Template = () => html``;
export const Default = Template.bind({});

