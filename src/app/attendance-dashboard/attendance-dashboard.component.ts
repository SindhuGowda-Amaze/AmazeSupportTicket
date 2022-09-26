import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
declare var JSZipUtils: any;

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent implements OnInit {

  constructor(public DigiofficeService: AmazeSupportService) { }
  roleid: any
  staffID: any;
  p: any = 1;
  count1: any = 10;
  count: any;
  attendancelistcopy: any;
  RoleType: any;
  Department: any;
  Departmentlist: any;
  RoleTypeList: any;
  loader: any;
  filtereddate: any;
  todaydate: any;
  firstDayofcurrentmonth: any;
  currentUrl: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownRoleList: any = [];
  roleselectedItems: any = [];
  roledropdownSettings: any = {};
  employeeid: any;
  attendancelistCopy: any;
  startdate: any;
  enddate: any;
  attendancelist: any;
  startingTime1: any;
  endTime1: any;
  selecallbtn: any;
  roleID: any;
  term: any;
  companyName: any;
  companyid: any;
  apiurl: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = localStorage.getItem('staffid');
    this.companyid = sessionStorage.getItem('companyid') == undefined ? 1001 : sessionStorage.getItem('companyid');
    this.companyName = sessionStorage.getItem('companyName');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.RoleType = "";
    this.Department = "";
    this.GetRoleType();
    this.GetAttendance();
    this.GetStaffByManagerIDForDropdown();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.dropdownRoleList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Role Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  roleonItemSelect(item: any) {
    debugger
    console.log(item);
    this.roleID = item.id;
    this.FilterRoleType();
  }

  public GetStaffByManagerIDForDropdown() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          if (this.roleid == 2) {
            this.dropdownList = data.filter(x => x.supervisor == this.staffID);
          }
          else {
            this.dropdownList = data;
          }

          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff By Manager ID');
          //  Insert error in Db Here
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public filterTeamAttendance() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.attendancelist = this.attendancelistCopy.filter((x: { userID: string, staffname: string }) => (x.userID.toLowerCase().includes(searchCopy))
      || (x.staffname.toLowerCase().includes(searchCopy)));
    this.count = this.attendancelist.length;
  }

  public getenddate(event: any) {
    debugger
    if (this.enddate == "") {
      this.ngOnInit();
    }
    else if (this.startdate == undefined || this.startdate == "") {
      Swal.fire('Please Select Start Date First');
    }
    else {
      if (this.roleid == 6) {
        this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data;
              this.count = this.attendancelist.length;
            }, error: (err) => {
              // Swal.fire('Issue in Getting Attendance By EmployeeID');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })
      }
      else if (this.roleid == 2) {
        this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data;
              this.count = this.attendancelist.length;
            }, error: (err) => {
              // Swal.fire('Issue in Getting Attendance By EmployeeID');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })
      }
      else {
        this.DigiofficeService.GetAttendance()
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data.filter(x => x.filterdate >= this.startdate && x.filterdate <= this.enddate);
              this.count = this.attendancelist.length;
              this.attendancelistcopy = this.attendancelist;
              this.loader = false;
            }, error: (err) => {
              // Swal.fire('Issue in Getting Attendance');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })
      }
    }

  }



  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.employeeid = item.id;
    this.DigiofficeService.GetAttendanceByEmployeeID(this.employeeid, this.startdate, this.enddate)
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data;
          this.count = this.attendancelist.length;
          console.log(" this.attendancelist", this.attendancelist)
        }, error: (err) => {
          Swal.fire('Please Select Start Date and End Date');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public FilterRoleType() {
    debugger
    if (this.roleID == "") {
      if (this.roleid == '2') {

        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data;
                this.count = this.attendancelist.length;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }
        else {
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data;
                this.count = this.attendancelist.length;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }
      }
      else {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceBydate(this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data
                this.count = this.attendancelist.length;
                this.attendancelistcopy = this.attendancelist;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }
        else {
          this.DigiofficeService.GetAttendanceBydate(this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data
                this.count = this.attendancelist.length;
                this.attendancelistcopy = this.attendancelist;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }

      }
    } else {
      if (this.roleid == '2') {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                this.count = this.attendancelist.length;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }
        else {
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                this.count = this.attendancelist.length;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }

      }
      else {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceBydate(this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                this.count = this.attendancelist.length;
                this.attendancelistcopy = this.attendancelist;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }
        else {
          this.DigiofficeService.GetAttendanceBydate(this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                this.count = this.attendancelist.length;
                this.attendancelistcopy = this.attendancelist;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
        }

      }
    }
  }

  public GetAttendance() {
    debugger
    this.loader = true;
    if (this.roleid == '2') {
      this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data;
            this.count = this.attendancelist.length;
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Attendance By Manager ID');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
    else {
      this.DigiofficeService.GetAttendanceBydate(this.firstDayofcurrentmonth, this.todaydate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data
            this.count = this.attendancelist.length;
            this.attendancelistcopy = this.attendancelist;
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Attendance');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

  sequenceNumber1: any;
  public exportexcel1() {
    debugger

    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.attendancelist.length; i++) {
      //debugger;
      this.sequenceNumber1 = i + 1;
      let singleData = {
        SequenceNumber: String,
        Date: String,
        EmployeeName: String,
        EmployeeNo: String,
        Position: String,
        CompanyName: String,
        ShiftTimings: String,
        ShiftDailyIN: String,
        ShiftDailyOut: String,
        ActualPunchIN: String,
        ActualPunchOut: String,
      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeName = this.attendancelist[i].staffname;
      singleData.Date = this.attendancelist[i].signinDate;
      singleData.EmployeeNo = this.attendancelist[i].userID;
      singleData.Position = this.attendancelist[i].role;
      singleData.ActualPunchIN = this.attendancelist[i].stime;
      singleData.ActualPunchOut = this.attendancelist[i].etime;
      singleData.ShiftDailyIN = this.attendancelist[i].shiftStartTime;
      singleData.ShiftDailyOut = this.attendancelist[i].shiftEndTime;
      singleData.CompanyName = this.companyName;
      singleData.ShiftTimings = this.attendancelist[i].shiftTimeings;
      ExportData.push(singleData);
      //debugger
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'GENERATE REPORT',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Employee_Attendance_Report'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    //debugger
    csvExporter.generateCsv(ExportData);



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


   
    this.DigiofficeService.GetAttendanceByURL(this.apiurl)
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data
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
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }


}