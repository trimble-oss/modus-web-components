import { newSpecPage } from '@stencil/core/testing';
import { ModusAlert } from './modus-alert';

describe('modus-alert', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusAlert],
      html: '<modus-alert type="none"></modus-alert>',
    });
    expect(root).toEqualHtml(`
      <modus-alert type='none'>
        <mock:shadow-root>
          <div class='alert' role="alert">
            <div class="icon"></div>
            <div class='message'>
            <slot></slot>
            </div>
            <div class="alert-buttons-container"></div>
          </div>
        </mock:shadow-root>
      </modus-alert>
    `);
  });

  it('should get the correct class by type', async () => {
    const modusAlert = new ModusAlert();
    let className = modusAlert.classByType.get(modusAlert.type);
    expect(className).toEqual('type-info');

    className = modusAlert.classByType.get('error');
    expect(className).toEqual('type-error');

    className = modusAlert.classByType.get('success');
    expect(className).toEqual('type-success');

    className = modusAlert.classByType.get('warning');
    expect(className).toEqual('type-warning');
  });

  it('should find valid infoType', async () => {
    const modusAlert = new ModusAlert();
    const found = modusAlert.infoTypes.includes('info');
    expect(found).toEqual(true);
  });
});
