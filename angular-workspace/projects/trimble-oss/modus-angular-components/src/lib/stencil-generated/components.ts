/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@trimble-oss/modus-web-components';




export declare interface ModusAccordion extends Components.ModusAccordion {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel']
})
@Component({
  selector: 'modus-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel']
})
export class ModusAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusAccordionItem extends Components.ModusAccordionItem {
  /**
   * An event that fires on every accordion close. 
   */
  closed: EventEmitter<CustomEvent<any>>;
  /**
   * An event that fires on every accordion open. 
   */
  opened: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'expanded', 'headerText', 'size']
})
@Component({
  selector: 'modus-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'expanded', 'headerText', 'size']
})
export class ModusAccordionItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closed', 'opened']);
  }
}


export declare interface ModusAlert extends Components.ModusAlert {
  /**
   * An event that fires when the alert is dismissed 
   */
  dismissClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'dismissible', 'message', 'type']
})
@Component({
  selector: 'modus-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'dismissible', 'message', 'type']
})
export class ModusAlert {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismissClick']);
  }
}


export declare interface ModusAutocomplete extends Components.ModusAutocomplete {
  /**
   * An event that fires when a dropdown option is selected. Emits the option id. 
   */
  optionSelected: EventEmitter<CustomEvent<string>>;
  /**
   * An event that fires when the input value changes. Emits the value string. 
   */
  valueChange: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'clearable', 'disabled', 'dropdownMaxHeight', 'dropdownZIndex', 'errorText', 'includeSearchIcon', 'label', 'noResultsFoundSubtext', 'noResultsFoundText', 'options', 'placeholder', 'readOnly', 'required', 'showNoResultsFoundMessage', 'size', 'value']
})
@Component({
  selector: 'modus-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'clearable', 'disabled', 'dropdownMaxHeight', 'dropdownZIndex', 'errorText', 'includeSearchIcon', 'label', 'noResultsFoundSubtext', 'noResultsFoundText', 'options', 'placeholder', 'readOnly', 'required', 'showNoResultsFoundMessage', 'size', 'value']
})
export class ModusAutocomplete {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['optionSelected', 'valueChange']);
  }
}


export declare interface ModusBadge extends Components.ModusBadge {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'color', 'size', 'type']
})
@Component({
  selector: 'modus-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'color', 'size', 'type']
})
export class ModusBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

import type { Crumb as IModusBreadcrumbCrumb } from '@trimble-oss/modus-web-components';
export declare interface ModusBreadcrumb extends Components.ModusBreadcrumb {
  /**
   * (optional) An event that fires on breadcrumb click. 
   */
  crumbClick: EventEmitter<CustomEvent<IModusBreadcrumbCrumb>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'crumbs']
})
@Component({
  selector: 'modus-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'crumbs']
})
export class ModusBreadcrumb {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['crumbClick']);
  }
}


export declare interface ModusButton extends Components.ModusButton {
  /**
   * (optional) An event that fires on button click. 
   */
  buttonClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'buttonStyle', 'color', 'disabled', 'size']
})
@Component({
  selector: 'modus-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'buttonStyle', 'color', 'disabled', 'size']
})
export class ModusButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['buttonClick']);
  }
}


export declare interface ModusCard extends Components.ModusCard {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'backgroundColor', 'borderRadius', 'height', 'showCardBorder', 'showShadowOnHover', 'width']
})
@Component({
  selector: 'modus-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'backgroundColor', 'borderRadius', 'height', 'showCardBorder', 'showShadowOnHover', 'width']
})
export class ModusCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusCheckbox extends Components.ModusCheckbox {
  /**
   * An event that fires on checkbox click. 
   */
  checkboxClick: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'checked', 'disabled', 'indeterminate', 'label']
})
@Component({
  selector: 'modus-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'checked', 'disabled', 'indeterminate', 'label']
})
export class ModusCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkboxClick']);
  }
}


