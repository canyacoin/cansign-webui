import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSignerModalComponent } from './add-signer-modal.component';

describe('AddSignerModalComponent', () => {
  let component: AddSignerModalComponent;
  let fixture: ComponentFixture<AddSignerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSignerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSignerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
