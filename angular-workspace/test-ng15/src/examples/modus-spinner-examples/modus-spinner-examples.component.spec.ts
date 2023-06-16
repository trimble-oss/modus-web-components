import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusSpinnerExamplesComponent } from './modus-spinner-examples.component';

describe('ModusSpinnerExamplesComponent', () => {
  let component: ModusSpinnerExamplesComponent;
  let fixture: ComponentFixture<ModusSpinnerExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusSpinnerExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusSpinnerExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
