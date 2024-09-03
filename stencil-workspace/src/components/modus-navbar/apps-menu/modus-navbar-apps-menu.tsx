// eslint-disable-next-line
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';

export interface ModusNavbarApp {
  description?: string;
  logoUrl: string;
  name: string;
  url: string;
  category?: string;
  showCategory?: boolean;
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

  clickAppHandler(event: MouseEvent, app: ModusNavbarApp): void {
    event.preventDefault();
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
            <a class="app" href={app.url} onClick={(event) => this.clickAppHandler(event, app)}>
              <img src={app.logoUrl} alt="" height="32" width="32" />
              <div class="right">
                <div class="name">{app.name}</div>
                {app.description ? <div class="description">{app.description}</div> : null}
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  }
}
