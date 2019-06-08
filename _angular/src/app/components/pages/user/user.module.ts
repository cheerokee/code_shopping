import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import {UserListComponent} from "./user-list/user-list.component";
import {UserDeleteModalComponent} from "./user-delete-modal/user-delete-modal.component";
import {UserFormComponent} from "./user-form/user-form.component";
import {UserNewModalComponent} from "./user-new-modal/user-new-modal.component";
import {UserEditModalComponent} from "./user-edit-modal/user-edit-modal.component";
import {SharedModule} from "../../../shared.module";
import {BootstrapModule} from "../../bootstrap/bootstrap.module";
import {CommonComponentModule} from "../../common/common-component.module";


@NgModule({
    declarations: [
        UserListComponent,
        UserDeleteModalComponent,
        UserFormComponent,
        UserNewModalComponent,
        UserEditModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ]
})
export class UserModule { }
