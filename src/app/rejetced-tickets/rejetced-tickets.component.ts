import { Component, OnInit } from '@angular/core';
import { AmazeSupportService } from '../amaze-support.service';
@Component({
  selector: 'app-rejetced-tickets',
  templateUrl: './rejetced-tickets.component.html',
  styleUrls: ['./rejetced-tickets.component.css']
})
export class RejetcedTicketsComponent implements OnInit {

  
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  applicationName:any;
  applicationNamelist:any;
  count: any;
  search:any;

  ticketList:any;
  companyName:any;
  comment:any;
  startdate:any;
  enddate:any;
  constructor(private AmazeSupportService:AmazeSupportService ) { }
  ngOnInit(): void {
    this.companyName = "0"
    this.applicationName="0"
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      this.ticketList = data.filter(x=>x.status=='rejected');
      this.stafflistCopy = this.ticketList
    
    });

    this.getCompanylist();
    this.getAppnamelist();
  }
  companylist: any;
  public getCompanylist() {

    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'rejected');

      const key = 'companyname';

      this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.companylist);

    });
  }
  public getAppnamelist() {
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'rejected');

      const key = 'applicationName';

      this.applicationNamelist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.applicationNamelist);

    });
  }

  Attachmentlist: any;

  ShowAttachments(id: any) {
    debugger
    this.AmazeSupportService.GetSupportAttachment().subscribe(data => {
      debugger
      this.Attachmentlist = data;
    })
  }

  openAttchments(photo: any) {
    window.open(photo, "_blank")
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
        this.ticketList = data.filter(x => x.status == 'rejected');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'rejected' && x.companyname == this.companyName);


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
        this.ticketList = data.filter(x => x.status == 'rejected');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'rejected' && x.applicationName == this.applicationName);


      });
    }

  } 

  photo:any;
  Showimage(screenShot:any){
    this.photo=screenShot;
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
        this.ticketList = data.filter(x => x.status == 'rejected' && x.date>=this.startdate && x.date<=this.enddate);
      });
  }

}
