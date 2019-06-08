import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { CategoryHttpService } from "../../../../services/http/category-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import fieldsOptions from "../category-form/category-fields-options";

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @Input()
  _categoryId: number;

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
  @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(private categoryHttp: CategoryHttpService,private formBuilder: FormBuilder) {
    const maxLength = fieldsOptions.name.validationMessage.maxlegth;
    this.form = this.formBuilder.group({
      name: ['',[Validators.required,Validators.maxLength(maxLength)]],
      //name: [''],
      //Ex. name: ['',[Validators.required,Validators.maxLength(255),Validators.email,myValidator]],
      active: true
    });
  }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value;
    if(this._categoryId ){
      this.categoryHttp.get(this._categoryId).subscribe((category) => {
        this.form.patchValue(category)
      },(responseError) => {
        if(responseError.status == 401){
          this.modal.hide();
        }
      });
    }
  }

  submit() {
    this.categoryHttp
      .update(this._categoryId,this.form.value)
      .subscribe((category) => {
        this.form.reset({
          name: '',
          active: true
        });
        this.onSuccess.emit(category);
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
