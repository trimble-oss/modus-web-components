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
});
