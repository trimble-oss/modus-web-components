import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusDataTableExamplesComponent } from './modus-data-table-examples.component';

describe('ModusDataTableExamplesComponent', () => {
  let component: ModusDataTableExamplesComponent;
  let fixture: ComponentFixture<ModusDataTableExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusDataTableExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusDataTableExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
