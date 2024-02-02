// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-icons-storybook-docs.mdx';
import { html } from 'lit-html';
import { MODUS_ICON_NAMES } from '../../../../src/icons/ModusIconUtilities';

export default {
  title: 'Components/Icons',
  argTypes: {
    name: {
      control: {
        options: MODUS_ICON_NAMES,
        type: 'select',
      },
      table: {
        type: { summary: `${MODUS_ICON_NAMES.map((name) => `"${name}"`).join('|')}` },
      },
      description: 'The name of the icon',
    },
    size: {
      description: 'The size of the icon',
      table: {
        defaultValue: { summary: `'16'` },
        type: { summary: 'string' },
      },
    },
    color: {
      description: 'The color of the icon',
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
    actions: {
      handles: ['iconClick'],
    },
    controls: { expanded: true, sort: 'alpha' },
    options: {
      isToolshown: true,
    },
  },
};

const StyledIcon = `
  align-items: center;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 100px;
  outline: 1px dashed;
  padding: 10px;
`;

const StyledContent = `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const DefaultTemplateArgs = {
  name: 'calendar',
  size: 16,
  color: '#6A6976',
};

const Template = ({ name, size, color }) => html`
  <div style="${StyledContent}">
    <div style="${StyledIcon}">
      <modus-icon name="${name}" size="${size}" color="${color}"></modus-icon>
      <small>${name}</small>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = DefaultTemplateArgs;
