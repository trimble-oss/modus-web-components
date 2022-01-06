// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-text-input-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Text Input',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: 'The text input\'s aria-label',
      table: {
        type: { summary: 'string' }
      }
    },
    clearable: {
      description: 'Whether the text input is clearable',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    disabled: {
      description: 'Whether the text input is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    errorText: {
      name: 'error-text',
      description: 'The text input\'s error text',
      table: {
        type: { summary: 'string' }
      }
    },
    helperText: {
      name: 'helper-text',
      description: 'The text input\'s helper text',
      table: {
        type: { summary: 'string' }
      }
    },
    includeSearchIcon: {
      name: 'include-search-icon',
      description: 'Whether to include the search icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    label: {
      description: 'The text input\'s label',
      table: {
        type: { summary: 'string' }
      }
    },
    maxLength: {
      name: 'max-length',
      description: 'The text input\'s maximum length',
      table: {
        type: { summary: 'string' }
      },
    },
    minLength: {
      name: 'min-length',
      description: 'The text input\'s minimum length',
      table: {
        type: { summary: 'string' }
      },
    },
    placeholder: {
      description: 'The text input\'s placeholder text',
      table: {
        type: { summary: 'string' }
      }
    },
    readOnly: {
      name: 'read-only',
      description: 'Whether the text input is read-only',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    required: {
      description: 'Whether the text input is required',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    size: {
      control: {
        options: ['medium', 'large'],
        type: 'select',
      },
      description: 'The size of the text input',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: `'medium' | 'large'` },
      }
    },
    validText: {
      name: 'valid-text',
      description: 'The text input\'s valid text',
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      description: 'The text input\'s value',
      table: {
        type: { summary: 'string' }
      }
    }
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
      isToolshown: true
    },
  },
};

const Template = ({ ariaLabel, clearable, disabled, errorText, helperText, includeSearchIcon, label, maxLength, minLength, placeholder, readOnly, required, size, validText, value }) => html`
  <modus-text-input
    aria-label=${ariaLabel}
    clearable=${clearable}
    disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    include-search-icon=${includeSearchIcon}
    label=${label}
    max-length=${maxLength}
    min-length=${minLength}
    placeholder=${placeholder}
    read-only=${readOnly}
    required=${required}
    size=${size}
    valid-text=${validText}
    value=${value}
  ></modus-text-input>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  clearable: false,
  disabled: false,
  errorText: '',
  helperText: '',
  includeSearchIcon: false,
  label: '',
  maxLength: 100,
  minLength: 0,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  validText: '',
  value: 'Hello, text input!'
};


