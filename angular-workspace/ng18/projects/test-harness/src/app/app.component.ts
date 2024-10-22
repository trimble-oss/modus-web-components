import { Component } from '@angular/core';
import { ModusAngularComponentsModule } from '../../../trimble-oss/modus-angular-components/src/lib/modus-angular-components.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModusAngularComponentsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-harness';

  onValueChange() {
    console.log('Value Changed');
  }
}
