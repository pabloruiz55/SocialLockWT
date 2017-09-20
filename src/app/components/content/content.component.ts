import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import {CategoriesService} from '../../services/categories.service'
import {RouterLink,Route} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content:any[];
  catTitle:string;
  catDescription:string;

  constructor(private _db:FirebaseService,
              private route: ActivatedRoute,
              private _cs:CategoriesService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
       this.catTitle = params['category'];
       if(this.catTitle){
         this._db.loadAllContent(this.catTitle).subscribe((data)=>{
           this.content = data;

          //Load category data from service
           this._cs.categoriesX.subscribe((catdata:any[]) => {

             let dada = catdata;
             this.catDescription = dada.find(x => x.name == this.catTitle).description;
          })

         });
       }else{
         this._db.loadAllContent().subscribe((data)=>{
           this.content = data;
         });
       }
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
