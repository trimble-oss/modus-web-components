// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-accordion-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Accordion',
  argTypes: {
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
      expanded: true
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({expandButtonType}) => html`
  <modus-accordion>
    <modus-accordion-item header-text="Item 1" expand-button-type=${expandButtonType}>Content</modus-accordion-item>
    <modus-accordion-item header-text="Item 2" expand-button-type=${expandButtonType}>Content</modus-accordion-item>
    <modus-accordion-item disabled header-text="Item 3" expand-button-type=${expandButtonType}>
      Content
    </modus-accordion-item>
  </modus-accordion>
`;
const DefaultTemplateArgs = {
  expandButtonType: 'standardArrow',
};
const CircleArrowTemplateArgs = {
  expandButtonType: 'circleArrow',
};

export const Default = Template.bind({});
Default.args = DefaultTemplateArgs;

export const CircleArrow = Template.bind({});
CircleArrow.args = CircleArrowTemplateArgs;

