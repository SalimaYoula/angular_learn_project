import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  ConnexionForm: FormGroup;
  errorMessage: string;
  userType: boolean;

 
  constructor(private authservice:AuthService,private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
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
        this.verifUserType(email);
        if(this.userType)
          this.router.navigate(['/Candidat']);
        else
          this.router.navigate(['/List_Candidat']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

  private verifUserType(email:string){
    let nomDomaine: string = (email.split('@'))[1].split('.')[0]; // recuperation de la partie apres @
    let listeDomaineGenerique: string[] = ['gmail','facebook','twitter','hotmail','gmx','yahoo','live'];
    if(listeDomaineGenerique.includes(nomDomaine)){
      this.userType = true
    }
    else{
      this.userType = false
    }
  
  }
}
