// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-modal-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Modal',
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
    },
    viewMode: 'docs'
  },
};

const Template = () => html`
  <modus-button color="primary">Open Modal</modus-button>
  <modus-modal header-text="Modus Modal" primary-button-text="Sweet!" secondary-button-text="Ahh okay...">
    <p>Here is some modal content. Render anything here.</p>
  </modus-modal>
  ${setScript()}
`;
export const Default = Template.bind({});

const setScript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-button').addEventListener('buttonClick', () => {
      document.querySelector('modus-modal').open();
    });
  `;

  return tag;
};

