import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusAlertExamplesComponent } from './modus-alert-examples.component';

describe('ModusAlertExamplesComponent', () => {
  let component: ModusAlertExamplesComponent;
  let fixture: ComponentFixture<ModusAlertExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusAlertExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusAlertExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
