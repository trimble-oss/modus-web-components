import { newE2EPage } from '@stencil/core/testing';

describe('modus-tree-view-item', () => {
  it('renders tree root', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tree-view></modus-tree-view>');

    const element = await page.find('modus-tree-view');
    expect(element).toHaveClass('hydrated');
  });

  it('renders tree item', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tree-view-item></modus-tree-view-item>');

    const element = await page.find('modus-tree-view-item');
    expect(element).toHaveClass('hydrated');
  });

  it('renders root with item', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);

  const root = await page.find('modus-tree-view');
  expect(root).toHaveClass('hydrated');

  const item = await page.find('modus-tree-view-item');
  expect(item).toHaveClass('hydrated');
  });

  it('renders changes to the disabled prop set at the root level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);

  const component = await page.find('modus-tree-view');
  const element = await page.find('modus-tree-view-item >>> li > div.tree-item');
  expect(element).not.toHaveClass('disabled');

  component.setProperty('disabled', true);
  await page.waitForChanges();
  expect(element).toHaveClass('disabled');
  });

  it('renders changes to the disabled prop set at the item level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);

  const component = await page.find('modus-tree-view-item');
  const element = await page.find('modus-tree-view-item >>> li > div.tree-item');
  expect(element).not.toHaveClass('disabled');

  component.setProperty('disabled', true);
  await page.waitForChanges();
  expect(element).toHaveClass('disabled');
  });

  it('renders changes to the size prop at the root level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const component = await page.find('modus-tree-view');
    const element = await page.find('modus-tree-view-item >>> li > div.tree-item');
    expect(element).toHaveClass('standard');

    component.setProperty('size', 'condensed');
    await page.waitForChanges();
    expect(element).toHaveClass('small');
  });

  it('renders changes to the selected prop at the item level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const component = await page.find('modus-tree-view-item');
    const element = await page.find('modus-tree-view-item >>> li > div.tree-item');
    expect(element).not.toHaveClass('selected');

    component.setProperty('selected', true);
    await page.waitForChanges();
    expect(element).toHaveClass('selected');
  });

  // clicking anywhere on the item except icons should select it and clicking again should deselect it
  it('toggles selected class on item click', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const component = await page.find('modus-tree-view-item');

    const element = await page.find('modus-tree-view-item >>> li > div.tree-item');
    expect(element).not.toHaveClass('selected');

    await component.click();
    expect(element).toHaveClass('selected');

    await component.click();
    expect(element).not.toHaveClass('selected');
  });

  //clicking anywhere on the item except icons should select it deselecting the previous item
  it('sets selected class on multiple items without multiSelection enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-id="1" label="Node one">
      </modus-tree-view-item>
      <modus-tree-view-item node-id="2" label="Node two">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const item1 = await page.find('modus-tree-view-item[node-id=\'1\']');
    const element1 = await page.find('modus-tree-view-item[node-id=\'1\'] >>> li > div.tree-item');
    const item2 = await page.find('modus-tree-view-item[node-id=\'2\']');
    const element2 = await page.find('modus-tree-view-item[node-id=\'2\'] >>> li > div.tree-item');

    expect(element1).not.toHaveClass('selected');
    expect(element2).not.toHaveClass('selected');

    await item1.click();
    expect(element1).toHaveClass('selected');

    await item2.click();
    expect(element2).toHaveClass('selected');
  });

  // clicking anywhere on an item should select it retaining previous item selection
  it('sets selected class on multiple items with multiSelection enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view multi-selection='true'>
      <modus-tree-view-item node-id="1" label="Node one">
      </modus-tree-view-item>
      <modus-tree-view-item node-id="2" label="Node two">
      </modus-tree-view-item>
    </modus-tree-view>`);

    const item1 = await page.find('modus-tree-view-item[node-id=\'1\']');
    const element1 = await page.find('modus-tree-view-item[node-id=\'1\'] >>> li > div.tree-item');
    const item2 = await page.find('modus-tree-view-item[node-id=\'2\']');
    const element2 = await page.find('modus-tree-view-item[node-id=\'2\'] >>> li > div.tree-item');

    expect(element1).not.toHaveClass('selected');
    expect(element2).not.toHaveClass('selected');

    await item1.click();
    await item2.click();

    expect(element1).toHaveClass('selected');
    expect(element2).toHaveClass('selected');
  });

  it('sets correct chevron when expanded and collapsed', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node parent">
        <modus-tree-view-item node-id="2" label="Node child">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);

    const rightChevron = await page.find('modus-tree-view-item[node-id=\'1\'] >>> .icon-chevron-right-thick');
    expect(rightChevron).toBeTruthy();

    await rightChevron.click();

    const downChevron = await page.find('modus-tree-view-item[node-id=\'1\'] >>> .icon-chevron-down-thick');
    expect(downChevron).toBeTruthy();
  });

  it('renders changes to the checkboxSelection at the root level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node parent">
        <modus-tree-view-item node-id="2" label="Node child">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);

    const component = await page.find('modus-tree-view');
    component.setProperty('checkboxSelection', true);
    await page.waitForChanges();

    const parentNodeCheckbox = await page.find('modus-tree-view-item[node-id=\'1\'] >>> modus-checkbox');
    expect(parentNodeCheckbox).toBeTruthy();

    const childNodeCheckbox = await page.find('modus-tree-view-item[node-id=\'2\'] >>> modus-checkbox');
    expect(childNodeCheckbox).toBeTruthy();
  });

  it('renders changes to the checked prop at the item level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view checkbox-selection='true'>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const component = await page.find('modus-tree-view-item');

    component.setProperty('checked', true);
    await page.waitForChanges();

    const input = await page.find('modus-tree-view-item >>> modus-checkbox >>> input');
    expect(await input.getProperty('checked')).toBeTruthy();

    component.setProperty('checked', false);
    await page.waitForChanges();
    expect(await input.getProperty('checked')).not.toBeTruthy();
  });

  // clicking on the checkbox on an item should select the checkbox unchecking the previous checkboxes
  it('selects checkbox without multiCheckboxSelection enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node parent">
        <modus-tree-view-item node-id="2" label="Node child">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);

    const component = await page.find('modus-tree-view');
    component.setProperty('checkboxSelection', true);
    await page.waitForChanges();

    const parentNodeCheckbox = await page.find('modus-tree-view-item[node-id=\'1\'] >>> modus-checkbox >>> input');

    const input = await page.find('modus-checkbox >>> input');
    expect(await input.getProperty('checked')).toBeTruthy();

    await parentNodeCheckbox.click();
    expect(parentNodeCheckbox).toBeTruthy();

    const childNodeCheckbox = await page.find('modus-tree-view-item[node-id=\'2\'] >>> modus-checkbox');
    expect(childNodeCheckbox).toBeTruthy();
  });

});
