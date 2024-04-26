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
                <svg class="icon-check" fill="none" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="M9 18c-.26 0-.51-.1-.71-.29l-4-4A.996.996 0 1 1 5.7 12.3l3.29 3.29 9.29-9.29a.996.996 0 1 1 1.41 1.41l-10 10c-.2.2-.45.29-.71.29Z" fill="#FFFFFF" fill-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <input aria-checked="false" id="mwc_id_0_checkbox" type="checkbox">
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
  it('should default to medium size', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.size).toBe('medium');
  });

  it('should set size to small', async () => {
    const modusCheckbox = new ModusCheckbox();
    modusCheckbox.size = 'small';

    expect(modusCheckbox.size).toBe('small');
  });
});
