import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsSignWrapperComponent } from './documents-sign-wrapper.component';

describe('DocumentsSignWrapperComponent', () => {
  let component: DocumentsSignWrapperComponent;
  let fixture: ComponentFixture<DocumentsSignWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsSignWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsSignWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
