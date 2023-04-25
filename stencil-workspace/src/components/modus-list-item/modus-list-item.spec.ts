import { newSpecPage } from '@stencil/core/testing';
import { ModusListItem } from './modus-list-item';

describe('modus-list-item', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusListItem],
      html: '<modus-list-item></modus-list-item>',
    });
    expect(root).toEqualHtml(`
      <modus-list-item>
        <mock:shadow-root>
          <li class='standard'>
            <span class='slot'>
              <slot></slot>
            </span>
          </li>
        </mock:shadow-root>
      </modus-list-item>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusListItem],
      html: '<modus-list-item>List Item</modus-list-item>',
    });
    expect(root).toEqualHtml(`
      <modus-list-item>
        <mock:shadow-root>
          <li class='standard'>
            <span class='slot'>
              <slot></slot>
            </span>
          </li>
        </mock:shadow-root>
        List Item
      </modus-list-item>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusListItem = new ModusListItem();
    let className = modusListItem.classBySize.get(modusListItem.size);
    expect(className).toEqual('standard');

    className = modusListItem.classBySize.get('condensed');
    expect(className).toEqual('small');

    className = modusListItem.classBySize.get('large');
    expect(className).toEqual('large');
  });
});
