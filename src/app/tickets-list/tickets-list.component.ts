import { Component, Input, OnInit } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Ticket } from '../api/Message';
import { concat, map, Observable, race, switchMap } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BulkSendDialogComponent } from '../bulk-send-dialog/bulk-send-dialog.component';

type ItemList = Ticket & {}

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  tickets = new Observable<ItemList[]>();
  filterStatus = this.fb.control<"all" | "resolved" | "unresolved">("all");
  selectedTicketIds = new Set<number>();

  constructor(
    private api: TicketsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tickets = concat(
      this.api.getTickets(),
      this.filterStatus.valueChanges.pipe(
        map(value => {
          if (!value || value === "all") return undefined;
          return value;
        }),
        switchMap(status => this.api.getTickets(status))
      )
    );
  }

  openBulkSendDialog():void{
    const dialogRef = this.dialog.open(BulkSendDialogComponent,{
      width: '600px',
      data: { selectedTicketIds: Array.from(this.selectedTicketIds)}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.selectedTicketIds.clear();
      }
    })
  }

  onCheckBoxChange(ticketId: number, checked: boolean):void{
    if(checked){
      this.selectedTicketIds.add(ticketId);
    }
    else{
      this.selectedTicketIds.delete(ticketId);
    }
  }

  obSelectAllCheckBoxChange(checked: boolean):void{
    this.selectedTicketIds.clear();
    if(checked){
      this.tickets.forEach((item) => item.forEach( (t) => this.selectedTicketIds.add(t.id)));
    }
  }
}
