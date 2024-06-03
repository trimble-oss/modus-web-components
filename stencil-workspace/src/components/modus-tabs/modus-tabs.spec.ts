import { newSpecPage } from '@stencil/core/testing';
import { ModusTabs, Tab } from './modus-tabs';

describe('modus-tabs', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusTabs],
      html: '<modus-tabs></modus-tabs>',
    });
    expect(root).toEqualHtml(`
      <modus-tabs>
        <mock:shadow-root>
          <div class="medium modus-tabs"></div>
        </mock:shadow-root>
      </modus-tabs>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusTabs = new ModusTabs();
    let className = modusTabs.classBySize.get(modusTabs.size);
    expect(className).toEqual('medium');

    className = modusTabs.classBySize.get('small');
    expect(className).toEqual('small');
  });

  it('should have flag "fullWidth" set on false as default', async () => {
    const modusTabs = new ModusTabs();
    const flag = modusTabs.fullWidth;

    expect(flag.toString()).toEqual('false');
  });

  it('should set the correct id and label for each tab base on tabs configuration', async () => {
    const page = await newSpecPage({
      components: [ModusTabs],
      html: '<modus-tabs></modus-tabs>',
    });
    const component = page.rootInstance as ModusTabs;
    const tabs = [
      {
        id: 'tab-1',
        label: 'Tab 1',
        active: true,
      },
      {
        id: 'tab-2',
        label: 'Tab 2',
      },
      {
        id: 'tab-3',
        label: 'Tab 3',
        leftIcon: 'sun',
      },
      {
        id: 'tab-4',
        label: 'Tab 4',
        rightIcon: 'moon',
      },
      {
        id: 'tab-5',
        label: 'Tab 5',
        leftIcon: 'sun',
        rightIcon: 'moon',
      },
      {
        id: 'tab-6',
        iconOnly: 'settings',
      },
    ] as Tab[];

    component.tabs = tabs;
    await page.waitForChanges();

    expect(page.root).toEqualHtml(`
      <modus-tabs>
        <mock:shadow-root>
          <div class="medium modus-tabs">
            <button class="active medium tab" id="${tabs[0].id}"><span class="label">${tabs[0].label}</span></button>
            <button class="medium tab" id="${tabs[1].id}"><span class="label">${tabs[1].label}</span></button>
            <button class="medium tab" id="${tabs[2].id}">
              <span class="icon left-icon">
                <svg class="icon-sun" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12c0-.34.03-.67.08-1H3c-.55 0-1 .45-1 1s.45 1 1 1h2.08c-.05-.33-.08-.66-.08-1m1.4-4.19c.4-.54.88-1.01 1.41-1.41L6.34 4.93a.996.996 0 1 0-1.41 1.41zm11.2 0 1.47-1.47a.996.996 0 1 0-1.41-1.41L16.19 6.4c.54.4 1.01.88 1.41 1.41M6.4 16.18l-1.47 1.47a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l1.47-1.47c-.54-.4-1.01-.88-1.41-1.41ZM13 5.07V2.99c0-.55-.45-1-1-1s-1 .45-1 1v2.08c.33-.05.66-.08 1-.08s.67.03 1 .08m8 5.92h-2.08c.05.33.08.66.08 1s-.03.67-.08 1H21c.55 0 1-.45 1-1s-.45-1-1-1m-3.4 5.19c-.4.54-.88 1.01-1.41 1.41l1.47 1.47c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41l-1.47-1.47ZM12 6.99c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m-1 11.92v2.08c0 .55.45 1 1 1s1-.45 1-1v-2.08c-.33.05-.66.08-1 .08s-.67-.03-1-.08"></path>
                </svg>
              </span>
            <span class="label">${tabs[2].label}</span></button>
            <button class="medium tab" id="${tabs[3].id}">
            <span class="label">${tabs[3].label}</span>
              <span class="icon right-icon">
                <svg class="icon-moon" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.84 15.35c.44-.13.83.34.58.71-1.88 2.68-5.5 4.18-9.34 3.07-2.43-.7-4.39-2.53-5.16-4.82C3.44 9.91 6.03 5.8 10 4.52c.36-.12.67.27.46.58-1.09 1.68-1.45 3.83-.64 6.06.67 1.85 2.22 3.34 4.15 4.02 1.72.6 3.39.6 4.87.17"></path>
                </svg>
              </span>
            </button>
            <button class="medium tab" id="${tabs[4].id}">
              <span class="icon left-icon">
                <svg class="icon-sun" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12c0-.34.03-.67.08-1H3c-.55 0-1 .45-1 1s.45 1 1 1h2.08c-.05-.33-.08-.66-.08-1m1.4-4.19c.4-.54.88-1.01 1.41-1.41L6.34 4.93a.996.996 0 1 0-1.41 1.41zm11.2 0 1.47-1.47a.996.996 0 1 0-1.41-1.41L16.19 6.4c.54.4 1.01.88 1.41 1.41M6.4 16.18l-1.47 1.47a.996.996 0 0 0 .71 1.7c.26 0 .51-.1.71-.29l1.47-1.47c-.54-.4-1.01-.88-1.41-1.41ZM13 5.07V2.99c0-.55-.45-1-1-1s-1 .45-1 1v2.08c.33-.05.66-.08 1-.08s.67.03 1 .08m8 5.92h-2.08c.05.33.08.66.08 1s-.03.67-.08 1H21c.55 0 1-.45 1-1s-.45-1-1-1m-3.4 5.19c-.4.54-.88 1.01-1.41 1.41l1.47 1.47c.2.2.45.29.71.29s.51-.1.71-.29a.996.996 0 0 0 0-1.41l-1.47-1.47ZM12 6.99c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5m-1 11.92v2.08c0 .55.45 1 1 1s1-.45 1-1v-2.08c-.33.05-.66.08-1 .08s-.67-.03-1-.08"></path>
                </svg>
              </span>
              <span class="label">${tabs[4].label}</span>
              <span class="icon right-icon">
                <svg class="icon-moon" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.84 15.35c.44-.13.83.34.58.71-1.88 2.68-5.5 4.18-9.34 3.07-2.43-.7-4.39-2.53-5.16-4.82C3.44 9.91 6.03 5.8 10 4.52c.36-.12.67.27.46.58-1.09 1.68-1.45 3.83-.64 6.06.67 1.85 2.22 3.34 4.15 4.02 1.72.6 3.39.6 4.87.17"></path>
                </svg>
              </span>
              </button>
            <button class="medium tab" id="${tabs[5].id}">
              <span class="icon">
                <svg class="icon-settings" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.31 11.98c0-.32-.03-.63-.07-.94l1.67-1.34c.39-.31.49-.86.24-1.28l-.75-1.28-.74-1.29a1 1 0 0 0-1.23-.43l-1.97.77c-.5-.39-1.06-.72-1.65-.97l-.32-2.07a1 1 0 0 0-.99-.85h-2.98c-.5 0-.92.36-.99.85L9.22 5.2c-.61.25-1.18.58-1.69.98L5.6 5.42c-.46-.18-.99 0-1.23.43l-.74 1.29-.75 1.28a.99.99 0 0 0 .24 1.28L4.74 11c-.04.32-.07.65-.07.98s.03.68.08 1.01l-1.62 1.3c-.39.31-.49.86-.24 1.28l.75 1.28.74 1.29c.25.43.77.61 1.23.43l1.96-.77c.51.38 1.06.71 1.66.95l.32 2.09a1 1 0 0 0 .99.85h2.98c.5 0 .92-.36.99-.85l.32-2.11c.58-.24 1.12-.57 1.62-.94l2 .78c.46.18.99 0 1.23-.43l.74-1.29.75-1.28a.99.99 0 0 0-.24-1.28l-1.67-1.34c.04-.32.07-.64.07-.97Zm-6.62 3.46a3.5 3.5 0 0 1-4.12-4.12 3.51 3.51 0 0 1 2.75-2.75 3.5 3.5 0 0 1 4.12 4.12 3.51 3.51 0 0 1-2.75 2.75"></path>
                </svg>
              </span>
            </button>
          </div>
        </mock:shadow-root>
      </modus-tabs>
    `);
  });
});
