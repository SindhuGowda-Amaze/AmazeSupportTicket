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
  public GetActive_Employee_Fetech_Details() {

    return this.http.get<any[]>(this.baseURL + "/Master/GetActive_Employee_Fetech_Details");
  }
  public GetAPI_fetch_Details_All() {

    return this.http.get<any[]>(this.baseURL + "/Master/GetAPI_fetch_Details_All");
  }
  public GetDelete_Inactive_Employee_fetch_Details() {

    return this.http.get<any[]>(this.baseURL + "/Master/GetDelete_Inactive_Employee_fetch_Details");
  }
  public GetInactive_Employee_fetch_Details() {

    return this.http.get<any[]>(this.baseURL + "/Master/GetInactive_Employee_fetch_Details");
  }
  public GetWarehouse_fetch_Details() {

    return this.http.get<any[]>(this.baseURL + "/Master/GetWarehouse_fetch_Details");
  }

}
