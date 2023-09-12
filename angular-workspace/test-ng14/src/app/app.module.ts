import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModusAngularComponentsModule } from '@trimble-oss/modus-angular-components';

import { ModusAccordionExamplesComponent } from '../examples/modus-accordion-examples/modus-accordion-examples.component';

import { ModusAlertExamplesComponent } from '../examples/modus-alert-examples/modus-alert-examples.component';
import { ModusBadgeExamplesComponent } from '../examples/modus-badge-examples/modus-badge-examples.component';
import { ModusBreadcrumbExamplesComponent } from '../examples/modus-breadcrumb-examples/modus-breadcrumb-examples.component';
import { ModusButtonExamplesComponent } from '../examples/modus-button-examples/modus-button-examples.component';
import { ModusCardExamplesComponent } from '../examples/modus-card-examples/modus-card-examples.component';
import { ModusChipExamplesComponent } from '../examples/modus-chip-examples/modus-chip-examples.component';
import { ModusContentTreeExamplesComponent } from '../examples/modus-content-tree-examples/modus-content-tree-examples.component';
import { ModusDataTableExamplesComponent } from '../examples/modus-data-table-examples/modus-data-table-examples.component';
import { ModusDropdownExamplesComponent } from '../examples/modus-dropdown-examples/modus-dropdown-examples.component';
import { ModusFileDropzoneExamplesComponent } from '../examples/modus-file-dropzone-examples/modus-file-dropzone-examples.component';
import { ModusListExamplesComponent } from '../examples/modus-list-examples/modus-list-examples.component';
import { ModusMessageExamplesComponent } from '../examples/modus-message-examples/modus-message-examples.component';
import { ModusModalExamplesComponent } from '../examples/modus-modal-examples/modus-modal-examples.component';
import { ModusNavbarExamplesComponent } from '../examples/modus-navbar-examples/modus-navbar-examples.component';
import { ModusPaginationExamplesComponent } from '../examples/modus-pagination-examples/modus-pagination-examples.component';
import { ModusProgressBarExamplesComponent } from '../examples/modus-progress-bar-examples/modus-progress-bar-examples.component';
import { ModusRadioGroupExamplesComponent } from '../examples/modus-radio-group-examples/modus-radio-group-examples.component';
import { ModusSideNavigationExamplesComponent } from '../examples/modus-side-navigation-examples/modus-side-navigation-examples.component';
import { ModusSliderExamplesComponent } from '../examples/modus-slider-examples/modus-slider-examples.component';
import { ModusSpinnerExamplesComponent } from '../examples/modus-spinner-examples/modus-spinner-examples.component';
import { ModusTabsExamplesComponent } from '../examples/modus-tabs-examples/modus-tabs-examples.component';
import { ModusToastExamplesComponent } from '../examples/modus-toast-examples/modus-toast-examples.component';
import { ModusTooltipExamplesComponent } from '../examples/modus-tooltip-examples/modus-tooltip-examples.component';
import { ModusAutocompleteExamplesComponent } from '../examples/modus-autocomplete-examples/modus-autocomplete-examples.component';
import { ModusCheckboxExamplesComponent } from '../examples/modus-checkbox-examples/modus-checkbox-examples.component';
import { ModusDatePickerExamplesComponent } from '../examples/modus-date-picker-examples/modus-date-picker-examples.component';
import { ModusNumberExamplesComponent } from '../examples/modus-number-examples/modus-number-examples.component';
import { ModusSelectExamplesComponent } from '../examples/modus-select-examples/modus-select-examples.component';
import { ModusSwitchExamplesComponent } from '../examples/modus-switch-examples/modus-switch-examples.component';
import { ModusTextInputExamplesComponent } from '../examples/modus-text-input-examples/modus-text-input-examples.component';
import { ModusTimePickerExamplesComponent } from '../examples/modus-time-picker-examples/modus-time-picker-examples.component';

@NgModule({
  declarations: [
    AppComponent,
    ModusAccordionExamplesComponent,
    ModusAlertExamplesComponent,
    ModusBadgeExamplesComponent,
    ModusBreadcrumbExamplesComponent,
    ModusButtonExamplesComponent,
    ModusCardExamplesComponent,
    ModusChipExamplesComponent,
    ModusContentTreeExamplesComponent,
    ModusDataTableExamplesComponent,
    ModusDropdownExamplesComponent,
    ModusFileDropzoneExamplesComponent,
    ModusListExamplesComponent,
    ModusMessageExamplesComponent,
    ModusModalExamplesComponent,
    ModusNavbarExamplesComponent,
    ModusPaginationExamplesComponent,
    ModusProgressBarExamplesComponent,
    ModusRadioGroupExamplesComponent,
    ModusSideNavigationExamplesComponent,
    ModusSliderExamplesComponent,
    ModusSpinnerExamplesComponent,
    ModusTabsExamplesComponent,
    ModusToastExamplesComponent,
    ModusTooltipExamplesComponent,
    ModusAutocompleteExamplesComponent,
    ModusCheckboxExamplesComponent,
    ModusDatePickerExamplesComponent,
    ModusNumberExamplesComponent,
    ModusSelectExamplesComponent,
    ModusSwitchExamplesComponent,
    ModusTextInputExamplesComponent,
    ModusTimePickerExamplesComponent,
  ],
  imports: [BrowserModule, ModusAngularComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
