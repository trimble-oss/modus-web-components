// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-tooltip-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Tooltip',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The tooltip's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: "Hide the tooltip",
      table: {
        type: { summary: 'boolean' },
      },
    },
    position: {
      control: {
        options: ['bottom', 'left', 'right', 'top', 'auto'],
        type: 'select',
      },
      description: "The tooltip's position relative to the item it's wrapping",
      table: {
        defaultValue: { summary: `'top'` },
        type: { summary: `'bottom' | 'left' | 'right' | 'top' | 'auto` },
      },
    },
    text: {
      description: "The tooltip's text",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    layout: 'centered'
  },
};

export const Default = ({
  ariaLabel,
  position,
  text,
  disabled
}) => html`
  <modus-tooltip
    aria-label=${ariaLabel}
    position=${position}
    text=${text}
    disabled=${disabled}>
    <modus-button>Button</modus-button>
  </modus-tooltip>
`;
Default.args = {
  ariaLabel: '',
  position: 'bottom',
  text: 'Tooltip text...',
  disabled: false
};
