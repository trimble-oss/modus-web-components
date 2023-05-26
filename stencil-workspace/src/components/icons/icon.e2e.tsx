// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { h, Component, FunctionalComponent } from '@stencil/core';
import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { IconTriangleDown } from './icon-triangle-down';

describe('icon-triangle-down', () => {
  it('should render', async () => {
    const page = await renderFunctionalComponentToSpecPage(() => <IconTriangleDown />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-triangle-down" height="16" width="16" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" fill="#6A6976" />
      </svg>
    `);
  });

  it('should render correct size', async () => {
    const page = await renderFunctionalComponentToSpecPage(() => <IconTriangleDown size="12" />);

    expect(page.root).toEqualHtml(`
      <svg class="icon-triangle-down" height="12" width="12" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" fill="#6A6976" />
      </svg>
    `);
  });

  it('should not have onClick by default', async () => {
    const page = await renderFunctionalComponentToSpecPage(() => <IconTriangleDown />);

    expect(page.root).not.toContain('onClick');
  });
});

// eslint-disable-next-line @typescript-eslint/ban-types
function renderFunctionalComponentToSpecPage<T extends {}>(
  componentConstructor: () => FunctionalComponent<T>
): Promise<SpecPage> {
  @Component({ tag: 'test-component' })
  class TestComponent {}

  return newSpecPage({
    components: [TestComponent],
    template: componentConstructor,
  });
}
