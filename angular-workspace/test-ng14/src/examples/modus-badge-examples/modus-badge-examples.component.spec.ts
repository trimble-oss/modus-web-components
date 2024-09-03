import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusBadgeExamplesComponent } from './modus-badge-examples.component';

describe('ModusBadgeExamplesComponent', () => {
  let component: ModusBadgeExamplesComponent;
  let fixture: ComponentFixture<ModusBadgeExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusBadgeExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusBadgeExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
