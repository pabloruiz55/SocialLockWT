import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service'
import {Content} from '../../models/content.model'
import { RequestOptions } from '@angular/http';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.css']
})
export class ContributeComponent implements OnInit {

  categories:any[];
  newContent:Content;
  theFile:any;
  file: File;

  localFileURL:string;

  constructor(public _db:FirebaseService) { }

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
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.file = fileList[0];

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
          console.log("content saved");
        });
      }
    )
    console.log(this.file);
    console.log(contentForm);
    // this._db.addNewContent(this.newContent).then((data)=>{
    //   console.log("content saved");
    // });
  }

}
