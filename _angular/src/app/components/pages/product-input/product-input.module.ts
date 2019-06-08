import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProductInputListComponent} from "./product-input-list/product-input-list.component";
import {ProductInputFormComponent} from "./product-input-form/product-input-form.component";
import {ProductInputNewModalComponent} from "./product-input-new-modal/product-input-new-modal.component";
import {ProductInputSearchFormComponent} from "./product-input-search-form/product-input-search-form.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        ProductInputListComponent,
        ProductInputFormComponent,
        ProductInputNewModalComponent,
        ProductInputSearchFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ]
})
export class ProductInputModule { }
