import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusProgressBarExamplesComponent } from './modus-progress-bar-examples.component';

describe('ModusProgressBarExamplesComponent', () => {
  let component: ModusProgressBarExamplesComponent;
  let fixture: ComponentFixture<ModusProgressBarExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusProgressBarExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusProgressBarExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
