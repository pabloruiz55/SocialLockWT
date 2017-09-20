import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import {ModalService} from '../components/fslogin-modal/fslogin-modal.component';


@Injectable()
export class FirebaseService {

  categories: FirebaseListObservable<any[]>;
  content: FirebaseListObservable<any[]>;

  user: Observable<firebase.User>;

  constructor(private db: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    if(localStorage.getItem("user")){
      this.user = JSON.parse(localStorage.getItem("user"))
    }
  }

  loadCategories(){
    let categories = this.db.list('/categories',{
      query:{
        limitToLast:20,
        orderByKey:true
      }
    });
    return categories;
  }

  loadAllContent(category?:string){
    console.log(category);
    let query:any;
    if(category){
      query = {
        query: {
          orderByChild:"category",
          equalTo: category
        }
      }
    }else{
      query = {
        query: {
          limitToLast:20,
          orderByKey:true
        }
      }
    }
    console.log(query);
    this.content = this.db.list('/content',query);
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

  login():firebase.Promise<any> {

    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then((resp:any)=> {
      console.log("USUARIOOOOO:",resp.user);
      this.user = resp.user;
      localStorage.setItem("user",JSON.stringify(this.user));
      return Promise.resolve(true);
    });

  }

  logout() {
    this.afAuth.auth.signOut()
    .then(resp=>{
      this.user = null;
      localStorage.removeItem("user");
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
