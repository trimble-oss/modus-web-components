/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface ModusButton {
        /**
          * (optional) Disables the button
         */
        "disabled": boolean;
        /**
          * (optional) The size of the button
         */
        "size": 'small' | 'medium' | 'large';
        /**
          * (optional) The type of button
         */
        "type": 'cta' | 'default' | 'primary' | 'secondary' | 'warning';
    }
    interface ModusDropdown {
        /**
          * (optional) Disables the button
         */
        "disabled": boolean;
    }
    interface ModusListItem {
        /**
          * (optional) The selected state of the item
         */
        "selected": boolean;
        /**
          * (optional) The size of list item
         */
        "size": 'condensed' | 'standard';
        /**
          * (optional) The type of list item
         */
        "type": 'standard';
    }
}
declare global {
    interface HTMLModusButtonElement extends Components.ModusButton, HTMLStencilElement {
    }
    var HTMLModusButtonElement: {
        prototype: HTMLModusButtonElement;
        new (): HTMLModusButtonElement;
    };
    interface HTMLModusDropdownElement extends Components.ModusDropdown, HTMLStencilElement {
    }
    var HTMLModusDropdownElement: {
        prototype: HTMLModusDropdownElement;
        new (): HTMLModusDropdownElement;
    };
    interface HTMLModusListItemElement extends Components.ModusListItem, HTMLStencilElement {
    }
    var HTMLModusListItemElement: {
        prototype: HTMLModusListItemElement;
        new (): HTMLModusListItemElement;
    };
    interface HTMLElementTagNameMap {
        "modus-button": HTMLModusButtonElement;
        "modus-dropdown": HTMLModusDropdownElement;
        "modus-list-item": HTMLModusListItemElement;
    }
}
declare namespace LocalJSX {
    interface ModusButton {
        /**
          * (optional) Disables the button
         */
        "disabled"?: boolean;
        /**
          * (optional) An event that fires on button click
         */
        "onButtonClick"?: (event: CustomEvent<any>) => void;
        /**
          * (optional) The size of the button
         */
        "size"?: 'small' | 'medium' | 'large';
        /**
          * (optional) The type of button
         */
        "type"?: 'cta' | 'default' | 'primary' | 'secondary' | 'warning';
    }
    interface ModusDropdown {
        /**
          * (optional) Disables the button
         */
        "disabled"?: boolean;
        /**
          * (optional) An event that fires on item select
         */
        "onItemSelect"?: (event: CustomEvent<any>) => void;
    }
    interface ModusListItem {
        /**
          * (optional) An event that fires on item click
         */
        "onItemClick"?: (event: CustomEvent<any>) => void;
        /**
          * (optional) The selected state of the item
         */
        "selected"?: boolean;
        /**
          * (optional) The size of list item
         */
        "size"?: 'condensed' | 'standard';
        /**
          * (optional) The type of list item
         */
        "type"?: 'standard';
    }
    interface IntrinsicElements {
        "modus-button": ModusButton;
        "modus-dropdown": ModusDropdown;
        "modus-list-item": ModusListItem;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "modus-button": LocalJSX.ModusButton & JSXBase.HTMLAttributes<HTMLModusButtonElement>;
            "modus-dropdown": LocalJSX.ModusDropdown & JSXBase.HTMLAttributes<HTMLModusDropdownElement>;
            "modus-list-item": LocalJSX.ModusListItem & JSXBase.HTMLAttributes<HTMLModusListItemElement>;
        }
    }
}
