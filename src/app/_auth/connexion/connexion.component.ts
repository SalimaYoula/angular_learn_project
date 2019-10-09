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

  onSubmit(){
    const email =this.ConnexionForm.get('email').value;
    const password = this.ConnexionForm.get('password').value;
    let user = new User(email,password);
    this.authservice.signIn(user).then(
      () => {
       // this.router.navigate(['/Candidat']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )

  }
}
