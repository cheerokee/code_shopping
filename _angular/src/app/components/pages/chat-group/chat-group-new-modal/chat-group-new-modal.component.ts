import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ChatGroupHttpService } from "../../../../services/http/chat-group-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import fieldsOptions from '../chat-group-form/chat-group-fields-options';

@Component({
    selector: 'chat-group-new-modal',
    templateUrl: './chat-group-new-modal.component.html',
    styleUrls: ['./chat-group-new-modal.component.css']
})
export class ChatGroupNewModalComponent implements OnInit {

    form: FormGroup;
    errors: {};

    @ViewChild(ModalComponent)
    modal: ModalComponent;

    @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
    @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


    constructor(public chatGroupHttp: ChatGroupHttpService, private formBuilder: FormBuilder) {
        const maxLength = fieldsOptions.name.validationMessage.maxlength;
        this.form = this.formBuilder.group({
            name: ['',[Validators.required,Validators.maxLength(maxLength)]],
            photo: [null,Validators.required]
        });
    }

    ngOnInit() {
    }

    submit() {
        this.chatGroupHttp
            .create(this.form.value)
            .subscribe((chatGroup) => {
                this.form.reset({
                    name: '',
                    active: true
                });
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
        // @ts-ignore
        return (!(typeof this.errors === "undefined"))?Object.keys(this.errors).length != 0:false;
    }

    hideModal($event: Event) {
        //Fazer algo quando o modal foi fechado
        console.log($event);
    }
}
