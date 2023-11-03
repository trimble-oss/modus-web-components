import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-chip-storybook-docs.mdx';

export default {
  title: 'Components/Chip',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The chip's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    chipStyle: {
      name: 'chip-style',
      control: {
        options: ['solid', 'outline'],
        type: 'select',
      },
      description: 'The style of the chip',
      table: {
        defaultValue: { summary: `'solid'` },
        type: { summary: `'solid' | 'outline'` },
      },
    },
    disabled: {
      description: 'Whether the chip is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    hasError: {
      name: 'has-error',
      description: 'Whether the chip has an error',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    imageUrl: {
      name: 'image-url',
      description: "The chip's image URL",
      table: {
        type: { summary: 'string' },
      },
    },
    showCheckmark: {
      name: 'show-checkmark',
      description: 'Whether to show the checkmark',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    showClose: {
      name: 'show-close',
      description: 'Whether to show the close icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: {
        options: ['medium', 'small'],
        type: 'select',
      },
      description: 'The size of the chip',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `medium' | 'small'` },
      },
    },
    value: {
      description: "The chip's value",
      table: {
        type: { summary: 'string' },
      },
    },
    maxWidth: {
      description: "The chip's maximum width",
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100px' },
      },
    }
  },
  parameters: {
    controls: { expanded: true },
    actions: {
      handles: ['chipClick', 'closeClick'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

export const Default = ({
  ariaLabel,
  chipStyle,
  disabled,
  hasError,
  imageUrl,
  showCheckmark,
  showClose,
  size,
  value,
  maxWidth,
}) => html`
  <modus-chip
    aria-label=${ariaLabel}
    chip-style=${chipStyle}
    disabled=${disabled}
    has-error=${hasError}
    image-url=${imageUrl}
    show-checkmark=${showCheckmark}
    show-close=${showClose}
    size=${size}
    max-width=${maxWidth}
    value=${value}>
  </modus-chip>
`;
Default.args = {
  ariaLabel: '',
  chipStyle: 'solid',
  disabled: false,
  hasError: false,
  imageUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
  showCheckmark: false,
  showClose: false,
  size: 'medium',
  value: 'Bryan',
  maxWidth:'100px'
};

export const Outline = ({
  ariaLabel,
  chipStyle,
  disabled,
  hasError,
  imageUrl,
  showCheckmark,
  showClose,
  size,
  value,
  maxWidth,
}) => html`
  <modus-chip
    aria-label=${ariaLabel}
    chip-style=${chipStyle}
    disabled=${disabled}
    has-error=${hasError}
    image-url=${imageUrl}
    show-checkmark=${showCheckmark}
    show-close=${showClose}
    size=${size}
    value=${value}
    max-width=${maxWidth}>
  </modus-chip>
`;
Outline.args = {
  ariaLabel: '',
  chipStyle: 'outline',
  disabled: false,
  hasError: false,
  imageUrl: 'https://randomuser.me/api/portraits/lego/1.jpg',
  showCheckmark: false,
  showClose: false,
  size: 'medium',
  value: 'Bryan',
  maxWidth:'100px'
};
