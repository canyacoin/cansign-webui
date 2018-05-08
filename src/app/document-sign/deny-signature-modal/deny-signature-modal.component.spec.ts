import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenySignatureModalComponent } from './deny-signature-modal.component';

describe('DenySignatureModalComponent', () => {
  let component: DenySignatureModalComponent;
  let fixture: ComponentFixture<DenySignatureModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenySignatureModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenySignatureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
