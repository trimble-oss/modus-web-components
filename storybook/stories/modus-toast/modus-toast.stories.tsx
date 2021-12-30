// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-toast-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Toast',
  parameters: {
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true
    },
    previewTabs: {
      canvas: {
        hidden: true
      }
    }
  },
};

const Template = ({ariaLabel, dismissible, showIcon, type}) => html`
  <modus-toast aria-label=${ariaLabel} dismissible=${dismissible} show-icon=${showIcon} type=${type}></modus-toast>
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'default'
};

export const danger = Template.bind({});
danger.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'danger'
};

export const Dark = Template.bind({});
Dark.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'dark'
};

export const Primary = Template.bind({});
Primary.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'secondary'
};

export const Success = Template.bind({});
Success.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'success'
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'tertiary'
};

export const Warning = Template.bind({});
Warning.args = {
  ariaLabel: '',
  dismissible: false,
  showIcon: false,
  type: 'warning'
};



