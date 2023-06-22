// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-checkbox-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Checkbox',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The checkbox's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    checked: {
      description: 'Whether the checkbox is checked',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Whether the checkbox is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    indeterminate: {
      description: 'Whether the checkbox is indeterminate',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    label: {
      description: "The checkbox's label",
      table: {
        type: { summary: 'string' },
      },
    },
    stopPropagation: {
      name: 'stop-propagation',
      description: "It should stop propagating the event further.",
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['checkboxClick'],
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
  checked,
  disabled,
  indeterminate,
  label,
}) => html`
  <modus-checkbox
    aria-label=${ariaLabel}
    checked=${checked}
    disabled=${disabled}
    indeterminate=${indeterminate}
    label=${label}></modus-checkbox>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  checked: false,
  disabled: false,
  indeterminate: false,
  label: 'Checkbox',
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ariaLabel: '',
  checked: false,
  disabled: false,
  indeterminate: true,
  label: 'Checkbox',
};
