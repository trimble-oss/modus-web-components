import { newSpecPage } from '@stencil/core/testing';
import { ModusDialog } from './modus-dialog';

describe('modus-dialog', () => {
  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusDialog],
      html: '<modus-dialog>Hello</modus-dialog>',
    });
    expect(root).toEqualHtml(`
      <modus-dialog>
        <mock:shadow-root>
          <div class='overlay'>
            <div class='dialog' role="dialog" aria-modal="true" aria-labelledby="dialogTitle" aria-describedby="dialogContent">
              <div class="header">
                <span class="header-text" id="dialogTitle"></span>
                <svg class="icon-close" fill="none" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                    <path d="M19 7.30929L17.6907 6L12.5 11.1907L7.30929 6L6 7.30929L11.1907 12.5L6 17.6907L7.30929 19L12.5 13.8093L17.6907 19L19 17.6907L13.8093 12.5L19 7.30929Z" fill="#6A6976"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect fill="white" height="24" width="24"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div class="content" id="dialogContent">
                <slot></slot>
              </div>
              <div class="controls">
                <modus-button>Close</modus-button>
                <modus-button color="primary">Save Changes</modus-button>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        Hello
      </modus-dialog>
    `);
  });
});
