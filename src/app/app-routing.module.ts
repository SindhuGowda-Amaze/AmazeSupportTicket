import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedticketsComponent } from './acceptedtickets/acceptedtickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { ExceptionLogDashComponent } from './exception-log-dash/exception-log-dash.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogActivityDashComponent } from './log-activity-dash/log-activity-dash.component';
import { LoginComponent } from './login/login.component';
import { NewticketsComponent } from './newtickets/newtickets.component';
import { RejetcedTicketsComponent } from './rejetced-tickets/rejetced-tickets.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Header', component: HeaderComponent },
  { path: 'Footer', component: FooterComponent },
  { path: 'Sidebar', component: SidebarComponent },
  { path: 'Newtickets', component: NewticketsComponent },
  { path: 'Acceptedtickets', component: AcceptedticketsComponent },
  { path: 'RejetcedTickets', component: RejetcedTicketsComponent },
  { path: 'ClosedTickets', component: ClosedTicketsComponent },
  { path: 'LogActivityDash', component: LogActivityDashComponent },
  { path: 'ExceptionLogDash', component: ExceptionLogDashComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
