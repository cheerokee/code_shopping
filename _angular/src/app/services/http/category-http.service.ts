import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { Category, Product } from "../../model";
import { HttpResource, SearchParams } from "./http-resource";
import { BaseHttpService } from "./base-http.service";
import {AuthService} from "../auth.service";

//design pattern - Singleton

@Injectable({
  providedIn: 'root' //Angular 6
})
export class CategoryHttpService extends BaseHttpService<Category> implements HttpResource<Category>{

  constructor(http: HttpClient,protected authService: AuthService) {
    super(http,authService,'/categories');
  }

  list(searchParams: SearchParams): Observable<{ data: Array<Category>; meta: any }> {
    return super.list(searchParams);
  }

  get(id: number): Observable<Category> {
    return super.get(id);
  }

  create(data: Category): Observable<Category> {
    return super.create(data);
  }

  update(id: number, data: Category): Observable<Category> {
    return super.update(id, data);
  }

  destroy(id: number): Observable<any> {
    return super.destroy(id);
  }
}
