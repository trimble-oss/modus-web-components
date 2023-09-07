import { newSpecPage } from '@stencil/core/testing';
import { ModusFloatingNavbar } from './modus-floating-navbar';

describe('modus-navbar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusFloatingNavbar],
      html: '<modus-floating-navbar></modus-floating-navbar>',
    });

    const navElement = root.shadowRoot.querySelector('nav');

    expect(navElement).toBeTruthy();
  });
});
