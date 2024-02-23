// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-breadcrumb-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Breadcrumb',
  argTypes: {
    underline:{
      name: 'underline',
      description: 'A flag that controls the display of underline',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    },
  parameters: {
    docs: {
      inlineStories: false,
      page: docs,
    },
    controls: {
      disabled: false,
      expanded: true,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({underline}) => html`
  <modus-breadcrumb underline=${underline}></modus-breadcrumb>
  ${setBreadcrumb()}
`;
export const Default = Template.bind({});
Default.args = { underline: false };
export const Underline = Template.bind({});
Underline.args = { underline: true };
// The <script> tag cannot be used in the MDX file, so we use this method to
// set the breadcrumbs for the default story.
const setBreadcrumb = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
   document.querySelector('modus-breadcrumb').crumbs = [
      { id: '1', display: 'Crumb 1' },
      { id: '2', display: 'Crumb 2' },
      { id: '3', display: 'Crumb 3' },
      { id: '4', display: 'Crumb 4' },
    ];
  `;

  return tag;
};
