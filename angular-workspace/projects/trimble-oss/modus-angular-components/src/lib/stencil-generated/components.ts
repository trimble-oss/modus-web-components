/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@trimble-oss/modus-web-components';


@ProxyCmp({
  inputs: ['ariaLabel']
})
@Component({
  selector: 'modus-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel'],
})
export class ModusAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusAccordion extends Components.ModusAccordion {}


@ProxyCmp({
  inputs: ['disabled', 'expandButtonType', 'expanded', 'headerText', 'icon', 'size']
})
@Component({
  selector: 'modus-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'expandButtonType', 'expanded', 'headerText', 'icon', 'size'],
})
export class ModusAccordionItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closed', 'opened']);
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
  inputs: ['actions', 'size', 'visibleItemCount']
})
@Component({
  selector: 'modus-action-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'size', 'visibleItemCount'],
})
export class ModusActionBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['actionBarClick']);
  }
}


export declare interface ModusActionBar extends Components.ModusActionBar {
  /**
   * (optional) An event that fires on action item click.
   */
  actionBarClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'buttonAriaLabel', 'buttonText', 'dismissible', 'message', 'type']
})
@Component({
  selector: 'modus-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'buttonAriaLabel', 'buttonText', 'dismissible', 'message', 'type'],
})
export class ModusAlert {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismissClick', 'actionClick']);
  }
}


export declare interface ModusAlert extends Components.ModusAlert {
  /**
   * An event that fires when the alert is dismissed
   */
  dismissClick: EventEmitter<CustomEvent<any>>;
  /**
   * An event that firest when the action button is clicked
   */
  actionClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'clearable', 'disableCloseOnSelect', 'disabled', 'dropdownMaxHeight', 'dropdownZIndex', 'errorText', 'includeSearchIcon', 'label', 'multiple', 'noResultsFoundSubtext', 'noResultsFoundText', 'options', 'placeholder', 'readOnly', 'required', 'showNoResultsFoundMessage', 'showOptionsOnFocus', 'size', 'value']
})
@Component({
  selector: 'modus-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'clearable', 'disableCloseOnSelect', 'disabled', 'dropdownMaxHeight', 'dropdownZIndex', 'errorText', 'includeSearchIcon', 'label', 'multiple', 'noResultsFoundSubtext', 'noResultsFoundText', 'options', 'placeholder', 'readOnly', 'required', 'showNoResultsFoundMessage', 'showOptionsOnFocus', 'size', 'value'],
})
export class ModusAutocomplete {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['optionSelected', 'valueChange']);
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
  inputs: ['ariaLabel', 'color', 'size', 'type']
})
@Component({
  selector: 'modus-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'color', 'size', 'type'],
})
export class ModusBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusBadge extends Components.ModusBadge {}


@ProxyCmp({
  inputs: ['ariaLabel', 'crumbs', 'underlineLinks']
})
@Component({
  selector: 'modus-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'crumbs', 'underlineLinks'],
})
export class ModusBreadcrumb {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['crumbClick']);
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
  inputs: ['ariaDisabled', 'ariaLabel', 'buttonStyle', 'color', 'disabled', 'iconOnly', 'leftIcon', 'rightIcon', 'showCaret', 'size', 'type'],
  methods: ['focusButton']
})
@Component({
  selector: 'modus-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaDisabled', 'ariaLabel', 'buttonStyle', 'color', 'disabled', 'iconOnly', 'leftIcon', 'rightIcon', 'showCaret', 'size', 'type'],
})
export class ModusButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['buttonClick']);
  }
}


export declare interface ModusButton extends Components.ModusButton {
  /**
   * (optional) An event that fires on button click.
   */
  buttonClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'borderRadius', 'height', 'showCardBorder', 'showShadowOnHover', 'width']
})
@Component({
  selector: 'modus-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'borderRadius', 'height', 'showCardBorder', 'showShadowOnHover', 'width'],
})
export class ModusCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusCard extends Components.ModusCard {}


