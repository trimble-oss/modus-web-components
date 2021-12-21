// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-number-input-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Number Input',
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
  <modus-number-input></modus-number-input>
`;
export const Default = Template.bind({});


