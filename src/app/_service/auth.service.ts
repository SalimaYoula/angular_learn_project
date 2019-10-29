import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../_models/user.model';
import { Router, ResolveEnd } from '@angular/router';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }
  
  getAuth() { 
    return firebase.auth(); 
  }
  signIn(user:User){
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(user.email,user.password).then(
          ()=>{
              resolve();
          },
          (error)=>{
            reject(error);
          }
        )
      }
    )

  }

  
  signOut(){
    firebase.auth().signOut();
  }

  resetPwd(email:string){
   return firebase.auth().sendPasswordResetEmail(
      email,{url: 'http://localhost:4200/auth' }
    );
  }
 confirmPwdReset(code:string,password:string){
    firebase.auth().confirmPasswordReset(code, password).then(
      () => {
        this.router.navigate(['auth','connexion'])
      },
      (error)=>{
        reject(error)
      }
    )

}

verifPassWordResetCode(code:string){
 return new Promise(
   (resolve,reject) =>{
     firebase.auth().verifyPasswordResetCode(code).then(
       ()=>{
        resolve();
       },
       (error)=>{
        reject(error)
       }
     )
   }
 )
}

navigateToConnexion() {
  setTimeout(() => {
    this.router.navigate(['auth','connexion']); 
  }, 2500);
}
}
