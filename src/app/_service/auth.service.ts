import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
}
