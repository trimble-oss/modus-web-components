// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-progress-bar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Progress Bar',
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

const Template = () => html`
  <modus-progress-bar></modus-progress-bar>
`;
export const Default = Template.bind({});


