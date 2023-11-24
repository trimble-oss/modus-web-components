// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-sentiment-scale-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Sentiment Scale',
  argTypes: {
    iconsType: {
      name: 'type',
      control: {
        options: ['smileys', 'thumbs'],
        type: 'select',
      },
   },
 disabled: {
   description: 'Whether the chip is disabled',
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

const Template = ({iconsType,
disabled}) => html`
<modus-sentiment-scale type="${iconsType}" disabled="${disabled}"></modus-sentiment-scale>

<script>
  const sentimentScale = document.querySelector('modus-sentiment-scale');
  sentimentScale.addEventListener('sentimentSelection', (event) => {
    console.log('Sentiment selected:', event.detail);
  });
</script>
`;
export const Default = Template.bind({});
Default.args = {
  disabled: false,
  iconsType: 'smileys',
};




