import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-toolbar-storybook-docs.mdx';

export default {  
  title: 'Components/Toolbar', 
  argTypes: {
    buttons: {
      name: 'buttons',
      description: 'Buttons added to the toolbar',
      table: {
        type: { summary: 'ModusToolbarButton[]' },
      },
      type: { required: true },
    },
    layout: {
      name: 'layout',      
      control: {
        options: ['horizontal', 'vertical'],
        type: 'select',
      },
      description: "The toolbar's layout",
      table: {
        defaultValue: { summary: `'horizontal'` },
        type: { summary: `'horizontal', 'vertical'` },
      },
    },
    toolbarStyle: {
      name: 'toolbar-style',   
      control: {
        options: ['combined', 'split'],
        type: 'select',
      },
      description: "The toolbar's style",
      table: {
        defaultValue: { summary: `'combined'` },
        type: { summary: `'combined', 'split'` },
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

const Template = ({buttons, layout, toolbarStyle}) => html`<modus-toolbar buttons=${buttons} layout=${layout} toolbarStyle=${toolbarStyle}></modus-toolbar>`;

const addIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cg%3E%3Cpath d='M19,13H13v6H11V13H5V11h6V5h2v6h6Z' fill='#171c1e' /%3E%3C/g%3E%3C/svg%3E";

const addEdit = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#171c1e' viewBox='0 0 24 24'%3E%3Cg%3E%3Cpath d='M3,17.25V21H6.75L17.81,9.94,14.06,6.19ZM20.71,7.04a1,1,0,0,0,0-1.41L18.37,3.29a1,1,0,0,0-1.41,0L15.13,5.12l3.75,3.75,1.83-1.83Z' /%3E%3C/g%3E%3C/svg%3E";

const addRefresh = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='#171c1e' viewBox='0 0 24 24'%3E%3Cg%3E%3Cpath d='M18.36 5.64a8.976 8.976 0 0 0-7.16-2.61c-4.2.36-7.66 3.73-8.13 7.92C2.46 16.39 6.68 21 12 21c3.59 0 6.67-2.1 8.11-5.13.36-.75-.18-1.62-1.01-1.62-.42 0-.82.22-.99.6-1.07 2.3-3.4 3.9-6.11 3.9-3.62 0-6.7-3.02-6.75-6.64S8.24 5.25 12 5.25c1.87 0 3.53.78 4.75 2l-1.92 1.92c-.63.63-.18 1.71.71 1.71H20c.55 0 1-.45 1-1V5.42c0-.89-1.08-1.34-1.71-.71l-.94.94Z";

export const Default = Template.bind({});
Default.args = {
  buttons: [
    { tooltip: {
        text: 'Text button',
        position: 'bottom',
        },
    textButton: 'Text button',
    },
    { tooltip: {
        text: 'Add',
        position: 'bottom',
        },
    iconSrc: `${addIcon}`, divader: true,
    },
    {  tooltip: {
        text: 'Edit',
        position: 'bottom',
        },
    iconSrc: `${addEdit}`, disabled: true,
    },
    {  tooltip: {
        text: 'Refresh',
        position: 'bottom',
        },
    iconSrc: `${addRefresh}`, active: true, divader: true,
    }
  ],
  layout: 'horizontal',
  toolbarStyle: 'combined',
};

export const VerticalSplitToolbar = Template.bind({});
Default.args = {
    buttons: [
      { tooltip: {
          text: 'Add',
          position: 'bottom',
          },
      iconSrc: `${addIcon}`,
      },
      {  tooltip: {
          text: 'Edit',
          position: 'bottom',
          },
      iconSrc: `${addEdit}`, disabled: true,
      },
      {  tooltip: {
          text: 'Refresh',
          position: 'bottom',
          },
      iconSrc: `${addRefresh}`, active: true,
      }
    ],
    layout: 'vertical',
    toolbarStyle: 'split',
};