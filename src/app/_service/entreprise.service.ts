import { Injectable } from '@angular/core';
import { Entreprise } from '../_models/entreprise.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  entreprises: Entreprise[] =[]
  entrepriseSubject = new Subject<Entreprise[]>();
  entreprise$ =this.entrepriseSubject.asObservable();

  constructor() { }

  emitEntreprise(){
    this.entrepriseSubject.next(this.entreprises)
  }

  getAll(){
    firebase.database().ref('/entreprise').on(
      'value',(data:Datasnapshot)=>{
        if(data){
          this.entreprises = data.val() ? data.val() : [];
          this.emitEntreprise();
        }else{
        }
      }
    )
    return [];
  }

  getSingleEntreprise(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/entreprise/' + id).once('value').then(
          (data:Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
