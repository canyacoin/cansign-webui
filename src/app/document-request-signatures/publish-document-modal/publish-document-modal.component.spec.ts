import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishDocumentModalComponent } from './publish-document-modal.component';

describe('PublishDocumentModalComponent', () => {
  let component: PublishDocumentModalComponent;
  let fixture: ComponentFixture<PublishDocumentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishDocumentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
