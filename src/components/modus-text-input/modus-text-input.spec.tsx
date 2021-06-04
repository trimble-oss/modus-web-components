import { newSpecPage } from '@stencil/core/testing';
import { ModusTextInput } from './modus-text-input';

describe('modus-text-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusTextInput],
      html: `<modus-text-input></modus-text-input>`,
    });
    expect(page.root).toEqualHtml(`
      <modus-text-input>
        <mock:shadow-root>
            <div class="modus-text-input">
                <div class="label-container"></div>
                <div class="input-container">
                    <input type="text">
                    <span class="modus-icons"></span>
                </div>
            </div>
        </mock:shadow-root>
      </modus-text-input>
    `);
  });

  it('should default to clearable', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.clearable).toBeTruthy();
  });

  it('should default to enabled', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.disabled).toBeFalsy();
  });

  it('should default to errorless', async () => {
    const modusTextInput = new ModusTextInput();
    expect(modusTextInput.error).toBeFalsy();
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
});
