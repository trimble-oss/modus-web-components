import { newE2EPage } from '@stencil/core/testing';

describe('modus-content-tree-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item></modus-content-tree-item>');
    const component = await page.find('modus-content-tree-item');
    const element = await page.find('modus-content-tree-item >>> li');
    expect(element).not.toHaveClass('disabled');

    component.setProperty('disabled', true);
    await page.waitForChanges();
    expect(element).toHaveClass('disabled');
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item></modus-content-tree-item>');
    const component = await page.find('modus-content-tree-item');
    const element = await page.find('modus-content-tree-item >>> li');
    expect(element).toHaveClass('standard');

    component.setProperty('size', 'condensed');
    await page.waitForChanges();
    expect(element).toHaveClass('small');
  });

  it('sets correct containerClass for disabled, include-bottom-border, and selected', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item disabled include-bottom-border selected></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> li');
    expect(element).toHaveClass('disabled');
    expect(element).toHaveClass('bottom-border');
    expect(element).toHaveClass('selected');
  });

  it('includes drag handle on allowDrag', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item allow-drag></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .icon-drag-handle');
    expect(element).toBeTruthy();
  });

  it('includes chevron handle on expandable', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item expandable></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .icon-chevron-right-thick');
    expect(element).toBeTruthy();
  });

  it('sets correct chevron on expanded when expandable', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item expandable></modus-content-tree-item>');
    const rightChevron = await page.find('modus-content-tree-item >>> .icon-chevron-right-thick');
    await rightChevron.click();

    const downChevron = await page.find('modus-content-tree-item >>> .icon-chevron-down-thick');
    expect(downChevron).toBeTruthy();
  });

  it('includes folder icon on includeFolderIcon', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item include-folder-icon></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .icon-folder');
    expect(element).toBeTruthy();
  });

  it('includes checkbox on includeCheckbox', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item include-checkbox></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> modus-checkbox');
    expect(element).toBeTruthy();
  });

  it('has 32px depth padding at depth level 1', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item depth="1"></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .depth-padding');
    element.getComputedStyle().then(style => {
      expect(style.width).toBe('32px');
    });
  });

  it('has 64px depth padding at depth level 2', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item depth="2"></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .depth-padding');
    element.getComputedStyle().then(style => {
      expect(style.width).toBe('64px');
    });
  });

  it('has 26px depth padding at depth level 1 when condensed', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item depth="1" size="condensed"></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .depth-padding');
    element.getComputedStyle().then(style => {
      expect(style.width).toBe('26px');
    });
  });

  it('has 52px depth padding at depth level 2 when condensed', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item depth="2" size="condensed"></modus-content-tree-item>');
    const element = await page.find('modus-content-tree-item >>> .depth-padding');
    element.getComputedStyle().then(style => {
      expect(style.width).toBe('52px');
    });
  });

  it('emits checkboxClick event on checkbox click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item include-checkbox></modus-content-tree-item>');
    const checkboxClick = await page.spyOnEvent('checkboxClick');
    const checkbox = await page.find('modus-content-tree-item >>> modus-checkbox');

    await checkbox.click();
    await page.waitForChanges();
    expect(checkboxClick).toHaveReceivedEvent();
  });

  it('emits expandeClick event on expand click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item expandable></modus-content-tree-item>');
    const expandClick = await page.spyOnEvent('expandClick');
    const expandButton = await page.find('modus-content-tree-item >>> .icon-chevron-right-thick');

    await expandButton.click();
    await page.waitForChanges();
    expect(expandClick).toHaveReceivedEvent();
  });

  it('does not emit expandClick event on disabled expand click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item expandable disabled></modus-content-tree-item>');
    const expandClick = await page.spyOnEvent('expandClick');
    const component = await page.find('modus-content-tree-item');
    const expandButton = await page.find('modus-content-tree-item >>> .icon-chevron-right-thick');
    component.setProperty('disabled', true);

    await expandButton.click();
    await page.waitForChanges();
    expect(expandClick).not.toHaveReceivedEvent();
  });

  it('emits itemClick event on li click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item></modus-content-tree-item>');
    const itemClick = await page.spyOnEvent('itemClick');
    const element = await page.find('modus-content-tree-item >>> li');

    await element.click();
    await page.waitForChanges();
    expect(itemClick).toHaveReceivedEvent();
  });

  it('does not emit itemClick event on disabled li click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-content-tree-item></modus-content-tree-item>');
    const component = await page.find('modus-content-tree-item');
    const itemClick = await page.spyOnEvent('itemClick');
    const element = await page.find('modus-content-tree-item >>> li');
    component.setProperty('disabled', true);
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(itemClick).not.toHaveReceivedEvent();
  });
});
