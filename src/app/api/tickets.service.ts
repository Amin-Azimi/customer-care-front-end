import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { BulkSend, BulkSendDetail, Message, ResponseBody } from './Message';

type ApiTicket = {
  id: number;
  subject: string;
  status: 'unresolved' | 'resolved';
  createdAt: string;
};

type ApiMessage = {
  id: number;
  senderType: 'operator' | 'customer';
  senderId: string;
  text: string;
  createdAt: string;
};

type ApiBulkSend = {
  id: number;
};

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private baseUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  getTickets(status?: 'resolved' | 'unresolved') {
    type Body = {
      data: ApiTicket[];
    };
    return this.http
      .get<Body>(`${this.baseUrl}/tickets`, {
        params: status ? { status } : {},
      })
      .pipe(
        map((r) => r.data),
        map((x) =>
          x.map(({ createdAt, ...other }) => ({
            ...other,
            createdAt: new Date(createdAt),
          }))
        )
      );
  }

  getTicket(ticketId: number) {
    return this.http.get<ApiTicket>(`${this.baseUrl}/tickets/${ticketId}`).pipe(
      map(({ createdAt, ...other }) => ({
        ...other,
        createdAt: new Date(createdAt),
      }))
    );
  }

  getTicketMessages(ticketId: number) {
    type Body = {
      data: ApiMessage[];
    };
    return this.http
      .get<Body>(`${this.baseUrl}/tickets/${ticketId}/messages`)
      .pipe(
        map((r) => r.data),
        map((x) =>
          x.map(({ createdAt, ...other }) => ({
            ...other,
            createdAt: new Date(createdAt),
          }))
        )
      );
  }

  resolveTicket(ticketId: number) {
    return this.http.put(`${this.baseUrl}/tickets/${ticketId}/resolve`, {});
  }

  addMessageToTicket(
    ticketId: number,
    message: Pick<Message, 'text' | 'senderType' | 'senderId'>
  ) {
    return this.http
      .post<ApiMessage>(`${this.baseUrl}/tickets/${ticketId}/messages`, message)
      .pipe(
        map(({ createdAt, ...other }) => ({
          ...other,
          createdAt: new Date(createdAt),
        }))
      );
  }

  createBulkSend(
    ticketIds: number[],
    message: Pick<Message, 'text' | 'senderId'>
  ) {
    return this.http
      .post<ApiBulkSend>(`${this.baseUrl}/bulk-send`, {
        ticketIds,
        message: message.text,
        senderId: message.senderId,
      })
      .pipe(map(({ id }) => id));
  }

  listBulkSends() {
    return this.http
      .get<ResponseBody<BulkSend>>(`${this.baseUrl}/bulk-sends`)
      .pipe(
        map(res => 
          res.data.map((item)=>({
            ...item,
            updateAt: new Date(item.updateAt)
          }))
        )
      );
  }

  getBulkSend(id:number){
    return this.http.
    get<BulkSendDetail>(`${this.baseUrl}/bulk-sends/${id}`)
    .pipe(
      map(bulkSend => ({
        ...bulkSend,
        updateAt: new Date(bulkSend.updateAt)
      }))
    );
  }
}
