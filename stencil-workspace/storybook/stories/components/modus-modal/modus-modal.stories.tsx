// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-modal-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Modal',
  parameters: {
    actions: {
      handles: ['closed'],
    },
    docs: {
      inlineStories: false,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    controls: {
      disabled: true,
    },
    viewMode: 'docs',
  },
};

const Template = () => html`
  <modus-button id="btn-modal" color="primary">Open modal</modus-button>
  <modus-modal
    header-text="Modal title"
    primary-button-text="Save changes"
    secondary-button-text="Sweet!"
    primary-button-aria-label="Save changes"
    secondary-button-aria-label="Sweet">
    <p>Woo-hoo, you're reading this text in a modal!</p>
  </modus-modal>
  ${setScript()}
`;
export const Default = Template.bind({});

const setScript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#btn-modal').addEventListener('buttonClick', () => {
      document.querySelector('modus-modal').open();
    });
  `;

  return tag;
};
