import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv-file';
@Component({
  selector: 'app-newtickets',
  templateUrl: './newtickets.component.html',
  styleUrls: ['./newtickets.component.css'],
})
export class NewticketsComponent implements OnInit {
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  issuefrom: any;
  count: any;
  search: any;
  companyName: any;
  ticketList: any;
  comment: any;
  rejectcomments: any;
  applicationName: any;
  applicationNamelist: any;
  loader: any;
  startdate: any;
  enddate: any;
  roleid: any;
  constructor(private AmazeSupportService: AmazeSupportService) {}
  ngOnInit(): void {
    this.companyName = '0';
    this.applicationName = '0';
    this.issuefrom = '0';
    this.roleid = sessionStorage.getItem('roleid');
    debugger;
    if (this.roleid == 3) {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' || x.status == 'Reopen'
        );
        this.stafflistCopy = this.ticketList;
      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' || x.status == 'Reopen'
        );
        this.stafflistCopy = this.ticketList;
      });
    }

    this.getCompanylist();
    this.getAppnamelist();
  }
  companylist: any;
  public getCompanylist() {
    this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
      debugger;
      let temp: any = data.filter(
        (x) => x.status == 'Open' || x.status == 'Reopen'
      );

      const key = 'companyname';

      this.companylist = [
        ...new Map(
          temp.map((item: { [x: string]: any }) => [item[key], item])
        ).values(),
      ];

      console.log(this.companylist);
    });
  }
  public getAppnamelist() {
    this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
      debugger;
      let temp: any = data.filter((x) => x.status == 'Open');

      const key = 'applicationName';

      this.applicationNamelist = [
        ...new Map(
          temp.map((item: { [x: string]: any }) => [item[key], item])
        ).values(),
      ];

      console.log(this.applicationNamelist);
    });
  }

  Attachmentlist: any;

  ShowAttachments(id: any) {
    debugger;
    this.AmazeSupportService.GetSupportAttachment().subscribe((data) => {
      debugger;
      this.Attachmentlist = data;
    });
  }

  openAttchments(photo: any) {
    window.open(photo, '_blank');
  }

  view(desc: any) {
    this.comment = desc;
  }

  attachmentlist: any;
  image(id: any) {
    debugger;
    this.AmazeSupportService.GetSupportAttachment().subscribe((data) => {
      debugger;
      this.attachmentlist = data.filter((x) => x.ticketID == id);
    });
  }

  public accept(ID: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to accept it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          id: ID,
          Status: 'accepted',
        };

        this.AmazeSupportService.UpdateAcceptStatusSupportTickets(
          entity
        ).subscribe((data) => {
          debugger;

          Swal.fire('Accepted Successfully');
          location.reload();
        });
      }
    });
  }

  public assign(ID: any) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to assign it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, assign it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          id: ID,
          Status: 'Assigned to DigiOffice',
        };

        this.AmazeSupportService.UpdateAcceptStatusSupportTickets(
          entity
        ).subscribe((data) => {
          debugger;

          Swal.fire('Assigned Successfully');
          location.reload();
        });
      }
    });
  }

  attachment: any;
  getattchmentID(details: any) {
    this.attachment = details.attachment;
  }

  ID: any;
  public getreject(even: any) {
    this.ID = even;
  }

  public reject() {
    debugger;
    var entity = {
      id: this.ID,
      Status: 'rejected',
      RejectedComments: this.rejectcomments,
    };

    this.AmazeSupportService.UpdateRejectStatusSupportTickets(entity).subscribe(
      (data) => {
        debugger;

        Swal.fire('Rejected Successfully');
        location.reload();
      }
    );
  }

  public GetCompanyName(evn: any) {
    this.companyName = evn.target.value;

    if (this.applicationName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' || x.status == 'Reopen'
        );
      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' && x.applicationName == this.applicationName
        );
      });
    }
  }

  public GetFilteredCompanyName() {
    if (this.companyName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' || x.status == 'Reopen'
        );
      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' && x.companyname == this.companyName
        );
      });
    }
  }

  public GetapplicationName(evn: any) {
    this.applicationName = evn.target.value;
  }

  public GetFilteredapplicationName() {
    if (this.applicationName == 0) {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter((x) => x.status == 'Open');
      });
    } else {
      this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
        debugger;
        this.ticketList = data.filter(
          (x) => x.status == 'Open' && x.applicationName == this.applicationName
        );
      });
    }
  }

  public GetFilteredissuefrom(event: any) {
    this.issuefrom = event.target.value;

    debugger;
    this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
      debugger;
      this.ticketList = data.filter(
        (x) => x.issuefrom == this.issuefrom && x.status == 'Open'
      );
    });
  }

  public getenddate(event: any) {
    debugger;
    this.AmazeSupportService.GetSupportTickets().subscribe((data) => {
      debugger;
      this.ticketList = data.filter(
        (x) =>
          (x.status == 'Open' || x.status == 'Reopen') &&
          x.date >= this.startdate &&
          x.date <= this.enddate
      );
    });
  }

  //Code for Export to excel//

  undefined: any;
  sequenceNumber1: any;
  attendancelist: any;
  public exportexcel() {
    debugger;
    var ExportData = [];
    this.sequenceNumber1 = 0;
    this.undefined = 'NA';
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
        Comment: String,
      };

      singleData.IssueFrom = this.ticketList[i].issuefrom;
      singleData.Id = this.ticketList[i].id;
      singleData.CompanyName = this.ticketList[i].companyname;
      singleData.ApplicationName = this.ticketList[i].applicationName;
      singleData.EmployeeID = this.ticketList[i].staffID;
      singleData.Role = this.ticketList[i].role;
      singleData.Date = this.ticketList[i].date;
      singleData.Time = this.ticketList[i].time;
      singleData.TypeOfApplicationIssue =
        this.ticketList[i].typeOfApplicationIssues;
      singleData.Priority = this.ticketList[i].priority;
      singleData.Date = this.ticketList[i].date;
      singleData.Comment = this.ticketList[i].comment;

      ExportData.push(singleData);
      debugger;
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'New Tickets REPORT.xlsx',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'EMPLOYEE ATTEDANCE REPORT',
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    debugger;
    csvExporter.generateCsv(ExportData);
  }

  date: any;
  getdate(date: any) {
    this.date = date;
  }
}
