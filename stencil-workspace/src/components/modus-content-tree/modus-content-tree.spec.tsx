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
      <li aria-level="1" aria-selected="false" aria-disabled="false" role="treeitem" class="tree-item-container">
      <div class="tree-item standard" tabindex="0">
        <div class="icon-slot drag-icon hidden">
          <slot name="dragIcon"></slot><svg class="icon-drag-indicator" height="16" width="16" viewBox="0 0 24 24"
            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2">
            </path>
          </svg>
        </div>
        <div aria-disabled="true" style="padding-left: 0rem;"></div>
        <div class="icon-slot hidden" tabindex="-1">
          <div class="inline-flex rotate-right">
            <slot name="expandIcon"></slot><svg class="icon-expand-more-bold" height="24" width="24" viewBox="0 0 24 24"
              fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.65 8.93c-.59-.58-1.54-.57-2.12 0L12 12.46 8.47 8.93c-.56-.57-1.55-.57-2.12 0-.58.58-.58 1.53 0 2.12l4.59 4.59c.29.29.68.44 1.06.44s.77-.15 1.06-.44l4.59-4.59a1.5 1.5 0 0 0 0-2.12">
              </path>
            </svg>
          </div>
          <div class="inline-flex">
            <slot name="collapseIcon"></slot><svg class="icon-expand-more-bold" height="24" width="24" viewBox="0 0 24 24"
              fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.65 8.93c-.59-.58-1.54-.57-2.12 0L12 12.46 8.47 8.93c-.56-.57-1.55-.57-2.12 0-.58.58-.58 1.53 0 2.12l4.59 4.59c.29.29.68.44 1.06.44s.77-.15 1.06-.44l4.59-4.59a1.5 1.5 0 0 0 0-2.12">
              </path>
            </svg>
          </div>
        </div>
        <div class="icon-slot d-none">
          <slot name="itemIcon"></slot>
        </div>
        <div role="heading" aria-level="1" class="label-slot">
          <div role="button" class="">
            <slot name="label"></slot>test
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
