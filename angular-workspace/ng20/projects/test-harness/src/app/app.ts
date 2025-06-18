import { Component } from '@angular/core';
import { ModusAngularComponentsModule } from '../../../trimble-oss/modus-angular-components/src/lib/modus-angular-components.module';

@Component({
  selector: 'app-root',
  imports: [ModusAngularComponentsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'test-harness';

  onValueChange() {
    console.log('Value Changed');
  }
}
