import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';
@Component({
  selector: 'app-acceptedtickets',
  templateUrl: './acceptedtickets.component.html',
  styleUrls: ['./acceptedtickets.component.css']
})
export class AcceptedticketsComponent implements OnInit {

  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  startdate:any;
  enddate:any;
  count: any;
  search:any;

  ticketList:any;

  applicationName:any;
  applicationNamelist:any;
  companyName:any;

  ID:any;
  CloseComments:any;
  comment:any;


  constructor(private AmazeSupportService:AmazeSupportService ) { }
  ngOnInit(): void {
    this.companyName = "0"
    this.applicationName="0"
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      this.ticketList = data.filter(x=>x.status=='accepted');
      this.stafflistCopy = this.ticketList
    
    });

    this.getCompanylist();
    this.getAppnamelist();
  }

  companylist: any;
  public getCompanylist() {

    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'accepted');

      const key = 'companyname';

      this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.companylist);

    });
  }
  public getAppnamelist() {
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'accepted');

      const key = 'applicationName';

      this.applicationNamelist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.applicationNamelist);

    });
  }
  


  public getaccept(even: any) {
    this.ID = even
  }

  public close() {
    debugger
        var entity = {
          'id': this.ID,
          'Status': 'closed',
          'CloseComments':this.CloseComments
        }
       
        this.AmazeSupportService.UpdateCloseStatusSupportTickets(entity).subscribe(data => {
          debugger
          
          Swal.fire('Closed Successfully')
          location.reload();
        })
      }

      public GetCompanyName(evn: any) {
        this.companyName = evn.target.value
      }
    
      public GetFilteredCompanyName() {
    
        if (this.companyName == 0) {
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x => x.status == 'accepted');
    
    
          });
        } else {
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x => x.status == 'accepted' && x.companyname == this.companyName);
    
    
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
            this.ticketList = data.filter(x => x.status == 'accepted');
    
    
          });
        } else {
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x => x.status == 'accepted' && x.applicationName == this.applicationName);
    
    
          });
        }
    
      } 
      view(desc: any) {
        this.comment = desc;
    
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
            this.ticketList = data.filter(x => x.status == 'accepted' && x.date>=this.startdate && x.date<=this.enddate);
          });
      }
    
    
}
