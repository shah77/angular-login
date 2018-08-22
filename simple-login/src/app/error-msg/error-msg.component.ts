import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})

export class ErrorMsgComponent implements OnInit {

  @Input() errorMessage?:string;
  @ViewChild('errorMsg') public errorMsg:ModalDirective;
  
  constructor() { }

  ngOnInit(){ 
  }

  show(){
    this.errorMsg.show();  
  }

  hide(){
    this.errorMsg.hide(); 
  }
}