@ProxyCmp({
  inputs: ['ariaLabel', 'checked', 'disabled', 'indeterminate', 'label', 'size', 'stopPropagation', 'tabIndexValue'],
  methods: ['focusCheckbox']
})
@Component({
  selector: 'modus-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'checked', 'disabled', 'indeterminate', 'label', 'size', 'stopPropagation', 'tabIndexValue'],
})
export class ModusCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkboxClick']);
  }
}


export declare interface ModusCheckbox extends Components.ModusCheckbox {
  /**
   * An event that fires on checkbox click.
   */
  checkboxClick: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'chipStyle', 'disabled', 'hasError', 'imageUrl', 'maxWidth', 'showCheckmark', 'showClose', 'size', 'value']
})
@Component({
  selector: 'modus-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'chipStyle', 'disabled', 'hasError', 'imageUrl', 'maxWidth', 'showCheckmark', 'showClose', 'size', 'value'],
})
export class ModusChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['chipClick', 'closeClick']);
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
  inputs: ['columns', 'data', 'displayOptions', 'rowActions', 'selectionOptions', 'sortOptions']
})
@Component({
  selector: 'modus-data-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columns', 'data', 'displayOptions', 'rowActions', 'selectionOptions', 'sortOptions'],
})
export class ModusDataTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['cellLinkClick', 'rowDoubleClick', 'selection', 'sort', 'rowActionClick']);
  }
}


import type { ModusDataTableCellLink as IModusDataTableModusDataTableCellLink } from '@trimble-oss/modus-web-components';
import type { ModusDataTableSortEvent as IModusDataTableModusDataTableSortEvent } from '@trimble-oss/modus-web-components';
import type { ModusDataTableRowActionClickEvent as IModusDataTableModusDataTableRowActionClickEvent } from '@trimble-oss/modus-web-components';

export declare interface ModusDataTable extends Components.ModusDataTable {
  /**
   * An event that fires on cell link click.
   */
  cellLinkClick: EventEmitter<CustomEvent<IModusDataTableModusDataTableCellLink>>;
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
  sort: EventEmitter<CustomEvent<IModusDataTableModusDataTableSortEvent>>;
  /**
   * An event that fires when a row action is clicked.
   */
  rowActionClick: EventEmitter<CustomEvent<IModusDataTableModusDataTableRowActionClickEvent>>;
}


@ProxyCmp({
  inputs: ['allowedCharsRegex', 'altFormats', 'ariaLabel', 'autoFocusInput', 'disableValidation', 'disabled', 'errorText', 'fillerDate', 'format', 'helperText', 'label', 'max', 'min', 'placeholder', 'readOnly', 'required', 'showCalendarIcon', 'size', 'type', 'validText', 'value'],
  methods: ['focusInput', 'validate']
})
@Component({
  selector: 'modus-date-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowedCharsRegex', 'altFormats', 'ariaLabel', 'autoFocusInput', 'disableValidation', 'disabled', 'errorText', 'fillerDate', 'format', 'helperText', 'label', 'max', 'min', 'placeholder', 'readOnly', 'required', 'showCalendarIcon', 'size', 'type', 'validText', 'value'],
})
export class ModusDateInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['calendarIconClicked', 'dateInputBlur', 'valueChange']);
  }
}


import type { ModusDateInputEventDetails as IModusDateInputModusDateInputEventDetails } from '@trimble-oss/modus-web-components';

export declare interface ModusDateInput extends Components.ModusDateInput {
  /**
   * An event that fires on calendar icon click.
   */
  calendarIconClicked: EventEmitter<CustomEvent<IModusDateInputModusDateInputEventDetails>>;
  /**
   * An event that fires on input value out of focus.
   */
  dateInputBlur: EventEmitter<CustomEvent<IModusDateInputModusDateInputEventDetails>>;
  /**
   * An event that fires on input value change.
   */
  valueChange: EventEmitter<CustomEvent<IModusDateInputModusDateInputEventDetails>>;
}


