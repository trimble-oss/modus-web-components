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
      { display: 'one', id: '1' },
      { display: 'one', id: '1' },
    ];

    await page.setContent('<modus-breadcrumb></modus-breadcrumb>');
    const component = await page.find('modus-breadcrumb');
    component.setProperty('crumbs', crumbs);
    await page.waitForChanges();
    const crumbClick = await page.spyOnEvent('crumbClick');
    const elements = await page.findAll('modus-breadcrumb >>> a');

    await elements[0].click();
    await page.waitForChanges();

    expect(crumbClick).toHaveReceivedEvent();
    expect(crumbClick).toHaveReceivedEventDetail(crumbs[0]);
  });
});
