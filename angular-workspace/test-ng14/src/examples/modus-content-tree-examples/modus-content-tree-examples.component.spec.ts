import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusContentTreeExamplesComponent } from './modus-content-tree-examples.component';

describe('ModusContentTreeExamplesComponent', () => {
  let component: ModusContentTreeExamplesComponent;
  let fixture: ComponentFixture<ModusContentTreeExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusContentTreeExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusContentTreeExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
