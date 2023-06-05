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
    position: {
      control: {
        options: ['bottom', 'left', 'right', 'top'],
        type: 'select',
      },
      description: "The tooltip's position relative to the item it's wrapping",
      table: {
        defaultValue: { summary: `'top'` },
        type: { summary: `'bottom' | 'left' | 'right' | 'top'` },
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
  text
}) => html`
  <modus-tooltip
    aria-label=${ariaLabel}
    position=${position}
    text=${text}>
    <modus-button>Button</modus-button>
  </modus-tooltip>
`;
Default.args = {
  ariaLabel: '',
  position: 'bottom',
  text: 'Tooltip text...'
};
