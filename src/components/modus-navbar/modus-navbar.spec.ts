import { newSpecPage } from '@stencil/core/testing';
import { ModusNavbar } from './modus-navbar';

describe('modus-navbar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusNavbar],
      html: '<modus-navbar></modus-navbar>',
    });
    expect(root).toEqualHtml(`
      <modus-navbar>
        <mock:shadow-root>
          <nav>
            <div class="left">
              <img alt="Modus navbar product logo" class="product-logo" height="24">
            </div>
            <div class="right">
              <div class="profile-menu">
                <span class="initials"></span>
              </div>
            </div>
          </nav>
        </mock:shadow-root>
      </modus-navbar>
    `);
  });
});
