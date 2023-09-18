import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusRadioGroupExamplesComponent } from './modus-radio-group-examples.component';

describe('ModusRadioGroupExamplesComponent', () => {
  let component: ModusRadioGroupExamplesComponent;
  let fixture: ComponentFixture<ModusRadioGroupExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusRadioGroupExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusRadioGroupExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
