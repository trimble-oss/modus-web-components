import { ModusTreeView, ModusTreeViewItem } from '@trimble-oss/modus-react-components';

export default function ModusContentTreeExamples() {
  return (
    <>
      <h3>Content Tree</h3>
      <ModusTreeView
        style={{ width: '400px' }}
        checkbox-selection="true"
        checked-items="false"
        expanded-items="false"
        multi-checkbox-selection="true"
        multi-selection="true"
        selected-items="false">
        <ModusTreeViewItem nodeId="1" label="Inbox">
          <ModusTreeViewItem nodeId="2" label="Personal"></ModusTreeViewItem>
          <ModusTreeViewItem nodeId="3" label="Work"></ModusTreeViewItem>
          <ModusTreeViewItem nodeId="4" label="Social"></ModusTreeViewItem>
          <ModusTreeViewItem nodeId="5" label="More ..."></ModusTreeViewItem>
        </ModusTreeViewItem>
        <ModusTreeViewItem nodeId="6" label="Archived">
          <ModusTreeViewItem nodeId="7" label="Folder1">
            <ModusTreeViewItem nodeId="8" label="File1"></ModusTreeViewItem>
            <ModusTreeViewItem nodeId="9" label="Folder2">
              <ModusTreeViewItem nodeId="10" label="File2"></ModusTreeViewItem>
            </ModusTreeViewItem>
            <ModusTreeViewItem nodeId="11" label="File3"></ModusTreeViewItem>
          </ModusTreeViewItem>
        </ModusTreeViewItem>
        <ModusTreeViewItem nodeId="12" label="Spam"></ModusTreeViewItem>
      </ModusTreeView>
    </>
  );
}
