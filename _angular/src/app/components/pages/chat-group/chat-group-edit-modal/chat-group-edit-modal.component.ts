import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ChatGroupHttpService } from "../../../../services/http/chat-group-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import fieldsOptions from '../chat-group-form/chat-group-fields-options';
import {ChatGroup} from "../../../../model";

@Component({
    selector: 'chat-group-edit-modal',
    templateUrl: './chat-group-edit-modal.component.html',
    styleUrls: ['./chat-group-edit-modal.component.css']
})
export class ChatGroupEditModalComponent implements OnInit {

    _chatGroupId: number;
    chatGroup: ChatGroup;
    form: FormGroup;
    errors: {};
    photo_url: string;

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
    @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

    constructor(private chatGroupHttp: ChatGroupHttpService,private formBuilder: FormBuilder) {
        const maxLength = fieldsOptions.name.validationMessage.maxlegth;
        this.form = this.formBuilder.group({
            name: ['',[Validators.required,Validators.maxLength(maxLength)]],
            photo: null
        });
    }

    ngOnInit() {
    }

    @Input()
    set chatGroupId(value) {
        this._chatGroupId = value;
        if(this._chatGroupId ){
            this.chatGroupHttp.get(this._chatGroupId).subscribe((chatGroup) => {
                if (typeof chatGroup.photo_url !== "undefined") {
                    this.photo_url = chatGroup.photo_url;
                }

                this.chatGroup = chatGroup;
                this.form.patchValue(chatGroup)
            },(responseError) => {
                if(responseError.status == 401){
                    this.modal.hide();
                }
            });
        }
    }

    submit() {
        this.chatGroupHttp
            .update(this._chatGroupId,this.form.value)
            .subscribe((chatGroup) => {
                this.onSuccess.emit(chatGroup);
                this.modal.hide();
            }, (responseError) => {
                if(responseError.status === 422){
                    this.errors = responseError.error.errors
                }
                this.onError.emit(responseError)
            });
    }

    showModal(){
        this.modal.show();
    }

    showErrors() {
        return (!(typeof this.errors === "undefined"))?Object.keys(this.errors).length != 0:false;
    }

    hideModal($event: Event) {
        //Fazer algo quando o modal foi fechado
        console.log($event);
    }
}
