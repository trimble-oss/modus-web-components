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
          <div class='accordion-item'>
            <div class='header standard'>
              <span class='title'></span>
              <svg class="icon-chevron-down-thick" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4708 15.7835C11.7595 16.0722 12.2405 16.0722 12.5292 15.7835L18.7835 9.56128C19.0722 9.24055 19.0722 8.89864 18.7835 8.60998L18 8C17.7113 7.71134 17.3207 7.71134 17 8L12 13L7 8C6.67927 7.71134 6.24284 7.44444 5.95418 7.7331L5.21649 8.47079C4.92783 8.75945 4.92783 9.24055 5.21649 9.56128L11.4708 15.7835Z" fill="#6A6976"></path>
              </svg>
            </div>
            <div class='body standard'>
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
          <div class='accordion-item'>
            <div class='header standard'>
              <span class='title'></span>
              <svg class="icon-chevron-down-thick" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.4708 15.7835C11.7595 16.0722 12.2405 16.0722 12.5292 15.7835L18.7835 9.56128C19.0722 9.24055 19.0722 8.89864 18.7835 8.60998L18 8C17.7113 7.71134 17.3207 7.71134 17 8L12 13L7 8C6.67927 7.71134 6.24284 7.44444 5.95418 7.7331L5.21649 8.47079C4.92783 8.75945 4.92783 9.24055 5.21649 9.56128L11.4708 15.7835Z" fill="#6A6976"></path>
              </svg>
            </div>
            <div class='body standard'>
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        <span class='test'>Test</span>
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
