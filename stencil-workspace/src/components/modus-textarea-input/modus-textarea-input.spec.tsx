import { newSpecPage } from '@stencil/core/testing';
import { ModusTextareaInput } from './modus-textarea-input';

describe('modus-textarea-input', () => {
  it('renders default', async () => {
    const page = await newSpecPage({
      components: [ModusTextareaInput],
      html: '<modus-textarea-input></modus-textarea-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-textarea-input>
        <mock:shadow-root>
            <div class="modus-textarea-input">
                <div class="input-container medium" part="input-container">
                    <textarea class="text-align-left" id="mwc_id_0_textarea_input" rows="3" tabindex="0">
                    </textarea>
                </div>
            </div>
        </mock:shadow-root>
      </modus-textarea-input>
    `);
  });

  it('renders autocorrect', async () => {
    const page = await newSpecPage({
      components: [ModusTextareaInput],
      html: '<modus-textarea-input autocorrect="on"></modus-textarea-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-textarea-input autocorrect="on">
        <mock:shadow-root>
            <div class="modus-textarea-input">
                <div class="input-container medium" part="input-container">
                <textarea class="text-align-left" id="mwc_id_1_textarea_input" rows="3" tabindex="0" autocorrect="on">
                </textarea>
                </div>
            </div>
        </mock:shadow-root>
      </modus-textarea-input>
    `);
  });

  it('renders enterkeyhint', async () => {
    const page = await newSpecPage({
      components: [ModusTextareaInput],
      html: '<modus-textarea-input enterkeyhint="done"></modus-textarea-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-textarea-input enterkeyhint="done">
        <mock:shadow-root>
            <div class="modus-textarea-input">
                <div class="input-container medium" part="input-container">
                <textarea class="text-align-left" id="mwc_id_2_textarea_input" rows="3" tabindex="0" enterkeyhint="done">
                </textarea>
                </div>
            </div>
        </mock:shadow-root>
      </modus-textarea-input>
    `);
  });

  it('renders spellcheck', async () => {
    const page = await newSpecPage({
      components: [ModusTextareaInput],
      html: '<modus-textarea-input spellcheck></modus-textarea-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-textarea-input spellcheck>
        <mock:shadow-root>
            <div class="modus-textarea-input">
                <div class="input-container medium" part="input-container">
                <textarea class="text-align-left" id="mwc_id_3_textarea_input" rows="3" tabindex="0" spellcheck>
                </textarea>
                </div>
            </div>
        </mock:shadow-root>
      </modus-textarea-input>
    `);
  });

  it('should set autocorrect on the input to "on" when "true" is passed in', async () => {
    const modusTextInput = new ModusTextareaInput();
    modusTextInput.autocorrect = true;
    expect(modusTextInput.inputAutocorrect).toEqual('on');
  });

  it('should set autocorrect on the input to "off" when "false" is passed in', async () => {
    const modusTextInput = new ModusTextareaInput();
    modusTextInput.autocorrect = false;
    expect(modusTextInput.inputAutocorrect).toEqual('off');
  });

  it('should get the correct class by size', async () => {
    const modusTextInput = new ModusTextareaInput();
    let className = modusTextInput.classBySize.get(modusTextInput.size);
    expect(className).toEqual('medium');

    className = modusTextInput.classBySize.get('large');
    expect(className).toEqual('large');
  });

  it('should not default to clearable', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.clearable).toBeFalsy();
  });

  it('should default to enabled', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.disabled).toBeFalsy();
  });

  it('should default to no error text', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.errorText).toBeFalsy();
  });

  it('should default to no valid text', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.validText).toBeFalsy();
  });

  it('should default to no helper text', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.helperText).toBeFalsy();
  });

  it('should default to size medium', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.size).toEqual('medium');
  });

  it('should default with no label', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.label).toBeFalsy();
  });

  it('should default with no placeholder', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.placeholder).toBeFalsy();
  });

  it('should default to not required', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.required).toBeFalsy();
  });

  it('should default with no value', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.value).toBeFalsy();
  });

  it('should not default with minimum length validation', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.minLength).toBeFalsy();
  });

  it('should not default with maximum length validation', async () => {
    const modusTextInput = new ModusTextareaInput();
    expect(modusTextInput.minLength).toBeFalsy();
  });
});
