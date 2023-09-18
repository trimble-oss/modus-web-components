import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusNumberExamplesComponent } from './modus-number-examples.component';

describe('ModusNumberExamplesComponent', () => {
  let component: ModusNumberExamplesComponent;
  let fixture: ComponentFixture<ModusNumberExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusNumberExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusNumberExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
