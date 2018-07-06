import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGaurd } from './guards/authguard';
import { SchoolService } from './services/schoolService';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service'; 
import { CommonService } from './services/common.service';
import { PaymentService } from './services/payment.service';
import { PaymentsComponent } from './payments/payments.component';
import {TableModule} from 'primeng/table';
import {EditorModule} from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/tabview';
import { PaymentHistoryService } from './services/paymenthistory.service';
import { PaymentHistoryComponent } from './paymenthistory/paymenthistory.component';
import { LedgerService } from './services/ledger.service';
import { LedgerComponent } from './ledger/ledger.component';
import { EditAddLedger } from './ledger/create-edit-ledgermodel/edit-add-ledger';
import { LedgerHistoryPopUpComponent } from './ledger/ledgerhistory/ledgerhistory.popup';
import { StudentPaymentHistoryComponent } from './paymenthistory/student-payment-history.component';
import { RaisePaymentComponent } from './payments/raise-payment/raise-payment.component'

// PrimeNG modules imports
import { SidebarModule } from 'primeng/sidebar';
import { GrowlModule } from 'primeng/growl';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';

// PrimeNG services imports
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { FeesComponent } from './fees/fees.component';
import { MonthnamePipe } from './monthname.pipe';
import { InvoiceComponent } from './print/invoice/invoice.component';
import { FeeService } from './services/fee.service';
import { InvoiceService } from './services/invoice.service';



@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    UserComponent,
    PaymentsComponent,
    PaymentHistoryComponent,
    LedgerComponent,
    EditAddLedger,
    RaisePaymentComponent,
    StudentPaymentHistoryComponent,
    LedgerHistoryPopUpComponent,
    FeesComponent,
    MonthnamePipe,
    InvoiceComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),

    // PrimeNG Modules
    EditorModule,
    TableModule,
    SidebarModule,
    GrowlModule,
    FieldsetModule,
    InputSwitchModule,
    DataTableModule,
    PaginatorModule,
    TabViewModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    MenuModule,
    CalendarModule,
    AutoCompleteModule,
    MultiSelectModule
  ],
  providers: [
    AuthGaurd,
    SchoolService,
    AuthService,
    UserService,
    PaymentService,
    PaymentHistoryService,
    LedgerService,
    FeeService,
    InvoiceService,
    // PrimeNG services
    ConfirmationService,
    MessageService,
    CommonService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
