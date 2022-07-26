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
            <div class="header standard" tabindex="0">
              <span class="title"></span>
              <svg class="icon-chevron-down-thick" fill="currentColor" height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M28.06 11.383A2.483 2.483 0 0 0 26 10.27c-.523 0-1.024.165-1.45.477l-.035.025-.032.028L16 18.194l-8.483-7.393-.032-.028-.035-.025A2.444 2.444 0 0 0 6 10.27c-.823 0-1.593.416-2.06 1.112-.76 1.135-.501 2.704.574 3.52l9.974 8.572.03.026.032.023a2.445 2.445 0 0 0 2.9 0l.032-.023.03-.026 9.974-8.573c1.075-.815 1.335-2.384.574-3.52z" fill="#6A6976"></path>
                </g>
              </svg>
            </div>
            <div class="body standard">
              <slot></slot>
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
            <div class="header standard" tabindex="0">
              <span class="title"></span>
              <svg class="icon-chevron-down-thick" fill="currentColor" height="24" viewBox="0 0 32 32" width="24" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="M28.06 11.383A2.483 2.483 0 0 0 26 10.27c-.523 0-1.024.165-1.45.477l-.035.025-.032.028L16 18.194l-8.483-7.393-.032-.028-.035-.025A2.444 2.444 0 0 0 6 10.27c-.823 0-1.593.416-2.06 1.112-.76 1.135-.501 2.704.574 3.52l9.974 8.572.03.026.032.023a2.445 2.445 0 0 0 2.9 0l.032-.023.03-.026 9.974-8.573c1.075-.815 1.335-2.384.574-3.52z" fill="#6A6976"></path>
                </g>
              </svg>
            </div>
            <div class="body standard">
              <slot></slot>
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
