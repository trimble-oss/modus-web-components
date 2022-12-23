// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusSideNavigationItemInfo } from './modus-side-navigation.types';

export const ModusSideNavigationTree: FunctionalComponent<{
  data: ModusSideNavigationItemInfo[];
  onItemAdded: (el: HTMLModusSideNavigationItemElement) => void;
}> = ({ data, onItemAdded }) => {
  if (!data?.length) return null;

  return data?.map(
    ({
      id,
      disabled,
      selected,
      label,
      menuIconUrl,
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
          menuIconUrl={menuIconUrl}
          onSideNavItemSelected={onSideNavItemSelected}
          ref={(el) => onItemAdded(el)}
          {...props}>
          {
            <ModusSideNavigationTree
              onItemAdded={onItemAdded}
              data={children}></ModusSideNavigationTree>
          }
        </modus-side-navigation-item>
      );
    }
  );
};
