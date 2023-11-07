import { newE2EPage } from '@stencil/core/testing';

describe('modus-file-upload-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-file-upload-progress></modus-file-upload-progress>');

    const element = await page.find('modus-file-upload-progress');
    expect(element).toHaveClass('hydrated');
  });
});
