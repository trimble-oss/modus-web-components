import { newSpecPage } from '@stencil/core/testing';
import { ModusModal } from './modus-modal';

describe('modus-modal', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusModal],
      html: '<modus-modal></modus-modal>',
    });
    expect(root).toEqualHtml(` <modus-modal>
      <mock:shadow-root>
        <div aria-hidden="true" class="modus-modal overlay hidden" style="z-index: 1;">
          <div class="content">
            <div id="startTrap" tabindex="0" aria-hidden="true"></div>
            <header>
              <div class="header-resize-buttons">
                <div aria-label="Expand" class="resize-button" role="button" tabindex="0">
                  <svg class="icon-expand" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.85 3.85 17.3 5.3l-2.18 2.16c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0L18.7 6.7l1.45 1.45a.5.5 0 0 0 .85-.36V3.5c0-.28-.22-.5-.5-.5h-4.29a.5.5 0 0 0-.36.85m-12 4.3L5.3 6.7l2.16 2.18c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42L6.7 5.3l1.45-1.45A.5.5 0 0 0 7.79 3H3.5c-.28 0-.5.22-.5.5v4.29c0 .45.54.67.85.36m4.3 12L6.7 18.7l2.18-2.16c.39-.39.39-1.03 0-1.42s-1.03-.39-1.42 0L5.3 17.3l-1.45-1.45a.5.5 0 0 0-.85.36v4.29c0 .28.22.5.5.5h4.29a.5.5 0 0 0 .36-.85m12-4.3L18.7 17.3l-2.16-2.18c-.39-.39-1.03-.39-1.42 0s-.39 1.03 0 1.42l2.18 2.16-1.45 1.45a.5.5 0 0 0 .36.85h4.29c.28 0 .5-.22.5-.5v-4.29a.5.5 0 0 0-.85-.36"></path>
                  </svg>
                </div>
                  <div role="button" class="resize-button" tabindex="0" aria-label="Close">
                    <svg class="icon-close" height="24" width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </modus-modal> `);
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
