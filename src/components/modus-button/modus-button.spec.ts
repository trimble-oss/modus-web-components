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
          <button class="size-medium color-tertiary style-fill" role="button">
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
          <button class="size-medium color-tertiary style-fill" role="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Button
      </modus-button>
    `);
  });

  it('should get the correct class by buttonStyle', async () => {
    const modusButton = new ModusButton();
    let className = modusButton.classByButtonStyle.get(modusButton.buttonStyle);
    expect(className).toEqual('style-fill');

    className = modusButton.classByButtonStyle.get('borderless');
    expect(className).toEqual('style-borderless');

    className = modusButton.classByButtonStyle.get('outline');
    expect(className).toEqual('style-outline');
  });

  it('should get the correct class by color', async () => {
    const modusButton = new ModusButton();
    let className = modusButton.classByColor.get(modusButton.color);
    expect(className).toEqual('color-tertiary');

    className = modusButton.classByColor.get('danger');
    expect(className).toEqual('color-danger');

    className = modusButton.classByColor.get('primary');
    expect(className).toEqual('color-primary');

    className = modusButton.classByColor.get('secondary');
    expect(className).toEqual('color-secondary');

    className = modusButton.classByColor.get('warning');
    expect(className).toEqual('color-warning');
  });

  it('should get the correct class by size', async () => {
    const modusButton = new ModusButton();
    let className = modusButton.classBySize.get(modusButton.size);
    expect(className).toEqual('size-medium');

    className = modusButton.classBySize.get('small');
    expect(className).toEqual('size-small');

    className = modusButton.classBySize.get('large');
    expect(className).toEqual('size-large');
  });
});
