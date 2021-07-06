import { newE2EPage } from '@stencil/core/testing';

describe('modus-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-list-item></modus-list-item>');
    const element = await page.find('modus-list-item');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-list-item></modus-list-item>');
    const component = await page.find('modus-list-item');
    const element = await page.find('modus-list-item >>> li');
    expect(element).not.toHaveClass('disabled');

    component.setProperty('disabled', true);
    await page.waitForChanges();
    expect(element).toHaveClass('disabled');
  });

  it('renders changes to the selected prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-list-item></modus-list-item>');
    const component = await page.find('modus-list-item');
    const liElement = await page.find('modus-list-item >>> li');
    expect(liElement).not.toHaveClass('selected');

    component.setProperty('selected', true);
    await page.waitForChanges();
    expect(liElement).toHaveClass('selected');
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-list-item></modus-list-item>');
    const component = await page.find('modus-list-item');
    const element = await page.find('modus-list-item >>> li');
    expect(element).toHaveClass('standard');

    component.setProperty('size', 'condensed');
    await page.waitForChanges();
    expect(element).toHaveClass('small');
  });

  it('emits itemClick event on li click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-list-item></modus-list-item>');
    const itemClick = await page.spyOnEvent('itemClick');
    const element = await page.find('modus-list-item >>> li');

    await element.click();
    await page.waitForChanges();
    expect(itemClick).toHaveReceivedEvent();
  });

  it('does not emit itemClick event on disabled li click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-list-item></modus-list-item>');
    const component = await page.find('modus-list-item');
    const itemClick = await page.spyOnEvent('itemClick');
    const element = await page.find('modus-list-item >>> li');
    component.setProperty('disabled', true);
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(itemClick).not.toHaveReceivedEvent();
  });
});
