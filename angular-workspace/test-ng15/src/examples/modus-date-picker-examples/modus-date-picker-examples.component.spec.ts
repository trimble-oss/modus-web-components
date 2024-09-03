import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusDatePickerExamplesComponent } from './modus-date-picker-examples.component';

describe('ModusDatePickerExamplesComponent', () => {
  let component: ModusDatePickerExamplesComponent;
  let fixture: ComponentFixture<ModusDatePickerExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusDatePickerExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusDatePickerExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
