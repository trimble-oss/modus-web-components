import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusTimePickerExamplesComponent } from './modus-time-picker-examples.component';

describe('ModusTimePickerExamplesComponent', () => {
  let component: ModusTimePickerExamplesComponent;
  let fixture: ComponentFixture<ModusTimePickerExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusTimePickerExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusTimePickerExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
