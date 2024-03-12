import { html } from 'lit-html';
// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-button-group-storybook-docs.mdx';


export default {
  title: 'Components/ButtonGroup',
  argTypes:{
    ariaLabel: {
      name: 'aria-label',
      description: "The button's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },

  parameters: {
    controls: { expanded: true, sort: 'alpha' },
    actions:{
      handles: ['buttonClick'],
    },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};
const Template = ({ ariaLabel, disabled }) => html`
  <modus-button-group aria-label=${ariaLabel} disabled=${disabled}>
    <modus-button>Button 1</modus-button>
    <modus-button>Button 2</modus-button>
    <modus-button>Button 3</modus-button>
  </modus-button-group>
`;
const DefaultArgs = {
  ariaLabel: '',
  disabled: false,
};
export const Default = Template.bind({});
Default.args = { ...DefaultArgs };