@ProxyCmp({
  inputs: ['label']
})
@Component({
  selector: 'modus-date-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['label'],
})
export class ModusDatePicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusDatePicker extends Components.ModusDatePicker {}


@ProxyCmp({
  inputs: ['animateList', 'ariaLabel', 'customPlacement', 'disabled', 'placement', 'showDropdownListBorder', 'toggleElementId']
})
@Component({
  selector: 'modus-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animateList', 'ariaLabel', 'customPlacement', 'disabled', 'placement', 'showDropdownListBorder', 'toggleElementId'],
})
export class ModusDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dropdownClose']);
  }
}


export declare interface ModusDropdown extends Components.ModusDropdown {
  /**
   * An event that fires on dropdown close.
   */
  dropdownClose: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'description', 'dropzoneHeight', 'dropzoneWidth', 'includeStateIcon', 'label', 'maxFileCount', 'maxFileNameLength', 'maxTotalFileSizeBytes', 'multiple'],
  methods: ['addFile', 'getError', 'getFiles', 'removeFile']
})
@Component({
  selector: 'modus-file-dropzone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'description', 'dropzoneHeight', 'dropzoneWidth', 'includeStateIcon', 'label', 'maxFileCount', 'maxFileNameLength', 'maxTotalFileSizeBytes', 'multiple'],
})
export class ModusFileDropzone {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['files']);
  }
}


export declare interface ModusFileDropzone extends Components.ModusFileDropzone {
  /**
   * An event that fires when files have been added or removed, regardless of whether they're valid.
   */
  files: EventEmitter<CustomEvent<[File[], string | null]>>;
}


@ProxyCmp({
  inputs: ['color', 'name', 'size']
})
@Component({
  selector: 'modus-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'name', 'size'],
})
export class ModusIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['iconClick']);
  }
}


export declare interface ModusIcon extends Components.ModusIcon {
  /**
   * (optional) The click handler function
   */
  iconClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
})
@Component({
  selector: 'modus-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class ModusList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusList extends Components.ModusList {}


@ProxyCmp({
  inputs: ['borderless', 'disabled', 'leftIcon', 'selected', 'size', 'subText', 'type', 'wrapSubText'],
  methods: ['focusItem']
})
@Component({
  selector: 'modus-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['borderless', 'disabled', 'leftIcon', 'selected', 'size', 'subText', 'type', 'wrapSubText'],
})
export class ModusListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemClick']);
  }
}


export declare interface ModusListItem extends Components.ModusListItem {
  /**
   * An event that fires on list item click
   */
  itemClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'icon', 'type']
})
@Component({
  selector: 'modus-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'icon', 'type'],
})
export class ModusMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusMessage extends Components.ModusMessage {}


