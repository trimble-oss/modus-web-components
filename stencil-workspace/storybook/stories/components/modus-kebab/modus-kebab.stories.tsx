// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-kebab-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Kebab',
  parameters: {
    docs: {
      page: docs,
    },
    options: {
      isToolshown: true,
    },
  },
};

const setOptions = () => {
  const script = document.createElement('script');
  script.innerHTML = `
    document.querySelector('modus-kebab').options = [
        {
            name: 'Hello modus',
            func: ()=>{ alert('hello modus')}
        },
        {
            name: 'hello world',
            func: ()=>{ alert('hello world')}
        }
    ];
  `;

  return script;
};

const Template = () => html`<modus-kebab /> ${setOptions()}`;

export const Default = Template.bind({});
