import { Injectable } from '@angular/core';
import firebaseConfig from "../../app/firebase-config";
import scriptjs from 'scriptjs';
import * as firebase from "firebase";

declare const firebaseui;
(<any>window).firebase = firebase;

@Injectable()
export class FirebaseAuthProvider {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  get firebase() {
    return firebase;
  }

  async makePhoneNumberForm(selectorElement: string) {
    const firebaseui = await this.getFirebaseUI();
    const uiConfig = {
      signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult(authResult,redirectUrl) {
          return false;
        }
      }
    };

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(selectorElement,uiConfig);

  }

  private async getFirebaseUI(): Promise<any> {
    return new Promise((resolve,reject) => {
      if(window.hasOwnProperty('firebaseui')) {
        resolve(firebaseui);
        return;
      }

      scriptjs('https://www.gstatic.com/firebasejs/ui/3.5.2/firebase-ui-auth__pt_br.js',() => {
        resolve(firebaseui);
      });
    });
  }

  async getToken(): Promise<string>{
    try{
      const user = await this.getUser();
      if(!user) {
        throw new Error('User not found');
      }

      const token = await user.getIdTokenResult();
      return token.token;
    }catch (e) {
      return Promise.reject(e);
    }
  }

  getUser(): Promise<firebase.User | null> {
    const currentUser = this.getCurrentUser();

    if(currentUser){
      console.log(currentUser)
      return Promise.resolve(currentUser);
    }

    return new Promise((resolve,reject) => {
      const unsubscribed = this.firebase
          .auth()
          .onAuthStateChanged((user) => {
            resolve(user);
            unsubscribed();
          }, (error) => {
            reject(error);
            unsubscribed();
          });
    });
  }

  private getCurrentUser(): firebase.User | null {
    return this.firebase.auth().currentUser;
  }
}
