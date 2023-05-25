// eslint-disable-next-line
import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'modus-progress-bar',
  styleUrl: 'modus-progress-bar.scss',
  shadow: true,
})
export class ModusProgressBar {
  /** (optional) The progress bar's aria-label. */
  @Prop() ariaLabel: string | null;

  /** (optional) The progress bar's background color. */
  @Prop() backgroundColor: string;

  /** (optional) The progress bar's foreground color. */
  @Prop() color: string;

  /** (optional) The progress bar's maximum value. */
  @Prop() maxValue = 100;

  /** (optional) The progress bar's minimum value. */
  @Prop() minValue = 0;

  /** (optional) The progress bar's size. */
  @Prop() size: 'default' | 'small' | 'compact' = 'default';

  /** (optional) The text displayed on the progress bar. */
  @Prop() text: string;

  /** (optional) The progress bar's text color. */
  @Prop() textColor: string;

  /** (optional) The progress bar's value. */
  @Prop() value = 0;

  classBySize: Map<string, string> = new Map([
    ['default', 'default'],
    ['small', 'small'],
    ['compact', 'compact'],
  ]);

  getProgressStyle(percentage: number): {
    backgroundColor: string;
    color: string;
    width: string;
  } {
    const progressStyle = {
      backgroundColor: this.color,
      color: this.textColor,
      width: `${percentage}%`,
    };

    return progressStyle;
  }

  getProgressBarStyle(): { backgroundColor: string } {
    const progressBarStyle = {
      backgroundColor: this.backgroundColor,
    };

    return progressBarStyle;
  }

  render(): unknown {
    const percentage = ((this.value - this.minValue) / (this.maxValue - this.minValue)) * 100;
    const progressBarBackgroundColorClass = this.backgroundColor ? '' : 'default-background-color';
    const progressColorClass = this.color ? '' : 'default-color';
    const progressTextColor = this.textColor ? '' : 'default-text-color';
    const progressBarClass = `
      modus-progress-bar
      ${progressBarBackgroundColorClass}
      ${this.classBySize.get(this.size)}
     `;
    const progressClass = `progress ${progressColorClass} ${progressTextColor}`;

    return (
      <Host
        aria-label={this.ariaLabel}
        aria-valuemax={this.maxValue}
        aria-valuemin={this.minValue}
        aria-valuenow={this.value}
        role="progressbar">
        <div class={progressBarClass} style={this.getProgressBarStyle()}>
          <div class={progressClass} style={this.getProgressStyle(percentage)}>
            {this.size === 'default' && this.text}
          </div>
        </div>
      </Host>
    );
  }
}
