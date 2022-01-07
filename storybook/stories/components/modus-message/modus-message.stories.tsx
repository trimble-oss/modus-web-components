// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-message-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Message',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: 'The message\'s aria-label',
      table: {
        type: { summary: 'string' }
      }
    },
    type: {
      control: {
        options: ['info', 'question'],
        type: 'select',
      },
      description: 'The type of the message',
      table: {
        defaultValue: { summary: `'info'` },
        type: { summary: `'info' | 'question'` },
      }
    }
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true
    },
  },
};

export const Default = ({ ariaLabel, type }) => html`
  <modus-message
    aria-label=${ariaLabel}
    type=${type}>
    Info (Default)
  </modus-message>
`;
Default.args = { ariaLabel: '', type: 'info' };

export const Question = ({ ariaLabel, type }) => html`
  <modus-message
    aria-label=${ariaLabel}
    type=${type}>
    Question
  </modus-message>
`;
Question.args = { ariaLabel: '', type: 'question' };


