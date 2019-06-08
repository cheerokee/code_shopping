import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ChatGroupListComponent } from "./chat-group-list/chat-group-list.component";
import { ChatGroupNewModalComponent } from "./chat-group-new-modal/chat-group-new-modal.component";
import { ChatGroupEditModalComponent } from "./chat-group-edit-modal/chat-group-edit-modal.component";
import { ChatGroupDeleteModalComponent } from "./chat-group-delete-modal/chat-group-delete-modal.component";
import { ChatGroupFormComponent } from "./chat-group-form/chat-group-form.component";
import { SharedModule } from "../../../shared.module";
import { BootstrapModule } from "../../bootstrap/bootstrap.module";
import { CommonComponentModule } from "../../common/common-component.module";

@NgModule({
    declarations: [
        ChatGroupListComponent,
        ChatGroupNewModalComponent,
        ChatGroupEditModalComponent,
        ChatGroupDeleteModalComponent,
        ChatGroupFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ],
    exports: [
        ChatGroupListComponent,
        ChatGroupNewModalComponent,
        ChatGroupEditModalComponent,
        ChatGroupDeleteModalComponent,
        ChatGroupFormComponent
    ]
})
export class ChatGroupModule { }
