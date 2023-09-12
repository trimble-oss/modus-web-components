import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusCheckboxExamplesComponent } from './modus-checkbox-examples.component';

describe('ModusCheckboxExamplesComponent', () => {
  let component: ModusCheckboxExamplesComponent;
  let fixture: ComponentFixture<ModusCheckboxExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusCheckboxExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusCheckboxExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
