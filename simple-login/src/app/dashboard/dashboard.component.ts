import { Component, OnInit } from '@angular/core';
import { LoopBackAuth } from '../shared/sdk/index';
import { Router } from '@angular/router';
import { UserApi } from '../shared/sdk/services';
import { User } from '../shared/sdk/models'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentAccesstoken : string;
  currentUserId : number;
  userName : string;

  constructor(
    private router: Router,
    private userApi: UserApi,
    private _lbAuth: LoopBackAuth
  ) { }

  ngOnInit() {
    this.currentAccesstoken = this._lbAuth.getAccessTokenId();
    this.currentUserId = this._lbAuth.getCurrentUserId();
    if(this.currentAccesstoken == null){
      this.router.navigate(['/',]);
    }
    console.log("accesstoken id: ", this.currentAccesstoken);
    this.userApi.findById(this.currentUserId).subscribe(
      (findUsername:User) => {
        this.userName = findUsername.username;
        console.log("this is username ", this.userName)
      },
      err => {
        console.log("find username error ")
      }
    )
  }

}
