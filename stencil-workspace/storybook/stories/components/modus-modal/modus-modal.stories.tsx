// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-modal-storybook-docs.mdx';
import { html } from 'lit-html';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/Modal',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The modal's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    headerText: {
      name: 'headerText',
      description: "The modal's primary button text",
      table: {
        type: { summary: 'string' },
      },
    },
    primaryButtonAriaLabel: {
      name: 'primaryButtonAriaLabel',
      description: "The modal's primary button aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    primaryButtonDisabled: {
      name: 'primaryButtonDisabled',
      description: 'Disable primary button',
      table: {
        type: { summary: 'boolean' },
      },
    },
    primaryButtonText: {
      name: 'primaryButtonText',
      description: "The modal's primary button text",
      table: {
        type: { summary: 'string' },
      },
    },
    secondaryButtonAriaLabel: {
      name: 'secondaryButtonAriaLabel',
      description: "The modal's secondary button aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    secondaryButtonDisabled: {
      name: 'secondaryButtonDisabled',
      description: 'Disable secondary button',
      table: {
        type: { summary: 'boolean' },
      },
    },
    secondaryButtonText: {
      name: 'secondaryButtonText',
      description: "The modal's secondary button text",
      table: {
        type: { summary: 'string' },
      },
    },
    zIndex: {
      name: 'zIndex',
      description: "The modal's z-index",
      table: {
        type: { summary: 'string' },
      },
    },
    backdrop: {
      name: 'backdrop',
      description: "The modal's backdrop",
      table: {
        type: { summary: 'string' },
      },
    },
    fullscreen: {
      name: 'fullscreen',
      description: "The modal's full screen view.",
      table: {
        type: { summary: 'boolean' },
      },
    },
    showFullscreenToggle: {
      name: 'showFullscreenToggle',
      description: 'Show full screen toggle',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['closed', 'primaryButtonClick', 'secondaryButtonClick', 'buttonClick'],
    },
    docs: {
      inlineStories: false,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    viewMode: 'docs',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1346-12&m=dev',
    },
  },
  decorators: [withActions],
};

const Template = ({
  ariaLabel,
  headerText,
  primaryButtonAriaLabel,
  primaryButtonDisabled,
  primaryButtonText,
  secondaryButtonAriaLabel,
  secondaryButtonDisabled,
  secondaryButtonText,
  zIndex,
  backdrop,
  fullscreen,
  showFullscreenToggle,
}) => html`
  <modus-button id="btn-modal" color="primary">Open modal</modus-button>
  <modus-modal
    aria-label=${ariaLabel}
    header-text=${headerText}
    primary-button-aria-label=${primaryButtonAriaLabel}
    primary-button-disabled=${primaryButtonDisabled}
    primary-button-text=${primaryButtonText}
    secondary-button-aria-label=${secondaryButtonAriaLabel}
    secondary-button-disabled=${secondaryButtonDisabled}
    secondary-button-text=${secondaryButtonText}
    z-index=${zIndex}
    backdrop=${backdrop}
    fullscreen=${fullscreen}
    show-fullscreen-toggle=${showFullscreenToggle}>
    <p>Woo-hoo, you're reading this text in a modal!</p>
  </modus-modal>
  ${setScript()}
`;
export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  headerText: 'Modal title',
  primaryButtonAriaLabel: 'Save changes',
  primaryButtonDisabled: false,
  primaryButtonText: 'Save changes',
  secondaryButtonAriaLabel: 'Sweet',
  secondaryButtonDisabled: false,
  secondaryButtonText: 'Sweet',
  zIndex: '1',
  backdrop: 'default',
  fullscreen: false,
  showFullscreenToggle: false,
};

const CustomFooterTemplate = ({ ariaLabel, headerText, zIndex, backdrop, fullscreen, showFullscreenToggle }) => html`
  <modus-button id="btn-modal-footer" color="primary">Open modal</modus-button>
  <modus-modal
    id="modal-footer"
    aria-label=${ariaLabel}
    header-text=${headerText}
    z-index=${zIndex}
    backdrop=${backdrop}
    fullscreen=${fullscreen}
    show-fullscreen-toggle=${showFullscreenToggle}>
    <p>
      A dialog or a modal is a window overlaid on the primary window. It interrupts the user and requires an action. It
      disables the main content until the user explicitly interacts with the modal dialog.
    </p>
    <div
      style="align-items: center;
    display: flex;
    justify-content: flex-end; gap: 8px; height:100%;"
      slot="footerContent">
      <modus-button color="tertiary">Cancel</modus-button>
      <modus-button color="secondary">Check later</modus-button>
      <modus-button color="primary">Approve</modus-button>
    </div>
  </modus-modal>
  ${setFooterScript()}
`;
export const CustomFooter = CustomFooterTemplate.bind({});
CustomFooter.args = {
  ariaLabel: '',
  headerText: 'Modal title',
  zIndex: '1',
  backdrop: 'default',
  fullscreen: false,
  showFullscreenToggle: false,
};

const setScript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#btn-modal').addEventListener('buttonClick', () => {
      document.querySelector('modus-modal').open();
    });

    document.querySelector('modus-modal').addEventListener('closed', () => {
      // Timeout is a workaround for Stencil Web Component not capturing the state updates quick enough when another component is immediately focussed
      setTimeout(() => {
        document.querySelector('#btn-modal').focusButton();
      }, 100);
    });
  `;

  return tag;
};
const setFooterScript = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#btn-modal-footer').addEventListener('buttonClick', () => {
      document.querySelector('#modal-footer').open();
    });

    document.querySelector('#modal-footer').addEventListener('closed', () => {
      // Timeout is a workaround for Stencil Web Component not capturing the state updates quick enough when another component is immediately focussed
      setTimeout(() => {
        document.querySelector('#btn-modal-footer').focusButton();
      }, 100);
    });
  `;

  return tag;
};
