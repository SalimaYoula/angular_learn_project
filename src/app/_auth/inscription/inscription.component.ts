import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/_models/user.model';
import { UserService } from 'src/app/_service/user.service';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/_models/candidat.model';
import { CandidatService } from 'src/app/_service/candidat.service';
import { Entreprise } from 'src/app/_models/entreprise.model';
import { EntrepriseService } from 'src/app/_service/entreprise.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit,AfterViewInit {

  candidats =[];
  entreprises =[];
  InscriptionForm: FormGroup;
  errorMessage: string;
  nameTab = 'nav-home';
  isfinish = false;

  constructor(private userService:UserService,private formbuilder:FormBuilder, private router: Router,private candidat:CandidatService,private entreprise:EntrepriseService) { }

  ngOnInit() {
    this.candidat.getAll();
    this.candidat.candidat$.subscribe(
      data=>{
        this.candidats =data;
      }
    ); 

    this.entreprise.getAll();
    this.entreprise.entreprise$.subscribe(
      data=>{
        this.entreprises =data;
      }
    ); 
    this.initForm();  
  }
  ngAfterViewInit(){
    this.candidat.getAll();
    this.entreprise.getAll();
  }
  initForm() {
    this.InscriptionForm = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',[Validators.required,Validators.minLength(6)]],
      nom: ['',Validators.required],
      prenom: ['',[Validators.required,Validators.minLength(6)]],
    })
  }

  onSubmit(){
    const email =this.InscriptionForm.get('email').value;
    const password = this.InscriptionForm.get('password').value;
    let user = new User(email,password);
    if(this.nameTab=='nav-home'){
      const nom =this.InscriptionForm.get('nom').value;
      const prenom = this.InscriptionForm.get('prenom').value;  
      let candidat = new Candidat(nom,prenom);
      user.candidat =candidat;
      this.createUser(user,this.candidats);
    }else if(this.nameTab=='nav-profile'){
      const nomEntreprise = this.InscriptionForm.get('nomEntreprise').value;
      let entreprise = new Entreprise(nomEntreprise);
          entreprise.nomEntreprise =  nomEntreprise;
          user.entreprise = entreprise;
          this.createUser(user,this.entreprises);
    }
  }
private createUser(user:User,datas:Candidat[] | Entreprise[]){
  this.userService.create(user,datas.length).then(
    () => {
       this.router.navigate(['/Accueil']);
    },
    (error) => {
      this.errorMessage = error;
    }
  )

}
  showTab(name: string) {
    this.nameTab = name;
    let controls = this.InscriptionForm.controls
    if(this.nameTab =='nav-home'){
      if(controls.nom == undefined)
        this.InscriptionForm.addControl('nom', new FormControl('', Validators.required));
      if(controls.prenom == undefined)
        this.InscriptionForm.addControl('prenom', new FormControl('', Validators.required));
      if(controls.nomEntreprise != undefined)
        this.InscriptionForm.removeControl('nomEntreprise');
    }else if(this.nameTab =='nav-profile'){
      if(controls.nomEntreprise == undefined)
        this.InscriptionForm.addControl('nomEntreprise', new FormControl('', Validators.required));
      if(controls.nom != undefined)
        this.InscriptionForm.removeControl('nom');
      if(controls.prenom != undefined)
        this.InscriptionForm.removeControl('prenom');
    }
  }
}
