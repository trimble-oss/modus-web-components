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
    autoFormat: {
      name: 'auto-format',
      description: 'Formats the text while typing in the input field',
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
    min: {
      name: 'min',
      description: 'Minimum time (in 24 hour format)',
      table: {
        type: { summary: 'string' },
      },
    },
    max: {
      name: 'max',
      description: 'Maximum time (in 24 hour format)',
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
  autoFormat,
  ariaLabel,
  autoFocusInput,
  disabled,
  disableValidation,
  errorText,
  helperText,
  label,
  min,
  max,
  placeholder,
  readOnly,
  required,
  size,
  validText,
  value,
}) => html`
  <modus-time-picker
    ampm=${ampm}
    auto-format=${autoFormat}
    aria-label=${ariaLabel}
    auto-focus-input=${autoFocusInput}
    disable-validation=${disableValidation}
    disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    label=${label}
    min=${min}
    max=${max}
    placeholder=${placeholder}
    read-only=${readOnly}
    required=${required}
    size=${size}
    valid-text=${validText}
    value=${value}></modus-time-picker>
`;

const defaultArgs = {
  ampm: false,
  autoFormat: false,
  ariaLabel: 'Time Input',
  autoFocusInput: true,
  disableValidation: false,
  disabled: false,
  errorText: '',
  helperText: 'hh:mm',
  label: 'Time',
  min: null,
  max: null,
  placeholder: '',
  readOnly: false,
  required: false,
  size: 'medium',
  validText: '',
  value: '23:39',
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const TimeFormat = Template.bind({});
TimeFormat.args = {
  ...defaultArgs,
  ...{ ampm: 'true', helperText: 'hh:mm AM/PM', placeholder: '12:00 AM' },
};

export const AutoFormat = Template.bind({});
AutoFormat.args = {
  ...defaultArgs,
  ...{
    ampm: true,
    value: '',
    helperText: 'hh:mm AM/PM',
    autoFormat: true,
    placeholder: '12:00 AM',
  },
};

export const MinAndMax = Template.bind({});
MinAndMax.args = {
  ...defaultArgs,
  ...{
    min: '14:00',
    max: '20:00',
    helperText: 'hh:mm (min=14:00 to max=20:00)',
    value: '14:00',
    placeholder: '14:00',
    autoFormat: true,
  },
};

const WithTimeZoneTemplate = ({
  ampm,
  autoFormat,
  ariaLabel,
  autoFocusInput,
  disabled,
  disableValidation,
  errorText,
  helperText,
  label,
  min,
  max,
  placeholder,
  readOnly,
  required,
  size,
  validText,
  value,
}) => html`
  <modus-time-picker
    ampm=${ampm}
    auto-format=${autoFormat}
    aria-label=${ariaLabel}
    auto-focus-input=${autoFocusInput}
    disable-validation=${disableValidation}
    disabled=${disabled}
    error-text=${errorText}
    helper-text=${helperText}
    label=${label}
    min=${min}
    max=${max}
    placeholder=${placeholder}
    read-only=${readOnly}
    required=${required}
    size=${size}
    valid-text=${validText}
    value=${value}>
    <div style="width: 300px;padding-left: 0.5rem;" slot="timeZone">
      <modus-select
        id="timezone"
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
  const modusSelect = document.querySelector('#timezone');
  modusSelect.options = [
    { display: 'Alpha Time Zone' },
    { display: 'Australian Central Daylight Time' },
    { display: 'Atlantic Daylight Time' },
  ];
  `;

  return tag;
};
export const WithTimeZone = WithTimeZoneTemplate.bind({});
WithTimeZone.args = { ...defaultArgs, autoFormat: true };
