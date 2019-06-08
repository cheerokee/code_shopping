import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import {ForgotComponent} from "./forgot.component";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        ForgotComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ],
    exports: [
        ForgotComponent
    ]
})
export class ForgotModule { }
