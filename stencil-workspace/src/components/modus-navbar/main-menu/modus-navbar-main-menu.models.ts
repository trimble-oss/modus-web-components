export interface ContainerLayout {
  height: string;
  top: string;
}

export const INITIAL_CONTAINER_LAYOUT: ContainerLayout = {
  height: '0px',
  top: '0px',
};

export const DOM_OBSERVER_CONFIG: MutationObserverInit = {
  childList: true,
};
