import { Component, OnInit } from '@angular/core';
import {ModalService,FSLoginModalComponent} from '../fslogin-modal/fslogin-modal.component';
import {FirebaseService} from '../../services/firebase.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private _modal:ModalService,public _db:FirebaseService) { }

  ngOnInit() {
  }

  openModal(){
    this._modal.open();
  }

}
