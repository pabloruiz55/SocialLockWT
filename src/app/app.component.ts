import { Component, OnInit } from '@angular/core';
import {TruffleEthereumService} from './services/truffle-ethereum.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {


  constructor(private _tes:TruffleEthereumService) {

  }

  ngOnInit(){
  }

  payCoin(amount:number){
    this._tes.payCoin(amount);
  }


}
