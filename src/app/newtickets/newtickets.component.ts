import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';

@Component({
  selector: 'app-newtickets',
  templateUrl: './newtickets.component.html',
  styleUrls: ['./newtickets.component.css']
})
export class NewticketsComponent implements OnInit {

  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;

  count: any;
  search: any;
  companyName: any;
  ticketList: any;
  comment: any;
  rejectcomments: any;
  applicationName:any;
  applicationNamelist:any;

  startdate:any;
  enddate:any;
  
  constructor(private AmazeSupportService: AmazeSupportService) { }
  ngOnInit(): void {
    this.companyName = "0"
    this.applicationName="0"
    debugger
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      this.ticketList = data.filter(x => x.status == 'Open');
      this.stafflistCopy = this.ticketList

    });

    this.getCompanylist();
    this.getAppnamelist();
  }
  companylist: any;
  public getCompanylist() {

    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'Open');

      const key = 'companyname';

      this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.companylist);

    });
  }
  public getAppnamelist() {
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'Open');

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


  public accept(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to accept it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          'id': ID,
          'Status': 'accepted'
        }

        this.AmazeSupportService.UpdateAcceptStatusSupportTickets(entity).subscribe(data => {
          debugger

          Swal.fire('Accepted Successfully')
          location.reload();
        })
      }
    })
  }

  ID: any;
  public getreject(even: any) {
    this.ID = even
  }

  public reject() {
    debugger
    var entity = {
      'id': this.ID,
      'Status': 'rejected',
      'RejectedComments': this.rejectcomments
    }

    this.AmazeSupportService.UpdateRejectStatusSupportTickets(entity).subscribe(data => {
      debugger

      Swal.fire('Rejected Successfully')
      location.reload();
    })
  }


  public GetCompanyName(evn: any) {
    this.companyName = evn.target.value

    if (this.applicationName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Open');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Open' && x.applicationName == this.applicationName);


      });
    }
  }

  public GetFilteredCompanyName() {

    if (this.companyName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Open');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Open' && x.companyname == this.companyName);


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
        this.ticketList = data.filter(x => x.status == 'Open');


      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Open' && x.applicationName == this.applicationName);


      });
    }

  } 


  public getenddate(event: any) {
    debugger
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Open' && x.date>=this.startdate && x.date<=this.enddate);
      });
  }
}


