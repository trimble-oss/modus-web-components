// eslint-disable-next-line
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';

export interface ModusNavbarApp {
  description?: string;
  logoUrl: string;
  name: string;
  url: string;
  category: string;
  showCategory: boolean;
}

@Component({
  tag: 'modus-navbar-apps-menu',
  styleUrl: 'modus-navbar-apps-menu.scss',
  shadow: true,
})
export class ModusNavbarAppsMenu {
  @Prop() apps: ModusNavbarApp[];
  @Prop() reverse: boolean;

  @Event() appOpen: EventEmitter<ModusNavbarApp>;

  clickAppHandler(app: ModusNavbarApp): void {
    window.open(app.url, '_blank');
    this.appOpen.emit(app);
  }

  render(): unknown {
    const direction = this.reverse ? 'reverse' : '';

    return (
      <div class={`apps-menu ${direction}`} onClick={(event) => event.preventDefault()}>
        {this.apps?.map((app) => (
          <div class="app-div">
            {app.showCategory ? <div class="category">{app.category}</div> : null}
            <div class="app" onClick={() => this.clickAppHandler(app)}>
              <img src={app.logoUrl} />
              <div class="right">
                <div class="name">{app.name}</div>
                {app.description ? <div class="description">{app.description}</div> : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
