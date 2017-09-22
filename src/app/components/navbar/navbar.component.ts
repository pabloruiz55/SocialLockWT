import { Component, OnInit } from '@angular/core';
import {ModalService,FSLoginModalComponent} from '../fslogin-modal/fslogin-modal.component';
import {FirebaseService} from '../../services/firebase.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _modal:ModalService,public _db:FirebaseService) { }

  ngOnInit() {
  }

  openModal(){
    this._modal.open();
  }

  logout(){
    this._db.logout();
  }

  addContent(){
    
  }

}
