import { Component, Input, OnInit } from '@angular/core';
import { TicketsService } from '../api/tickets.service';
import { Observable } from 'rxjs';
import { Message } from '../api/Message';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-messages',
  templateUrl: './ticket-messages.component.html',
  styleUrls: ['./ticket-messages.component.scss'],
})
export class TicketMessagesComponent implements OnInit {
  @Input() ticketId!: number;
  @Input() disabled: boolean = false;
  messages$ = new Observable<Message[]>();
  messageForm = this.fb.group({
    text: this.fb.control('', [Validators.required]),
  });

  constructor(
    private readonly api: TicketsService,
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.ticketId) {
      this.loadMessages();
    }
  }

  loadMessages() {
    this.messages$ = this.api.getTicketMessages(this.ticketId);
  }

  trackByItems = (index: number, item: Message) => item.id;

  sendMessage() {
    if (this.messageForm.valid) {
      const { text } = this.messageForm.value;
      const senderType = 'operator',
        senderId = 'operator1';
      this.api
        .addMessageToTicket(this.ticketId, {
          text: text!,
          senderType,
          senderId,
        })
        .subscribe(() => {
          this.snackBar.open('Message sent', 'Close', { duration: 3000 });
          this.messageForm.reset();
          this.loadMessages();
        });
    }
  }
}
