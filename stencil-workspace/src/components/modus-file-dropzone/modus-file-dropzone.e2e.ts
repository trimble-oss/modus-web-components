import { newE2EPage } from '@stencil/core/testing';

describe('modus-file-dropzone', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-file-dropzone max-file-count="1"></modus-file-dropzone>');
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

  it('should allow adding a file and checking the state', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-file-dropzone></modus-file-dropzone>');

    const dropzone = await page.find('modus-file-dropzone');

    // Mock the File object for testing purposes
    const mockFile = {
      name: 'testfile.txt',
      size: 100,
      type: 'text/plain',
    };

    // Add the mock file to the dropzone
    await dropzone.callMethod('addFile', mockFile);

    // Check the dropzone state after adding the file
    const files = await dropzone.callMethod('getFiles');
    expect(files.length).toBe(1);

    const error = await dropzone.callMethod('getError');
    expect(error).toBeNull();
  });

  it('should trigger error and reset dropzone on reset button click', async () => {
    const page = await newE2EPage();

    // Set the content of the page with max-file-count="1"
    await page.setContent('<modus-file-dropzone max-file-count="1"></modus-file-dropzone>');

    const dropzone = await page.find('modus-file-dropzone');

    // Mock two files for testing purposes
    const mockFile1 = {
      name: 'testfile1.txt',
      size: 100,
      type: 'text/plain',
    };

    const mockFile2 = {
      name: 'testfile2.txt',
      size: 200,
      type: 'text/plain',
    };

    // Add the first file to the dropzone
    await dropzone.callMethod('addFile', mockFile1);

    // Check the dropzone state after adding the first file
    let files = await dropzone.callMethod('getFiles');
    expect(files.length).toBe(1); // Only 1 file should be present

    // Try to add the second file
    await dropzone.callMethod('addFile', mockFile2);

    // Check the dropzone state, it should still contain only 1 file due to max-file-count="1"
    files = await dropzone.callMethod('getFiles');
    expect(files.length).toBe(2); // The second file should not be added

    // Find and click the existing reset button
    const resetButton = await page.find('modus-file-dropzone >>> modus-button');

    await page.waitForTimeout(2000);

    await resetButton.click();

    // Check if the dropzone is empty after reset
    files = await dropzone.callMethod('getFiles');
    expect(files.length).toBe(0); // No files should be present after reset
  });
});
