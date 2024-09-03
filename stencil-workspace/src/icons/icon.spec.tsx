// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, FunctionalComponent } from '@stencil/core';
import { IconTriangleDown } from './svgs/icon-triangle-down';
import { IconAccessibilityCircle } from './svgs/icon-accessibility-circle';
import { IconFileBarGraph } from './svgs/icon-file-bar-graph';
import { SpecPage } from '@stencil/core/internal';
import { newSpecPage } from '@stencil/core/testing';

describe('icon-triangle-down', () => {
  it('should render', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconTriangleDown />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-triangle-down" height="16" width="16" viewBox="0 0 10 6" fill="currentColor">
        <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" />
      </svg>
    `);
  });

  it('should render correct size', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconTriangleDown size="12" />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-triangle-down" height="12" width="12" viewBox="0 0 10 6" fill="currentColor">
        <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" />
      </svg>
    `);
  });

  it('should not have onClick by default', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconTriangleDown />);

    expect(page.root).not.toContain('onClick');
  });
});

describe('icon-accessibility-circle', () => {
  it('should render', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconAccessibilityCircle />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-accessibility-circle" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.53 2 12 2Zm0 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5Zm6 5.25h-3.75v9c0 .41-.34.75-.75.75s-.75-.34-.75-.75V15h-1.5v3.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-9H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
      </svg>
    `);
  });

  it('should render correct size', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconAccessibilityCircle size="12" />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-accessibility-circle" height="12" width="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.53 2 12 2Zm0 2.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5Zm6 5.25h-3.75v9c0 .41-.34.75-.75.75s-.75-.34-.75-.75V15h-1.5v3.75c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-9H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h12c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
      </svg>
    `);
  });

  it('should not have onClick by default', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconAccessibilityCircle />);

    expect(page.root).not.toContain('onClick');
  });
});

describe('icon-file-bar-graph', () => {
  it('should render', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconFileBarGraph />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-file-bar-graph" height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.59 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.41c0-.27-.11-.52-.29-.71L14.3 2.29a.99.99 0 0 0-.71-.29ZM18 20H6V4h6v5c0 .55.45 1 1 1h5v10Zm-9-1c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1Zm3 0c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1Zm3 0c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1Z" />
      </svg>
    `);
  });

  it('should render correct size', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconFileBarGraph size="12" />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-file-bar-graph" height="12" width="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.59 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8.41c0-.27-.11-.52-.29-.71L14.3 2.29a.99.99 0 0 0-.71-.29ZM18 20H6V4h6v5c0 .55.45 1 1 1h5v10Zm-9-1c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1s1 .45 1 1v3c0 .55-.45 1-1 1Zm3 0c-.55 0-1-.45-1-1v-6c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1Zm3 0c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1Z" />
      </svg>
    `);
  });

  it('should not have onClick by default', async () => {
    const page = await renderFunctionalComponentToSpecPage(<IconFileBarGraph />);

    expect(page.root).not.toContain('onClick');
  });
});

// eslint-disable-next-line @typescript-eslint/ban-types
function renderFunctionalComponentToSpecPage<T extends {}>(componentConstructor: FunctionalComponent<T>): Promise<SpecPage> {
  return newSpecPage({
    components: [],
    template: () => componentConstructor,
  });
}
