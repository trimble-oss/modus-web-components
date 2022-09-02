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
              <div class="icon-slot">
                <slot name="dragIcon"></slot>
              </div>
              <div aria-disabled="true" style="padding-left: 0rem;"></div>
              <div class="slot-container" tabindex="-1">
                  <div class="hidden icon-slot">
                    <slot name="expandIcon"></slot>
                    <svg class="icon-chevron-right-thick" fill="currentColor" height="16" viewBox="0 0 32 32" width="16" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="m13.767 27.486 8.572-9.974.026-.03.023-.032a2.444 2.444 0 0 0 0-2.9l-.023-.032-.026-.03-8.572-9.974c-.815-1.075-2.384-1.335-3.52-.574A2.482 2.482 0 0 0 9.136 6c0 .523.164 1.024.476 1.45l.025.035.028.032L17.058 16l-7.392 8.483-.028.032-.026.034A2.442 2.442 0 0 0 9.136 26c0 .823.415 1.594 1.111 2.06 1.136.762 2.704.502 3.52-.573z" fill="#6A6976"></path>
                      </g>
                    </svg>
                  </div>
                  <div class="hidden icon-slot">
                    <slot name="collapseIcon"></slot>
                    <svg class="icon-chevron-down-thick" fill="currentColor" height="16" viewBox="0 0 32 32" width="16" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M28.06 11.383A2.483 2.483 0 0 0 26 10.27c-.523 0-1.024.165-1.45.477l-.035.025-.032.028L16 18.194l-8.483-7.393-.032-.028-.035-.025A2.444 2.444 0 0 0 6 10.27c-.823 0-1.593.416-2.06 1.112-.76 1.135-.501 2.704.574 3.52l9.974 8.572.03.026.032.023a2.445 2.445 0 0 0 2.9 0l.032-.023.03-.026 9.974-8.573c1.075-.815 1.335-2.384.574-3.52z" fill="#6A6976"></path>
                      </g>
                    </svg>
                  </div>
                </div>
                <div></div>
                <div class="hidden icon-slot">
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
