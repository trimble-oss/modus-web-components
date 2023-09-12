import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusMessageExamplesComponent } from './modus-message-examples.component';

describe('ModusMessageExamplesComponent', () => {
  let component: ModusMessageExamplesComponent;
  let fixture: ComponentFixture<ModusMessageExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusMessageExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusMessageExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
