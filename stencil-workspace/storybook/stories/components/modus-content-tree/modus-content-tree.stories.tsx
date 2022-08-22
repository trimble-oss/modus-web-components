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

const Template = ({ checkboxSelection, checkedItems, expandedItems, multiCheckboxSelection, multiSelection, selectedItems, size }) => html`
  <modus-tree-view
    style="width:400px;"
    checkbox-selection=${checkboxSelection ? 'true' : 'false'}
    checked-items=${checkedItems ? 'true' : 'false'}
    expanded-items=${expandedItems ? 'true' : 'false'}
    multi-checkbox-selection=${multiCheckboxSelection ? 'true' : 'false'}
    multi-selection=${multiSelection ? 'true' : 'false'}
    selected-items=${selectedItems ? 'true' : 'false'}
    size=${size}>
    <modus-tree-view-item node-Id="1" label="Inbox">
      <modus-tree-view-item node-Id="2" label="Personal"></modus-tree-view-item>
      <modus-tree-view-item node-Id="3" label="Work"></modus-tree-view-item>
      <modus-tree-view-item node-Id="4" label="Social"></modus-tree-view-item>
      <modus-tree-view-item node-Id="5" label="More ..."></modus-tree-view-item>
    </modus-tree-view-item>
    <modus-tree-view-item node-Id="6" label="Archived">
      <modus-tree-view-item node-Id="7" label="Folder1">
        <modus-tree-view-item node-Id="8" label="File1"></modus-tree-view-item>
        <modus-tree-view-item node-Id="9" label="Folder2">
          <modus-tree-view-item node-Id="10" label="File2"></modus-tree-view-item>
        </modus-tree-view-item>
        <modus-tree-view-item node-Id="11" label="File3"></modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view-item>
    <modus-tree-view-item node-Id="12" label="Spam"></modus-tree-view-item>
  </modus-tree-view>
`;

const SlotIconTemplate = () => html`
  <modus-tree-view style="width:400px;">
    <modus-tree-view-item node-Id="1" label="Inbox">
      <svg slot="itemIcon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="16" width="16" viewBox="0 0 32 32">
        <path
          d="M28.79 12.39A1 1 0 0 0 28 12h-2V9c0-.55-.45-1-1-1h-9.59l-1.7-1.71C13.52 6.11 13.27 6 13 6H4c-.55 0-1 .45-1 1v17c0 .04.02.07.02.11.01.05.02.11.04.16.02.09.06.17.1.25.02.03.02.06.05.09.01.01.03.02.04.03.07.08.15.14.23.19.04.03.06.05.1.07.13.06.27.1.42.1h21c.13 0 .25-.03.36-.07.04-.02.07-.04.1-.06.07-.04.14-.08.2-.13.03-.03.06-.06.09-.1.05-.05.09-.11.12-.18a.31.31 0 0 0 .06-.13c.01-.02.03-.04.03-.07l3-11c.09-.3.02-.62-.17-.87zM5 8h7.59l1.7 1.71c.19.18.44.29.71.29h9v2H7c-.45 0-.85.3-.96.74L5 16.53V8z" />
      </svg>
      <modus-tree-view-item node-Id="2" label="Personal"></modus-tree-view-item>
      <modus-tree-view-item node-Id="3" label="Work"></modus-tree-view-item>
      <modus-tree-view-item node-Id="4" label="Social"></modus-tree-view-item>
      <modus-tree-view-item node-Id="5" label="More ..."></modus-tree-view-item>
    </modus-tree-view-item>
  </modus-tree-view>
`;

export const Default = Template.bind({});

export const WithIcon = SlotIconTemplate.bind({});

// export const Borderless = Template.bind({});

export const Condensed = Template.bind({});
Condensed.args = { checkboxSelection: true, size: 'condensed' };

export const MultiSelection = Template.bind({});
MultiSelection.args = { multiSelection: true, checkboxSelection: true, multiCheckboxSelection: true };
