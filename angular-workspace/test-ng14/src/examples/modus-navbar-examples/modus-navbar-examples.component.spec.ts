import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusNavbarExamplesComponent } from './modus-navbar-examples.component';

describe('ModusNavbarExamplesComponent', () => {
  let component: ModusNavbarExamplesComponent;
  let fixture: ComponentFixture<ModusNavbarExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusNavbarExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusNavbarExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
