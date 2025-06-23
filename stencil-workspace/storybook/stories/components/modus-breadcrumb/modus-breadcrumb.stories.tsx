// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-breadcrumb-storybook-docs.mdx';
import { html } from 'lit-html';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'Components/Breadcrumb',
  argTypes: {
    underlineLinks: {
      name: 'underlineLinks',
      description: 'A flag that controls the display of underline',
      type: 'boolean',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    docs: {
      inlineStories: false,
      page: docs,
    },
    actions: {
      handles: ['crumbClick'],
    },
    controls: {
      disabled: false,
      expanded: true,
    },
    options: {
      isToolshown: true,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/wyfVJUHWRMkeCfdB38HFEE/Modus---Web?node-id=1346-15&m=dev',
    },
  },
  decorators: [withActions],
};

const defaultCrumbs = [
  { id: '1', display: 'Crumb 1' },
  { id: '2', display: 'Crumb 2' },
  { id: '3', display: 'Crumb 3' },
  { id: '4', display: 'Crumb 4' },
];

const Template = ({ underlineLinks }) => html`
  <modus-breadcrumb underline-links=${underlineLinks} .crumbs=${defaultCrumbs}></modus-breadcrumb>
`;
export const Default = Template.bind({});
Default.args = { underlineLinks: false };

export const Underline = Template.bind({});
Underline.args = { underlineLinks: true };
