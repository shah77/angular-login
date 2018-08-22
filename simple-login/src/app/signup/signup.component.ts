import { Component, OnInit } from '@angular/core';
import { UserApi } from '../shared/sdk/services';
import { Router } from '@angular/router';
import { LoopBackAuth } from '../shared/sdk/index';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  username:string;
  email:string;
  password:string;
  currentId:string;
  errorTxt: string;
  successMessage:boolean;
  errorMessage:boolean;

  constructor(
    private userApi: UserApi, 
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
      this.router.navigate(['/']);
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

  signUp(){
    var data = {
      "username": this.username,
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
      this.userApi.create(data).subscribe(
        signUp => {
            console.log("registration successful !");
            this.successPopUp();
        },
        err => {
            console.log("registration failed !");
            this.errorPopUp();
        }
      )
    }
  }
}
