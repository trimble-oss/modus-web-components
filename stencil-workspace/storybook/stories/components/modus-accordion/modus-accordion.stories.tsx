// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-accordion-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Accordion',
  argTypes: {
    icon:{
      name: 'icon',
      description: 'The icon to display before the header text',
      table: {
        type: { summary: 'string' },
      },
    },
    },
  parameters: {
    controls: {
      expanded: true ,sort:"alpha"
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({icon}) => html`
  <modus-accordion>
    <modus-accordion-item header-text="Item 1" icon=${icon}>Content</modus-accordion-item>
    <modus-accordion-item header-text="Item 2" icon=${icon}>Content</modus-accordion-item>
    <modus-accordion-item disabled header-text="Item 3" icon=${icon}>
      Content
    </modus-accordion-item>
  </modus-accordion>
`;
const DefaultTemplateArgs={
  icon: '',
};
const WithIconTemplateArgs={
  icon: 'notifications',
};
export const Default = Template.bind({});
Default.args = DefaultTemplateArgs;
export const WithIcon = Template.bind({});
WithIcon.args = WithIconTemplateArgs;
