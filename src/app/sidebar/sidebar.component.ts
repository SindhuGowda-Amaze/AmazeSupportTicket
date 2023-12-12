import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  roleid: any;
  temp: any;

  constructor(public router: Router) { }  

  ngOnInit(): void {
    this.temp = sessionStorage.getItem('temp');
    this.roleid = sessionStorage.getItem('roleid');
  }

  public highlight(evt: any) {
    debugger
    var i, tablinks;
    //  localStorage.setItem("clickname",name)
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }

  active: any;
  newtickets() {
    this.active = 'newtickets';
    localStorage.setItem("clickname", "New Tickets")
  }

  accepted() {
    this.active = 'accepted';
    localStorage.setItem("clickname", "Accepted")
  }

  assign() {
    this.active = 'assign';
    localStorage.setItem("clickname", "Assign")
  }

  rejected() {
    this.active = 'rejected';
    localStorage.setItem("clickname", "Rejected")
  }
  completed() {
    this.active = 'completed';
    localStorage.setItem("clickname", "Rejected")
  }
  

  closed() {
    this.active = 'closed';
    localStorage.setItem("clickname", "Closed")
  }


  APIDetails() {
    this.active = 'APIDetails';
    localStorage.setItem("clickname", "API Details")
  }


  APIDetails1() {
    this.active = 'APIDetails1';
    localStorage.setItem("clickname", "APIDetails1")
  }

 
}

