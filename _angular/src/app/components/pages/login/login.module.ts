import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import {LoginComponent} from "./login.component";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ]
})
export class LoginModule { }
