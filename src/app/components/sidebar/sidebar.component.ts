import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service'
import {RouterLink,Route} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:any[];

  constructor(private _cs:CategoriesService) { }

  ngOnInit() {

    this._cs.categoriesX.subscribe((data) => {
     this.categories = data;
   })
  }

}
