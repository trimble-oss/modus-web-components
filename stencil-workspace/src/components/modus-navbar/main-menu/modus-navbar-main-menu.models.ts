export interface ContainerLayout {
  position: string;
  top: string;
  left: string;
  height: string;
}

export const DEFAULT_CONTAINER_LAYOUT: ContainerLayout = Object.freeze({
  position: 'fixed',
  top: '0px',
  left: '0px',
  height: '0px',
});

export const DOM_OBSERVER_CONFIG: MutationObserverInit = Object.freeze({
  childList: true,
});
