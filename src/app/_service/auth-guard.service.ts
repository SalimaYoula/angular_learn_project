import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  

  constructor(private router:Router) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve,reject) => {
        firebase.auth().onAuthStateChanged(
          (user) =>{
            if(user)
             resolve(true);
             else{
               this.router.navigate(['auth','connexion'])
               resolve(false);
             }
          }
        )

      }
    )
  }
}
