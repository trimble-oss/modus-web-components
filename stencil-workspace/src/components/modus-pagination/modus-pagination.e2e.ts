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

  it('renders changes to min page', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="1" max-page="5" active-page="1"></modus-pagination>');
    await page.waitForChanges();

    let pages = await page.findAll('modus-pagination >>> li');
    expect(pages.length).toEqual(5);

    const element = await page.find('modus-pagination');
    element.setAttribute('min-page', 2);
    await page.waitForChanges();

    pages = await page.findAll('modus-pagination >>> li');
    expect(pages.length).toEqual(4);
  });

  it('renders changes to max page', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="1" max-page="5" active-page="1"></modus-pagination>');
    await page.waitForChanges();

    let pages = await page.findAll('modus-pagination >>> li');
    expect(pages.length).toEqual(5);

    const element = await page.find('modus-pagination');
    element.setAttribute('max-page', 6);
    await page.waitForChanges();

    pages = await page.findAll('modus-pagination >>> li');
    expect(pages.length).toEqual(6);
  });

  it('renders changes to prevNextTextButton', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="0" max-page="100" active-page="40" size="small"></modus-pagination>');

    const element = await page.find('modus-pagination');
    let prevText = await page.find('modus-pagination >>> [data-test-id="prev-button-text"]');
    let nextText = await page.find('modus-pagination >>> [data-test-id="next-button-text"]');

    expect(prevText).toBeNull();
    expect(nextText).toBeNull();

    await element.setProperty('prevPageButtonText', 'Prev');
    await element.setProperty('nextPageButtonText', 'Next');

    await page.waitForChanges();

    prevText = await page.find('modus-pagination >>> [data-test-id="prev-button-text"]');
    nextText = await page.find('modus-pagination >>> [data-test-id="next-button-text"]');

    expect(prevText.textContent).toEqual('Prev');
    expect(nextText.textContent).toEqual('Next');
  });

  it('emits pageChange on page click', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="0" max-page="100" active-page="40"></modus-pagination>');
    const pageChange = await page.spyOnEvent('pageChange');
    await page.waitForChanges();
    const element = await page.find('modus-pagination >>> li:nth-last-child(1)' )

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
    const element = await page.find('modus-pagination >>> li button.disabled');
    expect(element).not.toBeNull();
  });

  it('disables chevron control on maxPage', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination min-page="1" active-page="100" max-page="100"></modus-pagination>');
    const element = await page.find('modus-pagination >>> li button.disabled');
    expect(element).not.toBeNull();
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination aria-label="test label"></modus-pagination>');
    let element = await page.find('modus-pagination >>> nav');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination></modus-pagination>');
    let element = await page.find('modus-pagination >>> nav');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-pagination aria-label=""></modus-pagination>');
    let element = await page.find('modus-pagination >>> nav');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});