@ProxyCmp({
  inputs: ['ariaLabel', 'backdrop', 'headerText', 'primaryButtonAriaLabel', 'primaryButtonDisabled', 'primaryButtonText', 'secondaryButtonAriaLabel', 'secondaryButtonDisabled', 'secondaryButtonText', 'zIndex'],
  methods: ['close', 'open']
})
@Component({
  selector: 'modus-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'backdrop', 'headerText', 'primaryButtonAriaLabel', 'primaryButtonDisabled', 'primaryButtonText', 'secondaryButtonAriaLabel', 'secondaryButtonDisabled', 'secondaryButtonText', 'zIndex'],
})
export class ModusModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closed', 'opened', 'primaryButtonClick', 'secondaryButtonClick']);
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
  inputs: ['apps', 'buttons', 'enableSearchOverlay', 'helpTooltip', 'helpUrl', 'logoOptions', 'profileMenuOptions', 'reverse', 'searchTooltip', 'showAppsMenu', 'showHelp', 'showMainMenu', 'showNotifications', 'showPendoPlaceholder', 'showProfile', 'showSearch', 'showShadow', 'variant'],
  methods: ['hideMainMenu']
})
@Component({
  selector: 'modus-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['apps', 'buttons', 'enableSearchOverlay', 'helpTooltip', 'helpUrl', 'logoOptions', 'profileMenuOptions', 'reverse', 'searchTooltip', 'showAppsMenu', 'showHelp', 'showMainMenu', 'showNotifications', 'showPendoPlaceholder', 'showProfile', 'showSearch', 'showShadow', 'variant'],
})
export class ModusNavbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['appsMenuOpen', 'appsMenuAppOpen', 'buttonClick', 'helpOpen', 'mainMenuClick', 'notificationsMenuOpen', 'productLogoClick', 'profileMenuLinkClick', 'profileMenuOpen', 'profileMenuSignOutClick', 'searchChange', 'searchMenuClick']);
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
   * An event that fires when a button in the custom button list is clicked.
   */
  buttonClick: EventEmitter<CustomEvent<string>>;
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
  profileMenuSignOutClick: EventEmitter<CustomEvent<KeyboardEvent | MouseEvent>>;
  /**
   * An event that fires on search value change.
   */
  searchChange: EventEmitter<CustomEvent<string>>;
  /**
   * An event that fires on search button click.
   */
  searchMenuClick: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['apps', 'reverse']
})
@Component({
  selector: 'modus-navbar-apps-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['apps', 'reverse'],
})
export class ModusNavbarAppsMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['appOpen']);
  }
}


import type { ModusNavbarApp as IModusNavbarAppsMenuModusNavbarApp } from '@trimble-oss/modus-web-components';

export declare interface ModusNavbarAppsMenu extends Components.ModusNavbarAppsMenu {

  appOpen: EventEmitter<CustomEvent<IModusNavbarAppsMenuModusNavbarApp>>;
}


@ProxyCmp({
  inputs: ['reverse']
})
@Component({
  selector: 'modus-navbar-button-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['reverse'],
})
export class ModusNavbarButtonMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusNavbarButtonMenu extends Components.ModusNavbarButtonMenu {}


@ProxyCmp({
  inputs: ['navbarId']
})
@Component({
  selector: 'modus-navbar-main-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['navbarId'],
})
export class ModusNavbarMainMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusNavbarMainMenu extends Components.ModusNavbarMainMenu {}


@ProxyCmp({
  inputs: ['reverse']
})
@Component({
  selector: 'modus-navbar-notifications-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['reverse'],
})
export class ModusNavbarNotificationsMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusNavbarNotificationsMenu extends Components.ModusNavbarNotificationsMenu {}


@ProxyCmp({
  inputs: ['avatarUrl', 'email', 'initials', 'links', 'reverse', 'signOutText', 'username', 'variant']
})
@Component({
  selector: 'modus-navbar-profile-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['avatarUrl', 'email', 'initials', 'links', 'reverse', 'signOutText', 'username', 'variant'],
})
export class ModusNavbarProfileMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['linkClick', 'signOutClick']);
  }
}


export declare interface ModusNavbarProfileMenu extends Components.ModusNavbarProfileMenu {

  linkClick: EventEmitter<CustomEvent<string>>;

  signOutClick: EventEmitter<CustomEvent<MouseEvent>>;
}


@ProxyCmp({
})
@Component({
  selector: 'modus-navbar-search-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class ModusNavbarSearchOverlay {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['close', 'search']);
  }
}


export declare interface ModusNavbarSearchOverlay extends Components.ModusNavbarSearchOverlay {
  /**
   * An event that fires on clicking on close button of search overlay
   */
  close: EventEmitter<CustomEvent<void>>;
  /**
   * An event that fires on search value change.
   */
  search: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'maxValue', 'minValue', 'placeholder', 'readOnly', 'required', 'size', 'step', 'textAlign', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-number-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'maxValue', 'minValue', 'placeholder', 'readOnly', 'required', 'size', 'step', 'textAlign', 'validText', 'value'],
})
export class ModusNumberInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}


