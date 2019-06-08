import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductOutputHttpService } from "../../../../services/http/product-output-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import fieldsOptions from '../product-output-form/product-output-fields-options';
// VALIDAÇÃO CUSTOMIZADA
// function myValidator() {
//   return function (control: AbstractControl) {
//     if(control.value === 'luiz'){
//       return null;
//     }
//
//     return {luiz: true}
//   }
// }

@Component({
  selector: 'output-new-modal',
  templateUrl: './product-output-new-modal.component.html',
  styleUrls: ['./product-output-new-modal.component.css']
})
export class ProductOutputNewModalComponent implements OnInit {

  form: FormGroup;
  errors: {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
  @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();


  constructor(public outputHttp: ProductOutputHttpService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      product_id: [null,[Validators.required]],
      amount: ['',[Validators.required, Validators.min(fieldsOptions.amount.validationMessage.min)]],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.outputHttp
        .create(this.form.value)
        .subscribe((output) => {
          this.form.reset({
            amount: '',
            product_id: null
          });
          this.onSuccess.emit(output);
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
