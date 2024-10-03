import { newE2EPage } from '@stencil/core/testing';

describe('modus-file-dropzone', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-file-dropzone></modus-file-dropzone>');
    const element = await page.find('modus-file-dropzone');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with disabled state', async () => {
    const page = await newE2EPage();

    await page.setContent('<modus-file-dropzone disabled></modus-file-dropzone>');
    const element = await page.find('modus-file-dropzone');
    expect(element).toHaveClass('hydrated');
    expect(element).toHaveAttribute('disabled');
  });
});