export declare interface ModusNumberInput extends Components.ModusNumberInput {
  /**
   * An event that fires on input value change.
   */
  valueChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['activePage', 'ariaLabel', 'maxPage', 'minPage', 'nextPageButtonText', 'prevPageButtonText', 'size']
})
@Component({
  selector: 'modus-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['activePage', 'ariaLabel', 'maxPage', 'minPage', 'nextPageButtonText', 'prevPageButtonText', 'size'],
})
export class ModusPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pageChange']);
  }
}


export declare interface ModusPagination extends Components.ModusPagination {
  /**
   * An event that fires on page change.
   */
  pageChange: EventEmitter<CustomEvent<number>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'backgroundColor', 'color', 'maxValue', 'minValue', 'size', 'text', 'textColor', 'value']
})
@Component({
  selector: 'modus-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'backgroundColor', 'color', 'maxValue', 'minValue', 'size', 'text', 'textColor', 'value'],
})
export class ModusProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusProgressBar extends Components.ModusProgressBar {}


@ProxyCmp({
  inputs: ['ariaLabel', 'checkedId', 'name', 'radioButtons', 'size']
})
@Component({
  selector: 'modus-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'checkedId', 'name', 'radioButtons', 'size'],
})
export class ModusRadioGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['buttonClick']);
  }
}


export declare interface ModusRadioGroup extends Components.ModusRadioGroup {
  /**
   * Fires on radio button click.
   */
  buttonClick: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'options', 'optionsDisplayProp', 'placeholder', 'required', 'size', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'errorText', 'helperText', 'label', 'options', 'optionsDisplayProp', 'placeholder', 'required', 'size', 'validText', 'value'],
})
export class ModusSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange', 'inputBlur']);
  }
}


export declare interface ModusSelect extends Components.ModusSelect {
  /**
   * An event that fires on input value change.
   */
  valueChange: EventEmitter<CustomEvent<unknown>>;
  /**
   * An event that fires on input blur.
   */
  inputBlur: EventEmitter<CustomEvent<FocusEvent>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'disabled', 'type']
})
@Component({
  selector: 'modus-sentiment-scale',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'type'],
})
export class ModusSentimentScale {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sentimentSelection']);
  }
}


export declare interface ModusSentimentScale extends Components.ModusSentimentScale {
  /**
   * An event that fires the selected sentiment.
   */
  sentimentSelection: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['collapseOnClickOutside', 'data', 'expanded', 'maxWidth', 'mode', 'targetContent']
})
@Component({
  selector: 'modus-side-navigation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['collapseOnClickOutside', 'data', 'expanded', 'maxWidth', 'mode', 'targetContent'],
})
export class ModusSideNavigation {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sideNavExpand']);
  }
}


export declare interface ModusSideNavigation extends Components.ModusSideNavigation {
  /**
   * An event that fires on side navigation panel collapse & expand.
   */
  sideNavExpand: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['disableSelection', 'disabled', 'label', 'menuIcon', 'selected', 'showExpandIcon'],
  methods: ['focusItem']
})
@Component({
  selector: 'modus-side-navigation-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disableSelection', 'disabled', 'label', 'menuIcon', 'selected', 'showExpandIcon'],
})
export class ModusSideNavigationItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sideNavItemClicked', 'sideNavItemFocus']);
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
  inputs: ['ariaLabel', 'disabled', 'label', 'maxValue', 'minValue', 'value']
})
@Component({
  selector: 'modus-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'label', 'maxValue', 'minValue', 'value'],
})
export class ModusSlider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange', 'valueInput']);
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
  inputs: ['color', 'size']
})
@Component({
  selector: 'modus-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'size'],
})
export class ModusSpinner {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusSpinner extends Components.ModusSpinner {}


@ProxyCmp({
  inputs: ['ariaLabel', 'checked', 'disabled', 'label', 'size']
})
@Component({
  selector: 'modus-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'checked', 'disabled', 'label', 'size'],
})
export class ModusSwitch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['switchClick']);
  }
}


