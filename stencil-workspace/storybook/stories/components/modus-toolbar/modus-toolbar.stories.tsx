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
    iconSrc: 'add', divider: true,
    },
    {  tooltip: {
        text: 'Edit',
        position: 'bottom',
        },
    iconSrc: 'edit', disabled: true,
    },
    {  tooltip: {
        text: 'Refresh',
        position: 'bottom',
        },
    iconSrc: 'refresh', active: true, divider: true,
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
      iconSrc: 'add',
      },
      {  tooltip: {
          text: 'Edit',
          position: 'bottom',
          },
      iconSrc: 'edit', disabled: true,
      },
      {  tooltip: {
          text: 'Refresh',
          position: 'bottom',
          },
      iconSrc: 'refresh', active: true,
      }
    ],
    layout: 'vertical',
    toolbarStyle: 'split',
};