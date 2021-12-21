// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-radio-group-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Radio Group',
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

const Template = () => html`
  <modus-radio-group checked-id="1" name="my-group"></modus-radio-group>
  ${setRadioGroup()}
`;
export const Default = Template.bind({});

const setRadioGroup = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    document.querySelector('modus-radio-group').radioButtons = [
      {
        id: '0',
        label: 'Radio 1'
      },
      {
        checked: true,
        id: '1',
        label: 'Radio 2'
      },
      {
        id: '2',
        label: 'Radio 3'
      }
    ];
  `;

  return tag;
}


