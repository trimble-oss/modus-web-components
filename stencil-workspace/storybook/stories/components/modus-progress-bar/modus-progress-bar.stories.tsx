// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-progress-bar-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Progress Bar',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: 'The progress bar\'s aria-label',
      table: {
        type: { summary: 'string' }
      }
    },
    backgroundColor: {
      name: 'background-color',
      description: 'The progress bar\'s background-color',
      table: {
        type: { summary: 'string' }
      }
    },
    color: {
      description: 'The progress bar\'s color',
      table: {
        type: { summary: 'string' }
      }
    },
    maxValue: {
      name: 'max-value',
      description: 'The progress bar\'s maximum value',
      table: {
        defaultValue: { summary: 100 },
        type: { summary: 'number' }
      },
    },
    minValue: {
      name: 'min-value',
      description: 'The progress bar\'s minimum value',
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' }
      }
    },
    size: {
      description: 'The progress bar\'s size',
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' }
      }
    },
    text: {
      description: 'The progress bar\'s text',
      table: {
        type: { summary: 'string' }
      }
    },
    textColor: {
      name: 'text-color',
      description: 'The progress bar\'s text color',
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      description: 'The progress bar\'s value',
      table: {
        defaultValue: { summary: 0 },
        type: { summary: 'number' }
      }
    },
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

const Template = ({ ariaLabel, backgroundColor, color, maxValue, minValue, size, text, textColor, value }) => html`
  <modus-progress-bar
    aria-label=${ariaLabel}
    background-color=${backgroundColor}
    color=${color}
    max-value=${maxValue}
    min-value=${minValue}
    size=${size}
    text=${text}
    text-color=${textColor}
    value=${value}>
  </modus-progress-bar>
`;

export const Default = Template.bind({});
Default.args = { ariaLabel: '', backgroundColor: '', color: '', maxValue: 100, minValue: 0, size: 'default', text: 'Some progress!', textColor: '', value: 50 };

export const Compact = Template.bind({});
Compact.args = { ariaLabel: '', backgroundColor: '', color: '', maxValue: 100, minValue: 0, size: 'compact', text: '', textColor: '', value: 50 };