export declare interface ModusChip extends Components.ModusChip {
  /**
   * An event that fires on chip click. 
   */
  chipClick: EventEmitter<CustomEvent<any>>;
  /**
   * An event that fires on close icon click. 
   */
  closeClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'chipStyle', 'disabled', 'hasError', 'imageUrl', 'showCheckmark', 'showClose', 'size', 'value']
})
@Component({
  selector: 'modus-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'chipStyle', 'disabled', 'hasError', 'imageUrl', 'showCheckmark', 'showClose', 'size', 'value']
})
export class ModusChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['chipClick', 'closeClick']);
  }
}

import type { ModusDataTableSortingState as IModusDataTableModusDataTableSortingState } from '@trimble-oss/modus-web-components';
export declare interface ModusDataTable extends Components.ModusDataTable {
  /**
   * Emits event on sort change 
   */
  sortChange: EventEmitter<CustomEvent<IModusDataTableModusDataTableSortingState>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['columnResize', 'columns', 'data', 'displayOptions', 'fullWidth', 'hover', 'isExpand', 'pageSizeList', 'pagination', 'showSortIconOnHover', 'sort', 'summaryRow'],
  methods: ['getColumnData']
})
@Component({
  selector: 'modus-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['columnResize', 'columns', 'data', 'displayOptions', 'fullWidth', 'hover', 'isExpand', 'pageSizeList', 'pagination', 'showSortIconOnHover', 'sort', 'summaryRow']
})
export class ModusDataTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sortChange']);
  }
}

import type { DateInputEventData as IModusDateInputDateInputEventData } from '@trimble-oss/modus-web-components';
export declare interface ModusDateInput extends Components.ModusDateInput {
  /**
   * An event that fires on calendar icon click. 
   */
  calendarIconClicked: EventEmitter<CustomEvent<IModusDateInputDateInputEventData>>;
  /**
   * An event that fires on input value out of focus. 
   */
  dateInputBlur: EventEmitter<CustomEvent<IModusDateInputDateInputEventData>>;
  /**
   * An event that fires on input value change. 
   */
  valueChange: EventEmitter<CustomEvent<IModusDateInputDateInputEventData>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['allowedCharsRegex', 'ariaLabel', 'autoFocusInput', 'disableValidation', 'disabled', 'errorText', 'fillerDate', 'format', 'helperText', 'label', 'placeholder', 'readOnly', 'required', 'showCalendarIcon', 'size', 'type', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-date-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowedCharsRegex', 'ariaLabel', 'autoFocusInput', 'disableValidation', 'disabled', 'errorText', 'fillerDate', 'format', 'helperText', 'label', 'placeholder', 'readOnly', 'required', 'showCalendarIcon', 'size', 'type', 'validText', 'value']
})
export class ModusDateInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['calendarIconClicked', 'dateInputBlur', 'valueChange']);
  }
}


export declare interface ModusDatePicker extends Components.ModusDatePicker {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['label']
})
@Component({
  selector: 'modus-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['label']
})
export class ModusDatePicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusDropdown extends Components.ModusDropdown {
  /**
   * An event that fires on dropdown close. 
   */
  dropdownClose: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['animateList', 'ariaLabel', 'customPlacement', 'disabled', 'placement', 'toggleElementId']
})
@Component({
  selector: 'modus-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['animateList', 'ariaLabel', 'customPlacement', 'disabled', 'placement', 'toggleElementId']
})
export class ModusDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dropdownClose']);
  }
}


export declare interface ModusFileDropzone extends Components.ModusFileDropzone {
  /**
   * An event that fires when files have been added or removed, regardless of whether they're valid. 
   */
  files: EventEmitter<CustomEvent<[File[], string | null]>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'description', 'dropzoneHeight', 'dropzoneWidth', 'includeStateIcon', 'label', 'maxFileCount', 'maxFileNameLength', 'maxTotalFileSizeBytes', 'multiple'],
  methods: ['addFile', 'getError', 'getFiles', 'removeFile']
})
@Component({
  selector: 'modus-file-dropzone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'description', 'dropzoneHeight', 'dropzoneWidth', 'includeStateIcon', 'label', 'maxFileCount', 'maxFileNameLength', 'maxTotalFileSizeBytes', 'multiple']
})
export class ModusFileDropzone {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['files']);
  }
}


