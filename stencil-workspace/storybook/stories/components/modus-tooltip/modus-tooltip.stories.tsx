// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-tooltip-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Tooltip',
  parameters: {
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true
    },
    controls: {
      disabled: true,
    },
    viewMode: 'docs'
  },
};

const Template = () => html`
  <modus-tooltip></modus-tooltip>
`;
export const Default = Template.bind({});
