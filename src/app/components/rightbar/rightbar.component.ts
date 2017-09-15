import { Component, OnInit } from '@angular/core';

//import * as contract from 'truffle-contract';
//import * as metaincoinArtifacts from '../../../../build/contracts/MetaCoin.json';

@Component({
  selector: 'app-rightbar',
  templateUrl: './rightbar.component.html',
  styleUrls: ['./rightbar.component.css']
})
export class RightbarComponent implements OnInit {
  //MetaCoin = contract(metaincoinArtifacts);
  constructor() { }

  ngOnInit() {

    // this.MetaCoin.deployed().then(function(instance) {
    //   console.log(instance);
    // });
  }

}
