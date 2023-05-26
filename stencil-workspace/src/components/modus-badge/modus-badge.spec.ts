import { newSpecPage } from '@stencil/core/testing';
import { ModusBadge } from './modus-badge';

describe('modus-badge', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusBadge],
      html: '<modus-badge></modus-badge>',
    });
    expect(root).toEqualHtml(`
      <modus-badge>
        <mock:shadow-root>
          <div class="badge color-primary size-medium type-default" role="status">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </modus-badge>
    `);
  });

  it('renders with slot value', async () => {
    const { root } = await newSpecPage({
      components: [ModusBadge],
      html: '<modus-badge>Badge</modus-badge>',
    });
    expect(root).toEqualHtml(`
      <modus-badge>
        <mock:shadow-root>
          <div class="badge color-primary size-medium type-default" role="status">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Badge
      </modus-badge>
    `);
  });

  it('should get the correct class by color', async () => {
    const modusBadge = new ModusBadge();
    let className = modusBadge.classByColor.get(modusBadge.color);
    expect(className).toEqual('color-primary');

    className = modusBadge.classByColor.get('danger');
    expect(className).toEqual('color-danger');

    className = modusBadge.classByColor.get('dark');
    expect(className).toEqual('color-dark');

    className = modusBadge.classByColor.get('secondary');
    expect(className).toEqual('color-secondary');

    className = modusBadge.classByColor.get('success');
    expect(className).toEqual('color-success');

    className = modusBadge.classByColor.get('tertiary');
    expect(className).toEqual('color-tertiary');

    className = modusBadge.classByColor.get('warning');
    expect(className).toEqual('color-warning');
  });

  it('should get the correct class by size', async () => {
    const modusBadge = new ModusBadge();
    let className = modusBadge.classBySize.get(modusBadge.size);
    expect(className).toEqual('size-medium');

    className = modusBadge.classBySize.get('small');
    expect(className).toEqual('size-small');

    className = modusBadge.classBySize.get('large');
    expect(className).toEqual('size-large');
  });

  it('should get the correct class by type', async () => {
    const modusBadge = new ModusBadge();
    let className = modusBadge.classByType.get(modusBadge.type);
    expect(className).toEqual('type-default');

    className = modusBadge.classByType.get('counter');
    expect(className).toEqual('type-counter');

    className = modusBadge.classByType.get('text');
    expect(className).toEqual('type-text');
  });
});
