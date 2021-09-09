// eslint-disable-next-line
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';

export interface App {
  description?: string;
  logoUrl: string;
  name: string;
  url: string;
}

@Component({
  tag: 'modus-navbar-apps-menu',
  styleUrl: 'modus-navbar-apps-menu.scss',
  shadow: true,
})
export class ModusNavbarAppsMenu {
  @Prop() apps: App[];
  @Prop() reverse: boolean;

  @Event({ bubbles: false }) itemClick: EventEmitter<string>;

  clickAppHandler(app: App): void {
    window.open(app.url, '_blank');
    this.itemClick.emit(app.name);
  }

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';

    return (
      <div class={`apps-menu ${direction}`} onClick={(event) => event.preventDefault()}>
        {this.apps?.map((app) =>
          <div class="app" onClick={() => this.clickAppHandler(app)}>
            <img src={app.logoUrl} />
            <div class="right">
              <div class="name">{app.name}</div>
              {app.description ? <div class="description">{app.description}</div> : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
