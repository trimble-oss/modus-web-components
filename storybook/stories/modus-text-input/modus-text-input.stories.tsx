// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-text-input-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Text Input',
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
  <modus-text-input></modus-text-input>
`;
export const Default = Template.bind({});


