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
// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule,MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,MatFormFieldModule, MatDividerModule, MatGridListModule } from  '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { AuthGuardService } from './_service/auth-guard.service';
import { EntrepriseComponent } from './entreprise/entreprise.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    HeaderComponent,
    HomeComponent,
    CandidatComponent,
    CandidatListComponent,
    CandidatDetailComponent,
    FooterComponent,
    EntrepriseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'auth/connexion', component: ConnexionComponent },
      { path: 'auth/inscription', component: InscriptionComponent },
      { path: 'Accueil', component: HomeComponent },
      { path: 'Entreprise',canActivate:[AuthGuardService], component:EntrepriseComponent},
      { path: 'Candidat/:id',canActivate:[AuthGuardService], component: CandidatComponent },
      { path: 'List_Candidat',canActivate:[AuthGuardService], component: CandidatListComponent },
      { path: 'Candidat_detail/:id',canActivate:[AuthGuardService],component: CandidatDetailComponent },
      { path: '', redirectTo: 'Accueil' ,pathMatch: 'full'},
      { path: '**', redirectTo: 'Accueil'},
      
    ]),
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule
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
