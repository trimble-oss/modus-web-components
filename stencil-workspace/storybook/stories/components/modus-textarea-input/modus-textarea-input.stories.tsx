// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-textarea-input-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Textarea Input',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The text input's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    autoFocusInput: {
      name: 'auto-focus-input',
      description: 'Sets autofocus for the input',
      table: {
        type: { summary: 'boolean' },
      },
    },
    clearable: {
      description: 'Whether the text input is clearable',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Whether the text input is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    errorText: {
      name: 'error-text',
      description: "The text input's error text",
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      name: 'helper-text',
      description: "The text input's helper text",
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: "The text input's label",
      table: {
        type: { summary: 'string' },
      },
    },
    maxLength: {
      name: 'max-length',
      description: "The text input's maximum length",
      table: {
        type: { summary: 'string' },
      },
    },
    minLength: {
      name: 'min-length',
      description: "The text input's minimum length",
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      description: "The text input's placeholder text",
      table: {
        type: { summary: 'string' },
      },
    },
    readOnly: {
      name: 'read-only',
      description: 'Whether the text input is read-only',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    required: {
      description: 'Whether the text input is required',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    rows: {
      description: 'Number of rows on textarea',
      table: {
        defaultValue: { summary: "5" },
        type: { summary: 'number' },
      },
    },
    size: {
      control: {
        options: ['medium', 'large'],
        type: 'select',
      },
      description: 'The size of the text input',
      table: {
        defaultValue: { summary: "'medium'" },
        type: { summary: "'medium' | 'large'" },
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
      description: 'text alignment for the input.',
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
      description: "The text input's valid text",
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: "The text input's value",
      table: {
        type: { summary: 'string' },
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
  autocomplete,
  autoFocusInput,
  clearable,
  disabled,
  errorText,
  helperText,
  inputmode,
  label,
  maxLength,
  minLength,
  placeholder,
  readOnly,
  required,
  rows,
  size,
  textAlign,
  validText,
  value,
}) => html`
<form>
  <modus-textarea-input
    aria-label=${ariaLabel}
    autocomplete=${autocomplete}
    auto-focus-input=${autoFocusInput}
    clearable=${clearable}
    ?disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    inputmode=${inputmode}
    label=${label}
    max-length=${maxLength}
    min-length=${minLength}
    placeholder=${placeholder}
    read-only=${readOnly}
    ?required=${required}
    rows=${rows}
    size=${size}
    text-align=${textAlign}
    valid-text=${validText}
    value=${value}></modus-textarea-input>
</form>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  autocomplete: '',
  autoFocusInput: true,
  clearable: false,
  disabled: false,
  errorText: '',
  helperText: '',
  inputmode: '',
  label: 'Comment',
  maxLength: 2000,
  minLength: 0,
  placeholder: '',
  readOnly: false,
  required: false,
  rows: 5,
  size: 'medium',
  textAlign: 'left',
  validText: '',
  value: '',
};
