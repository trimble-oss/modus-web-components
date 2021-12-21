// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-breadcrumb-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Breadcrumb',
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
  <modus-breadcrumb></modus-breadcrumb>
  ${setBreadcrumb()}
`;
export const Default = Template.bind({});

// The <script> tag cannot be used in the MDX file, so we use this method to
// set the breadcrumbs for the default story.
const setBreadcrumb = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    const modusBreadcrumb = document.querySelector('modus-breadcrumb');
    const crumbs = [
      { id: '1', display: 'Crumb 1' },
      { id: '2', display: 'Crumb 2' },
      { id: '3', display: 'Crumb 3' },
      { id: '4', display: 'Crumb 4' },
    ];
    modusBreadcrumb.crumbs = crumbs;
  `;

  return tag;
}


