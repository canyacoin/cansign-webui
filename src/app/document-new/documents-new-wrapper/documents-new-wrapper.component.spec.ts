import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsNewWrapperComponent } from './documents-new-wrapper.component';

describe('DocumentsNewWrapperComponent', () => {
  let component: DocumentsNewWrapperComponent;
  let fixture: ComponentFixture<DocumentsNewWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsNewWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsNewWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
