import { newE2EPage } from '@stencil/core/testing';

describe('modus-tree-view-item', () => {

  // verify renders
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

  // verify props
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

  component.setProperty('disabled', 'true');
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


  it('renders changes to the selectedItems prop at the root level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const root = await page.find('modus-tree-view');
    const element = await page.find('modus-tree-view-item >>> li > div.tree-item');
    expect(element).not.toHaveClass('selected');

    root.setProperty('selectedItems', ['1']);
    await page.waitForChanges();
    expect(element).toHaveClass('selected');
  });

  it('renders changes to the checkedItems prop at the root level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view checkbox-selection='true'>
      <modus-tree-view-item node-Id="1" label="Node one">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const root = await page.find('modus-tree-view');
    const input = await page.find('modus-tree-view-item >>> modus-checkbox >>> input');

    // check
    root.setProperty('checkedItems', ['1']);
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBeTruthy();

    // uncheck
    root.setProperty('checkedItems', []);
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBeFalsy();
  });

  it('renders changes to the expandedItems prop at the item level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Node one">
        <modus-tree-view-item node-id="2" label="Node child one">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);
    const root = await page.find('modus-tree-view');

    const rightChevron = await page.find('modus-tree-view-item >>> .icon-chevron-right-thick');
    expect(rightChevron).toBeTruthy();

    root.setProperty('expandedItems', ['1']);
    await page.waitForChanges();

    const downChevron = await page.find('modus-tree-view-item >>> .icon-chevron-down-thick');
    expect(downChevron).toBeTruthy();
  });

  it('renders changes to the label prop at the item level', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const component = await page.find('modus-tree-view-item');

    component.setProperty('label', 'Test Node');
    await page.waitForChanges();

    const labelSlot = await page.find('modus-tree-view-item >>> div.label-slot');
    expect(labelSlot).toEqualText('Test Node');
  });

  // verify expand and collapse states
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

  // verify selection state
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

  // clicking anywhere on the item except icons should select it deselecting the previous item
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

    const root = await page.find('modus-tree-view');
    const element1 = await page.find('modus-tree-view-item[node-id=\'1\'] >>> li > div.tree-item');
    const element2 = await page.find('modus-tree-view-item[node-id=\'2\'] >>> li > div.tree-item');

    expect(element1).not.toHaveClass('selected');
    expect(element2).not.toHaveClass('selected');

    root.setProperty('selectedItems', ['1','2']);
    await page.waitForChanges();

    expect(element1).toHaveClass('selected');
    expect(element2).toHaveClass('selected');
  });

  // verify checkbox state
  // clicking on the checkbox on an item should select the checkbox unchecking the previous checkboxes
  it('selects checkbox without multiCheckboxSelection enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view checkbox-selection='true'>
      <modus-tree-view-item node-Id="1" label="Node parent">
        <modus-tree-view-item node-id="2" label="Node child">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);

    const root = await page.find('modus-tree-view');
    await page.waitForChanges();

    const parentNodeCheckbox = await page.find('modus-tree-view-item[node-id=\'1\'] >>> modus-checkbox');
    await parentNodeCheckbox.click();

    await page.waitForChanges();
    expect(await root.getProperty('checkedItems')).toContain('1');

    // child node should not be checked because multi-checkbox-selection isn't enabled
    expect(await root.getProperty('checkedItems')).not.toContain('2');
  });

  // clicking the checkbox on an item should select the checkbox and retains the previous checkbox selection
  // if the item is a parent node should also select checkboxes of its children
  it('selects checkbox with multiCheckboxSelection enabled', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view checkbox-selection='true' multi-checkbox-selection='true'>
      <modus-tree-view-item node-Id="1" label="Node parent one">
        <modus-tree-view-item node-id="2" label="Node child">
        </modus-tree-view-item>
      </modus-tree-view-item>
      <modus-tree-view-item node-Id="3" label="Node parent two">
      </modus-tree-view-item>
    </modus-tree-view>`);

    const root = await page.find('modus-tree-view');
    await page.waitForChanges();
    // node one
    const nodeOneCheckbox = await page.find('modus-tree-view-item[node-id=\'1\'] >>> modus-checkbox');
    // node two
    const nodeTwoCheckbox = await page.find('modus-tree-view-item[node-id=\'3\'] >>> modus-checkbox');

    // click node one checkbox
    await nodeOneCheckbox.click();
    await page.waitForChanges();

    // click node two checkbox
    await nodeTwoCheckbox.click();
    await page.waitForChanges();

    // verify all the nodes
    expect(await root.getProperty('checkedItems')).toContain('1');
    expect(await root.getProperty('checkedItems')).toContain('2');
    expect(await root.getProperty('checkedItems')).toContain('3');
  });

  it('toggles state of the parent node checkbox', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view checkbox-selection='true' multi-checkbox-selection='true'>
      <modus-tree-view-item node-Id="1" label="Node parent">
        <modus-tree-view-item node-id="2" label="Node child1">
        </modus-tree-view-item>
        <modus-tree-view-item node-id="3" label="Node child2">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);

    const root = await page.find('modus-tree-view');
    root.setProperty('expandedItems', ['1']);
    await page.waitForChanges();

    // check child1
    const childNodeCb = await page.find('modus-tree-view-item[node-id=\'2\'] >>> modus-checkbox');
    await childNodeCb.click();
    await page.waitForChanges();

    // verify parent checked state when only one of its children is checked
    expect(await root.getProperty('checkedItems')).not.toContain('1');

    // check child2
    const childNode2Cb = await page.find('modus-tree-view-item[node-id=\'3\'] >>> modus-checkbox');
    await childNode2Cb.click();
    await page.waitForChanges();

    // verify parent checked state when all of its children are checked
    expect(await root.getProperty('checkedItems')).toContain('1');
  });

  // verify events
  it('emits itemClick event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Parent">
      </modus-tree-view-item>
    </modus-tree-view>`);
    const component = await page.find('modus-tree-view-item');
    const itemClick = await page.spyOnEvent('itemClick');

    await component.click();
    await page.waitForChanges();

    expect(itemClick).toHaveReceivedEvent();
  });

  it('emits itemExpandToggle event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view>
      <modus-tree-view-item node-Id="1" label="Parent">
        <modus-tree-view-item node-id="2" label="Child">
        </modus-tree-view-item>
      </modus-tree-view-item>
    </modus-tree-view>`);

    const itemExpandToggle = await page.spyOnEvent('itemExpandToggle');
    const rightChevron = await page.find('modus-tree-view-item[node-id=\'1\'] >>> .icon-chevron-right-thick');
    expect(rightChevron).toBeTruthy();

    await rightChevron.click();
    await page.waitForChanges();

    expect(itemExpandToggle).toHaveReceivedEvent();
  });

  it('emits checkboxClick event', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <modus-tree-view checkbox-selection='true'>
      <modus-tree-view-item node-Id="1" label="Parent">
      </modus-tree-view-item>
    </modus-tree-view>`);

    const checkboxClick = await page.spyOnEvent('checkboxClick');
    await page.waitForChanges();

    const checkbox = await page.find('modus-tree-view-item[node-id=\'1\'] >>> modus-checkbox');
    await checkbox.click();
    await page.waitForChanges();

    expect(checkboxClick).toHaveReceivedEvent();
  });

});
