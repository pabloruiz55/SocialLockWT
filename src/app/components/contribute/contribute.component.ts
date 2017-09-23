import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import {Content} from '../../models/content.model'
import { RequestOptions } from '@angular/http';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  categories:any[];
  newContent:Content;
  file: File;
  iconImg: File;

  localFileURL:string;
  fileError:string = "";

  constructor(public _db:FirebaseService, private _router:Router) { }

  ngOnInit() {
    this.newContent = new Content();
    this.newContent.unlocksRequired = 5;
    this.newContent.visibleToAll = true;
    this.newContent.id = "";
    this.newContent.fileURL = "";
    this.newContent.unlocks = [];
    this.newContent.category = "0";


    this._db.loadCategories().subscribe((data)=>{
      this.categories = data;
    });
  }

  onSelectionChange(vis){
    this.newContent.visibleToAll = vis;
  }

  fileChange(event) {
    this.fileError = "";
    this.file = null;
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      if(fileList[0].size < 5*1024*1024){ //5 megas
        this.file = fileList[0];
        console.log(this.file);
      }else{
        event.target.value = "";
        this.fileError = "Please select a file up to 5mb."
      }
    }
  }

  iconFileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.iconImg = fileList[0];
    }
  }

  onSubmit(contentForm:any){
    this.localFileURL = this.file.name;
    let storageRef = firebase.storage().ref();
    let uploadTask:firebase.storage.UploadTask =
    storageRef.child("content/"+this.file.name).put(this.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {console.log((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes)*100)},
      (error) => console.log("error"),
      () =>{
        console.log(uploadTask.snapshot.downloadURL);
        this.newContent.fileURL=uploadTask.snapshot.downloadURL;
        this._db.addNewContent(this.newContent).then((data)=>{
          console.log("content saved",data.key);
          this._router.navigate(['/content',data.key]);
        });
      }
    )
    // this._db.addNewContent(this.newContent).then((data)=>{
    //   console.log("content saved");
    // });
  }

}
