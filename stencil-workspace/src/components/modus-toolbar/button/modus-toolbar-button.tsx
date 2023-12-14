// eslint-disable-next-line
import { Component, Event, Fragment, Prop, h } from '@stencil/core';
import { ModusToolbarTooltip } from '../modus-toolbar.models';

@Component({
  tag: 'modus-toolbar-button',
  styleUrl: 'modus-toolbar-button.scss',
  shadow: true,
})
export class ModusToolbarButton {
  @Prop() active: boolean;
  @Prop() disabled: boolean;
  @Prop() divader: boolean;
  @Prop() iconSrc: string;
  @Prop() textButton: string;
  @Prop() tooltip: ModusToolbarTooltip;
  @Prop() divaderLayout: 'horizontal' | 'vertical';
  @Prop() buttonStyle: 'combined' | 'split';
  @Event() buttonClick: () => void;

  classByLayout: Map<string, string> = new Map([
    ['horizontal', 'layout-horizontal'],
    ['vertical', 'layout-vertical'],
  ]);

  classByStyle: Map<string, string> = new Map([
    ['combined', 'style-marginless'],
    ['split', 'style-margin'],
  ]);

  render(): unknown {
    const layout = `${this.classByLayout.get(this.divaderLayout)}`;
    const buttonClass = `${this.classByStyle.get(this.buttonStyle)} ${this.classByLayout.get(this.divaderLayout)} ${
      this.active ? 'active-button' : ''
    }`;

    return (
      <Fragment>
        {this.divader && this.buttonStyle === 'combined' && <div class={layout} />}
        <modus-tooltip text={this.tooltip?.text} position={this.tooltip?.position}>
          <button class={buttonClass} disabled={this.disabled} onClick={() => (!this.disabled ? this.buttonClick : null)}>
            {this.iconSrc && <img src={this.iconSrc} />}
            {this.textButton}
          </button>
        </modus-tooltip>
      </Fragment>
    );
  }
}
