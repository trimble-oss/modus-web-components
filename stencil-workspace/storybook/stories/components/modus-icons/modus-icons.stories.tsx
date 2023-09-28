// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-icons-storybook-docs.mdx';
import { html } from 'lit-html';

const iconNames = [
  'add',
  'apps',
  'calendar',
  'cancel',
  'caret-down',
  'caret-up',
  'check',
  'check-circle',
  'check-circle-outline',
  'chevron-down-thick',
  'chevron-left-thick',
  'chevron-right-thick',
  'chevron-up-thick',
  'chevron-double-up',
  'chevron-double-down',
  'close',
  'collapse-all',
  'copy',
  'delete',
  'download-line',
  'drag',
  'edit',
  'error',
  'export',
  'expand-all',
  'folder',
  'help',
  'history',
  'indeterminate',
  'info',
  'info-outline',
  'menu',
  'moon',
  'pencil',
  'notifications',
  'refresh',
  'remove',
  'search',
  'sort-a-z',
  'sort-z-a',
  'sun',
  'timer-countdown',
  'triangle-down',
  'triangle-left',
  'tune',
  'upload-cloud',
  'vertical-ellipsis',
  'warning',
  'warning-outline',
  'visibility',
  'visibility-off'
]

export default {
  title: 'Components/Icons',
  argTypes: {
    name: {
      control: {
        options: iconNames,
        type: 'select',
      },
      table: {
        type: { summary: `${iconNames.map( name => `"${name}"`).join('|')}` },
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
  display:flex;
  flex-direction:column;
  width: 100px;
  align-items: center;
  padding: 10px;
  outline: 1px dashed;
  justify-content: space-between;
`

const StyledContent = `
  display: flex;
  flex-wrap: wrap;
  gap:10px;
  flex-direction:row;
`;

const DefaultTemplateArgs = {
  name: 'calendar',
  size: 16,
  color: '#6A6976'
};

const Template = ({
  name,
  size,
  color
}) => html`
  <div style="${StyledContent}">
		<div style="${StyledIcon}">
			<modus-icon name="${name}" size="${size}" color="${color}"></modus-icon>
			<small>${name}</small>
		</div>
  </div>
`;


export const Default = Template.bind({});
Default.args = DefaultTemplateArgs;

