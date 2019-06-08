import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpClient } from "@angular/common/http";
import { ChatGroup } from "../../../../model";
import { ChatGroupHttpService } from "../../../../services/http/chat-group-http.service";

@Component({
    selector: 'chat-group-delete-modal',
    templateUrl: './chat-group-delete-modal.component.html',
    styleUrls: ['./chat-group-delete-modal.component.css']
})
export class ChatGroupDeleteModalComponent implements OnInit {

    chatGroup: ChatGroup = null;

    _chatGroupId: number;

    @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
    @Output() onError: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(ModalComponent) modal: ModalComponent;

    constructor(private chatGroupHttp: ChatGroupHttpService) {

    }

    ngOnInit() {
    }

    @Input()
    set chatGroupId(value) {
        this._chatGroupId = value;

        if(this._chatGroupId)
        {
            this.chatGroupHttp.get(this._chatGroupId).subscribe(chatGroup => this.chatGroup = chatGroup);
        }
    }

    destroy() {
        this.chatGroupHttp.destroy(this._chatGroupId).subscribe((chatGroup) => {
            this.onSuccess.emit(chatGroup);
            this.modal.hide();
        },error => this.onError.emit(error));
    }

    showModal(){
        this.modal.show();
    }

    hideModal($event: Event) {
        //Fazer algo quando o modal foi fechado
        console.log($event);
    }
}
