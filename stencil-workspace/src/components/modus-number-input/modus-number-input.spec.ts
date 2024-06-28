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
            <div class="input-container medium" part="input-container">
              <input class="text-align-left" id="mwc_id_0_number-input" inputmode="decimal" tabindex="0" type="text" value="">
                <div class="value-adjusters">
                    <div class="increment">
                      <svg class="icon-caret-up" fill="currentColor" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="m11.4 9.26-4.22 4.58c-.43.46-.06 1.16.6 1.16h8.43c.66 0 1.03-.7.6-1.16l-4.22-4.58a.833.833 0 0 0-1.2 0Z"></path>
                      </svg>
                    </div>
                    <div class="decrement">
                      <svg class="icon-caret-down" fill="currentColor" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12.6 14.74 4.22-4.58c.43-.46.06-1.16-.6-1.16H7.78c-.66 0-1.03.7-.6 1.16l4.22 4.58c.31.34.89.34 1.2 0"></path>
                      </svg>
                    </div>
                </div>
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
