import { newSpecPage } from '@stencil/core/testing';
import { ModusNumberInput } from './modus-number-input';

describe('modus-number-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusNumberInput],
      html: '<modus-number-input></modus-number-input>',
    });
    expect(page.root).toEqualHtml(`
      <modus-number-input>
        <mock:shadow-root>
          <div class="modus-number-input">
            <div class="input-container medium">
              <input tabindex="0" type="number">
            </div>
          </div>
        </mock:shadow-root>
      </modus-number-input>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusNumberInput = new ModusNumberInput();
    let className = modusNumberInput.classBySize.get(modusNumberInput.size);
    expect(className).toEqual('medium');

    className = modusNumberInput.classBySize.get('large');
    expect(className).toEqual('large');
  });
});
