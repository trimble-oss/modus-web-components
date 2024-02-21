import { newSpecPage } from '@stencil/core/testing';
import { ModusSideNavigation } from './modus-side-navigation';
import { ModusSideNavigationItem } from './modus-side-navigation-item/modus-side-navigation-item';

describe('modus-side-navigation', () => {
  it('renders root', async () => {
    const page = await newSpecPage({
      components: [ModusSideNavigation],
      html: '<modus-side-navigation></modus-side-navigation>',
    });
    expect(page.root).toEqualHtml(`
      <modus-side-navigation>
        <mock:shadow-root>
          <nav
            class="side-nav-panel"
            aria-label="side navigation">
            <div class="side-nav-level center">
            <ul class="side-nav-menu" role="tree">
              <slot></slot>
            </ul>
            </div>
          </nav>
        </mock:shadow-root>
      </modus-side-navigation>
    `);
  });
  ``;
  it('renders root with item', async () => {
    const page = await newSpecPage({
      components: [ModusSideNavigation],
      html: `<modus-side-navigation>
      <modus-side-navigation-item label="Test">
        <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
          <g>
            <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
          </g>
        </svg>
      </modus-side-navigation-item>
    </modus-side-navigation>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-side-navigation>
        <mock:shadow-root>
          <nav
            class="side-nav-panel"
            aria-label="side navigation">
            <div class="side-nav-level center">
            <ul class="side-nav-menu" role="tree">
              <slot></slot>
            </ul>
            </div>
          </nav>
        </mock:shadow-root>
        <modus-side-navigation-item label="Test">
        <svg slot="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" width="24" viewBox="0 0 32 32">
          <g>
            <path d="m27.707 14.293-11-11a1 1 0 0 0-1.414 0l-11 11A1 1 0 0 0 5 16h5v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V16h5a1 1 0 0 0 .707-1.707z"/>
          </g>
        </svg>
      </modus-side-navigation-item>
      </modus-side-navigation>
    `);
  });
});

describe('modus-side-navigation-item', () => {
  it('renders item', async () => {
    const page = await newSpecPage({
      components: [ModusSideNavigationItem],
      html: '<modus-side-navigation-item label="Test"></modus-side-navigation-item>',
    });
    expect(page.root).toEqualHtml(`
      <modus-side-navigation-item label="Test">
        <mock:shadow-root>
        <modus-tooltip position="right" text="Test">
        <li class="side-nav-item" role="treeitem" aria-label="Test"  tabindex="0">
          <div class="menu-icon">
              <slot name="menu-icon"></slot>
          </div>
          <div class="level-icon">
          </div>
        </li>
        </modus-tooltip>
        </mock:shadow-root>
      </modus-side-navigation-item>
    `);
  });
});
