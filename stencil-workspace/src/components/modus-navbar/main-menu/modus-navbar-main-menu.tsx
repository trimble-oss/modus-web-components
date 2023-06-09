// eslint-disable-next-line
import { Component, h, Prop, State } from '@stencil/core';
import { ContainerLayout, DOM_OBSERVER_CONFIG, DEFAULT_CONTAINER_LAYOUT } from './modus-navbar-main-menu.models';

@Component({
  tag: 'modus-navbar-main-menu',
  styleUrl: 'modus-navbar-main-menu.scss',
  shadow: true,
})
export class ModusNavbarMainMenu {
  @Prop() navbarId: string;

  @State() containerLayout: ContainerLayout = DEFAULT_CONTAINER_LAYOUT;

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
    window.addEventListener('scroll', this.updateContainerLayout);
    this.connectDOMObserver();
  }

  removeSubscriptions(): void {
    window.removeEventListener('resize', this.updateContainerLayout);
    window.removeEventListener('scroll', this.updateContainerLayout);
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
    const navbarRect = document.getElementById(this.navbarId)?.getBoundingClientRect();

    if (!navbarRect) {
      return;
    }

    const availableHeight = window.innerHeight - navbarRect.bottom;
    const containerHeight = Math.min(availableHeight, window.innerHeight);

    this.containerLayout = {
      ...this.containerLayout,
      top: `${navbarRect.bottom}px`,
      left: `${navbarRect.left}px`,
      height: `${containerHeight}px`,
    };
  };

  render(): unknown {
    const positionStyle = { ...this.containerLayout };

    return (
      <div class="main-menu" style={positionStyle} onClick={(event) => event.preventDefault()}>
        <slot />
      </div>
    );
  }
}
