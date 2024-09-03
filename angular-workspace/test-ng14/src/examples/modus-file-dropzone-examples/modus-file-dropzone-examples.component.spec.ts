import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModusFileDropzoneExamplesComponent } from './modus-file-dropzone-examples.component';

describe('ModusFileDropzoneExamplesComponent', () => {
  let component: ModusFileDropzoneExamplesComponent;
  let fixture: ComponentFixture<ModusFileDropzoneExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModusFileDropzoneExamplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModusFileDropzoneExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
