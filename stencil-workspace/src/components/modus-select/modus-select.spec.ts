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
            <span class="input-container">
            <select class="medium" id="mwc_id_0_select" part="input">
              <option disabled="" selected="" value="">
                Please Select
              </option>
            </select>
            </span>
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
});
