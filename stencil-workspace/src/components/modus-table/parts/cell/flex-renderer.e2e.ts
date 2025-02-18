import { newSpecPage } from '@stencil/core/testing';
import { FlexRenderer } from './flex-renderer';

describe('flex-renderer', () => {
  it('should render without crashing', async () => {
    const page = await newSpecPage({
      components: [FlexRenderer],
      html: `<flex-renderer></flex-renderer>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('should parse and render given content', async () => {
    const sampleContent = `<div class="test-class">Hello World</div>`;
    const page = await newSpecPage({
      components: [FlexRenderer],
      html: `<flex-renderer content='${sampleContent}'></flex-renderer>`,
    });
    expect(page.root.shadowRoot.innerHTML).toContain('Hello World');
    expect(page.root.shadowRoot.querySelector('.test-class')).toBeTruthy();
  });

  it('should not render extra content when content is empty', async () => {
    const page = await newSpecPage({
      components: [FlexRenderer],
      html: `<flex-renderer content=''></flex-renderer>`,
    });
    expect(page.root.shadowRoot.innerHTML.trim()).toBe('');
  });

  it('should preserve attributes from parsed elements', async () => {
    const sampleContent = `<button disabled>Click me</button>`;
    const page = await newSpecPage({
      components: [FlexRenderer],
      html: `<flex-renderer content='${sampleContent}'></flex-renderer>`,
    });
    const button = page.root.shadowRoot.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.hasAttribute('disabled')).toBe(true);
  });
});
