import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusSwitchExamplesComponent } from './modus-switch-examples.component';

describe('ModusSwitchExamplesComponent', () => {
  let component: ModusSwitchExamplesComponent;
  let fixture: ComponentFixture<ModusSwitchExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusSwitchExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusSwitchExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
