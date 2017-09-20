import { Component, OnInit } from '@angular/core';
//import {TruffleEthereumService} from './services/truffle-ethereum.service';
import {CategoriesService} from './services/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css']
})
export class AppComponent {


  constructor(/*private _tes:TruffleEthereumService*/ private _cs:CategoriesService) {

  }

  ngOnInit(){
  }

  payCoin(amount:number){
    //this._tes.payCoin(amount);
  }


}
