import { newE2EPage } from '@stencil/core/testing';

describe('modus-navbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar></modus-navbar>');
    const element = await page.find('modus-navbar');
    expect(element).toHaveClass('hydrated');
  });

  it('shows shadow when showShadow is true', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar show-shadow></modus-navbar>');
    const element = await page.find('modus-navbar >>> nav');
    expect(element).toHaveClass('shadow');
  });

  it('shows no shadow when showShadow is false', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar></modus-navbar>');
    const element = await page.find('modus-navbar >>> nav');
    expect(element).not.toHaveClass('shadow');
  });

  it('renders changes to variant', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-navbar></modus-navbar>');
    const component = await page.find('modus-navbar');

    component.setProperty('variant', 'blue');
    await page.waitForChanges();
    const element = await page.find('modus-navbar >>> nav');
    expect(element).toHaveClass('nav-blue');
  });

  it('emits appsMenuOpen when apps menu opens', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-apps-menu></modus-navbar>');

    const appsMenuOpen = await page.spyOnEvent('appsMenuOpen');
    await page.waitForChanges();
    const appsMenuButton = await page.find('modus-navbar >>> [data-test-id="apps-menu"]');
    await appsMenuButton.click({ clickCount: 2 });
    await page.waitForChanges();
    expect(appsMenuOpen).toHaveReceivedEventTimes(1);
  });

  it('emits appsMenuAppOpen with app id', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-apps-menu></modus-navbar>');
    await page.waitForChanges();
    const navbar = await page.find('modus-navbar');
    navbar.setProperty('apps', [
      {
        logoUrl: '',
        name: 'App 1',
        url: '',
        category: '',
        showCategory: false,
      },
    ]);
    await page.waitForChanges();
    const appsMenuAppOpen = await page.spyOnEvent('appsMenuAppOpen');
    const appsMenu = await page.find('modus-navbar >>> [data-test-id="apps-menu"]');
    await appsMenu.click();
    await page.waitForChanges();
    const appsMenuApp = await appsMenu.find('modus-navbar-apps-menu >>> .app');
    await appsMenuApp.click();
    await page.waitForChanges();
    expect(appsMenuAppOpen).toHaveReceivedEventTimes(1);
    expect(appsMenuAppOpen).toHaveReceivedEventDetail({
      logoUrl: '',
      name: 'App 1',
      url: '',
      category: '',
      showCategory: false,
    });
  });

  it('emits notificationsMenuOpen', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-notifications></modus-navbar>');

    const notificationsMenuOpen = await page.spyOnEvent('notificationsMenuOpen');
    await page.waitForChanges();
    const notificationsMenuButton = await page.find('modus-navbar >>> [data-test-id="notifications-menu"]');
    await notificationsMenuButton.click({ clickCount: 2 });
    await page.waitForChanges();
    expect(notificationsMenuOpen).toHaveReceivedEventTimes(1);
  });

  it('emits helpOpen', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-help></modus-navbar>');

    const helpOpen = await page.spyOnEvent('helpOpen');
    await page.waitForChanges();
    const helpButton = await page.find('modus-navbar >>> [data-test-id="help-menu"]');
    await helpButton.click();
    await page.waitForChanges();
    expect(helpOpen).toHaveReceivedEventTimes(1);
  });

  it('emits profileMenuOpen', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-notifications></modus-navbar>');

    const profileMenuOpen = await page.spyOnEvent('profileMenuOpen');
    await page.waitForChanges();
    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');
    await profileMenuButton.click({ clickCount: 2 });
    await page.waitForChanges();
    expect(profileMenuOpen).toHaveReceivedEventTimes(1);
  });

  it('should show tooltip on over of search button', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-search search-label="Search"></modus-navbar>');

    await page.waitForChanges();

    const tooltip = await page.find('modus-navbar >>> :first-child');
    const tooltipText = await tooltip.find('modus-tooltip >>> .text');
    expect(await tooltipText.isVisible()).toBe(false);

    await tooltip.find('modus-tooltip >>> .modus-tooltip').then((e) => e.hover());
    await page.waitForChanges();

    expect(await tooltipText.isVisible()).toBe(true);
    expect(tooltipText.innerText).toBe('Search');
  });
});
