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
            <div class="icon-slot drag-icon">
                <slot name="dragIcon"></slot>
              </div>
              <div aria-disabled="true" style="padding-left: 0rem;"></div>
              <div class="icon-slot" tabindex="-1"></div>
              <div aria-level="1" role="heading">
                <div class="label-slot" role="button">
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
