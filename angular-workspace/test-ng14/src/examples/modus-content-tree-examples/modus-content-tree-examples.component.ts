import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modus-content-tree-examples',
  template: `
    <h3>Content Tree</h3>
    <modus-tree-view
      style="width:400px;"
      checkbox-selection="false"
      checked-items="false"
      expanded-items="false"
      multi-checkbox-selection="false"
      multi-selection="false"
      selected-items="false"
      size=""
      class="hydrated">
      <modus-tree-view-item node-id="1" label="Inbox" class="hydrated">
        <modus-tree-view-item node-id="2" label="Personal" class="hydrated"></modus-tree-view-item>
        <modus-tree-view-item node-id="3" label="Work" class="hydrated"></modus-tree-view-item>
        <modus-tree-view-item node-id="4" label="Social" class="hydrated"></modus-tree-view-item>
        <modus-tree-view-item node-id="5" label="More ..." class="hydrated"></modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-id="6" label="Archived" class="hydrated">
        <modus-tree-view-item node-id="7" label="Folder1" class="hydrated">
          <modus-tree-view-item node-id="8" label="File1" class="hydrated"></modus-tree-view-item>
          <modus-tree-view-item node-id="9" label="Folder2" class="hydrated">
            <modus-tree-view-item node-id="10" label="File2" class="hydrated"></modus-tree-view-item>
          </modus-tree-view-item>
          <modus-tree-view-item node-id="11" label="File3" class="hydrated"></modus-tree-view-item>
        </modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-id="12" label="Spam" class="hydrated"></modus-tree-view-item>
    </modus-tree-view>

    <modus-tree-view
      style="width:400px;"
      checkbox-selection="true"
      checked-items="false"
      expanded-items="false"
      multi-checkbox-selection="true"
      multi-selection="true"
      selected-items="false"
      size=""
      class="hydrated">
      <modus-tree-view-item node-id="1" label="Inbox" class="hydrated">
        <modus-tree-view-item node-id="2" label="Personal" class="hydrated"></modus-tree-view-item>
        <modus-tree-view-item node-id="3" label="Work" class="hydrated"></modus-tree-view-item>
        <modus-tree-view-item node-id="4" label="Social" class="hydrated"></modus-tree-view-item>
        <modus-tree-view-item node-id="5" label="More ..." class="hydrated"></modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-id="6" label="Archived" class="hydrated">
        <modus-tree-view-item node-id="7" label="Folder1" class="hydrated">
          <modus-tree-view-item node-id="8" label="File1" class="hydrated"></modus-tree-view-item>
          <modus-tree-view-item node-id="9" label="Folder2" class="hydrated">
            <modus-tree-view-item node-id="10" label="File2" class="hydrated"></modus-tree-view-item>
          </modus-tree-view-item>
          <modus-tree-view-item node-id="11" label="File3" class="hydrated"></modus-tree-view-item>
        </modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-id="12" label="Spam" class="hydrated"></modus-tree-view-item>
    </modus-tree-view>
  `,
})
export class ModusContentTreeExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
