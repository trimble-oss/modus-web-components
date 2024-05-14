import { newSpecPage } from '@stencil/core/testing';
import { ModusTabs, Tab } from './modus-tabs';

describe('modus-tabs', () => {
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

  it('should set the correct id and label for each tab base on tabs configuration', async () => {
    const page = await newSpecPage({
      components: [ModusTabs],
      html: '<modus-tabs></modus-tabs>',
    });
    const component = page.rootInstance as ModusTabs;
    const tabs = [
      {
        id: 'tab-1',
        label: 'Tab 1',
        active: true,
      },
      {
        id: 'tab-2',
        label: 'Tab 2',
      },
    ] as Tab[];

    component.tabs = tabs;
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <modus-tabs>
        <mock:shadow-root>
          <div class="medium modus-tabs">
            <button class="active medium tab" id="${tabs[0].id}">${tabs[0].label}</button>
            <button class="medium tab" id="${tabs[1].id}">${tabs[1].label}</button>
          </div>
        </mock:shadow-root>
      </modus-tabs>
    `);
  });
});
