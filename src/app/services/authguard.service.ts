import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate } from '@angular/router';
import {FirebaseService} from './firebase.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private auth:FirebaseService) { }

  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    console.log(next);
    if(this.auth.user){
      console.log("acceso permitido");
      return true;
    }else{
      console.log("acceso denegado");
      return false;
    }

  }

}
