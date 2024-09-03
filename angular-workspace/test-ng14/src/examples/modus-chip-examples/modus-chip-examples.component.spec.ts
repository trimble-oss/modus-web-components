import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusChipExamplesComponent } from './modus-chip-examples.component';

describe('ModusChipExamplesComponent', () => {
  let component: ModusChipExamplesComponent;
  let fixture: ComponentFixture<ModusChipExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusChipExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusChipExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
