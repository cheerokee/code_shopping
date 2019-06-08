import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CategoryListComponent} from "./category-list/category-list.component";
import {CategoryNewModalComponent} from "./category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "./category-edit-modal/category-edit-modal.component";
import {CategoryDeleteModalComponent} from "./category-delete-modal/category-delete-modal.component";
import {CategorySearchFormComponent} from "./category-search-form/category-search-form.component";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryNewModalComponent,
        CategoryEditModalComponent,
        CategoryDeleteModalComponent,
        CategorySearchFormComponent,
        CategoryFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ],
    exports: [
        CategoryListComponent,
        CategoryNewModalComponent,
        CategoryEditModalComponent,
        CategoryDeleteModalComponent,
        CategorySearchFormComponent,
        CategoryFormComponent
    ]
})
export class CategoryModule { }
