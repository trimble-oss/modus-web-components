import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusToastExamplesComponent } from './modus-toast-examples.component';

describe('ModusToastExamplesComponent', () => {
  let component: ModusToastExamplesComponent;
  let fixture: ComponentFixture<ModusToastExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusToastExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusToastExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
