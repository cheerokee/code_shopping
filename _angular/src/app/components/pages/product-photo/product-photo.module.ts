import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProductPhotoDeleteModalComponent} from "./product-photo-delete-modal/product-photo-delete-modal.component";
import {ProductPhotoEditModalComponent} from "./product-photo-edit-modal/product-photo-edit-modal.component";
import {ProductPhotoManagerComponent} from "./product-photo-manager/product-photo-manager.component";
import {ProductPhotoUploadComponent} from "./product-photo-upload/product-photo-upload.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";

@NgModule({
    declarations: [
        ProductPhotoDeleteModalComponent,
        ProductPhotoEditModalComponent,
        ProductPhotoManagerComponent,
        ProductPhotoUploadComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ]
})
export class ProductPhotoModule { }
