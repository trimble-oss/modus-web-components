// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-slider-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Slider',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The slider's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Whether the slider is disabled',
      table: {
        type: { summary: 'boolean' },
      },
    },
    label: {
      description: "The slider's label",
      table: {
        type: { summary: 'string' },
      },
    },
    maxValue: {
      name: 'max-value',
      description: "The slider's maximum value",
      table: {
        defaultValue: { summary: 100 },
        type: { summary: 'number' },
      },
    },
    minValue: {
      name: 'min-value',
      description: "The slider's minimum value",
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
    value: {
      description: "The slider's value",
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['valueChange', 'valueInput'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({
  ariaLabel,
  disabled,
  label,
  maxValue,
  minValue,
  value,
}) => html`
  <modus-slider
    aria-label=${ariaLabel}
    ?disabled=${disabled}
    label=${label}
    max-value=${maxValue}
    min-value=${minValue}
    value=${value}>
  </modus-slider>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  disabled: false,
  label: 'Label',
  maxValue: 100,
  minValue: 0,
  value: 50,
};
