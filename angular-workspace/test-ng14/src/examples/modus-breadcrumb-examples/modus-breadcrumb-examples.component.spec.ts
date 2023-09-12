import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusBreadcrumbExamplesComponent } from './modus-breadcrumb-examples.component';

describe('ModusBreadcrumbExamplesComponent', () => {
  let component: ModusBreadcrumbExamplesComponent;
  let fixture: ComponentFixture<ModusBreadcrumbExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusBreadcrumbExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusBreadcrumbExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
