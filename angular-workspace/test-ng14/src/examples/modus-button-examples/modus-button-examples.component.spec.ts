import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusButtonExamplesComponent } from './modus-button-examples.component';

describe('ModusButtonExamplesComponent', () => {
  let component: ModusButtonExamplesComponent;
  let fixture: ComponentFixture<ModusButtonExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusButtonExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusButtonExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
