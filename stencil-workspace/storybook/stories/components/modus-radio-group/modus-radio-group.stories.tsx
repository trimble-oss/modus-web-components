// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-radio-group-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Radio Group',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The radio group's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      description: 'If true, the radio group is disabled',
      control:{
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    name: {
      description: 'The radio button group name. Used to group individual radio elements into one group.',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: {
        options: ['small', 'medium'],
        type: 'select',
      },
      description: 'The size of the radio group',
      table: {
        defaultValue: { summary: `'medium'` },
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    controls: { expanded: true, },
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({ariaLabel, disabled, name, size }) => html`
  <modus-radio-group
    aria-label=${ariaLabel}
    ?disabled=${disabled}
    name=${name}
    size=${size}
  ></modus-radio-group>
  ${setRadioGroup()}
`;

export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  disabled: false,
  name: '',
  size: 'medium',
};
const setRadioGroup = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-radio-group').radioButtons = [
      {
        id: '0',
        label: 'Radio 1',
      },
      {
        checked: true,
        id: '1',
        label: 'Radio 2',
      },
      {
        id: '2',
        label: 'Radio 3'
      }
    ];
  `;

  return tag;
};


