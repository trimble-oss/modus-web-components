import { newSpecPage } from '@stencil/core/testing';
import { ModusNavbarMainMenu } from './modus-navbar-main-menu';
import { DEFAULT_CONTAINER_LAYOUT } from './modus-navbar-main-menu.models';

describe('modus-navbar-main-menu', () => {
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
      components: [ModusNavbarMainMenu],
      html: '<modus-navbar-main-menu></modus-navbar-main-menu>',
    });

    const mainMenuElement: HTMLModusNavbarMainMenuElement = root.shadowRoot.querySelector('div.main-menu');

    expect(mainMenuElement).toBeTruthy();
  });

  it('should not update container layout when navbar does not exist', () => {
    const mainMenu = new ModusNavbarMainMenu();
    mainMenu.navbarId = 'non-existing-navbar';

    mainMenu.updateContainerLayout();

    expect(mainMenu.containerLayout).toEqual(DEFAULT_CONTAINER_LAYOUT);
  });

  it('should update container layout correctly when navbar exists', async () => {
    const navbarBottomPx = 70;
    const navbarLeftPx = 70;
    const mockNavbar = createMockNavbar(navbarBottomPx, navbarLeftPx);
    jest.spyOn(global.document, 'getElementById').mockReturnValue(mockNavbar);

    const mainMenu = new ModusNavbarMainMenu();
    mainMenu.updateContainerLayout();

    expect(window.scrollY).toBe(0);
    expect(mainMenu.containerLayout.top).toBe(`${navbarBottomPx}px`);
    expect(mainMenu.containerLayout.left).toBe(`${navbarLeftPx}px`);
    expect(mainMenu.containerLayout.height).toBe(`${window.innerHeight - navbarBottomPx}px`);
  });

  it('should set the main menu height to window.innerHeight when the navbar is off the top of screen', async () => {
    const navbarBottomPx = -70;
    const navbarLeftPx = 0;
    const mockNavbar = createMockNavbar(navbarBottomPx, navbarLeftPx);
    jest.spyOn(global.document, 'getElementById').mockReturnValue(mockNavbar);

    const mainMenu = new ModusNavbarMainMenu();
    mainMenu.updateContainerLayout();

    expect(window.scrollY).toBe(0);
    expect(mainMenu.containerLayout.top).toBe(`${navbarBottomPx}px`);
    expect(mainMenu.containerLayout.left).toBe(`${navbarLeftPx}px`);
    expect(mainMenu.containerLayout.height).toBe(`${window.innerHeight}px`);
  });
});

const createMockNavbar = (bottomPx: number, leftPx: number) =>
  ({
    getBoundingClientRect: jest.fn(() => ({ bottom: bottomPx, left: leftPx })),
  } as unknown as HTMLElement);
