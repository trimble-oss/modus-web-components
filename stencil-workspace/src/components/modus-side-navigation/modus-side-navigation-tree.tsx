// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusSideNavigationItemInfo } from './modus-side-navigation.types';

export const ModusSideNavigationTree: FunctionalComponent<{
  data: ModusSideNavigationItemInfo[];
}> = ({ data }) => {
  if (!data?.length) return null;

  return data?.map(
    ({
      id,
      disabled,
      selected,
      label,
      menuIcon,
      children,
      onSideNavItemSelected,
      options,
    }) => {
      const props = options ? Object.fromEntries(options) : {};
      return (
        <modus-side-navigation-item
          id={id}
          disabled={disabled}
          selected={selected}
          label={label}
          menuIcon={menuIcon}
          onSideNavItemSelected={(e) =>
            onSideNavItemSelected && onSideNavItemSelected(e)
          }
          {...props}>
          {<ModusSideNavigationTree data={children}></ModusSideNavigationTree>}
        </modus-side-navigation-item>
      );
    }
  );
};
