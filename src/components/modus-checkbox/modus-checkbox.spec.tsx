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
          <div class="medium modus-checkbox">
            <div class="checkbox">
              <div class="checkmark">
                <svg class="icon-check" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" d="M9.08471 15.4676L5.29164 11.736L4 12.9978L9.08471 18L20 7.26174L18.7175 6L9.08471 15.4676Z" fill="#FFFFFF" fill-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <input type="checkbox">
          </div>
        </mock:shadow-root>
      </modus-checkbox>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusCheckbox = new ModusCheckbox();
    let className = modusCheckbox.classBySize.get(modusCheckbox.size);
    expect(className).toEqual('medium');

    className = modusCheckbox.classBySize.get('small');
    expect(className).toEqual('small');
  });

  it('should default to unchecked', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.checked).toBeFalsy();
  });

  it('should default to enabled', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.disabled).toBeFalsy();
  });

  it('should default to size medium', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.size).toBe('medium');
  });

  it('should default to no label', async () => {
    const modusCheckbox = new ModusCheckbox();
    expect(modusCheckbox.label).toBeFalsy();
  });
});
