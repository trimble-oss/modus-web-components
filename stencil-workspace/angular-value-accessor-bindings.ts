import { ValueAccessorConfig } from '@stencil/angular-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['modus-autocomplete', 'modus-number-input', 'modus-text-input'],
    event: 'valueChange',
    targetAttr: 'value',
    type: 'text',
  },
  {
    elementSelectors: ['modus-checkbox'],
    event: 'checkboxClick',
    targetAttr: 'checked',
    type: 'boolean',
  },
  {
    elementSelectors: ['modus-select'],
    event: 'valueChange',
    targetAttr: 'value',
    type: 'select',
  },
  {
    elementSelectors: ['modus-switch'],
    event: 'switchClick',
    targetAttr: 'checked',
    type: 'boolean',
  },
];

export default angularValueAccessorBindings;
