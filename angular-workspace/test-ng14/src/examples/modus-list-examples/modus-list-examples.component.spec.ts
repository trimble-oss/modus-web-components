import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusListExamplesComponent } from './modus-list-examples.component';

describe('ModusListExamplesComponent', () => {
  let component: ModusListExamplesComponent;
  let fixture: ComponentFixture<ModusListExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusListExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusListExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
