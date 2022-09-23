import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-exception-log-dash',
  templateUrl: './exception-log-dash.component.html',
  styleUrls: ['./exception-log-dash.component.css']
})
export class ExceptionLogDashComponent implements OnInit {

  term: any;
  p: any = 1;
  count1: any = 10;
  startdate: any;
  enddate: any;
  count: any;
  search: any;
  loader: any;
  roleid: any;
  ID: any;
  companylist: any;
  login: any;
  companyid: any;
  apiurl: any;
  staffID: any;
  username: any;
  currentUrl: any;
  exceptionloglist: any;
  firstDayofcurrentmonth: any;
  todaydate: any;
  filtereddate: any;

  constructor(private AmazeSupportService: AmazeSupportService) { }
  ngOnInit(): void {
    this.roleid = sessionStorage.getItem('roleid');
    this.login = localStorage.getItem('roledid');
    this.staffID = localStorage.getItem('staffid');
    this.username = localStorage.getItem('UserName');
    this.companyid = sessionStorage.getItem('companyid') == undefined ? 1001 : sessionStorage.getItem('companyid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.GetExceptionLog();
  }

  public getenddate(event: any) {
    debugger
    this.AmazeSupportService.GetExceptionLogs().subscribe(data => {
      debugger
      this.exceptionloglist = data.filter(x =>  x.date >= this.startdate && x.date <= this.enddate);
    });
  }

  //Code for Export to excel//
  fileName = 'Accepted Tickets REPORT.xlsx';
  exportexcel(): void {
    this.loader = false;
    /* table id is passed over here */
    let element = document.getElementById('downloadapplication');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  public getCompanyDetails(event: any) {
    debugger
    this.loader = true;
    this.companyid = event.target.value;
    if (this.companyid == null || this.companyid == undefined) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomMainAPI'
    }
    else if (this.companyid == 1001) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomMainAPI'
    }
    else if (this.companyid == 1002) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomABSIAPI'
    }
    else if (this.companyid == 1003) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomBRADAPI'
    }
    else if (this.companyid == 1004) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomHCXAPI'
    }
    else if (this.companyid == 1005) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomFINSIAPI'
    }
    else if (this.companyid == 1006) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomHQAPI'
    }


    
    this.AmazeSupportService.GetExceptionLogsbyurl(this.apiurl)
      .subscribe({
        next: data => {
          debugger
          this.exceptionloglist = data.filter(x=>x.modifiedDate==this.todaydate);
          this.loader = false;
          location.reload;
        }, error: (err) => {
          debugger
          //Swal.fire('Issue in Getting Log Activity By URL');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.AmazeSupportService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetExceptionLog() {
    debugger
    this.AmazeSupportService.GetExceptionLogs()
      .subscribe({
        next: data => {
          debugger
          this.exceptionloglist = data.filter(x=>x.modifiedDate==this.todaydate);
          this.loader = false;
        }, error: (err) => {
          Swal.fire('Issue in Getting Exception Logs');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.AmazeSupportService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }
  
}