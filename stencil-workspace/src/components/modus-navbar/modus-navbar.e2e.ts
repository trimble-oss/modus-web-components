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
    await page.setContent('<modus-navbar show-search></modus-navbar>');

    await page.waitForChanges();

    const searchIcon = await page.find('modus-navbar >>> .search');
    const navbar = await page.find('modus-navbar');
    navbar.setProperty('searchTooltip', { text: 'Search' });
    await page.waitForChanges();

    const tooltip = await page.find('modus-navbar >>> :first-child');
    const tooltipText = await tooltip.find('modus-tooltip >>> .text');
    expect(await tooltipText.isVisible()).toBe(false);

    await searchIcon
      .find('modus-tooltip >>> .modus-tooltip')
      .then((e) => e.hover());
    await page.waitForChanges();

    expect(await tooltipText.isVisible()).toBe(true);
    expect(tooltipText.innerText).toBe('Search');
  });

  it('should show small logo (icon) when screen size <= 576px', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 300, height: 640 });
    await page.setContent(
      '<modus-navbar></modus-navbar>'
    );

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('logoOptions', {
      primary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: 24,
      },
      secondary: { url: 'https://modus.trimble.com/favicon.svg', height: 24 },
    });

    await page.waitForChanges();

    const productLogo = await page.find('modus-navbar >>> .product-logo-primary');
    const productIcon = await page.find('modus-navbar >>> .product-logo-secondary');

    expect(await productIcon.isVisible()).toBe(true);
    expect(await productLogo.isVisible()).toBe(false);
  });

  it('should show big logo when screen size > 576px', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<modus-navbar></modus-navbar>'
    );

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('logoOptions', {
      primary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: 24,
      },
      secondary: { url: 'https://modus.trimble.com/favicon.svg', height: 24 },
    });

    await page.waitForChanges();

    const productLogo = await page.find('modus-navbar >>> .product-logo-primary');
    const productIcon = await page.find('modus-navbar >>> .product-logo-secondary');

    expect(await productIcon.isVisible()).toBe(false);
    expect(await productLogo.isVisible()).toBe(true);
  });

  it('should show tooltip on hover of profile menu', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('profileMenuOptions', { tooltip: { text: 'Modus User' } });
    await page.waitForChanges();

    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');
    const tooltipText = await profileMenuButton.find('modus-tooltip >>> .text');

    expect(await tooltipText.isVisible()).toBe(false);

    await profileMenuButton.find('modus-tooltip >>> .modus-tooltip').then((e) => e.hover());

    await page.waitForChanges();

    expect(await tooltipText.isVisible()).toBe(true);
    expect(tooltipText.innerText).toBe('Modus User');
  });

  it('should hide tooltip on hovering over of profile menu', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar profile-menu-tooltip-text="Modus User"></modus-navbar>');

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('profileMenuOptions', { tooltip: { text: 'Modus User' } });
    await page.waitForChanges();

    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');
    const tooltipText = await profileMenuButton.find('modus-tooltip >>> .text');

    await profileMenuButton.find('modus-tooltip >>> .modus-tooltip').then((e) => e.hover());

    await page.waitForChanges();

    page.mouse.move(0, 0);

    await page.waitForChanges();
    expect(await tooltipText.isVisible()).toBe(false);
  });

  it('should hide tooltip while profile menu open', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar profile-menu-tooltip-text="Modus User"></modus-navbar>');

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('profileMenuOptions', { tooltip: { text: 'Modus User' } });
    await page.waitForChanges();

    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');
    const tooltipText = await profileMenuButton.find('modus-tooltip >>> .text');

    await profileMenuButton.find('modus-tooltip >>> .modus-tooltip').then((e) => e.hover());

    await page.waitForChanges();

    await profileMenuButton.click();

    await page.waitForChanges();

    const profileMenu = await page.find('modus-navbar >>> modus-navbar-profile-menu');

    expect(await profileMenu.isVisible()).toBe(true);
    expect(await tooltipText.isVisible()).toBe(false);
  });

  it('should render primary logo in all screen when secondary logo not provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<modus-navbar></modus-navbar>'
    );

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('logoOptions', {
      primary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: 24,
      }
    });

    await page.waitForChanges();

    const primaryLogo = await page.find('modus-navbar >>> [data-test-id="primary-logo"]');
    const secondaryLogo = await page.find('modus-navbar >>> [data-test-id="secondary-logo"]');

    expect(await secondaryLogo).toBeFalsy();
    expect(await primaryLogo.isVisible()).toBe(true);

    await page.setViewport({ width: 300, height: 640 });

    expect(await secondaryLogo).toBeFalsy();
    expect(await primaryLogo.isVisible()).toBe(true);
  });

  it('should render secondary logo in all screen when primary logo not provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<modus-navbar></modus-navbar>'
    );

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('logoOptions', {
      secondary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: 24,
      }
    });

    await page.waitForChanges();

    const primaryLogo = await page.find('modus-navbar >>> [data-test-id="primary-logo"]');
    const secondaryLogo = await page.find('modus-navbar >>> [data-test-id="secondary-logo"]');

    expect(await primaryLogo).toBeFalsy();
    expect(await secondaryLogo.isVisible()).toBe(true);

    await page.setViewport({ width: 300, height: 640 });

    expect(await primaryLogo).toBeFalsy();
    expect(await secondaryLogo.isVisible()).toBe(true);
  });

  it('should not render primary and secondary logo in all screen when logoOptions not set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<modus-navbar></modus-navbar>'
    );

    await page.waitForChanges();

    const primaryLogo = await page.find('modus-navbar >>> [data-test-id="primary-logo"]');
    const secondaryLogo = await page.find('modus-navbar >>> [data-test-id="secondary-logo"]');

    expect(await primaryLogo).toBeFalsy();
    expect(await secondaryLogo).toBeFalsy();
  });
});