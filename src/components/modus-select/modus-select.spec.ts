import { newSpecPage } from '@stencil/core/testing';
import { ModusSelect } from './modus-select';

describe('modus-select', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusSelect],
      html: `
        <modus-select></modus-select>`,
    });
    expect(root).toEqualHtml(`
      <modus-select>
        <mock:shadow-root>
          <div>
            <div class='label-container'></div>
            <div class='input-container'>
              <button type="button">
                <div class="dropdown-text"></div>
                <svg class="icon-triangle-down" fill="none" height="12" viewBox="0 0 10 6" width="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" fill="#6A6976"></path>
                </svg>
              </button>
              <div class='dropdown-list hidden'></div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-select>
    `);
  });
});
