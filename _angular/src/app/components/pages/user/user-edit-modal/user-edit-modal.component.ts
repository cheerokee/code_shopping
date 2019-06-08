import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { UserHttpService } from "../../../../services/http/user-http.service";
import fieldsOptions from "../user-form/user-fields-options";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @Input()
  _userId: number;

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

  @Input()
  set userId(value) {
    this._userId = value;
    if(this._userId ){
      this.userHttp.get(this._userId).subscribe((user) => {
        this.form.patchValue(user)
      },(responseError) => {
        if(responseError.status == 401){
          this.modal.hide();
        }
      });
    }
  }

  submit() {
    this.userHttp.update(this._userId,this.form.value).subscribe((user) => {
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
