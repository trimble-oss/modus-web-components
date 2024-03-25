// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-text-input-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Text Input',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The text input's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    autocomplete: {
      name: 'autocomplete',
      description: "The text input's autocomplete",
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
    includePasswordTextToggle: {
      name: 'include-password-text-toggle',
      description: 'Whether the password text toggle icon is included',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    includeSearchIcon: {
      name: 'include-search-icon',
      description: 'Whether to include the search icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    inputmode: {
      control: {
        options: [
          'decimal',
          'email',
          'numeric',
          'search',
          'tel',
          'text',
          'url',
        ],
        type: 'select',
      },
      description: 'The inputmode type',
      table: {
        type: {
          summary:
            "'decimal' | 'email' | 'numeric' | 'search' | 'tel' | 'text' | 'url'",
        },
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
    type: {
      control: {
        options: ['email', 'password', 'search', 'tel', 'text', 'url'],
        type: 'select',
      },
      description: 'The input type',
      table: {
        defaultValue: { summary: "'text'" },
        type: { summary: "'email' | 'password' | 'search' | 'tel' | 'text' | 'url'" },
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
  includePasswordTextToggle,
  includeSearchIcon,
  inputmode,
  label,
  maxLength,
  minLength,
  placeholder,
  readOnly,
  required,
  size,
  textAlign,
  type,
  validText,
  value,
}) => html`
<form>
  <modus-text-input
    aria-label=${ariaLabel}
    autocomplete=${autocomplete}
    auto-focus-input=${autoFocusInput}
    clearable=${clearable}
    ?disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    include-password-text-toggle=${includePasswordTextToggle}
    include-search-icon=${includeSearchIcon}
    inputmode=${inputmode}
    label=${label}
    max-length=${maxLength}
    min-length=${minLength}
    placeholder=${placeholder}
    read-only=${readOnly}
    ?required=${required}
    size=${size}
    text-align=${textAlign}
    type=${type}
    valid-text=${validText}
    value=${value}></modus-text-input>
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
  includePasswordTextToggle: true,
  includeSearchIcon: false,
  inputmode: '',
  label: 'Username',
  maxLength: 20,
  minLength: 0,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  textAlign: 'left',
  type: 'text',
  validText: '',
  value: '',
};
