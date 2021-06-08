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
          <div class='alert undefined'>
            <div class='message'></div>
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

    className = modusAlert.classByType.get('info-gray');
    expect(className).toEqual('type-info-gray');

    className = modusAlert.classByType.get('info-gray-dark');
    expect(className).toEqual('type-info-gray-dark');

    className = modusAlert.classByType.get('success');
    expect(className).toEqual('type-success');

    className = modusAlert.classByType.get('warning');
    expect(className).toEqual('type-warning');
  });

  it('should find valid infoType', async () => {
    const modusAlert = new ModusAlert();
    let found = modusAlert.infoTypes.includes('info');
    expect(found).toEqual(true);

    found = modusAlert.infoTypes.includes('info-gray');
    expect(found).toEqual(true);

    found = modusAlert.infoTypes.includes('info-gray-dark');
    expect(found).toEqual(true);
  });
});
