import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusCardExamplesComponent } from './modus-card-examples.component';

describe('ModusCardExamplesComponent', () => {
  let component: ModusCardExamplesComponent;
  let fixture: ComponentFixture<ModusCardExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusCardExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusCardExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
