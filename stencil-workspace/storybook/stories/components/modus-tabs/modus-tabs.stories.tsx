// @ts-ignore: JSX/MDX with Stencil
import { html } from 'lit-html';
import docs from './modus-tabs-storybook-docs.mdx';

export default {
  title: 'Components/Tabs',
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
      disabled: true,
    },
    viewMode: 'docs',
  },
};

const Template = ({ size }) => html`
  <modus-tabs id="my-tabs" size=${size}></modus-tabs>
  ${setTabs()}
`;
export const Default = Template.bind({});
Default.args = {
  size: 'medium'
}

export const Small = Template.bind({});
Small.args = {
  size: 'small'
}

const setTabs = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-tabs').tabs = [
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
