import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-spinner-storybook-docs.mdx';

export default {
  title: 'Components/Spinner',
  argTypes: {
    color: {
      description: 'The color of the spinner',
      table: {
        type: { summary: 'color' },
      },
    },
    size: {
      description: 'The size of the spinner',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

export const Default = ({ color, size }) =>
  html` <modus-spinner color=${color} size=${size}> </modus-spinner> `;
Default.args = {
  color: '#005F9E',
  size: '2rem',
};
