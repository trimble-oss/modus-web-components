// modus-number-input.stories.tsx

// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-number-input-storybook-docs.mdx';
import { html } from 'lit-html';
import { withActions } from '@storybook/addon-actions/decorator';

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
    currency: {
      name: 'currency',
      description:
        'The currency symbol.\nNote: Follow the currency codes from [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) for the `currencySymbol` property.\n',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    locale: {
      name: 'locale',
      description:
        'The locale of the selected currency. Note: Follow the locale codes from [BCP 47](https://tools.ietf.org/html/bcp47) for the `locale` property.',
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
      options: ['medium', 'large'],
      type: 'select',
      description: 'The size of the number input',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'large' | 'medium'` },
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
      options: ['left', 'right'],
      type: 'select',
      description: 'text alignment for the number input.',
      table: {
        defaultValue: { summary: "'left'" },
        type: {
          summary: "'left' | 'right'",
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1346-5&m=dev',
    },
  },
  decorators: [withActions],
};

const Template = ({
  ariaLabel,
  currency,
  locale,
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
    currency=${currency}
    locale=${locale}
    ?disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    label=${label}
    max-value=${maxValue}
    min-value=${minValue}
    placeholder=${placeholder}
    ?read-only=${readOnly}
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
  currency: '',
  locale: '',
  disabled: false,
  errorText: '',
  helperText: '',
  label: 'Number Input',
  maxValue: 100000,
  minValue: 0,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  step: 1,
  textAlign: 'left',
  validText: '',
  value: 100000,
};
