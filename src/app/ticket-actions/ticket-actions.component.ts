import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from '../api/Message';

@Component({
  selector: 'app-ticket-actions',
  templateUrl: './ticket-actions.component.html',
  styleUrls: ['./ticket-actions.component.scss']
})
export class TicketActionsComponent {

  @Input() ticket!: Ticket;
  @Output() resolved = new EventEmitter();

  constructor(private readonly api: TicketsService, private readonly snackBar: MatSnackBar ){}

  resolveTicket() {
    this.api.resolveTicket(this.ticket.id).subscribe(()=> {
      this.snackBar.open("Ticket resolved", "Close", { duration: 3000 });
      this.resolved.emit();
    });
  }
}
