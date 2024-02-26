import { Component, OnInit } from '@angular/core';
import { AmazeSupportService } from '../amaze-support.service';
import { ExportToCsv } from 'export-to-csv-file';


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
  issuefrom:any;
  applicationName:any;
  applicationNamelist:any;
  companyName:any;
loader:any;
roleid:any

  constructor(private AmazeSupportService:AmazeSupportService ) { }
  ngOnInit(): void {
    this.companyName = "0"
    this.applicationName="0"
    this.issuefrom="0"
    this.roleid = sessionStorage.getItem('roleid');
    // this.AmazeSupportService.GetSupportTickets().subscribe(data => {
    //   debugger
    //   this.ticketList = data.filter(x=>x.status=='closed');
    //   this.stafflistCopy = this.ticketList
    //   this.roleid = sessionStorage.getItem('roleid');
    
    // });
    if (this.roleid == 3) {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed' );
        this.stafflistCopy = this.ticketList

      });

    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed');
        this.stafflistCopy = this.ticketList

      });
    }
    this.getCompanylist();
    this.getAppnamelist();
  }

  companylist: any;
  public getCompanylist() {
    if(this.roleid==3){
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.status == 'closed' );
  
        const key = 'companyname';
  
        this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
  
        console.log(this.companylist);
  
      });
    }else{
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.status == 'closed');
  
        const key = 'companyname';
  
        this.companylist = [...new Map(temp.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
  
        console.log(this.companylist);
  
      });
    }
  
  }
  public getAppnamelist() {
    if(this.roleid==3){
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.status == 'closed' );
  
        const key = 'applicationName';
  
        this.applicationNamelist = [...new Map(temp.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
  
        console.log(this.applicationNamelist);
  
      });
    }
    else{
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.status == 'closed');
  
        const key = 'applicationName';
  
        this.applicationNamelist = [...new Map(temp.map((item: { [x: string]: any; }) =>
          [item[key], item])).values()];
  
        console.log(this.applicationNamelist);
  
      });
    }
    
  }


  view(desc:any){
    this.comment=desc;
    
  }
  date:any
  getdate(date:any){
    this.date=date;
    
  }
  
  Usercomment:any;
  viewUserComments(user:any){
    this.Usercomment=user;
    
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
    if(this.roleid==3){
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed'  &&  x.date>=this.startdate && x.date<=this.enddate);
      });
    }
    else{
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x => x.status == 'closed' && x.date>=this.startdate && x.date<=this.enddate);
      });
    }
      
  }

  public GetFilteredissuefrom(event: any) {
    this.issuefrom=event.target.value

    debugger
    if(this.roleid == 3){
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x =>x.issuefrom== this.issuefrom && x.status == 'closed' );
      });
    }
    else{
      this.AmazeSupportService.GetSupportTickets().subscribe(data => {
        debugger
        this.ticketList = data.filter(x =>x.issuefrom== this.issuefrom && x.status == 'closed');
      });
    }
      
  }

  attachment:any;
  getattchmentID(details:any){
    this.attachment=details.attachment
  }
    //Code for Export to excel//
    fileName = 'Closed Tickets REPORT.xlsx';
    // exportexcel(): void {
    //   this.loader = false;
    //   /* table id is passed over here */
    //   let element = document.getElementById('downloadapplication');
    //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  
    //   /* generate workbook and add the worksheet */
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    //   /* save to file */
    //   XLSX.writeFile(wb, this.fileName);
    //   this.loader = false;
    // }


    exportexcel() {
      debugger;
      var ExportData = [];
      for (let i = 0; i < this.ticketList.length; i++) {
        debugger;
        let singleData = {
          IssueFrom: String,
          TicketID: String,
          CompanyName: String,
          ApplicationName: String,
          EmployeeID: String,
          Date: Date,
          Time: Date,
          TypeOfApplicationIssue: String,
          Priority: String,
           Comments: String,
           CloseComments : String
         
          
        }
        singleData.IssueFrom = this.ticketList[i].issuefrom;
        singleData.TicketID = this.ticketList[i].id;
        singleData.CompanyName = this.ticketList[i].companyname;
        singleData.ApplicationName = this.ticketList[i].applicationName;
        singleData.EmployeeID = this.ticketList[i].staffID;
        singleData.Date = this.ticketList[i].date;
        singleData.Time = this.ticketList[i].time;
        singleData.TypeOfApplicationIssue = this.ticketList[i].typeOfApplicationIssues;
        singleData.Priority = this.ticketList[i].priority;
       singleData.Comments = this.ticketList[i].comment;
       singleData.CloseComments = this.ticketList[i].closeComments;
    
       
  
  
        ExportData.push(singleData);
        debugger
      }
      const Export_to_excel_options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Closed Tickets REPORT.xlsx',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        filename: 'Closed Tickets REPORT.xlsx'
      };
      const csvExporter = new ExportToCsv(Export_to_excel_options);
      debugger
      csvExporter.generateCsv(ExportData);
    }

}