export declare interface ModusSwitch extends Components.ModusSwitch {
  /**
   * An event that fires on switch click.
   */
  switchClick: EventEmitter<CustomEvent<boolean>>;
}


@ProxyCmp({
  inputs: ['columnReorder', 'columnResize', 'columns', 'data', 'defaultSort', 'density', 'displayOptions', 'fullWidth', 'hover', 'manualPaginationOptions', 'manualSortingOptions', 'maxHeight', 'maxWidth', 'pageSizeList', 'pagination', 'rowActions', 'rowSelection', 'rowSelectionOptions', 'rowsExpandable', 'showSortIconOnHover', 'sort', 'sortIconStyle', 'summaryRow', 'toolbar', 'toolbarOptions', 'wrapText'],
  methods: ['getColumnData', 'toggleColumnVisibility']
})
@Component({
  selector: 'modus-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columnReorder', 'columnResize', 'columns', 'data', 'defaultSort', 'density', 'displayOptions', 'fullWidth', 'hover', 'manualPaginationOptions', 'manualSortingOptions', 'maxHeight', 'maxWidth', 'pageSizeList', 'pagination', 'rowActions', 'rowSelection', 'rowSelectionOptions', 'rowsExpandable', 'showSortIconOnHover', 'sort', 'sortIconStyle', 'summaryRow', 'toolbar', 'toolbarOptions', 'wrapText'],
})
export class ModusTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['cellValueChange', 'cellLinkClick', 'columnOrderChange', 'columnSizingChange', 'columnVisibilityChange', 'rowActionClick', 'rowExpanded', 'rowSelectionChange', 'sortChange', 'paginationChange']);
  }
}


import type { ModusTableCellValueChange as IModusTableModusTableCellValueChange } from '@trimble-oss/modus-web-components';
import type { ModusTableCellLink as IModusTableModusTableCellLink } from '@trimble-oss/modus-web-components';
import type { ModusTableColumnOrderState as IModusTableModusTableColumnOrderState } from '@trimble-oss/modus-web-components';
import type { ModusTableColumnSizingState as IModusTableModusTableColumnSizingState } from '@trimble-oss/modus-web-components';
import type { ModusTableColumnVisibilityState as IModusTableModusTableColumnVisibilityState } from '@trimble-oss/modus-web-components';
import type { ModusTableRowActionClick as IModusTableModusTableRowActionClick } from '@trimble-oss/modus-web-components';
import type { ModusTableExpandedState as IModusTableModusTableExpandedState } from '@trimble-oss/modus-web-components';
import type { ModusTableSortingState as IModusTableModusTableSortingState } from '@trimble-oss/modus-web-components';
import type { ModusTablePaginationState as IModusTableModusTablePaginationState } from '@trimble-oss/modus-web-components';

export declare interface ModusTable extends Components.ModusTable {
  /**
   * Emits the cell value that was edited
   */
  cellValueChange: EventEmitter<CustomEvent<IModusTableModusTableCellValueChange>>;
  /**
   * Emits the link that was clicked
   */
  cellLinkClick: EventEmitter<CustomEvent<IModusTableModusTableCellLink>>;
  /**
   * Emits columns in the updated order
   */
  columnOrderChange: EventEmitter<CustomEvent<IModusTableModusTableColumnOrderState>>;
  /**
   * Emits latest column size
   */
  columnSizingChange: EventEmitter<CustomEvent<IModusTableModusTableColumnSizingState>>;
  /**
   * Emits visibility state of each column
   */
  columnVisibilityChange: EventEmitter<CustomEvent<IModusTableModusTableColumnVisibilityState>>;
  /**
   * An event that fires when a row action is clicked.
   */
  rowActionClick: EventEmitter<CustomEvent<IModusTableModusTableRowActionClick>>;
  /**
   * Emits expanded state of the columns
   */
  rowExpanded: EventEmitter<CustomEvent<IModusTableModusTableExpandedState>>;
  /**
   * Emits rows selected
   */
  rowSelectionChange: EventEmitter<CustomEvent<unknown>>;
  /**
   * Emits column sort order
   */
  sortChange: EventEmitter<CustomEvent<IModusTableModusTableSortingState>>;
  /**
   * Emits selected page index and size
   */
  paginationChange: EventEmitter<CustomEvent<IModusTableModusTablePaginationState>>;
}


