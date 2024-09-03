import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusPaginationExamplesComponent } from './modus-pagination-examples.component';

describe('ModusPaginationExamplesComponent', () => {
  let component: ModusPaginationExamplesComponent;
  let fixture: ComponentFixture<ModusPaginationExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusPaginationExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusPaginationExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
