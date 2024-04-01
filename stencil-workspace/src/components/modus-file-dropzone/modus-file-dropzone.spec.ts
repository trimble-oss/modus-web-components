import { newSpecPage } from '@stencil/core/testing';
import { ModusFileDropzone } from './modus-file-dropzone';

describe('modus-file-dropzone', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone></modus-file-dropzone>',
    });
    expect(root).toEqualHtml(`
      <modus-file-dropzone role="button">
        <mock:shadow-root>
          <div class="modus-file-dropzone">
            <input multiple="" type="file">
            <div class="header">
              <label></label>
              <span></span>
            </div>
            <div class="dropzone" tabindex="0">
              <svg class="upload-cloud" fill="currentColor" width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"/>
              </svg>
                <div class="browse">
                  Drag files here or browse to upload.
                </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });

  it('renders with custom instructions', async () => {
    const page = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone file-dragged-over-instructions="test instructions"></modus-file-dropzone>',
    });
    const dropzone = page.rootInstance as ModusFileDropzone;
    dropzone.fileDraggedOver = true;
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <modus-file-dropzone role="button" file-dragged-over-instructions="test instructions">
        <mock:shadow-root>
          <div class="modus-file-dropzone">
            <input multiple="" type="file">
            <div class="header">
              <label></label>
              <span></span>
            </div>
            <div class="dropzone highlight" tabindex="0">
              <svg class="upload-cloud" fill="currentColor" width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"/>
              </svg>
              test instructions
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });
});
