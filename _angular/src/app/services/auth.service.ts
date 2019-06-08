import { Injectable } from '@angular/core';
import { Observable} from "rxjs/internal/Observable";
import { HttpClient} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { User} from "../model";
import { JwtHelperService } from "@auth0/angular-jwt";

const TOKEN_KEY = 'code_shopping_token';

import { environment } from '../../environments/environment';
console.log(environment.production);
console.log(environment.api);
console.log(environment.api.url);
@Injectable({
  providedIn: 'root'
})
export class AuthService {

    me: User = null;

    constructor(private http: HttpClient) {
        const token = this.getToken();
        this.setUserFromToken(token);
    }

    login(user: {email: string, password: string}): Observable<{ token: string }> {
        return this.http
            .post<{ token: string }>(`${ environment.api.url }/login`, user)
            .pipe(
                tap(response => { //Metodo que será executado antes do subscribe
                  this.setToken(response.token);
                })
            );
    }

    forgot(user: { email: string }): Observable<{ token: string }> {
        return this.http
            .post<{ token: string }>(`${ environment.api.url }/forgot`, user)
            .pipe(
                tap(response => { //Metodo que será executado antes do subscribe
                    this.setToken(response.token);
                })
            );
    }

    setToken(token: string) {
        this.setUserFromToken(token);
        token ? window.localStorage.setItem(TOKEN_KEY, token) : window.localStorage.removeItem(TOKEN_KEY);
    }

    private setUserFromToken(token: string) {
        const decodedPayload = new JwtHelperService().decodeToken(token);
        this.me = decodedPayload ? {
            id: decodedPayload.sub,
            name: decodedPayload.name,
            email: decodedPayload.email,
            profile: decodedPayload.profile
        }: null;
    }

    getToken(): string | null {
        return window.localStorage.getItem(TOKEN_KEY);
    }

    isAuth(): boolean {
        const token = this.getToken();
        //Se não está expirado
        return !new JwtHelperService().isTokenExpired(token, 1000);
    }

    logout(): Observable<any>{
        return this.http
            .post<{ token: string }>(`${ environment.api.url }/logout`, {})
            .pipe(
                tap(() => { //Metodo que será executado antes do subscribe
                    this.setToken(null);
                })
            );
    }

    get authorizationHeader() {
        return `Bearer ${this.getToken()}`;
    }
}
