import { newSpecPage } from '@stencil/core/testing';
import { ModusTreeViewItem } from './modus-tree-view-item/modus-tree-view-item';
import { ModusTreeView } from './modus-tree-view/modus-tree-view';

describe('modus-tree-view-item', () => {
  it('renders tree root', async () => {
    const page = await newSpecPage({
      components: [ModusTreeView],
      html: '<modus-tree-view></modus-tree-view>',
    });
    expect(page.root).toEqualHtml(`
      <modus-tree-view>
        <mock:shadow-root>
          <ul role="tree">
            <slot></slot>
          </ul>
        </mock:shadow-root>
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
           <div class="tree-item standard">
            <div class="icon-slot drag-icon">
                <slot name="drag-icon"></slot>
              </div>
              <div class="icon-slot" style="padding-left: 0rem;"></div>
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
