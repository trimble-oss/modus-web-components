// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-accordion-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Accordion',
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
<modus-accordion>
  <modus-accordion-item header-text="Item 1">Content</modus-accordion-item>
  <modus-accordion-item header-text="Item 2">Content</modus-accordion-item>
  <modus-accordion-item disabled header-text="Item 3">
    Content
  </modus-accordion-item>
</modus-accordion>
`;
export const Default = Template.bind({});


