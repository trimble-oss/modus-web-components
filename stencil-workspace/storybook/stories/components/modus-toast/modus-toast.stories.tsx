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
    delay: {
      description: 'Time taken to dismiss the toast',
      table: {
        defaultValue: { summary: 15000 },
        type: { summary: 'number' },
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
        type: 'select',
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
        options: ['danger', 'primary', 'secondary', 'success'],
        type: 'select',
      },
      description: 'The type of the toast',
      table: {
        defaultValue: { summary: `'default'` },
        type: {
          summary: `'danger' | 'primary' | 'secondary' | 'success'`,
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

const Template = ({ ariaLabel, dismissible, showIcon, role, type, delay }) => html`
  <modus-toast
    aria-label=${ariaLabel}
    delay=${delay}
    dismissible=${dismissible}
    show-icon=${showIcon}
    role=${role}
    type=${type}
    >Toast!</modus-toast
  >
`;

export const Primary = Template.bind({});
Primary.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  role: 'status',
  showIcon: true,
  type: 'danger',
};
