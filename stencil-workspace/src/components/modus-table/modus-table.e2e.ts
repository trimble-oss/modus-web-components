import { E2EPage, newE2EPage } from '@stencil/core/testing';

const MockColumns = [
  {
    header: 'Mock Column One',
    accessorKey: 'mockColumnOne',
    id: 'mock-column-one',
    dataType: 'text',
    footer: 'Total',
  },
  {
    header: 'Mock Column Two',
    accessorKey: 'mockColumnTwo',
    id: 'mock-column-two',
    dataType: 'integer',
    showTotal: true,
  },
];

const MockData = [
  {
    mockColumnOne: 'Mock Data One 1',
    mockColumnTwo: 330160,
  },
  {
    mockColumnOne: 'Mock Data One 2',
    mockColumnTwo: 900293,
  },
];

const MockOverflowMenuActions = [
  {
    _id: 'edit',
    display: {
      icon: 'edit',
      text: 'Edit',
    },
  },
  {
    _id: 'delete',
    display: {
      icon: 'delete',
      text: 'Delete',
    },
  },
];

const MockRowActions = [
  {
    _id: 'edit',
    display: {
      icon: 'edit',
      text: 'Edit',
    },
  },
  {
    _id: 'delete',
    display: {
      icon: 'delete',
      text: 'Delete',
    },
  },
  {
    _id: '3',
    display: {
      icon: 'delete',
      text: '3',
    },
  },
  {
    _id: '4',
    display: {
      icon: 'delete',
      text: '4',
    },
  },
  {
    _id: '5',
    display: {
      icon: 'delete',
      text: '5',
    },
  },
];

