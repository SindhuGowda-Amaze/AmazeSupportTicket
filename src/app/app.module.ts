import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { NewticketsComponent } from './newtickets/newtickets.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AcceptedticketsComponent } from './acceptedtickets/acceptedtickets.component';
import { RejetcedTicketsComponent } from './rejetced-tickets/rejetced-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { AssignTicketsComponent } from './assign-tickets/assign-tickets.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    NewticketsComponent,
    FooterComponent,
    AcceptedticketsComponent,
    RejetcedTicketsComponent,
    ClosedTicketsComponent,
    ApiDetailsComponent,
    AssignTicketsComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
