import { Component, OnInit, Renderer } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import { Router} from '@angular/router';
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

  logging = false;
  shown = false;
  constructor(private _modalS:ModalService,
              public _db:FirebaseService,
              private renderer:Renderer,
              private router:Router) { }

  ngOnInit() {
    this._modalS.modal = this;
  }

  login(){
      this.logging = true;
      this._db.login().then((user)=>{
      console.log("USER?:",user);
      this.logging = false;
      if(user){
        this.closeModal();
      }

    });
  }

  closeModal(){
    this.shown=false;
    this.renderer.setElementClass(document.body, 'modal-open', false);
  }
  openModal(){
    this.shown=true;
    this.renderer.setElementClass(document.body, 'modal-open', true);
  }

}
