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


}
