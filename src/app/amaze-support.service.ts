import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AmazeSupportService {

  // public baseURL1 = "http://localhost:1807/";
  public baseURL1 = "https://support.amazeone.co/SupportAPI/";

  public baseURL = "https://asticom.digiofficeapp.com/SupportAPI";

  public host = "https://digioffice.amazeone.co/digiofficeapi";

  public astiapiendpoint = "https://asticom.digiofficeapp.com/AsticomMainAPI";

  public astiapiendpoint1 = sessionStorage.getItem('digiofficeapiurl');
  url: any;


  constructor(private http: HttpClient) {
    // console.log("environment", environment.hostUrl);
  }

  public UpdateNotificationSeen(data: any) {
    debugger;
    this.url = this.baseURL + 'Master/UpdateNotificationSeen';
    return this.http.post(this.url, data);
  }

  public ClearNotificationByID(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/ClearNotificationByID?ID=" + ID);
  }

  public GetNotification(UserID: any) {
    return this.http.get<any[]>(
      this.host + "/User/GetNotification?UserID=" + UserID
    );
  }

  public GetSupportTickets() {
    return this.http.get<any[]>(
      this.baseURL + "/Master/GetSupportTickets"
    );
  }

  public GetSupportAttachment() {

    return this.http.get<any[]>(this.baseURL + "/Master/GetSupportAttachment");
  }

  public UpdateSupportTickets(data: any) {
    debugger;
    this.url = this.baseURL + '/Master/UpdateSupportTickets';
    return this.http.post(this.url, data);
  }

  public UpdateAcceptStatusSupportTickets(data: any) {
    debugger;
    this.url = this.baseURL + '/Master/UpdateAcceptStatusSupportTickets';
    return this.http.post(this.url, data);
  }

  public UpdateCloseStatusSupportTickets(data: any) {
    debugger;
    this.url = this.baseURL + '/Master/UpdateCloseStatusSupportTickets';
    return this.http.post(this.url, data);
  }

  public UpdateRejectStatusSupportTickets(data: any) {
    debugger;
    this.url = this.baseURL + '/Master/UpdateRejectStatusSupportTickets';
    return this.http.post(this.url, data);
  }

  public Getantiforgerytokenforsuperadmin(data: any, url: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    this.url = url + '/Announcement/Getantiforgerytoken';
    return this.http.post(this.url, data);
  }

  public GetCompanyIDForSuperAdmin(CompanyID: any, url: any) {
    debugger

    let APIURL = url + "/MobileUser/GetCompanyIDForSuperAdmin?CompanyID=" + CompanyID;
    //let APIURL = this.basehost + "/MobileUser/GetCompanyIDfortest?CompanyID=" + CompanyID;
    return this.http.get<any[]>(APIURL);
  }

  public InsertExceptionLogs(data: any) {
    debugger;
    this.url = this.astiapiendpoint + '/Master/InsertExceptionLogs';
    return this.http.post(this.url, data);
  }

  public GetExceptionLogs() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Master/GetExceptionLogs"
    );
  }

  public GetLogActivity() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Master/GetLogActivity"
    );
  }

  public GetLogActivitybyurl(apiendpoint: any) {
    return this.http.get<any[]>(
      apiendpoint + "/Master/GetLogActivity"
    );
  }

public GetExceptionLogsbyurl(apiendpoint: any) {
    return this.http.get<any[]>(
      apiendpoint + "/Master/GetExceptionLogs"
    );
  }

  public GetStateType() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Building/GetStateType?CountryID=" + 1
    );
  }

  public GetCityType() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Building/GetCityType?StateID=4"
    );
  }

  public GetDepartment() {
    debugger
    let APIURL = this.astiapiendpoint + "/Announcement/GetDepartmentMaster";
    return this.http.get<any[]>(APIURL);
  }

  public GetRoleType() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/MasterDemo/GetRoleType?UserTypeID=" + 1
    );
  }

  public GetAllStaffNew() {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    let entity: any = {
      'oGnvMaCNw7kaTMOJ': 'KE6RWrKkymIzZhtH',
      'kY08RdKZwGdRMPuy': 'fchrMte83z0TLo7X',
    }
    this.url = this.astiapiendpoint + '/Master/GetAllStaffNew';
    return this.http.post<any[]>(this.url, entity);
  }

  public GetMyDetails() {
    debugger
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Announcement/GetMyDetails?username=" + 'Amaze2022' + "&password=" + 'P@ssw0rd@2022'
    );
  }

  public GetAllStaffNewforsearch(Name: any) {
    debugger

    let APIURL = this.astiapiendpoint + "/MobileUser/GetAllStaffNewforsearch?Name=" + Name;
    //let APIURL = this.basehost + "/MobileUser/GetCompanyIDfortest?CompanyID=" + CompanyID;
    return this.http.get<any[]>(APIURL);
  }

  public DeleteBuildingStaff(ID: any) {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Building/DeleteBuildingStaff?ID=" + ID);
  }

  public GetEmployeeDocuments() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Announcement/GetEmployeeDocuments"
    );
  }

  public UpdateRoleType(data: any) {
    debugger;
    this.url = this.astiapiendpoint + '/Master/UpdateRoleType';
    return this.http.post(this.url, data);
  }

  public Enable_Disable_PayrollBit(data: any) {
    debugger;
    this.url = this.astiapiendpoint + '/Announcement/Enable_Disable_PayrollBit';
    return this.http.post(this.url, data);
  }

  public GetAttendanceByEmployeeID(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/MobileUser/GetAttendanceByEmployeeID?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }

  public GetAttendanceByManagerID(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/Announcement/GetAttendanceByManagerID?userID=" + UserID + "&sdate=" + Sdate + "&edate=" + Edate
    );
  }

  public GetAttendance() {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/MobileUser/GetAttendance?UserID=1&SDate=01-01-2020&EDate=01-01-2026"
    );
  }

  public GetAttendanceBydate(sdate: any, edate: any,) {
    return this.http.get<any[]>(
      this.astiapiendpoint + "/MobileUser/GetAttendance?UserID=1&SDate=" + sdate + "&EDate=" + edate
    );
  }

  public GetAttendanceByURL(apiendpoint: any) {
    return this.http.get<any[]>(
      apiendpoint + "/MobileUser/GetAttendance"
    );
  }

  public GetAllStaffNewByURL(apiendpoint: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    let entity: any = {
      'oGnvMaCNw7kaTMOJ': 'KE6RWrKkymIzZhtH',
      'kY08RdKZwGdRMPuy': 'fchrMte83z0TLo7X',
    }
    this.url = apiendpoint + '/Master/GetAllStaffNew';
    return this.http.post<any[]>(this.url, entity);
  }

  // public GetAllStaffNewforsearch(Name: any) {
  //   debugger

  //   let APIURL = this.astiapiendpoint + "/MobileUser/GetAllStaffNewforsearch?Name=" + Name;
  //   return this.http.get<any[]>(APIURL);
  // }

}