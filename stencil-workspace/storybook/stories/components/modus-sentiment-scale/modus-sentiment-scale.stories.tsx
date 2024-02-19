// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-sentiment-scale-storybook-docs.mdx';
import { html } from 'lit-html';

//changed
export default {
  title: 'Components/Sentiment Scale',
  argTypes: {
    ariaLabel: {
      name: 'aria-label',
      description: "The Sentiment Scale's aria-label",
      table: {
        type: { summary: 'string' },
      },
    },
    iconsType: {
      name: 'type',
      control: {
        options: ['smileys', 'thumbs'],
        type: 'select',
      },
   },
 disabled: {
   description: 'Whether the sentiment-scale is disabled',
   table: {
     defaultValue: { summary: false },
     type: { summary: 'boolean' },
   },
  },
},
  parameters: {
    docs: {
      page: docs,
    },
    actions: {
      handles: ['sentimentSelection'],
    },
    controls: {
      expanded: true,
    },
    options: {
      isToolshown: true,
    },
  },
};

const Template = ({ariaLabel,iconsType, disabled}) => html`
<modus-sentiment-scale  aria-label=${ariaLabel} type="${iconsType}" ?disabled="${disabled}"></modus-sentiment-scale>
`;
export const Default = Template.bind({});
Default.args = {
  ariaLabel: '',
  iconsType: 'smileys',
  disabled: false
};




