import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMessagesPage } from './chat-messages';
import {ChatAvatarComponent} from "../chat-avatar/chat-avatar";
import {ChatFooterComponent} from "../chat-footer/chat-footer";
import {ChatContentLeftComponent} from "../chat-content-left/chat-content-left";
import {ChatContentRightComponent} from "../chat-content-right/chat-content-right";
import {ChatContentDetailComponent} from "../chat-content-detail/chat-content-detail";
import {MomentModule} from "ngx-moment";
import {PipesModule} from "../../../pipes/pipes.module";
import {ChatMessageHttpProvider} from "../../../providers/http/chat-message-http";
import { LongPressModule } from "ionic-long-press";

@NgModule({
    declarations: [
        ChatMessagesPage,
        ChatAvatarComponent,
        ChatFooterComponent,
        ChatContentLeftComponent,
        ChatContentRightComponent,
        ChatContentDetailComponent
    ],
    imports: [
        IonicPageModule.forChild(ChatMessagesPage),
        MomentModule,
        PipesModule,
        LongPressModule
    ],
    providers: [
        ChatMessageHttpProvider
    ]
})
export class ChatMessagesPageModule {}
