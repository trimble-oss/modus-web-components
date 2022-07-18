// @ts-ignore: JSX/MDX with Stencil
import docs from './modus-content-tree-storybook-docs.mdx';
import { html } from 'lit-html';

export default {
  title: 'Components/Content Tree',
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
  <modus-tree-view multi-Selection="true" checkbox-Selection="true" multi-Checkbox-Selection="true" style="width:400px;">
    <modus-tree-view-item node-Id="1" label="Node root">
      <modus-tree-view-item node-Id="2" label="Node one"> </modus-tree-view-item>
      <modus-tree-view-item node-Id="3" label="Node two">
        <modus-tree-view-item node-Id="4" label="Node four"> </modus-tree-view-item>
        <modus-tree-view-item node-Id="5" label="Node five"> </modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-Id="6" label="Node three"> </modus-tree-view-item>
    </modus-tree-view-item>
    <modus-tree-view-item node-Id="7" label="Node seven"> </modus-tree-view-item>
    <modus-tree-view-item node-Id="8" label="Node eight"> </modus-tree-view-item>
  </modus-tree-view>
`;
export const Default = Template.bind({});
