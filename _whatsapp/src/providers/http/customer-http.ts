import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FirebaseAuthProvider} from "../auth/firebase-auth";
import {fromPromise} from "rxjs/observable/fromPromise";
import {flatMap} from "rxjs/operators";
import {Observable} from "rxjs/Observable";
import {environment} from "@app/env";

interface Customer {
    name: string,
    email: string,
    photo: null | File
}
@Injectable()
export class CustomerHttpProvider {

    constructor(public http: HttpClient, private firebaseAuth: FirebaseAuthProvider) {
        console.log('Hello CustomerHttpProvider Provider');
    }

    create(data: Customer): Observable<any> {
        const formData = this.formDataToSend(data);
        return fromPromise(this.firebaseAuth.getToken())
            .pipe(
                flatMap( token => {
                    formData.append('token',token);
                    return this.http
                        .post<{ token: string }>(`${environment.api.url}/customers`,formData)
                })
            );
    }

    private formDataToSend(data: Customer) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email',data.email);

        if(data.photo){
            formData.append('photo', data.photo)
        }
        return formData
    }

    requestUpdatePhoneNumber(email: string): Observable<any>{
        return fromPromise(this.firebaseAuth.getToken())
            .pipe(
                flatMap(token => {
                    return this.http
                        .post<{ token: string }>(
                            `${environment.api.url}/customers/phone_numbers`,
                            {email, token})
                })
            );
    }
}
