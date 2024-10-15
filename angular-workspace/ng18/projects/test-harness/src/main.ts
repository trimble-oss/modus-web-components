import { bootstrapApplication } from '@angular/platform-browser';
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

defineCustomElements();
