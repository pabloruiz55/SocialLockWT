import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  categories: FirebaseListObservable<any[]>;
  content: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) {

  }

  loadCategories(){
    this.categories = this.db.list('/categories',{
      query:{
        limitToLast:20,
        orderByKey:true
      }
    });
    return this.categories;
  }

  loadAllContent(){
    this.content = this.db.list('/content',{
      query:{
        limitToLast:20,
        orderByKey:true
      }
    });
    return this.content;
  }

  loadContentByKey(key:string){
    let content = this.db.list('/content/'+key);
    return content;
  }

  unlockContent(content:any){
    if(content.unlocked) return null;

    if(!content.unlocks) {
      content.unlocks = [];
    }
    content.unlocks.push({ uid: "666" });
    if(content.unlocks.length >= content.unlocksRequired){
      content.unlocked = true;
    }

    let promise = this.db.list('/content');
    return promise.set(content.$key,content);

  }

}
