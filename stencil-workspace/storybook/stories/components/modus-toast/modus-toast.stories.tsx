// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-toast-storybook-docs.mdx';
import { html } from 'lit-html';
import { withActions } from '@storybook/addon-actions/decorator';

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
    retainElement: {
      name: 'retain-element',
      description: 'Whether to retain the element in the DOM after it has been dismissed',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    role: {
      options: ['alert', 'log', 'marquee', 'status', 'timer'],
      type: 'select',
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
      options: ['danger', 'primary', 'secondary', 'success'],
      type: 'select',
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
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1346-4&m=dev',
    },
  },
  decorators: [withActions],
};

const Template = ({ ariaLabel, dismissible, showIcon, retainElement, role, type, delay }) => html`
  <modus-toast
    aria-label=${ariaLabel}
    delay=${delay}
    dismissible=${dismissible}
    show-icon=${showIcon}
    retain-element=${retainElement}
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
  retainElement: false,
  role: 'status',
  showIcon: true,
  type: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  retainElement: false,
  role: 'status',
  showIcon: true,
  type: 'secondary',
};

export const Success = Template.bind({});
Success.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  retainElement: false,
  role: 'status',
  showIcon: true,
  type: 'success',
};

export const Danger = Template.bind({});
Danger.args = {
  ariaLabel: '',
  delay: 0,
  dismissible: false,
  retainElement: false,
  role: 'status',
  showIcon: true,
  type: 'danger',
};

export const RetainedToast = Template.bind({});
RetainedToast.args = {
  ariaLabel: '',
  delay: 2000,
  dismissible: false,
  retainElement: true,
  role: 'status',
  showIcon: true,
  type: 'primary',
};
