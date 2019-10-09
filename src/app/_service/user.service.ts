import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router) { }
  create(user:User,id:number){
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then(
          ()=>{
            if(user.candidat != undefined)
              firebase.database().ref('/candidat/'+id).set(user.candidat);
            if(user.entreprise != undefined)
              firebase.database().ref('/entreprise/'+id).set(user.entreprise);
            this.router.navigate(['/Accueil']);
            resolve();
          }
        ),
        (error)=>{
          reject(error);
        }
      }
    )
  }
}
