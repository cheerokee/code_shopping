import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProductOutputListComponent} from "./product-output-list/product-output-list.component";
import {ProductOutputFormComponent} from "./product-output-form/product-output-form.component";
import {ProductOutputNewModalComponent} from "./product-output-new-modal/product-output-new-modal.component";
import {ProductOutputSearchFormComponent} from "./product-output-search-form/product-output-search-form.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        ProductOutputListComponent,
        ProductOutputFormComponent,
        ProductOutputNewModalComponent,
        ProductOutputSearchFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ]
})
export class ProductOutputModule { }
