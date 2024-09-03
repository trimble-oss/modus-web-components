import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusAutocompleteExamplesComponent } from './modus-autocomplete-examples.component';

describe('ModusAutocompleteExamplesComponent', () => {
  let component: ModusAutocompleteExamplesComponent;
  let fixture: ComponentFixture<ModusAutocompleteExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusAutocompleteExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusAutocompleteExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
