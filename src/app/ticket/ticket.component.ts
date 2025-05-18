import { Component, Input } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Message, Ticket } from '../api/Message';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent  {
  _ticketId = 0;
  ticket$ = new Observable<Ticket>();

  @Input()
  set ticketId(ticketId: number){
        this._ticketId = ticketId;
      this.loadTicket();
  }

  get ticketId(){
    return this._ticketId;
  }

  constructor(
    private readonly api: TicketsService) { }


  trackByItems(index: number, item: Message): number {
    return item.id;
  }

  loadTicket(){
    this.ticket$ = this.api.getTicket(this._ticketId);
  }
}
