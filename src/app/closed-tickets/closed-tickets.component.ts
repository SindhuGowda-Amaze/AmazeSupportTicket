import { Component, OnInit } from '@angular/core';
import { AmazeSupportService } from '../amaze-support.service';
@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {

   
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  startdate:any;
  enddate:any;
  count: any;
  search:any;
  comment:any
  ticketList:any;

  applicationName:any;
  applicationNamelist:any;
  companyName:any;


  constructor(private AmazeSupportService:AmazeSupportService ) { }
  ngOnInit(): void {
    this.companyName = "0"
    this.applicationName="0"
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      this.ticketList = data.filter(x=>x.status=='closed');
      this.stafflistCopy = this.ticketList
    
    });
    this.getCompanylist();
    this.getAppnamelist();
  }

  companylist: any;
  public getCompanylist() {

    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'closed');

      const key = 'companyname';

      this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.companylist);

    });
  }
  public getAppnamelist() {
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'closed');

      const key = 'applicationName';

      this.applicationNamelist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.applicationNamelist);

    });
  }


  view(desc:any){
    this.comment=desc;
    
  }

  
  public GetCompanyName(evn: any) {
    this.companyName = evn.target.value
  }

  public GetFilteredCompanyName() {

    if (this.companyName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed' && x.companyname == this.companyName);


      });
    }
  }

  public GetapplicationName(evn: any) {
    this.applicationName = evn.target.value
  }

  public GetFilteredapplicationName() {

    if (this.applicationName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed' && x.applicationName == this.applicationName);


      });
    }

  } 

  attachmentlist:any;
  image(id:any){
    debugger
    this.AmazeSupportService.GetSupportAttachment().subscribe(
      data=>{
        debugger
       this.attachmentlist=data.filter(x=>x.ticketID==id);
      
      }
    )
    
  }

  public getenddate(event: any) {
    debugger
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed' && x.date>=this.startdate && x.date<=this.enddate);
      });
  }


}

