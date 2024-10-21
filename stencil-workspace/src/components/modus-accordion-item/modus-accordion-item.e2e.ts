import { newE2EPage } from '@stencil/core/testing';

describe('modus-accordion-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const element = await page.find('modus-accordion-item');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the disabled prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const component = await page.find('modus-accordion-item');
    const element = await page.find('modus-accordion-item >>> .header');
    expect(element).not.toHaveClass('disabled');

    component.setProperty('disabled', true);
    await page.waitForChanges();
    expect(element).toHaveClass('disabled');
  });

  it('renders changes to the expanded prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const component = await page.find('modus-accordion-item');
    const element = await page.find('modus-accordion-item >>> .body');
    expect(element).toHaveClass('collapse');
    expect(element).not.toHaveClass('show');

    component.setProperty('expanded', true);
    await page.waitForChanges();
    expect(element).toHaveClass('show');
  });

  it('renders changes to the headerText prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const component = await page.find('modus-accordion-item');
    const element = await page.find('modus-accordion-item >>> .title');
    expect(element.innerText).toBeFalsy();

    component.setProperty('headerText', 'Header Text');
    await page.waitForChanges();
    expect(element.innerText).toEqual('Header Text');
  });

  it('renders changes to the size prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const component = await page.find('modus-accordion-item');
    const headerElement = await page.find('modus-accordion-item >>> .header');
    const iconElement = await page.find('modus-accordion-item >>> .icon-expand-more');
    let iconComputedStyle = await iconElement.getComputedStyle();
    expect(headerElement).toHaveClass('standard');
    expect(iconComputedStyle['height']).toEqual('24px');

    component.setProperty('size', 'condensed');
    await page.waitForChanges();
    iconComputedStyle = await iconElement.getComputedStyle();
    expect(headerElement).toHaveClass('small');
  });

  it('emits closed event on header click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item expanded></modus-accordion-item>');
    const closed = await page.spyOnEvent('closed');
    const element = await page.find('modus-accordion-item >>> .header');

    await element.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForChanges();
    expect(closed).toHaveReceivedEvent();
  });

  it('emits opened event on header click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const opened = await page.spyOnEvent('opened');
    const element = await page.find('modus-accordion-item >>> .header');

    await element.click();
    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForChanges();
    expect(opened).toHaveReceivedEvent();
  });

  it('does not emit an event on disabled accordion item header click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    const opened = await page.spyOnEvent('opened');
    const component = await page.find('modus-accordion-item');
    const element = await page.find('modus-accordion-item >>> .header');
    component.setProperty('disabled', true);
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();
    expect(opened).not.toHaveReceivedEvent();
  });

  it('renders changes to the expandButtonType prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    await page.waitForChanges();

    const component = await page.find('modus-accordion-item');
    const element = await page.find('modus-accordion-item >>> .icon-expand-more');
    expect(element).toHaveClass('icon-expand-more');
    expect(element).not.toHaveClass('icon-expand-more-circle');

    component.setProperty('expandButtonType', 'circleArrow');
    await page.waitForChanges();
    expect(element).toHaveClass('icon-expand-more-circle');
    expect(element).not.toHaveClass('icon-expand-more');
  });

  it('renders changes to the icon prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-accordion-item></modus-accordion-item>');
    await page.waitForChanges();

    const component = await page.find('modus-accordion-item');
    const element = await page.find('modus-accordion-item >>> .header');
    expect(element).not.toHaveClass('icon');

    component.setProperty('icon', 'add');
    await page.waitForChanges();
    const icon = await page.find('modus-accordion-item >>> .icon-add');
    expect(icon).toBeTruthy();
  });
});
