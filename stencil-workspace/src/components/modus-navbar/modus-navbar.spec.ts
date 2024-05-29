import { newSpecPage } from '@stencil/core/testing';
import { ModusNavbar } from './modus-navbar';

describe('modus-navbar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusNavbar],
      html: '<modus-navbar></modus-navbar>',
    });

    const navElement = root.shadowRoot.querySelector('nav');

    expect(navElement).toBeTruthy();
  });

  it('renders correct html', async () => {
    const page = await newSpecPage({
      components: [ModusNavbar],
      html: '<modus-navbar></modus-navbar>',
    });

    page.root.removeAttribute('id'); // this is done because it's randomly generated.

    expect(page.root).toEqualHtml(`<modus-navbar>
       <mock:shadow-root>
         <nav>
           <div class="left"></div>
           <div class="right">
             <div class="profile-menu">
               <modus-tooltip position="bottom">
                 <span class="initials" tabindex="0"></span>
               </modus-tooltip>
             </div>
           </div>
         </nav>
       </mock:shadow-root>
     </modus-navbar>`);
  });

  it('renders correct html', async () => {
    const page = await newSpecPage({
      components: [ModusNavbar],
      html: '<modus-navbar nav-aria-label="test"></modus-navbar>',
    });

    page.root.removeAttribute('id'); // this is done because it's randomly generated.

    expect(page.root).toEqualHtml(`<modus-navbar nav-aria-label="test">
       <mock:shadow-root>
         <nav aria-label="test">
           <div class="left"></div>
           <div class="right">
             <div class="profile-menu">
               <modus-tooltip position="bottom">
                 <span class="initials" tabindex="0"></span>
               </modus-tooltip>
             </div>
           </div>
         </nav>
       </mock:shadow-root>
     </modus-navbar>`);
  });
});
