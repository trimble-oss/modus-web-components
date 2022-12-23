import { EventEmitter } from '@stencil/core';
import { ModusSideNavigationItemCustomEvent } from '../../components';

export type ModusSideNavigationItemInfo = {
  id: string;
  menuIconUrl?: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  sideNavItemSelected?: EventEmitter<boolean>;
  options?: Map<string, string>;
  children?: ModusSideNavigationItemInfo[];
  onSideNavItemSelected?: (
    event: ModusSideNavigationItemCustomEvent<boolean>
  ) => void;
};

export type ModusSideNavItemSelectedDetails = {
  id: string;
  selected: boolean;
};
