import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptedticketsComponent } from './acceptedtickets/acceptedtickets.component';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NewticketsComponent } from './newtickets/newtickets.component';
import { RejetcedTicketsComponent } from './rejetced-tickets/rejetced-tickets.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AssignTicketsComponent } from './assign-tickets/assign-tickets.component';
import { CompletedticketsComponent } from './completedtickets/completedtickets.component';
import { RevalidationticketsComponent } from './revalidationtickets/revalidationtickets.component';

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
  {path:'ApiDetails',component:ApiDetailsComponent},
  {path:'AssignTickets',component:AssignTicketsComponent},
  {path:'completedtickets',component:CompletedticketsComponent},
  {path:'revalidationtickets',component:RevalidationticketsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
