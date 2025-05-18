import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkSendDetailDialogComponent } from './bulk-send-detail-dialog.component';

describe('BulkSendDetailDialogComponent', () => {
  let component: BulkSendDetailDialogComponent;
  let fixture: ComponentFixture<BulkSendDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkSendDetailDialogComponent]
    });
    fixture = TestBed.createComponent(BulkSendDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
