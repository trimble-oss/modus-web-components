import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-date-picker-storybook-docs.mdx';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'User Inputs/Date Picker',
  argTypes: {
    allowedCharsRegex: {
      name: 'allowed-chars-regex',
      description: 'Regular expression to allow characters while typing the input.',
      table: {
        type: { summary: 'string' },
      },
    },
    altFormats: {
      name: 'alt-formats',
      description: 'Alternative formats string for the date input split by | separator.',
      table: {
        type: { summary: 'string' },
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
    position: {
      name: 'position',
      options: [
        'auto',
        'auto-start',
        'auto-end',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
        'top',
        'left',
        'bottom',
        'right',
      ],
      type: 'select',
      description: 'The placement of the calendar popup',
      table: {
        defaultValue: { summary: 'bottom-start' },
        type: {
          summary:
            "'auto' | 'auto-start' | 'auto-end' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'right-start' | 'right-end' | 'left-start' | 'left-end' | 'top' | 'left' | 'bottom' | 'right'",
        },
      },
    },
    disabled: {
      description: 'Whether the date input is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disableValidation: {
      name: 'disable-validation',
      description: 'Disables default validation for the date input',
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
    format: {
      name: 'format',
      description: "Format string for the date input. Default 'mm/dd/yyyy'",
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
    max: {
      description: "The maximum date allowed. The input string should be ISO8601 'yyyy-mm-dd'.",
      table: {
        type: { summary: 'string' },
      },
    },
    min: {
      description: "The minimum date allowed. The input string should be ISO8601 'yyyy-mm-dd'.",
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
    showCalendarIcon: {
      name: 'show-calendar-icon',
      description: 'Show a calendar icon.',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    size: {
      options: ['medium', 'large'],
      type: 'select',
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
      description: "A string representing the date entered in the input. The input string should be ISO8601 'yyyy-mm-dd'.",
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['valueChange', 'dateInputBlur', 'calendarIconClicked'],
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

const defaultArgs = {
  ariaLabel: '',
  allowedCharsRegex: '[\\d\\/]',
  altFormats: '',
  autoFocusInput: true,
  disableValidation: false,
  disabled: false,
  errorText: '',
  format: 'mm/dd/yyyy',
  helperText: 'mm/dd/yyyy',
  label: 'Date',
  min: '',
  max: '',
  placeholder: '',
  readOnly: false,
  required: false,
  showCalendarIcon: false,
  size: 'medium',
  validText: '',
  value: '2022-12-22',
};

const DefaultTemplate = ({
  ariaLabel,
  allowedCharsRegex,
  altFormats,
  autoFocusInput,
  disableValidation,
  disabled,
  errorText,
  format,
  helperText,
  label,
  min,
  max,
  placeholder,
  readOnly,
  required,
  showCalendarIcon,
  size,
  validText,
  value,
}) => html`
  <modus-date-input
    allowed-chars-regex=${allowedCharsRegex}
    alt-formats=${altFormats}
    aria-label=${ariaLabel}
    auto-focus-input=${autoFocusInput}
    disable-validation=${disableValidation}
    ?disabled=${disabled}
    error-text=${errorText}
    format=${format}
    helper-text=${helperText}
    label=${label}
    min=${min}
    max=${max}
    placeholder=${placeholder}
    read-only=${readOnly}
    ?required=${required}
    size=${size}
    show-calendar-icon=${showCalendarIcon}
    valid-text=${validText}
    value=${value}></modus-date-input>
`;

export const Default = DefaultTemplate.bind({});
Default.args = {
  ...defaultArgs,
  format: 'mmm dd, yyyy',
  allowedCharsRegex: '.',
  helperText: 'mmm dd, yyyy',
  ...{ label: 'Single Date' },
};

const DateRangeTemplate = ({
  ariaLabel,
  allowedCharsRegex,
  altFormats,
  autoFocusInput,
  disableValidation,
  disabled,
  errorText,
  format,
  min,
  position,
  max,
  helperText,
  placeholder,
  readOnly,
  required,
  showCalendarIcon,
  size,
  validText,
  value,
}) => html`
  <modus-date-picker label="Select date range" position=${position}>
    <modus-date-input
      allowed-chars-regex=${allowedCharsRegex}
      alt-formats=${altFormats}
      aria-label=${ariaLabel}
      auto-focus-input=${autoFocusInput}
      disable-validation=${disableValidation}
      ?disabled=${disabled}
      error-text=${errorText}
      format=${format}
      min=${min}
      max=${max}
      helper-text=${helperText}
      type="start"
      label="Start"
      placeholder=${placeholder}
      read-only=${readOnly}
      ?required=${required}
      size=${size}
      show-calendar-icon=${showCalendarIcon}
      valid-text=${validText}
      value=${value}></modus-date-input>

    <modus-date-input
      allowed-chars-regex=${allowedCharsRegex}
      alt-formats=${altFormats}
      aria-label=${ariaLabel}
      auto-focus-input=${autoFocusInput}
      disable-validation=${disableValidation}
      ?disabled=${disabled}
      error-text=${errorText}
      format=${format}
      min=${min}
      max=${max}
      helper-text=${helperText}
      type="end"
      label="End"
      placeholder=${placeholder}
      read-only=${readOnly}
      ?required=${required}
      size=${size}
      show-calendar-icon=${showCalendarIcon}
      valid-text=${validText}
      value=${value}></modus-date-input>
  </modus-date-picker>
`;
export const DateRange = DateRangeTemplate.bind({});
DateRange.args = {
  ...defaultArgs,
  ...{
    showCalendarIcon: true,
    format: 'dd-mm-yyyy',
    helperText: 'dd-mm-yyyy',
    allowedCharsRegex: '[\\d-]',
  },
};

const DefaultWithPickerTemplate = ({
  ariaLabel,
  allowedCharsRegex,
  altFormats,
  autoFocusInput,
  position,
  disableValidation,
  disabled,
  errorText,
  format,
  helperText,
  label,
  min,
  max,
  placeholder,
  readOnly,
  required,
  showCalendarIcon,
  size,
  validText,
  value,
  isDateEnabled,
}) => {
  setTimeout(() => {
    isDateEnabledLoading = false;
  }, 4000);
  return html`
    <modus-date-picker .isDateEnabled=${isDateEnabled} position=${position}>
      <modus-date-input
        allowed-chars-regex=${allowedCharsRegex}
        aria-label=${ariaLabel}
        alt-formats=${altFormats}
        auto-focus-input=${autoFocusInput}
        disable-validation=${disableValidation}
        ?disabled=${disabled}
        error-text=${errorText}
        format=${format}
        helper-text=${helperText}
        label=${label}
        min=${min}
        max=${max}
        placeholder=${placeholder}
        read-only=${readOnly}
        ?required=${required}
        size=${size}
        show-calendar-icon=${showCalendarIcon}
        valid-text=${validText}
        value=${value}></modus-date-input>
    </modus-date-picker>
  `;
};

export const DefaultWithPicker = DefaultWithPickerTemplate.bind({});
// Uncomment and pass in as isDateEnabled below to test isDateEnabled functionality
// const isWeekend = (isoString: string) => {
//   const date = new Date(isoString);
//   const isWeekend  = date.getDay() === 0 || date.getDay() === 6;
//   return isWeekend;
// }

DefaultWithPicker.args = {
  ...defaultArgs,
  position: 'bottom-start',
  showCalendarIcon: true,
  min: '2022-12-02',
  max: '2022-12-30',
  format: 'mmm dd, yyyy',
  allowedCharsRegex: '.',
  helperText: 'mmm dd, yyyy',
  label: 'Single Date',
};
