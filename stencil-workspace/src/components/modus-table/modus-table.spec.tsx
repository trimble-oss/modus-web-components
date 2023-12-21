import { newSpecPage } from '@stencil/core/testing';
import { ModusTable } from './modus-table';

describe('modus-table', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusTable],
      html: '<modus-table></modus-table>',
    });

    const table = root.shadowRoot.querySelector('table');

    expect(table).toBeTruthy();
  });

  it('should get the correct class by density', async () => {
    const modusTable = new ModusTable();
    let className = modusTable.classByDensity.get(modusTable.density);
    expect(className).toEqual('density-relaxed');

    className = modusTable.classByDensity.get('comfortable');
    expect(className).toEqual('density-comfortable');

    className = modusTable.classByDensity.get('compact');
    expect(className).toEqual('density-compact');
  });
});
