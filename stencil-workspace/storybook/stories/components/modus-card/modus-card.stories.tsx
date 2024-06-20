// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-card-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Card',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The card's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    height: {
      height: 'The height of the card',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
    },
    width: {
      description: 'The width of the card',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
    },
    borderRadius: {
      description: 'The border radius of the card',
      table: {
        defaultValue: { summary: false },
        type: { summary: 'string' },
      },
    },
    showCardBorder: {
      description: 'A flag that controls the display of border',
      table: {
        type: { summary: 'boolean' },
      },
    },
    showShadowOnHover: {
      description: 'A flag that controls the display of shadow box when the element is hovered',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    docs: {
      page: docs,
    },
    controls: { expanded: true, sort: 'requiredFirst' },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({ ariaLabel, height, width, borderRadius, showCardBorder, showShadowOnHover }) => html`
  <modus-card
    aria-label=${ariaLabel}
    height=${height}
    width=${width}
    border-radius=${borderRadius}
    show-card-border=${showCardBorder}
    show-shadow-on-hover=${showShadowOnHover}>
    <!-- Render anything here -->
    <div style="padding:10px">
      <h4>Card title</h4>
      <h5>Card subtitle</h5>
      <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <modus-button color="primary">Go somewhere</modus-button>
    </div>
  </modus-card>
`;
export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  height: '270px',
  width: '250px',
  borderRadius: '4px',
  showCardBorder: true,
  showShadowOnHover: true,
};
