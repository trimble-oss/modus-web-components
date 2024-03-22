import { newSpecPage } from '@stencil/core/testing';
import { ModusTextInput } from './modus-text-input';

describe('modus-text-input', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input>
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium" part="input-container">
                    <input class="text-align-left" id="mwc_id_0_text_input" type="text" tabindex="0">
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('renders password', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input type="password"></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input type="password">
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium" part="input-container">
                <input class="text-align-left" id="mwc_id_1_text_input" tabindex="0" type="password">
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

  it('should not default to clearable', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.clearable).toBeFalsy();
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

  it('should default to input type', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.type).toBe('text');
    expect(modusTextInput.inputAttributeName).toBe('input');
  });

  it('should add a "textarea" tag when type is "textarea"', () => {
    const modusTextInput = new ModusTextInput();
    modusTextInput.type = 'textarea';
    expect(modusTextInput.inputAttributeName).toBe('textarea');
  });

  it('should default to not including the "rows" attribute', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.numRows).toBe(null);
  });

  it('should default "rows" to 5 when big', async () => {
    const modusTextInput = new ModusTextInput();
    modusTextInput.type = 'textarea';
    expect(modusTextInput.numRows).toBe(5);
  });

  it('should default to not including the "style" attribute on the input container', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.inputContainerStyle).toBe(null);
  });

  it('should return a correct size when "type" is textarea', async () => {
    const modusTextInput = new ModusTextInput();
    modusTextInput.type = 'textarea';
    expect(modusTextInput.inputContainerStyle.height).toBe('6rem');
    modusTextInput.rows = 2;
    expect(modusTextInput.inputContainerStyle.height).toBe('3rem');
  });
});
