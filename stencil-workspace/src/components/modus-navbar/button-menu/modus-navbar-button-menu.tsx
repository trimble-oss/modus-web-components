import {
  Component,
  Prop,
  h // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';

@Component({
  tag: 'modus-navbar-button-menu',
  styleUrl: 'modus-navbar-button-menu.scss'
})

export class ModusNavbarButtonMenu {

  @Prop() reverse: boolean;

  render(): unknown {
    const menuClasses = {
      'button-menu': true,
      reverse: this.reverse
    }

    return (
      <div class={menuClasses}>
        <slot />
      </div>
    );
  }

}