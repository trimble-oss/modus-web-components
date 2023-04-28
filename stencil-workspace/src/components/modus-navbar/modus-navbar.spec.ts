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
                <span class="initials" tabindex="0"></span>
              </div>
            </div>
          </nav>
        </mock:shadow-root>
      </modus-navbar>
    `);
  });

  it('should render add icon', async () => {
    const { root } = await newSpecPage({
      components: [ModusNavbar],
      html: '<modus-navbar show-add></modus-navbar>',
    });

    expect(root).toEqualHtml(`
    <modus-navbar show-add="">
      <mock:shadow-root>
        <nav>
          <div class="left">
            <img alt="Modus navbar product logo" class="product-logo" height="24">
          </div>
          <div class="right">
            <div class="navbar-button" data-test-id="add-menu">
                <span class="navbar-button-icon" tabindex="0">
                  <svg class="icon-add" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z" fill="#252a2e"></path>
                  </svg>
                </span>
            </div>
            <div class="profile-menu">
              <span class="initials" tabindex="0"></span>
            </div>
          </div>
        </nav>
      </mock:shadow-root>
  </modus-navbar>`);
  });
});
