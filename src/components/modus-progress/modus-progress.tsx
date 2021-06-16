// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-progress',
  styleUrl: 'modus-progress.scss',
  shadow: true,
})

export class ModusProgress {
  /** (optional) The progress bar's background color. */
  @Prop() backgroundColor = "#FFFFFF"; // $col_white

  /** (optional) The progress bar's foreground color. */
  @Prop() color = "#005F9E"; // $col_trimble_blue_mid

  /** (optional) The progress bar's maximum value. */
  @Prop() maxValue = 100;

  /** (optional) The progress bar's minimum value. */
  @Prop() minValue = 0;

  /** (optional) The progress bar's percentage text color. */
  @Prop() percentageColor = "#FFFFFF"; // $col_white

  /** (optional) The text displayed on the progress bar. */
  @Prop() text: string;

  /** (optional) The progress bar's value. */
  @Prop() value = 0;

  render(): unknown {
    const percentage = (this.value - this.minValue) / (this.maxValue - this.minValue) * 100;

    return (
      <div class="modus-progress" style={{backgroundColor: this.backgroundColor}}>
        <div class="progress" style={{backgroundColor: this.color, color: this.percentageColor, width: `${percentage}%`}}>
          {this.text ? `${this.text}%` : ''}
        </div>
      </div>
    );
  }
}
