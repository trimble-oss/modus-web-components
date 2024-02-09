// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-select-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'User Inputs/Select',
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
    actions: {
      handles: ['valueChange'],
    },
  },
};

const Template = () => html`
  <modus-select id="select-demo-1" label="Select Demo 1" aria-label="select" options-display-prop="display"></modus-select>
  <modus-select
    disabled
    helper-text="Helper demo"
    aria-label="select"
    id="select-demo-2"
    label="Select Demo 2"
    options-display-prop="display"></modus-select>
  <modus-select error-text="Error demo" aria-label="select" label="Select Demo 3"></modus-select>
  <modus-select label="Select Demo 4" aria-label="select" valid-text="Valid demo"></modus-select>
  <modus-select
    id="select-demo-5"
    label="Select Demo 5"
    size="large"
    aria-label="select"
    options-display-prop="display"></modus-select>
  <modus-select id="select-demo-6" label="Custom Placeholder" aria-label="select" placeholder="Custom Placeholder" options-display-prop="display"></modus-select>
  ${setSelects()}
`;

export const Default = Template.bind({});

const setSelects = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
      const options = [
        { display: 'Option 1' },
        { display: 'Option 2' },
        { display: 'Option 3' },
      ];

      const select1 = document.querySelector('#select-demo-1');
      select1.options = options;
      select1.value = options[0];

      const select2 = document.querySelector('#select-demo-2');
      select2.options = options;
      select2.value = options[1];

      const select5 = document.querySelector('#select-demo-5');
      select5.options = options;
      select5.value = options[2];

      const select6 = document.querySelector('#select-demo-6');
      select6.options = options;
      select6.addEventListener('valueChange', function handleValueChange(e) {
         const selectedOption = e.detail;
         select6.value = selectedOption;
      });
  `;

  return tag;
};
