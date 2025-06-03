// @ts-ignore: JSX/MDX with Stencil
import { html } from 'lit-html';
import docs from './modus-tabs-storybook-docs.mdx';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/Tabs',
  argTypes: {
    size: {
      name: 'size',
      description: 'Sets the size of the tabs',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    actions: {
      handles: ['tabChange'],
    },
    docs: {
      inlineStories: false,
      page: docs,
    },
    options: {
      isToolshown: true,
    },
    controls: {
      disable: false,
    },
    viewMode: 'docs',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1346-2&m=dev',
    },
  },
  decorators: [withActions],
};

const Template = ({ size }) => html`
  <modus-tabs id="medium-tabs" size=${size}></modus-tabs>
  ${setMediumTabs()}
`;
const SmallTemplate = ({ size }) => html`
  <modus-tabs id="small-tabs" size=${size}></modus-tabs>
  ${setSmallTabs()}
`;
export const Default = Template.bind({});
Default.args = {
  size: 'medium',
};

export const Small = SmallTemplate.bind({});
Small.args = {
  size: 'small',
};

const setMediumTabs = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#medium-tabs').tabs = [
      {
        id: 0,
        label: 'Tab 1'
      },
      {
        active: true,
        id: 1,
        label: 'Tab 2'
      },
      {
        id: 'tab-3',
        label: 'Tab 3',
        leftIcon: 'sun',
      },
      {
        id: 'tab-4',
        label: 'Tab 4',
        rightIcon: 'moon',
      },
      {
        id: 'tab-5',
        label: 'Tab 5',
        leftIcon: 'sun',
        rightIcon: 'moon',
      },
      {
        id: 'tab-6',
        iconOnly: 'settings',
      }
    ];
  `;

  return tag;
};
const setSmallTabs = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('#small-tabs').tabs = [
      {
        id: 0,
        label: 'Tab 1'
      },
      {
        active: true,
        id: 1,
        label: 'Tab 2'
      },
      {
        id: 'tab-3',
        label: 'Tab 3',
        leftIcon: 'sun',
      },
      {
        id: 'tab-4',
        label: 'Tab 4',
        rightIcon: 'moon',
      },
      {
        id: 'tab-5',
        label: 'Tab 5',
        leftIcon: 'sun',
        rightIcon: 'moon',
      },
      {
        id: 'tab-6',
        iconOnly: 'settings',
      }
    ];
  `;

  return tag;
};
