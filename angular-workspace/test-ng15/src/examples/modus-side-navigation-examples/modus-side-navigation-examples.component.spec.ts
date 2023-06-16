import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusSideNavigationExamplesComponent } from './modus-side-navigation-examples.component';

describe('ModusSideNavigationExamplesComponent', () => {
  let component: ModusSideNavigationExamplesComponent;
  let fixture: ComponentFixture<ModusSideNavigationExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusSideNavigationExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusSideNavigationExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
