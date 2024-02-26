import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv-file';

@Component({
  selector: 'app-revalidationtickets',
  templateUrl: './revalidationtickets.component.html',
  styleUrls: ['./revalidationtickets.component.css']
})
export class RevalidationticketsComponent implements OnInit {

  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  startdate:any;
  enddate:any;
  count: any;
  search:any;
  issuefrom:any;
  ticketList:any;
  loader:any;
  applicationName:any;
  applicationNamelist:any;
  companyName:any;
  roleid:any;
  ID:any;
  CloseComments:any;
  comment:any;
  companylist: any;

  constructor(private AmazeSupportService:AmazeSupportService ) { }
  ngOnInit(): void {
    this.companyName = "0"
    this.applicationName="0"
    this.issuefrom="0"
    this.roleid = sessionStorage.getItem('roleid');
    // this.AmazeSupportService.GetSupportTickets().subscribe(data => {
    //   debugger
    //   this.ticketList = data.filter(x=>x.status=='accepted');
    //   this.stafflistCopy = this.ticketList
    // });
    
    if (this.roleid == 3) {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Reopen' );
        this.stafflistCopy = this.ticketList

      });

    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'Reopen');
        this.stafflistCopy = this.ticketList

      });
    }
    
    this.getCompanylist();
    this.getAppnamelist();
  }

 
  public getCompanylist() {

    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'Reopen');

      const key = 'companyname';

      this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
        [item[key], item])).values()];

      console.log(this.companylist);

    });
  }
  public getAppnamelist() {
    this.AmazeSupportService.GetSupportTickets().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.status == 'Reopen');

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
          'Status': 'completed',
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
            this.ticketList = data.filter(x => x.status == 'Reopen');
    
    
          });
        } else {
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x => x.status == 'Reopen' && x.companyname == this.companyName);
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
            this.ticketList = data.filter(x => x.status == 'Reopen');
    
    
          });
        } else {
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x => x.status == 'Reopen' && x.applicationName == this.applicationName);
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

      attachment:any;
      getattchmentID(details:any){
        this.attachment=details.attachment
      }
      public getenddate(event: any) {
        debugger
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x => x.status == 'Reopen' && x.date>=this.startdate && x.date<=this.enddate);
          });
      }
    
      public GetFilteredissuefrom(event: any) {
        this.issuefrom=event.target.value
    
        debugger
          this.AmazeSupportService.GetSupportTickets().subscribe(data => {
            debugger
            this.ticketList = data.filter(x =>x.issuefrom== this.issuefrom && x.status == 'Reopen');
          });
      }

       //Code for Export to excel//
       undefined: any;
       sequenceNumber1: any
       attendancelist: any
       public exportexcel() {
         debugger
         var ExportData = [];
         this.sequenceNumber1 = 0;
         this.undefined = 'NA'
         for (let i = 0; i < this.ticketList.length; i++) {
           debugger;
           this.sequenceNumber1 = i + 1;
           let singleData = {
             IssueFrom: String,
             Id: String,
             CompanyName: String,
             ApplicationName: String,
             EmployeeID: String,
             Role: String,
             Date: String,
             Time: String,
             TypeOfApplicationIssue: String,
             Priority: String,
           }
          
           singleData.IssueFrom = this.ticketList[i].issuefrom;
           singleData.Id = this.ticketList[i].id;
           singleData.CompanyName = this.ticketList[i].companyname;
           singleData.ApplicationName = this.ticketList[i].applicationName;
           singleData.EmployeeID = this.ticketList[i].staffID
           singleData.Role = this.ticketList[i].role;
           singleData.Date = this.ticketList[i].date;
           singleData.Time = this.ticketList[i].time;
           singleData.TypeOfApplicationIssue = this.ticketList[i].typeOfApplicationIssues
           singleData.Priority = this.ticketList[i].priority;
           singleData.Date = this.ticketList[i].date;
     
     
           ExportData.push(singleData);
           debugger
         }
         const Export_to_excel_options = {
           fieldSeparator: ',',
           quoteStrings: '"',
           decimalSeparator: '.',
           showLabels: true,
           showTitle: true,
           title: 'Accept REPORT.xlsx',
           useTextFile: false,
           useBom: true,
           useKeysAsHeaders: true,
           filename: 'EMPLOYEE ATTEDANCE REPORT'
         };
         const csvExporter = new ExportToCsv(Export_to_excel_options);
         debugger
         csvExporter.generateCsv(ExportData);
     
       }
}
