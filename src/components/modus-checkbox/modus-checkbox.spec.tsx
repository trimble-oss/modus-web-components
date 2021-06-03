import { newSpecPage } from '@stencil/core/testing';
import { ModusCheckbox } from './modus-checkbox';

describe('modus-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusCheckbox],
      html: `<modus-checkbox></modus-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-checkbox>
        <mock:shadow-root>
            <div class="modus-checkbox medium">
                <div class="checkbox">
                    <svg fill="none" height="10" viewBox="0 0 12 10" width="12">
                        <path d="M3.81353 7.21774L0.968732 4.37294L0 5.33485L3.81353 9.14838L12 0.96191L11.0381 0L3.81353 7.21774Z" fill="white"></path>
                    </svg>
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
