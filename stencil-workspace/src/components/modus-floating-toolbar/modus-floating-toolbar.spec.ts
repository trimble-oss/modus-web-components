import { newSpecPage } from '@stencil/core/testing';
import { ModusFloatingToolbar } from './modus-floating-toolbar';

describe('modus-floating-toolbar', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusFloatingToolbar],
      html: `
        <modus-floating-toolbar>
          <modus-button>Button</modus-button>
        </modus-floating-toolbar>`,
    });
    expect(root).toEqualHtml(`
      <modus-floating-toolbar role="toolbar">
        <mock:shadow-root>
          <modus-button button-style="borderless" class="modus-button" color="secondary">
            Button
          </modus-button>
        </mock:shadow-root>
        <modus-button>
          Button
        </modus-button>
      </modus-floating-toolbar>
    `);
  });

  it('should render a divider', async () => {
    const { root } = await newSpecPage({
      components: [ModusFloatingToolbar],
      html: `
        <modus-floating-toolbar role="toolbar">
          <modus-divider></modus-divider>
        </modus-floating-toolbar>`,
    });
    expect(root).toEqualHtml(`
      <modus-floating-toolbar role="toolbar">
        <mock:shadow-root>
          <modus-divider></modus-divider>
        </mock:shadow-root>
        <modus-divider></modus-divider>
      </modus-floating-toolbar>
    `);
  });
  it('should render a button with icon only', async () => {
    const { root } = await newSpecPage({
      components: [ModusFloatingToolbar],
      html: `
        <modus-floating-toolbar>
          <modus-button icon-only="close">Button</modus-button>
        </modus-floating-toolbar>`,
    });
    expect(root).toEqualHtml(`
      <modus-floating-toolbar role="toolbar">
        <mock:shadow-root>
          <modus-button button-style="borderless" class="modus-button" color="secondary" icon-only="close">
            Button
          </modus-button>
        </mock:shadow-root>
        <modus-button icon-only="close">
          Button
        </modus-button>
      </modus-floating-toolbar>
    `);
  });
  it('should render a button with icon only and label', async () => {
    const { root } = await newSpecPage({
      components: [ModusFloatingToolbar],
      html: `
        <modus-floating-toolbar>
          <modus-button icon-only="close">Button</modus-button>
        </modus-floating-toolbar>`,
    });
    expect(root).toEqualHtml(`
      <modus-floating-toolbar role="toolbar">
        <mock:shadow-root>
          <modus-button button-style="borderless" class="modus-button" color="secondary" icon-only="close">
            Button
          </modus-button>
        </mock:shadow-root>
        <modus-button icon-only="close">
          Button
        </modus-button>
      </modus-floating-toolbar>
    `);
  });
  it('should render a button with label only', async () => {
    const { root } = await newSpecPage({
      components: [ModusFloatingToolbar],
      html: `
        <modus-floating-toolbar>
          <modus-button>Button</modus-button>
        </modus-floating-toolbar>`,
    });
    expect(root).toEqualHtml(`
      <modus-floating-toolbar role="toolbar">
        <mock:shadow-root>
          <modus-button button-style="borderless" class="modus-button" color="secondary">
            Button
          </modus-button>
        </mock:shadow-root>
        <modus-button>
          Button
        </modus-button>
      </modus-floating-toolbar>
    `);
  });
});
