import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusModalExamplesComponent } from './modus-modal-examples.component';

describe('ModusModalExamplesComponent', () => {
  let component: ModusModalExamplesComponent;
  let fixture: ComponentFixture<ModusModalExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusModalExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusModalExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
