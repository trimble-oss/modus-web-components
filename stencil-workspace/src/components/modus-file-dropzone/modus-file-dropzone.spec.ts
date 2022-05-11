import { newSpecPage } from '@stencil/core/testing';
import { ModusFileDropzone } from './modus-file-dropzone';

describe('modus-file-dropzone', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusFileDropzone],
      html: '<modus-file-dropzone></modus-file-dropzone>',
    });
    expect(root).toEqualHtml(`
      <modus-file-dropzone>
        <mock:shadow-root>
          <div class="modus-file-dropzone" role="button">
            <input multiple="" type="file">
            <div class="header">
              <label></label>
              <span></span>
            </div>
            <div class="dropzone null" tabindex="0">
              <svg class="modus-icon" height="36" viewBox="0 0 32 32" width="36" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <g>
                    <path d="M23,14a8.9688,8.9688,0,0,1,6.4447,2.7311A7.0022,7.0022,0,0,0,22.42,7.02,8,8,0,0,0,7.05,9.07,6.0031,6.0031,0,0,0,8,21h6.2318A9.01,9.01,0,0,1,23,14Z"></path>
                    <path d="M23,30a7,7,0,1,0-7-7A6.9949,6.9949,0,0,0,23,30Zm-3.5547-8.832,3-2a.9364.9364,0,0,1,.1088-.0512.9515.9515,0,0,1,.1-.0469.8933.8933,0,0,1,.6928,0,.9515.9515,0,0,1,.1.0469.9364.9364,0,0,1,.1088.0512l3,2a1,1,0,0,1-1.1094,1.664L24,21.8687V26a1,1,0,0,1-2,0V21.8687l-1.4453.9633a1,1,0,1,1-1.1094-1.664Z"></path>
                  </g>
                </g>
              </svg>
              <div>
                Drag files here
                <span>
                  or
                  <span class="browse">
                    browse
                  </span>
                  to upload
                </span>
                .
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-file-dropzone>
    `);
  });
});
