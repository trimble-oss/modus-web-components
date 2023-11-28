import { newSpecPage } from '@stencil/core/testing';
import { ModusCheckbox } from './modus-checkbox';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusCheckbox],
      html: '<modus-checkbox></modus-checkbox>',
    });
    expect(page.root).toEqualHtml(`
      <modus-checkbox>
        <mock:shadow-root>
          <div class="modus-checkbox">
            <div class="checkbox" tabindex="0">
              <div class="checkmark">
                <svg class="icon-check" fill="none" height="26" viewBox="0 0 24 24" width="26" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M9 19c-.51 0-1.02-.2-1.41-.59l-3.5-3.5c-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0l2.09 2.09 8.09-8.09c.78-.78 2.05-.78 2.83 0 .78.78.78 2.05 0 2.83l-9.5 9.5c-.39.39-.9.59-1.41.59Z" fill="#FFFFFF" fill-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <input type="checkbox">
          </div>
        </mock:shadow-root>
      </modus-checkbox>
    `);
  });

  it('should default to unchecked', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.checked).toBeFalsy();
  });

  it('should default to enabled', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.disabled).toBeFalsy();
  });

  it('should default to no label', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.label).toBeFalsy();
  });
  it('should default to default size', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.size).toBe('default');
  });

  it('should set size to small', async () => {
    const modusCheckbox = new ModusCheckbox();
    modusCheckbox.size = 'small';

    expect(modusCheckbox.size).toBe('small');
  });
});
