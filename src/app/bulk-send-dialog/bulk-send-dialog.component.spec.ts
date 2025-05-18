import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendDialogComponent } from './bulk-send-dialog.component';

describe('BulkSendDialogComponent', () => {
  let component: BulkSendDialogComponent;
  let fixture: ComponentFixture<BulkSendDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendDialogComponent]
    });
    fixture = TestBed.createComponent(BulkSendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
