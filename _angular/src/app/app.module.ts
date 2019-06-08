import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';

import { environment } from "../environments/environment";

import { Globals } from "./common/globals";

import { AuthService } from "./services/auth.service";
import { RefreshTokenInterceptorService } from "./services/refresh-token-interceptor.service";

import { BootstrapModule } from "./components/bootstrap/bootstrap.module";
import { CommonComponentModule } from "./components/common/common-component.module";

import { BaseModule } from "./components/pages/base/base.module";

import { CategoryModule } from "./components/pages/category/category.module";
import { ProductModule } from "./components/pages/product/product.module";
import { ProductCategoryModule } from "./components/pages/product-category/product-category.module";
import { ForgotModule } from "./components/pages/forgot/forgot.module";
import { LoginModule } from "./components/pages/login/login.module";
import { ProductInputModule } from "./components/pages/product-input/product-input.module";
import { ProductOutputModule } from "./components/pages/product-output/product-output.module";
import { ProductPhotoModule } from "./components/pages/product-photo/product-photo.module";
import { RegisterModule } from "./components/pages/register/register.module";
import { UserModule } from "./components/pages/user/user.module";
import { UserProfileModule } from "./components/pages/user-profile/user-profile.module";
import {SharedModule} from "./shared.module";
import {ChatGroupModule} from "./components/pages/chat-group/chat-group.module";
import {ChatGroupUserModule} from "./components/pages/chat-group-user/chat-group-user.module";

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
        AppComponent
    ],
    imports: [
        SharedModule,//Módulo que engloba outros módulos deixando todos os componentes disponíveis
        BootstrapModule,
        CommonComponentModule,
        BaseModule,
        CategoryModule,
        UserModule,
        ProductModule,
        ProductCategoryModule,
        ForgotModule,
        LoginModule,
        ProductInputModule,
        ProductOutputModule,
        ProductPhotoModule,
        RegisterModule,
        UserProfileModule,
        ChatGroupModule,
        ChatGroupUserModule
    ],
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: RefreshTokenInterceptorService,
            multi   : true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
