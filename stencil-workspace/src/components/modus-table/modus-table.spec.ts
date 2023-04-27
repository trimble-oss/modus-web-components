import { newSpecPage } from '@stencil/core/testing';
import { ModusTable } from './modus-table';
import { ModusTableUtilities } from './modus-table.utilities';
import { TColumn, TRow } from './modus-table.models';
import { convertToSingleSpaceTitleCase } from './parts/modus-table-header';

describe('modus-table', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusTable],
      html: '<modus-table></modus-table>',
    });
    expect(root).toEqualHtml(`
      <modus-table>
        <mock:shadow-root>
          <table class="borderless cell-borderless size-large">
            <colgroup></colgroup>
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </mock:shadow-root>
      </modus-table>
    `);
  });

  it('should get the correct class by size', async () => {
    const table = new ModusTable();
    let className = table.classBySize.get(table.displayOptions.size);
    expect(className).toEqual('size-large');

    className = table.classBySize.get('small');
    expect(className).toEqual('size-small');
  });

  it('should convert column prop as string array to TColumn array', async () => {
    const cols: TColumn[] = ModusTableUtilities.convertToTColumns(['name', 'age']);
    expect(cols).toEqual([
        { align: 'left', display: 'name', id: 'name', readonly: false, width: '' },
        { align: 'left', display: 'age', id: 'age', readonly: false, width: '' }
      ]
    );
  });

  it('should convert column prop as TColumn array to TColumn array', async () => {
    const cols: TColumn[] = ModusTableUtilities.convertToTColumns([
      { display: 'name' },
      { display: 'age' }
    ]);
    expect(cols).toEqual([
        { align: 'left', display: 'name', id: 'name', readonly: false, width: '' },
        { align: 'left', display: 'age', id: 'age', readonly: false, width: '' }
      ]
    );
  });

  it('should convert column prop as TColumn (with ids) array to TColumn array', async () => {
    const cols: TColumn[] = ModusTableUtilities.convertToTColumns([
      { id: 'name id', display: 'name' },
      { id: 'age id', display: 'age' }
    ]);
    expect(cols).toEqual([
        { align: 'left', display: 'name', id: 'name id', readonly: false, width: '' },
        { align: 'left', display: 'age', id: 'age id', readonly: false, width: '' }
      ]
    );
  });

  it('should convert row prop as string array to TRow array', async () => {
    const cols: TColumn[] = [
      { align: 'left', display: 'Name', id: 'name', readonly: true, width: '' },
      { align: 'left', display: 'Age', id: 'age', readonly: true, width: '' }
    ];
    const rows = ModusTableUtilities.convertToTRows([['John', 32], ['Joe', 28]], cols);
    expect(rows).toEqual([
      { _id: '', _selected: false, name: 'John', age: 32 },
      { _id: '', _selected: false, name: 'Joe', age: 28 }
    ]);
  });

  it('should convert row prop as TRow array to TRow array', async () => {
    const cols: TColumn[] = [
      { align: 'left', display: 'Name', id: 'name', readonly: true, width: '' },
      { align: 'left', display: 'Age', id: 'age', readonly: true, width: '' }
    ];
    const rows = ModusTableUtilities.convertToTRows([
      { name: 'John', age: 32 },
      { name: 'Joe', age: 28 }
    ], cols);
    expect(rows).toEqual([
      { name: 'John', age: 32 },
      { name: 'Joe', age: 28 }
    ]);
  });

  it('should sort data', async () => {
    const rows = [
      { name: 'John', age: 32 },
      { name: 'Bo', age: 56 },
      { name: 'Jane', age: 16 },
    ];

    const ascRowsByName = ModusTableUtilities.sortData(rows, 'name', 'asc');
    const descRowsByName = ModusTableUtilities.sortData(rows, 'name', 'desc');
    expect(ascRowsByName).toEqual([{ name: 'Bo', age: 56 }, { name: 'Jane', age: 16 }, { name: 'John', age: 32 }]);
    expect(descRowsByName).toEqual([{ name: 'John', age: 32 }, { name: 'Jane', age: 16 }, { name: 'Bo', age: 56 }]);

    const ascRowsByAge = ModusTableUtilities.sortData(rows, 'age', 'asc');
    const descRowsByAge = ModusTableUtilities.sortData(rows, 'age', 'desc');
    expect(ascRowsByAge).toEqual([{ name: 'Jane', age: 16 }, { name: 'John', age: 32 }, { name: 'Bo', age: 56 }]);
    expect(descRowsByAge).toEqual([{ name: 'Bo', age: 56 }, { name: 'John', age: 32 }, { name: 'Jane', age: 16 }]);
  });

  it('should sort data links', async () => {
    const rows = [
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' }},
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' }},
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' }}
    ];

    const ascLinks = ModusTableUtilities.sortData(rows as TRow[], 'link', 'asc');
    const descLinks = ModusTableUtilities.sortData(rows as TRow[], 'link', 'desc');
    expect(ascLinks).toEqual([
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' }},
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' }},
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' }}
    ]);
    expect(descLinks).toEqual([
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' }},
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' }},
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' }}
    ]);
  });

  it('should sort data badges', async () => {
    const rows = [
      { badge: { text: 'Badge C', _type: 'badge' }},
      { badge: { text: 'Badge A', _type: 'badge' }},
      { badge: { text: 'Badge B', _type: 'badge' }}
    ];

    const ascBadges = ModusTableUtilities.sortData(rows as TRow[], 'badge', 'asc');
    const descBadges = ModusTableUtilities.sortData(rows as TRow[], 'badge', 'desc');
    expect(ascBadges).toEqual([
      { badge: { text: 'Badge A', _type: 'badge' }},
      { badge: { text: 'Badge B', _type: 'badge' }},
      { badge: { text: 'Badge C', _type: 'badge' }}
    ]);
    expect(descBadges).toEqual([
      { badge: { text: 'Badge C', _type: 'badge' }},
      { badge: { text: 'Badge B', _type: 'badge' }},
      { badge: { text: 'Badge A', _type: 'badge' }}
    ]);
  });

  it('should convert column header to single space title case', async () => {
    // Function brought in from data table header component.
    const headerText = convertToSingleSpaceTitleCase('some   TItLe wiTh  Weird Spacing AND   CasING');
    expect(headerText).toEqual('Some Title With Weird Spacing And Casing');
  });
});
