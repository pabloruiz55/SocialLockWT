import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import {RouterLink,Route} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any[];

  constructor(private _db:FirebaseService) { }

  ngOnInit() {

    this._db.loadCategories().subscribe((data)=>{
      this.categories = data;
    });
  }

}
