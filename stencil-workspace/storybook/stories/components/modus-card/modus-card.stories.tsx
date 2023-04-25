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
      isToolshown: true,
    },
  },
};

const Template = () => html`
  <modus-card>
    <!-- Render anything here -->
    <div style="padding:10px">
      <h4 id="card-title">Card title</h4>
      <h5 id="card-subtitle">Card subtitle</h5>
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <modus-button color="primary">Go somewhere</modus-button>
    </div>
  </modus-card>
`;
export const Default = Template.bind({});
