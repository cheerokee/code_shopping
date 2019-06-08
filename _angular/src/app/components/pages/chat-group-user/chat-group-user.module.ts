import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ChatGroupUserListComponent } from "./chat-group-user-list/chat-group-user-list.component";
import { ChatGroupUserNewComponent } from "./chat-group-user-new/chat-group-user-new.component";
import { SharedModule } from "../../../shared.module";
import { BootstrapModule } from "../../bootstrap/bootstrap.module";
import { CommonComponentModule } from "../../common/common-component.module";
import { ChatGroupUserDeleteModalComponent } from './chat-group-user-delete-modal/chat-group-user-delete-modal.component';

@NgModule({
    declarations: [
        ChatGroupUserListComponent,
        ChatGroupUserNewComponent,
        ChatGroupUserDeleteModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        BootstrapModule,
        CommonComponentModule
    ],
    exports: [
        ChatGroupUserListComponent,
        ChatGroupUserNewComponent
    ]
})
export class ChatGroupUserModule { }
