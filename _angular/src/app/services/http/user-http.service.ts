import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { User } from "../../model";
import {HttpResource, SearchParams} from "./http-resource";
import {Observable} from "rxjs";
import {BaseHttpService} from "./base-http.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root' //Angular 6
})
export class UserHttpService extends BaseHttpService<User> implements HttpResource<User> {

  constructor(http: HttpClient,protected authService: AuthService) {
    super(http,authService,'/users');
  }

  list(searchParams: SearchParams): Observable<{ data: Array<User>; meta: any }> {
    return super.list(searchParams);
  }

  get(id: number): Observable<User> {
    return super.get(id);
  }

  create(data: User): Observable<User> {
    return super.create(data);
  }

  update(id: number, data: User): Observable<User> {
    return super.update(id, data);
  }

  destroy(id: number): Observable<any> {
    return super.destroy(id);
  }
}
