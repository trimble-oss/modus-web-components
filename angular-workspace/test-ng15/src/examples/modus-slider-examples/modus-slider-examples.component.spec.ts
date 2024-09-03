import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusSliderExamplesComponent } from './modus-slider-examples.component';

describe('ModusSliderExamplesComponent', () => {
  let component: ModusSliderExamplesComponent;
  let fixture: ComponentFixture<ModusSliderExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusSliderExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusSliderExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
