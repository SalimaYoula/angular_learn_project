import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidatService } from 'src/app/_service/candidat.service';
import { Candidat } from 'src/app/_models/candidat.model';

@Component({
  selector: 'app-candidat-detail',
  templateUrl: './candidat-detail.component.html',
  styleUrls: ['./candidat-detail.component.css',"../../../assets/css/unify-components.css","../../../assets/css/unify-globals.css"]
})
export class CandidatDetailComponent implements OnInit {
candidat :Candidat
  constructor(private router:Router, private activatedRoute:ActivatedRoute,private candidatService:CandidatService) { }

  ngOnInit() {
    this.getCandidatList()
  }



getCandidatList(){
  let id = this.activatedRoute.snapshot.params.id;
  if(this.candidatService.candidats.length <= 0){
     this.candidatService.getAll();
     this.candidatService.candidat$.subscribe(
     (data)=>{
      if(data[id] !=undefined)
        this.candidat = data[id];
    }
  )
  }
  else {
     if(this.candidatService.candidats[id] != undefined)
       this.candidat = this.candidatService.candidats[id];
  }
}
}
