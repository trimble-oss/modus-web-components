import { newSpecPage } from '@stencil/core/testing';
import { ModusButtonGroup } from './modus-button-group';

describe('modus-button-group', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusButtonGroup],
      html: '<modus-button-group></modus-button-group>',
    });
    expect(root).toEqualHtml(`
    <modus-button-group>
      <mock:shadow-root>
        <div class="modus-buttongroup"></div>
      </mock:shadow-root>
    </modus-button-group>
`);
  });

  it('renders with buttons', async () => {
    const { root } = await newSpecPage({
      components: [ModusButtonGroup],
      html: `
          <modus-button-group>
            <modus-button>Button 1</modus-button>
            <modus-button>Button 2</modus-button>
            <modus-button>Button 3</modus-button>
          </modus-button-group>
        `,
    });
    expect(root).toEqualHtml(`
    <modus-button-group>
      <mock:shadow-root>
        <div class="modus-buttongroup">
          <modus-button aria-checked="" button-position="left" button-style="fill" class="modus-button" color="primary" tabindex="0">
            Button 1
          </modus-button>
          <modus-button aria-checked="" button-position="center" button-style="fill" class="modus-button" color="primary" tabindex="0">
            Button 2
          </modus-button>
          <modus-button aria-checked="" button-position="right" button-style="fill" class="modus-button" color="primary" tabindex="0">
            Button 3
          </modus-button>
        </div>
      </mock:shadow-root>
      <modus-button>
        Button 1
      </modus-button>
      <modus-button>
        Button 2
      </modus-button>
      <modus-button>
        Button 3
      </modus-button>
    </modus-button-group>
      `);
  });
});
