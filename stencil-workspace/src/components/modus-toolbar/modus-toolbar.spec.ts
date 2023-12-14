import { newSpecPage } from '@stencil/core/testing';
import { ModusToolbar } from './modus-toolbar';

describe('modus-toolbar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusToolbar],
      html: '<modus-toolbar></modus-toolbar>',
    });
    expect(root).toEqualHtml(`
      <modus-toolbar>
        <mock:shadow-root>
          <div class="layout-horizontal style-combined"></div>
        </mock:shadow-root>
      </modus-toolbar>
    `);
  });

  it('should get the correct class by layout', () => {
    const modusToolbar = new ModusToolbar();
    let className = modusToolbar.classByLayout.get('horizontal');
    expect(className).toEqual('layout-horizontal');

    className = modusToolbar.classByLayout.get('vertical');
    expect(className).toEqual('layout-vertical');
  });

  it('should get the correct class by style', () => {
    const modusToolbar = new ModusToolbar();
    let className = modusToolbar.classByStyle.get('combined');
    expect(className).toEqual('style-combined');

    className = modusToolbar.classByStyle.get('split');
    expect(className).toEqual('style-split');
  });
});
