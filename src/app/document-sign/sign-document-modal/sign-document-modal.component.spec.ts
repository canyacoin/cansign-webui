import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignDocumentModalComponent } from './sign-document-modal.component';

describe('SignDocumentModalComponent', () => {
  let component: SignDocumentModalComponent;
  let fixture: ComponentFixture<SignDocumentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignDocumentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