describe('modus-table', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');
  });

  it('Renders', async () => {
    const element = await page.find('modus-table');
    expect(element).toHaveClass('hydrated');
  });

  it('Renders changes to column prop', async () => {
    const component = await page.find('modus-table');
    let header = await page.findAll('modus-table >>> [data-test-id="main-table"] th');
    expect(header.length).toBe(0);

    component.setProperty('columns', MockColumns);
    await page.waitForChanges();
    header = await page.findAll('modus-table >>> [data-test-id="main-table"] th');
    expect(header.length).toBeGreaterThan(0);
    expect(header[0].textContent).toBe(MockColumns[0].header);
  });

  it('Renders changes to data prop', async () => {
    const component = await page.find('modus-table');
    let row = await page.findAll('modus-table >>> [data-test-id="main-table"] td');
    expect(row.length).toBe(0);

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);

    await page.waitForChanges();
    row = await page.findAll('modus-table >>> [data-test-id="main-table"] td');
    expect(row.length).toBeGreaterThan(0);
    expect(row[0].textContent).toBe(MockData[0].mockColumnOne);
  });

  it('Display hover on rows when hover is enabled', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('hover', false);

    await page.waitForChanges();
    let hover = await page.find('modus-table >>> .enable-hover');
    expect(hover).toBeNull();

    component.setProperty('hover', true);
    await page.waitForChanges();
    hover = await page.find('modus-table >>> .enable-hover');
    expect(hover).not.toBeNull();
  });

  it('Renders with sort icon when sort is enabled', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', false);

    await page.waitForChanges();
    let sortContainer = await page.find('modus-table >>> .can-sort');
    expect(sortContainer).toBeNull();

    component.setProperty('sort', true);
    await page.waitForChanges();
    sortContainer = await page.find('modus-table >>> .can-sort');
    expect(sortContainer).not.toBeNull();
  });

  it('Renders with sort icon when showSortIconOnHover is enabled', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', true);
    component.setProperty('showSortIconOnHover', true);

    await page.waitForChanges();
    const header = await page.find('modus-table >>> th');

    let sortContainer = await page.find('modus-table >>> .can-sort.hidden');
    expect(sortContainer).toBeNull();

    await header.hover();
    await page.waitForChanges();

    sortContainer = await page.find('modus-table >>> .hidden');
    expect(sortContainer).not.toBeNull();
  });

  it('Should output sort event on sort icon click with sort enabled', async () => {
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', true);
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sortChange');

    const header = await page.find('modus-table >>> .sort-icon');
    await header.click();
    await header.click();

    expect(sortEvent).toHaveReceivedEventTimes(2);
  });

  it('Renders with correct sort icon when sort is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', true);
    await page.waitForChanges();

    let iconSortAZ = await page.find('modus-table >>> svg');
    let dataTestId = iconSortAZ['__attributeMap']['__items'].find((item) => item['_name'] === 'data-test-id');
    let dataTestIdValue = dataTestId && dataTestId['_value'];

    expect(dataTestIdValue).toBe('iconSortZA');

    const header = await page.find('modus-table >>> .sort-icon');
    await header.click();
    await page.waitForChanges();
    iconSortAZ = await page.find('modus-table >>> svg');
    dataTestId = iconSortAZ['__attributeMap']['__items'].find((item) => item['_name'] === 'data-test-id');
    dataTestIdValue = dataTestId && dataTestId['_value'];
    expect(dataTestIdValue).toBe('iconSortAZ');
  });

  it('Should output sort data on sort icon click with sort enabled', async () => {
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', true);
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sortChange');

    const header = await page.find('modus-table >>> .sort-icon');
    await header.click();

    let tableData = await page.findAll('modus-table >>> td');
    let firstItem = tableData[1].textContent;
    let secondItem = tableData[3].textContent;
    // Ascending sort
    expect(firstItem).toEqual(MockData[0].mockColumnTwo.toString());
    expect(secondItem).toEqual(MockData[1].mockColumnTwo.toString());

    await header.click();
    await page.waitForChanges();

    // Descending sort
    tableData = await page.findAll('modus-table >>> td');
    firstItem = tableData[1].textContent;
    secondItem = tableData[3].textContent;

    expect(firstItem).toEqual(MockData[1].mockColumnTwo.toString());
    expect(secondItem).toEqual(MockData[0].mockColumnTwo.toString());

    expect(sortEvent).toHaveReceivedEventTimes(2);
  });

  it('Check sort icon tooltip text for ascending and descending ', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', false);
    await page.waitForChanges();

    let sortContainer = await page.find('modus-table >>> .can-sort');
    expect(sortContainer).toBeNull();

    component.setProperty('sort', true);
    await page.waitForChanges();

    sortContainer = await page.find('modus-table >>> th');
    expect(sortContainer).not.toBeNull();

    let tooltip = await sortContainer.find('modus-tooltip');
    let tooltipText = await tooltip.getProperty('text');

    expect(tooltip).not.toBeNull();
    expect(tooltipText).toEqual('Sort Ascending');

    let header = await page.find('modus-table >>> .sort-icon');
    await header.click();
    await page.waitForChanges();
    tooltip = await sortContainer.find('modus-tooltip');
    tooltipText = await tooltip.getProperty('text');
    expect(tooltipText).toEqual('Sorted Ascending');

    header = await page.find('modus-table >>> .sort-icon');
    await header.click();
    await page.waitForChanges();
    tooltip = await sortContainer.find('modus-tooltip');
    tooltipText = await tooltip.getProperty('text');
    expect(tooltipText).toEqual('Sorted Descending');
  });

  it('Render pagination when pagination is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('pagination', false);
    await page.waitForChanges();
    let paginationContainer = await page.find('modus-table >>> .pagination-container');
    expect(paginationContainer).toBeNull();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    paginationContainer = await page.find('modus-table >>> .pagination-container');
    expect(paginationContainer).not.toBeNull();
  });

  it('Display page view when pagination is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('pagination', false);
    await page.waitForChanges();
    let paginationContainer = await page.find('modus-table >>> .items-per-page');
    expect(paginationContainer).toBeNull();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    paginationContainer = await page.find('modus-table >>> .items-per-page');
    expect(paginationContainer).not.toBeNull();
    expect(paginationContainer.textContent).toBeTruthy();
    expect(paginationContainer.textContent.startsWith('Page View')).toBeTruthy();
  });

  it('Display total pages count when pagination enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('pagination', false);
    await page.waitForChanges();
    let paginationContainer = await page.find('modus-table >>> .pagination-and-count');
    expect(paginationContainer).toBeNull();

    component.setProperty('pagination', true);
    await page.waitForChanges();

    paginationContainer = await page.find('modus-table >>> .pagination-and-count > .total-count');
    await page.waitForChanges();
    expect(paginationContainer).not.toBeNull();
    expect(paginationContainer.textContent).toContain('Showing result1-2of2 ');
  });

  it('Display items per page list when pageSizeList is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    await page.waitForChanges();

    component.setProperty('pagination', true);
    await page.waitForChanges();
    const valueChange = await page.spyOnEvent('valueChange');

    const select = await page.find('modus-table >>> .items-per-page > modus-select');

    // Note: Workaround for testing select options because of not able to penetrate the nested `modus-select` options
    await select.click();

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(valueChange).toHaveReceivedEvent();
    expect(valueChange).toHaveReceivedEventDetail({ display: 20 });
  });

  it('Renders custom footer when summaryRow is true', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('summaryRow', false);
    await page.waitForChanges();
    let footerContainer = await page.find('modus-table >>> [data-test-id="main-table"] .summary-row');
    expect(footerContainer).toBeNull();

    component.setProperty('summaryRow', true);
    await page.waitForChanges();

    footerContainer = await page.find('modus-table >>> .summary-row');
    expect(footerContainer).not.toBeNull();
  });

  it('Displays custom footer text for the footer', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('summaryRow', true);
    await page.waitForChanges();

    const footerContainer = await page.find('modus-table >>> .summary-row');
    expect(footerContainer).not.toBeNull();

    const tableData = await page.findAll('modus-table >>> .summary-row > td');
    const tableDataText = await Promise.all(tableData.map((td) => td.textContent));

    expect(tableDataText[0]).toEqual('Total');
  });

  it('Calculates the sum of row values for the footer', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('summaryRow', true);
    await page.waitForChanges();

    const footerContainer = await page.find('modus-table >>> .summary-row');
    expect(footerContainer).not.toBeNull();

    const tableData = await page.findAll('modus-table >>> .summary-row > td');
    const tableDataTexts = await Promise.all(tableData.map((td) => td.textContent));

    expect(parseInt(tableDataTexts[1])).toEqual(MockData[0].mockColumnTwo + MockData[1].mockColumnTwo);
  });

  it('Formats the row values with currency format', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    await page.waitForChanges();

    function formatCurrency(value) {
      return '$' + formatNumber(value);
    }

    function formatNumber(value) {
      return Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    const tableData = await page.findAll('modus-table >>> td');
    const tableDataTexts = await Promise.all(tableData.map((td) => formatCurrency(td.textContent)));

    expect(tableDataTexts[1]).toEqual('$330,160.00');
    expect(tableDataTexts[3]).toEqual('$900,293.00');
  });

  it('Renders column resizing when columnResize is enabled', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('columnResize', false);

    await page.waitForChanges();
    let resizeContainer = await page.find('modus-table >>> .resize-handle');
    expect(resizeContainer).toBeNull();

    component.setProperty('columnResize', true);
    await page.waitForChanges();
    resizeContainer = await page.find('modus-table >>> .resize-handle');
    expect(resizeContainer).not.toBeNull();
  });

  it('Renders overflow menu', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('overflowMenuActions', MockOverflowMenuActions);
    await page.waitForChanges();

    let overflowMenu = await page.find('modus-table >>> .overflow-menu');
    expect(overflowMenu).not.toBeNull();
    overflowMenu.click();
    await page.waitForChanges();

    let dropdownMenu = await page.find('modus-table >>> .dropdownMenu');
    expect(dropdownMenu).not.toBeNull();
  });

  it('Renders a maximum of 4 row actions', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('rowActions', MockRowActions);
    await page.waitForChanges();

    let rowActions = await page.findAll('modus-table >>> .row-action');
    console.log(rowActions);
    expect(rowActions.length).toBe(8);
  });
});
