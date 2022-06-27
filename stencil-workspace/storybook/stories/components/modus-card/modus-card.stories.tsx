// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-card-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Card',
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      disabled: true,
    },
    options: {
      isToolshown: true
    }
  },
};

const Template = () => html`
<modus-card>
  <!-- Render anything here -->
  <div>
    <img src="https://modus.trimble.com/icon.png" alt="Trimble icon" />
  </div>
</modus-card>
`;
export const Default = Template.bind({});

