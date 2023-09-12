import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusAccordionExamplesComponent } from './modus-accordion-examples.component';

describe('ModusAccordionExamplesComponent', () => {
  let component: ModusAccordionExamplesComponent;
  let fixture: ComponentFixture<ModusAccordionExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusAccordionExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusAccordionExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
