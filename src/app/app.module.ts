import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './_auth/connexion/connexion.component';
import { InscriptionComponent } from './_auth/inscription/inscription.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import {RouterModule } from '@angular/router';
import { AuthService } from './_service/auth.service';
import { CandidatService } from './_service/candidat.service';
import { EntrepriseService } from './_service/entreprise.service';
import { UserService } from './_service/user.service';
import { CandidatComponent } from './candidat/candidat.component';
import { CandidatListComponent } from './candidat/candidat-list/candidat-list.component';
import { CandidatDetailComponent } from './candidat/candidat-detail/candidat-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    HeaderComponent,
    HomeComponent,
    CandidatComponent,
    CandidatListComponent,
    CandidatDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'auth/connexion', component: ConnexionComponent },
      { path: 'auth/inscription', component: InscriptionComponent },
      { path: 'Accueil', component: HomeComponent },
      { path: 'Candidat', component: CandidatComponent },
      { path: 'List_Candidat', component: CandidatListComponent },
      { path: 'Candidat_detail/:id', component: CandidatDetailComponent },
      { path: '', redirectTo: 'Accueil' ,pathMatch: 'full'},
      { path: '**', redirectTo: 'Accueil'},
      
    ])
  ],
  providers: [
    AuthService,
    CandidatService,
    EntrepriseService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
