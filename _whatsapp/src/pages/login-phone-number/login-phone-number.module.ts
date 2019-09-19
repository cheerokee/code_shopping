import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPhoneNumberPage } from './login-phone-number';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    LoginPhoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPhoneNumberPage),
    ComponentsModule,
  ],
})
export class LoginPhoneNumberPageModule {}
