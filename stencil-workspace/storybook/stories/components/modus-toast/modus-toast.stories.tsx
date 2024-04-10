// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-toast-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Toast',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The toast's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    dismissible: {
      description: 'Whether the toast is dismissible, renders the close icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    role: {
      control: {
        options: ['alert', 'log', 'marquee', 'status', 'timer'],
        type: 'select'
      },
      description: 'Role taken by the toast',
      table: {
        defaultValue: { summary: 'status' },
        type: { summary: '"alert" | "log" | "marquee" | "status" | "timer"' },
      },
    },
    showIcon: {
      name: 'show-icon',
      description: "The toast's message",
      table: {
        defaultValue: { summary: true },
        type: { summary: 'boolean' },
      },
    },
    type: {
      control: {
        options: [
          'danger',
          'dark',
          'default',
          'primary',
          'secondary',
          'success',
          'warning',
        ],
        type: 'select',
      },
      description: 'The type of the toast',
      table: {
        defaultValue: { summary: `'default'` },
        type: {
          summary: `'danger' | 'dark' | 'default' | 'primary' | 'secondary' | 'success' | 'warning'`,
        },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['dismissClick'],
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

const Template = ({ ariaLabel, dismissible, showIcon, role, type }) =>
  html`
    <modus-toast
      aria-label=${ariaLabel}
      dismissible=${dismissible}
      show-icon=${showIcon}
      role=${role}
      type=${type}
      >Toast!</modus-toast
    >
  `;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'default',
};

export const Danger = Template.bind({});
Danger.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'danger',
};

export const Dark = Template.bind({});
Dark.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'dark',
};

export const Primary = Template.bind({});
Primary.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'success',
};

export const Warning = Template.bind({});
Warning.args = {
  ariaLabel: '',
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'warning',
};
