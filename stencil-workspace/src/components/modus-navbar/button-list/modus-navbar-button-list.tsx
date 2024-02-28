import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusIconMap } from '../../../icons/ModusIconMap';
import { ModusNavbarButton } from '../modus-navbar.models';

export const ModusNavbarButtonList: FunctionalComponent<{
  buttons: ModusNavbarButton[];
  reverse: boolean;
  onClick?: (event: MouseEvent, button: ModusNavbarButton) => void;
  onKeyDown?: (event: KeyboardEvent, button: ModusNavbarButton) => void;
  openButtonMenuId: string;
}> = ({ buttons, reverse, onClick, onKeyDown, openButtonMenuId }) => {
  const navbarButtons = buttons || [];

  return navbarButtons.map((button, index) => (
    <div onClick={(event) => onClick(event, button)} onKeyDown={(event) => onKeyDown(event, button)}>
      <modus-dropdown toggle-element-id={'navbar-button-' + index} showDropdownListBorder={false}>
        <div class="navbar-button" id={'navbar-button-' + index} slot="dropdownToggle">
          <span class="navbar-button-icon" role="button" tabIndex={0}>
            <modus-tooltip text={button.tooltip?.text} position="bottom">
              <div class="icon-button">
                <ModusIconMap icon={button.icon} size="24" pressed={openButtonMenuId === button.id} />
              </div>
            </modus-tooltip>
          </span>
        </div>
        {!button.hideMenu && (
          <modus-navbar-button-menu slot="dropdownList" reverse={reverse}>
            <slot name={button.id}></slot>
          </modus-navbar-button-menu>
        )}
      </modus-dropdown>
    </div>
  ));
};
