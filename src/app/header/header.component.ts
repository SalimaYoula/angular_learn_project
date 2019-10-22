import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 isAuth: boolean;
 email: string;
  constructor(private authservice:AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.email = user.email;
          this.isAuth = true;
        }
        else {
          this.isAuth = false;
        }
      }
    )
  }
deconnexion(){
  this.authservice.signOut();
}
}
