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
    autocapitalize: {
      name: 'autocapitalize',
      control: {
        options: [
          'none',
          'off',
          'sentences',
          'on',
          'words',
          'characters'
        ],
        type: 'select',
      },
      description: "Capitalization behavior when using a non-traditional keyboard (e.g. microphone, touch screen)",
      table: {
        type: { summary: `'none' | 'off' | 'sentences' | 'on' | 'words' | 'characters'` },
      },
    },
    autocomplete: {
      name: 'autocomplete',
      description: "The text input's autocomplete",
      table: {
        type: { summary: 'string' },
      },
    },
    autocorrect: {
      name: 'autocorrect',
      control: {
        options: [
          'off',
          'on'
        ],
        type: 'select',
      },
      description: "Whether to activate automatic correction while the user is editing this field in Safari",
      table: {
        type: { summary: `boolean | 'off' | 'on'` },
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
    enterkeyhint: {
      control: {
        options: [
          'enter',
          'done',
          'go',
          'next',
          'previous',
          'search',
          'send'
        ],
        type: 'select',
      },
      description: 'Which action label to present for the enter key on virtual keyboards',
      table: {
        type: { summary: `'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'` },
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
    pattern: {
      description: "The text input's pattern attribute",
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
    spellcheck: {
      control: {
        type: 'boolean'
      },
      name: 'spellcheck',
      description: "Whether to enable spell checking.",
      table: {
        type: { summary: 'boolean' },
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
  autocapitalize,
  autocomplete,
  autocorrect,
  autoFocusInput,
  clearable,
  disabled,
  enterkeyhint,
  errorText,
  helperText,
  includePasswordTextToggle,
  includeSearchIcon,
  inputmode,
  label,
  maxLength,
  minLength,
  pattern,
  placeholder,
  readOnly,
  required,
  size,
  spellcheck,
  textAlign,
  type,
  validText,
  value,
}) => html`
<form>
  <modus-text-input
    aria-label=${ariaLabel}
    autocapitalize=${autocapitalize}
    autocomplete=${autocomplete}
    autocorrect=${autocorrect}
    auto-focus-input=${autoFocusInput}
    clearable=${clearable}
    ?disabled=${disabled}
    enterkeyhint=${enterkeyhint}
    error-text=${errorText}
    helper-text=${helperText}
    include-password-text-toggle=${includePasswordTextToggle}
    include-search-icon=${includeSearchIcon}
    inputmode=${inputmode}
    label=${label}
    max-length=${maxLength}
    min-length=${minLength}
    pattern=${pattern}
    placeholder=${placeholder}
    read-only=${readOnly}
    ?required=${required}
    size=${size}
    ?spellcheck=${spellcheck}
    text-align=${textAlign}
    type=${type}
    valid-text=${validText}
    value=${value}></modus-text-input>
</form>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  autocapitalize: undefined,
  autocomplete: '',
  autocorrect: null,
  autoFocusInput: true,
  clearable: false,
  disabled: false,
  enterkeyhint: undefined,
  errorText: '',
  helperText: '',
  includePasswordTextToggle: true,
  includeSearchIcon: false,
  inputmode: '',
  label: 'Username',
  maxLength: 20,
  minLength: 0,
  pattern: '',
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  spellcheck: false,
  textAlign: 'left',
  type: 'text',
  validText: '',
  value: '',
};
