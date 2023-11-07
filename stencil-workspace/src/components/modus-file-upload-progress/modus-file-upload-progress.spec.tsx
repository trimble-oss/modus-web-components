import { newSpecPage } from '@stencil/core/testing';
import { ModusFileUploadProgress } from './modus-file-upload-progress';

describe('modus-file-upload-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusFileUploadProgress],
      html: `<modus-file-upload-progress></modus-file-upload-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-file-upload-progress>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-file-upload-progress>
    `);
  });
});
