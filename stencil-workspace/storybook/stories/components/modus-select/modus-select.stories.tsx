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
  },
};

const Template = () => html`
  <modus-select
    id="select-demo-1"
    label="Select Demo 1"
    aria-label="select"
    options-display-prop="display"></modus-select>
  <modus-select
    disabled
    helper-text="Helper demo"
    aria-label="select"
    id="select-demo-2"
    label="Select Demo 2"
    options-display-prop="display"></modus-select>
  <modus-select
    error-text="Error demo"
    aria-label="select"
    label="Select Demo 3"></modus-select>
  <modus-select
    label="Select Demo 4"
    aria-label="select"
    valid-text="Valid demo"></modus-select>
    <modus-select
    id="select-demo-5"
    label="Select Demo 5"
    size="large"
    aria-label="select"
    options-display-prop="display"></modus-select>
  ${setSelects()}
  `;

export const Default = Template.bind({});

const setSelects = () => {
  const tag = document.createElement('script');
  tag.innerHTML = `
    const modusSelect = document.querySelector('#select-demo-1');
    modusSelect.options = [ { display: 'Option 1' }, { display: 'Option 2' }, { display: 'Option 3' } ];

    const modusSelect2 = document.querySelector('#select-demo-2');
    const options = [ { display: 'Option 1' }, { display: 'Option 2' }, { display: 'Option 3' } ];
    modusSelect2.options = options;
    modusSelect2.value = options[1]

    const modusSelect3 = document.querySelector('#select-demo-5');
    const options3 = [ { display: 'Option 1' }, { display: 'Option 2' }, { display: 'Option 3' } ];
    modusSelect3.options = options3;
    modusSelect3.value = options3[1]

    const handleChange = (event) => {
      const selectedValue = event.detail;
      event.target.value = selectedValue;
    };
    modusSelect.addEventListener('valueChange', handleChange)
  `;

  return tag;
};
