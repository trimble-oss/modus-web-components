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
            <input class="checkbox" aria-checked="false" id="mwc_id_0_checkbox" type="checkbox">
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
