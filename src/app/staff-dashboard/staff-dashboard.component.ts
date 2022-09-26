import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AmazeSupportService } from '../amaze-support.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
// const fs = require('fs');
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
declare var JSZipUtils: any;

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css']
})
export class StaffDashboardComponent implements OnInit {

  constructor(public DigiofficeService: AmazeSupportService, public router: Router) { }
  viewMode = 'tab1';
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  employeeid: any;
  ename: any;
  dob: any;
  TINNo: any;
  Gender: any;
  EmailID: any;
  mobile: any;
  Address: any;
  AddressLine1: any;
  department_name: any;
  Role: any;
  doh: any;
  BaseSal: any;
  dependentdetails: any;
  stafflistCopy: any;
  count: any;
  Departmentlist: any;
  level: any;
  Department: any;
  RoleType: any;
  RoleTypeList: any;
  loader: any;
  currentUrl: any;
  date: any;
  roleID: any;
  deptID: any;
  DeptList: any;
  levellist: any;
  Citylist: any;
  loanlist: any;
  dropdownRoleList: any = [];
  roleselectedItems: any = [];
  roledropdownSettings: any = {};
  dropdownDeptList: any = [];
  deptselectedItems: any = [];
  deptdropdownSettings: any = {};
  login:any;
  fileName = 'Employee Report.xlsx';
  leavelist: any;
  leavelist23: any;
  companyid: any;
  apiurl: any;

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.companyid = sessionStorage.getItem('companyid') == undefined ? 1001 : sessionStorage.getItem('companyid');
    this.login = sessionStorage.getItem('roledid');
    this.loader = true;
    this.showbtn = false;
    this.AssignedCompany = 0;
    this.Department = 0;
    this.level = 0;
    this.RoleType = 0;
    this.GetStaff();
    this.GetDepartment();
    this.GetRoleType();
    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.deptdropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'department_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
    this.DigiofficeService.GetStateType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data;
          this.loader = false;
        }, error: (err) => {
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
    this.DigiofficeService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist23 = data;
          this.loader = false;
        }, error: (err) => {
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

  public GetDepartment() {
    this.DigiofficeService.GetDepartment().
      subscribe({
        next: data => {
          debugger
          this.dropdownDeptList = data;
        }, error: (err) => {
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

  public GetRoleType() {
    this.DigiofficeService.GetRoleType().
      subscribe({
        next: data => {
          debugger
          this.dropdownRoleList = data;
        }, error: (err) => {
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
    this.getRoleType();
  }

  deptonItemSelect(item: any) {
    debugger
    console.log(item);
    this.Department = item.id;
    this.getDepartment();
  }
  payrollBit: any;
  stafflist1: any;
  stafflistCopy1: any;
  public GetStaff() {
    this.DigiofficeService.GetAllStaffNew().
      subscribe({
        next: data => {
          debugger
          this.stafflist = data;
          // this.stafflist = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
          this.stafflistCopy = this.stafflist;
          this.stafflist1 = data.filter(x => x.payrollBit == 1);
          this.stafflistCopy1 = this.stafflist1;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting All Staff');
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

  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigiofficeService.GetMyDetails().
      subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.filterdate == this.date);
        }, error: (err) => {
          // Swal.fire('Issue in Filtering Data');
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

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    // this.stafflist = this.stafflistCopy.filter((x: { employeID: string; role: string }) =>
    //   x.employeID.toLowerCase().includes(searchCopy));
    // this.count = this.stafflist.length;
    if (searchCopy.length == 0) {
      this.GetStaff();
    } else {
      this.DigiofficeService.GetAllStaffNewforsearch(searchCopy).
        subscribe({
          next: data => {
            debugger
            // this.stafflist = data;
            this.stafflist = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
            this.stafflistCopy = this.stafflist;
            this.stafflist1 = data.filter(x => x.payrollBit == 1);
            this.stafflistCopy1 = this.stafflist1;
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting All Staff');
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

  public attachments01: any = [];
  public urls: any = [];

  public downloadzip(application: any) {
    debugger
    this.urls = [];
    this.DigiofficeService.GetEmployeeDocuments().
      subscribe({
        next: data => {
          debugger
          let filearray: any = data.filter(x => x.staffId == 10429);
          //this.urls.push(filearray[0].lease_control_sheet);
          if (filearray[0].employee_Application_form != null) {
            this.urls.push(filearray[0].employee_Application_form);
          }
          if (filearray[0].offer_letter != null) {
            this.urls.push(filearray[0].offer_letter)
          }
          if (filearray[0].resume != null) {
            this.urls.push(filearray[0].resume)
          }
          if (filearray[0].certificates_From_Previous_Employer != null) {
            this.urls.push(filearray[0].certificates_From_Previous_Employer)
          }
          if (filearray[0].medical_Examination_Report != null) {
            this.urls.push(filearray[0].medical_Examination_Report)
          }
          if (filearray[0].birth_Certificates != null) {
            this.urls.push(filearray[0].birth_Certificates)
          }
          if (filearray[0].marriage_Certificates != null) {
            this.urls.push(filearray[0].marriage_Certificates)
          }
          if (filearray[0].sss_e1Form != null) {
            this.urls.push(filearray[0].sss_e1Form)
          }
          if (filearray[0].sss_loanvoucher != null) {
            this.urls.push(filearray[0].sss_loanvoucher)
          }
          if (filearray[0].hdmf_form != null) {
            this.urls.push(filearray[0].hdmf_form)
          }
          if (filearray[0].hdmf_loanvoucher != null) {
            this.urls.push(filearray[0].hdmf_loanvoucher)
          }
          if (filearray[0].phic_reg != null) {
            this.urls.push(filearray[0].phic_reg)
          }
          if (filearray[0].bir_form_1902 != null) {
            this.urls.push(filearray[0].bir_form_1902)
          }
          if (filearray[0].bir_form_2305 != null) {
            this.urls.push(filearray[0].bir_form_2305)
          }
          if (filearray[0].bir_form_2316 != null) {
            this.urls.push(filearray[0].bir_form_2316)
          }
          if (filearray[0].bir_form_1905 != null) {
            this.urls.push(filearray[0].bir_form_1905)
          }
          if (filearray[0].dependts_birth_certificates != null) {
            this.urls.push(filearray[0].dependts_birth_certificates)
          }
          if (filearray[0].attendance_sheet_dtr != null) {
            this.urls.push(filearray[0].attendance_sheet_dtr)
          }
          if (filearray[0].promotion_doc != null) {
            this.urls.push(filearray[0].promotion_doc)
          }
          if (filearray[0].incident_report != null) {
            this.urls.push(filearray[0].incident_report)
          }
          if (filearray[0].clearnce_form != null) {
            this.urls.push(filearray[0].clearnce_form)
          }
          if (filearray[0].resignation_form != null) {
            this.urls.push(filearray[0].resignation_form)
          }
          if (filearray[0].employee_201report != null) {
            this.urls.push(filearray[0].employee_201report)
          }
          this.createzip();
        }, error: (err) => {
          // Swal.fire('Issue in Getting Depandent Details');
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

  clikedid: any;
  public showbttn(item: any) {
    if (this.showbtn == true) {
      this.showbtn = false;
    } else {
      this.showbtn = true;
    }

    this.clikedid = item.id;
  }

  public Edit() {
    this.router.navigate(['/HR/AddressDetailsWizard', this.clikedid]);
  }

  public Upload() {
    this.router.navigate(['/Uploademployeedocumets', this.clikedid]);
  }

  showbtn: any;
  public createzip() {
    debugger

    let count = 0;
    const zip = new JSZip();

    this.urls.forEach((url: any) => {
      const filename = url.split('/')[url.split('/').length - 1].split('/')[0].split('/')[0].slice(41);
      //url.split('/')[url.split('/').length - 1]
      //url.split('/')[url.split('/').length-1].split('/')[0].split('/')[0];
      //url.split('/')[url.split('/').length-1].split('/')[0].split('/')[0].slice(41)
      JSZipUtils.getBinaryContent(url, (err: any, data: string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream | Promise<string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream>) => {
        if (err) {
          throw err;
        }

        zip.file(filename, data, { binary: true });
        count++;

        if (count === this.urls.length) {
          zip.generateAsync({ type: 'blob' }).then((content) => {
            const objectUrl: string = URL.createObjectURL(content);
            const link: any = document.createElement('a');

            link.download = 'Employee201Report.zip';
            link.href = objectUrl;
            link.click();

          });
        }
      });
    })
  }

  fromlogin: any;
  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;

  incomingfile(event: any) {
    debugger;
    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    debugger;
    if (characters == ".xlsx" || characters == ".XLSX") {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        debugger
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.exceldata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);
    } else {
      Swal.fire("Imported file format not supported.");
    }
  }

  i: any
  StaffID: any;
  roletypeid: any;
  RoleTypeList2: any;
  dept2list: any;
  deptid: any;
  Attachment: any;
  WorkTimings: any;
roleid:any;
ID:any;
  public Upload_file() {
    debugger
    if (this.exceldata == undefined) {
      Swal.fire('Choose a File');
    } else {
      let apiarray = [];

       for (let i = 0; i < this.exceldata.length; i++) {
       this.staflis= this.stafflist.filter((x: {  employeID : any; })=>x.employeID==this.exceldata[i].Manage

               )
               if(this.staflis.length!=0){
                this.ID = this.staflis[0].id
               }
               else{
                this.ID = 'NA'
              }
              var eb1 = {
          'ID': this.exceldata[i].LeavewithPay,
          'Short': this.exceldata[i].EMPLID,
          'Description': this.exceldata[i].TIN,
        }
       this.DigiofficeService.UpdateRoleType(eb1)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Updated Successfully')
              this.ngOnInit();
            }, error: (err) => {
              // Swal.fire('Issue in Updating Department');
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

  staflis: any;
  ExtensionEndDate: any;
  ProbationEndDate: any;
  ProbationStartDate: any;
  StaffID1: any;
  stafflist2: any;
  CityID: any;
  Citylist1: any;
  StateID: any;
  public attachmentsurl: any = [];

  public SaveAddressDetails(staffid: any) {
    debugger

    let i = 0;

    i = i + 1;


  }

  AssignedCompany: any;
  public getAssignedCompany() {
    if (this.AssignedCompany == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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

    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.assignedCompany == this.AssignedCompany);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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
  public getDepartment() {
    debugger
    if (this.Department == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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
    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.stafflist = data.filter(x => x.department == this.Department);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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

  geLevel() {

    if (this.level == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Filtering Hoilday');
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

    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.levelid == this.level);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Hoilday');
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

  getRoleType() {

    if (this.roleID == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Filtering Role Type');
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

    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.type == this.roleID);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Filtering Data');
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

  public Disable_PayrollBit(id: any) {
    var eb = {
      'ID': id,
      'PayrollBit': 0
    }
    this.DigiofficeService.Enable_Disable_PayrollBit(eb)
      .subscribe({
        next: data => {
          debugger
          {
            debugger
            Swal.fire('Disabled Successfully.');
            location.reload();
          }
        }, error: (err) => {
          // Swal.fire('Issue in Disable Loans');
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


  public Enable_PayrollBit(id: any) {
    var eb = {
      'ID': id,
      'PayrollBit': 1
    }
    this.DigiofficeService.Enable_Disable_PayrollBit(eb).subscribe(

      data => {
        debugger
        Swal.fire('Enabled Successfully.');
        location.reload();
      },
    )

  }


  failedarray: any = [];
  passedarray: any = [];
  sequenceNumber1: any;
  public exportexcel1() {
    debugger

    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.stafflist.length; i++) {
      //debugger;
      this.sequenceNumber1 = i + 1;
      let singleData = {
        SequenceNumber: String,
        EmployeeID: String,
        EndDate: String,
        BeginDate: String,
        Amount: String,
        Batch: String,
        EmployeeName: String,
        Flag: String,
        Remarks: String,
      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeID = this.stafflist[i].employeID;
      singleData.EmployeeName = this.stafflist[i].name;
      singleData.Amount = this.stafflist[i].abc;
      singleData.BeginDate = this.stafflist[i].enddate;
      singleData.EndDate = this.stafflist[i].enddate;
      singleData.Flag = this.stafflist[i].flag;
      singleData.Remarks = this.stafflist[i].semiadjustment;
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
      filename: 'Employee_report'
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


   
    this.DigiofficeService.GetAllStaffNewByURL(this.apiurl)
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data;
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