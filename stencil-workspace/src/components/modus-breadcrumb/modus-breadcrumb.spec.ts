import { newSpecPage } from '@stencil/core/testing';
import { ModusBreadcrumb } from './modus-breadcrumb';

describe('modus-breadcrumb', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusBreadcrumb],
      html: '<modus-breadcrumb></modus-breadcrumb>',
    });
    expect(root).toEqualHtml(`
      <modus-breadcrumb>
        <mock:shadow-root>
          <nav role='navigation'>
            <ol></ol>
          </nav>
        </mock:shadow-root>
      </modus-breadcrumb>
    `);
  });
});
