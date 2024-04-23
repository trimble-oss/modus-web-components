import { newSpecPage } from '@stencil/core/testing';
import { ModusModal } from './modus-modal';

describe('modus-modal', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusModal],
      html: '<modus-modal></modus-modal>',
    });
    expect(root).toEqualHtml(`
      <modus-modal>
        <mock:shadow-root>
        <div aria-hidden="true" class="modus-modal overlay hidden" style="z-index: 1;">
            <div class="content">
                <div id="startTrap" tabindex="0" aria-hidden="true"></div>
                 <header>
                  <div role="button" tabindex="0" aria-label="Close">
                      <svg class="icon-close" height="20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M19 7.30929L17.6907 6L12.5 11.1907L7.30929 6L6 7.30929L11.1907 12.5L6 17.6907L7.30929 19L12.5 13.8093L17.6907 19L19 17.6907L13.8093 12.5L19 7.30929Z" fill="currentColor"></path>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                              <rect width="24" height="24" fill="white"></rect>
                            </clipPath>
                        </defs>
                      </svg>
                  </div>
                </header>
                <div class="body">
                  <slot></slot>
                </div>
                <footer>
                  <slot name="footerContent"></slot>
                </footer>
                <div id="endTrap" tabindex="0" aria-hidden="true"></div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-modal>
    `);
  });

  it('should set visible to true on open call', async () => {
    const modal = new ModusModal();
    expect(modal.visible).toBeFalsy();
    await modal.open();
    expect(modal.visible).toBeTruthy();
  });

  it('should set visible to false on close call', async () => {
    const modal = new ModusModal();
    expect(modal.visible).toBeFalsy();
    await modal.open();
    expect(modal.visible).toBeTruthy();
    await modal.close();
    expect(modal.visible).toBeFalsy();
  });
});
