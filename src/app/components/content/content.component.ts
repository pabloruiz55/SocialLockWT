import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import {RouterLink,Route} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content:any[];

  constructor(private _db:FirebaseService) { }

  ngOnInit() {

    this._db.loadAllContent().subscribe((data)=>{
      this.content = data;
      console.log(  this.content);
    });
  }

  unlockContent(content:any, event){
    this._db.unlockContent(content)
    .then(data =>{
      console.log(this.content);

    })
    .catch(err => console.log(err, 'You do not have access!'));
    //console.log(event);
    event.stopPropagation();
    return false;
  }
  downloadContent(content:any, event){
    // this._db.unlockContent(content)
    // .then(data =>{
    //   console.log(this.content);
    //
    // })
    // .catch(err => console.log(err, 'You do not have access!'));
    
    event.stopPropagation();
    return false;
  }

}
