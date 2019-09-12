import {NgModule} from "@angular/core";
import {ChatMessagesPage} from "./chat-messages";
import {ChatAvatarComponent} from "../chat-avatar/chat-avatar";
import {ChatFooterComponent} from "../chat-footer/chat-footer";
import {ChatContentLeftComponent} from "../chat-content-left/chat-content-left";
import {ChatContentRightComponent} from "../chat-content-right/chat-content-right";
import {ChatContentDetailComponent} from "../chat-content-detail/chat-content-detail";
import {IonicPageModule} from "ionic-angular";
import {MomentModule} from "ngx-moment";
import {PipesModule} from "../../../pipes/pipes.module";
import {LongPressModule} from "ionic-long-press";
import {AudioRecorderProvider} from "../../../providers/audio-recorder/audio-recorder";
import {ChatMessageFb} from "../../../providers/firebase/chat-message-fb";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {BuildUrlPipe} from "../../../pipes/build-url/build-url";

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
        AudioRecorderProvider,
        ChatMessageFb,
        PhotoViewer
    ]
})
export class ChatMessagesPageModule {}
