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
});