export declare interface ModusList extends Components.ModusList {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'modus-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class ModusList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusListItem extends Components.ModusListItem {
  /**
   * An event that fires on list item click 
   */
  itemClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'selected', 'size', 'type']
})
@Component({
  selector: 'modus-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'selected', 'size', 'type']
})
export class ModusListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemClick']);
  }
}


export declare interface ModusMessage extends Components.ModusMessage {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'icon', 'type']
})
@Component({
  selector: 'modus-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'icon', 'type']
})
export class ModusMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusModal extends Components.ModusModal {
  /**
   * An event that fires on modal close. 
   */
  closed: EventEmitter<CustomEvent<any>>;
  /**
   * An event that fires on modal open. 
   */
  opened: EventEmitter<CustomEvent<any>>;
  /**
   * An event that fires on primary button click. 
   */
  primaryButtonClick: EventEmitter<CustomEvent<any>>;
  /**
   * An event that fires on secondary button click. 
   */
  secondaryButtonClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'headerText', 'primaryButtonAriaLabel', 'primaryButtonText', 'secondaryButtonAriaLabel', 'secondaryButtonText', 'zIndex'],
  methods: ['close', 'open']
})
@Component({
  selector: 'modus-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'headerText', 'primaryButtonAriaLabel', 'primaryButtonText', 'secondaryButtonAriaLabel', 'secondaryButtonText', 'zIndex']
})
export class ModusModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closed', 'opened', 'primaryButtonClick', 'secondaryButtonClick']);
  }
}

import type { ModusNavbarApp as IModusNavbarModusNavbarApp } from '@trimble-oss/modus-web-components';
export declare interface ModusNavbar extends Components.ModusNavbar {
  /**
   * An event that fires when the apps menu opens. 
   */
  appsMenuOpen: EventEmitter<CustomEvent<void>>;
  /**
   * An event that fires when an apps menu app opens. 
   */
  appsMenuAppOpen: EventEmitter<CustomEvent<IModusNavbarModusNavbarApp>>;
  /**
   * An event that fires when the help link opens. 
   */
  helpOpen: EventEmitter<CustomEvent<void>>;
  /**
   * An event that fires on main menu click. 
   */
  mainMenuClick: EventEmitter<CustomEvent<KeyboardEvent | MouseEvent>>;
  /**
   * An event that fires when the notifications menu opens. 
   */
  notificationsMenuOpen: EventEmitter<CustomEvent<void>>;
  /**
   * An event that fires on product logo click. 
   */
  productLogoClick: EventEmitter<CustomEvent<MouseEvent>>;
  /**
   * An event that fires on profile menu link click. 
   */
  profileMenuLinkClick: EventEmitter<CustomEvent<string>>;
  /**
   * An event that fires when the profile menu opens. 
   */
  profileMenuOpen: EventEmitter<CustomEvent<void>>;
  /**
   * An event that fires on profile menu sign out click. 
   */
  profileMenuSignOutClick: EventEmitter<CustomEvent<MouseEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['apps', 'helpUrl', 'productLogoOptions', 'profileMenuOptions', 'reverse', 'showAppsMenu', 'showHelp', 'showMainMenu', 'showNotifications', 'showPendoPlaceholder', 'showSearch', 'showShadow', 'variant'],
  methods: ['hideMainMenu']
})
@Component({
  selector: 'modus-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['apps', 'helpUrl', 'productLogoOptions', 'profileMenuOptions', 'reverse', 'showAppsMenu', 'showHelp', 'showMainMenu', 'showNotifications', 'showPendoPlaceholder', 'showSearch', 'showShadow', 'variant']
})
export class ModusNavbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['appsMenuOpen', 'appsMenuAppOpen', 'helpOpen', 'mainMenuClick', 'notificationsMenuOpen', 'productLogoClick', 'profileMenuLinkClick', 'profileMenuOpen', 'profileMenuSignOutClick']);
  }
}

