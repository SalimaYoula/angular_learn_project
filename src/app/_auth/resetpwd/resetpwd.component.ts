import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from  'firebase'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {
passewordResetForm: FormGroup;
errorMessage : string;
mode:string;
actionCode:string;
actionCodeChecked:boolean;
  constructor(private authservice:AuthService, private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
   this.passewordResetForm = this.formbuilder.group({
    email: ['',Validators.required]
   })
  }
onSubmit(){
  const email = this.passewordResetForm.get('email').value;
  this.ForgotPassword(email);
  // code à deplacer
 /* const code = this.activatedRoute.snapshot.params['oobCode'];
  const mode = this.activatedRoute.snapshot.params['resetPassword'];
  this.authservice.verifPassWordResetCode(code);
  if(this.authservice.verifPassWordResetCode(code))
     this.authservice.confirmPwdReset(code,email,email);*/

  }

  async ForgotPassword(passwordResetEmail: string) {
    if (!passwordResetEmail) { 
      this.errorMessage = 'Veuillez saisir votre email'; 
      return;
    }
    try {
      await this.authservice.resetPwd(passwordResetEmail);
      this.errorMessage = 'Le lien de reinitialisation du mot de passe vient d\'etre envoyé à votre email';
      this.authservice.navigateToConnexion();
    }
    catch (error) {
      this.errorMessage = error;
    }
  }
  
  
}


