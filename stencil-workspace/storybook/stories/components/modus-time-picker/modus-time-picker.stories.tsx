// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-time-picker-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Time Picker',
  argTypes: {
    ampm: {
      name: 'ampm',
      description: 'Sets 12/24 hour format for the input string.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    ariaLabel: {
      name: 'aria-label',
      description: "The input's aria-label",
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
    disabled: {
      description: 'Whether the text input is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disableValidation: {
      name: 'disable-validation',
      description: 'Disables default validation for the time input',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    errorText: {
      name: 'error-text',
      description: "The input's error text",
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      name: 'helper-text',
      description: "The input's helper text",
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: "The input's label",
      table: {
        type: { summary: 'string' },
      },
    },
    maxLength: {
      name: 'max-length',
      description: "The input's maximum length",
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      description: "The input's placeholder text",
      table: {
        type: { summary: 'string' },
      },
    },
    readOnly: {
      name: 'read-only',
      description: 'Whether the input is read-only',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    required: {
      description: 'Whether the input is required',
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
      description: 'The size of the input',
      table: {
        defaultValue: { summary: "'medium'" },
        type: { summary: "'medium' | 'large'" },
      },
    },
    validText: {
      name: 'valid-text',
      description: "The input's valid text",
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: "The input's value",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['valueChange', 'timeInputBlur'],
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
      enableShortcuts: false,
    },
  },
};

const Template = ({
  ampm,
  ariaLabel,
  autoFocusInput,
  disabled,
  disableValidation,
  errorText,
  helperText,
  label,
  maxLength,
  placeholder,
  readOnly,
  required,
  size,
  validText,
  value,
}) => html`
  <modus-time-picker
    ampm=${ampm}
    aria-label=${ariaLabel}
    auto-focus-input=${autoFocusInput}
    disable-validation=${disableValidation}
    disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    label=${label}
    max-length=${maxLength}
    placeholder=${placeholder}
    read-only=${readOnly}
    required=${required}
    size=${size}
    valid-text=${validText}
    value=${value}></modus-time-picker>
`;

export const Default = Template.bind({});
Default.args = {
  ampm: false,
  ariaLabel: '',
  autoFocusInput: true,
  disableValidation: false,
  disabled: false,
  errorText: '',
  helperText: 'hh:mm',
  label: 'Time',
  maxLength: 8,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  type: 'text',
  validText: '',
  value: '23:39',
};

const WithTimeZoneTemplate = ({
  ampm,
  ariaLabel,
  autoFocusInput,
  disabled,
  disableValidation,
  errorText,
  helperText,
  label,
  maxLength,
  placeholder,
  readOnly,
  required,
  size,
  validText,
  value,
}) => html`
  <modus-time-picker
    ampm=${ampm}
    aria-label=${ariaLabel}
    auto-focus-input=${autoFocusInput}
    disable-validation=${disableValidation}
    disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    label=${label}
    max-length=${maxLength}
    placeholder=${placeholder}
    read-only=${readOnly}
    required=${required}
    size=${size}
    valid-text=${validText}
    value=${value}>
    <div style="width: 300px;padding-left: 0.5rem;" slot="timeZone">
      <modus-select
        id="select-demo-1"
        label="Time Zone"
        aria-label="Time Zone"
        options-display-prop="display"></modus-select>
    </div>
  </modus-time-picker>
  ${setSelects()}
`;

const setSelects = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
  const modusSelect = document.querySelector('modus-select');
  modusSelect.options = [
    { display: 'Alpha Time Zone' },
    { display: 'Australian Central Daylight Time' },
    { display: 'Atlantic Daylight Time' },
  ];
  `;

  return tag;
};
export const WithTimeZone = WithTimeZoneTemplate.bind({});
WithTimeZone.args = {
  ampm: false,
  ariaLabel: '',
  autoFocusInput: true,
  disableValidation: false,
  disabled: false,
  errorText: '',
  helperText: 'hh:mm',
  label: 'Time',
  maxLength: 8,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  type: 'text',
  validText: '',
  value: '23:39 PM',
};
