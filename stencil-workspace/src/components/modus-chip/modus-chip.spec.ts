import { newSpecPage } from '@stencil/core/testing';
import { ModusChip } from './modus-chip';

describe('modus-chip', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusChip],
      html: '<modus-chip></modus-chip>',
    });
    expect(root).toEqualHtml(`
      <modus-chip>
        <mock:shadow-root>
          <button class="medium modus-chip no-left-icon no-right-icon style-solid" tabindex="0" type="button">
            <span></span>
          </button>
        </mock:shadow-root>
      </modus-chip>
    `);
  });

  it('should get the correct class by size', async () => {
    const modusChip = new ModusChip();
    let className = modusChip.classBySize.get(modusChip.size);
    expect(className).toEqual('medium');

    className = modusChip.classBySize.get('small');
    expect(className).toEqual('small');
  });

  it('should get the correct class by chip style', async () => {
    const modusChip = new ModusChip();
    let className = modusChip.classByChipStyle.get(modusChip.chipStyle);
    expect(className).toEqual('style-solid');

    className = modusChip.classByChipStyle.get('outline');
    expect(className).toEqual('style-outline');
  });
});
