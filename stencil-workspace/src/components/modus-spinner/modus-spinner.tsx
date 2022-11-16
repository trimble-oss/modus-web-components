// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-spinner',
  styleUrl: 'modus-spinner.scss',
  shadow: true,
})
export class ModusSpinner {
  /** (optional) The color of the spinner in hex format (eg #FFFFFF) */
  @Prop() color = 'primary';

  /** (optional) The size of the spinner, will be applied to both the height and width */
  @Prop() size = '2rem';

  private variants: Map<string, string> = new Map([
    ['primary', '#0063a3'],
    ['secondary', '#6a6e79'],
    ['tertiary', '#cbcdd6'],
    ['dark', '#252a2e'],
    ['success', '#006638'],
    ['danger', '#da212c'],
    ['warning', '#e49325'],
  ]);
  render(): unknown {
    const borderColor = this.variants.has(this.color) ? `var(--modus-${this.color}, ${this.variants.get(this.color)})` : this.color;

    return <div aria-busy="true" class="spinner" style={{ 'border-color': borderColor, 'border-right-color': 'transparent', height: this.size, width: this.size }}></div>;
  }
}
