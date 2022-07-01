import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AmazeSupportTickets';

  
  temp:any;
  roleid:any;
  userName:any;
  time:any;
  hh:any;
  ampm:any;
  mm:any;
  page:any;

  ngOnInit(): void {
    this.temp=sessionStorage.getItem('temp');
    this.roleid=sessionStorage.getItem('roleid');
    this.userName=sessionStorage.getItem('loginName');

  }
}
