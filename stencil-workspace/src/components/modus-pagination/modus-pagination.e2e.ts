import { newE2EPage } from '@stencil/core/testing';

describe('modus-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination></modus-pagination>');
    const element = await page.find('modus-pagination');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to size', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="0" max-page="100" active-page="40" size="small"></modus-pagination>');
    const element = await page.find('modus-pagination');
    let nav = await page.find('modus-pagination >>> nav');
    expect(nav).toHaveClass('small');

    await element.setProperty('size', 'medium');
    await page.waitForChanges();
    nav = await page.find('modus-pagination >>> nav');
    expect(nav).toHaveClass('medium');
  });

  it('emits pageChange on page click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="0" max-page="100" active-page="40"></modus-pagination>');
    const pageChange = await page.spyOnEvent('pageChange');
    const element = await page.find('modus-pagination >>> li.active + li');

    await element.click();
    await page.waitForChanges();
    expect(pageChange).toHaveReceivedEvent();
  });

  it('emits pageChange on chevron click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="0" max-page="100" active-page="40"></modus-pagination>');
    const pageChange = await page.spyOnEvent('pageChange');
    const leftChevron = await page.find('modus-pagination >>> li:first-child');

    await leftChevron.click();
    await page.waitForChanges();
    expect(pageChange).toHaveReceivedEvent();

    const rightChevron = await page.find('modus-pagination >>> li:last-child');

    await rightChevron.click();
    await page.waitForChanges();
    expect(pageChange).toHaveReceivedEvent();
  });

  it('emits pageChange on active-page modification', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="0" max-page="100" active-page="40"></modus-pagination>');
    const pageChange = await page.spyOnEvent('pageChange');
    const element = await page.find('modus-pagination');

    element.setAttribute('active-page', 20);
    await page.waitForChanges();
    expect(pageChange).toHaveReceivedEvent();
  });

  it('disables chevron control on minPage', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="1" active-page="1" max-page="100"></modus-pagination>');
    const element = await page.find('modus-pagination >>> li.disabled');
    expect(element).not.toBeNull();
  });

  it('disables chevron control on maxPage', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="1" active-page="100" max-page="100"></modus-pagination>');
    const element = await page.find('modus-pagination >>> li.disabled');
    expect(element).not.toBeNull();
  });
});
