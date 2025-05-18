import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketsService } from '../api/tickets.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulk-send-dialog',
  templateUrl: './bulk-send-dialog.component.html',
  styleUrls: ['./bulk-send-dialog.component.scss'],
})
export class BulkSendDialogComponent {
  message: string = ' ';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedTicketIds: number[] },
    private readonly api: TicketsService,
    private readonly snackBar: MatSnackBar
  ) {}

  onSendClick(): void {
    const senderId = 'operator1';
    this.api
      .createBulkSend(this.data.selectedTicketIds, {
        senderId,
        text: this.message,
      })
      .subscribe((message) => {
        this.snackBar.open(`Message sent with Job Id: ${message}`, 'Close', {
          duration: 3000,
        });
      });
  }
}
