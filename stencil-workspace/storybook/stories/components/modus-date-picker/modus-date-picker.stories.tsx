import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-date-picker-storybook-docs.mdx';

export default {
  title: 'User Inputs/Date Picker',
  argTypes: {},
  parameters: {
    actions: {
      handles: ['valueChange', 'dateInputBlur', 'calendarIconClicked'],
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

const DefaultTemplate = () => html`
  <modus-date-input label="Single Date"></modus-date-input>
`;
export const Default = DefaultTemplate.bind({});

const DateRangeTemplate = () => html`
  <modus-date-picker label="Select date range">
    <modus-date-input show-calendar-icon="true" type="start" label="Start">
    </modus-date-input>
    <modus-date-input show-calendar-icon="true" type="end" label="End">
    </modus-date-input>
  </modus-date-picker>
`;
export const DateRange = DateRangeTemplate.bind({});
