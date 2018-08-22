import { Component, OnInit, ViewChild } from '@angular/core';
import { UserApi } from '../shared/sdk/services';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoopBackAuth } from '../shared/sdk/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email : string;
  password : string;
  currentId : string;
  errorTxt : string;
  successTxt : string;
  successMessage : boolean;
  errorMessage : boolean;

  constructor(
    private userApi : UserApi,
    private router : Router,
    private _lbAuth: LoopBackAuth,
  ) { }

  ngOnInit() {
    // prevent user with access token to access this page
    this.currentId = this._lbAuth.getAccessTokenId();
    if(this.currentId != null){
      this.router.navigate(['/dashboard',]);
    }
  }

  successPopUp(){
    this.successMessage = true
    setTimeout(() => this.successMessage = false, 2000);
    setTimeout(() => {
      this.router.navigate(['/dashboard',]);
    }, 2000);
  }

  errorPopUp(){
    this.errorMessage = true
    setTimeout(() => this.errorMessage = false, 2000);
  }

  validateEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
  }

  login(){
    var data = {
      "email": this.email,
      "password": this.password
    }

    if(this.email == undefined || this.password == undefined){
      this.errorPopUp();
      this.errorTxt = "Input field cannot be blank!"
    }
    else if( !this.validateEmail()) {
      this.errorPopUp();
      this.errorTxt = "Invalid email entered!"
    }
    else{
      this.userApi.login(data).subscribe(
        loginOp => {
          console.log("successfully login");
          this.email = null;
          this.password = null;
          this.router.navigate(['/dashboard',]);
        },
        err => {
          console.log("failed to login", err.message);
          this.errorPopUp();
          this.email = null;
          this.password = null;
          this.errorTxt = "Login failed!"
        }
      )
    }
  }
}