@ProxyCmp({
  inputs: ['args', 'keyDown', 'type', 'value', 'valueChange']
})
@Component({
  selector: 'modus-table-cell-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['args', 'keyDown', 'type', 'value', 'valueChange'],
})
export class ModusTableCellEditor {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableCellEditor extends Components.ModusTableCellEditor {}


@ProxyCmp({
  inputs: ['cell', 'context', 'hasRowsExpandable', 'valueChange']
})
@Component({
  selector: 'modus-table-cell-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cell', 'context', 'hasRowsExpandable', 'valueChange'],
})
export class ModusTableCellMain {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableCellMain extends Components.ModusTableCellMain {}


@ProxyCmp({
  inputs: ['columnsVisibility', 'getAllLeafColumns', 'maxHeight', 'menuIconContainerRef', 'showDropdown', 'toggleDropdown']
})
@Component({
  selector: 'modus-table-columns-visibility',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columnsVisibility', 'getAllLeafColumns', 'maxHeight', 'menuIconContainerRef', 'showDropdown', 'toggleDropdown'],
})
export class ModusTableColumnsVisibility {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableColumnsVisibility extends Components.ModusTableColumnsVisibility {}


@ProxyCmp({
  inputs: ['context']
})
@Component({
  selector: 'modus-table-dropdown-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['context'],
})
export class ModusTableDropdownMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableDropdownMenu extends Components.ModusTableDropdownMenu {}


@ProxyCmp({
  inputs: ['cellBorderless', 'container', 'summaryRow']
})
@Component({
  selector: 'modus-table-filler-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cellBorderless', 'container', 'summaryRow'],
})
export class ModusTableFillerColumn {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableFillerColumn extends Components.ModusTableFillerColumn {}


@ProxyCmp({
  inputs: ['context', 'row']
})
@Component({
  selector: 'modus-table-row-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['context', 'row'],
})
export class ModusTableRowActions {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['overflowRowActions']);
  }
}


import type { TableRowActionsMenuEvent as IModusTableRowActionsTableRowActionsMenuEvent } from '@trimble-oss/modus-web-components';

export declare interface ModusTableRowActions extends Components.ModusTableRowActions {

  overflowRowActions: EventEmitter<CustomEvent<IModusTableRowActionsTableRowActionsMenuEvent>>;
}


@ProxyCmp({
  inputs: ['context', 'row']
})
@Component({
  selector: 'modus-table-row-actions-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['context', 'row'],
})
export class ModusTableRowActionsCell {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableRowActionsCell extends Components.ModusTableRowActionsCell {}


@ProxyCmp({
  inputs: ['context']
})
@Component({
  selector: 'modus-table-row-actions-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['context'],
})
export class ModusTableRowActionsMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableRowActionsMenu extends Components.ModusTableRowActionsMenu {}


@ProxyCmp({
  inputs: ['context']
})
@Component({
  selector: 'modus-table-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['context'],
})
export class ModusTableToolbar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTableToolbar extends Components.ModusTableToolbar {}


@ProxyCmp({
  inputs: ['ariaLabel', 'fullWidth', 'size', 'tabs']
})
@Component({
  selector: 'modus-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'fullWidth', 'size', 'tabs'],
})
export class ModusTabs {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['tabChange']);
  }
}


