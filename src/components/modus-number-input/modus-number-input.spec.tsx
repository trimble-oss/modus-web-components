jest.mock('../../utils/utils', () => ({
  generateRandomNumber: () => 12345,
}));

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
            <div aria-describedby="inputDesc12345" aria-labelledby="inputLabel12345" class="modus-number-input">
              <div class="input-container medium">
                <input type="number">
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
