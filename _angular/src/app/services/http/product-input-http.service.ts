import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { ProductInput } from "../../model";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import { Observable} from "rxjs";
import { BaseHttpService} from "./base-http.service";
import { AuthService} from "../auth.service";
import {map} from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root' //Angular 6
})
export class ProductInputHttpService {
  public baseUrl = environment.api.url;

  constructor(private http: HttpClient,protected authService: AuthService ) {
    this.baseUrl += '/inputs';
  }

  list(searchParams: SearchParams): Observable<{ data: Array<ProductInput>; meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams) //casting pois o fromObject aceita outro tipo de objeto
    });

    console.log(params);
    return this.http.get<{ data: Array<ProductInput>, meta: any }>(this.baseUrl,{params});
  }

  get(id: number): Observable<ProductInput> {
    return this.http.get<{ data: ProductInput }>(`${this.baseUrl}/${id}`).pipe(map(response => response.data));
  }

  create(data: {amount: number, product_id: number}): Observable<ProductInput> {
    return this.http.post<{ data: ProductInput }> (this.baseUrl, data).pipe(
      map(response => response.data
    ));
  }
}
