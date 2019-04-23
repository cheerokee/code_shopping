import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseAuthProvider } from "../../providers/auth/firebase-auth";
import {AuthProvider} from "../../providers/auth/auth";
import {MainPage} from "../main/main";

@IonicPage()
@Component({
  selector: 'page-login-phone-number',
  templateUrl: 'login-phone-number.html',
})
export class LoginPhoneNumberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private firebaseAuth: FirebaseAuthProvider,
              private authService: AuthProvider) {
  }

  ionViewDidLoad() {
    this.firebaseAuth.getToken().then(token => console.log(token));
    const unsubscribed = this.firebaseAuth.firebase.auth().onAuthStateChanged((user) => {
      if(user)
      {
        this.authService.login().subscribe((token) => {
          this.redirectToMainPage();
        },(responseError) => {
          //redirecionar para a criação da conta do cliente
          console.log('Redirecionar para a criação da conta do cliente');
        });
        unsubscribed();
      }
    });

    this.firebaseAuth.makePhoneNumberForm('#firebase-ui');
  }

  redirectToMainPage() {
    this.navCtrl.setRoot(MainPage);
  }

  redirectToCostumerCreatePage() {
    //this.navCtrl.setRoot(MainPage);
  }
}
