// eslint-disable-next-line
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core';

export interface ModusFloatingNavbarApp {
  description?: string;
  logoUrl: string;
  name: string;
  url: string;
  category?: string;
  showCategory?: boolean;
}

@Component({
  tag: 'modus-floating-navbar-apps-menu',
  styleUrl: 'modus-floating-navbar-apps-menu.scss',
  shadow: true,
})
export class ModusFloatingNavbarAppsMenu {
  @Prop() apps: ModusFloatingNavbarApp[];
  @Prop() reverse: boolean;

  @Event() appOpen: EventEmitter<ModusFloatingNavbarApp>;

  clickAppHandler(event: MouseEvent, app: ModusFloatingNavbarApp): void {
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
              <img src={app.logoUrl} />
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
