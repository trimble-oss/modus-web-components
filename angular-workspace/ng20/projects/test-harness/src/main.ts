import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { defineCustomElements } from '@trimble-oss/modus-web-components/loader';

defineCustomElements();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
