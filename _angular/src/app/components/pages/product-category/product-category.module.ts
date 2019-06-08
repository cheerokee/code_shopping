import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ProductCategoryListComponent } from "./product-category-list/product-category-list.component";
import { ProductCategoryNewComponent } from "./product-category-new/product-category-new.component";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        ProductCategoryListComponent,
        ProductCategoryNewComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ],
    exports: [
        ProductCategoryListComponent,
        ProductCategoryNewComponent
    ]
})
export class ProductCategoryModule { }
