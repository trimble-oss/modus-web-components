// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusNavbarLogoOptions } from '../modus-navbar.models';

export const ModusNavbarProductLogo: FunctionalComponent<{
  logos: ModusNavbarLogoOptions;
  onClick?: (event) => void;
}> = ({ logos, onClick }) => {
  const { primary, secondary } = logos || {};

  return (
    <div onClick={onClick} class="product-logo">
      {primary && (
        <img
          class={secondary && 'product-logo-primary'}
          height={primary.height ?? '24'}
          src={primary.url}
          alt="Modus Navbar primary product logo"
          data-test-id="primary-logo"
        />
      )}
      {secondary && (
        <img
          class={primary && 'product-logo-secondary'}
          height={secondary.height ?? '24'}
          src={secondary.url}
          alt="Modus Navbar secondary product logo"
          data-test-id="secondary-logo"
        />
      )}
    </div>
  );
};
