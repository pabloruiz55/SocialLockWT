import { Injectable } from '@angular/core';
import {FirebaseService} from './firebase.service'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoriesService {

  public categoriesX = new BehaviorSubject(null);

  constructor(private _db:FirebaseService) {

    this._db.loadCategories().subscribe((data)=>{
      this.categoriesX.next(data);
    });
    
  }

}
