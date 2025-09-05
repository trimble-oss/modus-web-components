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
            <div class="browse dropzone" tabindex="0">
              <svg class="upload-cloud" fill="currentColor" width="36" height="36" viewBox="0 0 24 24">
                <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"/>
              </svg>
              Drag files here or browse to upload.
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone instructions="test instructions"></modus-file-dropzone>',
    });
    expect(root).toEqualHtml(`
      <modus-file-dropzone instructions="test instructions" role="button">
        <mock:shadow-root>
          <div class="modus-file-dropzone">
            <input multiple="" type="file">
            <div class="header">
              <label></label>
              <span></span>
            </div>
            <div class="browse dropzone" tabindex="0">
              <svg class="upload-cloud" fill="currentColor" width="36" height="36" viewBox="0 0 24 24">
                <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"/>
              </svg>
              test instructions
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });

  it('renders with custom file dragged over instructions', async () => {
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
              <svg class="upload-cloud" fill="currentColor" width="36" height="36" viewBox="0 0 24 24">
                <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"/>
              </svg>
              test instructions
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });

  it('renders with maxFileCount error is triggered', async () => {
    const page = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone file-dragged-over-instructions="test instructions"></modus-file-dropzone>',
    });
    const dropzone = page.rootInstance as ModusFileDropzone;
    dropzone.error = 'maxFileCount';
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
            <div class="dropzone error" tabindex="0">
              <svg class="icon-cancel" fill="currentColor" width="36" height="36" viewBox="0 0 32 32">
                <path d="M21.3027,10.6973a1.503,1.503,0,0,0-2.1211,0L16,13.8789l-3.1821-3.1816a1.5,1.5,0,0,0-2.1211,2.1211L13.8789,16l-3.1821,3.1816a1.5012,1.5012,0,0,0,0,2.1211,1.5363,1.5363,0,0,0,2.1211,0L16,18.1211l3.1816,3.1816a1.5,1.5,0,1,0,2.1211-2.1211L18.1211,16l3.1816-3.1816A1.5012,1.5012,0,0,0,21.3027,10.6973Z"></path>
                <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0134,12.0134,0,0,1,16,28Z"></path>
              </svg>
             <div class="error-messages" role="alert">
               <modus-button button-style="outline" color="secondary">
                 Reset
               </modus-button>
             </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });

  it('renders with maxTotalFileSize error is triggered', async () => {
    const page = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone file-dragged-over-instructions="test instructions"></modus-file-dropzone>',
    });
    const dropzone = page.rootInstance as ModusFileDropzone;
    dropzone.error = 'maxTotalFileSize';
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
            <div class="dropzone error" tabindex="0">
              <svg class="icon-cancel" fill="currentColor" width="36" height="36" viewBox="0 0 32 32">
                <path d="M21.3027,10.6973a1.503,1.503,0,0,0-2.1211,0L16,13.8789l-3.1821-3.1816a1.5,1.5,0,0,0-2.1211,2.1211L13.8789,16l-3.1821,3.1816a1.5012,1.5012,0,0,0,0,2.1211,1.5363,1.5363,0,0,0,2.1211,0L16,18.1211l3.1816,3.1816a1.5,1.5,0,1,0,2.1211-2.1211L18.1211,16l3.1816-3.1816A1.5012,1.5012,0,0,0,21.3027,10.6973Z"></path>
                <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0134,12.0134,0,0,1,16,28Z"></path>
              </svg>
             <div class="error-messages" role="alert">
               <modus-button button-style="outline" color="secondary">
                 Reset
               </modus-button>
             </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });

  it('renders with maxFileNameLength error is triggered', async () => {
    const page = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone file-dragged-over-instructions="test instructions"></modus-file-dropzone>',
    });
    const dropzone = page.rootInstance as ModusFileDropzone;
    dropzone.error = 'maxFileNameLength';
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
            <div class="dropzone error" tabindex="0">
              <svg class="icon-cancel" fill="currentColor" width="36" height="36" viewBox="0 0 32 32">
                <path d="M21.3027,10.6973a1.503,1.503,0,0,0-2.1211,0L16,13.8789l-3.1821-3.1816a1.5,1.5,0,0,0-2.1211,2.1211L13.8789,16l-3.1821,3.1816a1.5012,1.5012,0,0,0,0,2.1211,1.5363,1.5363,0,0,0,2.1211,0L16,18.1211l3.1816,3.1816a1.5,1.5,0,1,0,2.1211-2.1211L18.1211,16l3.1816-3.1816A1.5012,1.5012,0,0,0,21.3027,10.6973Z"></path>
                <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0134,12.0134,0,0,1,16,28Z"></path>
              </svg>
             <div class="error-messages" role="alert">
               <modus-button button-style="outline" color="secondary">
                 Reset
               </modus-button>
             </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });
  it('renders with reset button clicked', async () => {
    const page = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone file-dragged-over-instructions="test instructions"></modus-file-dropzone>',
    });
    const dropzone = page.rootInstance as ModusFileDropzone;
    dropzone.error = 'maxFileNameLength';
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
            <div class="dropzone error" tabindex="0">
              <svg class="icon-cancel" fill="currentColor" width="36" height="36" viewBox="0 0 32 32">
                <path d="M21.3027,10.6973a1.503,1.503,0,0,0-2.1211,0L16,13.8789l-3.1821-3.1816a1.5,1.5,0,0,0-2.1211,2.1211L13.8789,16l-3.1821,3.1816a1.5012,1.5012,0,0,0,0,2.1211,1.5363,1.5363,0,0,0,2.1211,0L16,18.1211l3.1816,3.1816a1.5,1.5,0,1,0,2.1211-2.1211L18.1211,16l3.1816-3.1816A1.5012,1.5012,0,0,0,21.3027,10.6973Z"></path>
                <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0134,12.0134,0,0,1,16,28Z"></path>
              </svg>
             <div class="error-messages" role="alert">
               <modus-button button-style="outline" color="secondary">
                 Reset
               </modus-button>
             </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);

    const resetButton = page.root.shadowRoot.querySelector('modus-button');
    resetButton.click();
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
           <div class="browse dropzone" tabindex="0">
             <svg class="upload-cloud" fill="currentColor" height="36" viewBox="0 0 24 24" width="36">
               <path d="M19.93 11.12c.04-.29.07-.57.07-.87C20 6.8 17.2 4 13.75 4c-2.53 0-4.7 1.5-5.68 3.66-.42-.1-.86-.16-1.32-.16C3.57 7.5 1 10.07 1 13.25S3.57 19 6.75 19H19c2.21 0 4-1.79 4-4a3.99 3.99 0 0 0-3.07-3.88Zm-4.41 1.31h-1.96V17c0 .27-.22.5-.5.5h-2.11c-.27 0-.5-.23-.5-.5v-4.57H8.48c-.23 0-.35-.28-.18-.44l3.35-3.35c.2-.2.51-.2.71 0l3.35 3.35c.16.16.05.44-.18.44Z"></path>
             </svg>
             Drag files here or browse to upload.
           </div>
         </div>
       </mock:shadow-root>
          `);
  });
});
