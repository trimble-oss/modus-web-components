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

  it('renders autocapitalize', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input autocapitalize="words"></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input autocapitalize="words">
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium" part="input-container">
                <input class="text-align-left" id="mwc_id_2_text_input" tabindex="0" autocapitalize="words" type="text">
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('renders autocorrect', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input autocorrect="on"></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input autocorrect="on">
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium" part="input-container">
                <input class="text-align-left" id="mwc_id_3_text_input" tabindex="0" autocorrect="on" type="text">
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('renders enterkeyhint', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input enterkeyhint="done"></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input enterkeyhint="done">
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium" part="input-container">
                <input class="text-align-left" id="mwc_id_4_text_input" tabindex="0" enterkeyhint="done" type="text">
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('renders spellcheck', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: '<modus-text-input spellcheck></modus-text-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input spellcheck>
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="input-container medium" part="input-container">
                <input class="text-align-left" id="mwc_id_5_text_input" tabindex="0" spellcheck type="text">
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('should set autocorrect on the input to "on" when "true" is passed in', async () => {
    const modusTextInput = new ModusTextInput();
    modusTextInput.autocorrect = true;
    expect(modusTextInput.inputAutocorrect).toEqual('on');
  });

  it('should set autocorrect on the input to "off" when "false" is passed in', async () => {
    const modusTextInput = new ModusTextInput();
    modusTextInput.autocorrect = false;
    expect(modusTextInput.inputAutocorrect).toEqual('off');
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

  it('should default with no pattern', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.pattern).toBeFalsy();
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
