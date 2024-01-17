// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';
import { ModusToolbarButton } from './modus-toolbar.models';

@Component({
  tag: 'modus-toolbar',
  styleUrl: 'modus-toolbar.scss',
  shadow: true,
})
export class ModusToolbar {
  /** The buttons to render. */
  @Prop() buttons: ModusToolbarButton[] = [];

  /** (optional) The toolbar's layout. */
  @Prop() layout: 'horizontal' | 'vertical' = 'horizontal';

  /** (optional) The toolbar's style */
  @Prop() toolbarStyle: 'combined' | 'split' = 'combined';

  classByLayout: Map<string, string> = new Map([
    ['horizontal', 'layout-horizontal'],
    ['vertical', 'layout-vertical'],
  ]);

  classByStyle: Map<string, string> = new Map([
    ['combined', 'style-combined'],
    ['split', 'style-split'],
  ]);

  render(): unknown {
    const className = `${this.classByLayout.get(this.layout)} ${this.classByStyle.get(this.toolbarStyle)}`;

    return (
      <div class={className}>
        {this.buttons.map((button) => (
          <modus-toolbar-button
            class={className}
            active={button.active}
            disabled={button.disabled}
            divider={button.divider}
            iconSrc={button.iconSrc}
            textButton={button.textButton}
            tooltip={button.tooltip}
            dividerLayout={this.layout}
            buttonStyle={this.toolbarStyle}
            onButtonClick={button.onClick}></modus-toolbar-button>
        ))}
      </div>
    );
  }
}