import type { ModusNavbarApp as IModusNavbarAppsMenuModusNavbarApp } from '@trimble-oss/modus-web-components';
export declare interface ModusNavbarAppsMenu extends Components.ModusNavbarAppsMenu {
  /**
   *  
   */
  appOpen: EventEmitter<CustomEvent<IModusNavbarAppsMenuModusNavbarApp>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['apps', 'reverse']
})
@Component({
  selector: 'modus-navbar-apps-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['apps', 'reverse']
})
export class ModusNavbarAppsMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['appOpen']);
  }
}


export declare interface ModusNavbarMainMenu extends Components.ModusNavbarMainMenu {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'modus-navbar-main-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class ModusNavbarMainMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusNavbarNotificationsMenu extends Components.ModusNavbarNotificationsMenu {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['reverse']
})
@Component({
  selector: 'modus-navbar-notifications-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['reverse']
})
export class ModusNavbarNotificationsMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusNavbarProfileMenu extends Components.ModusNavbarProfileMenu {
  /**
   *  
   */
  linkClick: EventEmitter<CustomEvent<string>>;
  /**
   *  
   */
  signOutClick: EventEmitter<CustomEvent<MouseEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['avatarUrl', 'email', 'initials', 'links', 'reverse', 'username', 'variant']
})
@Component({
  selector: 'modus-navbar-profile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['avatarUrl', 'email', 'initials', 'links', 'reverse', 'username', 'variant']
})
export class ModusNavbarProfileMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['linkClick', 'signOutClick']);
  }
}


export declare interface ModusNumberInput extends Components.ModusNumberInput {
  /**
   * An event that fires on input value change. 
   */
  valueChange: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'maxValue', 'minValue', 'placeholder', 'readOnly', 'required', 'size', 'step', 'validText', 'value']
})
@Component({
  selector: 'modus-number-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'maxValue', 'minValue', 'placeholder', 'readOnly', 'required', 'size', 'step', 'validText', 'value']
})
export class ModusNumberInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}


export declare interface ModusPagination extends Components.ModusPagination {
  /**
   * An event that fires on page change. 
   */
  pageChange: EventEmitter<CustomEvent<number>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['activePage', 'ariaLabel', 'maxPage', 'minPage', 'nextPageButtonText', 'prevPageButtonText', 'size']
})
@Component({
  selector: 'modus-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['activePage', 'ariaLabel', 'maxPage', 'minPage', 'nextPageButtonText', 'prevPageButtonText', 'size']
})
export class ModusPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pageChange']);
  }
}


export declare interface ModusProgressBar extends Components.ModusProgressBar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'backgroundColor', 'color', 'maxValue', 'minValue', 'size', 'text', 'textColor', 'value']
})
@Component({
  selector: 'modus-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'backgroundColor', 'color', 'maxValue', 'minValue', 'size', 'text', 'textColor', 'value']
})
export class ModusProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusRadioGroup extends Components.ModusRadioGroup {
  /**
   * Fires on radio button click. 
   */
  buttonClick: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'checkedId', 'name', 'radioButtons']
})
@Component({
  selector: 'modus-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'checkedId', 'name', 'radioButtons']
})
export class ModusRadioGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['buttonClick']);
  }
}


export declare interface ModusSelect extends Components.ModusSelect {
  /**
   * An event that fires on input value change. 
   */
  valueChange: EventEmitter<CustomEvent<unknown>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'options', 'optionsDisplayProp', 'required', 'size', 'validText', 'value']
})
@Component({
  selector: 'modus-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'options', 'optionsDisplayProp', 'required', 'size', 'validText', 'value']
})
export class ModusSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}


