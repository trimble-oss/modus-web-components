// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-slider-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Slider',
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
  <modus-slider></modus-slider>
`;
export const Default = Template.bind({});


