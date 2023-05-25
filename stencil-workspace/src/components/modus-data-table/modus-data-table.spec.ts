import { newSpecPage } from '@stencil/core/testing';
import { ModusDataTable } from './modus-data-table';
import { ModusDataTableUtilities } from './modus-data-table.utilities';
import { TColumn, TRow } from './modus-data-table.models';
import { convertToSingleSpaceTitleCase } from './parts/modus-data-table-header';

describe('modus-data-table', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusDataTable],
      html: '<modus-data-table></modus-data-table>',
    });
    expect(root).toEqualHtml(`
      <modus-data-table>
        <mock:shadow-root>
          <table class="borderless cell-borderless size-large">
            <colgroup></colgroup>
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </mock:shadow-root>
      </modus-data-table>
    `);
  });

  it('should get the correct class by size', async () => {
    const table = new ModusDataTable();
    let className = table.classBySize.get(table.displayOptions.size);
    expect(className).toEqual('size-large');

    className = table.classBySize.get('small');
    expect(className).toEqual('size-small');
  });

  it('should convert column prop as string array to TColumn array', async () => {
    const cols: TColumn[] = ModusDataTableUtilities.convertToTColumns(['name', 'age']);
    expect(cols).toEqual([
      { align: 'left', display: 'name', id: 'name', readonly: false, width: '' },
      { align: 'left', display: 'age', id: 'age', readonly: false, width: '' },
    ]);
  });

  it('should convert column prop as TColumn array to TColumn array', async () => {
    const cols: TColumn[] = ModusDataTableUtilities.convertToTColumns([{ display: 'name' }, { display: 'age' }]);
    expect(cols).toEqual([
      { align: 'left', display: 'name', id: 'name', readonly: false, width: '' },
      { align: 'left', display: 'age', id: 'age', readonly: false, width: '' },
    ]);
  });

  it('should convert column prop as TColumn (with ids) array to TColumn array', async () => {
    const cols: TColumn[] = ModusDataTableUtilities.convertToTColumns([
      { id: 'name id', display: 'name' },
      { id: 'age id', display: 'age' },
    ]);
    expect(cols).toEqual([
      { align: 'left', display: 'name', id: 'name id', readonly: false, width: '' },
      { align: 'left', display: 'age', id: 'age id', readonly: false, width: '' },
    ]);
  });

  it('should convert row prop as string array to TRow array', async () => {
    const cols: TColumn[] = [
      { align: 'left', display: 'Name', id: 'name', readonly: true, width: '' },
      { align: 'left', display: 'Age', id: 'age', readonly: true, width: '' },
    ];
    const rows = ModusDataTableUtilities.convertToTRows(
      [
        ['John', 32],
        ['Joe', 28],
      ],
      cols
    );
    expect(rows).toEqual([
      { _id: '', _selected: false, name: 'John', age: 32 },
      { _id: '', _selected: false, name: 'Joe', age: 28 },
    ]);
  });

  it('should convert row prop as TRow array to TRow array', async () => {
    const cols: TColumn[] = [
      { align: 'left', display: 'Name', id: 'name', readonly: true, width: '' },
      { align: 'left', display: 'Age', id: 'age', readonly: true, width: '' },
    ];
    const rows = ModusDataTableUtilities.convertToTRows(
      [
        { name: 'John', age: 32 },
        { name: 'Joe', age: 28 },
      ],
      cols
    );
    expect(rows).toEqual([
      { name: 'John', age: 32 },
      { name: 'Joe', age: 28 },
    ]);
  });

  it('should sort data', async () => {
    const rows = [
      { name: 'John', age: 32 },
      { name: 'Bo', age: 56 },
      { name: 'Jane', age: 16 },
    ];

    const ascRowsByName = ModusDataTableUtilities.sortData(rows, 'name', 'asc');
    const descRowsByName = ModusDataTableUtilities.sortData(rows, 'name', 'desc');
    expect(ascRowsByName).toEqual([
      { name: 'Bo', age: 56 },
      { name: 'Jane', age: 16 },
      { name: 'John', age: 32 },
    ]);
    expect(descRowsByName).toEqual([
      { name: 'John', age: 32 },
      { name: 'Jane', age: 16 },
      { name: 'Bo', age: 56 },
    ]);

    const ascRowsByAge = ModusDataTableUtilities.sortData(rows, 'age', 'asc');
    const descRowsByAge = ModusDataTableUtilities.sortData(rows, 'age', 'desc');
    expect(ascRowsByAge).toEqual([
      { name: 'Jane', age: 16 },
      { name: 'John', age: 32 },
      { name: 'Bo', age: 56 },
    ]);
    expect(descRowsByAge).toEqual([
      { name: 'Bo', age: 56 },
      { name: 'John', age: 32 },
      { name: 'Jane', age: 16 },
    ]);
  });

  it('should sort data links', async () => {
    const rows = [
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' } },
    ];

    const ascLinks = ModusDataTableUtilities.sortData(rows as TRow[], 'link', 'asc');
    const descLinks = ModusDataTableUtilities.sortData(rows as TRow[], 'link', 'desc');
    expect(ascLinks).toEqual([
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' } },
    ]);
    expect(descLinks).toEqual([
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' } },
    ]);
  });

  it('should sort data badges', async () => {
    const rows = [
      { badge: { text: 'Badge C', _type: 'badge' } },
      { badge: { text: 'Badge A', _type: 'badge' } },
      { badge: { text: 'Badge B', _type: 'badge' } },
    ];

    const ascBadges = ModusDataTableUtilities.sortData(rows as TRow[], 'badge', 'asc');
    const descBadges = ModusDataTableUtilities.sortData(rows as TRow[], 'badge', 'desc');
    expect(ascBadges).toEqual([
      { badge: { text: 'Badge A', _type: 'badge' } },
      { badge: { text: 'Badge B', _type: 'badge' } },
      { badge: { text: 'Badge C', _type: 'badge' } },
    ]);
    expect(descBadges).toEqual([
      { badge: { text: 'Badge C', _type: 'badge' } },
      { badge: { text: 'Badge B', _type: 'badge' } },
      { badge: { text: 'Badge A', _type: 'badge' } },
    ]);
  });

  it('should convert column header to single space title case', async () => {
    // Function brought in from data table header component.
    const headerText = convertToSingleSpaceTitleCase('some   TItLe wiTh  Weird Spacing AND   CasING');
    expect(headerText).toEqual('Some Title With Weird Spacing And Casing');
  });
});
