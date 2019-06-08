import { Injectable } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { ProductCategory } from "../../model";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import {AuthService} from "../auth.service";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {
    private baseApi = environment.api.url;

    constructor(private http: HttpClient, private authService: AuthService) { }

    list(productId: number): Observable<ProductCategory>{
        return this.http.get<{ data: ProductCategory }>(this.getBaseUrl(productId)).pipe(map(response => response.data ));
    }

    create(productId: number, categoriesId: number[]): Observable<ProductCategory>{ //Retorna ProductCategory denotado como Observable<ProductCategory>
        return this.http.post<{ data: ProductCategory }>(this.getBaseUrl(productId),{ categories: categoriesId }).pipe(map(response => response.data ));
    }

    private getBaseUrl(productId: number, categoryId: number = null): string{
        let baseUrl = `${ this.baseApi }/products/${ productId }/categories`;

        if(categoryId) {
            baseUrl += `/${categoryId}`;
        }

        return baseUrl;
    }
}
