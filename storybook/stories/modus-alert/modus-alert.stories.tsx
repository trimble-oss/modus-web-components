import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-alert-storybook-docs.mdx';

export default {
  title: 'Components/Alert',
  argTypes: {
    dismissible: {
      description: 'Whether the alert is dismissible, renders the close icon',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      }
    },
    message: {
      description: 'The alert message',
      table: {
        type: { summary: 'string' }
      },
      type: { required: true }
    },
    type: {
      control: {
        options: ['error', 'info', 'info-gray', 'info-gray-dark', 'success', 'warning'],
        type: 'select',
      },
      description: 'The type of the alert',
      table: {
        defaultValue: { summary: `'info'` },
        type: { summary: `'error' | 'info' | 'info-gray' | 'info-gray-dark' | 'success' | 'warning'` },
      }
    }
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
      isToolshown: true
    },
  },
};

const Template = ({ dismissible, message, type }) => html`
  <modus-alert
    dismissible=${dismissible}
    message=${message}
    type=${type}>
  </modus-alert>
`;

// TODO - Figure out how to get rid of the optional parameters in the template (dismissible and type).
// If not passed, they should result to null or their default values.
export const Default = Template.bind({});
Default.args = { dismissible: false, message: 'Info alert (default)', type: 'info' };

export const Dismissible = Template.bind({});
Dismissible.args = { dismissible: true, message: 'Dismissible alert', type: 'info' };

export const Error = Template.bind({});
Error.args = { dismissible: false, message: 'Error alert', type: 'error' };

export const InfoGray = Template.bind({});
InfoGray.args = { dismissible: false, message: 'Info gray alert', type: 'info-gray' };

export const InfoGrayDark = Template.bind({});
InfoGrayDark.args = { dismissible: false, message: 'Info gray dark alert', type: 'info-gray-dark' };

export const Success = Template.bind({});
Success.args = { dismissible: false, message: 'Success alert', type: 'success' };

export const Warning = Template.bind({});
Warning.args = { dismissible: false, message: 'Warning alert', type: 'warning' };


