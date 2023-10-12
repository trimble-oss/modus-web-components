import { newSpecPage } from '@stencil/core/testing';
import { ModusNavbarProfileMenu } from './modus-navbar-profile-menu';

describe('modus-navbar-profile-menu', () => {
  beforeAll(() => {
    class MutationObserverMock {
      observe() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    global.MutationObserver = MutationObserverMock;
  });

  afterAll(() => {
    delete global.MutationObserver;
  });

  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusNavbarProfileMenu],
      html: '<modus-navbar-profile-menu></modus-navbar-profile-menu>',
    });

    const profileMenuElement: HTMLModusNavbarProfileMenuElement = root.shadowRoot.querySelector('div.profile-menu');

    expect(profileMenuElement).toBeTruthy();
  });

  it('renders with username', async () => {
    const modusProfileMenu = new ModusNavbarProfileMenu();
    modusProfileMenu.username = 'John Doe';

    expect(modusProfileMenu.username).toEqual('John Doe');
  });

  it('renders with a profile avatar', async () => {
    const modusProfileMenu = new ModusNavbarProfileMenu();
    modusProfileMenu.avatarUrl = 'https://www.placeholder.com/150';

    expect(modusProfileMenu.avatarUrl).toEqual('https://www.placeholder.com/150');
  });

  it('renders with a profile email', async () => {
    const modusProfileMenu = new ModusNavbarProfileMenu();
    modusProfileMenu.email = 'example@example.com';

    expect(modusProfileMenu.email).toEqual('example@example.com');
  });

  it('renders with a profile initials', async () => {
    const modusProfileMenu = new ModusNavbarProfileMenu();
    modusProfileMenu.initials = 'AB';

    expect(modusProfileMenu.initials).toEqual('AB');
  });

  it('renders with profile links', async () => {
    const modusProfileMenu = new ModusNavbarProfileMenu();
    modusProfileMenu.links = [{ id: 'link1', display: 'Link 1' }];

    expect(modusProfileMenu.links).toEqual([{ id: 'link1', display: 'Link 1' }]);
    expect(modusProfileMenu.links[0]).not.toHaveProperty('icon');
  });

  it('renders with profile links with icons', async () => {
    const modusProfileMenu = new ModusNavbarProfileMenu();
    modusProfileMenu.links = [{ id: 'link1', display: 'Link 1', icon: 'moon' }];

    expect(modusProfileMenu.links).toEqual([{ id: 'link1', display: 'Link 1', icon: 'moon' }]);
    expect(modusProfileMenu.links[0]).toHaveProperty('icon');
  });
});
