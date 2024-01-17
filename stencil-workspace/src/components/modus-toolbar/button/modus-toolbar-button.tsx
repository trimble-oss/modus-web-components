// eslint-disable-next-line
import { Component, Event, EventEmitter, Fragment, Prop, h } from '@stencil/core';
import { ModusToolbarTooltip } from '../modus-toolbar.models';

@Component({
  tag: 'modus-toolbar-button',
  styleUrl: 'modus-toolbar-button.scss',
  shadow: true,
})
export class ModusToolbarButton {
  @Prop() active: boolean;
  @Prop() disabled: boolean;
  @Prop() divider: boolean;
  @Prop() iconSrc: string;
  @Prop() textButton: string;
  @Prop() tooltip: ModusToolbarTooltip;
  @Prop() dividerLayout: 'horizontal' | 'vertical';
  @Prop() buttonStyle: 'combined' | 'split';
  @Event() buttonClick: EventEmitter;

  classByLayout: Map<string, string> = new Map([
    ['horizontal', 'layout-horizontal'],
    ['vertical', 'layout-vertical'],
  ]);

  classByStyle: Map<string, string> = new Map([
    ['combined', 'style-marginless'],
    ['split', 'style-margin'],
  ]);

  render(): unknown {
    const layout = `${this.classByLayout.get(this.dividerLayout)}`;
    const buttonClass = `${this.classByStyle.get(this.buttonStyle)} ${this.classByLayout.get(this.dividerLayout)} ${
      this.active ? 'active-button' : ''
    }`;
    const iconClass = `${this.classByStyle.get(this.buttonStyle)} ${this.active ? 'active-button' : ''}`;

    return (
      <Fragment>
        {this.divider && this.buttonStyle === 'combined' && <div class={layout} />}
        <modus-tooltip text={this.tooltip?.text} position={this.tooltip?.position}>
          <button
            class={buttonClass}
            disabled={this.disabled}
            onClick={() => (!this.disabled ? this.buttonClick.emit() : null)}>
            {this.iconSrc &&
              (this.buttonStyle === 'split' ? (
                <div class={iconClass}>
                  <img src={this.iconSrc} />
                </div>
              ) : (
                <img src={this.iconSrc} />
              ))}
            {this.textButton}
          </button>
        </modus-tooltip>
      </Fragment>
    );
  }
}
