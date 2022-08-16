import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('modus-data-table', () => {
  let page: E2EPage;

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
    let header = await page.find('modus-data-table >>> th');
    expect(header).toBeFalsy();

    component.setProperty('columns', ['Column 1']);
    await page.waitForChanges();
    header = await page.find('modus-data-table >>> th');
    expect(header).toBeTruthy();
  });

  it('renders changes to data prop', async () => {
    const component = await page.find('modus-data-table');
    let row = await page.find('modus-data-table >>> td');
    expect(row).toBeFalsy();

    component.setProperty('columns', ['Col1']);
    component.setProperty('data', [{ col1: 'value 1' }]);
    await page.waitForChanges();
    row = await page.find('modus-data-table >>> td');
    expect(row).toBeTruthy();
  });

  it('renders changes to size prop', async () => {
    const component = await page.find('modus-data-table');
    let size = await page.find('modus-data-table >>> .size-standard');
    expect(size).toBeTruthy();

    component.setProperty('columns', ['Col1']);
    component.setProperty('size', 'condensed');
    await page.waitForChanges();
    size = await page.find('modus-data-table >>> .size-condensed');
    expect(size).toBeTruthy();
  });

  it('renders with primitive columns and data', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    let row = await page.find('modus-data-table >>> td');
    expect(col).toBeFalsy();
    expect(row).toBeFalsy();

    component.setProperty('columns', ['Col1']);
    component.setProperty('data', [['Val1']]);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th');
    row = await page.find('modus-data-table >>> td');
    expect(col).toBeTruthy();
    expect(row).toBeTruthy();
  });

  it('renders with primitive columns and object data', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    let row = await page.find('modus-data-table >>> td');
    expect(col).toBeFalsy();
    expect(row).toBeFalsy();

    component.setProperty('columns', ['Col1']);
    component.setProperty('data', [{ col1: 'Val1' }]);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th');
    row = await page.find('modus-data-table >>> td');
    expect(col).toBeTruthy();
    expect(row).toBeTruthy();
  });

  it('renders with object columns and primitive data', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    let row = await page.find('modus-data-table >>> td');
    expect(col).toBeFalsy();
    expect(row).toBeFalsy();

    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val1']]);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th');
    row = await page.find('modus-data-table >>> td');
    expect(col).toBeTruthy();
    expect(row).toBeTruthy();
  });

  it('renders with object columns and data', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    let row = await page.find('modus-data-table >>> td');
    expect(col).toBeFalsy();
    expect(row).toBeFalsy();

    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [{ col1: 'Val1' }]);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th');
    row = await page.find('modus-data-table >>> td');
    expect(col).toBeTruthy();
    expect(row).toBeTruthy();
  });

  it('converts header text to single space title case', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    expect(col).toBeFalsy();

    component.setProperty('columns', ['some   TItLe wiTh  Weird Spacing AND   CasING']);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th > .column-header > div');
    expect(col.innerHTML).toEqual('Some Title With Weird Spacing And Casing');
  });

  it('should apply column display', async () => {
    const component = await page.find('modus-data-table');
    let col = await page.find('modus-data-table >>> th');
    expect(col).toBeFalsy();

    component.setProperty('columns', [{ display: 'Col1' }]);
    await page.waitForChanges();
    col = await page.find('modus-data-table >>> th > .column-header > div');
    expect(col.innerHTML).toEqual('Col1');
  });

  it('should apply column align', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Some value']]);
    await page.waitForChanges();
    let align = await page.find('modus-data-table >>> .align-left');
    let alignCell = await page.find('modus-data-table >>> td.align-left');
    expect(align).toBeTruthy();
    expect(alignCell).toBeTruthy();

    component.setProperty('columns', [{ display: 'Col1', align: 'right' }]);
    await page.waitForChanges();
    align = await page.find('modus-data-table >>> .align-right');
    alignCell = await page.find('modus-data-table >>> td.align-right');
    expect(align).toBeTruthy();
    expect(alignCell).toBeTruthy();

    component.setProperty('columns', [{ display: 'Col1', align: 'center' }]);
    await page.waitForChanges();
    align = await page.find('modus-data-table >>> .align-center');
    alignCell = await page.find('modus-data-table >>> td.align-center');
    expect(align).toBeTruthy();
    expect(alignCell).toBeTruthy();
  });

  it('should apply column readonly', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val1']]);
    await page.waitForChanges();
    let readonly = await page.find('modus-data-table >>> .readonly');
    expect(readonly).toBeFalsy();

    component.setProperty('columns', [{ display: 'Col1', readonly: true }]);
    await page.waitForChanges();
    readonly = await page.find('modus-data-table >>> .readonly');
    expect(readonly).toBeTruthy();
  });

  it('should output sort event on column header click with sort enabled', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val1'], ['Val2'], ['Val3']]);
    component.setProperty('sortOptions', { canSort: true, serverSide: false });
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sort');

    const header = await page.find('modus-data-table >>> th');
    await header.click();
    await header.click();
    await header.click();

    expect(sortEvent).toHaveReceivedEventTimes(3);
  });

  it('should not output sort event on column header click with sort disabled', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val1'], ['Val2'], ['Val3']]);
    component.setProperty('sortOptions', { canSort: false, serverSide: false });
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sort');

    const header = await page.find('modus-data-table >>> th');
    await header.click();
    await header.click();
    await header.click();

    expect(sortEvent).toHaveReceivedEventTimes(0);
  });

  it('should output sort event with correct sort direction (tri-state)', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val1'], ['Val2'], ['Val3']]);
    component.setProperty('sortOptions', { canSort: true, serverSide: false });
    await page.waitForChanges();
    const sortEvent = await page.spyOnEvent('sort');

    const header = await page.find('modus-data-table >>> th');
    await header.click();
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'col1', direction: 'asc' });

    await header.click();
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'col1', direction: 'desc' });

    await header.click();
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'col1', direction: 'none' });
    expect(sortEvent).toHaveReceivedEventTimes(3);
  });

  it('should sort rows if serverSide sort is false', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val2'], ['Val3'], ['Val1']]);
    component.setProperty('sortOptions', { canSort: true, serverSide: false });
    await page.waitForChanges();

    const header = await page.find('modus-data-table >>> th');
    await header.click();
    await page.waitForChanges();

    // Ascending sort
    let cells = await page.findAll('modus-data-table >>> td');
    expect(cells[0].innerHTML).toEqual('Val1');
    expect(cells[1].innerHTML).toEqual('Val2');
    expect(cells[2].innerHTML).toEqual('Val3');

    await header.click();
    await page.waitForChanges();

    // Descending sort
    cells = await page.findAll('modus-data-table >>> td');
    expect(cells[0].innerHTML).toEqual('Val3');
    expect(cells[1].innerHTML).toEqual('Val2');
    expect(cells[2].innerHTML).toEqual('Val1');

    await header.click();
    await page.waitForChanges();

    // No sort
    cells = await page.findAll('modus-data-table >>> td');
    expect(cells[0].innerHTML).toEqual('Val2');
    expect(cells[1].innerHTML).toEqual('Val3');
    expect(cells[2].innerHTML).toEqual('Val1');
  });

  it('should not sort rows if serverSide sort is false', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val2'], ['Val3'], ['Val1']]);
    component.setProperty('sortOptions', { canSort: true, serverSide: true });
    await page.waitForChanges();

    const header = await page.find('modus-data-table >>> th');
    await header.click();
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    expect(cells[0].innerHTML).toEqual('Val2');
    expect(cells[1].innerHTML).toEqual('Val3');
    expect(cells[2].innerHTML).toEqual('Val1');
  });
});
