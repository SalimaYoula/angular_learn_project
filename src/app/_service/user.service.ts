import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  create(user:User,id:number){
   
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then(
          ()=>{
            if(user.candidat != undefined){
              //recuperer son id dans la table utilisateur puis mettre dans candidat
              user.candidat.id = firebase.auth().currentUser.uid;
              firebase.database().ref('/candidat/'+id).set(user.candidat);
            }
            if(user.entreprise != undefined){
              user.entreprise.id = firebase.auth().currentUser.uid;
              firebase.database().ref('/entreprise/'+id).set(user.entreprise);
            }
             resolve();
          },
        (error:string) => {
          reject(error);
        }
        
    );
  }
);
}

}