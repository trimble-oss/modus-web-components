import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'modus-angular-test-0.1.40-ng14';

  themeToggleClick(e: any) {
    const theme = window.document?.firstElementChild?.getAttribute('data-mwc-theme') === 'dark' ? 'light' : 'dark';
    window.document?.firstElementChild?.setAttribute('data-mwc-theme', theme);
  }
}
