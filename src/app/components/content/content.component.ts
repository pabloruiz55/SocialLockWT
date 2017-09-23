import { Component, OnInit,HostListener } from '@angular/core';
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

  catTitle:string;
  catDescription:string;
  currentPage:number = 1;
  loadingContent:boolean = false;
  moreContentToLoad:boolean = true;

  constructor(public _db:FirebaseService,
              private route: ActivatedRoute,
              private _cs:CategoriesService) { }

  ngOnInit() {
    this.loadContent();
  }

  unlockContent(content:any, event){
    if(this._db.user){
      this._db.unlockContent(content)
      .then(data =>{
        //console.log(this.content);

      })
      .catch(err => console.log(err, 'You do not have access!'));
    }
    event.stopPropagation();
    return false;
  }

  downloadContent(content:any, event){
    event.stopPropagation();
    return true;
  }

  shareContent(content:any, event){
    event.stopPropagation();
    return false;
  }

  loadContent(){
    if(this.loadingContent) return;
    this.loadingContent=true;
    this.route.params.subscribe(params => {
       this.catTitle = params['category'];
       this.catDescription = null;
       if(this.catTitle){
         this._db.loadAllContent(this.catTitle,this.currentPage).subscribe((data)=>{

          //Load category data from service
           this._cs.categoriesX.subscribe((catdata:any[]) => {

             let dada = catdata;
             this.catDescription = dada.find(x => x.name == this.catTitle).description;
             this.loadingContent=false;
          })

        });
       }else{
         this._db.loadAllContent(null,this.currentPage).subscribe((data)=>{
           //console.log("el flatmap",data);
           this.loadingContent=false;
         });
       }
    });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    console.log("scrolling");
    if(!this._db.moreContentToLoad){
      this.moreContentToLoad = false;
      return;
    }
    this.moreContentToLoad = true;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          console.log("At bottom??");
          this.currentPage++;
          this.loadContent();
      }

  }

}
