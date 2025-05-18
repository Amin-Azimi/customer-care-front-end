import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketsService } from './api/tickets.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { TicketNotFoundComponent } from './ticket-not-found/ticket-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BulkSendDialogComponent } from './bulk-send-dialog/bulk-send-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BulkSendHistoryComponent } from './bulk-send-history/bulk-send-history.component';
import { MatTableModule } from '@angular/material/table';
import { BulkSendDetailDialogComponent } from './bulk-send-detail-dialog/bulk-send-detail-dialog.component';
import { TicketActionsComponent } from './ticket-actions/ticket-actions.component';
import { TicketMessagesComponent } from './ticket-messages/ticket-messages.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TicketsListComponent,
    TicketComponent,
    TicketNotFoundComponent,
    BulkSendDialogComponent,
    BulkSendHistoryComponent,
    BulkSendDetailDialogComponent,
    TicketActionsComponent,
    TicketMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    TicketsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
