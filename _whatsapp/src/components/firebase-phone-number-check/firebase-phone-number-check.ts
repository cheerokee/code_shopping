import {Component, EventEmitter, Output} from '@angular/core';
import {Platform, ToastController} from "ionic-angular";
import {FirebaseAuthProvider} from "../../providers/auth/firebase-auth";

declare const cordova;

@Component({
  selector: 'firebase-phone-number-check',
  templateUrl: 'firebase-phone-number-check.html'
})
export class FirebasePhoneNumberCheckComponent {
  countryCode = "55";
  phoneNumber = '';
  verificationId = '';
  smsCode = '';
  @Output()
  onAuth: EventEmitter<any> = new EventEmitter<any>();

  constructor(private platform: Platform,
              private toastCtrl: ToastController,
              private firebaseAuth: FirebaseAuthProvider) {}

  resendSmsCode() {
    this.verifyPhoneNumber()
      .then(() => this.showToast('SMS enviado'));
  }
  verifyPhoneNumber(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.platform.ready().then(() => {
        cordova.plugins.firebase.auth.verifyPhoneNumber(this.fullPhoneNumber,30000)
          .then(
            verificationId => resolve(this.verificationId = verificationId),
            error => {
              console.log(error);
              reject(error);
              this.showToast('Não foi possível verificar o telefone');
            }
          )
      });
    }).then((verification) => console.log('Código de verificação foi recebido'));
  }

  cancel(){
    this.verificationId = '';
  }

  signInWithVerificationId(){
    cordova.plugins.firebase.auth
    .signInWithVerificationId(this.verificationId,this.smsCode)
    .then(
      (userInfo) => {
        this.firebaseAuth.firebase.auth()
          .signInAndRetrieveDataWithCredential(this.fbCredential)
          .then(
            (user) => {
              console.log(user);
              this.onAuth.emit(user);
            },(error) => {
            console.log(error);
            this.showToast('Não foi possível autenticar o telefone.');
          });
      },
      (error) => {
        console.log(error);
        this.showToast('Não foi possível verificar o código SMS.');
      }
    )
  }

  get fbCredential(){
    return this.firebaseAuth.firebase.auth
      .PhoneAuthProvider
      .credential(this.verificationId,this.smsCode);
  }

  get fullPhoneNumber(){
    //substituir tudo que não(^) for de 0 a 9 por nada
    const countryCode = this.countryCode.replace(/[^0-9]/g,'');
    return `+${countryCode}${this.phoneNumber}`;
  }

  showToast(message) {
    const toast = this.toastCtrl.create({
      message,duration: 3000
    });
    toast.present();
  }
}
