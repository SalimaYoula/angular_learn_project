import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../_models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { CandidatService } from 'src/app/_service/candidat.service';
import { Candidat } from 'src/app/_models/candidat.model';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  ConnexionForm: FormGroup;
  errorMessage: string;
  userType: boolean;
  candidats:Candidat[] =[] ;
 
  constructor(private userService:UserService ,private authservice:AuthService,private formbuilder:FormBuilder,private router:Router, private candidatservices:CandidatService) { }

  ngOnInit() {
    this.candidatservices.getAll();
    this.candidatservices.candidat$.subscribe(
      data=>{
        this.candidats =data;
      }
    ); 
    this.initForm();  
  }
  initForm() {
   this.ConnexionForm = this.formbuilder.group({
     email: ['',Validators.required],
     password: ['',[Validators.required,Validators.minLength(6),Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
   })
  }

  get f() { return this.ConnexionForm.controls; }

  onSubmit(){
    const email = this.f.email.value;
    const password = this.f.password.value;
    let user = new User(email,password);
    this.authservice.signIn(user).then(
      () => {
        this.userType = this.userService.verifUserType(email);
        if(this.userType){
          let connectedUserIdC = this.getConnectUserId(this.candidats,firebase.auth().currentUser.uid)
          this.router.navigate(['/Candidat',connectedUserIdC]);
        }
        else
          this.router.navigate(['/List_Candidat']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }


 getConnectUserId(candidats:Candidat[],connectedUserId:string):number{
   let i:number = 0;
    while(candidats[i].id != connectedUserId){
      i += 1;
    }
    return i;
    }
}
