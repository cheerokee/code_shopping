import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpResource, SearchParams, SearchParamsBuilder} from "./http-resource";
import {AuthService} from "../auth.service";

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService <T> implements HttpResource<T>{
  public baseUrl = environment.api.url;

  constructor(public http: HttpClient,protected authService: AuthService,private endPoint: string) {
    this.baseUrl += endPoint;
  }

  create(data: T): Observable<T> {
    return this.http.post<{ data: T }>(this.baseUrl, data).pipe(map(response => response.data));
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`); //Para aplicar tranformações;
  }

  get(id: number): Observable<T> {
    return this.http.get<{ data: T }>(`${this.baseUrl}/${id}`).pipe(map(response => response.data)); //Para aplicar tranformações;
  }

  // @ts-ignore
  list(searchParams: SearchParams): Observable<{ data: Array<T>; meta: any }> {
    const sParams = new SearchParamsBuilder(searchParams).makeObject();
    const params = new HttpParams({
      fromObject: (<any>sParams) //casting pois o fromObject aceita outro tipo de objeto
    });
    // @ts-ignore
    return this.http.get<{data: Array<T>, meta: any }>(this.baseUrl,{params});
  }

  update(id: number, data: T): Observable<T> {
    return this.http.put<{ data: T }>(`${this.baseUrl}/${id}`, data).pipe(map(response => response.data));
  }
}
