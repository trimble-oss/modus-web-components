// eslint-disable-next-line
import { Component, h, Prop, State, Element } from '@stencil/core';
import { ContainerLayout, DOM_OBSERVER_CONFIG, INITIAL_CONTAINER_LAYOUT } from './modus-navbar-main-menu.models';

@Component({
  tag: 'modus-navbar-main-menu',
  styleUrl: 'modus-navbar-main-menu.scss',
  shadow: true,
})
export class ModusNavbarMainMenu {
  @Element() element: HTMLModusNavbarMainMenuElement;

  @Prop() navbarId: string;

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

    const maxContainerHeight = window.innerHeight - navbarRect.bottom;
    const containerHeight = Math.min(maxContainerHeight, window.innerHeight);

    const navbarIsInline = false;
    const containerTop = navbarIsInline ? navbarRect.bottom + window.pageYOffset : navbarRect.bottom;
    const containerLeft = navbarIsInline ? navbarRect.left + window.pageXOffset : navbarRect.left;

    this.containerLayout = {
      ...this.containerLayout,
      top: `${containerTop}px`,
      left: `${containerLeft}px`,
      height: `${containerHeight}px`,
    };
  };

  render(): unknown {
    const positionStyle = {
      position: this.containerLayout.position,
      height: this.containerLayout.height,
      top: this.containerLayout.top,
      left: this.containerLayout.left,
    };

    return (
      <div class="main-menu" style={positionStyle} onClick={(event) => event.preventDefault()}>
        <slot />
      </div>
    );
  }
}