export declare interface ModusSideNavigation extends Components.ModusSideNavigation {
  /**
   * An event that fires on side navigation panel collapse & expand. 
   */
  sideNavExpand: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['data', 'expanded', 'maxWidth', 'mode', 'targetContent']
})
@Component({
  selector: 'modus-side-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['data', 'expanded', 'maxWidth', 'mode', 'targetContent']
})
export class ModusSideNavigation {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sideNavExpand']);
  }
}


export declare interface ModusSideNavigationItem extends Components.ModusSideNavigationItem {
  /**
   * An event that fires when mouse click or `Enter` key press on an item. 
   */
  sideNavItemClicked: EventEmitter<CustomEvent<{ id: string; selected: boolean }>>;
  /**
   * An event that fires when an item is in focus. 
   */
  sideNavItemFocus: EventEmitter<CustomEvent<{ id: string }>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disableSelection', 'disabled', 'label', 'menuIcon', 'selected', 'showExpandIcon'],
  methods: ['focusItem']
})
@Component({
  selector: 'modus-side-navigation-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disableSelection', 'disabled', 'label', 'menuIcon', 'selected', 'showExpandIcon']
})
export class ModusSideNavigationItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sideNavItemClicked', 'sideNavItemFocus']);
  }
}


export declare interface ModusSlider extends Components.ModusSlider {
  /**
   * An event that fires on slider value change. 
   */
  valueChange: EventEmitter<CustomEvent<string>>;
  /**
   * An event that fires on slider value input. 
   */
  valueInput: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'disabled', 'label', 'maxValue', 'minValue', 'value']
})
@Component({
  selector: 'modus-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'disabled', 'label', 'maxValue', 'minValue', 'value']
})
export class ModusSlider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange', 'valueInput']);
  }
}


export declare interface ModusSpinner extends Components.ModusSpinner {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['color', 'size']
})
@Component({
  selector: 'modus-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['color', 'size']
})
export class ModusSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusSwitch extends Components.ModusSwitch {
  /**
   * An event that fires on switch click. 
   */
  switchClick: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'checked', 'disabled', 'label']
})
@Component({
  selector: 'modus-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'checked', 'disabled', 'label']
})
export class ModusSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['switchClick']);
  }
}

import type { ModusTableCellLink as IModusTableModusTableCellLink } from '@trimble-oss/modus-web-components';
import type { ModusTableSortEvent as IModusTableModusTableSortEvent } from '@trimble-oss/modus-web-components';
import type { ModusTableRowActionClickEvent as IModusTableModusTableRowActionClickEvent } from '@trimble-oss/modus-web-components';
export declare interface ModusTable extends Components.ModusTable {
  /**
   * An event that fires on cell link click. 
   */
  cellLinkClick: EventEmitter<CustomEvent<IModusTableModusTableCellLink>>;
  /**
   * An event that fires on row double click. 
   */
  rowDoubleClick: EventEmitter<CustomEvent<string>>;
  /**
   * An event that fires on selection change. 
   */
  selection: EventEmitter<CustomEvent<string[]>>;
  /**
   * An event that fires on column sort. 
   */
  sort: EventEmitter<CustomEvent<IModusTableModusTableSortEvent>>;
  /**
   * An event that fires when a row action is clicked. 
   */
  rowActionClick: EventEmitter<CustomEvent<IModusTableModusTableRowActionClickEvent>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['columns', 'data', 'displayOptions', 'rowActions', 'selectionOptions', 'sortOptions']
})
@Component({
  selector: 'modus-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['columns', 'data', 'displayOptions', 'rowActions', 'selectionOptions', 'sortOptions']
})
export class ModusTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['cellLinkClick', 'rowDoubleClick', 'selection', 'sort', 'rowActionClick']);
  }
}


