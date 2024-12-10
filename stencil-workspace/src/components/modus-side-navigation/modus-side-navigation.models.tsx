import { ModusSideNavigationItemCustomEvent } from '../../components';

export interface ModusSideNavigationItemInfo {
  id: string;
  menuIcon?: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  options?: Map<string, string>;
  isHeader?: boolean;
  children?: ModusSideNavigationItemInfo[];
  onSideNavItemClicked?: (event: ModusSideNavigationItemCustomEvent<{ id: string; selected: boolean }>) => void;
}

export type ModusSideNavItemLevelInfo = ModusSideNavigationItemInfo & {
  levelPosition?: 'left' | 'center' | 'right';
};
