import { newSpecPage } from '@stencil/core/testing';
import { ModusTreeViewItem } from './modus-tree-view-item/modus-tree-view-item';
import { ModusTreeView } from './modus-tree-view/modus-tree-view';

describe('modus-tree-view-item', () => {
  it('renders tree with item', async () => {
    const page = await newSpecPage({
      components: [ModusTreeView],
      html: `
      <modus-tree-view>
        <modus-tree-view-item node-Id="1" label="Node one">
        </modus-tree-view-item>
      </modus-tree-view>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-tree-view>
        <mock:shadow-root>
          <ul role="tree">
            <slot></slot>
          </ul>
        </mock:shadow-root>
        <modus-tree-view-item label="Node one" node-id="1"></modus-tree-view-item>
      </modus-tree-view>
    `);
  });

  it('renders tree item', async () => {
    const page = await newSpecPage({
      components: [ModusTreeViewItem],
      html: '<modus-tree-view-item node-Id="1" label="test"></modus-tree-view-item>',
    });
    expect(page.root).toEqualHtml(`
     <modus-tree-view-item label="test" node-id="1">
       <mock:shadow-root>
       <li aria-disabled="false" aria-level="1" aria-selected="false" class="tree-item-container" role="treeitem">
       <div class="tree-item standard" tabindex="0">
          <div class="icon-slot drag-icon hidden">
             <slot name="dragIcon"></slot>
             <svg class="icon-drag" height="16" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11,18a2,2,0,1,1-2-2A2.006,2.006,0,0,1,11,18ZM9,10a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,10ZM9,4a2,2,0,1,0,2,2A2.006,2.006,0,0,0,9,4Zm6,4a2,2,0,1,0-2-2A2.006,2.006,0,0,0,15,8Zm0,2a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,10Zm0,6a2,2,0,1,0,2,2A2.006,2.006,0,0,0,15,16Z" fill="#6A6976"></path>
             </svg>
          </div>
          <div aria-disabled="true" style="padding-left: 0rem;"></div>
          <div class="icon-slot hidden" tabindex="-1">
             <div class="inline-flex rotate-right">
                <slot name="expandIcon"></slot>
                <svg class="icon-chevron-down-thick" xmlns="http://www.w3.org/2000/svg" fill="#6A6976" height="24" width="24" viewBox="0 0 24 24">
                   <path d="M15.88 9.29 12 13.17 8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0z"></path>
                </svg>
             </div>
             <div class="inline-flex">
                <slot name="collapseIcon"></slot>
                <svg class="icon-chevron-down-thick" xmlns="http://www.w3.org/2000/svg" fill="#6A6976" height="24" width="24" viewBox="0 0 24 24">
                   <path d="M15.88 9.29 12 13.17 8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0z"></path>
                </svg>
             </div>
          </div>
          <div class="icon-slot d-none">
             <slot name="itemIcon"></slot>
          </div>
          <div class="label-slot" aria-level="1" role="heading">
             <div role="button">
                <slot name="label"></slot>
                test
             </div>
          </div>
       </div>
       <ul class="tree-item-group standard" role="tree">
          <slot></slot>
       </ul>
    </li>
        </mock:shadow-root>
      </modus-tree-view-item>
    `);
  });
});
