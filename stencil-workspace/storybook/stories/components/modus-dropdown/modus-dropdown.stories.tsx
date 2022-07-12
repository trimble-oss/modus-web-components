// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-dropdown-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Dropdown',
  parameters: {
    actions: {
      handles: ['dropdownClose'],
    },
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
  <modus-dropdown toggle-element-id="toggleElement">
  <modus-button id="toggleElement" slot="dropdownToggle">Dropdown</modus-button>
  <modus-list slot="dropdownList">
    <modus-list-item size="condensed">Item 1</modus-list-item>
    <modus-list-item size="condensed">Item 2</modus-list-item>
    <modus-list-item size="condensed">Item 3</modus-list-item>
  </modus-list>
  </modus-dropdown>
`;
export const Default = Template.bind({});
