// eslint-disable-next-line
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'modus-badge',
  styleUrl: 'modus-badge.scss',
  shadow: true,
})
export class ModusBadge {
  /** (optional) The badge's aria-label */
  @Prop() ariaLabel: string | null;

  /** (optional) The color of the badge */
  @Prop() color: 'danger' | 'dark' | 'primary' | 'secondary' | 'success' | 'tertiary' | 'warning' = 'primary';

  /** (optional) The size of the badge */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /** (optional) The type of the badge */
  @Prop() type: 'counter' | 'default' | 'text' = 'default';

  classByColor: Map<string, string> = new Map([
    ['danger', 'color-danger'],
    ['dark', 'color-dark'],
    ['primary', 'color-primary'],
    ['secondary', 'color-secondary'],
    ['success', 'color-success'],
    ['tertiary', 'color-tertiary'],
    ['warning', 'color-warning'],
  ]);

  classBySize: Map<string, string> = new Map([
    ['small', 'size-small'],
    ['medium', 'size-medium'],
    ['large', 'size-large'],
  ]);

  classByType: Map<string, string> = new Map([
    ['counter', 'type-counter'],
    ['default', 'type-default'],
    ['text', 'type-text'],
  ]);

  render(): unknown {
    const className = `badge ${this.classByColor.get(this.color)} ${this.classBySize.get(this.size)} ${this.classByType.get(
      this.type
    )}`;

    return (
      <div aria-label={this.ariaLabel} class={className} role="status">
        <slot />
      </div>
    );
  }
}
