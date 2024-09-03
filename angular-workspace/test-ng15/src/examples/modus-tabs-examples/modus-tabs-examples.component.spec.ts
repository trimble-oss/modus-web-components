import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusTabsExamplesComponent } from './modus-tabs-examples.component';

describe('ModusTabsExamplesComponent', () => {
  let component: ModusTabsExamplesComponent;
  let fixture: ComponentFixture<ModusTabsExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusTabsExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusTabsExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
