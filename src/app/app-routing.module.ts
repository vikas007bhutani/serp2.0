import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGaurd } from './guards/authguard';
import { UserComponent } from './user/user.component';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentHistoryComponent } from './paymenthistory/paymenthistory.component';
import { LedgerComponent } from './ledger/ledger.component';
import { FeesComponent } from './fees/fees.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'landing', canActivate: [AuthGaurd], component: LandingComponent, children: [
      { path: '', component: DashboardComponent, outlet: 'outlet' },
      { path: 'dashboard', component: DashboardComponent, outlet: 'outlet' },
      { path: 'user', component: UserComponent, outlet: 'outlet' },
      { path: 'payments', component: PaymentsComponent, outlet: 'outlet' },
      { path: 'paymenthistory', component: PaymentHistoryComponent, outlet: 'outlet' },
      { path: 'ledger', component: LedgerComponent, outlet: 'outlet' },
      { path: 'feeallocation', component: FeesComponent, outlet: 'outlet' }
    ]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
