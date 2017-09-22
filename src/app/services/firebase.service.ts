import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/mergeMap";
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {Content} from '../models/content.model'

@Injectable()
export class FirebaseService {

  categories: FirebaseListObservable<any[]>;
  content:any;

  user: any;
  userData:any;

  constructor(private db: AngularFireDatabase,
              public afAuth: AngularFireAuth) {
    if(localStorage.getItem("user")){
      this.user = JSON.parse(localStorage.getItem("user"))
      this.userData = JSON.parse(localStorage.getItem("userData"))
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

  loadAllContent(category?:string):Observable<any>{
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

    return this.db.list('/content/',query)
    .flatMap((data)=>{
      this.content=data;
      console.log("conte conte",this.content);
      this.lockContentForUser();
      return this.content;

    });


    //this.content = this.db.list('/content',query);
    //return this.content;
  }

  loadContentByKey(key:string){
    let content = this.db.list('/content/'+key);
    return content;
  }

  lockContentForUser(){
    //Check and flag already unlocked content by user
    if(this.user){
      console.log(this.content);
      for (let i=0;i<this.content.length;i++){
        console.log(this.content[i]);
        //console.log(this.content[i].unlocks.find(x => x.uid == this._db.user.uid));
        if(this.content[i].unlocks && this.content[i].unlocks.find(x => x.uid == this.user.uid)){
          console.log("Content already unlocked:",this.content[i]);
          this.content[i].userAlreadyUnlocked = true;
        }
      }
    }else{
      console.log("NO LOGGED USER");
    }
  }

  unlockContent(content:any){
    if(content.unlocked) return null;
    if(!this.user) return null;

    if(!content.unlocks) {
      content.unlocks = [];
    }

    content.unlocks.push({ uid: this.user.uid });
    if(content.unlocks.length >= content.unlocksRequired){
      content.unlocked = true;
    }

    if(!this.userData.unlocks){
      this.userData.unlocks = [];
    }
    this.userData.unlocks.push({ contentId: content.$key});
    this.userData.theKeys -=1;
    this.db.list('/users/').set(this.user.uid,{theKeys:this.userData.theKeys,unlocks:this.userData.unlocks})

    let promise = this.db.list('/content');
    return promise.set(content.$key,content);

  }

  /////
  /// USER AUTH
  ////

  login():firebase.Promise<any> {

    return this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
    .then((resp:any)=> {
      console.log("USUARIOOOOO:",resp.user);
      this.user = resp.user;
      localStorage.setItem("user",JSON.stringify(this.user));

      this.loaduserData(resp.user.uid);
      this.lockContentForUser();

      return Promise.resolve(this.user);
    });

  }

  logout() {
    this.afAuth.auth.signOut()
    .then(resp=>{
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userData");
      this.lockContentForUser();
    })
    .catch(err=>{
      console.log(err);
    })
  }

  ///// USER data

  loaduserData(uid:string){
    let userData = this.db.object('/users/'+uid).subscribe((data)=>{
      this.userData = data;
      if(!this.userData.theKeys){
        this.userData = null;
        this.userData.theKeys = 10;
        this.db.list('/users/').set(uid,{theKeys:this.userData.theKeys})
        .then((data)=>{
          console.log("NEW USER DATA");
        });
      }
      console.log("y la data?",this.userData);
      localStorage.setItem("userData",JSON.stringify(this.userData));
    })
  }

  ///// AD NEW content
  addNewContent(content:Content){
    const newContent = this.db.list('/content/');
    return newContent.push({
      title:content.title,
      description:content.description,
      unlocksRequired: content.unlocksRequired,
      category: content.category,
      visibleToAll: content.visibleToAll,
      fileURL: content.fileURL
    });
  }



}
