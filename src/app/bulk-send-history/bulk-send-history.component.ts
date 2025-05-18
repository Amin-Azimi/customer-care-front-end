import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BulkSend } from '../api/Message';
import { TicketsService } from '../api/tickets.service';
import { MatDialog } from '@angular/material/dialog';
import { BulkSendDetailDialogComponent } from '../bulk-send-detail-dialog/bulk-send-detail-dialog.component';

@Component({
  selector: 'app-bulk-send-history',
  templateUrl: './bulk-send-history.component.html',
  styleUrls: ['./bulk-send-history.component.scss'],
})
export class BulkSendHistoryComponent implements OnInit {
  bulkSendList: Observable<BulkSend[]> = new Observable<BulkSend[]>();

  constructor(private readonly api: TicketsService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.bulkSendList = this.api.listBulkSends();
  }

  trackByJobId(index: number, item: BulkSend) {
    return item.id;
  }

  viewDetail(id: number): void {
    this.dialog.open(BulkSendDetailDialogComponent, {
      width: '600px',
      data: { id },
    });
  }
}
