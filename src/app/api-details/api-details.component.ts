import { Component, OnInit } from '@angular/core';
import { AmazeSupportService } from '../amaze-support.service';
@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css']
})
export class ApiDetailsComponent implements OnInit {

  constructor(private AmazeSupportService: AmazeSupportService) { }

  ngOnInit(): void {
    this.companyid=1;
    this.getCount();
  }
  active: any;
  inactive: any;
  warehouse: any;
  inactivedelete: any;
  public getCount() {
    debugger

    this.AmazeSupportService.GetAPI_fetch_Details_All().
      subscribe({
        next: data => {
          //debugger
          let countdetails: any = data;
          this.active = countdetails[0].active;
          this.inactive = countdetails[0].inactive;
          this.warehouse = countdetails[0].warehouse;
          this.inactivedelete = countdetails[0].inactivedelete;
        }, error: (err) => {

        }
      })
  }

  public getCountforMain() {
    debugger

    this.AmazeSupportService.GetActive_Employee_Fetech_Details().
      subscribe({
        next: data => {
          //debugger
          let countdetails: any = data;
          this.active = countdetails[0].active;
          this.inactive = countdetails[0].inactive;
          this.warehouse = countdetails[0].warehouse;
          this.inactivedelete = countdetails[0].inactivedelete;
        }, error: (err) => {

        }
      })
  }
  public getCountforFinsi() {
    debugger

    this.AmazeSupportService.GetDelete_Inactive_Employee_fetch_Details().
      subscribe({
        next: data => {
          //debugger
          let countdetails: any = data;
          this.active = countdetails[0].active;
          this.inactive = countdetails[0].inactive;
          this.warehouse = countdetails[0].warehouse;
          this.inactivedelete = countdetails[0].inactivedelete;
        }, error: (err) => {

        }
      })
  }
  public getCountforABSI() {
    debugger

    this.AmazeSupportService.GetInactive_Employee_fetch_Details().
      subscribe({
        next: data => { 
          //debugger
          let countdetails: any = data;
          this.active = countdetails[0].active;
          this.inactive = countdetails[0].inactive;
          this.warehouse = countdetails[0].warehouse;
          this.inactivedelete = countdetails[0].inactivedelete;
        }, error: (err) => {

        }
      })
  }
  public getCountforHQ() {
    debugger

    this.AmazeSupportService.GetWarehouse_fetch_Details().
      subscribe({
        next: data => {
          //debugger
          let countdetails: any = data;
          this.active = countdetails[0].active;
          this.inactive = countdetails[0].inactive;
          this.warehouse = countdetails[0].warehouse;
          this.inactivedelete = countdetails[0].inactivedelete;
        }, error: (err) => {

        }
      })
  }
  companyid: any;
  public getCompanyDetails() {
    debugger
    if (this.companyid == 1) {
      this.getCount();
    }
    else if (this.companyid == 'ASTI') {
      this.getCountforMain();
    }
    else if (this.companyid == 'FINSI') {
      this.getCountforFinsi();
    }
    else if (this.companyid == 'AHQ') {
      this.getCountforHQ();
    }
    else if (this.companyid == 'ABSI') {
      this.getCountforABSI();
    }
  }

}
