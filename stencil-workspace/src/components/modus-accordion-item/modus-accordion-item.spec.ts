import { newSpecPage } from '@stencil/core/testing';
import { ModusAccordionItem } from './modus-accordion-item';

describe('modus-accordion-item', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusAccordionItem],
      html: '<modus-accordion-item></modus-accordion-item>',
    });
    expect(root).toEqualHtml(`
      <modus-accordion-item>
        <mock:shadow-root>
          <div class="accordion-item">
            <div aria-controls="mwc_id_0_accordion-item" aria-expanded="false" class="header standard" role="button" tabindex="0">
              <span class="title"></span>
              <div class="chevron-container">
                <svg class="icon-expand-more" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.88 9.29 12 13.17 8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0"></path>
                </svg>
              </div>
            </div>
            <div id="mwc_id_0_accordion-item" class="body collapse standard">
              <div class="body-content">
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-accordion-item>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusAccordionItem],
      html: `<modus-accordion-item><span class='test'>Test</span></modus-accordion-item>`,
    });
    expect(root).toEqualHtml(`
      <modus-accordion-item>
        <mock:shadow-root>
          <div class="accordion-item">
            <div aria-controls="mwc_id_1_accordion-item" aria-expanded="false" class="header standard" role="button" tabindex="0">
              <span class="title"></span>
              <div class="chevron-container">
                <svg class="icon-expand-more" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.88 9.29 12 13.17 8.12 9.29a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.39-1.42 0"></path>
                </svg>
              </div>
            </div>
            <div id="mwc_id_1_accordion-item" class="body collapse standard">
              <div class="body-content">
                <slot></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <span class="test">
          Test
        </span>
      </modus-accordion-item>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusAccordionItem = new ModusAccordionItem();
    let className = modusAccordionItem.classBySize.get(modusAccordionItem.size);
    expect(className).toEqual('standard');

    className = modusAccordionItem.classBySize.get('standard');
    expect(className).toEqual('standard');
  });
});
