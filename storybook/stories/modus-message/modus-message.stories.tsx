// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-message-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Message',
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
  <modus-message></modus-message>
`;
export const Default = Template.bind({});


