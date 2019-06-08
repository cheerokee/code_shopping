import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {UserHttpService} from "../../../../services/http/user-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import fieldsOptions from '../user-form/user-fields-options';

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
  @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public userHttp: UserHttpService, private formBuilder: FormBuilder) {
    const maxLength = fieldsOptions.name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: [ '' ,[ Validators.required,Validators.maxLength(maxLength)] ],
      email: [ '' ,[ Validators.required,Validators.email ]],
      password: [ '' ,[ Validators.required ] ],
      active: true
    });
  }

  ngOnInit() {
  }

  submit() {

    this.userHttp.create(this.form.value).subscribe((user) => {

      this.form.reset({
        name: '',
        email: '',
        password: '',
        active: true
      });

      this.onSuccess.emit(user);
      this.modal.hide();
      error => this.onError.emit(error);

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
