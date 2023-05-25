// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusSideNavigationItemInfo } from './modus-side-navigation.models';

export const ModusSideNavigationTree: FunctionalComponent<{
  data: ModusSideNavigationItemInfo[];
  itemSelected?: string;
  tabIndex?: number;
}> = ({ data, itemSelected, tabIndex }) => {
  if (!data?.length) return null;

  return data?.map(({ id, disabled, selected, label, menuIcon, children, onSideNavItemClicked, options }) => {
    const props = options ? Object.fromEntries(options) : {};
    const defaults = children?.length ? { showExpandIcon: true, disableSelection: true } : {};

    return (
      <modus-side-navigation-item
        id={id}
        disabled={disabled}
        selected={selected || itemSelected === id}
        label={label}
        menuIcon={menuIcon}
        onSideNavItemClicked={(e) => onSideNavItemClicked && onSideNavItemClicked(e)}
        {...defaults}
        tabIndex={tabIndex}
        {...props}></modus-side-navigation-item>
    );
  });
};
