import { newE2EPage } from '@stencil/core/testing';
import { ModusNavbarButton } from './modus-navbar.models';

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

  it('hides custom button menu when hideMenu is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');
    const navbar = await page.find('modus-navbar');

    const buttons: ModusNavbarButton[] = [
      {
        id: 'with-menu',
        icon: 'moon',
        orderIndex: 0,
        hideMenu: false,
      },
      {
        id: 'without-menu',
        icon: 'moon',
        orderIndex: 1,
        hideMenu: true,
      },
    ];
    navbar.setProperty('buttons', buttons);

    await page.waitForChanges();

    const withMenu = await page.find('modus-navbar >>> slot[name="with-menu"]');
    expect(withMenu).not.toBeNull();

    const withoutMenu = await page.find('modus-navbar >>> slot[name="without-menu"]');
    expect(withoutMenu).toBeNull();
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

  it('emits buttonClick when a button in the custom button list is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');
    const buttonClickEvent = await page.spyOnEvent('buttonClick');
    const navbar = await page.find('modus-navbar');

    const buttons: ModusNavbarButton[] = [
      {
        id: 'custom-button-id',
        icon: 'moon',
        orderIndex: 0,
      },
    ];
    navbar.setProperty('buttons', buttons);

    await page.waitForChanges();

    const renderedButton = await page.find('modus-navbar >>> .navbar-button');
    await renderedButton.click({ count: 2 });

    expect(buttonClickEvent).toHaveReceivedEventTimes(2);
    expect(buttonClickEvent).toHaveReceivedEventDetail('custom-button-id');
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

    const tooltip = await searchIcon.find('modus-tooltip >>> .tooltip');
    expect(tooltip.getAttribute('data-show')).toBeNull();

    await searchIcon.hover();
    await page.waitForChanges();

    await new Promise((r) => setTimeout(r, 500));
    expect(tooltip.getAttribute('data-show')).not.toBeNull();

    const tooltipText = await page.$eval('modus-navbar >>> modus-tooltip >>> .tooltip', (tooltip) => tooltip.textContent);
    expect(tooltipText).toBe('Search');
  });

  it('should show searchoverlay on search button click', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-search></modus-navbar>');
    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('enableSearchOverlay', true);
    await page.waitForChanges();

    const searchButton = await page.find('modus-navbar >>> [data-test-id="search-menu"]');
    await searchButton.click();

    await page.waitForChanges();

    const searchBox = await page.find('modus-navbar >>> modus-navbar-search-overlay');
    expect(searchBox).toBeTruthy();
  });

  it('should hide searchoverlay on close button click', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-search></modus-navbar>');
    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('enableSearchOverlay', true);
    await page.waitForChanges();

    const searchButton = await page.find('modus-navbar >>> [data-test-id="search-menu"]');
    await searchButton.click();
    await page.waitForChanges();

    let searchBox = await page.find('modus-navbar >>> modus-navbar-search-overlay');
    expect(searchBox).toBeTruthy();

    const closeButton = await page.find('modus-navbar >>> [data-test-id="close-button"]');
    await closeButton.click();
    await page.waitForChanges();

    searchBox = await page.find('modus-navbar >>> modus-navbar-search-overlay');
    expect(searchBox).toBeFalsy();
  });

  it('should search button emit event when enableSearchOverlay set to false', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar show-search></modus-navbar>');
    await page.waitForChanges();

    const searchMenuClick = await page.spyOnEvent('searchMenuClick');
    await page.waitForChanges();

    const searchButton = await page.find('modus-navbar >>> [data-test-id="search-menu"]');
    await searchButton.click();
    await page.waitForChanges();

    expect(searchMenuClick).toHaveReceivedEventTimes(1);
  });

  it('should show small logo (icon) when screen size <= 576px', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 300, height: 640 });
    await page.setContent('<modus-navbar></modus-navbar>');

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
    await page.setContent('<modus-navbar></modus-navbar>');

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

  it('should show tooltip on hover of profile menu and hide it when menu is open', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('profileMenuOptions', { tooltip: { text: 'Modus User' } });
    await page.waitForChanges();

    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');

    const tooltip = await profileMenuButton.find('modus-tooltip >>> .tooltip');
    expect(tooltip.getAttribute('data-show')).toBeNull();

    await profileMenuButton.hover();
    await page.waitForChanges();

    await new Promise((r) => setTimeout(r, 500));
    expect(tooltip.getAttribute('data-show')).not.toBeNull();

    const tooltipText = await page.$eval('modus-navbar >>> modus-tooltip >>> .tooltip', (tooltip) => tooltip.textContent);
    expect(tooltipText).toBe('Modus User');

    await profileMenuButton.click();
    await new Promise((r) => setTimeout(r, 500));
    expect(tooltip.getAttribute('data-show')).toBeNull();
  });

  it('should render primary logo in all screen when secondary logo not provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('logoOptions', {
      primary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: 24,
      },
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
    await page.setContent('<modus-navbar></modus-navbar>');

    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('logoOptions', {
      secondary: {
        url: 'https://modus-bootstrap.trimble.com/img/trimble-logo-rev.svg',
        height: 24,
      },
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
    await page.setContent('<modus-navbar></modus-navbar>');

    await page.waitForChanges();

    const primaryLogo = await page.find('modus-navbar >>> [data-test-id="primary-logo"]');
    const secondaryLogo = await page.find('modus-navbar >>> [data-test-id="secondary-logo"]');

    expect(await primaryLogo).toBeFalsy();
    expect(await secondaryLogo).toBeFalsy();
  });

  it('should render slot in profile menu when UserContent is enable', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');
    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('enableUserContent', true);
    await page.waitForChanges();

    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');

    await profileMenuButton.click();
    await page.waitForChanges();

    const usercontent = await page.find('modus-navbar >>> slot[name="userCustomContent"]');
    expect(usercontent).not.toBeNull();
  });

  it('should not render slot in profile menu when UserContent is disable', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-navbar></modus-navbar>');
    await page.waitForChanges();

    const navbar = await page.find('modus-navbar');
    navbar.setProperty('enableUserContent', false);
    await page.waitForChanges();

    const profileMenuButton = await page.find('modus-navbar >>> .profile-menu');

    await profileMenuButton.click();
    await page.waitForChanges();

    const usercontent = await page.find('modus-navbar >>> slot[name="userCustomContent"]');
    expect(usercontent).toBeNull();
  });
});
