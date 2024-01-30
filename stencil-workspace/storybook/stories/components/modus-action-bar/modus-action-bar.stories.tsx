import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-alert-storybook-docs.mdx';

export default {
  title: 'Components/ActionBar',
  argTypes: {
    actions: {
      name: 'actions',
      description: 'define the options of the action bar.',
      table: {
        type: { summary: 'ModusActionBarOptions[]' },
      },
      type: { required: false },
    },
    visibleItemCount:{
      name: 'visibleItemCount',
      description: '',
      table: {
        defaultValue: { summary: '1' },
        type: 'string'
      }
    },
    size: {
      control: {
        options: ['small','medium', 'large'],
        type: 'select',
      },
      description: 'The size of the autocomplete',
      table: {
        defaultValue: { summary: "'medium'" },
        type: { summary: "'small' | 'medium' | 'large'" },
      },
    },
  
  },
  parameters: {
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({ actions, visibleItemCount, size }) =>
  html`
  <modus-action-bar visible-item-count=${visibleItemCount} size=${size} actions=${actions}></modus-action-bar>
  `;

export const Default = Template.bind({});
Default.args = {
  visibleItemCount: 3,
  actions: [
    { id: 'export', icon: 'export', label: 'Export' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'edit', icon: 'pencil', label: 'Edit' },
    { id: 'delete', icon: 'history', label: 'Delete' },
  ],
  size: 'large',
};





