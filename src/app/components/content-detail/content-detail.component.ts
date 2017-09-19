import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
//import 'bootstrap';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      //$('#detailModal').modal();
    },3000);
  }

}
