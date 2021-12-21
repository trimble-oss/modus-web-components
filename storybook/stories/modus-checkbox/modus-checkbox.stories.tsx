// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-checkbox-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Checkbox',
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
  <modus-checkbox></modus-checkbox>
`;
export const Default = Template.bind({});


