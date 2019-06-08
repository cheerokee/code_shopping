import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model";
import {tap} from "rxjs/operators";
import {AuthService} from "../auth.service";

interface Profile {
  name?: string;
  email?: string;
  password?: string;
  photo?: File | false | null;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileHttpService {

  private baseUrl = `${ environment.api.url }/profile`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  update(data: Profile): Observable<{ user: User, token: string }> {
    const formData = this.formDataToSend(data);

    return this.http.post<{ user: User, token: string }>(this.baseUrl, formData)
        .pipe(
            tap(response => { //Metodo que será executado antes do subscribe
              this.authService.setToken(response.token);
            })
        );
  }

  private formDataToSend(data): FormData {

    // @ts-ignore
    const dataKeys = Object.keys(data);

    this.deletePhotoKey(dataKeys);
    const formData = new FormData();
    for (const key of dataKeys) {
      if (data[key] !== '' && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    if(data.photo instanceof File) {
      formData.append('photo', data.photo);
    }

    if(data.photo === null) {
      formData.append('remove_photo', '1');
    }

    formData.append('_method', 'PATCH');
    return formData;
  }

  private deletePhotoKey(array){
    const index = array.indexOf('photo');
    if(index!==-1){
      array.splice(index,1)
    }
  }
}
