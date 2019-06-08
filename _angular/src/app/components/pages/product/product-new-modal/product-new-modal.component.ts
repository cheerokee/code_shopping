import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductHttpService } from "../../../../services/http/product-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import fieldsOptions from '../product-form/product-fields-options';

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  // product: Product = {
  //   name: '',
  //   active: true,
  //   description: '',
  //   price: 0
  // };

  form: FormGroup;
  errors: {};

  @ViewChild(ModalComponent)
  modal: ModalComponent;

  @Output() onSuccess:  EventEmitter<any> = new EventEmitter<any>();
  @Output() onError:    EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public productHttp: ProductHttpService, private formBuilder: FormBuilder) {
    const maxLength = fieldsOptions.name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: [ '' ,[ Validators.required,Validators.maxLength(maxLength)] ],
      description: [ '' ,[ Validators.required ]],
      price: [ 0 ],
      active: true
    })
  }

  ngOnInit() {
  }

  submit() {
    this.productHttp.create(this.form.value).subscribe((product) => {

      this.form.reset({
        name: '',
        description: '',
        price: 0,
        active: true
      });

      this.onSuccess.emit(product);
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
