// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-spinner',
  styleUrl: 'modus-spinner.scss',
  shadow: true,
})
export class ModusSpinner {
  /** (optional) The color of the spinner in hex format (eg #FFFFFF) */
  @Prop() color: string = '#005F9E';

  /** (optional) The size of the spinner, will be applied to both the height and width */
  @Prop() size: string = '2rem';

  render(): unknown {
    return (
      <div class="spinner" style={{'border-color': this.color, 'border-right-color': 'transparent', 'height': this.size, 'width': this.size}}></div>
    );
  }
}
