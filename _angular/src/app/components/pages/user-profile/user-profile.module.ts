import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UserProfileComponent} from "./user-profile.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ]
})
export class UserProfileModule { }
