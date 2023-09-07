import {
  Component,
  Prop,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';

@Component({
  tag: 'modus-floating-navbar-button-menu',
  styleUrl: 'modus-floating-navbar-button-menu.scss',
})
export class ModusFloatingNavbarButtonMenu {
  @Prop() reverse: boolean;

  render(): unknown {
    const menuClasses = {
      'button-menu': true,
      reverse: this.reverse,
    };

    return (
      <div class={menuClasses}>
        <slot />
      </div>
    );
  }
}
