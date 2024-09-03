import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusTextInputExamplesComponent } from './modus-text-input-examples.component';

describe('ModusTextInputExamplesComponent', () => {
  let component: ModusTextInputExamplesComponent;
  let fixture: ComponentFixture<ModusTextInputExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusTextInputExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusTextInputExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
