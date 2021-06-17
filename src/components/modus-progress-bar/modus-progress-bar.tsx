// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-progress-bar',
  styleUrl: 'modus-progress-bar.scss',
  shadow: true,
})

export class ModusProgressBar {
  /** (optional) The progress bar's background color. */
  @Prop() backgroundColor = '#FFFFFF'; // $col_white

  /** (optional) The progress bar's foreground color. */
  @Prop() color = '#005F9E'; // $col_trimble_blue_mid

  /** (optional) The progress bar's maximum value. */
  @Prop() maxValue = 100;

  /** (optional) The progress bar's minimum value. */
  @Prop() minValue = 0;

  /** (optional) The text displayed on the progress bar. */
  @Prop() text: string;

  /** (optional) The progress bar's text color. */
  @Prop() textColor = '#FFFFFF'; // $col_white

  /** (optional) The progress bar's value. */
  @Prop() value = 0;

  render(): unknown {
    const progressBarStyle = {backgroundColor: this.backgroundColor};
    const percentage = (this.value - this.minValue) / (this.maxValue - this.minValue) * 100;
    const progressStyle = {backgroundColor: this.color, color: this.textColor, width: `${percentage}%`};

    return (
      <div class="modus-progress-bar" style={progressBarStyle}>
        <div class="progress" style={progressStyle}>
          {this.text}
        </div>
      </div>
    );
  }
}
