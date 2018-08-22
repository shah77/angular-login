import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { UserApi } from '../shared/sdk/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() scanSuccess?:string;

  constructor(
    private userApi: UserApi,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("the message is here:", this.scanSuccess);
  }

  logOut(){
    this.userApi.logout().subscribe(
      logoutOp => {
        console.log("logout successful !");
        this.router.navigate(['/',]);
      },
      err => {
        console.log("logout failed !");
      }
    )
  }

}
