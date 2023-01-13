import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-data-picker-storybook-docs.mdx';

export default {
  title: 'User Inputs/Data Picker',
  argTypes: {},
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      disabled: true,
    },
    options: {
      isToolshown: true,
    },
  },
};

const DefaultTemplate = () => html`
  <modus-date-input
    label="Single Date"
    placeholder="dd/mm/yyyy"></modus-date-input>
`;
export const Default = DefaultTemplate.bind({});

const DateRangeTemplate = () => html`
  <modus-date-picker label="Select date range">
    <modus-date-input
      show-calendar-icon="true"
      placeholder="dd/mm/yyyy"
      type="start"
      label="Start">
    </modus-date-input>
    <modus-date-input
      show-calendar-icon="true"
      placeholder="dd/mm/yyyy"
      type="end"
      label="End">
    </modus-date-input>
  </modus-date-picker>
`;
export const DateRange = DateRangeTemplate.bind({});
