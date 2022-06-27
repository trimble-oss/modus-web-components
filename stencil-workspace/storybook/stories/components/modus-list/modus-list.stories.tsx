// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-list-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/List',
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      disabled: true,
    },
    options: {
      isToolshown: true
    }
  },
};

const Template = () => html`
<modus-list>
  <modus-list-item>Default</modus-list-item>
  <modus-list-item selected>Selected</modus-list-item>
  <modus-list-item disabled>Disabled</modus-list-item>
</modus-list>
`;
export const Default = Template.bind({});


