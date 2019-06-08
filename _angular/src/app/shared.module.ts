import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { NgxPaginationModule } from "ngx-pagination";
import { Select2Module } from "ng2-select2";
import { JWT_OPTIONS, JwtModule } from "@auth0/angular-jwt";
import { AuthService } from "./services/auth.service";
import {environment} from "../environments/environment";
import {NumberFormatBrPipe} from "./pipes/number-format-br.pipe";
import {IsInvalidControlDirective, IsInvalidDirective} from "./directives/is-invalid.directive";
import {Globals} from "./common/globals";

function jwtFactory(authService: AuthService) {
    return {
        whitelistedDomains: [
            // @ts-ignore
            new RegExp(`${environment.api.host}/*`)
        ],
        tokenGetter: () => {
            return authService.getToken()
        }
    }
}

@NgModule({
    declarations: [
        NumberFormatBrPipe,
        IsInvalidDirective,
        IsInvalidControlDirective
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgxPaginationModule,
        Select2Module,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtFactory,
                deps: [ AuthService ] //Dependencias
            }
        })
    ],
    exports: [
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        NgxPaginationModule,
        Select2Module,

        RouterModule,
        CommonModule,
        NumberFormatBrPipe,
        IsInvalidDirective,
        IsInvalidControlDirective
    ],
    providers: [
        Globals
    ]
})
export class SharedModule { }
