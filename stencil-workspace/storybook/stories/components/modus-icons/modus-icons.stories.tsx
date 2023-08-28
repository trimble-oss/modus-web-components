// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-icons-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Icons',
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      disabled: true,
    },
    options: {
      isToolshown: true,
    },
  },
};

const iconNames = [
      'add',
      'apps',
      'calendar',
      'cancel',
      'caret-down',
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
      'expand-all',
      'folder',
      'help',
      'indeterminate',
      'info',
      'info-outline',
      'menu',
      'moon',
      'notifications',
      'refresh',
      'remove',
      'search',
      'sort-a-z',
      'sort-z-a',
      'sun',
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


const Template = () => html`
  <div style="${StyledContent}">
    ${iconNames.map(icon => html`
		<div style="${StyledIcon}">
			<modus-icon icon="${icon}" color="black" size="24"></modus-icon>
			<small>${icon}</small>
		</div>
		`)}
  </div>
`;
export const Default = Template.bind({});

