import { newSpecPage } from '@stencil/core/testing';
import { ModusUtilityPanel } from './modus-utility-panel';

describe('modus-utility-panel', () => {
  it('renders', async () => {
    const { root } = await newSpecPage({
      components: [ModusUtilityPanel],
      html: '<modus-utility-panel></modus-utility-panel>',
    });
    expect(root).toEqualHtml(`
      <modus-utility-panel>
        <mock:shadow-root>
          <div class="overlay utility-panel">
            <div class="panel-content">
              <div class="panel-header">
                <slot name="header"></slot>
              </div>
              <hr>
              <div class="panel-body">
                <slot name="body"></slot>
              </div>
              <hr>
              <div class="panel-footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-utility-panel>
    `);
  });

  it('renders changes to expanded prop', async () => {
    const { root } = await newSpecPage({
      components: [ModusUtilityPanel],
      html: '<modus-utility-panel expanded="true"></modus-utility-panel>',
    });

    expect(root).toEqualHtml(`
      <modus-utility-panel expanded="true">
        <mock:shadow-root>
          <div class="open overlay utility-panel">
            <div class="panel-content">
              <div class="panel-header">
                <slot name="header"></slot>
              </div>
              <hr>
              <div class="panel-body">
                <slot name="body"></slot>
              </div>
              <hr>
              <div class="panel-footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-utility-panel>
    `);
  });

  it('renders changes to pushContent prop', async () => {
    const { root } = await newSpecPage({
      components: [ModusUtilityPanel],
      html: '<modus-utility-panel expanded="true" push-content="true"></modus-utility-panel>',
    });

    root.targetContent = '#content';
    root.pushContent = true;
    root.expanded = true;

    expect(root).toEqualHtml(`
      <modus-utility-panel expanded="true" push-content="true">
        <mock:shadow-root>
          <div class="open utility-panel">
            <div class="panel-content">
              <div class="panel-header">
                <slot name="header"></slot>
              </div>
              <hr>
              <div class="panel-body">
                <slot name="body"></slot>
              </div>
              <hr>
              <div class="panel-footer">
                <slot name="footer"></slot>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </modus-utility-panel>
    `);

  });
});
