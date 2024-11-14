// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusNavbarLogoOptions } from '../modus-navbar.models';

export const ModusNavbarProductLogo: FunctionalComponent<{
  logos: ModusNavbarLogoOptions;
  onClick?: (event) => void;
}> = ({ logos, onClick }) => {
  const { primary, secondary } = logos || {};

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div aria-label="Logo" onClick={onClick} onKeyDown={handleKeyDown} tabindex="0" role="button" class="product-logo">
      {primary && (
        <img
          class={secondary && 'product-logo-primary' && 'icon-is-clickable'}
          height={primary.height ?? '24'}
          src={primary.url}
          alt={primary.alt ? primary.alt : null}
          data-test-id="primary-logo"
        />
      )}
      {secondary && (
        <img
          class={primary && 'product-logo-secondary' && 'icon-is-clickable'}
          height={secondary.height ?? '24'}
          src={secondary.url}
          alt={secondary.alt ? secondary.alt : null}
          data-test-id="secondary-logo"
        />
      )}
    </div>
  );
};
