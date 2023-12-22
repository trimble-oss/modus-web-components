import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { ModusTableRowAction } from '../../interfaces';

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

const MockManualPagination = {
  currentPageIndex: 2,
  currentPageSize: 10,
  pageCount: 10,
  totalRecords: 100,
};

const MockManualSorting = {
  currentSortingState: [
    {
      id: 'mock-column-one',
      desc: false,
    },
  ],
};

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

  it('Renders with correct sort icon when manual sorting is enabled', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', true);
    component.setProperty('manualSortingOptions', MockManualSorting);
    await page.waitForChanges();

    const iconSortAZ = await page.find('modus-table >>> svg');
    const dataTestId = iconSortAZ['__attributeMap']['__items'].find((item) => item['_name'] === 'data-test-id');
    const dataTestIdValue = dataTestId && dataTestId['_value'];

    expect(dataTestIdValue).toBe('iconSortAZ');
  });

  it('Check sort icon tooltip text for enabled manual sorting', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('sort', true);
    component.setProperty('manualSortingOptions', MockManualSorting);
    await page.waitForChanges();

    const sortContainer = await page.find('modus-table >>> th');
    expect(sortContainer).not.toBeNull();

    const tooltip = await sortContainer.find('modus-tooltip');
    const tooltipText = await tooltip.getProperty('text');

    expect(tooltip).not.toBeNull();
    expect(tooltipText).toEqual('Sorted Ascending');
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

  it('Render manual pagination', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('manualPaginationOptions', {});
    component.setProperty('data', MockData);
    component.setProperty('pagination', false);

    await page.waitForChanges();
    component.setProperty('pagination', true);
    await page.waitForChanges();
    component.setProperty('manualPaginationOptions', MockManualPagination);
    await page.waitForChanges();
    component.setProperty('pageSizeList', [5, 10, 50]);
    await page.waitForChanges();

    const pagination = await page.find(`modus-table >>> modus-pagination`);
    const paginationContainer = await page.find('modus-table >>> .pagination-and-count > .total-count');
    await page.waitForChanges();

    expect(await pagination.getAttribute('active-page')).toBeTruthy();
    expect(await pagination.getAttribute('max-page')).toBeTruthy();
    expect(await pagination.getAttribute('active-page')).toBe(`${MockManualPagination.currentPageIndex}`);
    expect(await pagination.getAttribute('max-page')).toBe(`${MockManualPagination.pageCount}`);

    expect(paginationContainer).not.toBeNull();
    expect(paginationContainer.textContent).toContain('Showing result11-20of100');
  });

  it('ensures correct rendering of pagination when toggled on with initial invalid properties', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');

    const MockManualPagination = {
      currentPageIndex: 1,
      currentPageSize: 10,
      pageCount: 1,
      totalRecords: 2,
    };

    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('manualPaginationOptions', {});
    component.setProperty('data', MockData);
    component.setProperty('pagination', false);

    await page.waitForChanges();
    component.setProperty('pagination', true);
    await page.waitForChanges();
    component.setProperty('manualPaginationOptions', MockManualPagination);
    await page.waitForChanges();
    component.setProperty('pageSizeList', [5, 10, 50]);
    await page.waitForChanges();

    const pagination = await page.find(`modus-table >>> modus-pagination`);
    const paginationContainer = await page.find('modus-table >>> .pagination-and-count > .total-count');
    await page.waitForChanges();

    expect(paginationContainer).not.toBeNull();
    expect(paginationContainer.textContent).toContain('Showing result1-2of2');
    expect(await pagination.getAttribute('active-page')).toBe('1');
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

  it('Renders column resizing when columnVisibility is enabled', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('toolbar', true);
    component.setProperty('toolbarOptions', {
      columnsVisibility: {
        title: '',
        requiredColumns: ['mock-column-one'],
        hiddenColumns: ['mock-column-two'],
      },
    });

    await page.waitForChanges();

    // Check for the required column; it should be present.
    const requiredColumn = await page.find(`modus-table >>> th[aria-label="Mock Column One"]`);
    expect(requiredColumn).not.toBeNull();

    // Check for the hidden column; it should NOT be present.
    const hiddenColumn = await page.find(`modus-table >>> th[aria-label="Mock Column Two"]`);
    expect(hiddenColumn).toBeNull();
  });

  it('Renders Hyperlinks in cell and emits cellLinkEvent', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');

    const emailColumn = [
      {
        header: 'Email',
        accessorKey: 'email',
        id: 'email',
        dataType: 'link',
      },
    ];
    const emailData = { display: 'test', url: 'test@example.com' };
    const cellLinkClickEvent = await page.spyOnEvent('cellLinkClick');

    component.setProperty('columns', emailColumn);
    component.setProperty('data', [{ email: emailData }]);
    await page.waitForChanges();

    const linkElement = await page.find('modus-table >>> .cell-link');
    linkElement.click();
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail(emailData);

    linkElement.focus();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail(emailData);
  });

  it('Renders Badge in cell', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');

    const statusColumn = [
      {
        header: 'Status',
        accessorKey: 'status',
        id: 'status',
        dataType: 'badge',
      },
    ];
    const statusData = {
      size: 'medium',
      type: 'counter',
      text: 'Verified',
      color: 'success',
    };

    component.setProperty('columns', statusColumn);
    component.setProperty('data', [{ status: statusData }]);
    await page.waitForChanges();

    const cell = await page.find('modus-table >>> td');
    const cellValue = cell.textContent;

    expect(cellValue).toEqual(statusData.text);
  });

  it('Performs keyboard navigation on cells with hyperlinks', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');

    const emailColumns = [
      {
        header: 'email1',
        accessorKey: 'email1',
        id: 'email1',
        dataType: 'link',
        sortingFn: 'sortForHyperlink',
      },
      {
        header: 'email2',
        accessorKey: 'email2',
        id: 'email2',
        dataType: 'link',
        sortingFn: 'sortForHyperlink',
      },
    ];
    const data = [
      {
        email1: { display: 'row1cell1', url: 'row1cell1@example.com' },
        email2: { display: 'row1cell2', url: 'row1cell2@example.com' },
      },
      {
        email1: { display: 'row2cell1', url: 'row2cell1@example.com' },
        email2: { display: 'row2cell2', url: 'row2cell2@example.com' },
      },
    ];
    const cellLinkClickEvent = await page.spyOnEvent('cellLinkClick');

    component.setProperty('columns', emailColumns);
    component.setProperty('data', data);
    await page.waitForChanges();

    const linkElement = await page.find('modus-table >>> .cell-link');
    linkElement.focus();
    await page.waitForChanges();

    expect(linkElement).toBeTruthy();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail({ display: 'row1cell1', url: 'row1cell1@example.com' });

    // Press Right Arrow
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail({ display: 'row1cell2', url: 'row1cell2@example.com' });

    // Press Down Arrow
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail({ display: 'row2cell2', url: 'row2cell2@example.com' });

    // Press Left Arrow
    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail({ display: 'row2cell1', url: 'row2cell1@example.com' });

    // Press Up Arrow
    await page.keyboard.press('ArrowUp');
    await page.waitForChanges();
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventDetail({ display: 'row1cell1', url: 'row1cell1@example.com' });
  });

  it('Performs keyboard navigation on rows with checkbox selection', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');

    const rowSelectionChange = await page.spyOnEvent('rowSelectionChange');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('rowSelection', true);
    component.setProperty('rowSelectionOptions', {
      multiple: false,
      preSelectedRows: [],
    });

    await page.waitForChanges();

    const cell = await page.find('modus-table >>> td');

    expect(cell).toHaveClass('row-checkbox');
    cell.focus();
    await page.waitForChanges();

    // Press Down Arrow
    await page.keyboard.press('ArrowDown');
    await page.waitForChanges();

    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(rowSelectionChange).toHaveReceivedEvent();

    // Press Up Arrow
    await page.keyboard.press('ArrowUp');
    await page.waitForChanges();

    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(rowSelectionChange).toHaveReceivedEvent();
  });

  it('Displays row actions', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');
    const rowActionsMock: ModusTableRowAction[] = [
      {
        id: '1',
        index: 0,
        icon: 'edit',
        label: 'Edit',
      },
    ];
    const component = await page.find('modus-table');
    component.setProperty('rowActions', rowActionsMock);
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    await page.waitForChanges();
    const rowActions = await page.findAll('modus-table >>> modus-table-row-actions >>> .row-actions');
    expect(rowActions).toHaveLength(MockData.length);
    const rowActionClick = await page.spyOnEvent('rowActionClick');
    await rowActions[0].click();
    expect(rowActionClick).toHaveReceivedEvent();
  });

  it('Displays row actions menu', async () => {
    page = await newE2EPage();
    await page.setContent('<modus-table />');
    const rowActionsMock = [
      {
        id: '1',
        index: 0,
        icon: 'edit',
        label: 'Edit',
      },
      {
        id: '2',
        index: 1,
        icon: 'edit',
        label: 'Edit',
      },
      {
        id: '3',
        index: 2,
        icon: 'edit',
        label: 'Edit',
      },
      {
        id: '4',
        index: 3,
        icon: 'edit',
        label: 'Edit',
      },
      {
        id: '5',
        index: 4,
        icon: 'edit',
        label: 'Edit',
      },
    ];
    const component = await page.find('modus-table');
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('rowActions', rowActionsMock);
    await page.waitForChanges();
    const rowActionsMenuButton = await page.findAll('modus-table >>> modus-table-row-actions > .row-actions-menu-button');
    expect(rowActionsMenuButton).toHaveLength(MockData.length);
    await rowActionsMenuButton[0].click();
    await page.waitForChanges();
    const rowActionsMenuItem = await page.findAll('modus-table >>> .row-actions-menu-item');
    expect(rowActionsMenuItem).toHaveLength(2);
    const rowActionsMenuItemClick = await page.spyOnEvent('rowActionClick');
    await rowActionsMenuItem[0].click();
    expect(rowActionsMenuItemClick).toHaveReceivedEvent();
  });

  it('Renders pre selected rows checked', async () => {
    page = await newE2EPage();

    await page.setContent('<modus-table />');
    const component = await page.find('modus-table');

    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);
    component.setProperty('rowSelection', true);
    component.setProperty('rowSelectionOptions', {
      multiple: true,
      preSelectedRows: ['0'],
    });
    await page.waitForChanges();
    const rowsSelected = await page.findAll('modus-table >>> modus-checkbox');
    for (let i = 1; i < rowsSelected.length; i++) {
      const row = rowsSelected[i];
      const isChecked = await row.getProperty('checked');
      if (i === 1) {
        expect(isChecked).toBeTruthy();
      } else {
        expect(isChecked).toBeFalsy();
      }
    }
    expect(rowsSelected).toHaveLength(3);
  });

  it('Renders changes to the density prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-table></modus-table>');
    const component = await page.find('modus-table');
    const element = await page.find('modus-table >>> table');
    expect(element).toHaveClass('density-relaxed');

    component.setProperty('density', 'compact');
    await page.waitForChanges();
    expect(element).toHaveClass('density-compact');
  });

  it('Sorting by default sort', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-table></modus-table>');
    const component = await page.find('modus-table');
    
    component.setProperty('columns', MockColumns);
    component.setProperty('data', MockData);    
    component.setProperty('sort', true);
    component.setProperty('defaultSort', {id: 'mock-column-two', desc: true});

    await page.waitForChanges();
    let tableData = await page.findAll('modus-table >>> td');
    let firstItem = tableData[0].textContent;
    expect(firstItem).toBe('Mock Data One 2');
  });
});
