import { Component } from '@angular/core';
import {ChatMessageHttpProvider} from "../../../providers/http/chat-message-http";

/**
 * Generated class for the ChatFooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-footer',
  templateUrl: 'chat-footer.html'
})
export class ChatFooterComponent {

  text: string = '';
  messageType = 'text';

  constructor(private chatMessageHttp: ChatMessageHttpProvider) {

  }

  sendMessage() {
    this.chatMessageHttp
        .create(1,{type: this.messageType,content: this.text})
        .subscribe(() => {
          this.text = '';
        });
  }

}