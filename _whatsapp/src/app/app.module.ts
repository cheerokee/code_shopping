import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler,NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginOptionsPage } from "../pages/login-options/login-options";
import { LoginPhoneNumberPage } from "../pages/login-phone-number/login-phone-number";
import { ResetPhoneNumberPage } from "../pages/reset-phone-number/reset-phone-number";
import { FirebaseAuthProvider } from "../providers/auth/firebase-auth";
import { AuthProvider } from '../providers/auth/auth';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MainPage } from "../pages/main/main";
import { CustomerCreatePage } from "../pages/customer-create/customer-create";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomerHttpProvider } from '../providers/http/customer-http';
import { ChatMessageHttpProvider } from '../providers/http/chat-message-http';
import { SuperTabsModule } from "ionic2-super-tabs";
import { ChatGroupListComponent } from "../components/chat-group-list/chat-group-list";
import { ChatMessagesPageModule } from "../pages/chat-messages/chat-messages/chat-messages.module";
import { MomentModule } from "ngx-moment";
import { JwtModule,JWT_OPTIONS } from '@auth0/angular-jwt';
import { Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";
import { ChatGroupFbProvider } from "../providers/firebase/chat-group-fb";
import { PipesModule } from "../pipes/pipes.module";
import { ChatGroupViewerProvider } from '../providers/chat-group-viewer/chat-group-viewer';
import { DirectivesModule } from "../directives/directives.module";
import { StoragePermissionProvider } from '../providers/storage-permission/storage-permission';
import { Diagnostic } from "@ionic-native/diagnostic";
import {FirebasePhoneNumberCheckComponent} from "../components/firebase-phone-number-check/firebase-phone-number-check";
import {SelectCountriesCodeComponent} from "../components/select-countries-code/select-countries-code";
import {RefreshTokenInterceptor} from "../providers/auth/refresh-token-interceptor";
import { RedirectIfNotAuthProvider } from '../providers/redirect-if-not-auth/redirect-if-not-auth';
import {MoreOptionsComponent} from "../components/more-options/more-options";
//import {FCM} from "@ionic-native/fcm";

function jwtFactory(authService: AuthProvider) {
    return {
        whitelistedDomains: [
            new RegExp('localhost:8000/*'),
            new RegExp('192.168.100.54:8000/*')
        ],
        tokenGetter: () => {
            return authService.getToken();
        }
    }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ReactiveFormsModule,
    SuperTabsModule.forRoot(),
    ChatMessagesPageModule,
    MomentModule,
    PipesModule,
    DirectivesModule,
    JwtModule.forRoot({
        jwtOptionsProvider: {
            provide: JWT_OPTIONS,
            useFactory: jwtFactory,
            deps: [ AuthProvider ] //Dependencias
        }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginOptionsPage,
    LoginPhoneNumberPage,
    ResetPhoneNumberPage,
    CustomerCreatePage,
    MainPage,
    ChatGroupListComponent,
    FirebasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseAuthProvider,
    AuthProvider,
    CustomerHttpProvider,
    ChatMessageHttpProvider,
    ChatGroupFbProvider,
    Media,
    File,
    ChatGroupViewerProvider,
    StoragePermissionProvider,
    Diagnostic,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    RedirectIfNotAuthProvider
  ]
})
export class AppModule {}
