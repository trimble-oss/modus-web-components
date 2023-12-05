// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-radio-group-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Radio Group',
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

const Template = () => html`
  <modus-radio-group checked-id="1" name="my-group"></modus-radio-group>
  ${setRadioGroup()}
`;
const smallTemplate = () => html`
  <modus-radio-group checked-id="1" size="small" name="my-group-small"></modus-radio-group>
  ${setSmallRadioGroup()}
`;
export const Medium = Template.bind({});
export const Small = smallTemplate.bind({});

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

const setSmallRadioGroup = () => {
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
        label: 'Radio 3',
      }
    ];
  `;

  return tag;
};
