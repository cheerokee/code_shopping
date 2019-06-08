import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

  product: Product = null;

  _productId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private productHttp: ProductHttpService) {

  }

  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value;

    if(this._productId)
    {
      this.productHttp.get(this._productId).subscribe(product => this.product = product);
    }
  }

  destroy() {
    this.productHttp.destroy(this._productId).subscribe((product) => {
      this.onSuccess.emit(product);
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
