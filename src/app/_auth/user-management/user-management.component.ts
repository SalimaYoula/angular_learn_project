import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit,OnDestroy {
  passewordResetForm: FormGroup;
  errorMessage : string;
  mode:string;
  actionCode:string;
  actionCodeChecked:boolean;

  constructor(private formbuilder:FormBuilder, private activatedRoute:ActivatedRoute,private router:Router, private authservice:AuthService) { }
  ngSubscribe: Subject<any> = new Subject<any>();
    ngOnInit() {
      this.activatedRoute.queryParams.pipe(takeUntil(this.ngSubscribe)).subscribe(params => {
          if (!params) 
              this.router.navigate(['/accueil']);
          this.mode = params['mode'];
          this.actionCode = params['oobCode'];
          this.authservice.getAuth().verifyPasswordResetCode(this.actionCode).then(
            () => {
                this.actionCodeChecked = true;
              }).catch(e => {
                this.errorMessage = e;
                this.router.navigate(['auth','connexion']);
              });
            });
      this.initForm();
      }

    initForm() {
        this.passewordResetForm = this.formbuilder.group({
          newPassword: ['',Validators.required],
          confirmPassword: ['',Validators.required]
        })
       }
     onSubmit(){
       if(!this.actionCodeChecked)
          return;
       const newPassword = this.passewordResetForm.get('newPassword').value;
       const confirmPassword = this.passewordResetForm.get('confirmPassword').value;
       if (newPassword != confirmPassword) { 
        this.errorMessage = 'Le mot de passe et la confirmation doivent etre identiques'; 
        return; 
      }
      this.authservice.getAuth().confirmPasswordReset(
        this.actionCode,newPassword).then(
          () => { 
        // Confirmation de la mise à jour du mot de passe.  
          //alert('Votre nouveau mot de passe a bien été enregistré ')  
          this.errorMessage = 'Votre nouveau mot de passe a bien été enregistré';
          this.authservice.navigateToConnexion();
          }).catch(
          (error) => { 
          this.errorMessage = error; 
        });
       }
    ngOnDestroy() {
      this.ngSubscribe.next();
      this.ngSubscribe.complete();
    }

  
}


