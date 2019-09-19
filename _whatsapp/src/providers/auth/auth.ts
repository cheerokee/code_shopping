import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { FirebaseAuthProvider } from "./firebase-auth";
import { fromPromise } from 'rxjs/observable/fromPromise';
import {flatMap, tap} from "rxjs/operators";
import { User } from "../../app/model";
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from "@app/env";
import {forkJoin} from "rxjs/observable/forkJoin";

declare const cordova;
const TOKEN_KEY = 'code_shopping_token';

@Injectable()
export class AuthProvider {

    me: User = null;

    constructor(public http: HttpClient, private firebaseAuth: FirebaseAuthProvider) {
        const token = this.getToken();
        this.setUserFromToken(token);
    }

    login(): Observable<{ token: string }> {
        return fromPromise(this.firebaseAuth.getToken())
            .pipe(
                flatMap( token => {
                    return this.http
                        .post<{ token: string }>(`${environment.api.url}/login_vendor`,{ token })
                        .pipe(
                          tap( data => this.setToken(data.token))
                        )
                })
            );
    }

    setToken(token: string) {
        this.setUserFromToken(token);
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
    }

    private setUserFromToken(token: string) {
        const decodedPayloadToken = new JwtHelperService().decodeToken(token);
        console.log(decodedPayloadToken);
        this.me = decodedPayloadToken ? {
            id: decodedPayloadToken.sub,
            name: decodedPayloadToken.name,
            email: decodedPayloadToken.email,
            role: decodedPayloadToken.role,
            profile: decodedPayloadToken.profile
        } : null;
        return;
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    async isFullyAuth(): Promise<boolean> {
      return Promise.all([this.isAuth(),this.firebaseAuth.isAuth()])
        .then(values => values[0] && values[1]);
    }
    async isAuth(): Promise<boolean> {
      const token = this.getToken();
      if(!token){
        return false;
      }

      if(this.isTokenExpired(token)){
        try {
          await this.refresh().toPromise();
        }catch (error) {
          console.log('Erro ao fazer o refresh token',error);
          return false;
        }
      }
      return true;
    }

    isTokenExpired(token: string){
      return new JwtHelperService().isTokenExpired(token, 30);
    }

    refresh(): Observable<{token:string}> {
      return this.http.post<{token: string}>(this.refrenshUrl(),{})
        .pipe(
          tap( data => this.setToken(data.token))
        )
    }

    refrenshUrl(){
      return `${environment.api.url}/refresh`;
    }

    logout(): Observable<any> {
      return forkJoin(
        this.firebaseAuth.firebase.auth().signOut(),
        cordova.plugins.firebase.auth.signOut(),
        this.http.post(`${environment.api.url}/logout`,{})
        .pipe(
          tap(() => this.setToken(null))
        )
      )
    }
}
