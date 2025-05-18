import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketsService } from '../api/tickets.service';
import { Observable } from 'rxjs';
import { BulkSendDetail } from '../api/Message';

@Component({
  selector: 'app-bulk-send-detail-dialog',
  templateUrl: './bulk-send-detail-dialog.component.html',
  styleUrls: ['./bulk-send-detail-dialog.component.scss'],
})
export class BulkSendDetailDialogComponent implements OnInit{
  public bulkSendDetail = new Observable<BulkSendDetail>()
  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { id: number },
    private readonly api: TicketsService
  ) {}

  ngOnInit(): void {
    this.bulkSendDetail = this.api.getBulkSend(this.data.id)
  }
}
