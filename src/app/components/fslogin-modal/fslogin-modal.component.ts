import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'

import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  modal:any;
  constructor() {  }

  open(){
    this.modal.openModal();
  }

  close(){
    this.modal.closeModal();
  }
}

@Component({
  selector: 'app-fslogin-modal',
  templateUrl: './fslogin-modal.component.html',
  styleUrls: ['./fslogin-modal.component.css']
})
export class FSLoginModalComponent implements OnInit {

  shown = false;
  constructor(private _modalS:ModalService, private _db:FirebaseService) { }

  ngOnInit() {
    this._modalS.modal = this;
  }

  login(){
      this._db.login().then((shouldClose)=>{
      console.log("CLOSE?:",shouldClose);
      if(shouldClose){
        this.closeModal();
      }

    });
  }

  closeModal(){
    this.shown=false;
  }
  openModal(){
    this.shown=true;
  }

}
