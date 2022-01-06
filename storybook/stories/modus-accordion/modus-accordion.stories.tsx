// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-accordion-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Accordion',
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

const Template = () => html``;
export const Default = Template.bind({});


