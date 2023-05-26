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

  it('renders changes to displayOptions size prop', async () => {
    const component = await page.find('modus-data-table');
    let size = await page.find('modus-data-table >>> .size-large');
    expect(size).toBeTruthy();

    component.setProperty('columns', ['Col1']);
    component.setProperty('displayOptions', { size: 'small' });
    await page.waitForChanges();
    size = await page.find('modus-data-table >>> .size-small');
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

  it('should maintain row selection after sort', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val2'], ['Val3'], ['Val1']]);
    component.setProperty('selectionOptions', { canSelect: true, serverSide: false });
    component.setProperty('sortOptions', { canSort: true, serverSide: false });
    await page.waitForChanges();

    let cells = await page.findAll('modus-data-table >>> td');
    let cell = cells.find((cell) => cell.innerHTML === 'Val2');
    await cell.click();
    await page.waitForChanges();

    const header = await page.find('modus-data-table >>> th');
    await header.click({ clickCount: 6 }); // Cycle through original data value replacement
    await page.waitForChanges();

    cells = await page.findAll('modus-data-table >>> td');
    cell = cells.find((cell) => cell.innerHTML === 'Val2');

    await page.waitForChanges();

    expect(cell.classList.contains('selected')).toBeTruthy();
  });

  it('should select when canSelect is true', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val2'], ['Val3'], ['Val1']]);
    component.setProperty('selectionOptions', { canSelect: true });
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    const cell = cells.find((cell) => cell.innerHTML === 'Val2');

    await cell.click();
    await page.waitForChanges();

    expect(cell.classList.contains('selected')).toBeTruthy();
  });

  it('should not select when canSelect is false', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [['Val2'], ['Val3'], ['Val1']]);
    component.setProperty('selectionOptions', { canSelect: false });
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    const cell = cells.find((cell) => cell.innerHTML === 'Val2');

    await cell.click();
    await page.waitForChanges();

    expect(cell.classList.contains('selected')).toBeFalsy();
  });

  it('should fire selection with correct item', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true });
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    const cell = cells.find((cell) => cell.innerHTML === 'Val2');
    const selectionEvent = await page.spyOnEvent('selection');

    await cell.click();
    await page.waitForChanges();

    expect(selectionEvent).toHaveReceivedEventDetail(['2']);
  });

  it('should fire selection with correct items', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true });
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    const cell1 = cells.find((cell) => cell.innerHTML === 'Val2');
    const cell2 = cells.find((cell) => cell.innerHTML === 'Val3');
    const selectionEvent = await page.spyOnEvent('selection');

    await cell1.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2']);

    await cell2.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2', '3']);

    expect(selectionEvent).toHaveReceivedEventTimes(2);
  });

  it('should fire selection with correct items when deselecting', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true });
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    const cell1 = cells.find((cell) => cell.innerHTML === 'Val2');
    const cell2 = cells.find((cell) => cell.innerHTML === 'Val3');
    const selectionEvent = await page.spyOnEvent('selection');

    await cell1.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2']);

    await cell2.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2', '3']);

    await cell2.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2']);

    expect(selectionEvent).toHaveReceivedEventTimes(3);
  });

  it('should fire selection with correct items when checking checkbox', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const selectionEvent = await page.spyOnEvent('selection');

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');
    const checkbox2 = checkboxes[1];

    await checkbox2.click();
    await page.waitForChanges();

    expect(selectionEvent).toHaveReceivedEventDetail(['2']);
  });

  it('should fire selection with correct items when checking multiple checkboxes', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const selectionEvent = await page.spyOnEvent('selection');

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');
    const checkbox2 = checkboxes[1];
    const checkbox3 = checkboxes[2];

    await checkbox2.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2']);

    await checkbox3.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2', '3']);
  });

  it('should fire selection with correct items when unchecking checkbox', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const selectionEvent = await page.spyOnEvent('selection');

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');
    const checkbox2 = checkboxes[1];
    const checkbox3 = checkboxes[2];

    await checkbox2.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2']);

    await checkbox3.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2', '3']);

    await checkbox3.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2']);
  });

  it('should not render checkbox is checkboxSelection is false', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: false });
    await page.waitForChanges();

    const checkbox = await page.find('modus-data-table >>> modus-checkbox');
    expect(checkbox).toBeFalsy();
  });

  it('should fire selection when select all is checked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const selectionEvent = await page.spyOnEvent('selection');

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');
    const selectAllCheckbox = checkboxes[0];

    await selectAllCheckbox.click();
    await page.waitForChanges();

    expect(selectionEvent).toHaveReceivedEventDetail(['2', '3', '1']);
  });

  it('should fire selection when select all is unchecked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const selectionEvent = await page.spyOnEvent('selection');

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');
    const selectAllCheckbox = checkboxes[0];

    await selectAllCheckbox.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail(['2', '3', '1']);

    await selectAllCheckbox.click();
    await page.waitForChanges();
    expect(selectionEvent).toHaveReceivedEventDetail([]);
  });

  it('should update select all checkbox when all rows become checked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');

    const selectAllCheckbox = checkboxes[0];
    const checkbox1 = checkboxes[1];
    const checkbox2 = checkboxes[2];
    const checkbox3 = checkboxes[3];

    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await page.waitForChanges();

    expect(await selectAllCheckbox.getProperty('checked')).toBe(true);
  });

  it('should update select all checkbox when a row becomes unchecked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');

    const selectAllCheckbox = checkboxes[0];
    const checkbox1 = checkboxes[1];
    const checkbox2 = checkboxes[2];
    const checkbox3 = checkboxes[3];

    await checkbox1.click();
    await checkbox2.click();
    await checkbox3.click();
    await page.waitForChanges();
    expect(await selectAllCheckbox.getProperty('checked')).toBe(true);

    await checkbox1.click();
    await page.waitForChanges();
    expect(await selectAllCheckbox.getProperty('checked')).toBe(false);
  });

  it('should select all rows when select all checkbox is checked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');

    const selectAllCheckbox = checkboxes[0];
    await selectAllCheckbox.click();
    await page.waitForChanges();
    expect(await checkboxes[1].getProperty('checked')).toBe(true);
    expect(await checkboxes[2].getProperty('checked')).toBe(true);
    expect(await checkboxes[3].getProperty('checked')).toBe(true);
  });

  it('should unselect all rows when select all checkbox is unchecked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true, checkboxSelection: true });
    await page.waitForChanges();

    const checkboxes = await page.findAll('modus-data-table >>> modus-checkbox');

    const selectAllCheckbox = checkboxes[0];
    await selectAllCheckbox.click();
    await page.waitForChanges();
    expect(await checkboxes[1].getProperty('checked')).toBe(true);
    expect(await checkboxes[2].getProperty('checked')).toBe(true);
    expect(await checkboxes[3].getProperty('checked')).toBe(true);

    await selectAllCheckbox.click();
    await page.waitForChanges();
    expect(await checkboxes[1].getProperty('checked')).toBe(false);
    expect(await checkboxes[2].getProperty('checked')).toBe(false);
    expect(await checkboxes[3].getProperty('checked')).toBe(false);
  });

  it('should fire rowDoubleClick with correct id', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Col1' }]);
    component.setProperty('data', [
      { _id: '2', col1: 'Val2' },
      { _id: '3', col1: 'Val3' },
      { _id: '1', col1: 'Val1' },
    ]);
    component.setProperty('selectionOptions', { canSelect: true });
    await page.waitForChanges();

    const cells = await page.findAll('modus-data-table >>> td');
    const cell = cells.find((cell) => cell.innerHTML === 'Val2');
    const rowDoubleClickEvent = await page.spyOnEvent('rowDoubleClick');

    await cell.click({ clickCount: 2 });
    await page.waitForChanges();

    expect(rowDoubleClickEvent).toHaveReceivedEventDetail('2');
    expect(rowDoubleClickEvent).toHaveReceivedEventTimes(1);
  });

  it('should render cell link _type', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Link' }]);
    component.setProperty('data', [{ link: { display: 'My Link', url: 'https://example.com', _type: 'link' } }]);
    await page.waitForChanges();

    const cellLink = await page.find('modus-data-table >>> .cell-link');

    expect(cellLink).toBeTruthy();
  });

  it('should render cell badge _type', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Badge' }]);
    component.setProperty('data', [{ badge: { text: 'My Badge', _type: 'badge' } }]);
    await page.waitForChanges();

    const cellBadge = await page.find('modus-data-table >>> .cell-badge');

    expect(cellBadge).toBeTruthy();
  });

  it('should fire cellLinkClick on cell link click', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Link' }]);
    component.setProperty('data', [{ link: { display: 'My Link', url: 'https://example.com', _type: 'link' } }]);
    await page.waitForChanges();

    const cellLinkClickEvent = await page.spyOnEvent('cellLinkClick');
    const cellLink = await page.find('modus-data-table >>> .cell-link');

    await cellLink.click();
    await page.waitForChanges();

    expect(cellLinkClickEvent).toHaveReceivedEventTimes(1);
  });

  it('should render changes to displayOptions prop', async () => {
    const component = await page.find('modus-data-table');
    let borderless = await page.find('modus-data-table >>> .borderless');
    let cellBorderless = await page.find('modus-data-table >>> .cell-borderless');
    let rowStripe = await page.find('modus-data-table >>> .row-stripe');
    expect(borderless).toBeTruthy();
    expect(cellBorderless).toBeTruthy();
    expect(rowStripe).toBeFalsy();

    component.setProperty('displayOptions', {
      borderless: false,
      cellBorderless: false,
      rowStripe: true,
    });
    await page.waitForChanges();
    borderless = await page.find('modus-data-table >>> .borderless');
    cellBorderless = await page.find('modus-data-table >>> .cell-borderless');
    rowStripe = await page.find('modus-data-table >>> .row-stripe');
    expect(borderless).toBeFalsy();
    expect(cellBorderless).toBeFalsy();
    expect(rowStripe).toBeTruthy();
  });

  it('should sort cell link types', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Link' }]);
    component.setProperty('sortOptions', { canSort: true });
    component.setProperty('data', [
      { link: { display: 'Link C', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link A', url: 'https://example.com', _type: 'link' } },
      { link: { display: 'Link B', url: 'https://example.com', _type: 'link' } },
    ]);

    await page.waitForChanges();

    const sortEvent = await page.spyOnEvent('sort');
    const header = await page.find('modus-data-table >>> th');
    await header.click();

    // Ascending sort
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'link', direction: 'asc' });
    let cells = await page.findAll('modus-data-table >>> .cell-link');
    expect(cells[0].innerHTML).toEqual('Link A');
    expect(cells[1].innerHTML).toEqual('Link B');
    expect(cells[2].innerHTML).toEqual('Link C');

    await header.click();
    await page.waitForChanges();

    // Descending sort
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'link', direction: 'desc' });
    cells = await page.findAll('modus-data-table >>> .cell-link');
    expect(cells[0].innerHTML).toEqual('Link C');
    expect(cells[1].innerHTML).toEqual('Link B');
    expect(cells[2].innerHTML).toEqual('Link A');

    await header.click();
    await page.waitForChanges();

    // No sort
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'link', direction: 'none' });
    cells = await page.findAll('modus-data-table >>> .cell-link');
    expect(cells[0].innerHTML).toEqual('Link C');
    expect(cells[1].innerHTML).toEqual('Link A');
    expect(cells[2].innerHTML).toEqual('Link B');

    expect(sortEvent).toHaveReceivedEventTimes(3);
  });

  it('should sort cell badge types', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', [{ display: 'Badge' }]);
    component.setProperty('sortOptions', { canSort: true });
    component.setProperty('data', [
      { badge: { text: 'Badge C', _type: 'badge' } },
      { badge: { text: 'Badge A', _type: 'badge' } },
      { badge: { text: 'Badge B', _type: 'badge' } },
    ]);

    await page.waitForChanges();

    const sortEvent = await page.spyOnEvent('sort');
    const header = await page.find('modus-data-table >>> th');
    await header.click();

    // Ascending sort
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'badge', direction: 'asc' });
    let cells = await page.findAll('modus-data-table >>> modus-badge');
    expect(cells[0].innerHTML).toEqual('Badge A');
    expect(cells[1].innerHTML).toEqual('Badge B');
    expect(cells[2].innerHTML).toEqual('Badge C');

    await header.click();
    await page.waitForChanges();

    // Descending sort
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'badge', direction: 'desc' });
    cells = await page.findAll('modus-data-table >>> modus-badge');
    expect(cells[0].innerHTML).toEqual('Badge C');
    expect(cells[1].innerHTML).toEqual('Badge B');
    expect(cells[2].innerHTML).toEqual('Badge A');

    await header.click();
    await page.waitForChanges();

    // No sort
    expect(sortEvent).toHaveReceivedEventDetail({ columnId: 'badge', direction: 'none' });
    cells = await page.findAll('modus-data-table >>> modus-badge');
    expect(cells[0].innerHTML).toEqual('Badge C');
    expect(cells[1].innerHTML).toEqual('Badge A');
    expect(cells[2].innerHTML).toEqual('Badge B');

    expect(sortEvent).toHaveReceivedEventTimes(3);
  });

  it('renders changes to rowActions', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', ['Name', 'Age']);
    component.setProperty('data', [{ name: 'Josh', age: 25 }]);
    component.setProperty('rowActions', [
      {
        _id: 'delete',
        display: {
          text: 'Delete',
          icon: 'delete',
        },
      },
    ]);
    await page.waitForChanges();

    const rowAction = await page.find('modus-data-table >>> .action-item');
    expect(rowAction).toBeTruthy();
  });

  it('should fire rowActionClick when row action is clicked', async () => {
    const component = await page.find('modus-data-table');
    component.setProperty('columns', ['Name', 'Age']);
    component.setProperty('data', [{ _id: 'josh', name: 'Josh', age: 25 }]);
    component.setProperty('rowActions', [
      {
        _id: 'delete',
        display: {
          text: 'Delete',
          icon: 'delete',
        },
      },
    ]);
    await page.waitForChanges();

    const rowActionClick = await page.spyOnEvent('rowActionClick');
    const rowAction = await page.find('modus-data-table >>> .row-action');
    const actionItem = await page.find('modus-data-table >>> .action-item');

    await rowAction.click();
    await actionItem.click();
    await page.waitForChanges();

    expect(rowActionClick).toHaveReceivedEventDetail({ actionId: 'delete', rowId: 'josh' });
    expect(rowActionClick).toHaveReceivedEventTimes(1);
  });
});
