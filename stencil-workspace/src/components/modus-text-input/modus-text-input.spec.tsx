import { newSpecPage } from '@stencil/core/testing';
import { ModusTextInput } from './modus-text-input';

describe('modus-text-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input>
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium">
                    <input class="has-right-icon" type="text" tabindex="0">
                    <span class="icons"></span>
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusTextInput = new ModusTextInput();
    let className = modusTextInput.classBySize.get(modusTextInput.size);
    expect(className).toEqual('medium');

    className = modusTextInput.classBySize.get('large');
    expect(className).toEqual('large');
  });

  it('should default to clearable', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.clearable).toBeTruthy();
  });

  it('should default to enabled', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.disabled).toBeFalsy();
  });

  it('should default to no error text', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.errorText).toBeFalsy();
  });

  it('should default to no valid text', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.validText).toBeFalsy();
  });

  it('should default to no helper text', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.helperText).toBeFalsy();
  });

  it('should default to no inputmode', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.inputmode).toBeFalsy();
  });

  it('should default to size medium', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.size).toEqual('medium');
  });

  it('should default with no search icon', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.includeSearchIcon).toBeFalsy();
  });

  it('should default with no label', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.label).toBeFalsy();
  });

  it('should default with no placeholder', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.placeholder).toBeFalsy();
  });

  it('should default to not required', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.required).toBeFalsy();
  });

  it('should default with no value', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.value).toBeFalsy();
  });

  it('should not default with minimum length validation', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.minLength).toBeFalsy();
  });

  it('should not default with maximum length validation', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.minLength).toBeFalsy();
  });
});