export declare interface ModusTabs extends Components.ModusTabs {
  /**
   * An event that fires on tab change. 
   */
  tabChange: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'fullWidth', 'size', 'tabs']
})
@Component({
  selector: 'modus-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'fullWidth', 'size', 'tabs']
})
export class ModusTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}


export declare interface ModusTextInput extends Components.ModusTextInput {
  /**
   * An event that fires on input value change. 
   */
  valueChange: EventEmitter<CustomEvent<string>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'autoFocusInput', 'clearable', 'disabled', 'errorText', 'helperText', 'includePasswordTextToggle', 'includeSearchIcon', 'inputmode', 'label', 'maxLength', 'minLength', 'placeholder', 'readOnly', 'required', 'size', 'type', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-text-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'autoFocusInput', 'clearable', 'disabled', 'errorText', 'helperText', 'includePasswordTextToggle', 'includeSearchIcon', 'inputmode', 'label', 'maxLength', 'minLength', 'placeholder', 'readOnly', 'required', 'size', 'type', 'validText', 'value']
})
export class ModusTextInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}

import type { TimeInputEventData as IModusTimePickerTimeInputEventData } from '@trimble-oss/modus-web-components';
export declare interface ModusTimePicker extends Components.ModusTimePicker {
  /**
   * An event that fires on input value out of focus. 
   */
  timeInputBlur: EventEmitter<CustomEvent<IModusTimePickerTimeInputEventData>>;
  /**
   * An event that fires on input value change. 
   */
  valueChange: EventEmitter<CustomEvent<IModusTimePickerTimeInputEventData>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['allowedCharsRegex', 'ampm', 'ariaLabel', 'autoFocusInput', 'autoFormat', 'disableValidation', 'disabled', 'errorText', 'helperText', 'label', 'max', 'min', 'placeholder', 'readOnly', 'required', 'size', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-time-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowedCharsRegex', 'ampm', 'ariaLabel', 'autoFocusInput', 'autoFormat', 'disableValidation', 'disabled', 'errorText', 'helperText', 'label', 'max', 'min', 'placeholder', 'readOnly', 'required', 'size', 'validText', 'value']
})
export class ModusTimePicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['timeInputBlur', 'valueChange']);
  }
}


export declare interface ModusToast extends Components.ModusToast {
  /**
   * An event that fires when the toast is dismissed 
   */
  dismissClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'dismissible', 'showIcon', 'type']
})
@Component({
  selector: 'modus-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'dismissible', 'showIcon', 'type']
})
export class ModusToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismissClick']);
  }
}


export declare interface ModusTooltip extends Components.ModusTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['ariaLabel', 'position', 'text']
})
@Component({
  selector: 'modus-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['ariaLabel', 'position', 'text']
})
export class ModusTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTreeView extends Components.ModusTreeView {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['checkboxSelection', 'checkedItems', 'expandedItems', 'multiCheckboxSelection', 'multiSelection', 'selectedItems', 'size']
})
@Component({
  selector: 'modus-tree-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['checkboxSelection', 'checkedItems', 'expandedItems', 'multiCheckboxSelection', 'multiSelection', 'selectedItems', 'size']
})
export class ModusTreeView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTreeViewItem extends Components.ModusTreeViewItem {
  /**
   * An event that fires on tree item checkbox click 
   */
  checkboxClick: EventEmitter<CustomEvent<boolean>>;
  /**
   * An event that fires on tree item click 
   */
  itemClick: EventEmitter<CustomEvent<boolean>>;
  /**
   * An event that fires on tree item expand/collapse 
   */
  itemExpandToggle: EventEmitter<CustomEvent<boolean>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'draggableItem', 'droppableItem', 'editable', 'label', 'nodeId'],
  methods: ['focusItem']
})
@Component({
  selector: 'modus-tree-view-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'draggableItem', 'droppableItem', 'editable', 'label', 'nodeId']
})
export class ModusTreeViewItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkboxClick', 'itemClick', 'itemExpandToggle']);
  }
}
