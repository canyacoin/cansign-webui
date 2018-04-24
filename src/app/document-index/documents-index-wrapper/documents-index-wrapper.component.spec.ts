import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsIndexWrapperComponent } from './documents-index-wrapper.component';

describe('DocumentsIndexWrapperComponent', () => {
  let component: DocumentsIndexWrapperComponent;
  let fixture: ComponentFixture<DocumentsIndexWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsIndexWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsIndexWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
