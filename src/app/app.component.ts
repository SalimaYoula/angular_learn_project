import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'africa-talent';
  constructor(){
  const config ={
    apiKey: "AIzaSyDXi9zy5l2OcHz0VXsxSFJvsH2m6EoGoac",
    authDomain: "talent-africa.firebaseapp.com",
    databaseURL: "https://talent-africa.firebaseio.com",
    projectId: "talent-africa",
    storageBucket: "",
    messagingSenderId: "1004427940767",
    appId: "1:1004427940767:web:37b451f757c2bdae7c23aa"
};
// Initialize Firebase
firebase.initializeApp(config)
//firebase.analytics();  
  }
}

