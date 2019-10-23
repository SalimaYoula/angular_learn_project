import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatService } from '../_service/candidat.service';
import { Candidat } from '../_models/candidat.model';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css','../../assets/css/unify-core.css',"../../assets/css/unify-components.css","../../assets/css/unify-globals.css"]
})
export class CandidatComponent implements OnInit {
candidat: Candidat;
  constructor(private activatedRoute: ActivatedRoute, private candidatService: CandidatService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params.id;
    this.candidatService.getSingleCandidat(id).then(
      (data:Candidat)=>{
        this.candidat = data;
      }
    )
  }

}
