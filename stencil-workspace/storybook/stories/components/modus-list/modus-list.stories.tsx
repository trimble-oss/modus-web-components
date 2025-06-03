// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-list-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/List',
  argTypes: {
    subText: {
      description: 'set the sub-text for the list-item',
      table: {
        type: { summary: 'string' },
      },
    },
    wrapSubText: {
      description: 'whether to wrap the sub text',
      table: {
        type: { summary: 'boolean' },
      },
    },
    leftIcon: {
      description: 'set the left icon for the list-item',
      table: {
        type: { summary: 'string' },
      },
    },
    iconColor: {
      description: 'set the color of the left icon',
      table: {
        defaultValue: { summary: `'#6A6976'` },
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      expanded: true,
    },
    options: {
      isToolshown: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1856-13819&m=dev',
    },
  },
};

const Template = ({ subText, wrapSubText, leftIcon, iconColor }) => html`
  <modus-list>
    <modus-list-item wrap-sub-text=${wrapSubText} sub-text=${subText} left-icon=${leftIcon} icon-color=${iconColor}
      >Default</modus-list-item
    >
    <modus-list-item selected>Selected</modus-list-item>
    <modus-list-item disabled>Disabled</modus-list-item>
  </modus-list>
`;
export const Default = Template.bind({});

Default.args = {
  subText: 'default',
  wrapSubText: true,
  leftIcon: '',
  iconColor: '#6A6976',
};