export declare interface ModusTabs extends Components.ModusTabs {
  /**
   * An event that fires on tab change.
   */
  tabChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'autoFocusInput', 'autocomplete', 'clearable', 'disabled', 'errorText', 'helperText', 'includePasswordTextToggle', 'includeSearchIcon', 'inputmode', 'label', 'maxLength', 'minLength', 'placeholder', 'readOnly', 'required', 'size', 'textAlign', 'type', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-text-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'autoFocusInput', 'autocomplete', 'clearable', 'disabled', 'errorText', 'helperText', 'includePasswordTextToggle', 'includeSearchIcon', 'inputmode', 'label', 'maxLength', 'minLength', 'placeholder', 'readOnly', 'required', 'size', 'textAlign', 'type', 'validText', 'value'],
})
export class ModusTextInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['valueChange']);
  }
}


export declare interface ModusTextInput extends Components.ModusTextInput {
  /**
   * An event that fires on input value change.
   */
  valueChange: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['allowedCharsRegex', 'ampm', 'ariaLabel', 'autoFocusInput', 'autoFormat', 'disableValidation', 'disabled', 'errorText', 'helperText', 'label', 'max', 'min', 'placeholder', 'readOnly', 'required', 'size', 'validText', 'value'],
  methods: ['focusInput']
})
@Component({
  selector: 'modus-time-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowedCharsRegex', 'ampm', 'ariaLabel', 'autoFocusInput', 'autoFormat', 'disableValidation', 'disabled', 'errorText', 'helperText', 'label', 'max', 'min', 'placeholder', 'readOnly', 'required', 'size', 'validText', 'value'],
})
export class ModusTimePicker {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['timeInputBlur', 'valueChange']);
  }
}


import type { ModusTimePickerEventDetails as IModusTimePickerModusTimePickerEventDetails } from '@trimble-oss/modus-web-components';

export declare interface ModusTimePicker extends Components.ModusTimePicker {
  /**
   * An event that fires on input value out of focus.
   */
  timeInputBlur: EventEmitter<CustomEvent<IModusTimePickerModusTimePickerEventDetails>>;
  /**
   * An event that fires on input value change.
   */
  valueChange: EventEmitter<CustomEvent<IModusTimePickerModusTimePickerEventDetails>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'dismissible', 'showIcon', 'type']
})
@Component({
  selector: 'modus-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'dismissible', 'showIcon', 'type'],
})
export class ModusToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dismissClick']);
  }
}


export declare interface ModusToast extends Components.ModusToast {
  /**
   * An event that fires when the toast is dismissed
   */
  dismissClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['ariaLabel', 'disabled', 'position', 'text']
})
@Component({
  selector: 'modus-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'position', 'text'],
})
export class ModusTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface ModusTooltip extends Components.ModusTooltip {}


@ProxyCmp({
  inputs: ['borderless', 'checkboxSelection', 'checkedItems', 'disableTabbing', 'expandedItems', 'multiCheckboxSelection', 'multiSelection', 'selectedItems', 'size']
})
@Component({
  selector: 'modus-tree-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['borderless', 'checkboxSelection', 'checkedItems', 'disableTabbing', 'expandedItems', 'multiCheckboxSelection', 'multiSelection', 'selectedItems', 'size'],
})
export class ModusTreeView {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemActionClick']);
  }
}


export declare interface ModusTreeView extends Components.ModusTreeView {
  /**
   * Fired when an action is clicked within any tree item. Includes both the `actionId` and `nodeId` of the action and item, respectively.
   */
  itemActionClick: EventEmitter<CustomEvent<any>>;
}


@ProxyCmp({
  inputs: ['actions', 'disabled', 'draggableItem', 'droppableItem', 'editable', 'label', 'nodeId', 'tabIndexValue'],
  methods: ['focusItem', 'focusCheckbox']
})
@Component({
  selector: 'modus-tree-view-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'disabled', 'draggableItem', 'droppableItem', 'editable', 'label', 'nodeId', 'tabIndexValue'],
})
export class ModusTreeViewItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['checkboxClick', 'itemClick', 'itemExpandToggle', 'actionClick']);
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
  /**
   * Fired when an action button within the tree item is clicked. Includes the `actionId`.
   */
  actionClick: EventEmitter<CustomEvent<any>>;
}


