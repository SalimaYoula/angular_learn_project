import { Injectable } from '@angular/core';
import { Candidat } from '../_models/candidat.model';
import  * as firebase from 'firebase';
import { Subject } from 'rxjs';
import Datasnapshot = firebase.database.DataSnapshot;
@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  candidats : Candidat[] =[];

  candidatSubject = new Subject<Candidat[]>();
  candidat$ =this.candidatSubject.asObservable();


  constructor() { }

  getAll(){
    firebase.database().ref('/candidat').on(
      'value',(data:Datasnapshot)=>{
        if(data){
          this.candidats = data.val() ? data.val() : [];
          //progage du candidat 
          this.emitCandidat();
        }else{

        }
      }

    )
    return [];
  }

  emitCandidat() {
    this.candidatSubject.next(this.candidats)
  }

  getSingleCandidat(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/candidat/' + id).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
  delete(candidat: Candidat) {
    const candidatIndexToRemove = this.candidats.findIndex(
      (candidatS) => {
        if(candidatS === candidat) {
          return true;
        }
      }
    );
    this.candidats.splice(candidatIndexToRemove, 1);
    this.emitCandidat();
  }
  update(){}
}
