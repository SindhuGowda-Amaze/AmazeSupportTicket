import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AmazeSupportService } from '../amaze-support.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public AmazeSupportService:AmazeSupportService) { }
  roleId:any;
  admin:any;
  userName:any;
  passWord:any;
  showpassword:any;
  ngOnInit(): void {
    this.admin="admin"
  
    this.showpassword=0;
  }
  public getroleid(event: any) {
    this.roleId = event.target.value;

  }

  Showhidepassword() {
    debugger
    if (this.showpassword == 0) {
      this.showpassword = 1;
    }
    else {
      this.showpassword = 0;
    }
  }


    login() {
    debugger
    if (this.roleId == '1') {
      let adminCopy = this.admin.toLowerCase();
      if (this.userName.toLowerCase().includes(adminCopy)  && this.passWord == 'welcome') {
        sessionStorage.setItem("temp", '1');
        sessionStorage.setItem("roleid", this.roleId);

        sessionStorage.setItem("loginName", this.admin);
        location.href = "#/Newtickets";
        location.reload()
      }
      else {
        Swal.fire("Incorrect Username or Password")
      }
    }
  }
}
