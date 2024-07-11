import {
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
  FunctionalComponent,
} from '@stencil/core';
import { ModusNavbarDropdownItem, ModusNavbarDropdownOptions } from '../modus-navbar.models';

interface Props {
  itemSelect: (item: ModusNavbarDropdownItem) => void;
  options: ModusNavbarDropdownOptions;
  reverse: boolean;
  selectedItem?: ModusNavbarDropdownItem;
}

export const ModusNavbarDropdown: FunctionalComponent<Props> = ({ itemSelect, options, reverse, selectedItem }) => {
  const direction = reverse ? 'rtl' : 'ltr';
  const toggleElementId = 'navbar-dropdown';

  const itemSelectHandler = (item: ModusNavbarDropdownItem) => {
    itemSelect(item);
  };

  return (
    <modus-dropdown toggle-element-id={toggleElementId}>
      <modus-button
        aria-label={options.ariaLabel}
        button-style={'borderless'}
        color={'secondary'}
        id={toggleElementId}
        slot={'dropdownToggle'}
        show-caret={true}>
        {selectedItem?.text}
      </modus-button>
      <modus-list dir={direction} slot={'dropdownList'}>
        {options.items.map((item) => (
          <modus-list-item key={item.value} onItemClick={() => itemSelectHandler(item)} selected={item === selectedItem}>
            {item.text}
          </modus-list-item>
        ))}
      </modus-list>
    </modus-dropdown>
  );
};
