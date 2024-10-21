import { newE2EPage } from '@stencil/core/testing';

describe('modus-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-breadcrumb></modus-breadcrumb>');
    const element = await page.find('modus-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the crumbs prop', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-breadcrumb></modus-breadcrumb>');
    const component = await page.find('modus-breadcrumb');
    let elements = await page.findAll('modus-breadcrumb >>> li');
    expect(elements.length).toEqual(0);

    const crumbs = [
      { display: 'one', id: '1' },
      { display: 'one', id: '1' },
      { display: 'one', id: '1' },
    ];
    component.setProperty('crumbs', crumbs);
    await page.waitForChanges();
    elements = await page.findAll('modus-breadcrumb >>> li');
    expect(elements.length).toEqual(3);
  });

  it('emits crumbClick event on crumb click', async () => {
    const page = await newE2EPage();
    const crumbs = [
      { display: 'one', id: '1' },
      { display: 'one', id: '2' },
      { display: 'one', id: '3' },
    ];

    await page.setContent('<modus-breadcrumb></modus-breadcrumb>');
    const component = await page.find('modus-breadcrumb');
    component.setProperty('crumbs', crumbs);
    await page.waitForChanges();

    const crumbClick = await page.spyOnEvent('crumbClick');
    const elements = await page.findAll('modus-breadcrumb >>> li');

    await (await elements[0].find('a')).click();
    await page.waitForChanges();

    expect(crumbClick).toHaveReceivedEvent();
    expect(crumbClick).toHaveReceivedEventDetail(crumbs[0]);
  });

  it('renders aria-label on alert div when set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-breadcrumb aria-label="test label"></modus-breadcrumb>');
    let element = await page.find('modus-breadcrumb >>> nav');
    expect(element).toBeDefined();
    expect(element).toHaveAttribute('aria-label');
    expect(element.getAttribute('aria-label')).toEqual('test label');
  });

  it('does not render aria-label on alert div when not set', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-breadcrumb></modus-breadcrumb>');
    let element = await page.find('modus-breadcrumb >>> nav');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });

  it('does not render aria-label on alert div when set to empty string', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-breadcrumb aria-label=""></modus-breadcrumb>');
    let element = await page.find('modus-breadcrumb >>> nav');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('aria-label');
  });
});
