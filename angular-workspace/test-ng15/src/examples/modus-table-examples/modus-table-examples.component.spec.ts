import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusTooltipExamplesComponent } from './modus-table-examples.component';

describe('ModusTooltipExamplesComponent', () => {
  let component: ModusTooltipExamplesComponent;
  let fixture: ComponentFixture<ModusTooltipExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModusTooltipExamplesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModusTooltipExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
