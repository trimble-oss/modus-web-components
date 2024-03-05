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
    expandButtonType: {
      name: 'expandButtonType',
      type: 'select',
      defaultValue: 'standardArrow',
      description: 'The type of expand button',
      table: {
        type: { summary: 'standardArrow | circleArrow' },
        defaultValue: { summary: 'standardArrow' },
      },
      options: ['standardArrow', 'circleArrow'],
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

const Template = ({expandButtonType, icon}) => html`
  <modus-accordion>
    <modus-accordion-item header-text="Item 1" icon=${icon} expand-button-type=${expandButtonType}>Content</modus-accordion-item>
    <modus-accordion-item header-text="Item 2" icon=${icon} expand-button-type=${expandButtonType}>Content</modus-accordion-item>
    <modus-accordion-item disabled header-text="Item 3" icon=${icon} expand-button-type=${expandButtonType}>
      Content
    </modus-accordion-item>
  </modus-accordion>
`;

const DefaultTemplateArgs={
  expandButtonType: 'standardArrow',
  icon: '',
};

const WithIconTemplateArgs={
  expandButtonType: 'standardArrow',
  icon: 'notifications',
};

const CircleArrowTemplateArgs = {
  expandButtonType: 'circleArrow',
  icon: '',
};

export const Default = Template.bind({});
Default.args = DefaultTemplateArgs;

export const WithIcon = Template.bind({});
WithIcon.args = WithIconTemplateArgs;

export const CircleArrow = Template.bind({});
CircleArrow.args = CircleArrowTemplateArgs;

