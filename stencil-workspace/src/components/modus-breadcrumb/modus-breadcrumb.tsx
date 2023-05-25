// eslint-disable-next-line
import { Component, Prop, h, Event, EventEmitter } from '@stencil/core';

export interface Crumb {
  display: string;
  id: string;
}

@Component({
  tag: 'modus-breadcrumb',
  styleUrl: 'modus-breadcrumb.scss',
  shadow: true,
})
export class ModusBreadcrumb {
  /** The breadcrumb's aria-label. */
  @Prop() ariaLabel: string | null;

  /** The breadcrumbs to render. */
  @Prop() crumbs: Crumb[] = [];

  /** (optional) An event that fires on breadcrumb click. */
  @Event() crumbClick: EventEmitter<Crumb>;

  render(): unknown {
    return (
      <nav aria-label={this.ariaLabel} role="navigation">
        <ol>
          {this.crumbs.map((crumb, index) => (
            <li key={crumb.id}>
              {index < this.crumbs.length - 1 ? (
                <span class="crumb">
                  <a onClick={() => this.crumbClick.emit(crumb)}>{crumb.display}</a>
                  <span class="divider">{'>'}</span>
                </span>
              ) : (
                <span class="last-crumb" aria-current="page">
                  {crumb.display}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
}
