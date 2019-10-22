import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidatService } from '../_service/candidat.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css','../../assets/css/unify-core.css',"../../assets/css/unify-components.css","../../assets/css/custom.css","../../assets/css/unify-globals.css"]
})
export class CandidatComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private candidatService: CandidatService) { }

  ngOnInit() {
    this.candidatService.getAll();
    let id = this.activatedRoute.snapshot.params.id;
    console.log('user '+this.candidatService.candidats.length);
  }

}
