import { newSpecPage } from '@stencil/core/testing';
import { ModusTabs } from './modus-tabs';

describe('modus-button', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusTabs],
      html: '<modus-tabs></modus-tabs>',
    });
    expect(root).toEqualHtml(`
      <modus-tabs>
        <mock:shadow-root>
          <div class="medium modus-tabs"></div>
        </mock:shadow-root>
      </modus-tabs>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusTabs = new ModusTabs();
    let className = modusTabs.classBySize.get(modusTabs.size);
    expect(className).toEqual('medium');

    className = modusTabs.classBySize.get('small');
    expect(className).toEqual('small');
  });
  it('should have flag "fullWidth" set on false as default', async () => {
    const modusTabs = new ModusTabs();
    const flag = modusTabs.fullWidth;

    expect(flag.toString()).toEqual('false');
  });
});