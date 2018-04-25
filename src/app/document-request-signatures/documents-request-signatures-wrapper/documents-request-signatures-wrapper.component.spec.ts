import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsRequestSignaturesWrapperComponent } from './documents-request-signatures-wrapper.component';

describe('DocumentsRequestSignaturesWrapperComponent', () => {
  let component: DocumentsRequestSignaturesWrapperComponent;
  let fixture: ComponentFixture<DocumentsRequestSignaturesWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsRequestSignaturesWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsRequestSignaturesWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
