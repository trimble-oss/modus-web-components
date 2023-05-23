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
          <div role="listbox">
            <div class='input-container'>
              <button class='medium' type="button">
                <div class="dropdown-text"></div>
                <svg class="icon-triangle-down" fill="none" height="12" viewBox="0 0 10 6" width="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" fill="#6A6976"></path>
                </svg>
              </button>
              <div class='dropdown-list hidden menu-medium'></div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-select>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusSelect = new ModusSelect();
    let className = modusSelect.classBySize.get(modusSelect.size);
    expect(className).toEqual('medium');

    className = modusSelect.classBySize.get('large');
    expect(className).toEqual('large');
  });

  it('should default to enabled', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.disabled).toBeFalsy();
  });

  it('should default to no error text', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.errorText).toBeFalsy();
  });

  it('should default to no valid text', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.validText).toBeFalsy();
  });

  it('should default to no helper text', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.helperText).toBeFalsy();
  });

  it('should default to size medium', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.size).toEqual('medium');
  });

  it('should default with no label', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.label).toBeFalsy();
  });

  it('should default with an initialized options array', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.options.length).toEqual(0);
  });

  it('should default to not required', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.required).toBeFalsy();
  });

  it('should default with no value', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.value).toBeFalsy();
  });

  it('should default to medium dropdown menu size', async () => {
    const modusSelect = new ModusSelect();
    expect(modusSelect.menuSize).toEqual('medium');
  });
});
