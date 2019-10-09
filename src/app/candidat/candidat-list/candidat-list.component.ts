import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/_service/candidat.service';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/_models/candidat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-candidat-list',
  templateUrl: './candidat-list.component.html',
  styleUrls: ['./candidat-list.component.css']
})
export class CandidatListComponent implements OnInit {
  candidats : Candidat[];
  subcribeScribe : Subscription; // declaration subscription pour souscrire au servicea chercher plus

  constructor(private candidat:CandidatService,private router:Router) { }


 
  ngOnInit() {
    this.candidat.getAll();
    this.subcribeScribe = this.candidat.candidat$.subscribe(
      data=>{
        this.candidats =data;
      }
    )
  }
}
