// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-number-input-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Number Input',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The number input's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Whether the number input is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    errorText: {
      name: 'error-text',
      description: "The number input's error text",
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      name: 'helper-text',
      description: "The number input's helper text",
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: "The number input's label",
      table: {
        type: { summary: 'string' },
      },
    },
    maxValue: {
      name: 'max-value',
      description: "The number input's maximum value",
      table: {
        type: { summary: 'number' },
      },
    },
    minValue: {
      name: 'min-value',
      description: "The number input's minimum value",
      table: {
        type: { summary: 'number' },
      },
    },
    placeholder: {
      description: "The number input's placeholder text",
      table: {
        type: { summary: 'string' },
      },
    },
    readOnly: {
      name: 'read-only',
      description: 'Whether the number input is read-only',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    required: {
      description: 'Whether the number input is required',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: {
        options: ['medium', 'large'],
        type: 'select',
      },
      description: 'The size of the number input',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'medium' | 'large'` },
      },
    },
    step: {
      description: "The number input's step",
      table: {
        type: { summary: 'number' },
      },
    },
    textAlign: {
      name: 'text-align',
      control: {
        options: [
          'left',
          'right'
        ],
        type: 'select',
      },
      description: 'text alignment for the number input.',
      table: {
        defaultValue: { summary: "'left'" },
        type: {
          summary:
            "'left' | 'right'",
        },
      },
    },
    validText: {
      name: 'valid-text',
      description: "The number input's valid text",
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: "The number input's value",
      table: {
        type: { summary: 'number' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['valueChange'],
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
  errorText,
  helperText,
  label,
  maxValue,
  minValue,
  placeholder,
  readOnly,
  required,
  size,
  step,
  textAlign,
  validText,
  value,
}) => html`
  <modus-number-input
    aria-label=${ariaLabel}
    ?disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    label=${label}
    max-value=${maxValue}
    min-value=${minValue}
    placeholder=${placeholder}
    read-only=${readOnly}
    ?required=${required}
    size=${size}
    step=${step}
    text-align=${textAlign}
    valid-text=${validText}
    value=${value}></modus-number-input>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  disabled: false,
  errorText: '',
  helperText: '',
  label: 'Number Input',
  maxValue: 100,
  minValue: 0,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  step: 1,
  textAlign: 'left',
  validText: '',
  value: 100,
};
