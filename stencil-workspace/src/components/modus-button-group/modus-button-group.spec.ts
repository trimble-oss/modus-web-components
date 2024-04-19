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
        <slot></slot>
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
        <slot></slot>
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
