import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ProductListComponent } from "./product-list/product-list.component";
import { ProductNewModalComponent } from "./product-new-modal/product-new-modal.component";
import { ProductEditModalComponent } from "./product-edit-modal/product-edit-modal.component";
import { ProductDeleteModalComponent } from "./product-delete-modal/product-delete-modal.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        ProductListComponent,
        ProductNewModalComponent,
        ProductEditModalComponent,
        ProductDeleteModalComponent,
        ProductFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ],
    exports: [
        ProductListComponent,
        ProductNewModalComponent,
        ProductEditModalComponent,
        ProductDeleteModalComponent,
        ProductFormComponent
    ]
})
export class ProductModule { }
