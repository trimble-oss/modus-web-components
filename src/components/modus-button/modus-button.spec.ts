import { newSpecPage } from '@stencil/core/testing';
import { ModusButton } from './modus-button';

describe('modus-button', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusButton],
      html: '<modus-button></modus-button>',
    });
    expect(root).toEqualHtml(`
      <modus-button>
        <mock:shadow-root>
          <button class="medium tertiary">
            <slot></slot>
          </button>
        </mock:shadow-root>
      </modus-button>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusButton],
      html: `<modus-button>Button</modus-button>`,
    });
    expect(root).toEqualHtml(`
      <modus-button>
        <mock:shadow-root>
          <button class="medium tertiary">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Button
      </modus-button>
    `);
  });

  it('should get the correct class by type', async () => {
    const modusButton = new ModusButton();
    let className = modusButton.classByType.get(modusButton.type);
    expect(className).toEqual('tertiary');

    className = modusButton.classByType.get('cta');
    expect(className).toEqual('cta');

    className = modusButton.classByType.get('primary');
    expect(className).toEqual('primary');

    className = modusButton.classByType.get('secondary');
    expect(className).toEqual('secondary');

    className = modusButton.classByType.get('warning');
    expect(className).toEqual('warning');
  });

  it('should get the correct class by size', async () => {
    const modusButton = new ModusButton();
    let className = modusButton.classBySize.get(modusButton.size);
    expect(className).toEqual('medium');

    className = modusButton.classBySize.get('small');
    expect(className).toEqual('small');

    className = modusButton.classBySize.get('large');
    expect(className).toEqual('large');
  });
});
