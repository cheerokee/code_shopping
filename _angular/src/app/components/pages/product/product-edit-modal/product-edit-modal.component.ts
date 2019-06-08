import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from "../../../bootstrap/modal/modal.component";
import { HttpErrorResponse } from "@angular/common/http";
import { Product } from "../../../../model";
import { ProductHttpService } from "../../../../services/http/product-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldsOptions from "../product-form/product-fields-options";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  // product: Product = {
  //   name : '',
  //   active: true,
  //   description: '',
  //   price: 0
  // };

  form: FormGroup;
  errors: {};

  @Input()
  _productId: number;

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

  @Input()
  set productId(value) {
    this._productId = value;
    if(this._productId ){
      this.productHttp.get(this._productId).subscribe((product) => {
        this.form.patchValue(product)
      },(responseError) => {
        if(responseError.status == 401){
          this.modal.hide();
        }
      });
    }
  }

  submit() {
    this.productHttp.update(this._productId,this.form.value).subscribe((product) => {
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
