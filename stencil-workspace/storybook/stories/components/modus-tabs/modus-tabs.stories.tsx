// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-tabs-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Tabs',
  parameters: {
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
      }
    ];
  `;

  return tag;
};
