import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-candidat',
  templateUrl: './update-candidat.component.html',
  styleUrls: ['./update-candidat.component.css']
})
export class UpdateCandidatComponent implements OnInit {
 userId: number;
 userUpdateForm:FormGroup;
  constructor(private activateRoute:ActivatedRoute,private formbuilder:FormBuilder) { }

  ngOnInit() {
    this.userId = this.activateRoute.snapshot.params.id;
    this.initForm();
  }
  initForm() {
    this.userUpdateForm = this.formbuilder.group({
      experience1:['',Validators.required],
      experience2:[''],

    })
  }
get f(){
  return this.userUpdateForm.controls
}

onSubmit(){

}


}
