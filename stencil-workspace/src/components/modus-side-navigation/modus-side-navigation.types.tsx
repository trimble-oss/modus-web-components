import { ModusSideNavigationItemCustomEvent } from '../../components';

export type ModusSideNavigationItemInfo = {
  id: string;
  menuIconUrl?: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  options?: Map<string, string>;
  children?: ModusSideNavigationItemInfo[];
  onSideNavItemSelected?: (
    event: ModusSideNavigationItemCustomEvent<{ id: string; selected: boolean }>
  ) => void;
};

export type ModusSideNavItemSelectedDetails = {
  id: string;
  selected: boolean;
};

export type ModusSideNavigationLevelInfo = ModusSideNavigationItemInfo & {
  // className?: string;
  // isActive?: boolean;
  slidePosition?: 'left' | 'center' | 'right';
};
