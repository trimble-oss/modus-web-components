import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusDropdownExamplesComponent } from './modus-dropdown-examples.component';

describe('ModusDropdownExamplesComponent', () => {
  let component: ModusDropdownExamplesComponent;
  let fixture: ComponentFixture<ModusDropdownExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusDropdownExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusDropdownExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
