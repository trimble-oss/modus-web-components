import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusSelectExamplesComponent } from './modus-select-examples.component';

describe('ModusSelectExamplesComponent', () => {
  let component: ModusSelectExamplesComponent;
  let fixture: ComponentFixture<ModusSelectExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusSelectExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusSelectExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
