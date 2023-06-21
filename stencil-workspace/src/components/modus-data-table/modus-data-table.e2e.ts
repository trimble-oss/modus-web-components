import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { IconSortAZ } from '../icons/icon-sort-a-z';
import { IconSortZA } from '../icons/icon-sort-z-a';

describe('modus-data-table', () => {
  let page: E2EPage;
  const columns = [
    {
      header: 'First Names',
      accessorKey: 'firstName',
      id: 'first-name',
      dataType: 'text',
    },
  ];
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');
  });

  it('renders', async () => {
    const element = await page.find('modus-data-table');
    expect(element).toHaveClass('hydrated');
  });
  it('renders changes to column prop', async () => {
    const component = await page.find('modus-data-table');
    let header = await page.findAll('modus-data-table >>> th');
    expect(header.length).toBe(0);

    component.setProperty('columns', [{ header: 'Column 1' }]);
    await page.waitForChanges();
    header = await page.findAll('modus-data-table >>> th');
    expect(header.length).toBe(1);
    expect(header[0].textContent).toBe('Column 1');
  });

  it('renders changes to data prop', async () => {
    const component = await page.find('modus-data-table');
    let row = await page.findAll('modus-data-table >>> td');
    expect(row.length).toBe(0);

    component.setProperty('columns', [
      { header: 'First Name', accessorKey: 'firstName' },
    ]);
    component.setProperty('data', [{ firstName: 'Gordon' }]);

    await page.waitForChanges();
    row = await page.findAll('modus-data-table >>> td');
    expect(row.length).toBe(1);
    expect(row[0].textContent).toBe('Gordon');
  });

  it('renders with object columns and data', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    let row = await page.find('modus-data-table >>> td');
    expect(col).toBeFalsy();
    expect(row).toBeFalsy();

    component.setProperty('columns', [{ header: 'Col1' }]);
    component.setProperty('data', [{ col1: 'Val1' }]);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th');
    row = await page.find('modus-data-table >>> td');
    expect(col).toBeTruthy();
    expect(row).toBeTruthy();
  });

  it('renders with sort icon when sort is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', [
      {
        header: 'First Names',
        accessorKey: 'firstName',
        id: 'first-name',
        dataType: 'text',
      },
    ]);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('sort', false);
    await page.waitForChanges();
    let sortContainer = await page.find('modus-data-table >>> .can-sort');
    expect(sortContainer).toBeNull();

    component.setProperty('sort', true);
    await page.waitForChanges();

    sortContainer = await page.find('modus-data-table >>> .can-sort');
    expect(sortContainer).not.toBeNull();
  });

  it('renders with sort icon when showSortIconOnHover is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', columns);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('sort', true);
    component.setProperty('showSortIconOnHover', true);
    await page.waitForChanges();

    const header = await page.find('modus-data-table >>> th');
    await header.hover();
    await page.waitForChanges();

    const sortContainer = await page.find('modus-data-table >>> .can-sort');
    expect(sortContainer).not.toBeNull();
  });

  it('should output sort event on sort icon click with sort enabled', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [
      {
        header: 'First Name',
        accessorKey: 'firstName',
        id: 'first-name',
        dataType: 'text',
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        id: 'last-name',
        dataType: 'text',
      },
      { header: 'Age', accessorKey: 'age', id: 'age', dataType: 'integer' },
      {
        header: 'Visits',
        accessorKey: 'visits',
        id: 'visits',
        dataType: 'integer',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        id: 'status',
        dataType: 'text',
      },
      {
        header: 'Profile Progress',
        accessorKey: 'progress',
        id: 'progress',
        dataType: 'integer',
      },
    ]);
    component.setProperty('data', [
      {
        firstName: 'Agnes',
        lastName: 'Breitenberg',
        age: 34,
        visits: 639,
        progress: 84,
        status: 'single',
      },
      {
        firstName: 'Elliott',
        lastName: 'Breitenberg',
        age: 40,
        visits: 39,
        progress: 54,
        status: 'single',
      },
    ]);
    component.setProperty('sort', true);
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sortChange');

    const header = await page.find('modus-data-table >>> .sort-icons');
    await header.click();
    await header.click();

    expect(sortEvent).toHaveReceivedEventTimes(2);
  });

  it('should output sort data on sort icon click with sort enabled', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', columns);
    component.setProperty('data', [
      {
        firstName: 'Elliott',
      },
      {
        firstName: 'Agnes',
      },
      {
        firstName: 'Bob',
      },
    ]);
    component.setProperty('sort', true);
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sortChange');

    const header = await page.find('modus-data-table >>> .sort-icons');
    await header.click();

    let tableData = await page.findAll('modus-data-table >>> td');
    let tableDataTexts = await Promise.all(
      tableData.map((td) => td.textContent)
    );
    // Ascending sort
    expect(tableDataTexts[0]).toEqual('Agnes');
    expect(tableDataTexts[1]).toEqual('Bob');
    expect(tableDataTexts[2]).toEqual('Elliott');

    await header.click();
    await page.waitForChanges();

    // Descending sort
    tableData = await page.findAll('modus-data-table >>> td');
    tableDataTexts = await Promise.all(tableData.map((td) => td.textContent));

    expect(tableDataTexts[0]).toEqual('Elliott');
    expect(tableDataTexts[1]).toEqual('Bob');
    expect(tableDataTexts[2]).toEqual('Agnes');

    expect(sortEvent).toHaveReceivedEventTimes(2);
  });

  it('should output sort data on sort icon click with sort enabled', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [
      {
        header: 'Age',
        accessorKey: 'age',
        id: 'age',
        dataType: 'text',
      },
    ]);
    component.setProperty('data', [{ age: 25 }, { age: 30 }, { age: 20 }]);
    component.setProperty('sort', true);
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sortChange');

    const header = await page.find('modus-data-table >>> .sort-icons');
    await header.click();

    let tableData = await page.findAll('modus-data-table >>> td');
    let tableDataTexts = await Promise.all(
      tableData.map((td) => td.textContent)
    );
    // Ascending sort
    expect(tableDataTexts[0]).toEqual('20');
    expect(tableDataTexts[1]).toEqual('25');
    expect(tableDataTexts[2]).toEqual('30');

    await header.click();
    await page.waitForChanges();

    // Descending sort
    tableData = await page.findAll('modus-data-table >>> td');
    tableDataTexts = await Promise.all(tableData.map((td) => td.textContent));

    expect(tableDataTexts[0]).toEqual('30');
    expect(tableDataTexts[1]).toEqual('25');
    expect(tableDataTexts[2]).toEqual('20');

    expect(sortEvent).toHaveReceivedEventTimes(2);
  });

  it('check sort icon tooltip text for ascending and descending ', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', [
      {
        header: 'First Names',
        accessorKey: 'firstName',
        id: 'first-name',
        dataType: 'text',
      },
    ]);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('sort', false);
    await page.waitForChanges();

    let sortContainer = await page.find('modus-data-table >>> .can-sort');
    expect(sortContainer).toBeNull();

    component.setProperty('sort', true);
    await page.waitForChanges();

    sortContainer = await page.find('modus-data-table >>> th');
    expect(sortContainer).not.toBeNull();

    let tooltip = await sortContainer.find('modus-tooltip');
    let tooltipText = await tooltip.getProperty('text');

    expect(tooltip).not.toBeNull();

    expect(tooltipText).toEqual('Sort Ascending');

    let header = await page.find('modus-data-table >>> .sort-icons');
    await header.click();
    await page.waitForChanges();
    tooltip = await sortContainer.find('modus-tooltip');
    tooltipText = await tooltip.getProperty('text');
    expect(tooltipText).toEqual('Sorted Ascending');

    header = await page.find('modus-data-table >>> .sort-icons');
    await header.click();
    await page.waitForChanges();
    tooltip = await sortContainer.find('modus-tooltip');
    tooltipText = await tooltip.getProperty('text');
    expect(tooltipText).toEqual('Sorted Descending');
  });

  it('renders with correct sort icon when sort is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', columns);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('sort', true);
    await page.waitForChanges();

    const sortContainer = await page.find('modus-data-table >>> th');
    expect(sortContainer).not.toBeNull();

    const sortIcons = await sortContainer.findAll('span.sort-icons');

    expect(sortIcons).toHaveLength(1);

    const iconSortAZ = await sortIcons.find(IconSortAZ);

    expect(iconSortAZ).toBeTruthy();

    const header = await page.find('modus-data-table >>> .sort-icons');
    await header.click();
    await page.waitForChanges();
    const iconSortZA = await sortIcons.find(IconSortZA);
    expect(iconSortZA).toBeTruthy();
  });

  it('render pagination when pagination is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', [
      {
        header: 'First Names',
        accessorKey: 'firstName',
        id: 'first-name',
        dataType: 'text',
      },
    ]);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('pagination', false);
    await page.waitForChanges();
    let paginationContainer = await page.find(
      'modus-data-table >>> .pagination-container'
    );
    expect(paginationContainer).toBeNull();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    paginationContainer = await page.find(
      'modus-data-table >>> .pagination-container'
    );
    expect(paginationContainer).not.toBeNull();
  });

  it('check page view when pagination is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', columns);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('pagination', false);
    await page.waitForChanges();
    let paginationContainer = await page.find(
      'modus-data-table >>> .items-per-page'
    );
    expect(paginationContainer).toBeNull();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    paginationContainer = await page.find(
      'modus-data-table >>> .items-per-page'
    );
    expect(paginationContainer).not.toBeNull();
    expect(paginationContainer.textContent).toBeTruthy();
    expect(
      paginationContainer.textContent.startsWith('Page View')
    ).toBeTruthy();
  });

  it('check showing result data when pagination enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');

    const component = await page.find('modus-data-table');

    component.setProperty('columns', [
      {
        header: 'First Names',
        accessorKey: 'firstName',
        id: 'first-name',
        dataType: 'text',
      },
    ]);
    component.setProperty('data', [{ firstName: 'Elliott' }]);
    component.setProperty('pagination', false);
    await page.waitForChanges();
    let paginationContainer = await page.find(
      'modus-data-table >>> .pagination-and-count'
    );
    expect(paginationContainer).toBeNull();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    paginationContainer = await page.find(
      'modus-data-table >>> .pagination-and-count > .total-count'
    );
    expect(paginationContainer).not.toBeNull();
    expect(paginationContainer.textContent).toBe('Showing result1-1 of 1');
  });

  it('check select dropdown option when pageSizeList is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-data-table />');
    const component = await page.find('modus-data-table');
    component.setProperty('columns', columns);
    component.setProperty('data', [{ firstName: 'Elliott' }]);

    await page.waitForChanges();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    let options = await page.findAll(
      'modus-data-table >>> .items-per-page option'
    );
    let optionsData = await Promise.all(
      options.map((option) => option.textContent)
    );
    expect(optionsData).toContain('10');
    expect(optionsData).toContain('20');
    expect(optionsData).toContain('50');

    component.setProperty('pageSizeList', [7, 10, 15]);
    await page.waitForChanges();

    options = await page.findAll('modus-data-table >>> .items-per-page option');
    optionsData = await Promise.all(
      options.map((option) => option.textContent)
    );
    expect(optionsData).toContain('7');
    expect(optionsData).toContain('10');
    expect(optionsData).toContain('15');
  });
});
