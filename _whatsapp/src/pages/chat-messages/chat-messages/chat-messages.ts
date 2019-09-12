import {Component, ViewChild} from '@angular/core';
import {Content, InfiniteScroll, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatGroup, ChatMessage} from "../../../app/model";
import {ChatMessageFb} from "../../../providers/firebase/chat-message-fb";
import {IsCurrentUserPipe} from "../../../pipes/is-current-user/is-current-user";

/**
 * Generated class for the ChatMessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-chat-messages',
    templateUrl: 'chat-messages.html',
})
export class ChatMessagesPage {
    chatGroup: ChatGroup;
    messages: { key: string, value: ChatMessage }[] = [];
    limit = 20;
    showContent = false;
    canMoreMessages = true;
    countNewMessages = 20;

    @ViewChild(Content)
    content: Content;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private chatMessageFb: ChatMessageFb,
                private isCurrentUser: IsCurrentUserPipe) {
        this.chatGroup = this.navParams.get('chat_group');
    }

    ionViewDidLoad() {
        this.chatMessageFb.latest(this.chatGroup,this.limit)
            .subscribe((messages) => {
                this.messages = messages;
                setTimeout(() => {
                    this.scrollToBottom();
                    this.showContent = true;
                }, 500);

                // this.chatMessageFb.oldest(this.chatGroup, this.limit, messages[0].key)
                //     .subscribe((messages) => this.messages = messages);
            });

        this.chatMessageFb.onAdded(this.chatGroup)
            .subscribe((message) => {
                this.messages.push(message);

                if(this.isCurrentUser.transform(message.value.user_id)){
                    return;
                }
                this.countNewMessages++;
                // setTimeout(() => {
                //     this.scrollToBottom();
                // },300);
            });
    }

    doInfinite(infiniteScroll: InfiniteScroll){
        this.chatMessageFb.oldest(this.chatGroup, this.limit, this.messages[0].key)
            .subscribe((messages) => {
                if(messages.length){
                    this.canMoreMessages = false;
                }

                this.messages.unshift(...messages);
                infiniteScroll.complete();
            },() => infiniteScroll.complete());
    }

    scrollToBottom(){
        this.countNewMessages = 0;
        this.content.scrollToBottom(0);
    }

    showButtonScrollBottom(){
        const dimensions = this.content.getContentDimensions();
        const contentHeight = dimensions.contentHeight;
        const scrollTop = dimensions.scrollTop;
        const scrollHeight = dimensions.scrollHeight;

        return scrollHeight > scrollTop + contentHeight;
    }
}
