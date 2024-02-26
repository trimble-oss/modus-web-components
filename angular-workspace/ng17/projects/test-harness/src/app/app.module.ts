import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ModusAngularComponentsModule } from '../../../trimble-oss/modus-angular-components/src/lib/modus-angular-components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ModusAngularComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
