import { newSpecPage } from '@stencil/core/testing';
import { ModusContentTreeItem } from './modus-content-tree-item';

describe('modus-content-tree-item', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusContentTreeItem],
      html: '<modus-content-tree-item></modus-content-tree-item>',
    });
    expect(root).toEqualHtml(`
      <modus-content-tree-item>
        <mock:shadow-root>
          <li class="standard">
            <div class="drag-handle-container"></div>
            <div class="depth-padding" style="width: 0px;"></div>
            <div class="icon-container"></div>
            <span class="slot">
              <slot></slot>
            </span>
          </li>
        </mock:shadow-root>
      </modus-content-tree-item>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusContentTreeItem],
      html: '<modus-content-tree-item>Content Tree Item</modus-content-tree-item>',
    });
    expect(root).toEqualHtml(`
    <modus-content-tree-item>
          <mock:shadow-root>
            <li class="standard">
              <div class="drag-handle-container"></div>
              <div class="depth-padding" style="width: 0px;"></div>
              <div class="icon-container"></div>
              <span class="slot">
                <slot></slot>
              </span>
            </li>
          </mock:shadow-root>
          Content Tree Item
    </modus-content-tree-item>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusContentTreeItem = new ModusContentTreeItem();
    let className = modusContentTreeItem.classBySize.get(modusContentTreeItem.size);
    expect(className).toEqual('standard');

    className = modusContentTreeItem.classBySize.get('condensed');
    expect(className).toEqual('small');
  });
});
