// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-progress-bar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Progress Bar',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The progress bar's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    backgroundColor: {
      name: 'background-color',
      description: "The progress bar's background-color",
      table: {
        type: { summary: 'string' },
      },
    },
    color: {
      description: "The progress bar's color",
      table: {
        type: { summary: 'string' },
      },
    },
    maxValue: {
      name: 'max-value',
      description: "The progress bar's maximum value",
      table: {
        defaultValue: { summary: 100 },
        type: { summary: 'number' },
      },
    },
    mode: {
      name: 'mode',
      options: ['determinate', 'indeterminate'],
      type: 'select',
      description: "The progress bar's mode",
      table: {
        defaultValue: { summary: 'determinate' },
        type: { summary: "'determinate' | 'indeterminate'" },
      },
    },
    minValue: {
      name: 'min-value',
      description: "The progress bar's minimum value",
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    size: {
      options: ['default', 'small', 'compact'],
      type: 'select',
      description: "The progress bar's size",
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: `'default' | 'small' | 'compact'` },
      },
    },
    text: {
      description: "The progress bar's text",
      table: {
        type: { summary: 'string' },
      },
    },
    textColor: {
      name: 'text-color',
      description: "The progress bar's text color",
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: "The progress bar's value",
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1850-15481&m=dev',
    },
  },
};

const Template = ({ ariaLabel, backgroundColor, color, maxValue, minValue, mode, size, text, textColor, value }) => html`
  <modus-progress-bar
    aria-label=${ariaLabel}
    background-color=${backgroundColor}
    color=${color}
    max-value=${maxValue}
    mode=${mode}
    min-value=${minValue}
    size=${size}
    text=${text}
    text-color=${textColor}
    value=${value}>
  </modus-progress-bar>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: 'progress bar',
  backgroundColor: '',
  color: '',
  maxValue: 100,
  mode: 'determinate',
  minValue: 0,
  size: 'default',
  text: 'Some progress!',
  textColor: '',
  value: 50,
};

export const Small = Template.bind({});
Small.args = {
  ariaLabel: 'progress bar',
  backgroundColor: '',
  color: '',
  maxValue: 100,
  mode: 'determinate',
  minValue: 0,
  size: 'small',
  text: '',
  textColor: '',
  value: 50,
};

export const Compact = Template.bind({});
Compact.args = {
  ariaLabel: 'progress bar',
  backgroundColor: '',
  color: '',
  maxValue: 100,
  mode: 'determinate',
  minValue: 0,
  size: 'compact',
  text: '',
  textColor: '',
  value: 50,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ariaLabel: 'progress bar',
  backgroundColor: '',
  color: '',
  maxValue: 100,
  mode: 'indeterminate',
  minValue: 0,
  size: 'default',
  text: 'Indeterminate progress!',
  textColor: '',
  value: 50,
};
