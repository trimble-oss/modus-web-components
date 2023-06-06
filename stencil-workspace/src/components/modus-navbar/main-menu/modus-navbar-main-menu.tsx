// eslint-disable-next-line
import { Component, h, State } from '@stencil/core';
import { ContainerLayout, DOM_OBSERVER_CONFIG, INITIAL_CONTAINER_LAYOUT } from './modus-navbar-main-menu.models';

@Component({
  tag: 'modus-navbar-main-menu',
  styleUrl: 'modus-navbar-main-menu.scss',
  shadow: true,
})
export class ModusNavbarMainMenu {
  @State() containerLayout: ContainerLayout = INITIAL_CONTAINER_LAYOUT;

  private observer: MutationObserver | null = null;

  componentDidLoad(): void {
    this.updateContainerLayout();
    this.addSubscriptions();
  }

  disconnectedCallback(): void {
    this.removeSubscriptions();
  }

  addSubscriptions(): void {
    window.addEventListener('resize', this.updateContainerLayout);
    this.connectDOMObserver();
  }

  removeSubscriptions(): void {
    window.removeEventListener('resize', this.updateContainerLayout);
    this.disconnectDOMObserver();
  }

  connectDOMObserver(): void {
    this.observer = new MutationObserver(this.updateContainerLayout);
    this.observer.observe(document.body, DOM_OBSERVER_CONFIG);
  }

  disconnectDOMObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  updateContainerLayout = (): void => {
    const navbarRect = document.querySelector('modus-navbar')?.getBoundingClientRect();

    if (!navbarRect) {
      return;
    }

    this.containerLayout = {
      height: `${window.innerHeight - navbarRect.bottom}px`,
      top: `${navbarRect.bottom}px`,
    };
  };

  render(): unknown {
    return (
      <div
        class="main-menu"
        style={{ height: this.containerLayout.height, top: this.containerLayout.top }}
        onClick={(event) => event.preventDefault()}>
        <slot />
      </div>
    );
  }
}
