import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import fieldsOptions from './product-input-fields-options';
import {ProductIdFieldService} from "./product-id-field.service";
import {Select2Component} from "ng2-select2";

@Component({
  selector: 'product-input-form',
  templateUrl: './product-input-form.component.html',
  styleUrls: ['./product-input-form.component.css']
})
export class ProductInputFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  @ViewChild(Select2Component,{read: ElementRef}) // Select2Component se torna o proprio elementref em vez de uma instacia do componente
  select2Element: ElementRef;

  constructor(private changeRef: ChangeDetectorRef, public productIdField: ProductIdFieldService) { }

  ngOnInit() {
    //ajax - JQuery - Authorization - AuthService
    this.productIdField.make(this.select2Element,this.form.get('product_id'));
  }

  ngOnChanges(){
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any {
    return fieldsOptions;
  }

  get amount() {
    return this.fieldsOptions.amount;
  }

  get product_id() {
    return this.fieldsOptions.product_id;
  }

}
