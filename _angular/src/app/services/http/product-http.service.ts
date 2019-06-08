import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Product } from "../../model";
import {HttpResource, SearchParams} from "./http-resource";
import {Observable} from "rxjs";
import {BaseHttpService} from "./base-http.service";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root' //Angular 6
})
export class ProductHttpService extends BaseHttpService<Product> implements HttpResource<Product> {

  constructor(http: HttpClient,protected authService: AuthService) {
    super(http,authService,'/products');
  }

  list(searchParams: SearchParams): Observable<{ data: Array<Product>; meta: any }> {
    return super.list(searchParams);
  }

  get(id: number): Observable<Product> {
    return super.get(id);
  }

  create(data: Product): Observable<Product> {
    return super.create(data);
  }

  update(id: number, data: Product): Observable<Product> {
    return super.update(id, data);
  }

  destroy(id: number): Observable<any> {
    return super.destroy(id);
  }
}
