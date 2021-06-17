// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-progress-bar',
  styleUrl: 'modus-progress-bar.scss',
  shadow: true,
})

export class ModusProgressBar {
  /** (optional) The progress bar's background color. */
  @Prop() backgroundColor: string;

  /** (optional) The progress bar's foreground color. */
  @Prop() color: string;

  /** (optional) The progress bar's maximum value. */
  @Prop() maxValue = 100;

  /** (optional) The progress bar's minimum value. */
  @Prop() minValue = 0;

  /** (optional) The text displayed on the progress bar. */
  @Prop() text: string;

  /** (optional) The progress bar's text color. */
  @Prop() textColor: string;

  /** (optional) The progress bar's value. */
  @Prop() value = 0;

  render(): unknown {
    const percentage = (this.value - this.minValue) / (this.maxValue - this.minValue) * 100;
    const progressBarBackgroundColorClass = this.backgroundColor ? '' : 'default-background-color';
    const progressColorClass = this.color ? '' : 'default-color';
    const progressTextColor = this.textColor ? '' : 'default-text-color';

    const progressBarClass = `modus-progress-bar ${progressBarBackgroundColorClass}`;
    const progressClass = `progress ${progressColorClass} ${progressTextColor}`;

    return (
      <div class={progressBarClass} style={this.getProgressBarStyle()}>
        <div class={progressClass} style={this.getProgressStyle(percentage)}>
          {this.text}
        </div>
      </div>
    );
  }

  getProgressStyle(percentage: number): { backgroundColor: string, color: string, width: string } {
    const progressStyle = {
      backgroundColor: this.color,
      color: this.textColor,
      width: `${percentage}%`
    };

    return progressStyle;
  }

  getProgressBarStyle(): { backgroundColor: string } {
    const progressBarStyle = {
      backgroundColor: this.backgroundColor
    };

    return progressBarStyle;
  }
}
